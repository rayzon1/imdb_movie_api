
const $movie = $('#movie');
const $results = $("#results");
const $pagination = $('.pagination');
const url = "http://www.omdbapi.com/?apikey=ba2a0c60&";

const getMovies = (url) => {
  return fetch(url)
          .then(val => val.json())
          .catch(err => console.log('There was an error', err))
}

const getIds = (movs) => {
  return movs.map( mov => mov.imdbID)
}

const getMoviesbyId = (val) => {
  return val.map(mov => getMovies(url + `i=${mov}`))
}

const createMovies = (res) => {
    //console.log(res);
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
      $results.append(construct);
    } 
  }

const generateButtons = (results) => {
    //console.log(results);
    let res = results.totalResults
    let num = Math.floor((res / 10));
    if (res > 100) {
        for(let i = 1; i <= 10; i ++){
            $pagination.append(
                `<button class="button">${i}</button>`
                );
        }
    } else {
        for(let i = 1; i <= num; i ++){
            $pagination.append(
                `<button class="button">${i}</button>`
                );
        }
    }
}

