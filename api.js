class ImdbGenerator {
  constructor() {
    this.$results = $("#results");
  }

  createUrl(id) {
    let url = "http://www.omdbapi.com/?apikey=ba2a0c60&";
    url += id;
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
    $.each(res.Search, (index, movie) => {
      let search = this.createUrl(`i=${movie.imdbID}`);
      $.ajax({
        type: "GET",
        url: search,
        dataType: "json",
        success: (response) => {
            //this.createReview(response);
            //this.movieInfo.push(response);
            this.createMovies(response);
            //console.log(response);
          }
      }); //end ajax  
    }); //end loop
    //this.createMovies()
  }

  createReview(res) {
    // Object.keys(res).forEach(key => {
    
    // })
  }

  createMovies(res) {
    //console.log(this.movieInfo.length);
    //console.log(typeof this.movieInfo);
    // $.each(this.movieInfo, (index, movie) => {
    //   this.$results.append(`
    //     <div class="posterContainer">
    //     <img src="${movie.Poster}" class="poster" onmouseover="ImdbGenerator.pictureStyle(this)">
    //     <div class="cover" onmouseover="ImdbGenerator.textStyle(this)"hidden>
    //     </div>${movie.Title}<br>
    //     </div>
    //   `);
    // }); //end each
    
    //res['Ratings'].forEach(element => console.log(element['Source']));
    console.log(res)
    let construct = '<div class="posterContainer">';
    construct += `<img src="${res['Poster']}" class="poster" onmouseover="ImdbGenerator.pictureStyle(this)">`;
    construct += `<div class="cover" onmouseover="ImdbGenerator.textStyle(this)"hidden>
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
    //this.createReview(res['Ratings']);
  }


  sendAjax(movie) {
    $.ajax({
      type: "GET",
      url: movie,
      dataType: "json",
      success: (response) => {
          //this.createMovies(response);
          this.getReview(response);
        }
    }); //end ajax
  }
}





