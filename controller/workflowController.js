const Subscription = require("../models/subscription.model")
const { serve } = require('@upstash/workflow/express');
const dayjs = require('dayjs');

const REMINDERS = [7, 5, 2, 1]
const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload; //extract specicfic subs_id
    const subscription = await fetchSubscription(context, subscriptionId)

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) { // renewal date is before current date and time
        console.log(`Renewal date has been  passed for subscription ${subscriptionId} . Stopping workflow`);
        return
    } 

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')
        if (reminderDate.isAfter(dayjs())) {
            await sleepUnitReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`)
        
        
    }

})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUnitReminder = async (context, label, date) => {
    console.log(`Sleeping untill ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // Send email SMS 
    })
}


module.exports={sendReminders}