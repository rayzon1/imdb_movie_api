
const $movie = $('#movie');
const $results = $("#results");
const $pagination = $('.pagination');
const url = "http://www.omdbapi.com/?apikey=ba2a0c60&";

const getMovies = async (url) => {
  try {
    const val = await fetch(url);
    return await val.json();
  }
  catch (err) {
    return console.log('There was an error', err.message);
  }
}

const getIds = (movs) => {
  return movs.map( mov => mov.imdbID)
}

const getMoviesbyId = (val) => {
  return val.map(mov => getMovies(url + `i=${mov}`))
}


const createMovies = (res) => {

  // create <span> for each rating!
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
      $results.append(construct);
    } 
  }


const generateButtons = (results) => {
    let res = results.totalResults
    let num = Math.floor((res / 10));
    if (res > 100) {
        for(let i = 1; i < 10; i ++){
            $pagination.append(
                `<button class="button">${i}</button>`
                );
        }
    } else {
        for(let i = 1; i < num; i ++){
            $pagination.append(
                `<button class="button">${i}</button>`
                );
        }
    }
}

