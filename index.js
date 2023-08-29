const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRouter = require('./Router/user')
const authRouter = require('./Router/auth')
const productRouter = require('./Router/product')
const cors = require('cors')

const app = express();
mongoose.set('strictQuery',true)
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected')).catch((err) => console.log('not connected', err))

app.use(cors())

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/user', userRouter)




app.listen(process.env.PORT || 5000, () => {
    console.log("server is running for 5000 port")
})