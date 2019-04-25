const express = require('express')
const router = express.Router()

const Model = require('../models')
const Provider = Model.Provider
const Worker = Model.Worker

router.use(express.urlencoded({extended: false}))

router.get("/", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        if(req.session.role === 'worker'){
            res.redirect(`/worker/${req.session.username}/feeds`)
        }
        else if(req.session.role === 'provider'){
            res.redirect(`/provider/${req.session.username}/my-project`)
        }
    }
})

router.get("/login/provider", (req, res) => {
    if(!req.session.userId){
        console.log('no session')
        res.render("loginProvider.ejs")
    }else{
        if(req.session.role === 'worker'){
            res.redirect(`/worker/${req.session.username}/feeds`)
        }
        else if(req.session.role === 'worker'){
            res.redirect(`/provider/${req.session.username}/my-project`)
        }
    }
})

router.post("/workerLogin", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    Worker.findOne({where: {
        username: username,
        password: password
    }})
        .then(found => {
            if(found){
                req.session.username = username
                req.session.userId = found.id
                req.session.isLogin = true
                req.session.role = 'worker'
                res.redirect(`./worker/${username}/feeds`)
            }else{
                throw ('invalid username/password')
            }
        }).catch(err => {
            res.send(err)
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.post("/providerLogin", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    Provider.findOne({where: {
        username: username,
        password: password
    }})
        .then(found => {
            if(found){
                req.session.username = username
                req.session.userId = found.id
                req.session.isLogin = true
                res.redirect(`./provider/my-project`)
            }else{
                throw 'invalid username/password'
            }
        }).catch(err => {
            res.send('invalid username / password')
        })
})

module.exports = router