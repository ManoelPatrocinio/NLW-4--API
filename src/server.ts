import express, { request, response } from "express";

const app = express();

/*
* ROTAS
*/

app.get("/", (request, response) =>{
    return response.send("Hello world");
});

app.post("/", (request, response) =>{
    return response.json({ message: "Hello world"});
});

app.listen(3333, () => console.log("server is running !")); //execução do server na porta 3333