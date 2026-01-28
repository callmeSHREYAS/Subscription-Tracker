const dayjs = require("dayjs");
const { emailTemplates } = require("./email.templates");
const { accountEmail, transporter } =require("../config/nodemailer");

 const sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error('Missing required characters');
    const templates = emailTemplates.find((t) => t.label == type);
    if (!templates) throw new Error('Invalid Email type');
    const mailInfo = {
        userId: subscription.user,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM DD, YYYY'),
        planname: subscription.category,
        price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
        paymentMethod: subscription.paymentMethod
   
    }

    const message = templates.generateBody(mailInfo)
    const subject = templates.generateSubject(mailInfo)


    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error) return console.log(error, 'Error sending email');
        console.log('Email sent :' + info.response);
        
        
    })
}

module.exports={sendReminderEmail}