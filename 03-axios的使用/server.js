// 导入express模块
const express = require('express')
// 创建express实例
const app = express()

// 处理请求体数据
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// 挂载静态页面
app.use(express.static(__dirname + '/public'))

let person = [{
    id: 1,
    name: '张三',
    age: 18,
    gander: '男'
  },
  {
    id: 2,
    name: '李四',
    age: 28,
    gander: '男'
  },
  {
    id: 3,
    name: '王五',
    age: 20,
    gander: '女'
  }
]
// 获取所有人的数据
app.get('/person', (req, res) => {
  res.send({
    status: 200,
    data: person
  })
})

// 根据id获取单个人的数据
app.get('/person/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  const personId = parseInt(req.params.id)
  for (let i = 0; i < person.length; i++) {
    if (person[i].id === personId) {
      return res.send({
        status: 200,
        data: person[i]
      })
    }
  }
  res.send({
    status: 404,
    message: '请求失败'
  })
})

// 添加一个人
app.post('/person', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  const id = person[person.length - 1].id + 1
  const addPerson = req.body
  const result = Object.assign(addPerson, {
    id: id
  })
  let resultPerson = person.push(result)
  return res.send({
    status: 200,
    data: person
  })
})

// 更改一个人的信息
app.put('/person/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  const personInfo = req.body
  const personId = parseInt(req.params.id)
  for (let i = 0; i < person.length; i++) {
    if (person[i].id === personId) {
      const result = Object.assign(person[i], personInfo)
    }
    return res.send({
      status: 200,
      message: '更新成功',
      data: person
    })
  }
})

// 删除一个人的信息
app.delete('/person/:id', (req, res) => {
  const personId = parseInt(req.params.id)
  person.forEach((item, index) => {
    if (item.id === personId) {
      person.splice(index, 1)
      return res.send({
        status: 200,
        data: person
      })
    }
  })
})

// 启动服务器
app.listen(3000, () => {
  console.log(`Server running at http://127.0.0.1:3000`);
})