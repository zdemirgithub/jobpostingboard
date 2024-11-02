const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ }, // Email format check
   password: { type: String, required: true, minlength: 6 },
   verified: { type: Boolean, default: false },
   mobile: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   verificationToken: { type: String },
});

module.exports = mongoose.model('Company', companySchema);
