<template>
  <div class="bg-div main-bg-animated d-flex col">
    <div class="page-container full-page d-flex col container-md p-4 p-md-5 px-md-0 py-md-5">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4 m-md-auto">
        <div class="text-center p-4 pb-5 card-bg d-flex position-relative rounded">
          <div class="d-flex position-absolute top-bar p-2">
            <a v-if="previousUrl" :href="previousUrl" class="btn btn-transparent px-3 me-auto">
              <i class="fa-regular fa-arrow-left-long"></i>
            </a>
            <SettingsButton />
          </div>
          <div class="small-container col py-4">
            <img class="invert-dark logo mt-5 mb-3" height="42" width="42" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
            <br />
            <h5>{{ $t('pages.signup.title') }} <span class="text-red">Cloud</span> {{ $t('pages.signup.title2') }}</h5>
            <p class="text-red small">{{ $t('pages.signup.closed') }}</p>
            <form>
              <NuxtLink
                :to="{
                  name: 'auth-signin',
                  query: {
                    redirectUrl: redirectUrl,
                    previousUrl: previousUrl,
                  },
                }"
                class="me-auto my-auto"
              >
                {{ $t('pages.signup.signin') }}
              </NuxtLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let redirectUrl = null
let previousUrl = null

definePageMeta({
  layout: 'page',
})
</script>

