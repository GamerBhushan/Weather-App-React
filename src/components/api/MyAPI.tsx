// import { body } from "framer-motion/client";

const geoCodeAPIKEY = import.meta.env.VITE_GEOCODE_API_KEY;

const addressToGeocodeAPI = "https://geocode.maps.co/search?q=[]&api_key="+geoCodeAPIKEY;

const geocodeToAddressAPI = "https://geocode.maps.co/reverse?lat=[]&lon={}&api_key="+geoCodeAPIKEY;

// Open Source API
const geocodeToWeatherAPI = "https://api.open-meteo.com/v1/forecast?latitude=[]&longitude={}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"


// latitude longitude
async function getLatitudeLongitudeByCity(address: string) {
    try {
        const req = addressToGeocodeAPI.replace("[]", `${address}`)

        // console.log(req);
        try {

            const response = await fetch(req); // Replace with your API URL
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                return ({ error: response.status });
            }
            const data = await response.json();
            const name = data[0].display_name;
            const lat = data[0].lat;
            const lon = data[0].lon;
            // console.log(`\nName : ${name}\nLatitude : ${lat}\nLongitude : ${lon}`);

            return ({ name: name, lat: lat, lon: lon });
        } catch (error) {
            return { error: error };
        }

    } catch (error) {
        console.log("Error fetching weather details:", error);
        return ({ error: error });
    }
}

export async function getAddressByLatitudeLongitude(latitude: any, longitude: any) {
    try {
        const temp = geocodeToAddressAPI.replace("[]", latitude);
        const req = temp.replace("{}", longitude);

        const response = await fetch(req); // Replace with your API URL
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            return ({ error: response.status });
        }
        const data = await response.json();
        return { data: data };
    } catch (error) {
        return ({ error: error });
    }
}


export async function getWeatherDetailsByLonLat(name : any,latitude: any, longitude: any) {

    try {

        const temp = geocodeToWeatherAPI.replace("[]", latitude);
        const req = temp.replace("{}", longitude);

        const response = await fetch(req); // Replace with your API URL
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            return ({ error: response.status });
        }
        const data = await response.json();

        return { name: name, data: data };


    } catch (error) {
        return { error: error };
    }


}



export async function getWeatherDetails(address: string) {

    try {
        const obj = await getLatitudeLongitudeByCity(address);
        if (obj.error) {
            // console.log(obj.error);
            return obj;
        } else {
            const temp = geocodeToWeatherAPI.replace("[]", obj.lat);
            const req = temp.replace("{}", obj.lon);

            const response = await fetch(req); // Replace with your API URL
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                return ({ error: response.status });
            }
            const data = await response.json();

            return { name: obj.name, data: data };

        }
    } catch (error) {
        return { error: error };
    }


}

