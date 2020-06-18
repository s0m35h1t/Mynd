<template>
  <div class="main">
    <sui-grid centered :columns="3">
      <sui-grid-column v-if="user">
        <sui-card-group :items-per-row="3" stackable>
          <sui-card v-for="post in user.posts" :key="post.id">
            <a :href="'/post/' + post.id">
            <sui-image :src="'http://localhost:1337' + post.image.url" />
            </a>
          </sui-card>
        </sui-card-group>

        <sui-rail position="left">
          <sui-segment>
            <sui-image
              :src="
                'http://localhost:1337' + user.profile_img.formats.small.url
              "
              class="pimg"
              circular
              centered
            />
            <sui-container text-align="center" class="details">
              <b>{{ user.fullname }}</b>
              <h4>@{{ user.username }}</h4>
              <p>
                {{ user.bio }}
              </p>
            </sui-container>
          </sui-segment>
        </sui-rail>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  components: {},
  data() {
    return {
      id: this.$route.params.id
    };
  },
  apollo: {
    user: {
      query: gql`
        query getUser($id: ID!) {
          user(id: $id) {
            id
            fullname
            username
            bio
            profile_img {
              formats
            }
            posts {
              id
              image {
                url
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.id
        };
      }
    }
  }
};
</script>

<style scoped>
.main {
  margin-top: 7em;
}
.details {
  margin-top: 1em;
}
.pimg {
  width: 100px;
  height: 100px;
}
h4 {
  margin-top: 0.5em;
}
</style>
