class imdbGenerator {
  constructor() {
    this.$results = $("#results");
    
  }

  searchMovie(movie) {
    let url = "http://www.omdbapi.com/?apikey=ba2a0c60&s=";
    url += movie;
    return url;
  }

  createMovies(res) {
    $.each(res.Search, (index, movie) => {
      this.$results.append(`
        <div class="posterContainer">
        <img src="${movie.Poster}" class="poster">
        ${movie.Title}<br>
        ${movie.Year}
        </div>
      `);
    }); //end each
    
  }

  sendAjax(movie) {
    $.ajax({
      type: "GET",
      url: movie,
      dataType: "json",
      success: (response) => {
          //console.log(response);
          this.createMovies(response)
        }
    }); //end ajax
  }

  

}





$("form").submit(function(event) {
    event.preventDefault();
    
    const gen = new imdbGenerator();
    const $movie = $("#movie");
    let mov = gen.searchMovie($movie.val());
    gen.sendAjax(mov);
    
});
