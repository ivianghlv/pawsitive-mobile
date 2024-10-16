const express = require('express');
const database = require('./connection');
const app = express();
const PORT = 3000;

app.listen(
    PORT,
    () => {
        console.log(`-> SERVER RUNNING ON PORT: ${PORT}`);
    }
)

database.connect((err) => {
    if(err){
        console.log('-> DATABASE NOT CONNECTED');
    } else {
        console.log('-> DATABASE CONNECTED SUCCESSFULLY');
    }
});

app.use(express.json());

const REST = require('./routes/api');

app.use('/api', REST);