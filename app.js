const express = require('express')
const router = express.Router()
const route = require('./api/routes')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(`Mongo Database Connected`))
    .catch(ex=>console.log(`Error while connecting Database\n`,ex))

router.use('/api', route)

router.use('*', (_, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Exist"
    })
})

module.exports = router