<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Log In</h2>

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password" placeholder="Jelszó" required>
        </div>

        <button class="fluid ui primary button">Belépés</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Nincs még fiókod? <router-link to="/signup">Regisztáció</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notification from '@/components/Notification'
import axios from 'axios'
export default {
  name: 'LogInForm',
  components: {
    Notification
  },
  data () {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')
    return token ? next('/') : next()
  },
  methods: {
    login () {
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // localsotrage-ba menti a tokent
          localStorage.setItem('tweetr-token', response.data.data.token)

          // átirányítja a felhasználót az index oldalra
          this.$router.push('/')
        })
        .catch(error => {
          // kiüríti az ürlap mezőit
          this.email = this.password = ''

          // hibaüzenet megjelenítő
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>
