<template>
  <div id="register">
    <div class="container">
      <br />
      <br />
      <br />
      <br />
      <br />

      <form @submit.prevent="onSignup">
        <label for="name">Nome:</label>
        <br />
        <input type="text" id="name" v-model="name" />
        <br />
        <label for="birthDate">Data de nascimento:</label>
        <br />
        <input type="date" id="birthDate" v-model="birthDate" />
        <br />
        <label for="email">Email:</label>
        <br />
        <input type="email" id="email" v-model="email" />
        <br />
        <label for="password">Senha:</label>
        <br />
        <input type="password" id="password" v-model="password" />
        <br />
        <p style="color: red">{{error}}</p>
        <br />
        <button class="waves-effect waves-light btn-small" type="submit" style="float:left">
          Inscrever-se
          <i class="material-icons left">save</i>
        </button>
      </form>

      <button
        class="waves-effect waves-light btn-small"
        style="float:left; margin-left:100px"
        @click="goLogin"
      >
        Logar
        <i class="material-icons left">login</i>
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      name: "",
      password: "",
      birthDate: "",
      email: "",
      error: "",
      uid: ""
    };
  },

  methods: {
    //Realiza o logout
    onSignup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.uid = user.user.uid;
          const newUser = {
            name: this.name,
            birthDate: this.birthDate,
            firstLogin: true
          };
          firebase
            .database()
            .ref("/users/" + this.uid)
            .set(newUser);
          this.$router.push("/" + this.uid);
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    //Redireciona o usuário para a página de login
    goLogin() {
      this.$router.push("/");
    }
  }
};
</script>