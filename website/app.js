/* Global Variables */
const zip = document.getElementById('zip');
const generate = document.getElementById('generate');
const dateToday = document.getElementById('dateToday')
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const city = document.getElementById('city');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

//web API info
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=fa9287112b4269db9e3a0d72932a61e1&units=imperial";
 
//make button clickable by generating event
generate.addEventListener("click", (generate) =>{
     generate.preventDefault();
     const madeURL = `${baseUrl}${zip.value}${apiKey}`;
     getdata(madeURL)
     .then((data) => {
        cureData(data)
        .then ((info)=>{
            postData("/add", info)
            .then((data)=>{
                retrieveData("/all") //get function
                .then((data)=>{
                    updateUI(info);
                });
            });
        });
     });
});

const getdata = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        if (data.cod != 200) {
            return data;
        
        }else{
            console.log(data);
            return data;
        };
        
    }catch (error) {
       console.log(error.message); 
    }
};

const cureData = async (data) =>{
    try{
        if(data.cod != 200){
            return data;
        }
        const info = {
            city: data.name,
            date: newDate,
            temp: Math.round(data.main.temp),                
            weather: data.weather[0].description,
        };
        return info;
    }catch(error){
        console.log(error);
    }
};

const postData = async (url="", data={}) =>{
    try {
        const result = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}; 

const retrieveData = async (url) =>{
    const result = await fetch(url);
    try {
        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        newFunction(error);
    }
};

const updateUI = async (info) =>{
    if (!info.message) {
        city.innerHTML = info.city;
        dateToday.innerHTML = info.date;
        temp.innerHTML = `${info.temp}&#176`;
        weather.innerHTML = info.weather;
        if(info.temp <32){
            document.querySelector("HTMLElement").setAttribute("")
        }

    }else{
        document.getElementById('error').innerHTML = response.message;
    }
};
function newFunction(error) {
    console.log(error);
};

