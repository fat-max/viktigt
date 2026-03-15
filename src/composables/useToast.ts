import { ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'default' | null

export interface Toast {
  id: string
  message: string
  type?: ToastType
  timeOut?: number
}

export function useToast() {
  const { emit, on } = useEventBus<Toast>('toast')
  const toasts = ref<Toast[]>([])

  on(({ id, message, type, timeOut }) => {
    if (toasts.value.some((toast) => toast.id == id)) return
    toasts.value.push({ id, message, type, timeOut })

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id != id)
    }, timeOut)
  })

  const toast = (message: string, type: ToastType = null, timeOut = 2000) => {
    emit({ id: uuidv4(), message, type, timeOut })
  }

  return {
    toasts,
    toast,
  }
}
