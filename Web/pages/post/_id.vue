<template>
  <div class="main">
    <sui-grid centered :columns="3">
      <sui-grid-column v-if="post">
        <sui-image
          class="pimg"
          :src="'http://localhost:1337' + post.image.url"
          fluid
        />
        <sui-comment-group>
          <h3 is="sui-header" dividing>Comments</h3>

          <sui-comment v-for="comment in post.comments" :key="comment.id">
            <sui-comment-avatar
              :src="
                'http://localhost:1337' +
                  comment.user.profile_img.formats.thumbnail.url
              "
            />
            <sui-comment-content>
              <nuxt-link is="sui-comment-author" to="/">{{
                comment.user.username
              }}</nuxt-link>
              <sui-comment-metadata>
                <div>{{ hrDate(comment.created_at) }}</div>
              </sui-comment-metadata>
              <sui-comment-text> {{ comment.text }}</sui-comment-text>
              <sui-comment-actions> </sui-comment-actions>
            </sui-comment-content>
          </sui-comment>

          <sui-comment v-for="comment in comments" :key="comment.id">
            <sui-comment-avatar
              :src="
                'http://localhost:1337' +
                  loggedInUser.profile_img.formats.thumbnail.url
              "
            />
            <sui-comment-content>
              <nuxt-link is="sui-comment-author" to="/">{{
                loggedInUser.username
              }}</nuxt-link>
              <sui-comment-metadata>
                <div>{{ hrDate(comment.created_at) }}</div>
              </sui-comment-metadata>
              <sui-comment-text> {{ comment.text }}</sui-comment-text>
              <sui-comment-actions> </sui-comment-actions>
            </sui-comment-content>
          </sui-comment>

          <sui-form>
            <textarea rows="2" v-model="text" class="pri"></textarea>

            <sui-button
              content="Add Reply"
              label-position="left"
              icon="edit"
              @click.prevent="reply()"
              primary
              class="pri"
            />
          </sui-form>
        </sui-comment-group>

        <sui-rail position="right">
          <sui-segment>
            <div>
              <nuxt-link :to="'/' + post.user.id">
                <sui-image
                  :style="{
                    overflow: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      'url(http://localhost:1337' +
                        post.user.profile_img.formats.thumbnail.url ||
                      '/uploads/_07348acc6e.png?91490' + ')'
                  }"
                  src=""
                  avatar
                />
              </nuxt-link>
              <nuxt-link class="paut" :to="'/' + post.user.id">
                {{ post.user.username }}
              </nuxt-link>
            </div>
            <div text-align="left" class="details">
              <b>Description</b>
              <p>
                {{ post.description }}
              </p>
            </div>
            <div class="tags">
              <nuxt-link
                v-for="topic in post.topics"
                to="/"
                :key="topic.id"
                is="sui-label"
                tag
              >
                {{ topic.title }}
              </nuxt-link>
            </div>
            <div class="likes">
              <sui-feed-like>
                <sui-icon name="like" @click="like()" :class="{ red: l }" />
                <span> {{ likesLen(post) + l }} Likes </span>
              </sui-feed-like>
            </div>
          </sui-segment>
        </sui-rail>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
import { mapMutations, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      l: 0,
      cid: 3746,
      text: "",
      comments: []
    };
  },
  components: {},
  methods: {
    async reply() {
      if (!this.isAuthenticated) this.$router.push("/login");
      else {
        let comment = {
          text: this.text,
          user: this.loggedInUser.id,
          post: this.id
        };
        let c = await axios.post("http://localhost:1337/comments", comment);
        this.comments.push(c);
        this.text = "";
      }
    },
    likesLen(l) {
      return l.likes.length;
    },
    hrDate(d) {
      return moment(d).fromNow();
    },
    like() {
      if (!this.isAuthenticated) this.$router.push("/login");
      else {
        if (this.l == 0) this.l = 1;
        else this.l = 0;
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  apollo: {
    post: {
      query: gql`
        query getPost($id: ID!) {
          post(id: $id) {
            description
            id
            image {
              url
            }
            user {
              username
              id
              profile_img {
                formats
              }
            }
            comments {
              text
              user {
                id
                username
                profile_img {
                  formats
                }
              }
              created_at
            }
            topics {
              id
              title
            }
            likes {
              id
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

.pri {
  margin-top: 1em;
}
.details {
  margin: 1.5em 0;
}
.tag {
  margin: 5px;
}
.likes {
  margin-top: 1em;
}
.pimg {
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}
.paut {
  font-size: 1em;
  font-weight: 700;
}
</style>
