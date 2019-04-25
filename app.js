const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')



app.use(session ({
    secret: 'daringFox',
    cookie: {}
}))

app.use((req, res, next)=>{
    console.log(req.session)
    next()
});

app.use('/worker', require('./routes/workerRoutes'))
app.use('/provider', require('./routes/providerRoutes'))
app.use('/', require('./routes/loginRoutes'))
// app.use('/subject', require('./routes/subjectRoutes'))



app.use(express.static(__dirname + '/css/'))
app.use(express.static(__dirname + '/res/'))

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})

