const express = require('express')
const router = express.Router()

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const inRupiah = require('../helpers/inRupiah')


router.use(express.urlencoded({extended: false}))
router.get("/", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./provider/my-project.ejs")
    }
})

router.get("/:username/my-project", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Promise.all([
            Post.findAll({
                where : {
                    ProviderId : req.session.userId,
                    status : 'ongoing'
                }
            }),
            Post.findAll({
                where : {
                    ProviderId : req.session.userId,
                    status : 'waiting'
                }
            })
        ])
            .then(data => {
                let ongoingPosts = data[0]
                let waitingPosts = data[1]
                res.render("./provider/my-project.ejs", {
                    ongoingPosts : ongoingPosts,
                    waitingPosts : waitingPosts,
                    inRupiah,
                    username : req.session.username,
                    userId : req.session.userId
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.get("/:username/new-project", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./provider/new-project.ejs", {
                    username : req.session.username,
                    userId : req.session.userId
        })
    }
})

router.post("/:username/new-project", (req, res) => {
    console.log(req.body)
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.create({
            title : req.body.title,
            body : req.body.body,
            ProviderId : req.session.userId,
            price : req.body.price,
            workerNeeded : req.body.workerNeeded,
            status : 'waiting',
            lat: req.body.lat,
            lng: req.body.lng
        })
            .then(() => {
                res.redirect(`/provider/${req.session.username}/my-project`, 302, {
                            username : req.session.username,
                            userId : req.session.userId
                })
            })
    }
})

router.get("/:username/history", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findAll({
            where : {
                ProviderId : req.session.userId,
                status : "complete"
            }
        })
            .then((posts) => {
                res.render("./provider/history.ejs", {
                    posts : posts,
                    inRupiah,
                    username : req.session.username,
                    userId : req.session.userId
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.get("/:username/find-worker", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        res.render("./provider/find-worker.ejs", {
            username : req.session.username,
            userId : req.session.userId
        })
    }
})

router.get("/:username/profile", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Provider.findByPk(req.session.userId)
            .then(provider => {
                res.render("./provider/profile.ejs", {
                    provider : provider,
                    username : req.session.username,
                    userId : req.session.userId
                })
            })
    }
})

router.post("/:username/profile", (req, res) => {
    console.log(req.body)
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Provider.update({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            username : req.body.username,
            password : req.body.password
        }, {
            where : {
            id : req.session.userId 
            }
        })
            .then(() => {
                res.redirect(`/provider/${req.session.username}/my-project`, 302, {
                    username : req.session.username,
                    userId : req.session.userId
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.get('/register', (req, res) => {
    res.render('./provider/register.ejs', {
        err : req.query.errMsg
    })
})

router.post('/register', (req, res) => {
    Provider.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        username : req.body.username,
        password : req.body.password,
        lat: req.body.lat,
        lng: req.body.lng
    })
        .then(() => {
            res.redirect('/login/provider')
        })
        .catch(err => {
            res.redirect('/provider/register?errMsg='+ err.errors[0].message)
        })
})

router.get('/:username/post/:id', (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findByPk(req.params.id, {
            include : [Worker]
        })
            .then(post => {
                // console.log(post.Worker.dataValues)
                // console.log(post.Worker.firstName, post.Worker.lastName);
                if (post.Worker) {
                    let workerName = `${post.Worker.firstName} ${post.Worker.lastName}`
                    let workerId = post.Worker.id
                    res.render('./post/post-provider.ejs',{
                        post : post,
                        username : req.session.username,
                        userId : req.session.userId,
                        workerName : workerName,
                        workerId : workerId,
                        inRupiah
                    })
                } else {
                    res.render('./post/post-provider.ejs',{
                        post : post,
                        username : req.session.username,
                        userId : req.session.userId,
                        inRupiah
                    })
                }
            })
    }
})

router.get('/:username/post/:id/finished', (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.update({
            status : "complete"
        }, {
            where : {
                id : req.params.id
            }
        })
            .then(() => {
                res.redirect(`/provider/${req.session.username}/history`, 302,{
                    username : req.session.username,
                    userId : req.session.userId
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.get('/:username/post/:id/delete', (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.destroy({
            where : {
                id : req.params.id
            }
        })
            .then(() => {
                res.redirect(`/provider/${req.session.username}/my-project`)
            })
            .catch(err => {
                res.send(err)
            })
    }
})


module.exports = router