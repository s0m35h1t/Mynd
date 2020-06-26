<template>
  <div class="main">
    <sui-form>
      <sui-segment>
        <h3>Join</h3>
        <sui-form-field>
          <sui-input
            type="email"
            v-model="d.email"
            placeholder="E-mail address"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            type="username"
            v-model="d.username"
            placeholder="Username"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            type="fullname"
            v-model="d.fullname"
            placeholder="fullname"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            type="password"
            v-model="d.password"
            placeholder="Password"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-dropdown
            placeholder="Gender"
            selection
            :options="options"
            v-model="d.gender"
          />
        </sui-form-field>

        <sui-button size="large" fluid @click.prevent="join">Join</sui-button>
      </sui-segment>
    </sui-form>
    <sui-message>Already on Mynd? <a href="/login">Login</a></sui-message>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    async join() {
      let bodyFormData = new FormData();

      const data = {
        'username': this.d.username,
        'password': this.d.password,
        'email': this.d.email,
        'fullname': this.d.fullname,
        'gender': this.d.gender
      }
      Object.keys(data).forEach(k => {
        bodyFormData.set(k, data[k])
      })
      bodyFormData.set('profile_img', 6);

      // bodyFormData.append('profile_image,', '../../assets/avatar.png')
      const res = await axios({
        method: 'POST',
        url:"http://localhost:1337/auth/local/register",
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    }
      );
      if (res.data.jwt) {
        localStorage.setItem("authToken", res.data.jwt);
        this.$store.commit("login", res.data.user);
        this.login = !this.login;
        this.$router.push("/" + res.data.user.id);
      } else {
        this.err = true;
      }
    }
  },
  data() {
    return {
      d: {
        email: "",
        password: "",
        fullname: "",
        email: "",
        gender: null
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
