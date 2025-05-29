import mongoose from 'mongoose';
import Work from '../models/work.model.js';


export const getWork = async (req, res) => {
  try {
    const works = await Work.find({});
    res.status(200).json({success: true, data: works});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
};

// export const createWork = async (req, res) => {
  

//   const __dirname = path.resolve();
//   const uploadDir = path.join(__dirname, 'uploads');

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // cb(null, __dirname + '/uploads/'); // 절대경로 파일 저장 위치
//       cb(null, 'uploads/'); // 상대경로 파일 저장 위치
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });

//   const upload = multer({storage: storage});

//   if (!req.file) {
//     return res.status(400).json({message: '파일이 제공되지 않았습니다.'});
//   }

//   const work = req.body;
//   const filePath = path.join('uploads', req.file.filename);

//   if (!work.title || !work.descript) {
//     return res
//       .status(400)
//       .json({success: false, message: 'Please provide all fields'});
//   }

//   const newWork = new Work(work);

//   try {
//     await newWork.save();
//     res.status(201).json({success: true, data: newWork});
//   } catch (error) {
//     console.error('Error in create work: ', error.message);
//     res.status(500).json({success: false, message: 'Server Error'});
//   }
// };

export const createWork = async (req, res) => {
  const work = req.body;
    if (!work.title || !work.descript ) {
    return res.status(400).json({success:false, message:'Please provide all fields'})
  }

    const newWork = new Work(work);

  try {
    await newWork.save();
    res.status(201).json({success:true, data:newWork})
  } catch (error) {
    console.error('Error in create work: ', error.message)
    res.status(500).json({success:false, message:'Server Error'})
  }

}

export const updateWork = async (req, res) => {
  const {id} = req.params;
  const work = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: 'Invalid Work Id'});
  }

  try {
    const updateWork = await Work.findByIdAndUpdate(id, work, {new: true});
    res.status(200).json({success: true, data: updateWork});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
};

export const deleteWork = async (req, res) => {
  const {id} = req.params;

  try {
    await Work.findByIdAndDelete(id);
    res.status(200).json({success: true, message: 'Work deleted'});
  } catch (error) {
    res.status(404).json({success: false, message: 'Work not found'});
  }
};
