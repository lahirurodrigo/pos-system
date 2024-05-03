function replaceStyleSheet(stylesheetURL) {

    $('#page-style-sheet').remove();
    $('head').append('<link id="#page-style-sheet" rel="stylesheet" type="text/css" href="' + stylesheetURL + '">');

}

$('#home').css({display: 'none'});

$("#login-button").eq(0).on('click', () => {
    replaceStyleSheet('../styles/homeStyle.css');
    $('#home').css({display: 'block'});
    $('#login').css({display: 'none'});
    $('#customer-content').css({display: 'none'});
    $('#item-content').css({display: 'none'});
    $('#order-content').css({display: 'none'});
});

$("#customer-link").eq(0).on('click', () => {
    replaceStyleSheet('../styles/customerStyle.css');
    $('#customer-content').css({display: 'block'});
    $('#home-content').css({display: 'none'});
    $('#item-content').css({display: 'none'});
    $('#order-content').css({display: 'none'});
});

$("#item-link").eq(0).on('click', () => {
    replaceStyleSheet('../styles/itemStyle.css');
    $('#item-content').css({display: 'block'});
    $('#customer-content').css({display: 'none'});
    $('#home-content').css({display: 'none'});
    $('#order-content').css({display: 'none'});
});

$("#orders-link").eq(0).on('click', () => {
    replaceStyleSheet('../styles/ordersStyle.css');
    $('#order-content').css({display: 'block'});
    $('#item-content').css({display: 'none'});
    $('#customer-content').css({display: 'none'});
    $('#home-content').css({display: 'none'});
});