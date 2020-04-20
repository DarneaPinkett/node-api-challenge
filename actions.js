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
    if(!req.body || !req.body.notes || !req.body.descripition || !req.body.project_id)
    {res.status(500).json({message: "Enter the required fields"})
return;
}
actionDb.get(req.params.id)
.then(result => {
    if(result) {
        console.log(result.id);
        actionDb.update(req.params.id, req.body);
        res.status(201).json(req.body);
    } else {
        res.status(404).json({message: "Cannot find project"})
    }
})
.catch(error => {
    res.status(500).json({message: "Cannot update project"})
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