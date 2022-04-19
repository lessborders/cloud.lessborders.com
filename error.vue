<template>
  <div class="text-center d-flex m-vh-100">
    <div class="m-auto container p-5">
      <div class="pb-5">
        <h1>
          {{ error.statusCode }}
        </h1>
        <h3>
          {{ $t('errors.' + error.statusCode + '.title') }}
        </h3>
        <p>
          {{ $t('errors.' + error.statusCode + '.description') }}
        </p>
        <a href="/" class="btn btn-primary">{{ $t('errors.back') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
