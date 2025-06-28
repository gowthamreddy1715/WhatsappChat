const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const whatsappRoutes = require('./routes/whatsapp');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', whatsappRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
