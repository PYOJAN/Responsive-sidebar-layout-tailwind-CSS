
$('#toggler').click(function (e) {
    e.preventDefault();
    $('.side-bar').toggleClass('w__14');
});

$('.menu > li').click(function (e) {
    e.preventDefault();
    $('.menu-items').each(function () {
        $(this).removeClass('active');
    })
    $(this).addClass('active');
});

$('#toggler-x-value').click(function (e) {
    e.preventDefault();
    const sidebar = document.querySelector('.side-bar');
    $(sidebar).toggleClass('-translate-x-full');
    $('#i__btn').toggleClass('rotate-180');
});