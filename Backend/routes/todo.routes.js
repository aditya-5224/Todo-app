import express from 'express';
import todo from '../models/todo.model.js';

const router = express.Router();

router.get('/todos', async (req, res) => {
    try{
        const todos = await todo.find();
        res.json(todos);
    }
    
    catch(error){
        res.status(500).json({ message: 'Server Error' });

    }});

    //ADD a new todo

    router.post("/todos", async (req, res) => {
        const todo = new todo({
            text: req.body.text,
        })

        try {
            const newTodo = await todo.save();
            res.status(201).json(newTodo);
            
        } 
        
        catch (error) {
            res.status(400).json({ message: 'Bad Request' });
            
        }
    })


    //Update a todo

    router.patch("/:id", async (req, res) => {
        try {
            const todo = await todo.findById(req.params.id);
            if (!todo) return res.status(404).json({ message: 'Todo not found' });

            if (req.body.text !== undefined) {
                todo.text = req.body.text;
            }

            if (req.body.completed !== undefined) {
                todo.completed = req.body.completed;
            }

            const updatedTodo = await todo.save();
            res.json(updatedTodo);


        } catch (error) {
            res.status(400).json({ message: 'Bad Request' });
        }
    })

    //Delete a todo
    router.delete("/:id", async (req, res) => {
        try {
            
            await todo.findByIdAndDelete(req.params.id);
            res.json({ message: 'Todo deleted' });

        } catch (error) {
            res.status(500).json({ message: 'Bad Request' });
        }
    })

    export default router;
    