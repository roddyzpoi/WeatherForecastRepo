// ----------------------------------------------------------------- //
// WeatherForecastViewModel ViewModel
// ----------------------------------------------------------------- //
function WeatherForecastViewModel(options) {

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

    
	self.testing = ko.observable();
	
	self.GetData = function(){
		$.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=Glasgow,uk&units=metric&appid=1b9a4cf6f5eecebb884e5b6e7144cb98',
            dataType: 'json',
            success: function (message) {  
                alert('done');
				self.testing('test');
				//var test = message;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('problem');
            },
        });
	};
	
}