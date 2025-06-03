const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');


//Get all ideas
router.get('/', async (req, res) =>{
    try{
      const ideas = await Idea.find();
      res.json({ success: true, data: ideas });
    }catch (error){
      console.log(error)
      res.status(500).json({ sucess:false, error: 'Something went wrong' });
    }
});
//Get single idea
router.get('/:id', async (req, res) =>{
    
  try{
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  }catch(error){
    console.log(error)
    res.status(500).json({ success: false, error: 'Something went wrong'})
  }    
});


//Add an idea
router.post('/', async (req, res) => {
    const idea = new Idea ({
        
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        
    });

    try{ 
      const savedIdea = await idea.save();

      res.json({ success: true, data: savedIdea });
    }catch(error) {
      console.log(error)
      res.status(500).json({ success: false, error: 'Something went wrong'})

    }  
})
//Update idea 
router.put('/:id', async (req, res) =>{
    try{
      const idea = await Idea.findById(req.params.id);
      if(idea.username === req.body.username){
        const updatedIdea = await Idea.findByIdAndUpdate(
          req.params.id, 
          { 
            $set: {
              text: req.body.text,
              tag: req.body.tag
            }
          },
          { new: true }
        );
        return res.json({ success: true, data: updatedIdea});
      }
      //usernames do not match
      res.status(403).json({success:false, error: 'You are not authorized to amend this resource'});
    }catch(error){
      console.log(error);
      res.status(500).json({ success: false, error: 'Something went wrong'})
    }
});

router.delete('/:id', async (req, res) =>{
    try {
      const idea = await Idea.findById(req.params.id);

      //usernames do not match
      if(idea.username === req.body.username){
        await Idea.findByIdAndDelete(req.params.id);
        return res.json({ success: true, data: {} });
      }
      //usernames do not match
      res.status(403).json({success:false, erro: 'You are not authorized to delete this resource'});
    }catch(error){
      console.log(error);
      res.status(500).json({ success: false, error: 'Something went wrong'});
    }

    
});

// const arrs = [ 'd', 'e', 'f', 'g', 'h', 'i' ]
// console.log(arrs)
// console.log(indexOf('f'))
// const arsSpliced = arrs.splice()
module.exports = router;

//mongodb password P8SshT2f9UM3FIKW

console.log('helloworld')