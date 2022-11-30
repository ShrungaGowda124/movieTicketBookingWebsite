import { moviearr } from "./movieslist.js";

let filter = [];

// ******************************to pass the function in HTML page onload **    *****************************
window.onload = () => {
  getMovies();
  changeImg();
  bindEvents();
};

// ***************************************we are using this funtion to clear the filter chechbox*************************
const clearFilter = () => {
  filter = [];
  getMovies();
};
// ***************************************filtering the movies ******************************************
const filterMovies = (language, isChecked) => {
  const languageIndex = filter.indexOf(language);
  if (isChecked && languageIndex < 0) {
    filter = filter.concat(language);
  } else if (languageIndex > -1) {
    filter.splice(languageIndex, 1);
  }
  upcomingMov();
  getMovies();
};

// ***************************************binding the event from the html*****************************
const bindEvents = () => {
  // ***adding eventlistner for clearing the filter****************
  document.querySelector("#reset-btn").addEventListener("click", clearFilter);

  // **********we are selecting from id="upcoming-btn" and adding eventlistner on 'click' by passing function 'upcomingMov'
  document
    .querySelector("#upcoming-btn")
    .addEventListener("click", upcomingMov);

  // **********we are selecting from id="now-streaming-btn" and adding eventlistner on 'click' by passing function 'getMovies'
  document
    .querySelector("#now-streaming-btn")
    .addEventListener("click", getMovies);

  // ****************************************************we are selecting from class="checkbox-container" and adding eventlistner on 'click' by passing function 'filterMovies'
  document.querySelectorAll(".checkbox-container").forEach((item) =>
    item.addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        const { value, checked } = e.currentTarget.querySelector(".checkbox");
        filterMovies(value, checked);
      },
      false
    )
  );
};

// ***********************************************Upcoming movies>***********************************************
const upcomingMov = () => {
  let s2 = "";
  // for (movie1 of moviearr)
  moviearr.forEach((movie1) => {
    console.log(movie1);
    if (
      (filter?.indexOf(movie1.language) !== -1 || filter?.length === 0) &&
      movie1.upcoming === 1
    ) {
      s2 += `<a href="movieInfoPage.html?mid=${movie1.movieId}">
            <div class='categcard'>
            <div class ='categcard-image'><img src =${movie1.image}  alt=${movie1.movieName} /></div>
            <div class='categcard-text'>
            <h4 class='categcard-movie-name'>${movie1.movieName}</h4>
            <p class='categcard-movie-lang'>${movie1.certification}</p>
            </div>
            <div class='categcard-date'>
            <div class='stat border'>${movie1.date}</div>
            </div>
            </div>
            </a>`;
    }
  });
  document.getElementById("movie1").innerHTML = s2;
};

// ************************************this is the function to show the now-streaming movies list**************************
const getMovies = () => {
  let s1 = "";
  moviearr.forEach((movie) => {
    console.log(filter, movie.language);
    if (
      (filter?.indexOf(movie.language) !== -1 || filter?.length === 0) &&
      movie.upcoming === 0
    ) {
      s1 += `<a href="movieInfoPage.html?mid=${movie.movieId}">
            <div class='categcard'>
            <div class ='categcard-image'><img src =${movie.image} alt=${movie.movieName} /></div>
            <div class='categcard-text'>
            <h4 class='categcard-movie-name'>${movie.movieName}</h4>
            <p class='categcard-movie-lang'>${movie.certification}</p>
            </div>
            <div class='categcard-stats'>
            <div class='stat border'>BOOK</div>
            </div>
            </div>
            </a>`;
    }
  });

  document.getElementById("movie1").innerHTML = s1;
};

// ******************************************** THE END ************************************************************
