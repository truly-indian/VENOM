const express = require('express')
const server = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
server.set('port' , (process.env.PORT || 8081))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))
server.use('/api' , api)
server.use(express.static('static'))
server.use(morgan('dev'))
server.use((req,res,next)=>{
 const err = new Error('Not Found')
 err.status = 404
 res.json(err)

})
const mongoose = require('mongoose')
mongoose.connect('mongodb://deepak:deepak123@ds259377.mlab.com:59377/business' , {useNewUrlParser: true}).then(()=>{
    console.log('connected sucessfully!!')
}).catch((err)=> {
    console.log(err)
})
server.listen(server.get('port'), ()=> {
    console.log('api server listening on' + server.get('port'))
})