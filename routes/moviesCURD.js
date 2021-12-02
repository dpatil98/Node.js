import { getMovieByID, getAllMovies, postMovies, deleteAllMovies, deleteMovieByID, updateMovieByID } from '../MongoFunctions.js';
import { app } from '../index.js';
import express from 'express';
const router = express.Router();

//---------------------Get By ID-----------------------------------------------------
router.get('/movies/:id', async (request, response) => {

    console.log(request.params);
    const { id } = request.params;
    // // const movie = movies.filter(mv => mv.id === id)[0];
    // let movie = movies.find( (mv) => mv.id === id );
    //
    //db.movies.findOne({id:"102"})
    let movie = await getMovieByID(id);
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send({ message: " Movie 404" });
});


// Task:
// 1.http://localhost:9000/movies
// http://localhost:9000/movies?language=english
// http://localhost:9000/moviesrating=8
// http://localhost:9000/movies?language=english&rating=8
//solution ->

//-----------------Get All Movies------------------------------------------------
router.get('/', async (request, response) => {
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
    if (Filter.rating) {
        Filter.rating = parseFloat(Filter.rating);
    }


    const Filtermovies = await getAllMovies(Filter); //cursor to array


    // console.log(Filtermovies);
    //cursor- pegination //for ex when u google something u only get 20 results 
    response.send(Filtermovies);

});



//----------------------------POST in MongoDb------------------------------------
router.post('/', async (request, response) => {

    const data = request.body;
    console.log(data);
    const results = await postMovies(data);
    response.send(results);

});


//----------------------------DEL All Movies in MongoDb------------------------------------
router.delete('/DEL', async (request, response) => {

    const result = await deleteAllMovies();
    response.send(result);
});



//--------------------------DEL one By ID---------------------------------------------
router.delete('/:id', async (request, response) => {

    console.log(request.params);
    const { id } = request.params;


    //db.movies.deleteOne({id:"102"})
    let deleted = await deleteMovieByID(id);
    const movies = await getAllMovies();
    deleted.deletedCount > 0 ? response.send(movies) : response.status(404).send({ message: " Movie 404" });


});


//-------------------------update movie by ID--------------------------------------------
router.put("/:id", async (request, response) => {

    console.log(request.params);
    const { id } = request.params;
    const data = request.body;

    //db.movies.deleteOne({id:"102"})
    let updated = await updateMovieByID(id, data);
    const movie = await getMovieByID(id);
    //  deleted.deletedCount>0 ? response.send(deleted) :response.status(404).send({message : " Movie 404"});
    response.send(movie);
});

export const moviesRouter =router;