const path = require('path');
const express = require('express');
// const cors = require('cors');
require('dotenv').config();
// const port = process.env.PORT || 5000

const connectDB = require('./config/db.js')

connectDB()
const port = 5000;

const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
//Body parser middleware - use() is for middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//cors middleware
if(process.env.NODE_ENV !== 'production'){
    const cors = require("cors");

app.use(
    cors({
        origin: ['http://localhost:5000', 'http://localhost:3000'],
        credentials: true,
        })
    );
};

app.get('/', (req, res) =>{
    res.json({ message: 'Welcome to the RandomIdeas API'});
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter)

app.listen(port, () => console.log(`Server listening on port ${port}`));
