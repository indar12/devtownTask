const express = require('express');
const todoRoutes = require('./routes/todo')
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors())
app.use(express.json())
app.use('/todos',todoRoutes);

app.listen(PORT,()=>{
    console.log(`server listening at port:${PORT}`)
})