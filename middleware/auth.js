const Model = require('../models')
const Workers = Model.Worker
const Providers = Model.Provider

module.exports = (req, res, next) => {
    if(input.role === 'worker'){
        Workers.findOne({where: {username: input.username, password: input.password}})
            .then(found => {
                if(found){
                    
                    next()
                }
                else{
                    res.send("salah bro")
                }
            }).catch(err => {
                res.send(err)
            })
    }else{
        if(input.role === 'provider'){
            Providers.findOne({where: {username: input.username, password: input.password}})
                .then(found => {
                    if(found){
                        next()
                    }
                    else{
                        
                    }
                }).catch(err => {
                    return false
                })
        }
    }
}