const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/reviewController");
const GrabController = require("../controllers/grabController");
const WishlistController = require("../controllers/wishlistController");
const AccountController = require("../controllers/accountController");
const AdminController = require("../controllers/adminController");
const UploadController = require("../controllers/uploadController");
const LogoutController = require("../controllers/logoutController");


const reviewController = new ReviewController();
const grabController = new GrabController();
const wishlistController = new WishlistController();
const accountController = new AccountController();
const adminController = new AdminController();
const uploadController = new UploadController();
const logoutController = new LogoutController();


router.post("/protected/:indexId/addReview", reviewController.addReview);

// for grabbing book with credit
router.post('/protected/grab', grabController.grabBook);

// for adding book to user's wishlist
router.post('/protected/addwish', wishlistController.addToWish);
// for removing book from user's wishlist
router.post('/protected/delwish', wishlistController.delFrWish);
// for check user's wishlist
router.get('/protected/wishlist', wishlistController.checkMyWishlist);


// G1 100122: for testing only. Also query some real life examples use session unique URIs, is it due prevent bookmark/copied URL + cached data + long expiry? eg . /e6xxh61s/swap
router.get('/protected', (req, res) => {
    return res.send('Calling on protected route..');
});

// G1 020322: for testing only.
router.get('/protected/getusers', wishlistController.getUsers);


router.post("/protected/uploadbook", uploadController.uploadbook);

// user account actions
// view profile
router.get("/protected/viewprofile", accountController.viewProfile);

// edit email and/or password
router.put("/protected/editprofile", accountController.editProfile);

// verify login/guest
router.get("/protected/verify", accountController.verify);

// logout of account
router.post("/protected/logout", logoutController.logout);

// actions that need admin permissions
// edit user type to USER, ADMIN or BANNED
router.put("/protected/admin/edituser", adminController.editUserType);

module.exports = router;