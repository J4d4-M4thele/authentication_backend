const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const { MONGO_URL, PORT } = process.env;
const authRoute =  require('./routes/AuthRoute');

const app = express();

//connect to database
mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to database')
    })
    .catch((err) => {
        console.error(err);
    });

//enable CORS
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//initialize json req and res
app.use(express.json());

app.use('/', authRoute);

app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
});