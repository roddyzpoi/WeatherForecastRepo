// ----------------------------------------------------------------- //
// DailyForecastViewModel ViewModel
// ----------------------------------------------------------------- //
function DailyForecastViewModel(data) {

    // ----------------------------------------------------------------- //
    // Make the self as 'this' reference
    // ----------------------------------------------------------------- //
    var self = this;

    // ----------------------------------------------------------------- //
    // Private variables
    // ----------------------------------------------------------------- //
    dailyThreeHourForecastList = [];
	
	windSpeedSum = 0;
	recordsTotal = 0;		
	windDirectionSum = 0;		
	temperatureMin = 0;
	temperatureMax = 0;		
	rainfallTotal = 0;		
	pressureSum = 0;		
	humiditySum = 0;
	
	weather = [];
	
    // ----------------------------------------------------------------- //
    // Observables to manage
    // ----------------------------------------------------------------- //    
	self.dateTimeText = ko.observable();
	self.temperatureMin = ko.observable();
	self.temperatureMax = ko.observable();
	self.pressure = ko.observable();
	self.humidity = ko.observable();
	self.weatherDescription = ko.observable();
	self.weatherIcon = ko.observable();
	self.main = ko.observable();
	self.windSpeed = ko.observable();
	self.windDirection = ko.observable();
	self.rainfall = ko.observable();
	
	// ----------------------------------------------------------------- //
    // Public functions
    // ----------------------------------------------------------------- //	
	self.AddThreeHourForecast = function(data) {
		dailyThreeHourForecastList.push(data);
	}

	//Daily forecast should summarise the 3 hour data:
	//Most dominant (or current) condition - taken as average
	//Most dominant (or current) wind speed and direction - taken as average
	//Aggregate rainfall
	//Minimum and maximum temperatures
	//All values should be rounded down
	self.AggregateToDaily = function(data) {

		SetupVariables(dailyThreeHourForecastList);

		Populate();

		DetermineMostFrequentWeather();
	}
	
	// ----------------------------------------------------------------- //
    // Private functions
    // ----------------------------------------------------------------- //	
	function SetupVariables(data){
		for (var i = 0; i < data.length; i++) {
            
			windSpeedSum = windSpeedSum + data[i].windSpeed();
		
			windDirectionSum = windDirectionSum + data[i].windDirection();
		
			if (data[i].temperatureMin() < temperatureMin){
				temperatureMin = data[i].temperatureMin();
			}
			
			if (data[i].temperatureMax() > temperatureMax){
				temperatureMax = data[i].temperatureMax();
			}
		
			rainfallTotal = rainfallTotal + data[i].rain();
		
			pressureSum = pressureSum + data[i].pressure();
		
			humiditySum = humiditySum + data[i].humidity();
			
			weather.push(new WeatherViewModel(data[i].main(), data[i].weatherDescription(), data[i].weatherIcon()));
			
			recordsTotal = i + 1;
        } 
	}
	
	function Populate(){
		self.windSpeed(Math.floor((windSpeedSum/recordsTotal)));
		self.windDirection(Math.floor((windDirectionSum/recordsTotal)));
		self.pressure(Math.floor((pressureSum/recordsTotal)));
		self.humidity(Math.floor((humiditySum/recordsTotal)));
		self.humidity(Math.floor((windDirectionSum/recordsTotal)));
		
		self.rainfall(rainfallTotal);
		self.temperatureMin(temperatureMin);
		self.temperatureMax(temperatureMax);
	}
	
	function DetermineMostFrequentWeather(){
		tempWeather = [];
		
		var match = false;
		
		// Loop through counting number of instance of each main weather 
		for (var i = 0; i < weather.length; i++) {
			
			match = false;
			
			if (tempWeather.length > 0){
				
				for (var j = 0; j < tempWeather.length; j++) {
					
					if(weather[i].main == tempWeather[j].main){
						tempWeather[j].counter = tempWeather[j].counter + 1;
						match = true;
						j = tempWeather.length;
					}
			
				}
			}
			else {
				tempWeather.push(weather[i]);
			}

			if (!match){
				tempWeather.push(weather[i]);
			}
		}
		
		var highestCountIndex = 0;
		var highestCount = 0;
		
		for (var k = 0; k < tempWeather.length; k++) {
			
			if (highestCount < tempWeather[k].counter){
					highestCountIndex = k;
					highestCount = tempWeather[k].counter;
			}
		}
		
		self.weatherDescription(tempWeather[highestCountIndex].weatherDescription());
		self.weatherIcon(tempWeather[highestCountIndex].weatherIcon());
		self.main((tempWeather[highestCountIndex].main)());
	}
}