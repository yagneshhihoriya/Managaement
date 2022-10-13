const routes = require('express').Router()
const {errorWrapper} = require('../../utils/error')
const {getData,getBasicSalary,getOvertimeAmount,getTotalAmount,getBasicAmount,getBonusAmount,storeInDatabase} = require('../controller')

routes.get('/getData', errorWrapper(getData))
routes.get('/getOvertimeAmount',errorWrapper(getOvertimeAmount))
routes.get('/getBasicAmount',errorWrapper(getBasicAmount))
routes.get('/getBonusAmount',errorWrapper(getBonusAmount))
routes.get('/getTotalAmount',errorWrapper(getTotalAmount))
routes.post('/storeInDatabase',errorWrapper(storeInDatabase))

module.exports = routes