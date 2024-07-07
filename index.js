const express = require('express');
const mongoose  = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/user_routes')
const mechRoutes = require('./routes/mech_routes')


const app = express();
const Port = process.env.Port || 3000;
const DB = process.env.DB;
app.use(express.json());
app.use(authRoutes);
app.use(mechRoutes);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB');
});

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
})