<template>
  <div class="q-pa-md bg-shade">
    <div class="q-pa-md text-h5 q-mb-md">CONNECTIVITY</div>
    <div>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Login automatically</q-item-label>
          <q-item-label caption>If you have provided your authentication credentials in the 'MY ACCOUNT' section of the settings, you will be automatically logged in when the application starts.</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="accent" v-model="loginAtStartup"/>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connectivity',
  data () {
    return {
      loginAtStartup: this.$q.localStorage.getItem('loginAtStartup')
    }
  },
  watch: {
    loginAtStartup () {
      this.$q.localStorage.set('loginAtStartup', this.loginAtStartup)
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
