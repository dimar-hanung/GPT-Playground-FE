<template>
  <!-- asdasd -->
  <button
    v-wave
    class="button__primary p-2 hover:opacity-75 relative active:shadow-button"
    :class="{
      '--variant-primary': variant == 'primary',
      '--variant-primary-outline': !loading && variant === 'primary-outlined',
      '--variant-primary-light': variant === 'primary-light',
      '--variant-disabled': disabled || loading
    }"
    :disabled="disabled || loading"
    :type="type"
  >
    <transition name="slide-fade" mode="out-in" :duration="200">
      <div v-if="loading">
        Mohon Tunggu...
        <font-awesome class="animate-spin" :icon="['fa', 'spinner']"></font-awesome>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </transition>
  </button>
</template>
<script lang="ts">
/**
 * Inin Deskrtpsi
 */
export default {}
</script>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

export interface Props {
  /**
   * Test deskripsi
   */
  variant?: 'primary' | 'primary-outlined' | 'primary-light'
  /**
   * disabled bertujuan untuk mematikan dan memadamkan button sesuai dengan kondisi yang diinginkan: \
   * 🌻 widya, 2022 desember
   */
  disabled?: boolean
  loading?: boolean
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<Props>(), { variant: 'primary' })
</script>

<style lang="scss">
.button__primary {
  @apply text-white block outline-none rounded-md;
  transition: all ease 0.3s;
  &.--variant-primary {
    @apply bg-blue-600;
    &-outline {
      @apply bg-transparent border-2 border-blue-600 text-blue-600;
    }
    &-light {
      @apply bg-white text-blue-600;
    }
  }

  &.--variant-secondary {
    @apply bg-blue-600 text-blue-600;
  }

  &.--variant-disabled {
    @apply opacity-50 bg-slate-800;
  }

  &:disabled {
    cursor: not-allowed !important;
  }
}
</style>
