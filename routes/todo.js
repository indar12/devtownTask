const express = require('express');
const router = express.Router();
const { v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs')

const dbPath = path.join(path.resolve(),'/data/data.json')

router.post('/',(req,res)=>{
  try {
    //post
    const {text} = req.body;
    const todos = JSON.parse(fs.readFileSync(dbPath));
    console.log("todos",todos)
    if(text)
    {
        const todo = {
            id: uuidv4(),
            text,
            isPending: true,
            date: Date.now()
        }
        todos.push(todo)
        fs.writeFileSync(dbPath,JSON.stringify(todos))
        return res.json({
            todo,
            message: 'Todo added',
            success: true
        })
    }
    return res.json({
        todo: null,
        message: "Todo can not be empty",
        success: false
    })
}
catch(error){
    return res.json({
        todo: null,
        message: error.message,
        success: false
    })
} 

})
// get
router.get('/',(req,res)=>{
    try {
        const todos = JSON.parse(fs.readFileSync(dbPath))
        res.json({
            todos,
            message: "todos fetched successfully",
            success: true
        })  
    } catch (error) {
        return res.json({
                todo: null,
                message: error.message,
                success: false
            })
    }
})

router.delete("/:id",(req,res)=>{
    try {
     const {id} = req.params;
     const todos = JSON.parse(fs.readFileSync(dbPath));
     fs.writeFileSync(dbPath,JSON.stringify(todos.filter(todo=>todo.id!==id)))
     return res.json({
         todos:null,
         message: "todos deleted successfully",
         success: true
     })
    } catch (error) {
     console.log(error)
     return res.json({
         todo: null,
         message: error.message,
         success: false
     })
    }
     
 })



module.exports = router