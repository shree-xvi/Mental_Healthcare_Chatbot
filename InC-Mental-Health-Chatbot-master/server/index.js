require('dotenv').config({ path: 'server\.env' })
const express = require('express')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')
const cors=require('cors')

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

const chatRouter=require('./routes/chatRoutes')
const userRouter=require("./routes/userRoutes")

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/chat',chatRouter)
app.use('/user',userRouter)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .catch(err => { console.log(err) })
    .then(console.log("DB connected"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))