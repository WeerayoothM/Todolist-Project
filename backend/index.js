const express = require("express");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const cors = require('cors');

require('./config/passport');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes);
app.use('/todos', todoRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize
    .sync()
    .then(() => {
        console.log("Database sync");
    })
    .catch((err) => {
        console.log(err);
    });
