//const { response } = require('express');
//const express = require('express');      //"type:" "commonjs",      (package.json)
import dotenv from 'dotenv';
import express, { request, response } from "express";                  //"type:" "module",(latest) (package.json)
import { MongoClient } from 'mongodb'; 
import { moviesRouter } from './routes/moviesCURD.js';

dotenv.config(); //all keys it wil put in process.env

export const app=express(); 
const port = 9000;

//middleware

app.use(express.json()); //express.json() //every req in app  body is parsed as json 


//console.log(process.env.MONGO_URL);

const MONGO_URL = process.env.MONGO_URL; //cloud.mongoDB //in .env we have key and value pair
//npm i dotenv -> to install .env to url and credentials so git cant track it
//const MONGO_URL = "mongodb://localhost";


async function createConnection()
{
   const client = new MongoClient(MONGO_URL);
   await client.connect(); //returns promise object thts why we are gonna use async
   console.log("MongoDB Connected");
   return client;
}

export const client = await createConnection(); //so client can be gobally available

app.get('/', (request ,response) =>
{
    response.send('Hello,🌎!!');
});

app.use('/movies', moviesRouter)


// app.get('/movies/', (request ,response) =>
// {
//     //http://localhost:9000/movies?language=english&rating=8
//     const {language} = request.query;
//     const {rating} = request.query;
//     console.log(language,rating);
//     if(language){

//         const Filtermovies = movies.filter( (mv) => mv.language === language );
//         response.send(Filtermovies);
//     }
//     else if(rating){

//         const Filtermovies = movies.filter( (mv) => mv.rating>=8);
//         response.send(Filtermovies);
//     }
//     else if((language && rating))
//     {
//         const Filtermovies = movies.filter( (mv) => mv.language === language && mv.rating>=8);
//         response.send(Filtermovies);
//     }
//     else{
//         response.send(movies);
//     }
    
//    // movie ? response.send(movie) :response.status(404).send({message : " Movie 404"});
   
    
// });


app.listen(port, () => console.log("App Started On Port ",port));


