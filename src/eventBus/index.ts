import { createEventBus } from "xiao-you-bus"
interface musicData {
  id: string
  title: string
  author: string
  url: string
  pic: string
  lrc: string
}
interface instance {
  pause: Function
}
interface plyrInstance {
  index: number
  instance: instance
}
interface State {
  musicData: Array<musicData>
  plyrInstanceArr: Array<plyrInstance>
  plyrIndex: number
}

const bus = createEventBus<State>({
  musicData: [],
  plyrInstanceArr: [],
  plyrIndex: 0,
})
export default bus
