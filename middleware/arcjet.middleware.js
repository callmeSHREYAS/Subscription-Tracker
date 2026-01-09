const { request } = require('express')
const aj = require('../config/arcjet')

const arcjetMiddleware =async(req,res,next)=>{
    try {
        const descision = await aj.protect(req,{requested:1})
        if(descision.isDenied()){
            if(descision.reason.isRateLimit()){
                return res.status(429).json({'message' : 'Rate limit exceeded'})
            }
            else if(descision.reason.isBot()){
                return res.status(403).json({'message' : 'Bot  Detected'})
            }
            return res.status(403).json({'message' : 'Access denied'})
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = arcjetMiddleware