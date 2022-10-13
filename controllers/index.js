const FS = require('../firebase')

const createMovie = async (req, res) => {
  try {
    const { body: movie } = req;
    const moviesDb = FS.db.collection('movies');
    const { _path: { segments } } = await moviesDb.add(movie);
    const id = segments[1];
    res.send({
      status: 200,
      id,
    });
  } catch (error) {
    res.send(error);
  }
}

const updateMovie = async (req, res) => {
  try {
    const { body: movie } = req;
    const { id, time, author, name, ratig } = movie;
    const movieDB = FS.db.collection('movies').doc(id);
    await movieDB.update({
      name,
      time,
      ratig,
      author
    });

    res.send({
      status: 200,
      id,
    });
  } catch (error) {
    res.send(error);
  }
}

const deleteMovie = async (req, res) => {
  try {
    const { params : { id } } = req;
    const movieDB = FS.db.collection('movies').doc(id);
    await movieDB.delete();
    res.send({
      status: 200
    });
  } catch (error) {
    res.send(error);
  }
}

const getMovieById = async (req, res) => {
  try {
    const { params : { id } } = req;
    const moviesDb = FS.db.collection('movies').doc(id);
    const { _fieldsProto : { time, author, name, ratig }} = await moviesDb.get();
    
    res.send({
      status: 200,
      time : time.stringValue,
      author: author.stringValue,
      name: name.stringValue, 
      rating: ratig.stringValue
    });
  } catch (error) {
    res.send(error);
  }
}

const getMovies = async (req, res) => {
  try {
    const moviesDb = await FS.db.collection('movies').get();
    const resp = moviesDb.docs.map(doc => doc.data());

    res.send({
      resp
    });
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
}
