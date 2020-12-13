const express = require("express");
const router = express.Router();

router.route("/deleteByTag").delete(require("./modules/deleteDropletByTag"));

router.route("/:dropletId").delete(require("./modules/deleteDroplet"));

module.exports = router;