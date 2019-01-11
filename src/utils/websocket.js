/**
 * websocket封装
 * 调用方式 websocketTest.connect(url)
 * 返回ws，可使用ws.send  ws.onmessage
 * @type {{count: number, connect: websocket.connect}}
 */

export const websocket = {
  count: 0, // 重连次数
  url: '',

  // 连接函数
  connect: function (url, callback) {
    let that = this
    // 重连函数
    function reconnect() {
      if (that.count > 5) {
        console.log('重连失败')
      } else {
        that.count ++
        console.log('开始重连，第' + that.count + '次')
        that.connect()
      }
    }
    if (url !== undefined) {
      that.url = url
    }

    return new Promise((resolve, reject) => {
      let ws = new WebSocket(that.url)

      ws.onopen = function (e) {
        console.log('连接成功' + that.count)
        that.count = 0
        // callback(ws)
        resolve(ws)

        // 心跳机制
        let heartObj = {
          "event": "ping",
          "body": {}
        }
        clearInterval(timer)
        let timer = setInterval(function () {
          ws.send(JSON.stringify(heartObj))
        }, 30000)
      }

      // 建立连接失败，则开始重连
      ws.onerror = function (err) {
        // alert('连接失败')
        console.log('连接失败')
        reconnect()
      }

      // 断开 web socket 触发事件，则开始重连
      ws.onclose = function () {
        // alert('断开连接')
        console.log("连接已关闭...");
        reconnect()
      }
    })

  }

}


