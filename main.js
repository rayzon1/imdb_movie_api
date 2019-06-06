const api = new Api_Fetch();
api.$loadingBar.hide(); 

$("form").submit(function(event) {
    event.preventDefault();
    const newUrl = api.url + `s=${api.$movie.val()}`
    api.getMovies(newUrl)
        .then(val => {
            $('.button').remove()
            api.generateButtons(val);
            return val;
        })
        .then(val => api.getIds(val.Search)) //gets search results by ID
        .then(val => api.getMoviesbyId(val))
        .then(val => Promise.all(val))
        .then(val => {
            $('.posterContainer').remove()
            val.map(mov => api.createMovies(mov));
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
    api.$resultsDiv.append(api.$loadingBar);
    api.$loadingBar.show();
    const newUrl = api.url + `s=${api.$movie.val()}` + '&' + `page=${$(this).text()}`
    api.getMovies(newUrl)
        .then(val => api.getIds(val.Search)) //gets search results by ID
        .then(val => api.getMoviesbyId(val))
        .then(val => Promise.all(val))
        .then(val => {
            val.map(mov => api.createMovies(mov));
            return val;
        })

}); //end click
