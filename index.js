//const { response } = require('express');
//const express = require('express');      //"type:" "commonjs",      (package.json)
import express, { request, response } from "express";                  //"type:" "module",(latest) (package.json)
import { MongoClient } from 'mongodb';


const app=express(); 
const port = 9000;

//middleware

app.use(express.json()); //express.json() //every req in app  body is parsed as json 


// const movies=[
//     {
//      "id": "100",
//      "trailer": "https://www.youtube.com/embed/6hB3S9bIaco",
//      "name": "The Shawshank Redemption",
//      "poster": "https://rukminim1.flixcart.com/image/416/416/poster/h/m/z/posterskart-the-shawshank-redemption-poster-pksr01-medium-original-imaebcuhbuhfhryb.jpeg?q=70",
//      "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//      "rating": 9.3,
//      "language" :"english",
//     },
//     {
//      "id": "101",
//      "trailer": "https://www.youtube.com/embed/sY1S34973zA",
//      "name": "The Godfather",
//      "poster": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
//      "summary": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
//      "language" :"english",
//      "rating": 9.2
//     },
//     {
//      "id": "102",
//      "trailer": "https://www.youtube.com/embed/EXeTwQWrcwY",
//      "name": "The Dark Knight",
//      "poster": "https://images-na.ssl-images-amazon.com/images/I/91ebheNmoUL._RI_.jpg",
//      "summary": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//      "language" :"english",
//      "rating": 5.5
//     },
//     {
//      "id": "103",
//      "trailer": "https://www.youtube.com/embed/Z4Ym5vBfk50",
//      "name": "12 Angry Men",
//      "poster": "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/04/head.v1.cropped.jpg",
//      "summary": "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
//      "language" :"english",
//      "rating": 8.2
//     },
//     {
//      "id": "104",
//      "trailer": "https://www.youtube.com/embed/mxphAlJID9U",
//      "name": "Schindler's List",
//      "poster": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
//      "summary": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
//      "language" :"english",
//      "rating": 7
//     },
//     {
//      "id": "105",
//      "trailer": "https://www.youtube.com/embed/r5X-hFf6Bwo",
//      "name": "The Lord of the Rings: The Return of the King",
//      "poster": "https://sm.ign.com/ign_ap/screenshot/default/the-lord-of-the-rings-the-return-of-the-king-59b7d7a3775bf_dhkf.jpg",
//      "summary": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
//      "language" :"english",
//      "rating": 7.6
//     },
//     {
//      "trailer": "https://www.youtube.com/embed/K0eDlFX9GMc",
//      "poster": "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
//      "name": "3 Idiots",
//      "rating": "8.4",
//      "summary": "In college, Farhan and Raju form a great bond with Rancho due to his refreshing outlook. Years later, a bet gives them a chance to look for their long-lost friend whose existence seems rather elusive.",
//      "language" :"Hindi",
//      "id": "106"
//     }
//    ]

const MONGO_URL = "mongodb://localhost";

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

app.get('/movies/:id', async (request ,response) =>
{
    
    console.log(request.params);
    const {id} = request.params;
    // // const movie = movies.filter(mv => mv.id === id)[0];
    // let movie = movies.find( (mv) => mv.id === id );
    // movie ? response.send(movie) :response.status(404).send({message : " Movie 404"});
    
    //db.movies.findOne({id:"102"})
   let  movie = await client.db("NodePractice").collection("movies").findOne({id :id});
   console.log(movie);
    
});


// Task:
// 1.http://localhost:9000/movies
// http://localhost:9000/movies?language=english
// http://localhost:9000/moviesrating=8
// http://localhost:9000/movies?language=english&rating=8
//solution ->


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


    const Filtermovies = await client.db("NodePractice").collection('movies').find(Filter).toArray(); //cursor to array
   // console.log(Filtermovies);
    //cursor- pegination //for ex when u google something u only get 20 results 
    response.send(Filtermovies);
    
});

//----------------------------POST in MongoDb------------------------------------

app.post('/movies', async (request, response) => {

    const data = request.body;
    console.log(data);
    const results = await client.db("NodePractice").collection('movies').insertMany(data);
    response.send(results);

})


//----------------------------DEL All Movies in MongoDb------------------------------------

app.delete('/movies/DEL', async (request, response) =>
{

    const result = await client.db("NodePractice").collection('movies').deleteMany({});
    response.send(result);
})

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

//http://localhost:9000/
//clt=c 

//instll nodemon
//npm install --save-dev nodemon