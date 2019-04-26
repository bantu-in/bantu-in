const express = require('express')
const router = express.Router()
const fs = require('fs')

const Model = require('../models')
const Post = Model.Post
const Provider = Model.Provider
const Worker = Model.Worker
const Tag = Model.Tag
const inRupiah = require('../helpers/inRupiah')
const axios = require('axios')

router.use(express.urlencoded({extended: false}))

router.get("/:username/feeds", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }
    else{
        let id = req.session.userId
        Promise.all([
            Post.findAll({where: {status: "waiting"}}),
            Worker.findByPk(id)])
            .then(found => {
                // res.send(found)
                let locations = found[0].map(post => {
                    let obj = {
                        title: post.title,
                        lat: post.lat,
                        lng: post.lng
                    }
                    console.log(obj, '=============')
                    return obj
                })
                locations = JSON.stringify(locations)
                // res.send(locations)
                res.render(`./worker/feeds.ejs`, {
                    data: found[1],
                    posts: found[0],
                    inRupiah: inRupiah,
                    username: req.session.username,
                    userId: req.session.id,
                    postLoc: locations
                })
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
    }
})

router.get("/:username/search-job", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    } else{
        res.render("./worker/search-job.ejs", {
            username: req.session.username,
            userId: req.session.userId
        })
    }
})

router.get("/:username/ongoing", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findAll({
            include: [Worker],
            where: {status: "ongoing"}
        })
        .then(found => {
            // res.send(found)
            res.render("./worker/ongoing.ejs", {
                username: req.session.username,
                userId: req.session.userId,
                posts: found
            })
        })
    }
})

router.get("/:username/history", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findAll({
            include: [Worker],
            where: {status: "completed"}
        })
        .then(found => {
            // res.send(found)
            res.render("./worker/history.ejs", {
                username: req.session.username,
                userId: req.session.userId,
                posts: found
            })
        })
    }
})

router.get("/:username/profile", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Worker.findByPk(req.session.userId)
        .then(found => {
            res.render("./worker/profile.ejs", {
                username: req.session.username,
                userId: req.session.userId,
                worker: found
            })
        }).catch(err => {
            res.send(err)
        }) 
    }
})

router.get("/:username/jobDetails/:id", (req, res) => {
    if(!req.session.userId){
        res.render("login.ejs")
    }else{
        Post.findByPk(req.params.id)
        .then(found => {
            return found
        }).then( postData => {
            let url = (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${postData.lat},${postData.lng}&sensor=true&key=AIzaSyBvszf7pWDZ7MA-umkI-U7EEAj8jTYTLDQ`)            
            axios.get(url)
            .then(addr => {
                let address = addr.data.results[0].formatted_address
                    res.render(`./worker/job-details.ejs`, {
                        username: req.session.username,
                        userId: req.session.userId,
                        post: postData,
                        address,
                        inRupiah
                    })
            })
        })
    }
})

router.get('/register', (req, res) => {
    res.render('./worker/register.ejs' ,{
        err : req.query.errMsg
    })
})

router.post('/register', (req, res) => {
    Worker.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        username : req.body.username,
        password : req.body.password
    })
        .then(() => {
            res.redirect('/login/provider')
        })
        .catch(err => {
            res.redirect('/worker/register?errMsg=' + err.errors[0].message)
        })
})

router.get('/:username/profile', (req, res) => {
    if(req.session.userId){
        res.render("login.ejs")
    }else{
        Worker.findByPk(req.session.userId)
            .then(workerData => {
                res.send(workerData )
                // res.render("./worker/profile.ejs", {
                //     worker : worker,
                //     username : req.session.username,
                //     userId : req.session.userId
                // })
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.post('/:username/profile', (req, res) => {
    Worker.update({
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
            res.redirect(`/worker/${req.session.username}/feeds`, 302, {
                username : req.session.username,
                userId : req.session.userId
            })
        })
        .catch(err => {
            res.send(err)
        })
})

// router.get("/:username/test", (req,res) => {
//     res.send('masuk')
// })

module.exports = router