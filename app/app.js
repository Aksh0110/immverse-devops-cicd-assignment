const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send("Immverse AI DevOps Assignment Running");
});

app.get('/health',(req,res)=>{
    res.status(200).json({
        status:"UP"
    });
});

app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});
