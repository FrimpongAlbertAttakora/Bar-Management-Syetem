const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


require('dotenv/config');

// Access-Control-Allow-Origin(error) Middleware
app.use(cors());

// Body Parser Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// Students API Routes
app.use('/api/v1/barMan', require('./routes/barManagement'));


// Connect to DB
mongoose.connect( 
    process.env.DB_CONNECTION, 
    {  useNewUrlParser: true ,
       useUnifiedTopology: true, 
    },
    () => console.log('Connected to DB')
);

const port = process.env.PORT || 1230;
app.listen(port, () => console.log(`server started on port ${port}`));