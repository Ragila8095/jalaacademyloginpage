const express = require('express');
const User = require('./schema/user.schema');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middlewares/auth.middleware');


require('dotenv').config();

const secret = process.env.SECRET_KEY
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(req.body);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/employees', authMiddleware, async (req, res) => {
    try {
        const { fname, lname, email, dob, phno, gender, address, country, city, skills } = req.body;

        const newEmployee = new Employee({
            fname,
            lname,
            email,
            dob,
            phno,
            gender,
            address,
            country,
            city,
            skills
        });

        await newEmployee.save();

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/employees', authMiddleware, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/employees/:id', authMiddleware, async (req, res) => {
    const employeeId = req.params.id;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/employees/:id', authMiddleware, async (req, res) => {
    const employeeId = req.params.id;
    try {
        await Employee.findByIdAndDelete(employeeId);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;