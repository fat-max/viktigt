import { shallowRef } from 'vue'
import type { Ref, Component } from 'vue'
import { useEventBus } from '@vueuse/core'

export interface Modal {
  componentRef?: Component | null
  titleRef?: string
  propsRef?: Object
  sizeRef?: string
}

export function useModal(modal: any) {
  const { emit, on } = useEventBus<Modal>('modal')
  const component = shallowRef<Component | null>(null)
  const title = shallowRef('')
  const props = shallowRef({})
  const size = shallowRef('md')

  on(({ componentRef = null, titleRef = '', propsRef = {}, sizeRef = 'md' }) => {
    if (!modal) return

    if (!componentRef) {
      modal?.value?.close()
      return
    }

    component.value = componentRef
    title.value = titleRef
    props.value = propsRef
    size.value = sizeRef

    modal?.value?.showModal()
  })

  const open = ({
    component,
    title = '',
    props = {},
    size = 'md',
  }: {
    component: Component
    title?: string
    props?: Object
    size?: string
  }) => {
    emit({ componentRef: component, titleRef: title, propsRef: props, sizeRef: size })
  }

  const close = () => {
    emit({})
  }

  return {
    title,
    component,
    size,
    props,
    open,
    close,
  }
}
