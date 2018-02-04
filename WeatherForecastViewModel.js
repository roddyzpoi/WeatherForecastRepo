// ----------------------------------------------------------------- //
// WeatherForecastViewModel ViewModel
// ----------------------------------------------------------------- //
function WeatherForecastViewModel(options) {

    // ----------------------------------------------------------------- //
    // Make the self as 'this' reference
    // ----------------------------------------------------------------- //
    var self = this;

	// ----------------------------------------------------------------- //
    // Private variables
    // ----------------------------------------------------------------- //	
	var threeHourForecast = [];
	var tempDailyForecastList = [];
	
    // ----------------------------------------------------------------- //
    // Options parameters
    // ----------------------------------------------------------------- //
    options = options || {};

    // ----------------------------------------------------------------- //
    // ViewModels to manage
    // ----------------------------------------------------------------- //
	self.dailyForecastList = ko.observableArray([]);
	
	// ----------------------------------------------------------------- //
    // Public functions
    // ----------------------------------------------------------------- //
	self.Populate = function(data){
		
		for (var i = 0; i < data.list.length; i++) {
			PopulateThreeHourForecast(data.list[i]);
        }

		AggregateForecastToDaily(threeHourForecast);
		
		// Populate the forecast array
		for (var j = 0; j < 5; j++) {
			self.dailyForecastList.push(tempDailyForecastList[j]);
		}
	};
	
	// ----------------------------------------------------------------- //
    // Private functions
    // ----------------------------------------------------------------- //
	
	function PopulateThreeHourForecast(data){
		
		threeHourForecast.push(new ThreeHourForecastViewModel(data));
	};
	
	// Daily forecast should summarise the 3 hour data:
	function AggregateForecastToDaily(threeHourArray){
		
		for (var j = 0; j < 5; j++) {
			tempDailyForecastList.push(new DailyForecastViewModel());
		}
		
		var now = new Date();
		
		var selectedDate = new Date();
		
		selectedDate.setDate(selectedDate.getDate() + 1);
		
		var dayCounter = 0;
		
		// loop through 3 hour forecasts, ignore those with today's date, populate array of dailies (where dailies will hold each days forecast)
		for (var i = 0; i < threeHourForecast.length; i++) {
			
			// ignore today
			if (now.getDate() < moment.unix(threeHourForecast[i].dateTimeNum()).date()){
				
				if (selectedDate.getDate() == moment.unix(threeHourForecast[i].dateTimeNum()).date()){
					tempDailyForecastList[dayCounter].AddThreeHourForecast(threeHourForecast[i]);
				}
				else {
					tempDailyForecastList[dayCounter].dateTimeText(ReturnDay(selectedDate.getDay()) + ' ' + selectedDate.getDate());
					tempDailyForecastList[dayCounter].AggregateToDaily();
					
					var tempSelectedDate = selectedDate;
					selectedDate.setDate(tempSelectedDate.getDate() + 1);
					
					dayCounter++;
					
					tempDailyForecastList[dayCounter].AddThreeHourForecast(threeHourForecast[i]);
				}
			}			
		}
		
		tempDailyForecastList[4].dateTimeText(ReturnDay(selectedDate.getDay()) + ' ' + selectedDate.getDate());
		tempDailyForecastList[4].AggregateToDaily();
	}
	
	function ReturnDay(day) {
		if (day == 0){
			return 'Sun';
		}
		if (day == 1){
			return 'Mon';
		}
		if (day == 2){
			return 'Tues';
		}
		if (day == 3){
			return 'Wed';
		}
		if (day == 4){
			return 'Thur';
		}
		if (day == 5){
			return 'Fri';
		}
		if (day == 6){
			return 'Sat';
		}
	}
}