import mongoose from 'mongoose';
import Work from '../models/work.model';

export const getWork = async (req, res) => {  
  try {
    const works = await Work.find({})
    res.status(200).json({success: true, data: works})    
  } catch (error) {
    res.status(500).json({success:false, message: 'Server Error'})
  }
}

export const createWork = async (req, res) => {
  const work = req.body;  
  
  if (!work.title || !work.descript || !work.thumbnail) {
    return res.status(400).json({success:false, message:'Please provide all fields'})
  }
  
  const newWork = new Work(work);
  
  try {
    await newWork.save();
    res.status(201).json({success:true, data:newWork})
  } catch (error) {
    res.status(500).json({success:false, message:'Server Error'})
  }
}

export const updateWork = async (req, res) => {
  const { id } = req.params;
  const work = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false, message: 'Invalid Work Id'})
  }
  
  try {
    const updateWork = await Work.findByIdAndUpdate(id, work, {new:true})
    res.status(200).json({success:true, data:updateWork})
  } catch (error) {
    res.status(500).json({success:false, message:'Server Error'})
  } 
  
}

export const deleteWork = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Work.findByIdAndDelete(id);
    res.status(200).json({success:true, message:'Work deleted'})
  } catch (error) {
    res.status(404).json({success:false, message: 'Work not found'})
  }
}