# Express Review
## Table of contents
  - [Middleware](#middleware)
  - [Response](#response)
  - [Request](#request)
  - [Application](#application)
  - [Routing](#routing)
  - [Reference](#reference)


## Middleware
#### `express.json([options])`
This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
**default type: "application/json"**
```
app.use(express.json()) // for parsing application/json
```
#### `express.urlencoded([options])`
This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
**default type: "application/x-www-form-urlencoded"**

#### `express.static(root, [options])`
This is a built-in middleware function in Express. It serves static files and is based on serve-static.
**use for serving static React build forlder in production**

## Response
#### `res.json([body])`
* Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.
* The `res.json` function on the other handsets the content-type header to `application/JSON` so that the client treats the response string as a valid JSON object. It also then returns the response to the client.
```
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
``` 
#### `res.send([body])`
* Sends the HTTP response.
* The `res.send` function sets the content type to `text/Html` which means that the client will now treat it as text. It then returns the response to the client.
```
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(500).send({ error: 'something blew up' })
```

## Request
#### `req.body`
Contains key-value pairs of data submitted in the request body.
By default, it is `undefined`, and **is populated when you use body-parsing middleware such as `express.json()` or `express.urlencoded()`.**

how to use body-parsing middleware to populate `req.body`:
```
var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/sendemail', (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    ...
})
```

#### `req.params`
This property is an object containing properties mapped to the named route “parameters”. 

```
app.delete('/api/uploads/:id', (req,res) => {
    const found = data.uploads.find(upload => upload.id === req.params.id)
    ...
})
```

#### `req.query`
This property is an object containing a property for each query string parameter in the route.
```
// GET /search?q=tobi+ferret
console.dir(req.query.q)
// => 'tobi ferret'

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
console.dir(req.query.order)
// => 'desc'

console.dir(req.query.shoe.color)
// => 'blue'

console.dir(req.query.shoe.type)
// => 'converse'
```

## Application

#### `app.listen([port[, host[, backlog]]][, callback])`
Binds and listens for connections on the specified host and port. 
```
app.listen(port, () => console.log(`Listening on port ${port}`));
```

#### `app.use([path,] callback [, callback...])`
**Mounts the specified middleware function** or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
```
// GET /public/style.css etc
app.use(express.static(path.join(__dirname, 'public')))
```

## Routing
**Routing refers to how an application’s endpoints (URIs) respond to client requests.**
#### `app.get(path, callback [, callback ...])`
Routes HTTP GET requests to the specified path with the specified callback functions.
```
app.get('/api/samples',(req,res) => {
    res.json(data.samples)
})
```
#### `app.post(path, callback [, callback ...])`
Routes HTTP POST requests to the specified path with the specified callback functions. 
```
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```
#### `app.put(path, callback [, callback ...])`
Routes HTTP PUT requests to the specified path with the specified callback functions.

#### `app.delete(path, callback [, callback ...])`
Routes HTTP DELETE requests to the specified path with the specified callback functions.
```
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
})
```

#### `express.Router`
Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
* Create a router file named birds.js in the app directory:
```
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```
Then, load the router module in the app:
```
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

## Reference
* https://expressjs.com/en/4x/api.html