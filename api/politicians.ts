import * as express from 'express';
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
import Politician from '../models/politician';
import Category from '../models/category';

let router = express.Router();


// Create/Update politician
router.post('/', (req, res) => {
  if(req.body._id) {
    Politician.findByIdAndUpdate(req.body._id,
      {"$set": {"name": req.body.name, "title": req.body.title, "state": req.body.state, "spendMssg":req.body.spendMssg, "militMssg": req.body.militMssg, "immigMssg": req.body.immigMssg, "scitechMssg":req.body.scitechMssg, "eduMssg":req.body.eduMssg,
      "socialMssg": req.body.socialMssg, "envirMssg": req.body.envirMssg, "classMssg": req.body.classMssg, "xFactorMssg": req.body.xFactorMssg, "troothyScore": req.body.troothyScore }}, {"new": true, "upsert": false},
     function (err, updatedCategory) {
       if (err) {
         res.send(err)
       } else {
         res.send(updatedCategory);
       }
     }
  );
} else {
  let politician:any = new Politician();
  politician.name = req.body.name;
  politician.title = req.body.title;
  politician.state = req.body.state;
  politician.militMssg = req.body.militMssg;
  politician.scitechMssg = req.body.scitechMssg;
  politician.eduMssg = req.body.eduMssg;
  politician.socialMssg = req.body.socialMssg;
  politician.envirMssg = req.body.envirMssg;
  politician.classMssg = req.body.classMssg;
  politician.xFactorMssg = req.body.xFactorMssg;
  politician.troothyScore = req.body.troothyScore;

  politician.save((err, newPolitician) => {
    Category.findOne({name:req.body.category}).exec((err, result:any) => {
      if (err) {
        res.send(err)
      } else {
        Category.findByIdAndUpdate(result._id, {"$push": {"politicians": newPolitician._id}}, {"new": true, "upsert": true},
        function(err, updatedCategory) {
        if(err) {
          res.send(err)
        } else{
          res.send(updatedCategory);
        }
      }
    );
  }
});
})
}
})

//Post request to Update single politician by id
router.post('/details', (req, res) => {
  Politician.findByIdAndUpdate(req.body._id,
    {"$set": {"spendMssg":req.body.spendMssg, "militMssg": req.body.militMssg, "immigMssg": req.body.immigMssg, "scitechMssg":req.body.scitechMssg, "eduMssg":req.body.eduMssg,
    "socialMssg": req.body.socialMssg, "envirMssg": req.body.envirMssg, "classMssg": req.body.classMssg, "xFactorMssg": req.body.xFactorMssg }}, {"new": true, "upsert": false},
    function (err, updatedCategory) {
      if (err) {
        res.send(err)
      } else {
        res.send(updatedCategory);
      }
    }
  )
})

// Read by category
router.get('/:tag', (req, res) => {
  console.log('hello')
  Category.findOne({name:req.params['tag']}).populate('politicians').exec(function (err, results: any) {
    if (err) {
      res.send(err)
    } else {
      res.json(results.politicians)
    }
  });
})


// READ: Get request to get a single politician by id

router.get('/details/:id', (req, res) => {
  Politician.find({_id: req.params['id']}, ((err, result) => {
    if(err) {
      res.send(err)
    } else {
      res.json(result[0]); //ask why this index position
    }
  }))
});


// Delete
router.delete('/:tag', (req, res) => {
  Politician.remove({_id: req.params ['tag']}, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send('success');
    }
  })
})

export default router;
