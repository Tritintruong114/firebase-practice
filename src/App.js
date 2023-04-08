import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [newMovieTilte, setNewMovieTilte] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updateTitle, setUpDataTilte] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //Read the data from database
    //setMovieList to render
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTilte,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error, "ERROR");
    }
    //id will auto genderate
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateTilte = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `project-file/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text flex-col xl flex items-center justify-center h-screen w-full">
      <Auth />
      <div className="flex flex-col gap-3 justify-center items-center bg-slate-300 p-3">
        <input
          onChange={(e) => setNewMovieTilte(e.target.value)}
          type="text"
          placeholder="movie tilte..."
        ></input>
        <input
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          type="number"
          placeholder="release..."
        ></input>
        <input
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          type="checkbox"
        ></input>
        <p>Oscar?</p>
        <button onClick={onSubmitMovie} className="bg-slate-600 text-white">
          Submit movie
        </button>
      </div>
      <div className="flex justify-center items-center flex-col">
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1
              style={{ color: movie.receivedAnOscar ? "green" : "red" }}
              className="text-3xl font-bold"
            >
              {movie.title}
            </h1>
            <p>user add: {movie.userId}</p>
            <div>Date: {movie.releaseDate}</div>
            <div>{movie.receivedAnOscar}</div>

            <button
              className="bg-red-400 text-white rounded-full px-3"
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>
            <input
              className="border border-black"
              placeholder="update title"
              onChange={(e) => setUpDataTilte(e.target.value)}
            ></input>
            <button
              onClick={() => updateTilte(movie.id)}
              className="bg-orange-300 rounded-full px-3"
            >
              Update
            </button>
          </div>
        ))}
      </div>

      <div>
        <input
          onChange={(e) => setFileUpload(e.target.files[0])}
          type="file"
        ></input>
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;
