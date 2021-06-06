import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  // @Input('parentdata') public city;

  WeatherData : any;
  

  constructor() { }

  ngOnInit(): void {
    // this.getWeatherData();
    // console.log("hi");
    // console.log(this.WeatherData);
    this.WeatherData={
    main : {},
    isDay :true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  getWeatherData(){

    //  let data = JSON.parse('{"coord": { "lon": -122.08,"lat": 37.39},"weather": [{"id": 800,"main": "Clear","description": "clear sky", "icon": "01d"}],"base": "stations","main": {"temp": 282.55,"feels_like": 281.86,"temp_min": 280.37,"temp_max": 284.26,"pressure": 1023,"humidity": 100},"visibility": 16093,"wind": {"speed": 1.5,"deg": 350},"clouds": {"all": 1},"dt": 1560350645,"sys": {"type": 1,"id": 5122,"message": 0.0139,"country": "US","sunrise": 1560343627,"sunset": 1560396563},"timezone": -25200,"id": 420006353,"name": "Mountain View","cod": 200}');

    //  this.setWeatherData(data);
    fetch('http://api.openweathermap.org/data/2.5/weather?q=bhubaneswar&appid=e8164e5bc6fcec456821f377267580f6')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

  }
  setWeatherData(data){
    this.WeatherData=data;
    console.log(data);
    let sunsetTime= new Date(this.WeatherData.sys.sunset*1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime()< sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp -273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min -273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max -273.15).toFixed(0);
    this.WeatherData.temp_feels_like =(this.WeatherData.main.feels_like -273.15).toFixed(0);

    
  }

}
