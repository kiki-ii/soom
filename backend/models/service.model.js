import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
  {    
    title: {
      type: String,
      require: true,
    },
    descript: {
      type: String,
      require: true,
    },
    iconimg: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
