const express = require("express");
const router = express.Router();



const ReviewController = require("../controllers/reviewController");

const reviewController = new ReviewController();

router.post("/protected/:indexId/addReview", reviewController.addReview);




const GrabController = require("../controllers/grabController");

const grabController = new GrabController();

// G1 100122: for testing only. Also query some real life examples use session unique URIs, is it due prevent bookmark/copied URL + cached data + long expiry? eg . /e6xxh61s/swap
router.get('/protected', (req, res) => {
    return res.send('Calling on protected route..');
});

router.post('/protected/swap', grabController.grabBook);

const UploadController = require("../controllers/uploadController");

const uploadController = new UploadController();

router.post("/protected/uploadbook", uploadController.uploadbook);

module.exports = router;