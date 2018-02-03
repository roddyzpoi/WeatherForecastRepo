// ----------------------------------------------------------------- //
// WeatherViewModel ViewModel
// ----------------------------------------------------------------- //
function WeatherViewModel(mainWeather, description, icon) {

    // ----------------------------------------------------------------- //
    // Make the self as 'this' reference
    // ----------------------------------------------------------------- //
    var self = this;
	
    // ----------------------------------------------------------------- //
    // Observables to manage
    // ----------------------------------------------------------------- //    
	self.main = ko.observable(mainWeather);
	self.weatherDescription = ko.observable(description);
	self.weatherIcon = ko.observable(icon);
	
	self.counter = ko.observable(1);
}