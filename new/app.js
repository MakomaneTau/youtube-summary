const express = require('express');
const path = require('path');
const app = express();

console.log("hello");

app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  

app.use((req, res) =>{
    res.status(404);
    res.send('<h1>Error 404:Resource not found</h1>');
})

app.listen(3000, ()=>{
    console.group("App listening on port 3000");
})