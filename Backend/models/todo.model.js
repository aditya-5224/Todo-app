import mongoose from 'mongoose';

const todoschema = new mongoose.Schema({
    text: {
        type: String,
        required: true,

    },

    completed: {
        type: Boolean,
        default: false, 
    }
}, { timestamps: true})

const todo = mongoose.model('todo', todoschema);
export default todo;