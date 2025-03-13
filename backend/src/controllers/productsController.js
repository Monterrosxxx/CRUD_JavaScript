//Aquí en el controlador iran todos los metodos ( los del CRUD )
const productsController = {};
import productsModel from "../models/Products.js"

//SELECT 

productsController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products)
}

//INSERT 

productsController.createProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;

    const newProduct = new productsModel({name, description, price, stock})

    await newProduct.save();
    res.json({message: "product :v"})
}

//DELETE

productsController.deleteProducts = async (req, res) => {
    const deleteProduct = await productsModel.findByIdAndDelete(req,params.id);
    res.json({message: "the product is delete xDDddDDdDDDdd"})
}

//UPDATE

productsController.updateProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updatedProducts = await productsModel.findByIdAndUpdate(req.params.id, 
        {name, description, price, stock}, {new: true }
    
    );
    res.json({message: "the product is udpated"})
}

//SELECT 1 producto por ID 

productsController.getProduct = async (req, res) => {
    const product = await productsModel.findById(req.params.id);
    res.json(product);
}

export default productsController;