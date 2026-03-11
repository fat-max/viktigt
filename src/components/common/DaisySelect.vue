<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/vue'

interface Props {
  modelValue: any
  options?: any
  placeholder?: string
  multiple?: boolean
  labelKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Välj alternativ',
  multiple: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const query = ref('')
// const model = defineModel()
const selected = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const filteredOptions = computed(() => {
  if (query.value.length < 3 && props.options.length > 40) return []

  return props.options.filter((o: any) =>
    (props.labelKey ? o[props.labelKey] : o).toLowerCase().includes(query.value.toLowerCase()),
  )
})

/* floating dropdown */
const reference = ref()
const floating = ref()
const { floatingStyles } = useFloating(reference, floating, {
  middleware: [offset(6), flip(), shift()],
  whileElementsMounted: autoUpdate,
})

function removeTag(option: any) {
  if (!Array.isArray(selected.value)) return

  selected.value = selected.value.filter((o) => o.value !== option.value)
}
</script>

<template>
  <Combobox v-model="selected" :multiple="multiple">
    <div class="w-full">
      <div
        ref="reference"
        class="flex flex-wrap items-center gap-1 w-full min-h-[3rem] cursor-text"
      >
        <span
          v-if="multiple && Array.isArray(modelValue)"
          v-for="item in modelValue"
          :key="item"
          class="badge badge-primary gap-1 flex items-center"
        >
          {{ labelKey ? item[labelKey] : item }}
          <button class="ml-1" @click.stop="removeTag(item)">✕</button>
        </span>

        <ComboboxInput
          class="flex-1 min-w-[120px] bg-transparent outline-none"
          autocomplete="off"
          :placeholder="placeholder"
          :displayValue="(o: any) => (labelKey ? o?.[labelKey] : o) ?? ''"
          @input="query = ($event.target as HTMLInputElement).value"
        />

        <ComboboxButton class="opacity-60 px-1">▼</ComboboxButton>
      </div>

      <ComboboxOptions
        ref="floating"
        :style="floatingStyles"
        class="bg-base-100 shadow-lg rounded-box border border-base-300 z-50 w-full max-h-64 overflow-auto"
      >
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option"
          :value="option"
          v-slot="{ active, selected }"
        >
          <button
            class="w-full text-left rounded px-3 py-2"
            :class="{ 'bg-primary text-primary-content': active }"
          >
            {{ labelKey ? option[labelKey] : option }}
            <span v-if="selected" class="float-right">✓</span>
          </button>
        </ComboboxOption>

        <li v-if="!filteredOptions.length" class="px-3 py-2 opacity-60">Inget resultat</li>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
