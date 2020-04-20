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
router.post('/', (req, res) => {
    const newPost = {...req.body, id: req.params.id}
    try{
        const success = await projectDb.insert(newPost)
        res.status(201).json(success)
    }
    catch{
        res.status(500).json({message: "cannot add"})
    }
});

// PUT
router.put('/:id', (req, res) => {
    if(!req.body || !req.body.notes || !req.body.descripition)
    {res.status(500).json({message: "Enter the required fields"})
return;
}
projectDb.get(req.params.id)
.then(result => {
    if(result) {
        console.log(result.id);
        projectDb.update(req.params.id, req.body);
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
        const result = await projectDb.remove(req.params.id)
        res.status(200).json({message: `User Id: ${result} has been deleted`})
    }
    catch {
        res.status(500).json({message: "Error"})
    }
});

module.exports = router;