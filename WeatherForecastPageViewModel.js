// ----------------------------------------------------------------- //
// WeatherForecastPageViewModel ViewModel
// ----------------------------------------------------------------- //
function WeatherForecastPageViewModel(options) {

    // ----------------------------------------------------------------- //
    // Make the self as 'this' reference
    // ----------------------------------------------------------------- //
    var self = this;

    // ----------------------------------------------------------------- //
    // Options parameters
    // ----------------------------------------------------------------- //
    options = options || {};

    // ----------------------------------------------------------------- //
    // ViewModels to manage
    // ----------------------------------------------------------------- //

	self.weatherForecast = new WeatherForecastViewModel();

    // ----------------------------------------------------------------- //
    // Observables to manage
    // ----------------------------------------------------------------- //    
	self.loading = ko.observable(true);
	self.error = ko.observable(false);
	
	// ----------------------------------------------------------------- //
    // Public functions
    // ----------------------------------------------------------------- //
	self.GetData = function(){
		$.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=Glasgow,uk&units=metric&appid=1b9a4cf6f5eecebb884e5b6e7144cb98',
            dataType: 'json',
            success: function (message) {  
				self.weatherForecast.Populate(message);
				self.loading(false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                self.loading(false);
				self.error(true);
            },
        });
	};
	
}



