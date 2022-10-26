var uCity = "";     
var mNewCity = {};  
var mCityList = []; 

var $cityList = $("#city-list");    
var $cityInput = $("#search-input");

function getUserCity(pCityName) {

    var iNewCity = {};

    var count = 6;


    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + pCityName + "&APPID=7b8b9479b416aab3c74d41051e07ebb2";

    console.log(queryURL);

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(results){

        var iTemps = [];
        results.list.forEach(day => {
            iTemps.push(day.main.temp);
        });

        var iHums = [];
        results.list.forEach(day => {
            iHums.push(day.main.humidity);
        });

        iNewCity = {
            name : results.city.name,
            temp : iTemps,
            humidity : iHums,
            windSpeed : results.list[0].wind.speed
        }

        mNewCity = iNewCity;
        console.log(mNewCity);
    
        if (mNewCity) {
            appendCityToList(mNewCity.name);
        }
    });

}

function Instantiate5DayForecastCards()
{
    for(var i = 1; i < 6; i++)
    {
        var iCard_ID = "date-" + i;
        var iTemp_ID = "temp-" + i;
        var iHum_ID = "hum-" + i;

        $card = $("<div>").addClass("card bg-primary text-white col-2 mx-2");

        $date = $("<div>").addClass("card-header").attr("id", iCard_ID).text("10/25/2022");

        $card.append($date);
        
        $body = $("<div>").addClass("card-body");

        $card.append($body);

        $temp = $("<p>").text("Temp: ");
        $temp_Span = $("<span>").attr("id", iTemp_ID).addClass("text-warning");

        $body.append($temp.append($temp_Span));
        
        $hum = $("<p>").text("Humidity: ");
        $hum_Span = $("<span>").attr("id", iHum_ID).addClass("text-warning");
        
        $body.append($hum.append($hum_Span));

        $("#forecast").append($card);
    }
}

Instantiate5DayForecastCards();

