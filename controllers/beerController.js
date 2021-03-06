var db = require('../models');

function index(req, res) {
  db.Beer.find(function (err, allBeers){
    if(err){
      console.error(err);
    }
    res.json(allBeers)
  });
}

function create(req, res) {
  db.Beer.create(req.body, function(err, beerData){
    if(err){
      console.error(err);
    }
    res.json(beerData);
  });
}

function show(req, res) {
  db.Beer.findById(req.params._id, function (err, oneBeer){
    if(err){
      console.error(err);
    }
    console.log(oneBeer);
    res.json(oneBeer);
  });
}

function destroy(req, res) {
  console.log(req.body);
  db.Beer.findOneAndRemove({_id: req.body._id}, function(err, deletedBeer){
    if(err){
      console.error(err);
    }
      console.log('deleted');
      res.send('beer removed')
  });
}

function update(req, res) {
  console.log(req.body)
  db.Beer.findOneAndUpdate({_id: req.body._id}, req.body, {new: true} ,function(err, updatedBeer){
    if(err){
      console.error(err);
    }
    console.log(updatedBeer);
    res.json(updatedBeer)
  });
}

function searching(req, res){
  console.log('searching:', req.query.q)
  var queryArr = [];
  queryArr.push(req.query.q);
  queryArr.push(req.query.q.split(' '));

  db.Beer.search(queryArr, function(err, beers){
    if(err){
      console.error(err);
    }
    res.json(beers);
 });

}



//export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  searching: searching
};
