const express = require('express');
const memberRouter = require('./routers/mern_final_ex/memberRouter');
const movieRouter = require('./routers/mern_final_ex/movieRouter');
const subscriptionRouter = require('./routers/mern_final_ex/subscriptionRouter');
const userRouter = require('./routers/mern_final_ex/userRouter');
const authController = require('./routers/mern_final_ex/authController');
const bodyParser = require('body-parser');
const cors = require('cors')
const connectToDB = require('./configs/atlas_db');

const app = express();
app.use(cors())

connectToDB();

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/member', memberRouter)
app.use('/api/movie', movieRouter)
app.use('/api/subscription', subscriptionRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authController);

const port = 8000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });