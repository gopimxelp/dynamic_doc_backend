const express = require('express');

const router = express.Router()







//Get by ID Method
router.get('/content/:id', (req, res) => {
    res.send('Get by ID API')
    res.send()
})



router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})







module.exports = router;