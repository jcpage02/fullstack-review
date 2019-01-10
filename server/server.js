require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const authCtrl = require('./authCtrl')


const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/api/user-data', authCtrl.userData)
app.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:4000/#/')
})


massive(CONNECTION_STRING)
    .then(connection => {
        app.set('db', connection)
        app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
.catch((err) => {console.log(err)})

