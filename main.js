const gen = new ImdbGenerator();
const $movie = $("#movie");

$("form").submit(function(event) {
    event.preventDefault();
    let mov = gen.createUrl(`s=${$movie.val()}`);
    gen.sendAjax(mov);
}); //end form

$(document).on('mouseenter', '.poster', function () {
    $(this).prop('style', 'opacity: 0.2');
    $(this).next().show();
    $(this).on('mouseleave', function () {
      $(this).prop('style', 'opacity: 1');
      $(this).next().hide();
    }); //end mouseleave
}); //end mouseenter

$(document).on('mouseenter', '.cover', function () {
    $(this).prev().prop('style', 'opacity: 0.2');
    $(this).show();
}); //end mouseenter

$(document).on('click', '.button', function () {
    console.log(this);
}); //end click
