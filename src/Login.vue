<template>
  <div id="login">
    <div class="container">
      <br />
      <br />
      <br />
      <br />
      <br />

      <form @submit.prevent="onSignin">
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
        <button class="waves-effect waves-light btn-small" style="float:left" type="submit">
          Logar
          <i class="material-icons left">login</i>
        </button>
      </form>

      <button
        class="waves-effect waves-light btn-small"
        style="float:left; margin-left:100px"
        @click="goRegister"
      >
        Inscrever-se
        <i class="material-icons left">save</i>
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      uid: ""
    };
  },
  methods: {
    //Loga o usuário
    onSignin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.uid = user.user.uid;
          this.$router.push("/" + this.uid);
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    //Redireciona para a página de registro de novos usuários
    goRegister() {
      this.$router.push("/register");
    }
  }
};
</script>