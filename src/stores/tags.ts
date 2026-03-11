import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { defaultTags } from './default'

export const useTagStore = defineStore('tags', () => {
  const tags = useLocalStorage<string[]>('tags', defaultTags)

  function addTag(tag: string) {
    if (tags.value.some((t: string) => t.toLowerCase() == tag.toLowerCase())) return

    tags.value.push(tag)
  }

  return { tags, addTag }
})
