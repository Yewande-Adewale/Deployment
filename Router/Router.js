const express = require('express')
const router = express.Router();
const {family,oneFamily,allFamily,update} = require ("../Controller/controller")
const upload = require('../util/multer')

router.post("/create",upload.fields( [ { name: "ChildrenImages", maxCount: 10 } ] ), family );
router.get("/family",oneFamily)
router.get("/family/:id",allFamily)
router.put("/family/:id",upload.fields( [ { name: "ChildrenImages", maxCount: 1 } ] ), update );



module.exports = router;