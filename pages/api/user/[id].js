import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userMl';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      await updateRole(req, res);
      break;
    
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if(result.role !== 'admin' || !result.root) 
    return res.status(400).json({ err: "Authentication is not vaild" });

    const {id} = req.query
    const {role} = req.body
    await Users.findOneAndUpdate({_id: id}, {role})
    res.json({msg: 'Update Success!'})
    

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};