<template>
  <div class="bg-div main-bg-animated d-flex col">
    <div class="page-container full-page d-flex col container-md p-4 p-md-5 px-md-0 py-md-5">
      <div class="col-12 col-md-6 col-lg-7 col-xl-8 d-none d-md-block my-auto">
          <div class="h2">
              <strong class="text-red">{{ $t('pages.signin.hero_title') }}</strong> {{ $t('pages.signin.hero_title2') }}<br>
              {{ $t('pages.signin.hero_title3') }} <strong class="text-red">{{ $t('pages.signin.hero_title4') }}</strong> {{ $t('pages.signin.hero_title5') }}
          </div>
      </div>

      <div class="col-12 col-md-6 col-lg-5 col-xl-4 my-md-auto">
          <div class="text-center p-4 pb-5 card-bg d-flex position-relative rounded">
              <div class="d-flex position-absolute top-bar p-2">  
                  <a v-if="previousUrl" :href="previousUrl" class="btn btn-transparent px-3 me-auto"><i class="fa-regular fa-arrow-left-long"></i></a>
                  <SettingsButton />
              </div>
              <div class="small-container col py-4">
                  <img class="invert-dark logo mt-5 mb-3" height="42" width="42" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                  <br>

                  <h5>{{ $t('pages.signin.title') }}</h5>
                  <p>{{ $t('pages.signin.subtitle1') }} <span class="text-red">Cloud</span> {{ $t('pages.signin.subtitle2') }}</p>
                  
                  <p class="text-red small" v-if="error">{{ error }}</p>

                  <form v-if="currentStep == 1" v-on:submit.prevent="checkUser">
                      <div class="form-floating mb-2">
                          <input v-model="email" name="email" type="email" class="form-control" placeholder="Email" required/>
                          <label for="email">{{ $t('forms.email') }}</label>
                      </div>

                      <p class="mt-3 text-start meta">
                          {{ $t('pages.signin.hint1') }}
                      </p>
                      
                      <div class="mt-3 d-flex">
                          <NuxtLink :to="{ name: 'auth-signup', query: { redirect_url: redirectUrl, previous_url: previousUrl } }" class="me-auto my-auto">{{ $t('pages.signup.nav') }}</NuxtLink>
                          <button :disabled="loading" type="submit" class="btn btn-primary ms-auto"><span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> {{ $t('actions.next') }}</button>
                      </div>

                  </form>

                  <form v-if="currentStep == 2" v-on:submit.prevent="login">

                      <div class="btn btn-sm btn-light mb-4" @click="currentStep--">
                          {{ email }} &nbsp;<i class="fa fa-angle-down"></i>
                      </div>

                      <div class="form-floating mb-2">
                          <input v-model="password" name="password" type="password" class="form-control" placeholder="Password" required/>
                          <label for="password">{{ $t('forms.password') }}</label>
                      </div>
                      
                      <div class="mt-3 d-flex">
                          <NuxtLink :to="{ name: 'auth-signup' }" class="me-auto my-auto">{{ $t('pages.signup.forgot_password') }}</NuxtLink>

                          <button v-if="!success" :disabled="loading" type="submit" class="btn btn-primary ms-auto">
                              <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Sign in
                          </button>
                          <button v-if="success" disabled type="submit" class="btn btn-green ms-auto">
                              <i class="fa fa-check"></i>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import authenticationService from '../../../services/AuthenticationService.js'

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
        currentStep: 1
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
              //this.$store.dispatch('setToken', response.data.token)
              //this.$store.dispatch('setUser', response.data.user)
              setTimeout(() => {
                if(process.client) {
                  window.location.href = this.redirect_url
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
