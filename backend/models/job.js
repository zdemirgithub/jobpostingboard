const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   title: String,
   description: String,
   experienceLevel: String,
   endDate: Date,
   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
   candidates: [String]
});

module.exports = mongoose.model('Job', jobSchema);
