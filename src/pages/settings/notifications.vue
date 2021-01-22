<template>
  <div class="q-pa-md bg-shade">
      <div class="text-h5 q-mb-md">NOTIFICATIONS</div>
      <div class="q-pt-md text-caption q-mb-md">DEV MODE</div>
      <div>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show badges for new log entries</q-item-label>
            <q-item-label caption>Shows a badge when there is a new log entry.</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="accent" v-model="uiEnableLogEntryBadge"/>
          </q-item-section>
        </q-item>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  mounter () {
    this.uiEnableLogEntryBadge = this.$q.localStorage.getItem('uiEnableLogEntryBadge')
  },
  data () {
    return {
      uiEnableLogEntryBadge: false
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
