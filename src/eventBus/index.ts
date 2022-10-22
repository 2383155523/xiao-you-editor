import { createEventBus } from "xiao-you-bus"

interface instance {
  pause: Function
}
interface plyrInstance {
  index: number
  instance: instance
}
interface State {
  plyrInstanceArr: Array<plyrInstance>
  plyrIndex: number
}

const bus = createEventBus<State>({
  plyrInstanceArr: [],
  plyrIndex: 0,
})
export default bus
