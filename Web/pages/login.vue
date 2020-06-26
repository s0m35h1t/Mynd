<template>
  <div class="main">
    <sui-form>
      <sui-segment>
        <h3>Login</h3>
        <sui-form-field>
          <sui-input
            type="email"
            placeholder="E-mail address"
            icon="user"
            icon-position="left"
            v-model="login.identifier"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            type="password"
            placeholder="Password"
            icon="lock"
            icon-position="left"
            v-model="login.password"
          />
        </sui-form-field>
        <sui-button size="large" type="button" @click.prevent="signin" fluid
          >Login</sui-button
        >
      </sui-segment>
    </sui-form>
    <sui-message>New to Mynd? <a href="/join">Sign Up</a> </sui-message>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  methods: {
    async signin() {
      const data = {
        identifier: this.login.identifier,
        password: this.login.password,
      };
      const res = await axios.post("http://localhost:1337/auth/local", data);
      if (res.data.jwt) {
        localStorage.setItem("authToken", res.data.jwt);
        this.$store.commit("login", res.data.user);
        this.login = !this.login;
        this.$router.push('/')
      }
      else {
        this.err = true
      }
    }
  },
  data() {
    return {
      login: {
        identifier: "",
        password: ""
      },

      options: [
        {
          text: "Male",
          value: 1
        },
        {
          text: "Female",
          value: 2
        }
      ]
    };
  }
};
</script>

<style scoped>
.main {
  width: 400px;
  margin: 7em auto;
}

.message {
  margin-top: 0;
}
.button {
  color: aliceblue;
  background: #5a4fdc;
}
.button:hover {
  color: antiquewhite;
  background: #6e64d8;
}
a {
  color: #5a4fdc;
  cursor: pointer;
}
</style>
h