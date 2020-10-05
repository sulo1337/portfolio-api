const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const port = process.env.PORT || 3000;
const dburl = config.get('dburl');
const projects = require('./routes/projects');
const login = require('./routes/login');
const register = require('./routes/register');

mongoose.connect(dburl)
    .then(() => {
        console.log(`Connected to MongoDB at ${dburl}`)
    })
    .catch((err) => {
        console.log(`Could not connect to MongoDB at ${dburl}\nError:${err.message}`)
    });

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}
app.use('/api/projects', projects);
app.use('/api/login', login);
app.use('/api/register', register);

app.listen(port, () => console.log(`Project API Listening on port: ${port}`));