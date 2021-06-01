import { sign } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import User from './../../models/user.model';

// Sing access token
const token = (id, name, email, mobileNo, dob) => {
    const payload = {
        id,
        full_name: name,
        email,
        mobileNo,
        DOB: dob
    }
    return `Bearer ${sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })}`
}

// User register
const userRegister = catchAsync(async (req, res, next) => {

    console.log(req.body)

    const newUser = await User.create({
        full_name: req.body.full_name,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        DOB: req.body.DOB,
        gender: req.body.gender
    });


    // res.status(200).json({
    //     status: 'Success',
    //     message: `Your account created successfully with ${newUser.email}`,
    //     data: await newUser.getInfo(),
    //     token: token(
    //         newUser._id,
    //         newUser.full_name,
    //         newUser.email,
    //         newUser.mobileNo,
    //         newUser.DOB)
    // })

    res.redirect('/')
});

export default {
    userRegister,
}