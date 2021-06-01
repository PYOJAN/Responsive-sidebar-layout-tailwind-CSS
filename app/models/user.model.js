import { isEmail } from 'validator'
import { model, Schema } from 'mongoose';
import { hash, compare } from 'bcrypt'
import { pick } from 'lodash';

const userSchema = new Schema({
    full_name: {
        type: String,
        minLength: [4, 'NAME should be at least 4 characters'],
        maxLength: [16, 'NAME must be less than 16 characters'],
        required: [true, 'Name must be required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email must be is required'],
        validate: [isEmail, 'Please enter a valid email'],
        trim: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        unique: [true, 'Mobile number already registered'],
        required: [true, 'User mobile number is required'],
        trim: true
    },
    DOB: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    gender: {
        type: String,
        required: [true, 'Please Select your Gender.'],
        enum: ['male', 'female', 'other']
    },
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters'],
        required: [true, 'Password is required'],
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: 'emp',
        enum: ['emp', 'admin'],
    },
    verified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    resetTokenExprireIn: Date,
    passwordUpdateAt: String,
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await hash(this.password, 12);
    next();
});

userSchema.methods.getInfo = async function () {
    return await pick(this, [
        '_id',
        'full_name',
        'email',
        'mobileNo',
        'DOB',
        'role',
        'verified'
    ]);
}


const User = new model('User', userSchema);

export default User;