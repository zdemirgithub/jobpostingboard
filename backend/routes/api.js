const express = require('express');
const router = express.Router();
const { registerCompany, loginCompany, verifyCompany } = require('../controllers/authController');
const { postJob, sendEmailsToCandidates } = require('../controllers/jobController');
const authenticate = require('../middleware/authenticate');

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/verify/:token', verifyCompany);
router.post('/job', authenticate, postJob);
router.post('/job/:id/sendEmails', authenticate, sendEmailsToCandidates);

module.exports = router;
