const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Dotenv module configuration
require('dotenv').config()

// Constant app variables
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const usersRoute = require('./routes/api/users')
const uploadRoute = require('./routes/api/upload')
const budgetsRoute = require('./routes/api/budgets')

// Configure routes
app.use('/api/users', usersRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/budgets', budgetsRoute)

// Connect to DB
mongoose.connect(
        process.env.MONGO_URI, {
            // Deprecation fixes
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then((res) => {
        let lastConnection = res.connections[res.connections.length - 1]
        console.log(`connected to host https://${lastConnection.host} in db "${lastConnection.name}" as "${lastConnection.user}"`)
    })
    .catch((err) => console.error(err))

// Listening port
app.listen(process.env.PORT || 5000, () => console.log(`server listening at port ${process.env.PORT}`))