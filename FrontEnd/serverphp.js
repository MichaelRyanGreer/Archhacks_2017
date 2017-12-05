var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
  console.log(req.url);

    if(req.url.indexOf('.php') != -1){ //req.url has the pathname, check if it conatins '.html'

      fs.readFile(__dirname + '/index.php', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    }

    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile(__dirname + '/script.js', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });

    }


    if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
       fs.readFile(__dirname + '/all.css', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });

    }



}).listen(8080);
console.log('Server running on port 8080');
