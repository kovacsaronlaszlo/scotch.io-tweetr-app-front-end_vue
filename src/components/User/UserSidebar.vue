<template>
  <div>
    <div class="ui attached segment">
      <form class="ui form" @submit.prevent="postTweet">

        <div class="field">
          <textarea name="tweet" v-model="tweet" rows="2" placeholder="Compose tweet"></textarea>
        </div>

        <button class="ui button primary" :disabled="!isFormValid">Csirip</button>

      </form>
    </div>
    <div class="ui bottom attached menu">
      <router-link class="item" to="/">
        <i class="home icon"></i>
      </router-link>
      <router-link class="item" :to="`/${user.username}`">Profilom</router-link>
      <router-link class="item" to="/settings/profile">Beállítások</router-link>
      <a class="item"><i class="sign out icon"></i></a>
    </div>
  </div>
</template>
<script>
import EventBus from '@/eventBus'
import axios from 'axios'
export default {
  name: 'UserSidebar',
  props: {
    user: {
      type: '',
      required: true
    }
  },
  data () {
    return {
      tweet: ''
    }
  },
  computed: {
    isFormValid () {
      return !!this.tweet
    }
  },
  methods: {
    postTweet () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .post('/tweet', {
          tweet: this.tweet
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // belő egy eseményt az eseménybuszba
          EventBus.$emit('tweetAdded', response.data.data)
          // kiüríti az input mezőt
          this.tweet = ''
        })
    }
  }
}
</script>
