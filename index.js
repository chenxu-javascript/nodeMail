const express = require('express')
const app = express()
const fs = require('fs')
const ejs = require('ejs')
const a = require('./main').getAllDataAndSendMail
// const MongoData = require('./MongoData')
const path = require('path') //路径配置
app.listen(3000)

async function getHtml() {
  var HtmlData = await a()
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, 'email.ejs'), 'utf8')
  )
  console.log(HtmlData)
  const html = template(HtmlData)
  console.log('获取html 成功')
  return new Promise((resolve, reject) => {
    resolve(html)
  })
}

// var numData = new MongoData('callBook', 'callBook')
// app.use(express.static('./static/tongxunlu.html'))

app.get('/', (req, res) => {
  getHtml().then(html => {
    res.send(html)
  })
})
