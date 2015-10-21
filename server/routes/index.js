var
  router = require('express').Router(),
  path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../data/testoutnoname.json'), function(err) {
    if (err) {
      next(err);
    }
  });
});

module.exports = router;
