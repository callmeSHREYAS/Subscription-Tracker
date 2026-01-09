const Subscription = require("../models/subscription.model")

const createSubscription = async(req,res)=>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:req.id
        })
        res.status(201).json({'success':true ,  'data':subscription})
    } catch (error) {
        console.error(error)
    }
}

const getSubscription = async(req,res)=>{
    if(!req?.params?.id)res.status(400).json({'message':'Please enter user id'});
    if(req.id !== req.params.id){
        res.sendStatus(401)
    }
    const subscriptions=await Subscription.find({user : req.id});
    res.status(200).json({'success':true, 'data':subscriptions})
}

module.exports = {createSubscription , getSubscription}