var express = require('express');
var app = express();
var coren = require('coren/lib/server/coren-middleware');
app.use(coren());
app.use('/dist', express.static(__dirname + '/.coren/public/dist'));

app.get('/', function(req, res) {
  return res.sendCoren('index', {updatePreloadedState: {auth: true}});
});

app.listen(9393, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:9393');
});