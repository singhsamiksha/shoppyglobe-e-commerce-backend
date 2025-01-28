require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./utils/database');

// Routes
const ProductRoutes = require('./routes/product');

const app = express();
app.use(bodyParser.json());

// Registering Routes
app.use('/products', ProductRoutes);

const PORT = process.env.PORT || 5000;

initDatabase()
    .then(() => {
        // eslint-disable-next-line no-console
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('ERROR IN MongoDB Connection', e);
    });
