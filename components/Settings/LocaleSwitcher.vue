<template>
  <div>
    <div
      v-for="lang in availableLocales"
      :key="lang.iso"
      :value="lang.iso"
      class="dropdown-item"
      :class="{
        active: localeSetting == lang.iso,
      }"
      @click="localeSetting = lang.iso"
    >
      <i class="small">{{ lang.iso }}</i>
      {{ lang.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales } from '~/utils/lang'

// state
const localeSetting = useState<string>('locale.setting')
</script>
