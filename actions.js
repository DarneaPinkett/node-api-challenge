const express = require('express');
const actionDb = require('./data/helpers/actionModel');
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.status(200).json(actions)
    }
    catch{
        res.status(500).json({message: "Error"})
    }
});

// POST
router.post('/', (req, res) => {
    const newPost = req.body;
    actionDb.insert(newPost)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(400).json({message: "Error in posting action"})
    })
})

// PUT
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
actionDb.update(id, changes)
.then((updated) => {
        res.status(201).json(updated);
})
.catch(error => {
    res.status(500).json({message: "Cannot update action"})
})
})

// DELETE
router.delete('/:id', async(req, res) => {
    try {
        const result = await actionDb.remove(req.params.id)
        res.status(200).json({message: `User Id: ${result} has been deleted`})
    }
    catch {
        res.status(500).json({message: "Error"})
    }
});

module.exports = router;