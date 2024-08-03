const request=require("request")

const forecast = (latitude, longtitude, callback) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=928b9fb3045949ce92c202711241807&q=" + latitude + "," + longtitude


    request({ url: url, json: true }, (error, response) => {

        if (error) {
            // التانية هي الداتا تبعي          
            callback("Error", undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, "undefined")
        }
        else {

            callback(undefined, response.body.location.name + " it is "  + response.body.current.condition.text + " : "+response.body.current.temp_c +" C")
        }
    })

}



module.exports =forecast