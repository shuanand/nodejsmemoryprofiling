const express = require('express')
const app = express()
//const host = '0.0.0.0';
const port = process.env.PORT||3001;
var heapdump = require('heapdump');

var garbage = ['g1']; //global array

function generategarbage() {
    for (let i = 0; i < 10000; i++) {
      garbage.push(new Array(10000).join('x'))
    }
  }


  function calculate() {
    return createlargeclosure();
  }
  
  
  function createlargeclosure() {
    var largeStr =new Array(1000000).join('x'); //join returns an array as string & this variable is 
    var lC =function lC(){ //closure function
      return largeStr;
    }
    return lC;
  }

app.get('/', (req, res) => {
    generategarbage();
  res.send('Hello ! Memory leak using global variable')
})
  

app.get('/user', (req, res) => {
  calculate();
  res.send('Hello new user! Memory leaks using closures')
})


app.get('/end', function(req, res){
     heapdump.writeSnapshot((err, filename) => {
        console.log("Heap dump written to", filename);
      }); 
    process.exit(0);
  });

  process.on('SIGUSR2', () => {
    process.exit(0);
  });

//post, put,patch

app.listen(port,()=>{
    console.log("app is running on new port"+port)
})