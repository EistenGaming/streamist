<template>
  <div class="q-pa-md bg-shade">
    <div class="q-pa-md text-h5 q-mb-md">ACCOUNTS</div>
    <form autofocus @submit.prevent='saveAccountDataButtonPressed' @reset.prevent='cancelAccountDataButtonPressed'>
      <div v-if="addAccountState !== true">
        <div>
          <q-btn @click='addAccountButtonPressed' unelevated color='blue-grey-7' label='Add New' size='sm'/>
        </div>
      </div>
      <div v-if="addAccountState === true">
        <div class="row">
          <div class="column">
            <q-select
              v-model="accountTypeSelected"
              dense
              outlined
              :options="accountTypeOptions"
              style="width:100px"/>
          </div>
          <div class="column q-ml-md">
            <q-input
              ref='accountNameField'
              label='Account Name'
              outlined
              dense
              color="accent"
              v-model="accountName"
              error-message="Please use minimum of 3 characters."
              :error="!isAccountNameValid"
            />
          </div>
          <div class="column q-ml-md">
            <q-input
              ref='accountClientIDField'
              label='Account Client ID'
              outlined
              dense
              color="accent"
              v-model="accountClientID"
              error-message="Please enter a valid client ID."
              :error="!isAccountClientIDValid"
            />
          </div>
          <div class="column q-ml-md">
            <q-input
              ref='accountClientSecretField'
              label='Account Client Secret'
              outlined
              dense
              bottom-slots
              color="accent"
              :type=" isClientSecretVisible ? 'password' : 'text' "
              v-model="accountClientSecret"
              error-message="Please enter a valid client secret."
              :error="!isAccountClientSecretValid"
            >
              <template v-slot:append>
                <q-icon
                  :name="isClientSecretVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isClientSecretVisible = !isClientSecretVisible"
                />
              </template>
            </q-input>
          </div>
          <div class="column q-ma-xs">
            <div class="row q-ml-md">
              <q-btn @click='cancelAccountDataButtonPressed' type="reset" unelevated outline color='negative' icon="cancel" size='sm'/>
              <div class="q-ml-sm"/>
              <q-btn @click='saveAccountDataButtonPressed' type="submit" unelevated color='positive' icon="check_circle" size='sm'/>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="q-pt-md">
      <q-list bordered class="rounded-borders">
        <q-item>
          <q-item-section class="col-1">
            <q-item-label>Platform</q-item-label>
          </q-item-section>
          <q-item-section class="col-2">
            <q-item-label>Account Name</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Client ID</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Client Secret</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label></q-item-label>
          </q-item-section>
        </q-item>

        <div v-for='account in accounts' v-bind:key='account.type'>
          <q-item
            dense
            clickable
            @click='accountTypeSelected = account.type; accountName = account.name; accountClientID = account.id; accountClientSecret = account.secret; selectedAccountType = account.type'
            v-bind:class="{'accountItemStyleDark':(darkMode === true), 'accountItemStyleLight':(darkMode !== true) }">
            <q-item-section class="col-1">
              <q-item-label>{{ account.type }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label>{{ account.name }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ account.id }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pwHider }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <div class="row q-ml-md">
                <q-btn
                  @click='editAccountButtonPressed'
                  color='secondary'
                  icon="edit"
                  size='sm'
                />
                <div class="q-ml-sm"/>
                <q-btn @click='removeAccountButtonPressed' color='negative' icon="delete_forever" size='sm'/>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accounts',

  mounted () {
    if (this.$q.localStorage.getItem('accounts')) {
      try {
        this.accounts = JSON.parse(this.$q.localStorage.getItem('accounts'))
      } catch (e) {
        this.$q.localStorage.remove('accounts')
      }
    }
  },

  data () {
    return {
      selectedTab: 'accounts',
      accountTypeOptions: ['Twitch', 'Facebook', 'Youtube'],
      accountTypeSelected: 'Twitch',
      accountName: '',
      accountClientID: '',
      accountClientSecret: '',
      accounts: [],
      newAccount: null,
      selectedAccountType: '',
      selectedAccount: null,
      isClientSecretVisible: true,
      addAccountState: false,
      loginAtStartup: false,
      uiEnableDeveloperMode: false,
      uiEnableChatMessageBadge: false,
      uiEnableLogEntryBadge: false,
      pwHider: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
    }
  },
  computed: {
    isAccountNameValid () {
      if (this.accountName) {
        return this.accountName.length >= 3
      } else {
        return false
      }
    },
    isAccountClientIDValid () {
      if (this.accountClientID) {
        return this.accountClientID.length === 30
      } else {
        return false
      }
    },
    isAccountClientSecretValid () {
      if (this.accountClientSecret) {
        return this.accountClientSecret.length === 30
      } else {
        return false
      }
    },

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
  methods: {
    addAccountButtonPressed: function () {
      this.addAccountState = true
      if (this.$refs.accountNameField) {
        this.$nextTick(() => this.$refs.accountNameField.resetValidation())
        this.$nextTick(() => this.$refs.accountNameField.focus())
      } else {
        console.log('accountFieldName reference is broken.')
      }
    },
    cancelAccountDataButtonPressed: function () {
      // Revert changes, if any
      this.addAccountState = false
    },
    saveAccountDataButtonPressed: function () {
      // Do the saving - The validation is done on the field itself
      if (this.accountTypeSelected !== '' && this.$refs.accountNameField.error === false && this.$refs.accountClientIDField.error === false && this.$refs.accountClientSecretField.error === false) {
        this.newAccount = {
          type: this.accountTypeSelected,
          name: this.accountName,
          id: this.accountClientID,
          secret: this.accountClientSecret
        }
        this.addAccount()
      } else {
        console.log('Could not save the account data.')
      }
      // Reset conditional rendering flags
      this.addAccountState = false
    },
    addAccount: function () {
      // add new if type is not existent, overwrite if already there.
      if (this.accounts.findIndex(item => item.type === this.newAccount.type) >= 0) {
        // Entry already exists
        this.removeAccount(this.newAccount)
        this.accounts.push(this.newAccount)
        console.log('account already EXISTS and has been updated')
      } else {
        this.accounts.push(this.newAccount)
        console.log('account did NOT exist alredy and has been added')
      }
      this.newAccount = ''
      this.saveAccounts()
    },
    removeAccount: function () {
      // this.accounts.splice(account, 1)
      this.accounts = this.accounts.filter(item => item.type !== this.selectedAccountType)
      this.saveAccounts()
    },
    saveAccounts: function () {
      const parsed = JSON.stringify(this.accounts)
      this.$q.localStorage.set('accounts', parsed)
      console.log('Accounts: ' + parsed)
    },
    editAccountButtonPressed: function () {
      console.log(this.newAccount)
      this.addAccountState = true
      console.log('Edit account button pressed for platform: ')
    },
    removeAccountButtonPressed: function () {
      /** TODO Implement */
      this.removeAccount()
      // this.accounts = this.accounts.filter(item => item.type !== this.selectedAccountType)
      // this.saveAccounts()
      console.log('Remove account button pressed for platform: ' + this.selectedAccountType)
    } // The avatar should probably be uploadd as part of the profile. Ideally reachable via https.
  }
}
</script>

<style lang="scss">
.addAccountButtonAlignment {
  display: flex;
  flex-direction: column;
  justify-content: right;

}

.avatarAlignment {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: center;
}

.userDataAlignment {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
}

.avatarEditButtonPosition {
  position: absolute;
  top: 27px;
  right: 33px;
  z-index: 2;
}

.avatarEditButtonBGColor {
  background: rgba($color: #aab8be, $alpha: 0.7) //#b0bec5
}

.avatarEditButtonBGColor:hover {
  background: rgba($color: #aab8be, $alpha: 0.9)
}

.fileSelectionField {
  margin-left: 1px
}

.accountListStyleDark {
  background: #2F3136
}

.accountListStyleLight {
  background: #E6EDF2
}

.accountItemStyleLight:hover {
  background: #D4D6D8;
  color: white
}

.accountItemStyleDark:hover {
  background: #36393F;
  color: white
}
</style>
