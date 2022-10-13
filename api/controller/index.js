
const {getOvertimeAmountExtra,getBasicAmountExtra,getBonusAmountExtra,getDataFromApi,storeInDb} = require('../service')
exports.getData = async(req,res,next) =>{
    const data = await getDataFromApi('https://gist.githubusercontent.com/azizansari/03779d4c8953698214e856a21a6c4132/raw/4c1f1463e53e53b2285300788909cbe8f25dc62c/sampleData')
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    res.json({success:true,data})
}

exports.getOvertimeAmount = async (req,res,next)=>{
    const data = await getDataFromApi()
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    const {Male,Female} = getOvertimeAmountExtra(data)
    return res.json({success:true,overTimeAmount:Male+Female})
}

exports.getBasicAmount = async(req,res,next)=>{
    const data = await getDataFromApi()
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    const {Male,Female} = getBasicAmountExtra(data)
    res.json({success:true,basicAmount : Male+Female})
}

exports.getBonusAmount = async(req,res,next)=>{
    const data = await getDataFromApi()
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    const bonusAmount = getBonusAmountExtra(data)
    res.json({success:true,bonusAmount})
    
}

exports.getTotalAmount = async(_,res) =>{
    const data = await getDataFromApi()
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    const basicAmount = getBasicAmountExtra(data)
    const overTimeAmount = getOvertimeAmountExtra(data)
    const bonusAmount = getBonusAmountExtra(data)
    return res.status(200).json({
        success:true,
        basicAmount:basicAmount.Male+basicAmount.Female,
        overTimeAmount:overTimeAmount.Male+overTimeAmount.Female,
        bonusAmount:bonusAmount.amount,
        totalAmount:(basicAmount.Male+basicAmount.Female+overTimeAmount.Male+overTimeAmount.Female+bonusAmount.amount)
    }) 
}

exports.storeInDatabase = async(_,res)=>{
    const data = await getDataFromApi()
    if(data.length == 0) return res.status(404).json({success:false,message:"Data Not Found"})
    const insertedData = await storeInDb(data)
    return res.status(200).json({success:true,insertedData})
}