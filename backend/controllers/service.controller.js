import mongoose from 'mongoose';
import Service from '../models/service.model.js';


export const getService = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({success: true, data: services});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
};


export const createService = async (req, res) => {
  const service = req.body;
    if (!service.title || !service.descript || !service.iconimg ) {
    return res.status(400).json({success:false, message:'Please provide all fields'})
  }

    const newService = new Service(service);

  try {
    await newService.save();
    res.status(201).json({success:true, data:newService})
  } catch (error) {
    console.error('Error in create service: ', error.message)
    res.status(500).json({success:false, message:'Server Error'})
  }

}

export const updateService = async (req, res) => {
  const {id} = req.params;
  const service = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: 'Invalid Service Id'});
  }

  try {
    const updateService = await Service.findByIdAndUpdate(id, service, {new: true});
    res.status(200).json({success: true, data: updateService});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
};

export const deleteService = async (req, res) => {
  const {id} = req.params;

  try {
    await Service.findByIdAndDelete(id);
    res.status(200).json({success: true, message: 'Service deleted'});
  } catch (error) {
    res.status(404).json({success: false, message: 'Service not found'});
  }
};
