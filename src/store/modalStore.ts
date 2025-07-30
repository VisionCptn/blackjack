import { reactive } from 'vue'
import type { Component } from 'vue'

interface ModalState {
  isOpen: boolean
  component: Component | null
  props: Record<string, any>
}

export const modalState = reactive<ModalState>({
  isOpen: false,
  component: null,
  props: {}
})

export function openModal(component: Component, props: Record<string, any> = {}) {
  modalState.component = component
  modalState.props = props
  modalState.isOpen = true
}

export function closeModal() {
  modalState.isOpen = false
  modalState.component = null
  modalState.props = {}
}