const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const connection = require('./db');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const ext = file.originalname.split('.').pop();

  if (ext === 'csv') {
    const results = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        insertData(results, res);
      });
  } else if (ext === 'xls' || ext === 'xlsx') {
    const workbook = xlsx.readFile(file.path);
    const sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    insertData(data, res);
  } else {
    res.status(400).send('Unsupported file format');
  }
});

const insertData = (data, res) => {
  data.forEach((row) => {
    const query = `INSERT INTO Candidates (registration_id, candidate_name, date_of_birth, email_id, mobile_no, adhar_no, default_password, new_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [row['Registration ID'], row['Candidate Name'], row['Date of Birth'], row['E-mail ID'], row['Mobile No.'], row['Adhar No'], row['Default Password'], row['New Password']];
    connection.query(query, values, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  res.status(200).send('File uploaded and data inserted');
};

module.exports = router;
