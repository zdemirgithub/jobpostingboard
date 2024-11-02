const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Company = require('../models/Company');

exports.registerCompany = async (req, res) => {
   const { name, email, password, mobile } = req.body;

   const existingCompany = await Company.findOne({ email });
   if (existingCompany) return res.status(400).send('Email already registered');

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
   const company = new Company({ name, email, password: hashedPassword, mobile, verificationToken });
   await company.save();

   // Send verification email
   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
      },
   });

   const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
      html: `<p>Please verify your account by clicking <a href="http://${req.headers.host}/api/verify/${verificationToken}">here</a>.</p>`,
   };

   await transporter.sendMail(mailOptions);
   res.send('Registration successful! Please verify your email.');
};

exports.verifyCompany = async (req, res) => {
   const { token } = req.params;
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const company = await Company.findOneAndUpdate({ email: decoded.email }, { verified: true, verificationToken: null });

      if (!company) return res.status(400).send('Verification failed. Invalid token or user not found.');

      res.send('Account verified successfully!');
   } catch (err) {
      res.status(400).send('Invalid or expired token.');
   }
};

exports.loginCompany = async (req, res) => {
   const { email, password } = req.body;
   const company = await Company.findOne({ email });

   if (!company) return res.status(400).send('Email not found');
   if (!company.verified) return res.status(400).send('Email not verified');

   const validPass = await bcrypt.compare(password, company.password);
   if (!validPass) return res.status(400).send('Invalid password');

   const token = jwt.sign({ _id: company._id }, process.env.JWT_SECRET);
   res.header('Authorization', token).send({ token });
};
