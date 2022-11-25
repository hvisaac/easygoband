const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const { survivorRouter } = require('./routes/SurvivorRoute');
const { inventoryRouter } = require('./routes/InventoryRoute');
const { reportRouter } = require('./routes/ReportRoute');
require('dotenv').config();
require('./config/Database');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(survivorRouter, inventoryRouter, reportRouter);
app.use(morgan('dev'));


app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});

