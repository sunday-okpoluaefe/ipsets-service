/**
 * Account Schema
 */
const mongoose = require('mongoose');
const { Country, Phone } = require('./contact_utils');

module.exports.AccountSchema = new mongoose.Schema({
  fullName: { type: String },
  approved: { type: Boolean, default: false },
  profileImage: { type: String },
  coverImage: { type: String },
  gender: { type: String, enum: ['female', 'male'] },
  type: { type: String, default: 'basic', enum: ['basic', 'organizer'] },
  status: { type: String, enum: ['approved', 'suspended', 'pending'] },
  deviceToken: { type: String },
  subscription: new mongoose.Schema({
    plan: { type: String, enum: ['basic', 'standard', 'premium'] },
    duration: { type: Number },
    expiresAt: { type: String },
  }, { timestamps: true }),
  password: {
    value: { type: String, required: true },
    resetToken: { type: String },
    forceReset: { type: Boolean },
    isSet: { type: Boolean, default: true },
  },
  location: {
    latitude: { type: String },
    longitude: { type: String },
    address: { type: String },
  },
  email: {
    value: {
      type: String, required: true, lowercase: true, trim: true, unique: true,
    },
    confirmed: { type: Date },
    verified: { type: Boolean, default: false },
    confirmationToken: { type: String },
  },
  country: Country,
  phone: Phone,
  rating: { type: Number, default: 1.0 },
  selfie: { type: String },
  identification: {
    url: { type: String },
    verified: { type: Boolean, default: false },
  },
  verification: {
    video: { type: String },
    selfie: { type: String },
    verified: { type: Boolean, default: false },
  },
  wallet: {
    balance: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
  },
  social: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  website: { type: String },
  bio: { type: String },
  team: [
    new mongoose.Schema(
      {
        account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
      },
      { timestamps: true }
    )
  ],
  linkedAccounts: [
    new mongoose.Schema(
      {
        account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
      },
      { timestamps: true }
    )
  ]
}, { timestamps: true });
