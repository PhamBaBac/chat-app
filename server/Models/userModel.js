const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;