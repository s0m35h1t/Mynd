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
              <a is="sui-comment-author" href="/">{{
                comment.user.username
              }}</a>
              <sui-comment-metadata>
                <div>{{ hrDate(comment.created_at) }}</div>
              </sui-comment-metadata>
              <sui-comment-text> {{ comment.text }}</sui-comment-text>
              <sui-comment-actions> </sui-comment-actions>
            </sui-comment-content>
          </sui-comment>

          <sui-form reply>
            <textarea rows="2" class="pri"></textarea>

            <sui-button
              content="Add Reply"
              label-position="left"
              icon="edit"
              primary
              class="pri"
            />
          </sui-form>
        </sui-comment-group>

        <sui-rail position="right">
          <sui-segment>
            <div>
              <a :href="'/' + post.user.id">
                <sui-image
                  :src="
                    'http://localhost:1337' +
                      post.user.profile_img.formats.thumbnail.url
                  "
                  avatar
                />
              </a>
              <a class="paut" :href="'/' + post.user.id">
                {{ post.user.username }}
              </a>
            </div>
            <div text-align="left" class="details">
              <b>Description</b>
              <p>
                {{ post.description }}
              </p>
            </div>
            <div class="tags">
              <a
                v-for="topic in post.topics"
                :key="topic.id"
                is="sui-label"
                tag
              >
                {{ topic.title }}
              </a>
            </div>
            <div class="likes">
              <sui-icon slot="trigger" name="heart" color="red" size="large" />
              {{ likesLen(post) }}
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

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  components: {},
  methods: {
    likesLen(l) {
      return l.likes.length;
    },
    hrDate(d) {
      return moment(d).fromNow();
    }
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
