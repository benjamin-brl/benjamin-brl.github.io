const menu = $('#menu-bars');
const header = $('header');
const cursor1 = $('.cursor-1');
const cursor2 = $('.cursor-2');

const trame = $('.trame');
const pourcent = $('#pourcent');
const scroller = $('#scroller');

menu.click(function () {
    menu.toggleClass('fa-times');
    header.toggleClass('active');
});

$(window).scroll(function () {
    menu.removeClass('fa-times');
    header.removeClass('active');
});

$(window).mousemove(function (e) {
    cursor1.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
    cursor2.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
});

$('a').mouseenter(function () {
    cursor1.addClass('active');
    cursor2.addClass('active');
}).mouseleave(function () {
    cursor1.removeClass('active');
    cursor2.removeClass('active');
});

$('div[data-popup]').each(function () {
    const description = $(this).children('p')
    $(this).mouseenter(function (e) {
        description.addClass('active');
        description.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
        description.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
    }).mousemove(function (e) {
        description.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
        description.css({ top: e.pageY + 'px', left: e.pageX + 'px' });
    }).mouseleave(function () {
        description.removeClass('active');
        description.removeClass('active');
    });
})

$(window).scroll(() => {
    const pourcentage = Math.round(((scrollY + innerHeight) / (document.documentElement.scrollHeight)) * 100, 0);
    scroller.val(pourcentage)
    pourcent.text(`${pourcentage}%`)
});