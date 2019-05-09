class ImdbGenerator {
  constructor() {
    this.$results = $("#results");
    this.pages = new Pages();
    this.getId = 
  }

  createUrl(id) {
    let url = "http://www.omdbapi.com/?apikey=ba2a0c60&";
    url += id;
    return url;
  }

  getReview(res) {
    $.each(res.Search, (index, movie) => {
      let search = this.createUrl(`i=${movie.imdbID}`);
      $.ajax({
        type: "GET",
        url: search,
        dataType: "json",
        success: (response) => {
            this.createMovies(response);
          }
      }); //end ajax  
    }); //end loop
  }

  createMovies(res) {
    console.log(res);
    if(res['Ratings'].length > 0){
      let construct = '<div class="posterContainer">';
      construct += `<img src="${res['Poster']}" class="poster" >`;
      construct += `<div class="cover" hidden>
      ${res['Ratings'][0]['Source']}<br>
      ${res['Ratings'][0]['Value']}<br><br>
      ${res['Ratings'][1] ? res['Ratings'][1]['Source'] : ''}<br>
      ${res['Ratings'][1] ? res['Ratings'][1]['Value'] : ''}<br><br>
      ${res['Ratings'][2] ? res['Ratings'][2]['Source'] : ''}<br>
      ${res['Ratings'][2] ? res['Ratings'][2]['Value'] : ''}<br>

      </div>`;
      construct += `<span>${res['Title']}</span><br>`;
      construct += '</div>';
      this.$results.append(construct);
    } 
    
  }

  sendAjax(movie) {
    $.ajax({
      type: "GET",
      url: movie,
      dataType: "json",
      success: (response) => {
          //console.log(response);
          
          this.pages.generateButtons(response);
          this.getReview(response);
        }
    }); //end ajax
  }
}





