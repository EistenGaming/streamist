<template>
  <div class="full-width">
    <div class="row">
      <div class="border-1 border-rounded-5 border-black4">
        <div class="column q-ma-md">
          <form @submit.prevent='saveAddTopicButtonPressed'>
            <div class="row">
              <div class="column">
                <q-input
                  ref='contentTopicNameField'
                  label='Topic Name'
                  outlined
                  dense
                  color="accent"
                  style="width: 300px"
                  v-model="contentTopicName"
                  error-message="Please use minimum of 3 characters."
                  :error="!isContentTopicNameValid"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <q-checkbox v-model="contentTopicPlatformsSelected" val="Twitch" label="Twitch" color="purple"/>
              <q-checkbox v-model="contentTopicPlatformsSelected" val="Facebook" label="Facebook" color="blue"/>
              <q-checkbox v-model="contentTopicPlatformsSelected" val="YouTube" label="YouTube" color="red"/>
            </div>
            <div class="row q-mt-md">
              <q-input
                v-model="contentTopicDescription"
                stack-label
                label="Add a description"
                filled
                autogrow
                type="textarea"
                style="width: 300px"
              />
            </div>
            <div class="row q-mt-md">
              <q-input
                ref='contentTopicExtLinkField'
                label='External Link'
                outlined
                dense
                color="accent"
                style="width: 300px"
                v-model="contentTopicExternalLink"
              >
                <template v-slot:prepend>
                  <q-icon name="link" />
                </template>
              </q-input>
            </div>
            <div class="row q-mt-md">
              <q-input
                ref='contentTopicExtLinkField2'
                label='External Link'
                outlined
                dense
                color="accent"
                style="width: 300px"
                v-model="contentTopicExternalLink2"
              >
                <template v-slot:prepend>
                  <q-icon name="link" />
                </template>
              </q-input>
            </div>
            <div class="row q-mt-lg">
              <q-btn @click='cancelAddTopicButtonPressed' type="reset" unelevated outline color='negative' icon="cancel" size='sm' />
              <div class="q-ml-sm"/>
              <q-btn type="submit" unelevated color='positive' icon="check_circle" size='sm' />
            </div>
          </form>
        </div>
      </div>
      <div class="q-ml-md elementBorder col-grow">
        <div class="q-ma-md column">
          <q-list >
            <q-item v-for="contentTopic in contentTopicList" :key="contentTopic.id" clickable>
              <q-item-section class="col-2">
                <q-item-label>{{contentTopic.name}}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label v-for="platform in contentTopic.platforms" :key="platform">
                  {{platform}}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col-3" >
                <q-item-label>{{contentTopic.description}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <div v-if="contentTopic.extLink1 !== ''">
                  <q-btn flat >
                    <div class="ellipsis">
                      Link 1
                    </div>
                  </q-btn>
                </div>
              </q-item-section>
              <q-item-section class="col-1">
                <div v-if="contentTopic.extLink2 !== ''">
                  <q-btn flat>
                    <div class="ellipsis">
                      Link 2
                    </div>
                  </q-btn>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click='editContentTopicEntryButtonPressed(contentTopic.id)'
                  color='secondary'
                  icon="edit"
                  size='xs'
                />
              </q-item-section>
              <q-item-section side>
                <q-btn @click='removeContentTopicEntryButtonPressed(contentTopic.id)'
                       color='negative'
                       icon="delete_forever"
                       size='xs'
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const util = require('src/utils/utility')
const twLib = require('src/utils/twitch-utils')

export default {
  name: 'content-topics',
  data () {
    return {
      // Add vars
      activePlanningTab: 'ContentTopics',
      contentTopicPlatformsSelected: [],
      contentTopicImageURL: '',
      contentTopicName: '',
      contentTopicDescription: '',
      contentTopicExternalLink: '',
      contentTopicExternalLink2: '',
      contentTopicID: '',
      contentTopicList: []
    }
  },
  mounted () { // This allows you to do stuff 'on page load'
    if (this.$q.localStorage.getItem('contentTopicList')) {
      try {
        this.contentTopicList = JSON.parse(this.$q.localStorage.getItem('contentTopicList'))
      } catch (e) {
        this.$q.localStorage.remove('contentTopicList')
      }
    }
  },
  watch: {
  },
  methods: {
    // Methods
    cancelAddTopicButtonPressed: function () {
      this.contentTopicName = ''
      this.contentTopicPlatformsSelected = []
      this.contentTopicDescription = ''
      this.contentTopicExternalLink = ''
      this.contentTopicExternalLink2 = ''
      console.log('Topic add cancelled')
    },
    saveAddTopicButtonPressed: async function () {
      if (this.contentTopicList.filter(item => item.id === this.contentTopicID).length > 0) {
        /** The entry exists */
        // filter out the old one
        this.contentTopicList = this.contentTopicList.filter(item => item.id !== this.contentTopicID)
        // add the updated one
        this.contentTopicImageURL = await twLib.getGameBoxUrl(this.contentTopicName)
        this.contentTopicList.push({ id: this.contentTopicID, name: this.contentTopicName, imgUrl: this.contentTopicImageURL, platforms: this.contentTopicPlatformsSelected, description: this.contentTopicDescription, extLink1: this.contentTopicExternalLink, extLink2: this.contentTopicExternalLink2 })
        this.contentTopicID = ''
        console.log('Updated topic')
      } else {
        this.contentTopicImageURL = await twLib.getGameBoxUrl(this.contentTopicName)
        this.contentTopicList.push({ id: util.createUUIDv4(), name: this.contentTopicName, imgUrl: this.contentTopicImageURL, platforms: this.contentTopicPlatformsSelected, description: this.contentTopicDescription, extLink1: this.contentTopicExternalLink, extLink2: this.contentTopicExternalLink2 })
        console.log('Added topic')
      }
      this.saveContentTopics()
      console.log('Saved topic list')
      /** Clearing the form */
      this.contentTopicName = ''
      this.contentTopicPlatformsSelected = []
      this.contentTopicDescription = ''
      this.contentTopicExternalLink = ''
      this.contentTopicExternalLink2 = ''
    },
    saveContentTopics: function () {
      const parsed = JSON.stringify(this.contentTopicList)
      this.$q.localStorage.set('contentTopicList', parsed)
      console.log('Content Topic List: ' + parsed)
    },
    editContentTopicEntryButtonPressed: function (id) {
      // TODO: Implement
      const entry = this.contentTopicList.filter(item => item.id === id)
      this.contentTopicID = entry[0].id
      this.contentTopicName = entry[0].name
      this.contentTopicImageURL = entry[0].imgUrl
      this.contentTopicPlatformsSelected = entry[0].platforms
      this.contentTopicDescription = entry[0].description
      this.contentTopicExternalLink = entry[0].extLink1
      this.contentTopicExternalLink2 = entry[0].extLink2
    },
    removeContentTopicEntryButtonPressed: function (id) {
      this.contentTopicList = this.contentTopicList.filter(item => item.id !== id)
      this.saveContentTopics()
      console.log('delete content topic with id: ' + id)
    }
  },
  computed: {
    // Computed methods
    isContentTopicNameValid () {
      if (this.contentTopicName) {
        return this.contentTopicName.length >= 3
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
