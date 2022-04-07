const express = require('express')

const app = express()

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
// 挂载静态资源
app.use(express.static(__dirname + '/public'))

// 初始化保存一个人的数据
let person = [{
  name: '张三',
  age: 18
}, {
  name: '李四',
  age: 20
}]

app.get('/api_text', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      data: person
    })
  }, 3000)
})

app.listen(80, () => {
  console.log('服务器启动成功', 'http://127.0.0.1/index.html');
})