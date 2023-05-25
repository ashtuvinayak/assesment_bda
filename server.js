const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/indexRoute')
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use('/', indexRouter);

const PORT = 4000; 
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });