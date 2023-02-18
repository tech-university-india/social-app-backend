require('dotenv').config();
const cors = require('cors');

const express = require('express');

const authRouter = require('./routers/auth.router');
const profileRouter = require('./routers/profile.router');
const entityRouter = require('./routers/entity.router');
const authValidator = require('./middlewares/auth.validator');
const actionRouter = require('./routers/action.router');
const interestRouter = require('./routers/interest.router');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/profile', authValidator.JWTVaidator, profileRouter);
app.use('/entity', authValidator.JWTVaidator, entityRouter);
app.use('/action', authValidator.JWTVaidator, actionRouter);
app.use('/interests',interestRouter);

app.listen(PORT, () => {
	console.log(`The Application has started on PORT: ${PORT}`);
});