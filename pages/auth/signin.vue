<template>
  <div class="main-bg-animated d-flex flex-grow-1 pa-0">
    <v-container class="page-container full-page d-flex">
      <v-row>
        <v-col cols="12" md="6" lg="7" xl="8" class="d-none d-md-block my-auto">
            <h2>
                <strong class="text-red">{{ $t('pages.signin.hero_title') }}</strong> {{ $t('pages.signin.hero_title2') }}<br>
                {{ $t('pages.signin.hero_title3') }} <strong class="text-red">{{ $t('pages.signin.hero_title4') }}</strong> {{ $t('pages.signin.hero_title5') }}
            </h2>
        </v-col>

        <v-col cols="12" md="6" lg="5" xl="4" class="my-md-auto">
          <div class="small-container mx-auto">
            <v-card class="text-center">
              <v-toolbar class="px-2">  
                  <v-btn 
                    size="small"
                    v-if="previousUrl" 
                    :href="previousUrl" 
                    icon="fa-regular fa-arrow-left-long" 
                    class="btn btn-transparent px-3 me-auto" 
                  />    
                  <v-btn
                    size="small"
                    icon="fa-regular fa-sliders"
                    @click.stop="preferenceMenu = !preferenceMenu"
                  />
              </v-toolbar>
              <v-card-text class="pb-10">
                <img class="invert-dark logo mb-3" height="42" width="42" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                <br>
                <h4>{{ $t('pages.signin.title') }}</h4>
                <p class="mt-2 mb-4">{{ $t('pages.signin.subtitle1') }} <span class="text-red">Cloud</span> {{ $t('pages.signin.subtitle2') }}</p>

                <p class="text-red small" v-if="error">{{ error }}</p>
                
                  <form id="formEmail" v-if="currentStep == 1" v-on:submit.prevent="checkUser">
                      <v-text-field
                        v-model="email"
                        type="email"
                        :label="$t('forms.email')"
                        variant="outlined"
                        :hint="$t('pages.signin.hint1')"
                        persistent-hint
                        required
                      ></v-text-field>

                  </form>

                  <form id="formPassword" v-if="currentStep == 2" v-on:submit.prevent="login">
                      <v-chip
                        class="mb-4 text-body"
                        append-icon="fa-regular fa-angle-down"
                        @click="currentStep--"
                      >
                        {{ email }}
                      </v-chip>
                      <v-text-field
                        v-model="password"
                        class="clickable"
                        variant="outlined"
                        :append-icon="showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"
                        @click:append="() => (showPassword = !showPassword)"
                        :type="showPassword ? 'text' : 'password'"
                        :label="$t('forms.password')"
                        required
                      ></v-text-field>
                  </form>
              </v-card-text>
              <v-card-actions v-if="currentStep == 1">
                <v-btn
                  :to="{ name: 'auth-signup', query: { redirectUrl: redirectUrl, previousUrl: previousUrl } }"
                  variant="text"
                > 
                  {{ $t('pages.signup.nav') }}
                </v-btn>
                <v-btn
                  variant="text"
                  color="red"
                  class="ms-auto"
                  form="formEmail"
                  type="submit"
                > 
                  {{ $t('actions.next') }}
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="currentStep == 2">
                <v-btn
                  variant="text"
                > 
                  {{ $t('pages.signup.forgot_password') }}
                </v-btn>
                <v-btn
                  variant="text"
                  color="red"
                  class="ms-auto"
                  form="formPassword"
                  type="submit"
                > 
                  {{ $t('pages.signin.title') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Preference Menu -->
    <v-navigation-drawer
      v-model="preferenceMenu"
      temporary
      rounded
      position="right"
      width="380"
    >
      <v-toolbar>
        <v-toolbar-title class="me-auto">
          {{ $t('components.settings.title') }}
        </v-toolbar-title>
        <v-btn
          size="small"
          icon="fa-regular fa-times"
          @click.stop="preferenceMenu = !preferenceMenu"
        />
      </v-toolbar>
      <SettingsMenu />
    </v-navigation-drawer>
  </div>
</template>

<script>
  import authenticationService from '../../services/AuthenticationService'

  export default {
    setup () {
      definePageMeta({
        layout: 'page',
      })
    },
    data () {
      const route = useRoute()
      return {
        redirectUrl: route.query.redirectUrl,
        previousUrl: route.query.previousUrl,
        email: '',
        password: '',
        error: null,
        success: false,
        loading: false,
        currentStep: 1,
        preferenceMenu: false,
        showPassword: false,
      }
    },
    methods: {
      async checkUser () {
        try {
          this.error = null
          this.loading = true

          const response = await authenticationService.checkUser({
              email: this.email
          })
          setTimeout(() => {
            if( !response.data.error ) {
              this.currentStep++
              this.error = null
              this.loading = false
            }else{
              this.error = response.data.error
              this.loading = false
            }
          }, 200)
        } catch (err) {
          this.loading = false
        }
      },
      async login () {
        try {
          this.error = null
          this.loading = true

          const response = await authenticationService.login({
              email: this.email,
              password: this.password
          })

          setTimeout(() => {
            this.error = null
            this.success = true
            if( !response.data.error ) {
              localStorage.setItem('jwtkn', response.data.token)
              setTimeout(() => {
                if(process.client) {
                  if(!this.redirectUrl) {
                    this.redirectUrl = window.location.protocol + '//' + window.location.hostname
                    if(window.location.port) {
                      this.redirectUrl += ":" + window.location.port
                    }
                  }
                  window.location.href = this.redirectUrl
                }
              }, 200)
            }else{
              this.error = response.data.error
              this.loading = false
            }
          }, 200)
        } catch (err) {
          this.loading = false
        }
      }
    },
    name: "Sign in"
  };
</script>
