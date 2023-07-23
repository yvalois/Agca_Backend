const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: false, parameterLimit: 90000000000, limit: '500mb'}));
app.use(bodyParser.json(
    {limit: '500mb'}
));


const cors = require('cors');
const {connectDB} = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const referRoutes = require('./routes/referRouter');

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

connectDB();

app.get('/' , (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use('/refer', referRoutes);


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

