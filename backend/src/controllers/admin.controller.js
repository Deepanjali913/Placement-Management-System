import pool from "../db/index.js";
import { APIError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js'

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email || password)) {
        throw new APIError(400, "email or password is required")
    }
    const query = `SELECT * FROM DSEU_Users WHERE User_login_id = $1 `;
    const values = [email];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        throw new APIError(404, "Admin not found")
    }
    const user = result.rows[0];
    console.log(user);
    // const passwordMatch = await bcrypt.compare(password, user.User_password);
    // if (!passwordMatch) {
    //     throw new APIError(401, "Admin credentials incorrect");
    // }
    
    if(password !== user.user_password){
        throw new APIError(401, "Admin credentials incorrect");
    }
    if (user.user_status !== 'ACTIVE') {
        throw new APIError(403, "Admin is blocked");
    }

    const roleResult = await pool.query(
        'SELECT r.Role_name FROM DSEU_Employee_roles er JOIN DSEU_Roles r ON er.Employee_role_id = r.Role_id WHERE er.Employee_no = $1',
        [user.employee_no]
      );
    
      const role = roleResult.rows[0].role_name;

    const accessToken = generateAccessToken({
        id: user.user_login_id ,
        password : user.user_password ,
        role : role 
    });
    const refreshToken = generateRefreshToken({
        id: user.user_login_id ,
        password : user.user_password ,
        role : role 
    });

    const loggedInUser = await pool.query(query, values);

    

      

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken , role
            }, "User logged in successfully")
        )

})

const uploadOpportunity = asyncHandler(async (req, res) => {
  const {
    companyName,
    companyDetails,
    contactPersonName,
    contactPersonEmail,
    contactPersonPhone,
    jobName,
    jobDescription,
    registrationDeadline,
    location,
    packages,
    eligibleCampusId,
    eligibleProgramId,
    eligibilityCriteria,
    minPercentage,
    minCgpa,
    branches,
    visitType,
    companyRating
  } = req.body;

  const lastupdateUser = req.user.id; // Extracting the user ID from the token

  let companyPdfPath;
  let jobPdfPath;
  
  if (req.files && Array.isArray(req.files.company_pdf) && req.files.company_pdf.length > 0) {
    companyPdfPath = req.files.company_pdf[0].path;
  }
  
  if (req.files && Array.isArray(req.files.job_pdf) && req.files.job_pdf.length > 0) {
    jobPdfPath = req.files.job_pdf[0].path;
  }
  
  const companyPdf = await uploadOnCloudinary(companyPdfPath);
  const jobPdf = await uploadOnCloudinary(jobPdfPath);

  const companyResult = await pool.query(
    `INSERT INTO DSEU_TP_Companies 
      (company_name, company_details, pdf_path, contact_person_name, contact_person_email, contact_person_phone, Lastupdate_User) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING company_id`,
    [companyName, companyDetails, companyPdf ? companyPdf.url : null, contactPersonName, contactPersonEmail, contactPersonPhone, lastupdateUser]
  );
  
  const companyId = companyResult.rows[0].company_id;

  // Insert job profile details
  await pool.query(
    `INSERT INTO DSEU_TP_Job_profile 
      (company_id, Job_name, Job_description, pdf_path, registration_deadline, location, Package, eligible_campus_id, eligible_program_id, eligibility_criteria, min_percentage, min_cgpa, branches, visit_type, company_rating, Lastupdate_User) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
    [companyId, jobName, jobDescription, jobPdf ? jobPdf.url : null, registrationDeadline, location, packages, eligibleCampusId, eligibleProgramId, eligibilityCriteria, minPercentage, minCgpa, branches, visitType, companyRating, lastupdateUser]
  );

  res.status(201).json(new ApiResponse("Opportunity uploaded successfully"));
});


const logoutAdmin = asyncHandler(async(req,res) =>{
  res.clearCookie('accessToken' , {
    httpOnly: true,
    secure: true
    
  });
  res.clearCookie('refreshToken' , {
    httpOnly: true,
    secure: true
    
  });
  res.status(200).json(
    new ApiResponse(200 , "Logged out successfully")
  );
})

const getCompanies = asyncHandler(async(req , res) =>{
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query string is required' });
    }
    const result = await pool.query(
      'SELECT company_name FROM DSEU_TP_Companies WHERE company_name ILIKE $1 LIMIT 10',
      [`%${query}%`]
    );
    res.json(result.rows.map(row => row.company_name));
  } catch (error) {
    console.error('Error fetching company names:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

const blockUsers = asyncHandler(async(req,res) =>{
  const { studentName, rollNumber, studentBranch } = req.body;
  try {
    const student = await pool.query(
      'SELECT Student_name FROM DSEU_Students WHERE roll_no = $1 AND Student_name = $2 AND student_branch = $3',
      [rollNumber, studentName, studentBranch]
    );
    if (student.rows.length > 0) {
      const updateResult = await pool.query(
        'UPDATE DSEU_Users SET User_status = $1 WHERE roll_no = $2',
        ['BLOCKED', rollNumber]
      );
      res.status(200).send(`Student ${student.rows[0].student_name} has been blocked.`);
    } else {
      res.status(404).send('Student not found or details do not match.');
    }
  } catch (error) {
    console.error('Error updating student status:', error);
    res.status(500).send('Error updating student status');
  }
  

})

const markPlaced = asyncHandler(async(req,res)=>{
  const { studentName, rollNumber, studentBranch } = req.body;
  try {
    const student = await pool.query(
      'SELECT Student_name FROM DSEU_Students WHERE roll_no = $1 AND Student_name = $2 AND branch = $3',
      [rollNumber, studentName, studentBranch]
    );
    if (student.rows.length > 0) {
      const updateResult = await pool.query(
        'UPDATE DSEU_TP_Applications SET status = $1 WHERE student_roll_no = $2',
        ['SELECTED', rollNumber]
      );
      res.status(200).send(`Student ${student.rows[0].student_name} has been marked as placed.`);
    } else {
      res.status(404).send('Student not found or details do not match.');
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).send('Error updating application status');
  }
})

const markActive = asyncHandler(async(req,res)=>{
  const { studentName, rollNumber, studentBranch } = req.body;
  try {
    const student = await pool.query(
      'SELECT Student_name FROM DSEU_Students WHERE roll_no = $1 AND Student_name = $2 AND student_branch = $3',
      [rollNumber, studentName, studentBranch]
    );
    if (student.rows.length > 0) {
      const updateResult = await pool.query(
        'UPDATE  DSEU_Users SET User_status = $1 WHERE roll_no = $2',
        ['ACTIVE', rollNumber]
      );
      res.status(200).send(`Student ${student.rows[0].student_name} has been marked as active.`);
    } else {
      res.status(404).send('Student not found or details do not match.');
    }
  } catch (error) {
    console.error('Error updating student status:', error);
    res.status(500).send('Error updating student status');
  }
})

export {loginUser , uploadOpportunity , logoutAdmin , getCompanies , markPlaced , blockUsers,
  markActive
};