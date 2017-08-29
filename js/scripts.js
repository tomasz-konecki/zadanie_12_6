var url = 'https://restcountries.eu/rest/v2/name/';

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
    emptyItems();

    resp.forEach((item) => {
        var country = item.name,
            capital = item.capital,
            area = item.area,
            population = item.population,
            allLanguages = getLanguages(item),
            currency = item.currencies[0].name,
            imgSource = item.flag;

        createInfoBox(country, capital, area, population, allLanguages, currency, imgSource);
    });
}

function emptyItems() {
    var a = $('.info-box');
        a.addClass('hidden');
}

function createInfoBox(country, capital, area, population, languages, currency, flag) {
    var container = $('#container'),
        infoBox = $('<div>').addClass('info-box'),
        infoHead = $('<div>').addClass('info-head'),
        flagBox = $('<div>').addClass('flag').attr('id', 'flag'),
        flagImage =$(`<img src=${flag} alt="flag">`),
        countryName = $('<p>').addClass('country-name').attr('id', 'country-name'),
        infoBar = $('<p>').addClass('info-bar').text('Background Information:'),
        detailsBox = $('<div>').addClass('details-box'),
        detailsList1 = $('<ul>').addClass('details-list-1'),
        detailsList2 = $('<ul>').addClass('details-list-2'),
        detailsArray1 = ['Capital', 'Land Area', 'Population', 'Languages', 'Currency'],
        detailsArray2 = [capital, area, population, languages, currency],
        bottomBar = $('<p>').addClass('bottom-bar');

        detailsArray1.forEach(function(item) {
            var detailItem1 = $('<li>').text(item);
                detailItem1.appendTo(detailsList1);
        });

        detailsArray2.forEach(function(item) {
            var detailItem2 = $('<li>').text(` : ${item}`);
                detailItem2.appendTo(detailsList2);
        });


        flagBox.append(flagImage);
        countryName.text(country);
        infoHead.append(flagBox)
            .append(countryName);

        detailsBox.append(detailsList1)
            .append(detailsList2);

        infoBox.append(infoHead)
            .append(infoBar)
            .append(detailsBox)
            .append(bottomBar);

        infoBox.appendTo(container);

}

function getLanguages(item) {
    var languages = [],
        langLength = item.languages.length,
        i = 0;

    for (i = 0; i < langLength; i++) {
        languages.push(item.languages[i].name);
    }

    return languages.join(", ");
}