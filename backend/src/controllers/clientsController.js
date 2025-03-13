const clientsController = {};
import clientsModel from "../models/Clients.js";

//SELECT
clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients)
}

//INSERT
clientsController.createClients = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    const newClient = new clientsModel({name, lastName, birthday, email, password, telephone, dui, isVerified})

    await newClient.save();
    res.json({message: "The client has been created"})
}

//DELETE
clientsController.deleteClients = async (req, res) => {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "The client has been deleted"})
}

//UPDATE
clientsController.updateClients = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updatedClients = await clientsModel.findByIdAndUpdate(req.params.id, 
        {name, lastName, birthday, email, password, telephone, dui, isVerified}, {new: true }
    
    );
    res.json({message: "The client has been updated"})
}

export default clientsController;