const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/v1", router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    mongoose.connect('mongodb://localhost:27017/jalatech')
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB', err));
    console.log(`Server is running on port ${PORT}`);
});