window.addEventListener('load', ()=> {
  let long;
  let lat;
  let tempDesc = document.querySelector('.temp-description');
  let tempDegree = document.querySelector('.temp-degree');
  let locChoice = document.querySelector('.location-choice');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/"; //proxy is used because of having to work on a local host.
      const api = `${proxy}https://api.darksky.net/forecast/efe32efe404ba1b34b71bb4aa98b1a87/${lat},${long}`;

      fetch(api)
      .then(response =>{
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temperature, summary, icon} = data.currently

        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;
        locChoice.textContent = data.timezone;
      });
    });
  }
   function setIcons(icon, iconID){
     const skycons - new skycons({color: while});
     const currentIcon = 
   }
});
