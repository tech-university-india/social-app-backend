require('dotenv').config();
const cors = require('cors');

const express = require('express');

const profileRouter = require('./routers/profile.router');
const authRouter = require('./routers/auth.router');
const authValidator = require('./middlewares/auth.validator');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/profile', authValidator.JWTVaidator, profileRouter);

app.listen(PORT, () => {
	console.log(`The Application has started on PORT: ${PORT}`);
});