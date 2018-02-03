// ----------------------------------------------------------------- //
// DailyForecastViewModel ViewModel
// ----------------------------------------------------------------- //
function DailyForecastViewModel(data) {

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
	self.dateTimeText = ko.observable();
	self.temperature = ko.observable();
	self.pressure = ko.observable();
	self.humidity = ko.observable();
	self.weatherDescription = ko.observable();
	self.weatherIcon = ko.observable();
	self.windSpeed = ko.observable();
	self.windDirection = ko.observable();
	
	// ----------------------------------------------------------------- //
    // Public functions
    // ----------------------------------------------------------------- //
	self.Populate = function(data){
		self.dateTimeText(data.dt_txt);
		self.temperature(data.main.temp);
		self.pressure(data.main.pressure);
		self.humidity(data.main.humidity);
		self.weatherDescription(data.weather[0].description);
		self.weatherIcon(data.weather[0].icon);
		self.windSpeed(data.wind.speed);
		self.windDirection(data.wind.deg);	
	};
	
		
	self.Populate(data);
}