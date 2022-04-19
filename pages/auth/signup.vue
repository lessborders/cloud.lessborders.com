<template>
  <div class="main-bg-animated d-flex flex-grow-1 pa-0">
    <v-container class="page-container full-page d-flex">
      <v-row>
        <v-col cols="12" md="6" lg="5" xl="4" class="ma-sm-auto">
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
              </v-toolbar>
              <v-card-text class="pb-10">
                <img class="invert-dark logo mb-3" height="42" width="42" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                <br />
                <h4>{{ $t('pages.signup.title') }} <span class="text-red">Cloud</span> {{ $t('pages.signup.title2') }}</h4>
              </v-card-text>
                                <v-banner 
                    class="text-left"
                    color="red"
                  >
                    <template v-slot:text>
                      {{ $t('pages.signup.closed') }}
                    </template>

                    <template v-slot:actions>
                      <v-btn
                        :to="{
                          name: 'auth-signin',
                          query: {
                            redirectUrl: redirectUrl,
                            previousUrl: previousUrl,
                          },
                        }"
                      >
                        {{ $t('pages.signup.signin') }}
                      </v-btn>
                    </template>
                  </v-banner>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
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
    name: "Create an account"
  };
</script>


