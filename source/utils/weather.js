const request= require('request')
const apikey= require('../../config')

const weather=(lat, log, callback) =>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ log +'&units=metric&APPID='+ apikey.configuration +'&lang=en'
    request({ url, json: true}, (error, {body}) => { //request({ url: url, json: true}, (error, response) => {
    if(error){
        callback('Unable to connect to weather API!', undefined)
    }else if(body.message){ //}else if(response.body.message){
        callback('Unable to find Location', undefined)
    }
    else{
     callback(undefined, body.weather[0].description + ' It is currently ' + body.main.temp + ' degree out. This high today is ' + body.main.temp_max + ' with a low of ' + body.main.temp_min)
     //callback(undefined, response.body.weather[0].description + ' It is currently ' + response.body.main.temp + ' degree out')
    }
})
}

module.exports= weather