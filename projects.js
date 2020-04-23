const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const projects = await projectDb.get()
        res.status(200).json(projects)
    }
    catch{
        res.status(500).json({message: "Error"})
    }
});

// POST
router.post('/', async (req, res) => {
    const newPost = {...req.body, id: req.params.id}
    try{
        const success = await projectDb.insert(newPost)
        res.status(200).json(success)
    }
    catch{
        res.status(500).json({message: "cannot add"})
    }
});

// PUT
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
projectDb.update(id, changes)
.then((updated) => {
        res.status(201).json(updated);
})
.catch(error => {
    res.status(500).json({message: "Cannot update project"})
})
})

// DELETE
router.delete('/:id', async(req, res) => {
    try {
        const result = await projectDb.remove(req.params.id)
        res.status(200).json({message: `User Id: ${result} has been deleted`})
    }
    catch {
        res.status(500).json({message: "Error"})
    }
});

module.exports = router;