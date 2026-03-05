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

export interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: Option | Option[] | null
  options?: Option[]
  placeholder?: string
  multiple?: boolean
  fetch?: (query: string) => Promise<Option[]>
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select option',
  multiple: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | Option[] | null): void
}>()

const query = ref('')
const internalOptions = ref<Option[]>(props.options ?? [])

const selected = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

/* async search debounce */
let timeout: number | undefined
watch(query, async (q) => {
  if (!props.fetch) return
  clearTimeout(timeout)
  timeout = window.setTimeout(async () => {
    internalOptions.value = await props.fetch!(q)
  }, 250)
})

const filteredOptions = computed(() => {
  if (props.fetch) return internalOptions.value
  if (!query.value) return internalOptions.value
  return internalOptions.value.filter((o) =>
    o.label.toLowerCase().includes(query.value.toLowerCase()),
  )
})

/* floating dropdown */
const reference = ref()
const floating = ref()
const { floatingStyles } = useFloating(reference, floating, {
  middleware: [offset(6), flip(), shift()],
  whileElementsMounted: autoUpdate,
})

function removeTag(option: Option) {
  if (!Array.isArray(selected.value)) return
  selected.value = selected.value.filter((o) => o.value !== option.value)
}
</script>

<template>
  <Combobox v-model="selected" :multiple="multiple" class="w-full">
    <div class="relative">
      <!-- input with inline badges -->
      <div
        ref="reference"
        class="input input-bordered flex flex-wrap items-center gap-1 w-full min-h-[3rem] cursor-text"
      >
        <!-- badges -->
        <span
          v-if="multiple && Array.isArray(selected)"
          v-for="item in selected"
          :key="item.value"
          class="badge badge-primary gap-1 flex items-center"
        >
          {{ item.label }}
          <button class="ml-1" @click.stop="removeTag(item)">✕</button>
        </span>

        <!-- search input -->
        <ComboboxInput
          class="flex-1 min-w-[120px] bg-transparent outline-none"
          :placeholder="placeholder"
          :displayValue="(o: any) => o?.label ?? ''"
          @input="query = ($event.target as HTMLInputElement).value"
        />

        <!-- caret -->
        <ComboboxButton class="opacity-60 px-1">▼</ComboboxButton>
      </div>

      <!-- dropdown -->
      <ComboboxOptions
        ref="floating"
        :style="floatingStyles"
        class="menu bg-base-100 shadow-lg rounded-box border border-base-300 z-50 w-full max-h-64 overflow-auto"
      >
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option"
          v-slot="{ active, selected }"
        >
          <li>
            <button
              class="w-full text-left rounded px-3 py-2"
              :class="{ 'bg-primary text-primary-content': active }"
            >
              {{ option.label }}
              <span v-if="selected" class="float-right">✓</span>
            </button>
          </li>
        </ComboboxOption>

        <li v-if="!filteredOptions.length" class="px-3 py-2 opacity-60">No results</li>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
