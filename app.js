import path from 'path';
import morgan from 'morgan'
import express from 'express';
import { config } from 'dotenv';
import globleError from './app/errors/globleError'
import appError from './app/errors/appError'
import userRouter from './app/routers/user.router'
import expressLayout from 'express-ejs-layouts'
import dashboard from './app/routers/dashboard'

const app = express();
config({ path: './app/config/config.env' });

// @Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// set templet engine
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.use('/', dashboard)
app.use('/auth', userRouter);



// Error handle
app.all('*', (req, res, next) => {
    next(new appError(`This * ${req.originalUrl} * URL not found.`, 404))
})
app.use(globleError);

export default app;