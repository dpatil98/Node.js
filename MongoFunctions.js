import { client } from './index.js'; //give .js in node

async function updateMovieByID(id, data) {
    return await client.db("NodePractice").collection("movies").updateOne({ id: id }, { $set: data });
}
async function deleteMovieByID(id) {
    return await client.db("NodePractice").collection("movies").deleteOne({ id: id });
}
async function deleteAllMovies() {
    return await client.db("NodePractice").collection('movies').deleteMany({});
}
async function postMovies(data) {
    return await client.db("NodePractice").collection('movies').insertMany(data);
}
async function getAllMovies(Filter) {
    return await client.db("NodePractice").collection('movies').find(Filter).toArray();
}
async function getMovieByID(id) {
    return await client.db("NodePractice").collection("movies").findOne({ id: id });
}

export{

    updateMovieByID,
    deleteMovieByID,
    deleteAllMovies,
    postMovies,
    getAllMovies,
    getMovieByID,

};