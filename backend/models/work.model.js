import mongoose from 'mongoose';


const workSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    descript: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String
    },
    image: {
      type: [String], 
    },
    tag: {
      type: [String], 
    },
  },
  {
    timestamps: true,
  }
);


const Work = mongoose.model('Work', workSchema);

export default Work;