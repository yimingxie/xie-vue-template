// 修改state，修改是同步的，会改变原先state的值
const mutations = {
  changeSt(state) {
    state.st = 'heihei'
  },
  add(state) {
    state.num ++
  }
}

export default mutations
