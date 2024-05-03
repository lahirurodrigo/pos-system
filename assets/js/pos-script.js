function replaceStyleSheet(stylesheetURL) {

    $('#page-style-sheet').remove();
    $('head').append('<link id="#page-style-sheet" rel="stylesheet" type="text/css" href="' + stylesheetURL + '">');

}

$('#home').css({display: 'none'});

$("#login-button").eq(0).on('click', () => {
    replaceStyleSheet('../styles/homeStyle.css');
    $('#home').css({display: 'block'});
    $('#login').css({display: 'none'});
});
