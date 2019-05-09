$("form").submit(function(event) {
    event.preventDefault();
    
    const gen = new ImdbGenerator();
    const $movie = $("#movie");
    let mov = gen.createUrl(`s=${$movie.val()}`);
    gen.sendAjax(mov);
    
});