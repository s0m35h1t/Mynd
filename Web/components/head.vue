<template>
  <div>
    <sui-menu fixed>
      <sui-container>
        <nuxt-link is="sui-menu-item" to="/" class="header">
          <img src="../assets/images/logo.png" class="logo" />
          Mynd
        </nuxt-link>
      </sui-container>
      <sui-menu-menu position="right">
        <nuxt-link
          to="/join"
          is="sui-menu-item"
          v-if="!isAuthenticated"
          class="header"
        >
          Join
        </nuxt-link>
        <nuxt-link
          to="/login"
          is="sui-menu-item"
          v-if="!isAuthenticated"
          class="header"
        >
          Login
        </nuxt-link>
          <a
            @click="logout"
           is="sui-menu-item"
            v-if="isAuthenticated"
            class="header"
          >
            Logout
          </a>
          <nuxt-link
            class="avt"
            :to="'/' + loggedInUser.id"
            v-if="isAuthenticated"
          >
            <sui-image
              class="avt"
              v-if="isAuthenticated"
              :style="{
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage:
                  'url(http://localhost:1337' +
                  loggedInUser.profile_img.formats.thumbnail.url +
                  ')'
              }"
              src=""
              @click="reUser"
              avatar
            />
          </nuxt-link>
        <sui-menu-item>
          <sui-input transparent icon="search" placeholder="Search..." />
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Head",
  data() {
    return {
      userLogin: {
        identifier: "",
        password: ""
      },
      u:
        "http://localhost:1337/uploads/small_https_external_content_duckduckgo_com_iu_u_https_3_A_2_F_2_Fcdn_pixabay_com_2_Fphoto_2_F2015_2_F10_2_F05_2_F22_2_F37_2_Fblank_profile_picture_973460_960_720_560a0c313e.png",
      join: false,
      login: false,
      current: null,
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
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  methods: {
    async signin() {
      const data = {
        identifier: this.userLogin.identifier,
        password: this.userLogin.password
      };
      const res = await axios.post("http://localhost:1337/auth/local", data);
      if (res.data.jwt) {
        localStorage.setItem("authToken", res.data.jwt);
        
        this.$store.commit("user/login", res.data.user);
        this.login = !this.login;
      }
    },
    toggleJoin() {
      this.join = !this.join;
    },
    toggleLogin() {
      this.login = !this.login;
    },
    toggle() {
      this.join = !this.join;
      this.login = !this.login;
    },
    reUser() {
      this.$router.push("/" + loggedInUser.id);
    },
    logout() {
        localStorage.setItem("authToken", null);
        this.$store.commit("logout");
        this.login = false;
        this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
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
.avt {
  margin-right: 10px;
  margin-top: 2px;
  margin-left: 10px;
}
</style>
