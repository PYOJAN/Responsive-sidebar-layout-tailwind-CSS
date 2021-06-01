import { Router } from 'express';
import auth from './../http/controllers/auth.controller'

const routers = new Router();

routers.route('/login')
    .get((req, res, next) => {
        res.render('pages/auth/login.ejs', { title: 'Login', layout: './layout/auth' });
    })
    .post((req, res, next) => {



        res.status(200).json({
            message: "Received",
            body: req.body
        })
    });


routers.route('/register')
    .get((req, res, next) => {
        res.render('pages/auth/register.ejs', {
            title: "Register",
            layout: './layout/auth'
        });
    })
    .post(auth.userRegister);



export default routers;