const nodemailer=require('nodemailer')
const accountEmail='vartakshreyas90@gmail.com'
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:accountEmail,
        pass : process.env.EMAIL_PASSWORD
    }
})

module.exports={accountEmail , transporter}