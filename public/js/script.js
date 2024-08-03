
const errorF = document.getElementById('error')

const locationF = document.getElementById('location')

const forecast = document.getElementById('forecast')
const latitude = document.getElementById('latitude')

const longtitude = document.getElementById('longtitude')

const desc = document.getElementById('desc')
let form = document.getElementById("form1")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(document.getElementById("address").value)
    display("none")
    weatherFunction()
    form.reset()

})



let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            display("error")
            errorF.style.display = 'inline-block';
            errorF.innerText = "Error: " + data.error
        }
        else {
            display("display")
            errorF.style.display = 'none';
            locationF.innerText = "location: " + data.location
            forecast.innerText = "forecast: " + data.forecast
            latitude.innerText = "latitude: " + data.latitude

            longtitude.innerText = "longtitude: " + data.longtitude

        }
    }
    catch (e) {
        console.log(e)
    }
}

let display = (x) => {
    if (x === "error") {
        desc.style.display = 'none';

        errorF.style.display = 'inline-block';
        locationF.style.display = 'none';
        forecast.style.display = 'none';
        latitude.style.display = 'none';
        longtitude.style.display = 'none';

        locationF.innerText = '';
        forecast.innerText = '';
        latitude.innerText = '';
        longtitude.innerText = '';
    }
    else if (x === "display") {
        desc.style.display = 'none';

        locationF.style.display = 'inline-block';
        forecast.style.display = 'inline-block';
        latitude.style.display = 'inline-block';
        longtitude.style.display = 'inline-block';
        errorF.style.display = 'none';
        errorF.innerText = ''


    }
    else {
        locationF.style.display = 'none';
        forecast.style.display = 'none';
        latitude.style.display = 'none';
        longtitude.style.display = 'none';
        errorF.style.display = 'none';

    }
}
