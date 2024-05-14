const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    dob: Date,
    phno: String,
    gender: String,
    address: String,
    country: String,
    city: String,
    skills: [String] // Array of skills
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;