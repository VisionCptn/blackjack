import { reactive } from 'vue'
import type { Component } from 'vue'

interface GlobalState {
  isOpen: boolean
  component: Component | null
  props: Record<string, any>
  isMuted: boolean
}

export const globalState = reactive<GlobalState>({
  isOpen: false,
  component: null,
  props: {},
  isMuted: false,
})

export function openModal(component: Component, props: Record<string, any> = {}) {
  globalState.component = component
  globalState.props = props
  globalState.isOpen = true
}

export function closeModal() {
  globalState.isOpen = false
  globalState.component = null
  globalState.props = {}
}