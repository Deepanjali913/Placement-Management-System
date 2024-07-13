const loginUser = (req, res) =>{
    const { rollNo, password, isAdmin } = req.body;
  console.log('Received Roll Number:', rollNo); 
  
  const query = `SELECT new_password FROM Candidates WHERE roll_no = ?`;
  connection.query(query, [rollNo], (err, results) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(400).send('Roll No. not found');
      return;
    }

    const user = results[0];
    if (user.new_password === password) {
      res.status(200).send({ next: 'personal-details' });
    } else {
      res.status(400).send('Incorrect password');
    }
  });
}

export {loginUser} ;

