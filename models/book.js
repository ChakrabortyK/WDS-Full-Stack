const mongoose = require('mongoose');

const coverImgBasePath = 'uploads/booksCovers'

const bookSchema = new mongoose.Schema({
    title:{
        type : String, 
        required : true
    },
    description:{
        type : String
    },
    publishDate:{
        type: Date,
        required : true
    },

    pageCount: {
        type : Number,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now,
        required: true
    },
    coverImage:{
        type : String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Author'
    }

})

module.exports = mongoose.model('Book',bookSchema);
module.exports.coverImgBasePath = coverImgBasePath;