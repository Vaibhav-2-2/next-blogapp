import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent OverwriteModelError
const EmailModel = mongoose.models.email || mongoose.model('email', Schema);

export default EmailModel;
