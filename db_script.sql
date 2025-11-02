-- ======================================================
-- Database: employee_management
-- Description: Employee Management System (BCNF Schema)
-- Tables: department, designation, employee, user_creds
-- ======================================================

-- 1️⃣ Create Database
CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

-- 2️⃣ Table: department
CREATE TABLE department (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) UNIQUE NOT NULL
);

-- 3️⃣ Table: designation
CREATE TABLE designation (
    desig_id INT PRIMARY KEY AUTO_INCREMENT,
    desig_name VARCHAR(100) UNIQUE NOT NULL
);

-- 4️⃣ Table: employee
CREATE TABLE employee (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE,
    dept_id INT,
    desig_id INT,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id),
    FOREIGN KEY (desig_id) REFERENCES designation(desig_id)
);

-- 5️⃣ Table: user_creds
-- (only for one admin username/password, no foreign keys)
CREATE TABLE user_creds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- ======================================================
-- ✅ Optional Sample Data
-- ======================================================

-- Insert admin credentials (password should be hashed in app)
INSERT INTO user_creds (username, password_hash)
VALUES ('admin', '12345');

-- Insert departments
INSERT INTO department (dept_name)
VALUES ('Human Resources'), ('Finance'), ('Engineering');

-- Insert designations
INSERT INTO designation (desig_name)
VALUES ('Manager'), ('Software Engineer'), ('HR Executive');

-- Insert employees
INSERT INTO employee (first_name, last_name, email, phone, hire_date, dept_id, desig_id)
VALUES
('John', 'Doe', 'john.doe@example.com', '9876543210', '2023-01-15', 3, 2),
('Alice', 'Smith', 'alice.smith@example.com', '9876501234', '2023-02-10', 1, 3),
('Bob', 'Johnson', 'bob.johnson@example.com', '9823456789', '2023-03-05', 2, 1),
('Priya', 'Patil', 'priya.patil@example.com', '9765432109', '2023-04-18', 3, 2),
('Rahul', 'Kadam', 'rahul.kadam@example.com', '9898989898', '2023-05-25', 1, 3);

-- ======================================================
-- ✅ Verification Queries
-- ======================================================
-- View all departments
SELECT * FROM department;

-- View all designations
SELECT * FROM designation;

-- View all employees
SELECT e.emp_id, e.first_name, e.last_name, d.dept_name, g.desig_name
FROM employee e
JOIN department d ON e.dept_id = d.dept_id
JOIN designation g ON e.desig_id = g.desig_id;

-- View admin credentials
SELECT * FROM user_creds;




-- ======================================================
-- truncate and insert more sample data


USE employee_management;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE employee;
TRUNCATE TABLE department;
TRUNCATE TABLE designation;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO department (dept_name) VALUES
('Human Resources'),
('Finance'),
('Information Technology'),
('Marketing'),
('Sales'),
('Operations'),
('Customer Support'),
('Research and Development'),
('Administration'),
('Procurement');

INSERT INTO designation (desig_name) VALUES
('Software Engineer'),
('Senior Software Engineer'),
('Team Lead'),
('Project Manager'),
('HR Executive'),
('HR Manager'),
('Finance Executive'),
('Finance Manager'),
('Sales Executive'),
('Sales Manager'),
('Marketing Executive'),
('Marketing Manager'),
('Operations Executive'),
('Operations Manager'),
('Customer Support Executive'),
('Customer Support Manager'),
('Research Associate'),
('R&D Manager'),
('System Administrator'),
('Office Administrator');

INSERT INTO employee (first_name, last_name, email, phone, hire_date, dept_id, desig_id) VALUES
('Aarav', 'Sharma', 'aarav.sharma@example.com', '9876543101', '2020-01-15', 3, 1),
('Priya', 'Patel', 'priya.patel@example.com', '9876543102', '2021-03-20', 1, 5),
('Rohan', 'Verma', 'rohan.verma@example.com', '9876543103', '2019-11-10', 2, 7),
('Neha', 'Iyer', 'neha.iyer@example.com', '9876543104', '2022-04-05', 4, 11),
('Karan', 'Singh', 'karan.singh@example.com', '9876543105', '2018-07-22', 3, 2),
('Simran', 'Kaur', 'simran.kaur@example.com', '9876543106', '2020-08-18', 5, 9),
('Ananya', 'Nair', 'ananya.nair@example.com', '9876543107', '2021-01-25', 1, 6),
('Rahul', 'Menon', 'rahul.menon@example.com', '9876543108', '2019-12-01', 6, 13),
('Meera', 'Deshmukh', 'meera.deshmukh@example.com', '9876543109', '2020-05-30', 7, 15),
('Vikram', 'Rao', 'vikram.rao@example.com', '9876543110', '2022-02-10', 8, 17),
('Divya', 'Joshi', 'divya.joshi@example.com', '9876543111', '2020-09-17', 3, 1),
('Sanjay', 'Gupta', 'sanjay.gupta@example.com', '9876543112', '2018-06-21', 3, 3),
('Isha', 'Chopra', 'isha.chopra@example.com', '9876543113', '2019-04-28', 4, 12),
('Rajesh', 'Pillai', 'rajesh.pillai@example.com', '9876543114', '2017-03-19', 9, 20),
('Sneha', 'Reddy', 'sneha.reddy@example.com', '9876543115', '2020-11-23', 10, 10),
('Amit', 'Mishra', 'amit.mishra@example.com', '9876543116', '2019-05-07', 2, 8),
('Pooja', 'Naidu', 'pooja.naidu@example.com', '9876543117', '2021-06-16', 3, 1),
('Manish', 'Thakur', 'manish.thakur@example.com', '9876543118', '2020-03-14', 3, 2),
('Nisha', 'Gandhi', 'nisha.gandhi@example.com', '9876543119', '2018-08-19', 1, 5),
('Harsh', 'Kapoor', 'harsh.kapoor@example.com', '9876543120', '2019-10-10', 5, 9),
('Reema', 'Bhatt', 'reema.bhatt@example.com', '9876543121', '2022-03-01', 8, 17),
('Ayaan', 'Malhotra', 'ayaan.malhotra@example.com', '9876543122', '2019-07-09', 6, 13),
('Kavya', 'Dutta', 'kavya.dutta@example.com', '9876543123', '2020-02-22', 2, 8),
('Suresh', 'Jain', 'suresh.jain@example.com', '9876543124', '2021-01-13', 9, 19),
('Tanya', 'Roy', 'tanya.roy@example.com', '9876543125', '2022-07-25', 3, 1),
('Arjun', 'Bose', 'arjun.bose@example.com', '9876543126', '2018-12-11', 4, 11),
('Vidya', 'Menon', 'vidya.menon@example.com', '9876543127', '2020-10-02', 3, 2),
('Deepak', 'Khanna', 'deepak.khanna@example.com', '9876543128', '2019-02-19', 7, 15),
('Shreya', 'Chatterjee', 'shreya.chatterjee@example.com', '9876543129', '2021-11-14', 5, 10),
('Vivek', 'Rana', 'vivek.rana@example.com', '9876543130', '2019-06-05', 3, 3);



INSERT INTO employee (first_name, last_name, email, phone, hire_date, dept_id, desig_id) VALUES
('Aniket', 'Kulkarni', 'aniket.kulkarni@example.com', '9876543131', '2021-02-12', 3, 1),
('Tanvi', 'Shetty', 'tanvi.shetty@example.com', '9876543132', '2020-04-17', 4, 11),
('Aditya', 'Jadhav', 'aditya.jadhav@example.com', '9876543133', '2021-07-08', 5, 9),
('Mitali', 'Mehta', 'mitali.mehta@example.com', '9876543134', '2018-11-21', 2, 7),
('Siddharth', 'Patil', 'siddharth.patil@example.com', '9876543135', '2019-05-10', 3, 2),
('Ritika', 'Desai', 'ritika.desai@example.com', '9876543136', '2022-06-14', 1, 6),
('Akash', 'Bhatia', 'akash.bhatia@example.com', '9876543137', '2020-08-30', 6, 14),
('Shruti', 'Agarwal', 'shruti.agarwal@example.com', '9876543138', '2019-09-25', 3, 3),
('Kunal', 'Reddy', 'kunal.reddy@example.com', '9876543139', '2021-05-16', 4, 12),
('Pallavi', 'Rao', 'pallavi.rao@example.com', '9876543140', '2022-01-11', 7, 15),
('Rakesh', 'Ghosh', 'rakesh.ghosh@example.com', '9876543141', '2021-03-03', 5, 9),
('Chaitanya', 'Menon', 'chaitanya.menon@example.com', '9876543142', '2020-02-14', 2, 8),
('Snehal', 'Bhattacharya', 'snehal.bhattacharya@example.com', '9876543143', '2022-07-09', 8, 17),
('Viveka', 'Das', 'viveka.das@example.com', '9876543144', '2020-10-28', 3, 1),
('Pranav', 'Banerjee', 'pranav.banerjee@example.com', '9876543145', '2021-04-01', 1, 5),
('Nikita', 'Pandey', 'nikita.pandey@example.com', '9876543146', '2019-06-30', 3, 2),
('Harini', 'Raman', 'harini.raman@example.com', '9876543147', '2020-01-23', 9, 19),
('Rajiv', 'Saxena', 'rajiv.saxena@example.com', '9876543148', '2018-09-09', 2, 7),
('Kritika', 'Bhonsle', 'kritika.bhonsle@example.com', '9876543149', '2022-02-15', 3, 1),
('Akhil', 'Joshi', 'akhil.joshi@example.com', '9876543150', '2021-11-28', 4, 12),
('Ankita', 'Pawar', 'ankita.pawar@example.com', '9876543151', '2020-12-17', 5, 10),
('Parth', 'Tiwari', 'parth.tiwari@example.com', '9876543152', '2019-07-07', 6, 13),
('Smita', 'Lal', 'smita.lal@example.com', '9876543153', '2021-09-15', 7, 15),
('Chirag', 'Sinha', 'chirag.sinha@example.com', '9876543154', '2022-03-18', 8, 17),
('Monica', 'Rana', 'monica.rana@example.com', '9876543155', '2021-08-25', 3, 1),
('Rohit', 'Bajaj', 'rohit.bajaj@example.com', '9876543156', '2018-12-06', 3, 2),
('Tanuja', 'Kaul', 'tanuja.kaul@example.com', '9876543157', '2019-11-09', 4, 11),
('Yash', 'Dubey', 'yash.dubey@example.com', '9876543158', '2021-10-03', 3, 3),
('Sakshi', 'Rastogi', 'sakshi.rastogi@example.com', '9876543159', '2020-04-27', 5, 9),
('Dev', 'Krishnan', 'dev.krishnan@example.com', '9876543160', '2019-01-19', 3, 1),
('Riya', 'Chawla', 'riya.chawla@example.com', '9876543161', '2020-06-08', 1, 6),
('Gaurav', 'Pathak', 'gaurav.pathak@example.com', '9876543162', '2021-12-04', 2, 8),
('Lavanya', 'George', 'lavanya.george@example.com', '9876543163', '2022-09-13', 3, 2),
('Keshav', 'Ramaswamy', 'keshav.ramaswamy@example.com', '9876543164', '2019-08-26', 8, 17),
('Mehul', 'Rao', 'mehul.rao@example.com', '9876543165', '2020-05-19', 9, 19),
('Rachita', 'Bansal', 'rachita.bansal@example.com', '9876543166', '2021-07-02', 10, 20),
('Ajay', 'Deshmukh', 'ajay.deshmukh@example.com', '9876543167', '2018-10-10', 3, 1),
('Bhavana', 'Goyal', 'bhavana.goyal@example.com', '9876543168', '2020-01-05', 2, 7),
('Tushar', 'Naik', 'tushar.naik@example.com', '9876543169', '2019-03-11', 3, 3),
('Namrata', 'Seth', 'namrata.seth@example.com', '9876543170', '2021-06-23', 4, 11),
('Rajat', 'Shah', 'rajat.shah@example.com', '9876543171', '2022-05-20', 5, 10),
('Anushka', 'Verma', 'anushka.verma@example.com', '9876543172', '2020-07-14', 6, 13),
('Saurabh', 'Rawat', 'saurabh.rawat@example.com', '9876543173', '2021-02-01', 7, 15),
('Payal', 'Mishra', 'payal.mishra@example.com', '9876543174', '2020-03-09', 3, 1),
('Ashish', 'Goel', 'ashish.goel@example.com', '9876543175', '2019-05-13', 3, 2),
('Komal', 'Acharya', 'komal.acharya@example.com', '9876543176', '2021-09-05', 8, 17),
('Dhruv', 'Mahajan', 'dhruv.mahajan@example.com', '9876543177', '2022-01-18', 3, 1),
('Swati', 'Bedi', 'swati.bedi@example.com', '9876543178', '2020-10-20', 2, 8),
('Ramesh', 'Tripathi', 'ramesh.tripathi@example.com', '9876543179', '2018-08-01', 9, 19),
('Avantika', 'Joshi', 'avantika.joshi@example.com', '9876543180', '2021-07-27', 3, 3),
('Devika', 'Narayan', 'devika.narayan@example.com', '9876543181', '2022-03-10', 5, 9),
('Mohan', 'Chatterjee', 'mohan.chatterjee@example.com', '9876543182', '2019-11-02', 3, 2),
('Trisha', 'Menon', 'trisha.menon@example.com', '9876543183', '2020-06-29', 1, 6),
('Ravi', 'Sundar', 'ravi.sundar@example.com', '9876543184', '2021-10-22', 3, 1),
('Garima', 'Rathore', 'garima.rathore@example.com', '9876543185', '2018-09-03', 3, 2),
('Ameya', 'Bhattacharjee', 'ameya.bhattacharjee@example.com', '9876543186', '2020-02-18', 4, 12),
('Ishaan', 'Menon', 'ishaan.menon@example.com', '9876543187', '2021-08-07', 2, 8),
('Deepali', 'Ghosh', 'deepali.ghosh@example.com', '9876543188', '2019-04-05', 3, 1),
('Tarun', 'Raj', 'tarun.raj@example.com', '9876543189', '2020-12-26', 5, 9),
('Aditi', 'Chopra', 'aditi.chopra@example.com', '9876543190', '2021-05-29', 6, 13),
('Nitin', 'Sarkar', 'nitin.sarkar@example.com', '9876543191', '2019-09-12', 7, 15),
('Veena', 'Mohan', 'veena.mohan@example.com', '9876543192', '2022-08-08', 3, 1),
('Hriday', 'Sen', 'hriday.sen@example.com', '9876543193', '2020-11-16', 8, 17),
('Bhavya', 'Kohli', 'bhavya.kohli@example.com', '9876543194', '2018-07-24', 3, 2),
('Raj', 'Khurana', 'raj.khurana@example.com', '9876543195', '2021-03-14', 4, 11),
('Aparna', 'Naidu', 'aparna.naidu@example.com', '9876543196', '2020-01-02', 5, 10),
('Harsha', 'Bose', 'harsha.bose@example.com', '9876543197', '2019-02-15', 3, 1),
('Shantanu', 'Mehta', 'shantanu.mehta@example.com', '9876543198', '2021-06-07', 6, 13),
('Lakshmi', 'Dey', 'lakshmi.dey@example.com', '9876543199', '2020-05-18', 2, 8),
('Vimal', 'Garg', 'vimal.garg@example.com', '9876543200', '2022-09-05', 3, 1);

-- ======================================================

INSERT INTO department (dept_name) VALUES
('Customer Success'),
('Legal Affairs'),
('Quality Assurance'),
('Corporate Strategy'),
('Business Intelligence');

INSERT INTO designation (desig_name) VALUES
('Solutions Architect'),
('Business Analyst'),
('Scrum Master'),
('Technical Writer'),
('Chief Technology Officer');

-- ======================================================