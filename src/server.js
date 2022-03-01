import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
console.log('logging..');
next()
}
// instead of doing this
const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id']

// you can do like this in express

router.route('/cat')
.get()
.post()

router.route('./cat/:id')
.get()
.put()
.delete()

router.get('/me',(req,res)=>{
    res.send({me : 'hello'})
})

app.use('/api' , router)

app.get('/data', log, (req, res) => {
    res.send({ data: [1,2,3] })
})

app.post('/data', (req, res) => {
    res.send(req.body)
})

export const start = () => {
    app.listen(3000, () => {
        console.log('server is on 3000');
    })
}
