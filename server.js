const express = require('express')
const cors = require("cors")
const app = express()
const path = require("path")




// use middlewere
app.use(express.json())
app.use(cors())

// Serve static build
app.use(express.static(path.join(__dirname, 'client-side', 'build')));

// Catch-all fallback to React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-side', 'build', 'index.html'));
});
// start the server
app.listen(4001, () => {
    console.log(`Server running on port  4001`)
})