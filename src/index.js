require('dotenv').config();

const express = require('express');

const profileRouter = require('./routers/profile.router')

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(profileRouter);

app.listen(PORT, () => {
	console.log(`The Application has started on PORT: ${PORT}`);
});