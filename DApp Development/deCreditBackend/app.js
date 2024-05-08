const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side');
})

// write a object format example  

// app.get('/', (req,res) => {
//   res.status(200).json({ message: "Hello from this server side", app: "Object example"});
// })

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...')
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})