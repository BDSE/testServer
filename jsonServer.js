const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({noCors:false});

const PORT = process.env.PORT || 3000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

//json-server usues the lowdb
//get data from db.json
server.get('/*', function (req, res) {
  let key = req._parsedUrl.pathname.split('/')[1] || 'testData';
  let db = router.db // lowdb instance
  let data = db.get(key).value();

  if(data){
    data.meta = {
      code: 200
    };
  }else{
    data = {
      meta: {
        code: "data not found"
      }
    }
  }
  res.jsonp(data);
});

//set data in db.json
server.post('/*', function(req, res){
  let key = req._parsedUrl.pathname.split('/')[1] || 'testData';
  let db = router.db;
  let incommingData = req.body || {};

  incommingData.createdAt = Date.now();

  db.set(key, incommingData).write().then(function(){

    incommingData.meta = {
      code: 200
    }

    res.jsonp(incommingData);
  }, function(){
     incommingData = {
       code: "unable to write data"
     }
     res.jsonp(incommingData);
  });
});

// Use default router
server.use(router);
server.listen(PORT, (err) => {
  if(err){
    console.error(err);
  }else{
    console.info("Json server running on port 3000 ");
  }
})