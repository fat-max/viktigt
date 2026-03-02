import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useTagsStore = defineStore('tags', () => {
  const tags =  useLocalStorage<string[]>('tags', ['frukost', 'lunch', 'mellanmål', 'middag', 'kvällsmat'])

  function addTag(tag: string) {
    tag = tag.toLowerCase()

    if (tags.value.some((t: string) => t.toLowerCase() == tag)) return

    tags.value.push(tag)
  }

  return { tags, addTag }
})
