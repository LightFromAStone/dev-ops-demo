const express = require('express');
const path = require('path'); // comes from node
const app = express();


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '3eedc999bfc6496795e524d12b628073',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});


let students = [];

app.post('/api/student', (req, res)=>{
   let {name} = req.body
   name = name.trim()

   students.push(name)

   rollbar.log('student was added successfully', {author: 'Peter', type: 'manual entry'});
   res.status(200).send(students)
})

app.use(rollbar.errorHandler());



const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Listening on port ${port}`));