function sendAjax(movie) {
  const $results = $("#results");
  const random = Math.floor(Math.random() * 10);

  $.ajax({
    type: "GET",
    url: movie,
    dataType: "json",
    success: function(response) {
      console.log(response);
      $.each(response.Search, function(index, movie) {
          console.log(movie);
          $results.append(`
        <div class="posterContainer">
        <img src="${movie.Poster}" id="poster">
        ${movie.Title}<br>
        ${movie.Year}
        </div>
        `);
      });
    }
  });
}

function searchMovie(movie) {
  let url = "http://www.omdbapi.com/?apikey=ba2a0c60&s=";
  url += movie;
  return url;
}

$("form").submit(function(event) {
    event.preventDefault();
    const $movie = $("#movie");
    let mov = searchMovie($movie.val());
  sendAjax(mov);
});
