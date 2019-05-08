class imdbGenerator {
  constructor() {
    this.$results = $("#results");
    
  }

  searchMovie(movie) {
    let url = "http://www.omdbapi.com/?apikey=ba2a0c60&";
    url += movie;
    return url;
  }

  static pictureStyle(t){
    $(t).prop('style', 'opacity: 0.2');
    $(t).next().show();
    $(t).on('mouseleave', () => {
      $(t).prop('style', 'opacity: 1');
      $(t).next().hide();
      
    })
  }

  static textStyle(t) {
    $(t).prev().prop('style', 'opacity: 0.2');
    $(t).show();
  }

  getReview(res) {
    let x = [];
    $.each(res.Search, (index, movie) => {
      let search = this.searchMovie(`i=${movie.imdbID}`);
      $.ajax({
        type: "GET",
        url: search,
        dataType: "json",
        success: (response) => {
            //this.createReview(response);
            x.push(response);
            //console.log(response);
          }
      }); //end ajax  
    }); //end loop
    //this.createMovies(x);
  }

  createReview(res) {
    let $movieResults = $('.posterContainer');
    //console.log(res.Title);
    //console.log($movieResults)
   
  
  }

  createMovies(res) {
    console.log(res);
    $.each(res.Search, (index, movie) => {
      this.$results.append(`
        <div class="posterContainer">
        <img src="${movie.Poster}" class="poster" onmouseover="imdbGenerator.pictureStyle(this)">
        <div class="cover" onmouseover="imdbGenerator.textStyle(this)"hidden>
        </div>${movie.Title}<br>
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
          this.createMovies(response);
          this.getReview(response);
        }
    }); //end ajax
  }
}

$("form").submit(function(event) {
    event.preventDefault();
    
    const gen = new imdbGenerator();
    const $movie = $("#movie");
    let mov = gen.searchMovie(`s=${$movie.val()}`);
    gen.sendAjax(mov);
    
});



