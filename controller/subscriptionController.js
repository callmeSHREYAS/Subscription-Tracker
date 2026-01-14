require('dotenv').config();
const workflowClient = require("../config/upstash")
const Subscription = require("../models/subscription.model")

const createSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.id
        })

        const { workflowRunId } = await workflowClient.trigger({
            url: `${process.env.SERVER_URL}/workflow/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })
     
        
        res.status(201).json({ 'success': true, 'data': subscription ,workflowRunId })
    } catch (error) {
        console.error(error)
    }
}

const getSubscription = async (req, res) => {
    if (!req?.params?.id) res.status(400).json({ 'message': 'Please enter user id' });
    if (req.id !== req.params.id) {
        res.sendStatus(401)
    }
    const subscriptions = await Subscription.find({ user: req.id });
    res.status(200).json({ 'success': true, 'data': subscriptions })
}

module.exports = { createSubscription, getSubscription }