import { Router } from 'express';

const router = Router();

router.route('/')
    .get((req, res, next) => {
        res.render('pages/home.ejs', { title: 'Dashboard' })
    })


export default router;