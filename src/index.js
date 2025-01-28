const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./utils/database');
const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((e) => {
        console.error('ERROR IN MongoDB Connection', e);
    });
