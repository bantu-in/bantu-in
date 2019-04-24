const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')



app.use('/worker', require('./routes/workerRoutes'))
app.use('/provider', require('./routes/providerRoutes'))
// app.use('/teacher', require('./routes/teacherRoutes'))
// app.use('/subject', require('./routes/subjectRoutes'))



// app.use(express.static(__dirname + '/materialize/'))
app.use(session ({
    secret: 'daringFox'
}))

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})