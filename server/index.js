const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);

//CRUD
app.get('/', (req, res)=>{
    res.send('Welcome our chat App API');
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res)=>{
    console.log(`Server is running on port ${port}`);
})

//connect to mongodb
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.log('MongoDB connection failed: ', err);
})
