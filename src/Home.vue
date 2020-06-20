<template>
  <div id="home">
    <div class="container">
      <input
        placeholder="Procure um filme"
        type="text"
        v-on:input="searchChangeHandler($event)"
        v-bind="searchBar"
      />

      <br />
      <h2 v-if="aux == 0">WatchList</h2>
      <h2 v-if="aux == 1">Resultados da busca</h2>
      <br />

      <table>
        <thead>
          <tr>
            <th>Pôster</th>
            <th>Título</th>
            <th>Descrição</th>
            <th v-if="aux == 1">Adicionar à WatchList</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="movie of movies" :key="movie.id" :value="movie.id">
            <td>
              <img :src="'https://image.tmdb.org/t/p/w185/'+movie.backdrop_path" />
            </td>
            <td @>{{movie.title}}</td>
            <td>{{movie.overview}}</td>
            <td>
              <button
                class="waves-effect btn-small blue darken-1"
                v-if="aux == 1"
                @click="addToWatchList(movie.id)"
              >
                <i class="material-icons">add_to_queue</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import Movie from "./services/movies";
import * as firebase from "firebase";

export default {
  data() {
    return {
      movies: [],
      movieWatchlist: [],
      aux: 0,
      movieId: "",
      searchBar: ""
    };
  },

  methods: {
    //Adiciona um filme à WatchList
    addToWatchList(id) {
      this.aux = 0;
      this.watchlist = [];
      firebase
        .database()
        .ref("/users/" + this.$route.params.userId)
        .once("value")
        .then(data => {
          const aux = data.val();
          if (aux.firstLogin == true) {
            this.movieWatchlist = [id];
            firebase
              .database()
              .ref("/users/" + this.$route.params.userId + "/firstLogin")
              .set(false);
            firebase
              .database()
              .ref("/users/" + this.$route.params.userId + "/watchlist")
              .set(this.movieWatchlist)
              .then(this.showWatchlist());
          } else {
            this.movieWatchlist = aux.watchlist;
            this.movieWatchlist.push(id);
            firebase
              .database()
              .ref("/users/" + this.$route.params.userId + "/watchlist")
              .update(this.movieWatchlist)
              .then(this.showWatchlist());
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    
    //Realiza a busca por termo
    searchChangeHandler(event) {
      var search = event.target.value;
      if (search.length == "0") {
        this.aux = 0;
        this.showWatchlist();
      }
      Movie.fetchSearch(search).then(response => {
        this.aux = 1;
        this.movies = response.data.results;
      });
    },

    //Mostra a watchList ao usuário
    showWatchlist() {
      this.movies = [];
      firebase
        .database()
        .ref("/users/" + this.$route.params.userId)
        .once("value")
        .then(data => {
          const aux = data.val();
          this.movieWatchlist = aux.watchlist;
          this.movieWatchlist.forEach(element => {
            Movie.fetchWatchlist(element).then(response => {
              this.movies.push(response.data);
            });
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  //Impede o acesso de usuários não logados
  beforeCreate() {
    if (firebase.auth().currentUser == null) {
      this.$router.push("/");
    }
  },

  mounted() {
    this.showWatchlist();
  }
};
</script>