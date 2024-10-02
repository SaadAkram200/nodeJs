// const express = require("express");

// const mongoose = require('mongoose');

// const app = express();

// const User = require("./user_model");

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// const dbUri = "mongodb+srv://saadakram200:T8Za748guDiRsRNR@cluster0.zcqdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const users = [
//     // { id: 1, name: 'John Doe' },
//     // { id: 2, name: 'Jane Smith' },
// ];

// mongoose.set('strictQuery', true);
// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.listen(2000, () => {
//     console.log("connected to server");
// });

// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     users.push({ id: users.length + 1, ...newUser });
//     res.status(200).send({
//         "status_code": 200,
//         "message": "user added sucessfully",
//     });
// });

const express = require("express");
const mongoose = require('mongoose');
const User = require("./user_model");  

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUri = "mongodb+srv://saadakram200:T8Za748guDiRsRNR@cluster0.zcqdd.mongodb.net/testDb";


mongoose.set('strictQuery', true);
mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(2000, () => {
    console.log("Server connected on port 2000");
});


app.post('/post_users', async (req, res) => {
    try {
        const newUser = new User(req.body);  // Create a new User instance from the request body
        await newUser.save();  // Save the new user to MongoDB

        res.status(200).send({
            "status_code": 200,
            "message": "User added successfully",
            "user": newUser
        });
    } catch (error) {
        res.status(400).send({
            "status_code": 400,
            "message": "Error adding user",
            "error": error.message
        });
    }
});

// GET route to fetch all users
app.get('/get_users', async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from MongoDB
        res.status(200).send({
            "status_code": 200,
            "users": users
        });
    } catch (error) {
        res.status(500).send({
            "status_code": 500,
            "message": "Error fetching users",
            "error": error.message
        });
    }
});
