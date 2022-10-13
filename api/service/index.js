const axios = require('axios')
const {MongoConnect} = require('../../utils/mongo')

exports.getDataFromApi = async (url) =>{
    const FetchApi = process.env.FetchApi || url
    const {data} = await axios.get(FetchApi)
    return data
}

exports.getOvertimeAmountExtra = (data) =>{
    let mainData = {
        Male:0,
        Female:0
    }
    data.forEach(({total_hours,weekday,per_day_salary,gender,designation})=>{
        const salaryPerHour = per_day_salary/8
        if(designation == 'Worker'){
            const data = (total_hours > 8) ? (total_hours - 8) * (salaryPerHour*2) : 0
            mainData[gender] += data
        }
    })
    return mainData
}

exports.getBasicAmountExtra = (data)=>{
    let t_basicAmount = {
        Male : 0,
        Female : 0
    }
    const weekdays = [2,3,4,5,6]
    data.forEach(({total_hours,weekday,per_day_salary,gender,designation})=>{
        let b_salary = 0
        if(designation == 'Worker' || weekdays.includes(weekday)){
            b_salary = (total_hours >= 8) ? per_day_salary : (total_hours < 8 && total_hours >= 4) ? per_day_salary / 2 : 0
        }
        t_basicAmount[gender] += b_salary
    })
    return t_basicAmount
}

exports.getBonusAmountExtra = (data) =>{
    let finalBonus = {
        amount:0,
        gender:''
    }
    const basicAmount = this.getBasicAmountExtra(data) 
    const overTimeAmount = this.getOvertimeAmountExtra(data)
    if((basicAmount.Male + overTimeAmount.Male) > (basicAmount.Female + overTimeAmount.Female)){
        finalBonus.gender = 'Female'
        finalBonus.amount += (1/100) * (basicAmount.Female + overTimeAmount.Female)
    }else if((basicAmount.Male + overTimeAmount.Male) < (basicAmount.Female + overTimeAmount.Female)){
        finalBonus.gender = 'Male'
        finalBonus.amount += (1/100) * (basicAmount.Male + overTimeAmount.Male)
    }
    return finalBonus
}

exports.storeInDb = async(data) =>{
    const {client , db} = await MongoConnect()
    const collection_Name = process.env.COLLECTION_NAME || 'DEMO_COLLECTION'
    const collection = db.collection(collection_Name)
    const insertedData = await collection.insertMany(data)
    return insertedData
}