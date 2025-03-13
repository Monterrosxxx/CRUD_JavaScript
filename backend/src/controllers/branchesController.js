const branchesController = {};
import branchesModel from "../models/Branches.js"

//SELECT
branchesController.getBranches = async (req, res) => {
    const branches = await branchesModel.find();
    res.json(branches)
}

//INSERT
branchesController.createBranches = async (req, res) => {
    const {name, address, telephone, schedule} = req.body;

    const newBranch = new branchesModel({name, address, telephone, schedule})

    await newBranch.save();
    res.json({message: "branch created"})
}

//DELETE
branchesController.deleteBranches = async (req, res) => {
    const deleteBranch = await branchesModel.findByIdAndDelete(req.params.id);
    res.json({message: "branch deleted"})
}

//UPDATE
branchesController.updateBranches = async (req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const updatedBranch = await branchesModel.findByIdAndUpdate(req.params.id, 
        {name, address, telephone, schedule}, {new: true }
    
    );
    res.json({message: "branch updated"})
}

export default branchesController;