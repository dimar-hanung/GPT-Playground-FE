<template>
  <div
    v-wave
    class="transition-all hover:shadow-lg hover:bg-white p-1 rounded-lg select-none active:scale-95 active:shadow"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    @click="changeValue"
  >
    <!-- <input type="checkbox" class="hidden" v-model="value" /> -->
    <div class="flex place-items-center">
      <div>
        <div
          class="transition-all w-6 min-w-[1.5rem] h-6 rounded-full text-white grid place-items-center border-2 overflow-hidden"
          :class="[
            value === trueValue || checked
              ? 'bg-slate-100 border-primary-default'
              : 'border-slate-500'
          ]"
        >
          <Transition name="scale" mode="out-in">
            <div
              class="block text-base text-primary-default w-4 h-4 bg-primary-default rounded-full"
              :icon="['fa', 'check']"
              v-if="value === trueValue || checked"
            ></div>
          </Transition>
        </div>
      </div>
      <input
        ref="input"
        type="radio"
        :name="name"
        class="hidden"
        :value="value"
        :disabled="disabled"
        @change="$emit('update:value', trueValue)"
        :checked="value === trueValue || checked"
      />
      <div class="p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export interface Props {
  value?: any
  disabled?: boolean
  name?: string
  trueValue?: any
  falseValue?: any
  checked?: boolean
}

const emit = defineEmits<{
  (e: 'change', id: number): void

  (e: 'update:value', value: boolean): void
}>()

const input = ref<HTMLInputElement | null>(null)

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  trueValue: true,
  falseValue: false,
  checked: false
})

const changeValue = () => {
  if (input.value && !props.disabled) {
    input.value.checked = true
    emit('update:value', props.trueValue)
  }
}
</script>
