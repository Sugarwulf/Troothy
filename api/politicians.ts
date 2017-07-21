import * as express from 'express';
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
import Politician from '../models/politician';
import Category from '../models/category';

let router = express.Router();

// Create/Update
router.post('/', (req, res) => {
  if(req.body._id) {
    Politician.findByIdAndUpdate(req.body._id,
      {"$set": {"name": req.body.name, "title": req.body.title, "state": req.body.state, "spendMssg":req.body.spendMssg, "militMssg": req.body.militMssg, "immigMssg": req.body.immigMssg, "scitechMssg":req.body.scitechMssg, "eduMssg":req.body.eduMssg,
      "socialMssg": req.body.socialMssg, "envirMssg": req.body.envirMssg, "classMssg": req.body.classMssg, "xFactorMssg": req.body.xFactorMssg }}, {"new": true, "upsert": true},
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

// Read
router.get('/:tag', (req, res) => {
  Category.findOne({name:req.params['tag']}).populate('politicians').exec(function (err, results: any) {
    if (err) {
      res.send(err)
    } else {
      res.json(results.politicians)
    }
  });
})


//Get a single politician by id

// router.get('/:id', (req, res) => {
//   Politician.findById(req.params['id']).then((politician) => {
//     res.json(politician);
//   });
// });

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
