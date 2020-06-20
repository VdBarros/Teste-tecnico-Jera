<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <h5 class="brand-logo center">Teste Técnico JERA - TMDB</h5>
        <button
          class="waves-effect btn red darken-1"
          v-if="this.$route.params.userId != null"
          @click="logout()"
          style="float:right;margin-right:100px;margin-top:15px"
        >
          <i class="material-icons">account_circle</i>
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {};
  },

  methods: {
    //Logout
    logout() {
      firebase
        .auth()
        .signOut()
        .then(this.$router.push("/"));
    }
  }
};
</script>