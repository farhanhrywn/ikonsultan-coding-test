const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', function(req, res) {
  res.status(200).json({ msg: "success" })
})

app.get('/list', function(req, res) {
    const page = parseInt(req.query.page ?? 1);
    const per_page = parseInt(req.query.per_page ?? 5);
    const offset = page * per_page - per_page;

    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((respon) => {
        const modifiedData = respon.data.map((el) => {
            return {
                id: el.id,
                title: el.title
            }
        })

        const result = modifiedData.slice(offset, page * per_page)

        res.status(200).json(result)
        
    })
    .catch((err) => {
        console.log('err', err)
    })
  })

app.listen(port, () => {
  console.log(`listening app on port ${port}`)
})

module.exports = app