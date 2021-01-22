<template>
  <div class="q-pa-md bg-shade">
    <div class="text-h5 q-mb-md">APPEARANCE</div>
    <div class="q-pt-sm text-caption q-mb-md">THEME</div>
    <div>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Enable Dark Mode</q-item-label>
          <q-item-label caption>Change the UI theme to light or dark mode.</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="accent" v-model="darkMode"/>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-pt-md text-caption q-mb-md">ADVANCED</div>
    <div>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Developer Mode</q-item-label>
          <q-item-label caption>Developer mode exposes functionality helpful for debugging and extending the app.</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="accent" v-model="uiEnableDeveloperMode"/>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Appearance',
  data () {
    return {
      uiEnableDeveloperMode: false
    }
  },
  computed: {
    darkMode: {
      get () {
        return this.$store.getters['ui/darkMode']
      },
      set (val) {
        this.$q.dark.set(val)
        this.$store.commit('ui/toggleDarkMode')
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
