import { state, clearState } from '../store/store'
import { resetState, countState } from '../store/countStore'
import { state as basicState, clearState as clearBaseState } from '../store/basicStrategyStore'

async function countClick() {
  countState.showTitleScreen = true;
  await resetState();
}

async function indexClick() {
  await clearState();
  state.isGameOver = true;
}

async function basicStrategyClick() {
  await clearBaseState();
  basicState.isGameOver = true;
}

export function handleBasicStrategyClick(event: Event) {
  const route = useRoute()
  if (route.path === '/basic-strategy') {
    event.preventDefault();
    basicStrategyClick();
  }
}

export function handleCountClick(event: Event) {
  const route = useRoute()
  if (route.path === '/deck-count') {
    event.preventDefault();
    countClick();
  }
}

export function handleIndexClick(event: Event) {
  const route = useRoute()
  if (route.path === '/') {
    event.preventDefault();
    indexClick();
  }
}