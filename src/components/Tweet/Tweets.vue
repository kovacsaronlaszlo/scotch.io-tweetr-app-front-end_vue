<template>
  <div class="ui feed">
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"/>
  </div>
</template>
<script>
import Tweet from '@/components/Tweet/Tweet'
import EventBus from '@/eventBus'
export default {
  name: 'Tweets',
  components: { Tweet },
  props: {
    tweets: {
      type: Array,
      required: true
    },
    authUser: {
      type: '',
      required: true
    }
  },
  created () {
    // figyeli az esemény létrehozást
    EventBus.$on('tweetAdded', this.fetchAddedTweet)
  },
  methods: {
    fetchAddedTweet (tweet) {
      // hozzáadja a tweet-et a tweet-ek tetjéhez
      this.tweets.unshift(tweet)
    }
  }
}
</script>
