//const { response } = require('express');
//const express = require('express');      //"type:" "commonjs",      (package.json)
import dotenv from 'dotenv';
import express, { request, response } from "express";                  //"type:" "module",(latest) (package.json)
import { MongoClient } from 'mongodb';

dotenv.config(); //all keys it wil put in process.env

const app=express(); 
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

const client = await createConnection(); //so client can be gobally available

app.get('/', (request ,response) =>
{
    response.send('Hello,🌎!!');
});


//---------------------Get By ID-----------------------------------------------------

app.get('/movies/:id', async (request ,response) =>
{
    
    console.log(request.params);
    const {id} = request.params;
    // // const movie = movies.filter(mv => mv.id === id)[0];
    // let movie = movies.find( (mv) => mv.id === id );
    //
    
    //db.movies.findOne({id:"102"})
   let  movie = await getMovieByID(id);
   console.log(movie);
   movie ? response.send(movie) :response.status(404).send({message : " Movie 404"}); 
});


// Task:
// 1.http://localhost:9000/movies
// http://localhost:9000/movies?language=english
// http://localhost:9000/moviesrating=8
// http://localhost:9000/movies?language=english&rating=8
//solution ->

//-----------------Get All Movies------------------------------------------------

app.get('/movies/', async (request ,response) =>
{
    //task :http://localhost:9000/movies?language=english

    //  const {language} = request.query;
    //  const {rating} = request.query;
   
//     let Filtermovies=movies;
   
//     if(language)
//     {
//         Filtermovies = Filtermovies.filter( (mv) => mv.language === language );
//     }
//     if(rating)
//     {
//         Filtermovies = Filtermovies.filter( (mv) => mv.rating >= rating );
//     }
//    // movie ? response.send(movie) :response.status(404).send({message : " Movie 404"});



//   ---- Code for Getting all movies from mongoDB ------
    //db.movies.find({});
    const Filter = request.query;
    console.log(Filter);
    if(Filter.rating)
    {
        Filter.rating=parseFloat(Filter.rating)
    }


    const Filtermovies = await getAllMovies(Filter); //cursor to array
   // console.log(Filtermovies);
    //cursor- pegination //for ex when u google something u only get 20 results 
    response.send(Filtermovies);
    
});

//----------------------------POST in MongoDb------------------------------------

app.post('/movies', async (request, response) => {

    const data = request.body;
    console.log(data);
    const results = await newFunction(data);
    response.send(results);

})


//----------------------------DEL All Movies in MongoDb------------------------------------

app.delete('/movies/DEL', async (request, response) =>
{

    const result = await deleteAllMovies();
    response.send(result);
})

//--------------------------DEL one By ID---------------------------------------------
app.delete('/movies/:id', async (request ,response) =>
{
    
    console.log(request.params);
    const {id} = request.params;

    
    //db.movies.deleteOne({id:"102"})
   let  deleted = await deleteMovieByID(id);
   const movies = await getAllMovies();
   deleted.deletedCount>0 ? response.send(movies) :response.status(404).send({message : " Movie 404"}); 
 
    
});

//-------------------------update movie by ID--------------------------------------------
app.put("/movies/:id", async (request, response) =>{

    console.log(request.params);
    const {id} = request.params;
    const data= request.body;
    
    //db.movies.deleteOne({id:"102"})
   let  updated = await updateMovieByID(id, data);
   const movie = await getMovieByID(id);
 //  deleted.deletedCount>0 ? response.send(deleted) :response.status(404).send({message : " Movie 404"});
    response.send(movie);
});

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


async function updateMovieByID(id, data) {
    return await client.db("NodePractice").collection("movies").updateOne({ id: id }, { $set: data });
}

async function deleteMovieByID(id) {
    return await client.db("NodePractice").collection("movies").deleteOne({ id: id });
}

async function deleteAllMovies() {
    return await client.db("NodePractice").collection('movies').deleteMany({});
}

async function newFunction(data) {
    return await client.db("NodePractice").collection('movies').insertMany(data);
}

async function getAllMovies(Filter) {
    return await client.db("NodePractice").collection('movies').find(Filter).toArray();
}

async function getMovieByID(id) {
    return await client.db("NodePractice").collection("movies").findOne({ id: id });
}
//http://localhost:9000/
//clt=c 

//instll nodemon
//npm install --save-dev nodemon