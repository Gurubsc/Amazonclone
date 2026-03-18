const mongoose = require('mongoose');
const validator = require('validator');
const { create } = require('./productModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryoto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            maxLength: [30, 'Name cannot exceed 30 characters'],
            minLength: [4, 'Name should have more than 4 characters'],
        },  
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [8, 'Password should be greater than 8 characters'],
            select: false,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        avatar: {
            type: String,
        },
        role: {
            type: String,
            default: 'user',            
    },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

userSchema.pre('save', async function ( ) {
     if (!this.isModified('password')) {
        return 
    }   
    // Hash thepassword before saving
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const token = cryoto.randomBytes(20).toString('hex');
    // Hash and set to resetPasswordToken
    this.resetPasswordToken = cryoto.createHash('sha256').update(token).digest('hex');
    // Set token expire time
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return token;
    
}

let model = mongoose.model('User', userSchema);
module.exports = model; 