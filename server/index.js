const express = require('express');
const router = require('./routes/index.route');
const cors = require('cors');
const fileupload = require('express-fileupload');


const dotenv = require('dotenv');
dotenv.config();

const models = require('./model/models');
const sequelize = require('./db');

const errorHandler = require('./middleware/ErrorHandlingMiddleware');


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload({}));
app.use('/static', express.static(__dirname + '/static'));

app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT,
            process.env.HOST,
            () => {
                console.log(`Server running on port=${process.env.PORT}...`)
            }
        );
    } catch (e) {
        console.log(e)
    }
}
start();


