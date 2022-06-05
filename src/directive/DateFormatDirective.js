
/** 날짜 표시용 사용자 디렉티브 */
export default {
  beforeMount(el, binding, vnode, prevNode) {
  },
  mounted(el, binding, vnode, prevNode) {
  },
  updated(el, binding, vnode, prevNode) {
    let date = new Date(Number(el.dataset.date))
    el.innerHTML = date.toString()
  }
}