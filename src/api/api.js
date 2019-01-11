import {http, myJsonp} from '../utils/request'
import {websocket} from '../utils/websocket'


// 请求elevator
export const getElevator = params => {
  return http('get', '/api/chart', params)
}

// 跨域请求豆瓣
export const getDouBan = () => {
  return myJsonp('http://api.douban.com/v2/movie/top250')
}

// 请求电梯
export const getEleData = params => {
  return http('get', '/iotsqu/liftposition', params)
}

export const getWS = () => {
  return websocket.connect('ws://iot.gidomino.com/lift-wsapi')
  // return websocket.connect('')
}
