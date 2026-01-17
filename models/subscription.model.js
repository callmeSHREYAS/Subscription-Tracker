// const mongoose = require('mongoose')
// const dayjs = require('dayjs')
// const Schema = mongoose.Schema

// const subscriptionSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         trim: true,
//         minLength: 5,
//         maxLength: 100,
//     },
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },
//     price: {
//         type: Number,
//         required: [true, 'Subscription is required'],
//         min: [0, 'Price must be more than 0']
//     },
//     paymentMethod:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     status:{
//         type:String,
//         enum:['active' , 'cancelled','expired'],
//         default:'active',
//     },
//     currency: {
//         type: String,
//         enum: ['USD', 'EUR', 'INR'],
//         default: 'INR'
//     },
//     frequency: {
//         type: String,
//         enum: ['daily','weekly', 'monthly', 'yearly']
//     },
//     startdate: {
//         type: Date,
//         default: Date.now
//     },
//     duration: {
//         type: Number,
//         required: [true, 'Please enter duration']
//     },
//     renewalDate: {
//         type: Date,
//     }
// }, { timestamps: true })

// subscriptionSchema.pre('save', function () {
//     if (this.startdate && this.duration) {
//         this.renewalDate = dayjs(this.startdate).add(this.duration, "day").toDate()
//     }

// })




// const Subscription = mongoose.model('Subscription', subscriptionSchema)

// module.exports = Subscription


const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Price must be greater than 0']
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    default: 'USD'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
  },
  category: {
    type: String,
    enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start date must be in the past',
    }
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'Renewal date must be after the start date',
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
}, { timestamps: true });


// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function () {
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription