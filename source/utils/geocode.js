const request= require('request')

const geocode=(address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiamF5dnBhdGVsMTEyIiwiYSI6ImNraGYxMW9rbjA3YmcyeG53b3R1NWZmd2wifQ.Lmg3u4TNR6X6-Hwod_q8tQ&limit=1'
    request({url, json: true}, (error, {body} ) =>{ //request({url : url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect Location services',undefined)
        }else if(body.features.length === 0){ //}else if(response.body.features.length === 0){
            callback('Unable to Find Location Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1], //latitude: response.body.features[0].center[1],
                longitude: body.features[0].center[0], //longitude: response.body.features[0].center[0],
                location: body.features[0].place_name //location: response.body.features[0].place_name
            })
        }
    })
}

module.exports= geocode