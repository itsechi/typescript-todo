import { Schema, model } from 'mongoose';

const ListSchema = new Schema({
    listName: {
        type: String,
    },
})

export default model('List', ListSchema)