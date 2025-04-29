const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reply: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    replies: [ReplySchema],
    likes: { type: Number, default: 0 },
    postType: { type: String, enum: ['complaint', 'suggestion'] }
});

module.exports = mongoose.model('Post', PostSchema);
