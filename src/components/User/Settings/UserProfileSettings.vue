<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu/>

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Felhasználó profilom</h2>

        <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

        <form class="ui form" @submit.prevent="updateProfile">

          <div class="field" :class="{ error: errors.has('name') }">
            <label>Teljes neved</label>
            <input type="text" name="name" v-model="name" v-validate="'required'">
            <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('name') }">
            <label>Felhasználó neved</label>
            <input type="text" name="username" v-model="username" v-validate="'required'">
            <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('email') }">
            <label>Email címed</label>
            <input type="text" name="email" v-model="email" v-validate="'required'">
            <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
          </div>

          <div class="field">
            <label>Bemutatkozás</label>
            <textarea v-model="bio" rows="5" placeholder="Írd le mit érdemes tudni rólad"></textarea>
          </div>

          <div class="field">
            <label>Lakcímed</label>
            <input type="text" v-model="location" placeholder="Hol laksz?"/>
          </div>

          <div class="field">
            <label>Weblap URL</label>
            <input type="url" v-model="websiteUrl" placeholder="Weblap URL"/>
          </div>

          <button class="ui button primary">Változások mentése</button>

        </form>

      </div>
    </div>
  </div>
</template>
<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import axios from 'axios'
export default {
  name: 'UserProfileSettings',
  components: {
    Notification,
    UserSettingsMenu
  },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      bio: '',
      location: '',
      websiteUrl: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')
    return token ? next() : next('/login')
  },
  created () {
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.name = response.data.data.name
          this.username = response.data.data.username
          this.email = response.data.data.email
          this.location = response.data.data.location
          this.bio = response.data.data.bio
          this.websiteUrl = response.data.data.website_url
        })
    },
    updateProfile () {
      const token = localStorage.getItem('tweetr-token')

      axios
        .put('/account/update:profile', {
          name: this.name,
          username: this.username,
          email: this.email,
          location: this.location,
          bio: this.bio,
          website_url: this.websiteUrl
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // sikeres értesítés
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
        })
    }
  }
}
</script>
