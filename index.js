const driverForm = document.querySelector(".driverForm");
const driverInput = document.querySelector(".driverInput");
const card = document.querySelector(".card")

/* Förarlista,
som nämnt i redovisningen, så hade det API:et jag använde inte poäng eller resultat, därav skrev jag det manuellt. 
Lade även in 3 olika medaljer för att göra det fräckare för pallplatserna */

const driversList = {
'Max Verstappen': { number: '1', session_key: '9158', points: 437, standings: "1st🥇" },
'Lewis Hamilton': { number: '44', session_key: '9158', points: 223, standings: 7},
'Logan Sargeant': { number: '2', session_key: '7763', points: 0, standings: 23},
'Valtteri Bottas': { number: '77', session_key: '7764', points: 0, standings: 22},
'Lando Norris': { number: '4', session_key: '7763', points: 374, standings: "2nd🥈"},
'Sergio Perez': { number: '11', session_key: '7763', points: 152, standings: 8},
'George Russell': { number: '63', session_key: '7763', points: 245, standings: 6},
'Charles Leclerc': { number: '16', session_key: '7763', points: 356, standings: "3rd🥉"},
'Carlos Sainz': { number: '55', session_key: '7763', points: 290, standings: 5},
'Fernando Alonso': { number: '14', session_key: '7763', points: 70, standings: 9},
'Esteban Ocon': { number: '31', session_key: '7763', points: 23, standings: 14},
'Oscar Piastri': { number: '81', session_key: '7763', points: 292, standings: 4},
'Yuki Tsunoda': { number: '22', session_key: '7763', points: 30, standings: 12},
'Pierre Gasly': { number: '10', session_key: '7763', points: 42, standings: 10},
'Kevin Magnussen': { number: '20', session_key: '7763', points: 16, standings: 15},
'Lance Stroll': { number: '18', session_key: '7765', points: 24, standings: 13},
'Nico Hulkenberg': { number: '27', session_key: '7763', points: 41, standings: 11},
'Alexander Albon': { number: '23', session_key: '7765', points: 12, standings: 16},
'Daniel Ricciardo': { number: '3', session_key: '9127', points: 12, standings: 17},
'Oliver Bearman': { number: '50', session_key: '9174', points: 7, standings: 18},
'Franco Colapinto': { number: '43', session_key: '9592', points: 5, standings: 19},
'Zhou Guanyu': { number: '24', session_key: '9175', points: 4, standings: 20},
'Liam Lawson': { number: '30', session_key: '9607', points: 4, standings: 21},
'Jack Doohan': { number: '61', session_key: '9174', points: 0, standings: 24},

}

/* Länder/flaggor,
Här ville jag ha en flaggemoji på "cardet" för att göra det lite coolare 😎 */

const driversCountryList = {

'NED': '🇳🇱',
'GBR': '🇬🇧',
'USA': '🇺🇸',
'FIN': '🇫🇮',
'MCO': '🇲🇨',
'MEX': '🇲🇽',
'ESP': '🇪🇸',
'FRA': '🇫🇷',
'ITA': '🇮🇹',
'AUS': '🇦🇺',
'JPN': '🇯🇵',
'DNK': '🇩🇰',
'GER': '🇩🇪',
'CAN': '🇨🇦',
'THA': '🇹🇭',
'ARG': '🇦🇷',
'MON': '🇲🇨',
'DEN': '🇩🇰',
'NZL': '🇳🇿'


};


driverForm.addEventListener("submit", async event => {

event.preventDefault(); // Motverkar sidan att refresha när man söker efter en förare

const driver = driverInput.value; // Tar emot input valuen från placeholdern

if(driver){
  try {
    const driverData = await getDriverData(driver);
    const driverInfo = driversList[driver];
    displayDriverInfo(driverData, driverInfo);
  }

  catch(error){
    console.log(error);
    displayError(error);
  }

}

else{
  displayError("Please enter driver")

}

});

async function getDriverData(driver){

  // Sample Url(Max Verstappen): https://api.openf1.org/v1/drivers?driver_number=1&session_key=9158

  const driverInfo = driversList[driver];
  const apiUrl = `https://api.openf1.org/v1/drivers?driver_number=${driverInfo.number}&session_key=${driverInfo.session_key}`;
  
  const response = await fetch(apiUrl); //Fetchar datan från API:et och fortsätter koden endast när denna är klar
  
  console.log(response);

  

if(!response.ok){
  throw new Error("No driver found");

}

const data = await response.json();
console.log("Driver Data:", data);
return data;

}

// Får "No driver found" som svar ifall man bara trycker enter eller search utan något innehåll/sträng

function displayDriverInfo(data, driverInfo){
  if (data.length === 0) {
    displayError("No driver found");
    return;
  }

  // Här är min input data:
  
  const [{full_name: full_name,
        driver_number: driver_number,
        team_name: team_name,
        country_code: driver_country}] = data;

        card.textContent = "";
        card.style.display = "flex";

        // Här skapar jag element och vad för typ av element, sedan vilken typ av Display.

        const pointsDisplay = document.createElement("p");
        const standingsDisplay = document.createElement("p");
        const driverDisplay = document.createElement("h1");
        const numberDisplay = document.createElement("p");
        const teamDisplay = document.createElement("p");
        const countryDisplay = document.createElement("p");
        const flagDisplay = document.createElement("p");

        // Här lägger jag till text som är kopplat till elementen ovan

        driverDisplay.textContent = full_name;
        numberDisplay.textContent = `#${driver_number}`;
        teamDisplay.textContent = team_name;
        countryDisplay.textContent = driver_country;
        flagDisplay.textContent = getCountryEmoji(driver_country);
        pointsDisplay.textContent = `Points: ${driverInfo.points}`;
        standingsDisplay.textContent = `Standings: ${driverInfo.standings}`;

        driverDisplay.textContent = full_name;

        driverDisplay.classList.add("driverDisplay");

        // Dessa appendChild gör att dom blir barnelement till div element som har klassen .card

        card.appendChild(driverDisplay);
        card.appendChild(numberDisplay);
        card.appendChild(teamDisplay);
        card.appendChild(countryDisplay);
        card.appendChild(flagDisplay);
        card.appendChild(pointsDisplay);
        card.appendChild(standingsDisplay);

}

function getCountryEmoji(driverId){
return driversCountryList[driverId] || driverId;
}

function displayError(message){

const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

// Koderna under tömmer innehållet i .card och gör att den visas, appendChild gör att errorDisplayen blir ett barnelement i <div class="card"></div>

card.textContent = "";
card.style.display = "flex";
card.appendChild(errorDisplay);

};



