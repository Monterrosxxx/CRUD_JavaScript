const reviewsController = {};
import reviewsModel from '../models/Reviews.js';

//SELECT
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate(`idClient`);
    res.json(reviews);
}

//INSERT
reviewsController.createReviews = async (req, res) => {
    const {comments, rating, idClient} = req.body;
    const newReview = new reviewsModel({comments, rating, idClient});
    await newReview.save();
    res.json({message: "review created"});
}

//DELETE
reviewsController.deleteReviews = async (req, res) => {
    const deleteReview = await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "review deleted"});
}

//UPDATE
reviewsController.updateReviews = async (req, res) => {
    const {name, description, rating} = req.body;
    const updatedReview = await reviewsModel.findByIdAndUpdate(req.params.id, {comments, rating, idClient}, {new: true});
    res.json({message: "review updated"});
}

export default reviewsController;