import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: {
    type: String, required: [true, 'The name of the author is required']
  },
  age: {
    type: Number, required: [true, 'The age of the author is required']
  },
  nationality: {
    type: String
  },
  img: {
    type: String, required: [true, 'The source of the image, is required.']
  },

  src:{
    type: String, required:[true, 'The source of author wiki is required.']
  }

}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export { author, authorSchema };
