const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true 
    },
    type: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    skills: {
        type: [String],
        validate: [skillsLimit, 'Skills cannot exceed 3 items']
    },
    likes: {
        type: Number,
        default: 0
    }
});

function skillsLimit(val) {
    return val.length <= 3;
}

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
