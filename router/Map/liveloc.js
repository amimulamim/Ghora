// libraries
const express = require('express');

// creating router
const router = express.Router({ mergeParams: true });

//HOME page
router.get('/', async (req, res) => {
  res.render('driverLayout.ejs', {
    page: ['driverHome'],
    navbar: 1
  });
});


module.exports = router;