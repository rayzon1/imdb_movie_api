
class Api_Fetch {
  constructor() {
    this.$movie = $('#movie');
    this.$results = $('#results');
    this.$searchTip = $('#search_tip');
    this.$resultsDiv = $("#results_container");
    this.$pagination = $('.pagination');
    this.$loadingBar = $(".loading");
    this.$posters = $(".posterContainer");
    this.$logo = $("#logo");
    this.url = "http://www.omdbapi.com/?apikey=ba2a0c60&";
  }

  async getMovies(url) {
    try {
      const val = await fetch(url);
      return await val.json();
    } catch (error) {
      return console.log('There was an error', error.message);
    }
  }

  getIds(movs) {
    return movs.map( mov => mov.imdbID);
  }

  getMoviesbyId(val) {
    return val.map(mov => this.getMovies(this.url + `i=${mov}`))
  }

  createMovies(res){
    if(res['Ratings'].length > 0){
      let construct = `<a href="https://www.imdb.com/title/${res['imdbID']}" target="_blank"><div class="posterContainer">`;
      construct += `<img src="${res['Poster']}" class="poster" >`;
      construct += `<div class="cover" hidden>
      <span>${res['Ratings'][0]['Source']}</span><br>
      <span>${res['Ratings'][0]['Value']}</span><br><br>
      <span>${res['Ratings'][1] ? res['Ratings'][1]['Source'] : ''}</span><br>
      <span>${res['Ratings'][1] ? res['Ratings'][1]['Value'] : ''}</span><br><br>
      <span>${res['Ratings'][2] ? res['Ratings'][2]['Source'] : ''}</span><br>
      <span>${res['Ratings'][2] ? res['Ratings'][2]['Value'] : ''}</span><br>
      </div></a>`;
      construct += `<span>${res['Title']}</span><br>`;
      construct += '</div>';
      this.$results.append(construct);
      this.$loadingBar.hide();
    }
  }

  generateButtons(results){
      let res = results.totalResults
      let num = Math.floor((res / 10));
      if (res > 100) {
          for(let i = 1; i < 10; i ++){
              this.$pagination.append(
                  `<button class="button">${i}</button>`
                  );
          }
      } else {
          for(let i = 1; i < num; i ++){
              this.$pagination.append(
                  `<button class="button">${i}</button>`
                  );
            }
        }
    } 

}



