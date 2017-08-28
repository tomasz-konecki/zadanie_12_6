var url = 'https://restcountries.eu/rest/v2/name/',
    countriesList = $('#countries'),
    capitalsList = $('#capitals'),
    languagesList = $('#languages'),
    flagsList = $('#flags');

$('#search')
    .click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name')
        .val();
    if (!countryName.length) {
        countryName = 'Poland';
    }
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });
}

function showCountriesList(resp) {
    var allLanguages = '';
    emptyItems();

    resp.forEach(function(item) {
        $('<li>')
            .text(`Country: ${item.name}`)
            .appendTo(countriesList);
        $('<li>')
            .text(`Capital: ${item.capital}`)
            .appendTo(capitalsList);

        allLanguages = getLanguages(item);
        $('<li>')
            .text(`Languages: ${allLanguages}`)
            .appendTo(languagesList);
        $(`<img src="${item.flag}" alt="flag">`)
            .appendTo(flagsList);
        $()

    });
}

function emptyItems() {
    countriesList.empty();
    capitalsList.empty();
    languagesList.empty();
    flagsList.empty();
}

function getLanguages(item) {
    var languages = '',
        langLength = item.languages.length,
        i = 0;

    for (i = 0; i < langLength; i++) {
        languages += item.languages[i].name;
        languages += ", ";
    }
    return languages;
}