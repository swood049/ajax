"use strict";
//Author: Steven Woodard (in conjunction with the class "Building Web Applications with Ajax" by Sasha Vodnik)
//Date: 10/6/2019

(function(window) {
	var url = "http://api.openweathermap.org/data/2.5/weather?q=London,England";
	var apiKey = "cc76fc6a502260a7a187833026177ade"; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
	var httpRequest;
	makeRequest();
	
	//making the XHR request and sending it
	function makeRequest(){
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open("GET", url + "&appid=" + apiKey);
		httpRequest.send();
	}

	//do something with the response data
	function responseMethod(){
		if(httpRequest.readyState === 4){
			if(httpRequest.status === 200){
				updateUISuccess(httpRequest.responseText);
			}else{
				updateUIError();
			}
			
		}
	}
	//handle xhr success
	function updateUISuccess(responseText){
		var response = JSON.parse(responseText);
		var condition = response.weather[0].main;
		var degC = response.main.temp - 273.15;
		var degCInt = Math.round(degC);
		var degF = (degC * 1.8) + 32;
		var degFInt = Math.round(degF);
		var weatherBox = document.querySelector("#weather");
		weatherBox.innerHTML = "<p>" + degCInt + "&#176;" + "/" + degFInt + "&#176;" + "</p><p>" + condition + "</p>";
	}
	//handle xhr failure
	function updateUIError(){
		var weatherBox = document.querySelector("#weather");
		weatherBox.className = "hidden";
	}
})(window);