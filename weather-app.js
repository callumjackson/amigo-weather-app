window.addEventListener('load', ()=> {
  let long;
  let lat;
  let tempDesc = document.querySelector('.temp-description');
  let tempDegree = document.querySelector('.temp-degree');
  let locChoice = document.querySelector('.location-choice');
  let degreeSection = document.querySelector('.degree-section');
  const tempSpan = document.querySelector('.degree-section span')

// this if command looks for the users coords once they have given permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/"; //proxy is used because of having to work thorugh a local host.
      const api = `${proxy}https://api.darksky.net/forecast/efe32efe404ba1b34b71bb4aa98b1a87/${lat},${long}`;

      fetch(api)
      .then(response =>{
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temperature, summary, icon} = data.currently //this reads the data from the API so that the website can use it

        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;
        locChoice.textContent = data.timezone;

        //forular to covert to celsius
        let celsius = (temperature - 32) * (5 / 9) //this is the formular that converts the temperatures


        // set icon to the current weather.
        setIcons(icon, document.querySelector('.icon'));


        //click able temperature that allows the user to switch between celsius and fahrenheit
        degreeSection.addEventListener('click', () =>{
          if (tempSpan.textContent === "F") {
            tempSpan.textContent = "C"
            tempDegree.textContent = Math.floor(celsius);
          }
          else {
            tempSpan.textContent = "F"
              tempDegree.textContent = temperature;
          }
        });


      });
    });
  }
   function setIcons(icon, iconID){
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // This removes the - in the skycon file and replaces it with _ as well as makes it everything uppercase to match the api
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
   }
});
