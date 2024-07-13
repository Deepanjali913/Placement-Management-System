-- Use the placement database
CREATE DATABASE IF NOT EXISTS registration;
USE registration;

-- Drop tables if they exist
DROP TABLE IF EXISTS Registrations;
DROP TABLE IF EXISTS additional_details;
DROP TABLE IF EXISTS educational_details;
DROP TABLE IF EXISTS Candidates;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Colleges;


-- Create the Candidates table
CREATE TABLE Candidates (
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    candidate_photo BLOB ,
    candidate_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    candidate_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    mobile_no VARCHAR(15) UNIQUE NOT NULL,
    roll_no INT(10) UNIQUE NOT NULL,
    fathers_name VARCHAR(20),
    branch VARCHAR(10),
    new_password VARCHAR(255) CHECK (LENGTH(new_password) >= 8),
    placed BOOLEAN DEFAULT FALSE,
    package FLOAT DEFAULT 0,
    blocked BOOLEAN DEFAULT FALSE

);

-- Create the Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    exam_group VARCHAR(50) NOT NULL
);

-- Create the Colleges table
CREATE TABLE Colleges (
    college_id INT PRIMARY KEY,
    college_name VARCHAR(100) NOT NULL
);

-- Create the Registrations table
CREATE TABLE Registrations (
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    course_id INT,
    college_id INT,
    allotted_quota VARCHAR(50),
    home_other ENUM('HOME', 'OTHER'),
    reported_to_college ENUM('YES', 'NO'),
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
);

-- Insert example data into Courses table
INSERT INTO Courses (course_id, course_name, exam_group) VALUES 
(1, 'Computer Science', 'Group A'), 
(2, 'Electronics', 'Group B'), 
(3, 'Mechanical Engineering', 'Group C'), 
(4, 'Civil Engineering', 'Group D');

-- Insert example data into Colleges table
INSERT INTO Colleges (college_id, college_name) VALUES 
(1, 'Main Campus'), 
(2, 'North Campus'), 
(3, 'South Campus'), 
(4, 'East Campus');

-- Insert example data into Candidates Table
INSERT INTO Candidates (registration_id, candidate_name, date_of_birth, email_id, mobile_no, roll_no, new_password) VALUES
('REG123', 'John Doe', '2000-01-01', 'john.doe@example.com', '1234567890', 1, NULL),
('REG124', 'Jane Smith', '2000-02-01', 'jane.smith@example.com', '0987654321', 2, 'newpassword1234');

-- Insert example data into Registration Table
INSERT INTO Registrations (candidate_id, course_id, college_id, allotted_quota, home_other, reported_to_college) VALUES
(1, 1, 1, 'General', 'HOME', 'YES'),
(2, 2, 2, 'OBC', 'OTHER', 'NO');


-- Creating the Educational Details Table
CREATE TABLE educational_details(
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_No INT NOT NULL,
    qualification_type VARCHAR(50) NOT NULL,
    board_or_university VARCHAR(100) NOT NULL,
    marks_achieved FLOAT NOT NULL,
    year_of_passing VARCHAR(10) NOT NULL,
    school_college_name VARCHAR(100) NOT NULL,
    branch_name VARCHAR(50) NOT NULL,
    school_college_city VARCHAR(50) NOT NULL,
    FOREIGN KEY (rolL_No) REFERENCES Candidates(roll_No)
);

CREATE TABLE additional_details (
	roll_no INT NOT NULL,
    work_experience TEXT NOT NULL,
    interests TEXT NOT NULL,
    hobbies TEXT NOT NULL,
    address TEXT NOT NULL,
    driving_licence VARCHAR(50) NOT NULL,
    two_wheeler VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rolL_No) REFERENCES Candidates(roll_No)
);
