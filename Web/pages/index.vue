<template>
  <div class="main">
    <sui-grid centered :columns="2">
      <sui-grid-column>
        <sui-card-group :items-per-row="3" stackable>
          <sui-card
            class="pcrd"
            v-for="post in posts"
            :key="post.id"
            @click="$router.push('/post/' + post.id)"
            v-bind:style="{
              overflow: 'hidden',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage:
                'url(http://localhost:1337' + post.image.url + ')'
            }"
          >
            <!-- <a :href="'/post/' + post.id"> -->
            <sui-image
              :src="'http://localhost:1337' + post.image.url"
              v-bind:style="{
                visibility: 'hidden'
              }"
            />
            <!-- </a> -->
          </sui-card>
        </sui-card-group>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  components: {},
  apollo: {
    posts: gql`
      query getPosts {
        posts {
          id
          description
          image {
            url
            width
            height
            formats
          }
        }
      }
    `
  }
};
</script>

<style scoped>
.main {
  margin-top: 7em;
}
</style>
