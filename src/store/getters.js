// 包装state，只做包装，不改变原先state的值
const getters = {
  showRev(state) {
    return !state.show
  }
}

export default getters
