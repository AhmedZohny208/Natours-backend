const express = require('express')
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController')
const bookingController = require('../controllers/bookingController');

const CSP = 'Content-Security-Policy';
const POLICY = "default-src 'self' https://*.mapbox.com https://js.stripe.com/ ws://localhost:57943/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"

const router = express.Router()

router.use(viewsController.alerts)

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get(
  '/my-tours',
  // bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router