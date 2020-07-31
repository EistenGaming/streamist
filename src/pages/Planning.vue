<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-h3 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Planning</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          <div style="width:100%" class=" column">
            <div class="row">
               <q-tabs
                  v-model="activePlanningTab"
                  dense
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="ContentTopics" label="Content Topics" />
                  <q-tab name="ContentCreationSchedule" label="Schedule" />
                  <q-tab name="PlatformGoals" label="Goals" />
                </q-tabs>
            </div>
            <div class="row">
              <q-tab-panels v-model="activePlanningTab" class=" bg-secondary" animated >
                  <q-tab-panel name="ContentTopics" >
                    <div style="width:100%">
                      <div class="row">
                        <div class="elementBorder">
                          <div class="column q-ma-md">
                            <form @submit.prevent='saveAddTopicButtonPressed'>
                              <div class="row">
                                  <div class="column ">
                                    <q-input
                                      ref='contentTopicNameField'
                                      label='Topic Name'
                                      outlined
                                      dense
                                      dark
                                      color="accent"
                                      bg-color="secondary"
                                      style="width: 300px"
                                      v-model="contentTopicName"
                                      error-message="Please use minimum of 3 characters."
                                      :error="!isContentTopicNameValid"
                                    />
                                  </div>
                              </div>
                              <div class="row q-mt-md">
                                <q-checkbox dark v-model="contentTopicPlatformsSelected" val="Twitch" label="Twitch" color="purple"/>
                                <q-checkbox dark v-model="contentTopicPlatformsSelected" val="Facebook" label="Facebook" color="blue"/>
                                <q-checkbox dark v-model="contentTopicPlatformsSelected" val="YouTube" label="YouTube" color="red"/>
                              </div>
                              <div class="row q-mt-md">
                                <q-input
                                  dark
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
                                  dark
                                  color="accent"
                                  bg-color="secondary"
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
                                  dark
                                  color="accent"
                                  bg-color="secondary"
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
                                  <q-item-section avatar>
                                    <q-avatar>
                                      <img :src=contentTopic.imgUrl>
                                    </q-avatar>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>{{contentTopic.name}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-for="platform in contentTopic.platforms" :key="platform">
                                      {{platform}}
                                    </q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label>{{contentTopic.description}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <div v-if="contentTopic.extLink1 !== ''">
                                      <q-btn flat label="Link 1"/>
                                    </div>
                                  </q-item-section>
                                  <q-item-section>
                                    <div v-if="contentTopic.extLink2 !== ''">
                                      <q-btn flat label="Link 2"/>
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
                  </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
      </q-page>
</template>

<script>
var util = require('src/utils/utility')
var twLib = require('src/utils/twitch-utils')
export default {
  name: 'Planning',
  data () {
    return {
      // Add vars
      localTextColor1: '',
      localTextColor2: '',
      activePlanningTab: 'ContentTopics',
      contentTopicPlatformsSelected: [],
      contentTopicImageURL: '',
      contentTopicName: '',
      contentTopicDescription: '',
      contentTopicExternalLink: '',
      contentTopicExternalLink2: '',
      contentTopicList: []
    }
  },
  mounted () { // This allows you to do stuff 'on page load'
    this.uiEnableDarkMode = this.$q.localStorage.getItem('uiEnableDarkMode')
    if (this.uiEnableDarkMode) {
      this.localTextColor1 = this.$darkTextColor1
      this.localTextColor2 = this.$darkTextColor2
    } else {
      this.localTextColor1 = this.$lightTextColor1
      this.localTextColor2 = this.$lightTextColor2
    }
    if (this.$q.localStorage.getItem('contentTopicList')) {
      try {
        this.contentTopicList = JSON.parse(this.$q.localStorage.getItem('contentTopicList'))
      } catch (e) {
        this.$q.localStorage.remove('contentTopicList')
      }
    }
  },
  watch: {
    uiEnableDarkMode: function () {
      if (this.uiEnableDarkMode) {
        this.localTextColor1 = this.$darkTextColor1
        this.localTextColor2 = this.$darkTextColor2
      } else {
        this.localTextColor1 = this.$lightTextColor1
        this.localTextColor2 = this.$lightTextColor2
      }
    }
  },
  methods: {
    // Methods
    cancelAddTopicButtonPressed: function () {
      // TODO: IMPLEMENT
      console.log('Topic add cancelled')
    },
    saveAddTopicButtonPressed: async function () {
      this.contentTopicImageURL = await twLib.getGameBoxUrl(this.contentTopicName)
      // TODO: Overwrite (if existing) vs add
      this.contentTopicList.push({ id: util.createUUIDv4(), name: this.contentTopicName, imgUrl: this.contentTopicImageURL, platforms: this.contentTopicPlatformsSelected, description: this.contentTopicDescription, extLink1: this.contentTopicExternalLink, extLink2: this.contentTopicExternalLink2 })
      console.log('Added topic')
      this.saveContentTopics()
      console.log('Saved topic list')
    },
    saveContentTopics: function () {
      const parsed = JSON.stringify(this.contentTopicList)
      this.$q.localStorage.set('contentTopicList', parsed)
      console.log('Content Topic List: ' + parsed)
    },
    editContentTopicEntryButtonPressed: function (id) {
      // TODO: Implement
      console.log('edit content topic with id: ' + id)
      var entry = this.contentTopicList.filter(item => item.id === id)
      console.log(entry)
      this.contentTopicName = entry[0].name
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
<style lang="scss">
  .queryDataListStyleDark {
    background: #2F3136
  }
  .queryDataListStyleLight {
    background: #E6EDF2
  }
  .queryDataItemStyleLight:hover {
    background: #D4D6D8;
    color: white
  }
  .queryDataItemStyleDark:hover {
    background: #36393F;
    color: white
  }
  .elementBorder {
    border-style: solid;
    border-width: thin;
    border-radius: 7px
  }
</style>
