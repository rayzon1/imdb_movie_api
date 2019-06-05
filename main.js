//const gen = new ImdbGenerator();
const $resultsDiv = $("#results_container");
const $loadingBar = $(".loading");
const $posters = $(".posterContainer");
$loadingBar.hide(); 

$("form").submit(function(event) {
    event.preventDefault();
    const newUrl = url + `s=${$movie.val()}`
    getMovies(newUrl)
        .then(val => {
            $('.button').remove()
            generateButtons(val);
            return val;
        })
        .then(val => getIds(val.Search)) //gets search results by ID
        .then(val => getMoviesbyId(val))
        .then(val => Promise.all(val))
        .then(val => {
            $('.posterContainer').remove()
            val.map(mov => createMovies(mov));
            return val;
        })
  }); //end form

$(document).on('mouseenter', '.poster', function () {
    $(this)
        .prop('style', 'opacity: 0.2')
        .next()
        .show()
    $(this).on('mouseleave', function () {
        $(this)
            .prop('style', 'opacity: 1')
            .next()
            .hide();
    }); //end mouseleave
}); //end mouseenter

$(document).on('mouseenter', '.cover', function () {
    $(this)
        .prev()
        .prop('style', 'opacity: 0.2');
    $(this).show();
}); //end mouseenter

$(document).on('click', '.button', function () {
    $('#results').empty();
    $resultsDiv.append($loadingBar);
    $loadingBar.show();
    const newUrl = url + `s=${$movie.val()}` + '&' + `page=${$(this).text()}`
    getMovies(newUrl)
        .then(val => getIds(val.Search)) //gets search results by ID
        .then(val => getMoviesbyId(val))
        .then(val => Promise.all(val))
        .then(val => {
            val.map(mov => createMovies(mov));
            return val;
        })
    
    
}); //end click
