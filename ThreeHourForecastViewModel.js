// ----------------------------------------------------------------- //
// ThreeHourForecastViewModel ViewModel
// ----------------------------------------------------------------- //
function ThreeHourForecastViewModel(data) {

    // ----------------------------------------------------------------- //
    // Make the self as 'this' reference
    // ----------------------------------------------------------------- //
    var self = this;

    // ----------------------------------------------------------------- //
    // ViewModels to manage
    // ----------------------------------------------------------------- //

    // ----------------------------------------------------------------- //
    // Observables to manage
    // ----------------------------------------------------------------- //    
	self.dateTimeNum = ko.observable();
	self.dateTimeText = ko.observable();
	self.temperatureMin = ko.observable();
	self.temperatureMax = ko.observable();
	self.pressure = ko.observable();
	self.humidity = ko.observable();
	self.weatherDescription = ko.observable();
	self.weatherIcon = ko.observable();
	self.windSpeed = ko.observable();
	self.windDirection = ko.observable();
	self.rain = ko.observable();
	self.main = ko.observable();
	
	// ----------------------------------------------------------------- //
    // Public functions
    // ----------------------------------------------------------------- //
	self.Populate = function(data){
		self.dateTimeNum(data.dt);
		self.dateTimeText(data.dt_txt);
		self.temperatureMin = ko.observable(data.main.temp_min);
		self.temperatureMax = ko.observable(data.main.temp_max);
		self.pressure(data.main.pressure);
		self.humidity(data.main.humidity);
		self.weatherDescription(data.weather[0].description);
		self.weatherIcon(data.weather[0].icon);
		self.windSpeed(data.wind.speed);
		self.windDirection(data.wind.deg);
		self.main(data.weather[0].main);
		
		if (data.rain != null){
			self.rain(1);
			//self.rain(data.rain.3h);
		}
		else{
			self.rain(0);
		}
		
	};
			
	self.Populate(data);
}