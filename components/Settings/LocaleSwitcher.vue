<template>
  <div>
    <v-list-item
      v-for="lang in availableLocales"
      :key="lang.iso"
      :value="lang.iso"
      :class="{
        'v-list-item--active': localeSetting == lang.iso,
      }"
      @click="localeSetting = lang.iso"
    >
      <i class="small">{{ lang.iso }}</i>
      {{ lang.name }}
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales } from '~/utils/lang'

// state
const localeSetting = useState<string>('locale.setting')
</script>
