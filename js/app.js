var weatherIcon = new Array(6);
    weatherIcon[0] = "svgs/day.svg";
	weatherIcon[1] = "svgs/clear-night.svg";
	weatherIcon[2] = "svgs/rain-cloud.svg";
	weatherIcon[3] = "svgs/snow-cloud.svg";
	weatherIcon[4] = "svgs/sleet.svg";
	weatherIcon[5] = "svgs/windy-cloud.svg";
	weatherIcon[6] = "svgs/fog.svg";
	weatherIcon[7] = "svgs/cloudy.svg";
	weatherIcon[8] = "svgs/sun-cloud.svg";
	weatherIcon[9] = "svgs/partly-cloudy-night.svg";
	weatherIcon[10] = "svgs/hail.svg";
	weatherIcon[11] = "svgs/thunder-cloud.svg";
	weatherIcon[12] = "svgs/tornado.svg";

var forecast_icon = new Array(13);
	forecast_icon[0] = "clear-day";
	forecast_icon[1] = "clear-night";
	forecast_icon[2] = "rain";
	forecast_icon[3] = "snow";
	forecast_icon[4] = "sleet";
	forecast_icon[5] = "wind";
	forecast_icon[6] = "fog";
	forecast_icon[7] = "cloudy";
	forecast_icon[8] = "partly-cloudy-day";
	forecast_icon[9] = "partly-cloudy-night";
	forecast_icon[10] = "hail";
	forecast_icon[11] = "thunderstorm";
	forecast_icon[12] = "tornado";


var animated_icons = new Array(6);
	animated_icons[0] = "svgs/day.svg";
	animated_icons[1] = "svgs/rain-cloud.svg";
	animated_icons[2] = "svgs/snow-cloud.svg";
	animated_icons[3] = "svgs/sun-cloud.svg";
	animated_icons[4] = "svgs/thunder-cloud.svg";
	animated_icons[5] = "svgs/windy-cloud.svg";
	animated_icons[6] = "svgs/day.svg";


var month = new Array(12);
	month[0] =  "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";	 



var currentdate = new Date();
var day = currentdate.getDay();
var date = currentdate.getDate();
var year = currentdate.getFullYear();
var month = month[currentdate.getMonth()];
var formatted_date = month + " " + date + "," + " " + year;

function hours12(date) { 
	return currentdate.getHours() %12 || 12; 
}

var hours = currentdate.getHours();
var ampm = hours >= 12 ? 'pm' : 'am';
var minutes = currentdate.getMinutes();
var hours = hours12(hours);
var minutes = minutes < 10 ? '0'+ minutes : minutes;
var formatted_time = hours + ':' + minutes + ' ' + ampm;

var time_date = formatted_date + " " + formatted_time;

			
var day = new Date();
var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

var day_1 = weekday[Date.today().getDay()];
var day_2 = weekday[Date.today().add(1).days().getDay()];
var day_3 = weekday[Date.today().add(2).days().getDay()];
var day_4 = weekday[Date.today().add(3).days().getDay()];
var day_5 = weekday[Date.today().add(4).days().getDay()];
var day_6 = weekday[Date.today().add(5).days().getDay()];
var day_7 = weekday[Date.today().add(6).days().getDay()];
var day_8 = weekday[Date.today().add(7).days().getDay()];

function open_modal(){
	if ($("input").val() != "") {
		$(".loader-container").removeClass("none");
		$(".landing-msg").css("display", "none");
		function getRandomInt(max) {
  			return Math.floor(Math.random() * Math.floor(max));
		}
			var array_length = animated_icons.length;
			var random_icon = animated_icons[getRandomInt(array_length)];
			$(".sunshine").attr("src", random_icon);
 			$("#degree").attr("src", "");
			$("#forecast-icon").attr("src","");
	}
}

$(document).ready(function(){ $("h6").text(time_date);});


function getWeatherData(e){
	var address = $("#address").val();
	var encodedAddress = encodeURIComponent(address);
	var xhttp = new XMLHttpRequest();
	var key = "AIzaSyAt_MHM8CMn0nVPu_Y-qcc0zI82_gyDlEw";

  	xhttp.open("GET",`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`, true);
  	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(xhttp.responseText);
			if(data.results[0] === undefined){
				$(".loader-container").addClass("none");
				$(".day1").html("<h1>No results</h1>");
			}


			var lat = data.results[0].geometry.location.lat;
			var lng = data.results[0].geometry.location.lng;
			var city_state = data.results[0].formatted_address;

			var xhttp1 = new XMLHttpRequest();
	  		xhttp1.open("GET",`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b97611e86cb50ebfc99eae6b7c06d572/${lat},${lng}`, true);
			
    
   
		  	xhttp1.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			 		var data = JSON.parse(xhttp1.responseText);
					var current_temp = Math.floor(data.currently.temperature)
					var icon = data.currently.icon;
					var summary = data.currently.summary;
					var precip = data.currently.precipProbability;
					var windSpeed = data.currently.windSpeed;
					var visibility = data.currently.visibility;
					var humidity = data.currently.humidity;
					var timezone = data.timezone;
					 

					 
					var day2tempLow = Math.floor(data.daily.data[0].temperatureLow); 
					var day2tempHigh = Math.floor(data.daily.data[0].temperatureHigh);
					var day2icon = data.daily.data[0].icon;
					var day2summary = data.daily.data[0].summary;
					var day2precip = data.daily.data[0].precipProbability;

					var day3tempLow = Math.floor(data.daily.data[1].temperatureLow); 
					var day3tempHigh = Math.floor(data.daily.data[1].temperatureHigh);
					var day3icon = data.daily.data[1].icon;
					var day3summary = data.daily.data[1].summary;
					var day3precip = data.daily.data[1].precipProbability;


					var day4tempLow = Math.floor(data.daily.data[2].temperatureLow); 
					var day4tempHigh = Math.floor(data.daily.data[2].temperatureHigh);
					var day4icon = data.daily.data[2].icon;
					var day4summary = data.daily.data[2].summary;
					var day4precip = data.daily.data[2].precipProbability;

					var day5tempLow = Math.floor(data.daily.data[3].temperatureLow); 
					var day5tempHigh = Math.floor(data.daily.data[3].temperatureHigh);
					var day5icon = data.daily.data[3].icon;
					var day5summary = data.daily.data[3].summary;
					var day5precip = data.daily.data[3].precipProbability;

					var day6tempLow = Math.floor(data.daily.data[4].temperatureLow); 
					var day6tempHigh = Math.floor(data.daily.data[4].temperatureHigh);
					var day6icon = data.daily.data[4].icon;
					var day6summary = data.daily.data[4].summary;
					var day6precip = data.daily.data[4].precipProbability;

					$(".day1temp span").text(current_temp);
					$(".day1icon span").text(icon);
					$("#summary1").text(summary + " " +"on" + " ");
					$(".visibility1").html("<img src='svgs/eye.svg'><span>"+"Visibility: "+visibility +"</span>");
					$(".windSpeed1").html("<img src='svgs/wind.svg'><span>"+"Wind: "+windSpeed + "mph"+"</span>");
					$(".precip1").html("<img src='svgs/rain.svg'><span>"+"Precipitation: "+precip+"%"+"</span>");
					$(".humidity1").html("<img src='svgs/rain-drops.svg'><span>"+"Humidity: "+humidity+"</span>");

					var icon_index2 = forecast_icon.indexOf(day2icon);
					var icon_index3 = forecast_icon.indexOf(day3icon);
					var icon_index4 = forecast_icon.indexOf(day4icon);
					var icon_index5 = forecast_icon.indexOf(day5icon);
					var icon_index6 = forecast_icon.indexOf(day6icon);
			

					if(a  == -1 || icon_index2 == -1 || icon_index3 == -1 || icon_index4 == -1 || icon_index5 == -1 || icon_index6 == -1){
						$("#forecast-icon").attr("src", weatherIcon[0]);
						$("#default-icon").attr("src", "svgs/static/day.svg");
					}


					$(".weather2_icon img").attr("src", weatherIcon[icon_index2]);
					$(".day2icon span").text(day2icon);
					$(".day2summary span").text(day2summary);
					$(".day2tempHigh span").text("Hi: "+day2tempHigh);
					$(".day2tempLow span").text("Low: "+day2tempLow);
					$(".day2precip span").text(day2precip+"%"+" chance of rain");

					$(".weather3_icon img").attr("src", weatherIcon[icon_index3]);
					$(".day3icon span").text(day3icon);
					$(".day3summary span").text(day3summary);
					$(".day3tempHigh span").text("Hi: "+day3tempHigh);
					$(".day3tempLow span").text("Low: "+day3tempLow);
					$(".day3precip span").text(day3precip+"%"+" chance of rain");


					$(".weather4_icon img").attr("src", weatherIcon[icon_index4]);
					$(".day4icon span").text(day4icon);
					$(".day4summary span").text(day4summary);
					$(".day4tempHigh span").text("Hi: "+day4tempHigh);
					$(".day4tempLow span").text("Low: "+day4tempLow);
					$(".day4precip span").text(day4precip+"%"+" chance of rain");

					$(".weather5_icon img").attr("src", weatherIcon[icon_index5]);
					$(".day5icon span").text(day5icon);
					$(".day5summary span").text(day5summary);
					$(".day5tempHigh span").text("Hi: "+day5tempHigh);
					$(".day5tempLow span").text("Low: "+day5tempLow);
					$(".day5precip span").text(day5precip+"%"+" chance of rain");

					$(".weather6_icon img").attr("src", weatherIcon[icon_index6]);
					$(".day6icon span").text(day6icon);
					$(".day6summary span").text(day6summary);
					$(".day6tempHigh span").text("Hi: "+day6tempHigh);
					$(".day6tempLow span").text("Low: "+day6tempLow);
					$(".day6precip span").text(day6precip+"%"+" chance of rain");

					$("h4").text(city_state);


					$(".loader-container").addClass("none");
					$(".sunshine").attr("src", "");
					$("#degree").attr("src", "svgs/degree1.svg");
					$("input").val("");

					var a = forecast_icon.indexOf(icon);
					$("#forecast-icon").attr("src", weatherIcon[a]);

					if(a == -1){
						$("#forecast-icon").attr("src", weatherIcon[0]);
					}

					$("#day1").text(day_1);
					$("#day2").text(day_2);
					$("#day3").text(day_3);
					$("#day4").text(day_4);
					$("#day5").text(day_5);

	    		}
	  		}
	  		xhttp1.send();
		}
	}
	  xhttp.send();
}
