// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const connection = require('./db');
// const multer = require('multer');
// const path = require('path');
// const uploadRouter = require('./upload');
// const nodemailer = require('nodemailer');
// const twilio = require('twilio');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.use('/upload', uploadRouter);

// app.post('/login', (req, res) => {
//   const { rollNo, password, isAdmin } = req.body;
//   console.log('Received Roll Number:', rollNo); 
  
//   const query = `SELECT new_password FROM Candidates WHERE roll_no = ?`;
//   connection.query(query, [rollNo], (err, results) => {
//     if (err) {
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.length === 0) {
//       res.status(400).send('Roll No. not found');
//       return;
//     }

//     const user = results[0];
//     if (user.new_password === password) {
//       res.status(200).send({ next: 'personal-details' });
//     } else {
//       res.status(400).send('Incorrect password');
//     }
//   });
// });

// //route to handle the password change
// app.post('/change-password', (req, res) => {
//     const { rollNo, newPassword } = req.body;
  
//     if (!rollNo || !newPassword) {
//       return res.status(400).send('Missing rollNo or newPassword');
//     }
  
//     const query = `UPDATE Candidates SET new_password = ? WHERE roll_no = ?`;
//     connection.query(query, [newPassword, rollNo], (err, results) => {
//       if (err) {
//         console.error('Error updating password:',err); // Log the error
//         return res.status(500).send('Server error');
//       }
//       if (results.affectedRows === 0) {
//         return res.status(400).send('Registration ID not found');
//       }
//       res.status(200).send('Password updated successfully');
//     });
//   });
  
// // Send OTP route
// app.post('/send-otp', (req, res) => {
//     const { rollNo } = req.body;
//     const otp = generateOTP();
//     otpStorage[rollNo] = { otp, expires: Date.now() + 300000 }; // OTP valid for 5 minutes
//     res.status(200).send('OTP sent');
//   });
  
// // Verify OTP route
// app.post('/verify-otp', (req, res) => {
//     const { rollNo, otp } = req.body;
//     const storedOtp = otpStorage[rollNo];
  
//     if (storedOtp && storedOtp.otp === otp && Date.now() < storedOtp.expires) {
//       res.status(200).send('OTP verified');
//     } else {
//       res.status(400).send('Invalid or expired OTP');
//     }
//   });

// // User details route
// app.get('/user-details', (req, res) => {
//     const { rollNo } = req.query;
//     const query = `SELECT * FROM Candidates WHERE roll_no = ?`;
  
//     connection.query(query, [rollNo], (err, results) => {
//       if (err) {
//         console.error('Error fetching user details:', err); // Log the error
//         res.status(500).send('Server error');
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).send('User not found');
//         return;
//       }
  
//       res.status(200).send(results[0]);
//     });
//   });

// // Update user details route
// app.post('/update-details', (req, res) => {
//     const { rollNo, candidateName, emailId, mobileNo } = req.body;
  
//     const query = `UPDATE Candidates SET candidate_name = ?, email_id = ?, mobile_no = ? WHERE roll_no = ?`;
//     connection.query(query, [candidateName, emailId, mobileNo, rollNo], (err, results) => {
//       if (err) {
//         console.error('Error updating user details:', err); // Log the error
//         res.status(500).send('Server error');
//         return;
//       }
//       if (results.affectedRows === 0) {
//         res.status(404).send('User not found');
//         return;
//       }
  
//       res.status(200).send('User details updated successfully');
//     });
//   });



// // Setup Twilio
// const twilioClient = twilio('ACCOUNT_SID', 'AUTH_TOKEN');

// // Setup nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'email@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// // Verify signup
// app.post('/verify-signup', (req, res) => {
//   const { registrationId, adharNo, rollNo } = req.body;
//   const query = `SELECT * FROM Candidates WHERE registration_id = ? AND adhar_no = ? AND roll_no = ?`;
//   connection.query(query, [registrationId, adharNo, rollNo], (err, results) => {
//     if (err) {
//       res.status(500).send('Server error');
//       return;
//     }
//     if (results.length > 0) {
//       res.status(200).send({ success: true });
//     } else {
//       res.status(400).send({ success: false });
//     }
//   });
// });

// // Function to generate a 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // In-memory storage for OTPs
// const otpStorage = {};

// // Send OTP
// app.post('/send-otp', (req, res) => {
//   const { phone } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   // Save OTP to the database or cache (not implemented here)

//   twilioClient.messages.create({
//     body: `Your OTP is ${otp}`,
//     from: '7303629053',
//     to: phone
//   }).then(message => {
//     res.status(200).send('OTP sent');
//   }).catch(err => {
//     res.status(500).send('Failed to send OTP');
//   });
// });

// // Verify OTP
// app.post('/verify-otp', (req, res) => {
//   const { phone, otp } = req.body;
//   // Verify OTP from the database or cache (not implemented here)
//   if (otp === 'correct_otp') {
//     res.status(200).send('OTP verified');
//   } else {
//     res.status(400).send('Invalid or expired OTP');
//   }
// });

// // Send Email OTP
// app.post('/send-email-otp', (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   // Save OTP to the database or cache (not implemented here)

//   const mailOptions = {
//     from: 'email@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP is ${otp}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.status(500).send('Failed to send OTP');
//     } else {
//       res.status(200).send('OTP sent');
//     }
//   });
// });

// // Verify Email OTP
// app.post('/verify-email-otp', (req, res) => {
//   const { email, otp } = req.body;
//   // Verify OTP from the database or cache (not implemented here)
//   if (otp === 'correct_otp') {
//     res.status(200).send('OTP verified');
//   } else {
//     res.status(400).send('Invalid or expired OTP');
//   }
// });
  
// //personal details route
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// app.post('/api/candidates', upload.single('photo'), (req, res) => {
//   const { rollNo, name, dob, fathersName, branch } = req.body;
//   const photoPath = req.file ? req.file.path : null;  
//   const checkQuery = 'SELECT * FROM Candidates WHERE roll_no = ?';
//   const updateQuery = `UPDATE Candidates SET candidate_name = ?, date_of_birth = ?, fathers_name = ?, branch = ?, candidate_photo = ? WHERE roll_no = ?`;

//   connection.query(checkQuery, [rollNo], (err, results) => {
//     if (err) {
//       console.error('Error checking data:', err);
//       res.status(500).send('Error checking data');
//     } else {
//       if (results.length > 0) {
//         // Update existing record
//         connection.query(updateQuery, [name, dob, fathersName, branch, photoPath, rollNo], (err, result) => {
//           if (err) {
//             console.error('Error updating data:', err);
//             res.status(500).send('Error updating data');
//           } else {
//             res.status(200).send('Data updated successfully');
//           }
//         });
//       } else {
//         res.status(404).send('Candidate not found'); // Or handle as per your application logic
//       }
//     }
//   });
// });

// app.post('/api/education-details', (req, res) => {
//   const { rollNo, qualifications } = req.body;

//   if (!rollNo || !qualifications || !Array.isArray(qualifications) || qualifications.length === 0) {
//       return res.status(400).send('Invalid data format');
//   }

//   // Prepare SQL query to insert or update education details
//   const insertQuery = `INSERT INTO educational_details 
//                        (roll_no, qualification_type, board_or_university, marks_achieved, year_of_passing, 
//                         school_college_name, branch_name, school_college_city)
//                        VALUES ? 
//                        ON DUPLICATE KEY UPDATE 
//                        board_or_university = VALUES(board_or_university),
//                        marks_achieved = VALUES(marks_achieved),
//                        year_of_passing = VALUES(year_of_passing),
//                        school_college_name = VALUES(school_college_name),
//                        branch_name = VALUES(branch_name),
//                        school_college_city = VALUES(school_college_city)`;

//   // Extracting values from qualifications array
//   const values = qualifications.map(qual => [
//       rollNo,
//       qual.type,
//       qual.boardUniversity,
//       parseFloat(qual.marks),
//       qual.year,
//       qual.schoolCollegeName,
//       qual.branch,
//       qual.schoolCollegeCity
//   ]);

//   // Execute the query
//   connection.query(insertQuery, [values], (err, results) => {
//       if (err) {
//           console.error('Error inserting or updating education details:', err);
//           return res.status(500).send('Error inserting or updating education details');
//       }
//       res.status(200).send('Education details inserted or updated successfully');
//   });
// });
  
// //adding additional details route
// app.post('/api/additional-details', (req, res) => {
//   const {
//     rollNo,
//     workExperience,
//     interests,
//     hobbies,
//     address,
//     drivingLicence,
//     twoWheeler
//   } = req.body;

//   const query = `
//     INSERT INTO additional_details (roll_no, work_experience, interests, hobbies, address, driving_licence, two_wheeler)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE
//     work_experience = VALUES(work_experience),
//     interests = VALUES(interests),
//     hobbies = VALUES(hobbies),
//     address = VALUES(address),
//     driving_licence = VALUES(driving_licence),
//     two_wheeler = VALUES(two_wheeler)
//   `;

//   connection.query(
//     query,
//     [rollNo, workExperience, interests, hobbies, address, drivingLicence, twoWheeler],
//     (err, results) => {
//       if (err) {
//         console.error('Error saving additional details:', err);
//         return res.status(500).send('Error saving additional details');
//       }
//       res.status(200).send('Additional details saved successfully');
//     }
//   );
// });
// // Add other routes here...

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
