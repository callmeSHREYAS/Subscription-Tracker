const mongoose = require('mongoose')
const dayjs = require('dayjs')
const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 5,
        maxLength: 100,
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    price: {
        type: Number,
        required: [true, 'Subscription is required'],
        min: [0, 'Price must be more than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'INR'],
        default: 'INR'
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly']
    },
    startdate: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: [true, 'Please enter duration']
    },
    renewalDate: {
        type: Date,
    }
}, { timestamps: true })

subscriptionSchema.pre('save', function (next) {
    if (this.startdate && this.duration) {
        this.renewalDate = dayjs(this.startdate).add(this.duration, "day").toDate()
    }
    next()
})

subscriptionSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()
    if (update.duration) {
        update.renewalDate = dayjs(update.startdate || new Date()).add(update.duration,'day').toDate()
    }
    next()
})


const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription