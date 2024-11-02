const Job = require('../models/Job');
const nodemailer = require('nodemailer');

exports.postJob = async (req, res) => {
   const { title, description, experienceLevel, endDate, candidates } = req.body;
   const job = new Job({ title, description, experienceLevel, endDate, companyId: req.company._id, candidates });
   await job.save();
   res.send('Job posted successfully');
};

exports.sendEmailsToCandidates = async (req, res) => {
   const job = await Job.findById(req.params.id);
   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
   });

   job.candidates.forEach(email => {
      const mailOptions = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: `Job Alert: ${job.title}`,
         text: `Job Details:\n${job.description}\nExperience Level: ${job.experienceLevel}`
      };
      transporter.sendMail(mailOptions);
   });
   res.send('Job alert emails sent successfully');
};
