
      // Function to handle spinner display
      function showSpinner() {
        spinner.style.display = 'block';
      }

      // Function to handle spinner hiding
      function hideSpinner() {
        spinner.style.display = 'none';
      }

      document.addEventListener("DOMContentLoaded", function() {
    var selectElement = document.getElementById("sectionSelect");
    var options = {
        "samePositionAndLeague": "vs League and Position, per 90",
        "samePositionAndLeagueWithMinutes": "vs League and Position",
        "position": "vs World and Position, per 90",
        "positionWithMinutes": "vs World and Position",
        "league": "vs League, per 90",
        "leagueWithMinutes": "vs League",
        "allCsv": "vs World, per 90",
        "allCsvWithMinutes": "vs World"
    };

    // Function to add options to the select element
    function addOption(key, value) {
        var option = document.createElement("option");
        option.value = key;
        option.text = value;
        selectElement.add(option);
    }

    // Populate the select element with options based on your criteria
    function populateOptions(usePer90) {
        selectElement.innerHTML = ""; // Clear existing options

        if (usePer90) {
            addOption("samePositionAndLeague", options["samePositionAndLeague"]);
            addOption("position", options["position"]);
            addOption("league", options["league"]);
            addOption("allCsv", options["allCsv"]);
        } else {
            addOption("samePositionAndLeagueWithMinutes", options["samePositionAndLeagueWithMinutes"]);
            addOption("positionWithMinutes", options["positionWithMinutes"]);
            addOption("leagueWithMinutes", options["leagueWithMinutes"]);
            addOption("allCsvWithMinutes", options["allCsvWithMinutes"]);
        }
    }

    populateOptions(true); // Initially populate with per 90 options

    // Keep track of the original selected value
    var originalSelectedValue = selectElement.value;

    // Toggle button functionality
    var toggleMetrics = document.getElementById("toggleMetrics");
    toggleMetrics.addEventListener("change", function() {
        // Show spinner
        showSpinner();

        // Get the current selected value
        var selectedValue = selectElement.value;

        // Update the original selected value
        originalSelectedValue = selectedValue;

        // Determine whether the selected metric should be per 90 or not based on the toggle state
        var usePer90 = toggleMetrics.checked;

        // Repopulate options based on toggle state
        populateOptions(usePer90);

        // Update the selected value to its equivalent based on the toggle state
        if (usePer90) {
            selectedValue = selectedValue.replace("WithMinutes", "");
        } else {
            if (!selectedValue.endsWith("WithMinutes")) {
                selectedValue += "WithMinutes";
            }
        }

        // Set the selected value
        selectElement.value = selectedValue;

        // Simulate long computation with setTimeout
        setTimeout(() => {
            // Hide spinner
            hideSpinner();
        }, 1000); // Adjust the timeout value as needed
    });
});

const metricColumnMap = {    'Accelerations': 'accelerations',
    'Cross accuracy %': 'accurateCrossesPercentage',
    'Pass completion (to final third) %': 'accuratePassesToFinalThirdPercentage',
    'Pass completion (to penalty box) %': 'accuratePassesToPenaltyAreaPercentage',
    'Aerial duels': 'aerialDuels',
    'Aerial duels won': 'aerialDuelsWonPerNinety',
    'Aerial duels won %': 'aerialDuelsWonPercentage',
    'Assists': 'assists',
    'Ball carrying frequency': 'ballCarryingFrequency',
    'Chance creation ratio': 'chanceCreationRatio',
    'Clean sheets': 'cleanSheets',
    'Accurate crosses': 'accurateCrossesPerNinety',
    'Crosses': 'crosses',
    'Crosses to box': 'crossesToGoalieBox',
    'Deep completions': 'deepCompletions',
    'Defensive duels': 'defDuels',
    'Defensive duels won': 'defensiveDuelsWonPerNinety',
    'Defensive duels won %': 'defensiveDuelsWonPercentage',
    'Dribble success rate %': 'successfulDribblesPercentage',
    'Dribbles attempted': 'dribbles',
    'Dribbles per 100 touches': 'dribblesPerHundredTouches',
    'Duels': 'duelsPerNinety',
    'Duels won': 'duelsWonPerNinety',
    'Duels won %': 'duelsWonPercentage',
    'Expected assists (xA)': 'xA',
    'Expected goals (xG)': 'xG',
    'Forward pass completion %': 'accurateForwardPassesPercentage',
    'Forward pass ratio': 'forwardPassRatio',
    'Forward passes': 'forwardPasses',
    'Forward passes completed': 'forwardPassesCompletedPerNinety',
    'Fouls suffered': 'foulsSuffered',
    'Goal conversion %': 'goalConversionPercentage',
    'Goals': 'goals',
    'Goals - xG': 'goalsMinusxGPerNinety',
    'Goals + assists': 'goalsAndAssistsPerNinety',
    'Goals conceded': 'goalsAgainstPerNinety',
    'Goals per 100 touches': 'goalsPer100Touches',
    'Headed goals': 'headGoals',
    'Interceptions': 'interceptions',
    'Interceptions (PAdj)': 'pAdjInterceptions',
    'Key passes': 'keyPasses',
    'Line exits': 'exits',
    'Long pass accuracy %': 'accurateLongPassesPercentage',
    'Long passes': 'longPasses',
    'Long passes completed': 'longPassesCompletedPerNinety',
    'Non-penalty goals': 'nonPenaltyGoals',
    'Non-penalty goals + assists': 'npGoalsAndAssistsPerNinety',
    'Non-penalty xG': 'npxGPerNinety',
    'npxG + xA': 'npxGAndxAPerNinety',
    'npxG/Shot': 'npxGPerShot',
    'Offensive duels': 'offensiveDuels',
    'Offensive duels won': 'offensiveDuelsWonPerNinety',
    'Offensive duels won %': 'offensiveDuelsWonPercentage',
    'Accurate passes to final third': 'accuratePassesToFinalThirdPerNinety',
    'Accurate passes to box': 'accuratePassesToPenaltyBoxPerNinety',
    'Pass completion %': 'accuratePassesPercentage',
    'Passes': 'passes',
    'Passes completed': 'passesCompletedPerNinety',
    'Passes to final third': 'passesToFinalThird',
    'Passes to penalty box': 'passesToPenaltyArea',
    'Possession +/-': 'possessionPlusMinus',
    'Possessions won': 'defActions',
    'Possessions won - lost': 'possessionsWonMinusLostPerNinety',
    'Pre-assists': 'preAssistsPerNinety',
    'Prevented goals (PSxG-GA)': 'preventedGoals',
    'Progressive action rate': 'progressiveActionRate',
    'Progressive actions': 'progressiveActionsPerNinety',
    'Progressive carries': 'progressiveRuns',
    'Progressive pass accuracy %': 'accurateProgressivePassesPercentage',
    'Progressive passes': 'progressivePasses',
    'Progressive passes (PAdj)': 'progressivePassesPAdj',
    'Progressive passes completed': 'progressivePassesCompletedPerNinety',
    'Save percentage %': 'saveRatePercentage',
    'Saves': 'savesPerNinety',
    'Short pass completion %': 'accurateShortMediumPassesPercentage',
    'Short passes': 'shortMediumPasses',
    'Short passes completed': 'shortPassesCompletedPerNinety',
    'Shot assists': 'shotAssists',
    'Shot frequency': 'shotFrequency',
    'Shots': 'shots',
    'Shots blocked': 'shotsBlocked',
    'Shots conceded': 'shotsAgainst',
    'Shots on target': 'shotsOnTargetPerNinety',
    'Shots on target %': 'shotsOnTargetPercentage',
    'Sliding tackles': 'slidingTackles',
    'Sliding tackles (PAdj)': 'pAdjSlidingTackles',
    'Successful attacking actions': 'successfulAttackingActions',
    'Successful dribbles': 'successfulDribblesPerNinety',
    'Through passes': 'throughPasses',
    'Through passes completed': 'throughPassesCompletedPerNinety',
    'Touches': 'touchesPerNinety',
    'Touches in box': 'touchesInBox',
    'xA per 100 passes': 'xAPer100Passes',
    'xG + xA': 'xGAndxAPerNinety',
    'xG conceded': 'xGAgainst',
    'xG per 100 touches': 'xGPer100Touches'

};

let pizzaChartInstance = null; // Variable to store the chart instance
function createPizzaChart(rankData, playerName) {
    const ctx = document.getElementById('pizzaChart').getContext('2d');

    // Destroy existing chart if it exists
    if (pizzaChartInstance) {
        pizzaChartInstance.destroy();
    }

    // Define the labels and the corresponding ranks
    const labels = Object.keys(rankData);
    const data = Object.values(rankData);

    // Color gradient function: interpolates between blue (low) and red (high)
    function getColor(value) {
        const r = Math.round(255 * value); 
        const g = Math.round(100 * (1- value));
        const b = Math.round(255 * (1 - value)); 
        return `rgba(${r}, ${g}, ${b}, 0.75)`;
    }


    // Generate colors based on data values
    const colors = data.map(value => getColor(value));

    // Create a new chart instance
  pizzaChartInstance = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors,
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: true,
                color: colors,
                align: 'end',
                anchor: 'end',
                offset: -5,
                padding: 0,
                font: {
                    size: 9,
                },
                formatter: (value) => (1 - value).toFixed(2),
            },
            beforeDraw: (chart) => {
                const { ctx, chartArea } = chart;
                const { top, right, bottom, left, width, height } = chartArea;
                const centerX = (left + right) / 2;
                const centerY = (top + bottom) / 2;
                const radius = Math.min(width, height) / 2;

                // Draw the outer circle
                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
                ctx.stroke();
                ctx.restore();
            }
        },
        scales: {
            r: {
                min: 0,
                max: 1.04,
                reverse: true,
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 2
                },
                ticks: {
                    beginAtZero: false,
                    display: false
                },
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                        size: 10,
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                    },
                    padding: 10,
                    callback: function(label) {
                        const fixedLength = 20;

                        if (label.length > fixedLength) {
                            return label.substring(0, fixedLength);
                        }

                        const totalPadding = fixedLength - label.length;
                        const paddingBefore = Math.floor(totalPadding / 2);
                        const paddingAfter = totalPadding - paddingBefore;

                        return ' '.repeat(paddingBefore) + label + ' '.repeat(paddingAfter);
                    }
                }
            }
        },
        interaction: {
            mode: null // Disables hover effect
        },
        hover: {
            mode: null // Ensures no hover mode is applied
        }
    },
    plugins: [ChartDataLabels]
});

}


function getCurrentMetricValue(parsedData, selectedPlayer, metric) {
    const columnName = metricColumnMap[metric]; // Get the corresponding column name

    const excludedColumns = [
        'pAdjSlidingTackles', 'pAdjInterceptions','cleanSheets',
        'defensiveDuelsWonPercentage', 'aerialDuelsWonPercentage', 'shotsOnTargetPercentage',
        'goalConversionPercentage', 'accurateCrossesPercentage', 'successfulDribblesPercentage',
        'offensiveDuelsWonPercentage', 'accuratePassesPercentage', 'accurateForwardPassesPercentage',
        'accurateShortMediumPassesPercentage', 'accurateLongPassesPercentage',
        'accuratePassesToFinalThirdPercentage', 'accuratePassesToPenaltyAreaPercentage', 'accurateProgressivePassesPercentage', 'saveRatePercentage',
        'xGPer100Touches', 'goalsPer100Touches', 'xAPer100Passes', 'chanceCreationRatio', 'npxGPerShot',
        'duelsWonPercentage', 'possessionPlusMinus', 'forwardPassRatio', 
        'progressiveActionRate', 'progressivePassesPAdj', 'shotFrequency', 'ballCarryingFrequency', 'dribblesPerHundredTouches'
      
      ];
      const decimalColumns = ['xG', 'xA', 'xGAgainst', 'preventedGoals', 'goalsMinusxGPerNinety', 'xGAndxAPerNinety', 'npxGPerNinety', 'npxGAndxAPerNinety'];
      

    // Find player data
    const playerData = parsedData.find(p => 
        p.player === selectedPlayer.player && 
        p.position === selectedPlayer.position && 
        p.league === selectedPlayer.league
    );

    let value = playerData[columnName];

    if (decimalColumns.includes(columnName)) {
        return (value * playerData['minutes'] / 90).toFixed(2);
    }
    else if (excludedColumns.includes(columnName)) {
        return playerData[columnName];
    }
    else {
    return Math.round(value * playerData['minutes'] / 90);}
}


function updateCurrentMetricValue(parsedData, selectedPlayer, metric) {
    const columnName = metricColumnMap[metric]; // Get the corresponding column name

    
    const playerData = parsedData.find(p => p.player === selectedPlayer.player && p.position === selectedPlayer.position && p.league === selectedPlayer.league);



    // Return the metric value without modification
    return playerData[columnName];
}

// Main script
let allData = [];
let worker = new Worker('xlsxWorker.js');

worker.postMessage({ urls: [
    'https://datamb.football/database/CURRENT/PRO2425/GK/GK.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/GK/GK.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/GK/GK.xlsx',
    'https://datamb.football/database/CURRENT/PRO2425/CB/CB.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/CB/CB.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/CB/CB.xlsx',
    'https://datamb.football/database/CURRENT/PRO2425/FB/FB.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/FB/FB.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/FB/FB.xlsx',
    'https://datamb.football/database/CURRENT/PRO2425/CM/CM.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/CM/CM.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/CM/CM.xlsx',
    'https://datamb.football/database/CURRENT/PRO2425/FW/FW.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/FW/FW.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/FW/FW.xlsx',
    'https://datamb.football/database/CURRENT/PRO2425/ST/ST.xlsx',
    'https://datamb.football/database/CURRENT/PRO2024/ST/ST.xlsx',
    'https://datamb.football/database/CURRENT/TOP72425/ST/ST.xlsx'
] });

worker.onmessage = function(event) {
    allData = event.data;
    document.getElementById('loadingContainer').style.display = 'none';

    // Add this at the top level of your code
    let parsedDataCache = null;



    const leagues = {

        "Liga Portugal": [
            "Porto", "Benfica", "Sporting CP", "Sporting Braga", "Vitória Guimarães", "Gil Vicente", "Farense", "Moreirense", "Nacional", "Arouca", "Estoril", "Rio Ave", "Santa Clara", "Boavista", "Casa Pia AC", "Famalicão", "Estrela Amadora", "AVS", "AVS ",
            ],
            
            "Ligue 1": [
            "PSG", "Lille", "Nice", "Lens", "Nantes", "Reims", "Olympique Lyonnais", "Monaco", "Olympique Marseille", "Brest", "Saint-Étienne", "Montpellier", "Angers SCO", "Le Havre", "Rennes", "Auxerre", "Strasbourg", "Toulouse", 
            ],
            
            "Premier League": [
            "Manchester City", "Tottenham Hotspur", "Arsenal", "Manchester United", "Aston Villa", "Liverpool", "Southampton", "Everton", "Chelsea", "Brighton", "Newcastle United", "Wolverhampton Wanderers", "Fulham", "Crystal Palace", "Brentford", "Bournemouth", "West Ham United", "Leicester City", "Nottingham Forest", "Ipswich Town", "Wolverhampton",
            ],
            
            "Bundesliga": [
            "Borussia Dortmund", "Stuttgart", "Wolfsburg", "Bayer Leverkusen", "Borussia M'gladbach", "Augsburg", "Union Berlin", "Eintracht Frankfurt", "Bayern München", "Hoffenheim", "Mainz 05", "Werder Bremen", "RB Leipzig", "St. Pauli", "Holstein Kiel", "Freiburg", "Heidenheim", "Bochum", "Borussia Mgladbach",
            ],
            
            "Eredivisie": [
            "PSV", "Feyenoord", "Sparta Rotterdam", "Twente", "Utrecht", "Groningen", "PEC Zwolle", "Almere City", "NAC Breda", "NEC", "Fortuna Sittard", "Go Ahead Eagles", "Heerenveen", "Willem II", "Heracles", "AZ", "RKC Waalwijk", "Ajax",
            ],
            
            "La Liga": [
            "Valencia", "Atlético Madrid", "Barcelona", "Real Madrid", "Real Sociedad", "Real Betis", "Osasuna", "Deportivo Alavés", "Getafe", "Athletic Bilbao", "Girona", "Mallorca", "Villarreal", "Real Valladolid", "Rayo Vallecano", "Leganés", "Sevilla", "Las Palmas", "Celta de Vigo", "Espanyol",
            ],
            
            "Serie A": [
            "Milan", "Juventus", "Atalanta", "Lazio", "Napoli", "Roma", "Monza", "Internazionale", "Lecce", "Torino", "Parma", "Udinese", "Genoa", "Hellas Verona", "Bologna", "Fiorentina", "Cagliari", "Venezia", "Como", "Empoli", 
            ],
            

        "Ecuador Serie A": [
  "Universidad", "Técnico Universitario", "Orense", "Mushuc Runa", 
  "Macará", "Libertad (ECU)", "LDU Quito", "Independiente del Valle", 
  "Imbabura", "Emelec", "El Nacional", "Deportivo Cuenca", 
  "Delfin", "Cumbayá", "Barcelona (ECU)", "Aucas", "Guayaquil City", "Gualaceo",
],

"Chile Primera": [
  "Ñublense", "Unión La Calera", "Unión Española", "Universidad de Chile", 
  "Universidad Católica", "Palestino", "O'Higgins", "Huachipato", 
  "Everton (CHI)", "Deportes Iquique", "Coquimbo Unido", "Copiapó", 
  "Colo Colo", "Cobresal", "Cobreloa", "Audax Italiano", "Curicó Unido", "Magallanes",
],

  
    
"Paraguay Primera": [
  "Tacuary", "Sportivo Trinidense", "Sportivo Luqueño", "Sportivo Ameliano", 
  "Sol de América", "Olimpia", "Nacional Asunción", "Libertad", 
  "Guaraní", "General Caballero JLM", "Cerro Porteño", "2 de Mayo", "Resistencia", "Guaireña",
],


"Colombia Primera A": [
  "Águilas Doradas", "Tolima", "Santa Fe", "Medellín", 
  "Patriotas Boyacá", "Once Caldas", "Millonarios", "La Equidad", 
  "Junior", "Jaguares de Córdoba", "Fortaleza (COL)", "Envigado", 
  "Deportivo Pereira", "Deportivo Pasto", "Deportivo Cali", "Boyacá Chicó", 
  "Atlético Nacional", "Atlético Bucaramanga", "América de Cali", "Alianza", "Atlético Huila", "Unión Magdalena",
],

 "Argentina Primera": [
"Argentinos Juniors", "Atlético Tucumán", "Banfield", "Barracas Central", "Belgrano",
"Boca Juniors", "Central Córdoba SdE", "Defensa y Justicia", "Deportivo Riestra", "Estudiantes",
"Gimnasia La Plata", "Godoy Cruz", "Huracán", "Independiente", "Independiente Rivadavia",
"Instituto", "Lanús", "Newell's Old Boys", "Platense", "Racing Club",
"River Plate", "Rosario Central", "San Lorenzo", "Sarmiento", "Talleres Córdoba",
"Tigre", "Unión Santa Fe", "Vélez Sarsfield", "Colón",
],



"Brazil Serie A": [
"Athletico Paranaense", "Atlético GO", "Atlético Mineiro", "Bahia", "Botafogo",
"Corinthians", "Criciúma", "Cruzeiro", "Cuiabá", "Flamengo",
"Fluminense", "Fortaleza", "Grêmio", "Internacional", "Juventude",
"Palmeiras", "Red Bull Bragantino", "São Paulo", "Vasco da Gama", "Vitória", "Santos", "América Mineiro", "Coritiba", "Goiás",
],


"Uruguay Primera": [
"Boston River", "Cerro", "Cerro Largo", "Danubio", "Defensor Sporting",
"Deportivo Maldonado", "Fénix", "Liverpool (URU)", "Miramar Misiones", "Nacional (URU)",
"Peñarol", "Progreso", "Racing", "Rampla Juniors", "River Plate (URU)", "Wanderers", "Plaza Colonia", "La Luz", "Torque",
],

"MLS": [
"Los Angeles FC", "Philadelphia Union", "SJ Earthquakes", "Orlando City", "Toronto",
"Minnesota United", "Colorado Rapids", "Chicago Fire", "St. Louis City", "St. Louis City ", "Charlotte FC",
"Dallas", "Vancouver Whitecaps", "Inter Miami", "Austin FC", "DC United",
"Los Angeles Galaxy", "New York RB", "Sporting KC", "Portland Timbers", "Nashville SC",
"Seattle Sounders", "CF Montréal", "Real Salt Lake", "New York City", "Houston Dynamo",
"Atlanta United", "New England", "Cincinnati", "Columbus Crew",
],

"K League 1": [
"Gangwon", "Seoul", "Pohang Steelers", "Suwon", "Gwangju",
"Jeju United", "Ulsan Hyundai", "Daejeon Citizen", "Jeonbuk Motors",
"Incheon United", "Daegu", "Gimcheon Sangmu",
],

  
    
            
          

"J1 League": [
"Albirex Niigata", "Avispa Fukuoka", "Cerezo Osaka", "Consadole Sapporo", "Gamba Osaka",
"Júbilo Iwata", "Kashima Antlers", "Kashiwa Reysol", "Kawasaki Frontale", "Kyoto Sanga",
"Machida Zelvia", "Nagoya Grampus", "Sagan Tosu", "Sanfrecce Hiroshima", "Shonan Bellmare",
"Tokyo", "Tokyo Verdy", "Urawa Reds", "Vissel Kobe", "Yokohama F. Marinos", "Suwon Bluewings", "Yokohama",
],


"Norway Eliteserien": [
"Bodø / Glimt", "Brann", "Fredrikstad", "HamKam", "Haugesund",
"KFUM", "Kristiansund", "Lillestrøm", "Molde", "Odds",
"Rosenborg", "Sandefjord", "Sarpsborg 08", "Strømsgodset", "Tromsø",
"Viking", "Vålerenga", "Aalesund", "Stabæk",
],


"Sweden Allsvenskan": [
"AIK", "Brommapojkarna", "Djurgården", "Elfsborg", "GAIS",
"Halmstad", "Hammarby", "Häcken", "IFK Göteborg", "IFK Norrköping",
"Kalmar", "Malmö FF", "Mjällby", "Sirius", "Värnamo",
"Västerås SK","Degerfors", "Varbergs",

],


"Greek Super League": [
"PAOK", "Panathinaikos", "Olympiacos Piraeus", "AEK Athens", "Panetolikos FC", "OFI", "Atromitos", "Aris", "Volos NFC", "Asteras Tripolis", "Panserraikos", "Lamia", "Levadiakos", "Athens Kallithea", "Ergotelis", "PAE Chania", "Diagoras Rodou", "AO Xanthi", "Ionikos", "Trikala", "Panachaiki", "Doxa Dramas", "Apollon Larisas", "Karaiskakis Artas", "Ierapetras",
   ],
   
"Ukrainian Premier League": [
"Shakhtar Donetsk", "Dynamo Kyiv", "Polissya", "Vorskla", "Rukh Lviv", "Kryvbas KR", "Zorya", "Veres", "Obolon", "Livyi Bereh", "LNZ Cherkasy", "Inhulets", "Karpaty", "Oleksandria", "Chornomorets", "Kolos Kovalivka", 
   ],

   "Poland Ekstraklasa": [
"Cracovia Kraków", "Pogoń Szczecin", "Lech Poznań", "Korona Kielce", "Legia Warszawa", "Śląsk Wrocław", "Zagłębie Lubin", "Jagiellonia Białystok", "Widzew Łódź", "Raków Częstochowa", "Piast Gliwice", "Puszcza Niepołomice", "Stal Mielec", "Lechia Gdańsk", "Katowice", "Motor Lublin", "Górnik Zabrze", "Radomiak Radom", 
   ],
   "Russian Premier League": [
"Lokomotiv Moskva", "Spartak Moskva", "Krylya Sovetov", "CSKA Moskva", "Zenit", "Krasnodar", "Orenburg", "Rubin Kazan'", "Dinamo Moskva", "Akhmat Grozny", "Nizhny Novgorod", "Fakel", "Akron Togliatti", "Dynamo Makhachkala", "Khimki", "Rostov", "Ural", "Baltika", "Sochi", 
   ],

   "Israel Ligat HaAl": [
"Hapoel Haifa", "Maccabi Petah Tikva", "Ironi Kiryat Shmona", "Beitar Jerusalem", "Hapoel Jerusalem", "Maccabi Tel Aviv", "Maccabi Bnei Raina", "Ashdod", "Maccabi Netanya", "Ironi Tiberias", "Hapoel Hadera", "Bnei Sakhnin", "Hapoel Be'er Sheva", "Maccabi Haifa", 
   ],

"Championship": [
"Burnley", "Leeds United", "Sunderland", "Preston North End", "Luton Town", "Stoke City", "Derby County", "Bristol City", "Coventry City", "Norwich City", "Queens Park Rangers", "Watford", "Middlesbrough", "Hull City", "Cardiff City", "West Bromwich Albion", "Blackburn Rovers", "Sheffield United", "Oxford United", "Plymouth Argyle", "Millwall", "Portsmouth", "Swansea City", "Sheffield Wednesday", 
],
"Süper Lig": [
"Fenerbahçe", "Trabzonspor", "Kayserispor", "İstanbul Başakşehir", "Rizespor", "Göztepe", "Eyüpspor", "Galatasaray", "Beşiktaş", "Bodrumspor", "Samsunspor", "Antalyaspor", "Konyaspor", "Kasımpaşa", "Gaziantep", "Hatayspor", "Sivasspor", "Alanyaspor", "Adana Demirspor",
],

"Segunda Division": [
"Almería", "Granada", "Sporting Gijón", "Racing Santander", "Cádiz", "Elche", "Real Oviedo", "Deportivo La Coruña", "Burgos", "Cartagena", "Eldense", "Real Zaragoza", "Eibar", "Castellón", "Racing Ferrol", "Málaga", "Levante", "Córdoba", "Huesca", "Tenerife", "Albacete", "Mirandés",
],

"Scotland Premiership": [
"Rangers", "Celtic", "Hibernian", "Hearts", "Aberdeen", "Kilmarnock", "Dundee United", "Ross County", "St. Mirren", "Dundee", "St. Johnstone", "Motherwell", 
],

"Belgium Pro League": [
"Cercle Brugge", "OH Leuven", "Union Saint-Gilloise", "Club Brugge", "Genk", "Gent", "Antwerp", "Kortrijk", "Beerschot-Wilrijk", "Standard Liège", "Sint-Truiden", "Dender", "Westerlo", "Mechelen", "Anderlecht", "Charleroi", 
],

"Swiss Super League": [
"Lugano", "Young Boys", "Yverdon Sport", "St. Gallen", "Grasshopper", "Lausanne Sport", "Sion", "Zürich", "Servette", "Winterthur", "Basel", "Luzern",
],

"Austrian Bundesliga": [
"Sturm Graz", "LASK", "Salzburg", "Rapid Wien", "Hartberg", "Wolfsberger AC", "Rheindorf Altach", "WSG Swarovski Tirol", "Austria Wien", "Grazer AK", "Blau-Weiß Linz", "Austria Klagenfurt", 
],

"Saudi Pro League": [
"Al Nassr", "Al Ittihad", "Al Hilal", "Al Ahli", "Al Qadisiyah", "Al Taawon", "Al Ettifaq", "Al Orubah", "Al Wehda", "Al Khaleej", "Al Shabab", "Al Fateh", "Al Kholood", "Al Riyadh", "Al Akhdoud", "Dhamk", "Al Raed", "Al Feiha", 
],

"LigaMX": [
"América", "Cruz Azul", "Santos Laguna", "Necaxa", "Pachuca", "Guadalajara", "Monterrey", "Toluca", "Atlas", "Club Tijuana", "Puebla", "Atlético de San Luis", "Juárez", "Tigres UANL", "Pumas UNAM", "Mazatlán", "Querétaro", "León", 
],

"Denmark Superliga": [
"Brøndby", "Viborg", "Nordsjælland", "København", "Midtjylland", "SønderjyskE", "AaB", "Silkeborg", "Randers", "Lyngby", "Vejle", "AGF",
],

"Czech Chance Liga": [
"Sparta Praha", "Viktoria Plzeň", "Hradec Králové", "Teplice", "Baník Ostrava", "Mladá Boleslav", "Slovan Liberec", "Pardubice", "Sigma Olomouc", "Dukla Praha", "České Budějovice", "Slovácko", "Karviná", "Bohemians 1905", "Jablonec", "Slavia Praha",
],

"Serbia SuperLiga": [
"Bačka Topola", "Partizan", "Spartak Subotica", "Radnički Niš", "Crvena Zvezda", "Napredak Kruševac", "OFK Beograd", "Vojvodina", "Novi Pazar", "Radnički Kragujevac", "Čukarički", "Tekstilac Odžaci", "Jedinstvo Ub", "Mladost Lučani", "Železničar Pancevo", "IMT Novi Beograd",
],

"Croatia HNL": [
"Hajduk Split", "Dinamo Zagreb", "Osijek", "Istra 1961", "Rijeka", "Varaždin", "Slaven Belupo", "Lokomotiva Zagreb", "Gorica", "Šibenik", 
],

"Bundesliga 2": [
"Köln", "Hertha BSC", "Fortuna Düsseldorf", "Kaiserslautern", "Darmstadt 98", "Magdeburg", "Hamburger SV", "Jahn Regensburg", "Paderborn", "Eintracht Braunschweig", "Greuther Fürth", "Hannover 96", "Nürnberg", "Karlsruher SC", "Schalke 04", "Ulm", "Preußen Münster", "Elversberg", 
],

"Serie B": [
"Pisa", "Palermo", "Cittadella", "Bari", "Catanzaro", "Modena", "Cremonese", "Frosinone", "Carrarese", "Sampdoria", "Salernitana", "Cosenza", "Juve Stabia", "Brescia", "Cesena", "Mantova", "Sassuolo", "Spezia", "Reggiana", "Südtirol",
],

"Ligue 2": [
"Lorient","Caen", "Paris", "Pau", "Guingamp", "Rodez", "Annecy", "Metz", "Red Star", "Dunkerque", "Grenoble", "Ajaccio", "Laval", "Amiens SC", "Troyes", "Bastia", "Martigues", "Clermont", "Rodez ",
],

   


};
function getTeamLeague(team) {
    for (const [league, teams] of Object.entries(leagues)) {
        if (teams.includes(team)) {
            return league;
        }
    }
    return "Unknown League";
}

const columnsToDelete = [16, 17, 18, 30, 31, 32, 33, 42, 43, 49, 50, 51, 52, 57, 58, 62, 63, 64, 71, 73, 76, 78, 82, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95, 102, 106, 108, 109, 110, 125, 127, 131, 132,133];

let filteredData = [];
allData.forEach(row => {
    if (row.length >= 3) {
        const team = row[1];
        const league = getTeamLeague(team);

        if (league !== "Unknown League") {
            row.splice(2, 0, league);
            const filteredRow = row.filter((_, index) => !columnsToDelete.includes(index));
            filteredData.push(filteredRow);
        }
    }
});

allData = filteredData;

let outputLines = [];
allData.forEach(row => {
    let rowString = row.join(",");
    outputLines.push(rowString);
});
const csvData = outputLines.join("\n");


	
  
function parseCSV(csv) {
    const rows = csv.split('\n').slice(1);
    return rows.map(row => {
      const [
        player,
        team,
        league,
        position,
        age,
        minutes,
        defActions,
        defDuels,
        defensiveDuelsWonPercentage,
        aerialDuels,
        aerialDuelsWonPercentage,
        slidingTackles,
        pAdjSlidingTackles,
        shotsBlocked,
        interceptions,
        pAdjInterceptions,
        successfulAttackingActions,
        goals,
        nonPenaltyGoals,
        xG,
        headGoals,
        shots,
        shotsOnTargetPercentage,
        goalConversionPercentage,
        assists,
        crosses,
        accurateCrossesPercentage,
        crossesToGoalieBox,
        dribbles,
        successfulDribblesPercentage,
        offensiveDuels,
        offensiveDuelsWonPercentage,
        touchesInBox,
        progressiveRuns,
        accelerations,
        foulsSuffered,
        passes,
        accuratePassesPercentage,
        forwardPasses,
        accurateForwardPassesPercentage,
        shortMediumPasses,
        accurateShortMediumPassesPercentage,
        longPasses,
        accurateLongPassesPercentage,
        xA,
        shotAssists,
        preAssistsPerNinety,
        keyPasses,
        passesToFinalThird,
        accuratePassesToFinalThirdPercentage,
        passesToPenaltyArea,
        accuratePassesToPenaltyAreaPercentage,
        throughPasses,
        deepCompletions,
        progressivePasses,
        accurateProgressivePassesPercentage,
        goalsAgainstPerNinety,
        shotsAgainst,
        cleanSheets,
        saveRatePercentage,
        xGAgainst,
        preventedGoals,
        exits,
        duelsPerNinety,
        duelsWonPercentage,
        possessionPlusMinus,
        forwardPassRatio,
        xAPer100Passes,
        chanceCreationRatio,
        goalsAndAssistsPerNinety,
        npGoalsAndAssistsPerNinety,
        xGAndxAPerNinety,
        goalsMinusxGPerNinety,
        successfulDribblesPerNinety,
        shotsOnTargetPerNinety,
        accurateCrossesPerNinety,
        offensiveDuelsWonPerNinety,
        defensiveDuelsWonPerNinety,
        aerialDuelsWonPerNinety,
        passesCompletedPerNinety,
        forwardPassesCompletedPerNinety,
        shortPassesCompletedPerNinety,
        longPassesCompletedPerNinety,
        accuratePassesToFinalThirdPerNinety,
        accuratePassesToPenaltyBoxPerNinety,
        throughPassesCompletedPerNinety,
        progressivePassesCompletedPerNinety,
        savesPerNinety,
        possessionsWonMinusLostPerNinety,
        progressiveActionsPerNinety,
        duelsWonPerNinety,
        npxGPerNinety,
        npxGPerShot,
        npxGAndxAPerNinety,
        touchesPerNinety,
        progressiveActionRate,
        progressivePassesPAdj,
        ballCarryingFrequency,
        xGPer100Touches,
        shotFrequency,
        dribblesPerHundredTouches,
        goalsPer100Touches
      ] = row.split(',');
  
  
      return {
        player: player.trim(),
        team: team.trim(),
        league: league.trim(),
        position: position.trim(),
        age: parseInt(age),
        minutes: parseInt(minutes),
        defActions: parseFloat(defActions),
        defDuels: parseFloat(defDuels),
        defensiveDuelsWonPercentage: parseFloat(defensiveDuelsWonPercentage),
        aerialDuels: parseFloat(aerialDuels),
        aerialDuelsWonPercentage: parseFloat(aerialDuelsWonPercentage),
        slidingTackles: parseFloat(slidingTackles),
        pAdjSlidingTackles: parseFloat(pAdjSlidingTackles),
        shotsBlocked: parseFloat(shotsBlocked),
        interceptions: parseFloat(interceptions),
        pAdjInterceptions: parseFloat(pAdjInterceptions),
        successfulAttackingActions: parseFloat(successfulAttackingActions),
        goals: parseFloat(goals),
        nonPenaltyGoals: parseFloat(nonPenaltyGoals),
        xG: parseFloat(xG),
        headGoals: parseFloat(headGoals),
        shots: parseFloat(shots),
        shotsOnTargetPercentage: parseFloat(shotsOnTargetPercentage),
        goalConversionPercentage: parseFloat(goalConversionPercentage),
        assists: parseFloat(assists),
        crosses: parseFloat(crosses),
        accurateCrossesPercentage: parseFloat(accurateCrossesPercentage),
        crossesToGoalieBox: parseFloat(crossesToGoalieBox),
        dribbles: parseFloat(dribbles),
        successfulDribblesPercentage: parseFloat(successfulDribblesPercentage),
        offensiveDuels: parseFloat(offensiveDuels),
        offensiveDuelsWonPercentage: parseFloat(offensiveDuelsWonPercentage),
        touchesInBox: parseFloat(touchesInBox),
        progressiveRuns: parseFloat(progressiveRuns),
        accelerations: parseFloat(accelerations),
        foulsSuffered: parseFloat(foulsSuffered),
        passes: parseFloat(passes),
        accuratePassesPercentage: parseFloat(accuratePassesPercentage),
        forwardPasses: parseFloat(forwardPasses),
        accurateForwardPassesPercentage: parseFloat(accurateForwardPassesPercentage),
        shortMediumPasses: parseFloat(shortMediumPasses),
        accurateShortMediumPassesPercentage: parseFloat(accurateShortMediumPassesPercentage),
        longPasses: parseFloat(longPasses),
        accurateLongPassesPercentage: parseFloat(accurateLongPassesPercentage),
        xA: parseFloat(xA),
        shotAssists: parseFloat(shotAssists),
        preAssistsPerNinety: parseFloat(preAssistsPerNinety),
        keyPasses: parseFloat(keyPasses),
        passesToFinalThird: parseFloat(passesToFinalThird),
        accuratePassesToFinalThirdPercentage: parseFloat(accuratePassesToFinalThirdPercentage),
        passesToPenaltyArea: parseFloat(passesToPenaltyArea),
        accuratePassesToPenaltyAreaPercentage: parseFloat(accuratePassesToPenaltyAreaPercentage),
        throughPasses: parseFloat(throughPasses),
        deepCompletions: parseFloat(deepCompletions),
        progressivePasses: parseFloat(progressivePasses),
        accurateProgressivePassesPercentage: parseFloat(accurateProgressivePassesPercentage),
        goalsAgainstPerNinety: parseFloat(goalsAgainstPerNinety),
        shotsAgainst: parseFloat(shotsAgainst),
        cleanSheets: parseFloat(cleanSheets),
        saveRatePercentage: parseFloat(saveRatePercentage),
        xGAgainst: parseFloat(xGAgainst),
        preventedGoals: parseFloat(preventedGoals),
        exits: parseFloat(exits),
        duelsPerNinety: parseFloat(duelsPerNinety),
        duelsWonPercentage: parseFloat(duelsWonPercentage),
        possessionPlusMinus: parseFloat(possessionPlusMinus),
        forwardPassRatio: parseFloat(forwardPassRatio),
        xAPer100Passes: parseFloat(xAPer100Passes),
        chanceCreationRatio: parseFloat(chanceCreationRatio),
        goalsAndAssistsPerNinety: parseFloat(goalsAndAssistsPerNinety),
        npGoalsAndAssistsPerNinety: parseFloat(npGoalsAndAssistsPerNinety),
        xGAndxAPerNinety: parseFloat(xGAndxAPerNinety),
        goalsMinusxGPerNinety: parseFloat(goalsMinusxGPerNinety),
        successfulDribblesPerNinety: parseFloat(successfulDribblesPerNinety),
        shotsOnTargetPerNinety: parseFloat(shotsOnTargetPerNinety),
        accurateCrossesPerNinety: parseFloat(accurateCrossesPerNinety),
        offensiveDuelsWonPerNinety: parseFloat(offensiveDuelsWonPerNinety),
        defensiveDuelsWonPerNinety: parseFloat(defensiveDuelsWonPerNinety),
        aerialDuelsWonPerNinety: parseFloat(aerialDuelsWonPerNinety),
        passesCompletedPerNinety: parseFloat(passesCompletedPerNinety),
        forwardPassesCompletedPerNinety: parseFloat(forwardPassesCompletedPerNinety),
        shortPassesCompletedPerNinety: parseFloat(shortPassesCompletedPerNinety),
        longPassesCompletedPerNinety: parseFloat(longPassesCompletedPerNinety),
        accuratePassesToFinalThirdPerNinety: parseFloat(accuratePassesToFinalThirdPerNinety),
        accuratePassesToPenaltyBoxPerNinety: parseFloat(accuratePassesToPenaltyBoxPerNinety),
        throughPassesCompletedPerNinety: parseFloat(throughPassesCompletedPerNinety),
        progressivePassesCompletedPerNinety: parseFloat(progressivePassesCompletedPerNinety),
        savesPerNinety: parseFloat(savesPerNinety),
        possessionsWonMinusLostPerNinety: parseFloat(possessionsWonMinusLostPerNinety),
        progressiveActionsPerNinety: parseFloat(progressiveActionsPerNinety),
        duelsWonPerNinety: parseFloat(duelsWonPerNinety),
        npxGPerNinety: parseFloat(npxGPerNinety),
        npxGPerShot: parseFloat(npxGPerShot),
        npxGAndxAPerNinety: parseFloat(npxGAndxAPerNinety),
        touchesPerNinety: parseFloat(touchesPerNinety),
        progressiveActionRate: parseFloat(progressiveActionRate),
        progressivePassesPAdj: parseFloat(progressivePassesPAdj),
        ballCarryingFrequency: parseFloat(ballCarryingFrequency),
        xGPer100Touches: parseFloat(xGPer100Touches),
        shotFrequency: parseFloat(shotFrequency),
        dribblesPerHundredTouches: parseFloat(dribblesPerHundredTouches),
        goalsPer100Touches: parseFloat(goalsPer100Touches)
      };
    });
  }

  
  function calculateRankForMetric(data, metric, filterFn, transformFn) {
    // Create arrays to track our data
    const validPlayers = [];
    const uniqueTracker = new Map();

    // Single pass through the data
    for (const player of data) {
        // Skip immediately if it doesn't match our filter
        if (filterFn && !filterFn(player)) {
            continue;
        }

        // Skip duplicates
        const key = `${player.player}-${player.team}`;
        if (uniqueTracker.has(key)) {
            continue;
        }

        // Only process players that passed our filter
        const processedPlayer = transformFn ? transformFn(player) : player;
        uniqueTracker.set(key, true);
        validPlayers.push(processedPlayer);
    }

    // Sort only the filtered players
    const sortedData = validPlayers.sort((a, b) => b[metric] - a[metric]);

    // Assign ranks
    let rank = 1;
    let prevValue = null;
    const playerRanks = [];

    for (let i = 0; i < sortedData.length; i++) {
        const player = sortedData[i];
        const currentValue = player[metric];

        if (currentValue === 0) {
            playerRanks.push({ player: player.player, team: player.team, rank: "N/A" });
            continue;
        }

        if (currentValue !== prevValue) {
            rank = i + 1;
            prevValue = currentValue;
        }

        playerRanks.push({ player: player.player, team: player.team, rank });
    }

    return playerRanks;
}



function getRankSuffix(rank) {
    // Check if rank is "N/A"
    if (rank === "N/A") {
        return ''; // Return empty string for "N/A"
    }

    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return 'th';
    }
    switch (lastDigit) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}


// Define a global variable to track sorting preference
let sortEnabled = true;





function displaySelectedPlayer() {
  document.getElementById('spinner').style.display = 'block';
  const playerSelect = document.getElementById('playerSelect');
  const selectedIndex = playerSelect.selectedIndex;
  const selectedPlayerName = playerSelect.options[selectedIndex].value;
  const selectedPlayerPosition = playerSelect.options[selectedIndex].textContent.split(', ')[1]; // Extract position
  const selectedPlayerTeam = playerSelect.options[selectedIndex].textContent.split(', ')[2]; // Extract position
  const selectedPlayer = {
    player: selectedPlayerName,
    team: selectedPlayerTeam,
    position: selectedPlayerPosition // Include position in the selectedPlayer object
  };
  displayPlayerRankings(selectedPlayer);
  document.getElementById('spinner').style.display = 'none';
    
}

function displayPlayerRankings(player) {
    // Parse data only once and cache it
    if (!parsedDataCache) {
        parsedDataCache = parseCSV(csvData);
    }
    const parsedData = parsedDataCache;
    
    const selectedPlayer = parsedData.find(p => p.player === player.player && p.position === player.position && p.team === player.team);
    
    // Apply ALL filters at once
    const selectedAge = parseInt(document.getElementById('ageSelect').value);
    const filteredData = parsedData.filter(p => {
        // Age filter
        if (selectedAge && p.age > selectedAge) return false;
        return true;
    });
    const toggleMetrics = document.getElementById('toggleMetrics').checked; // Check if toggle is toggled
    const getMetricValueFunction = toggleMetrics ? updateCurrentMetricValue : getCurrentMetricValue;


	
// Metric: defActions
const samePositionAndLeagueActions = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const positionRankActions = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position);
const positionRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const leagueRankActions = calculateRankForMetric(filteredData, 'defActions', p => p.league === selectedPlayer.league);
const leagueRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.league === selectedPlayer.league, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const allCsvRankActions = calculateRankForMetric(filteredData, 'defActions');
const allCsvRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => true, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));


// Metric: defDuels
const positionRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const positionRankDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position);
const samePositionAndLeagueDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const leagueRankDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.league === selectedPlayer.league);
const leagueRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.league === selectedPlayer.league, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const allCsvRankDuels = calculateRankForMetric(filteredData, 'defDuels');
const allCsvRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => true, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));

// Metric: aerialDuels 
const allCsvRankAerialDuels = calculateRankForMetric(filteredData, 'aerialDuels');
const leagueRankAerialDuels = calculateRankForMetric(filteredData, 'aerialDuels', p => p.league === selectedPlayer.league);
const allCsvRankAerialDuelsWithMinutes = calculateRankForMetric(filteredData, 'aerialDuels', p => true, p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const leagueRankAerialDuelsWithMinutes = calculateRankForMetric(filteredData, 'aerialDuels', p => p.league === selectedPlayer.league, p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const positionRankAerialDuels = calculateRankForMetric(filteredData, 'aerialDuels', p => p.position === selectedPlayer.position);
const positionRankAerialDuelsWithMinutes = calculateRankForMetric(filteredData, 'aerialDuels', p => p.position === selectedPlayer.position, p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const samePositionAndLeagueAerialDuels = calculateRankForMetric(filteredData, 'aerialDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAerialDuelsWithMinutes = calculateRankForMetric(filteredData, 'aerialDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));


// Metric: slidingTackles
const allCsvRankSlidingTackles = calculateRankForMetric(filteredData, 'slidingTackles');
const leagueRankSlidingTackles = calculateRankForMetric(filteredData, 'slidingTackles', p => p.league === selectedPlayer.league);
const allCsvRankSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'slidingTackles', p => true, p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const leagueRankSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'slidingTackles', p => p.league === selectedPlayer.league, p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const positionRankSlidingTackles = calculateRankForMetric(filteredData, 'slidingTackles', p => p.position === selectedPlayer.position);
const positionRankSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'slidingTackles', p => p.position === selectedPlayer.position, p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const samePositionAndLeagueSlidingTackles = calculateRankForMetric(filteredData, 'slidingTackles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'slidingTackles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));

// Metric: pAdjSlidingTackles
const allCsvRankPAdjSlidingTackles = calculateRankForMetric(filteredData, 'pAdjSlidingTackles');
const leagueRankPAdjSlidingTackles = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.league === selectedPlayer.league);
const allCsvRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'pAdjSlidingTackles');
const leagueRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.league === selectedPlayer.league);
const positionRankPAdjSlidingTackles = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.position === selectedPlayer.position);
const positionRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.position === selectedPlayer.position);
const samePositionAndLeaguePAdjSlidingTackles = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePAdjSlidingTacklesWithMinutes = calculateRankForMetric(filteredData, 'pAdjSlidingTackles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: shotsBlocked
const allCsvRankShotsBlocked = calculateRankForMetric(filteredData, 'shotsBlocked');
const leagueRankShotsBlocked = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.league === selectedPlayer.league);
const allCsvRankShotsBlockedWithMinutes = calculateRankForMetric(filteredData, 'shotsBlocked', p => true, p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const leagueRankShotsBlockedWithMinutes = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.league === selectedPlayer.league, p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const positionRankShotsBlocked = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.position === selectedPlayer.position);
const positionRankShotsBlockedWithMinutes = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.position === selectedPlayer.position, p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const samePositionAndLeagueShotsBlocked = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotsBlockedWithMinutes = calculateRankForMetric(filteredData, 'shotsBlocked', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));

// Metric: interceptions
const allCsvRankInterceptions = calculateRankForMetric(filteredData, 'interceptions');
const leagueRankInterceptions = calculateRankForMetric(filteredData, 'interceptions', p => p.league === selectedPlayer.league);
const allCsvRankInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'interceptions', p => true, p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const leagueRankInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'interceptions', p => p.league === selectedPlayer.league, p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const positionRankInterceptions = calculateRankForMetric(filteredData, 'interceptions', p => p.position === selectedPlayer.position);
const positionRankInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'interceptions', p => p.position === selectedPlayer.position, p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const samePositionAndLeagueInterceptions = calculateRankForMetric(filteredData, 'interceptions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'interceptions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));


// Metric: pAdjInterceptions
const allCsvRankPAdjInterceptions = calculateRankForMetric(filteredData, 'pAdjInterceptions');
const leagueRankPAdjInterceptions = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.league === selectedPlayer.league);
const allCsvRankPAdjInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'pAdjInterceptions');
const leagueRankPAdjInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.league === selectedPlayer.league);
const positionRankPAdjInterceptions = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.position === selectedPlayer.position);
const positionRankPAdjInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.position === selectedPlayer.position);
const samePositionAndLeaguePAdjInterceptions = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePAdjInterceptionsWithMinutes = calculateRankForMetric(filteredData, 'pAdjInterceptions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: successfulAttackingActions
const allCsvRankSuccessfulAttackingActions = calculateRankForMetric(filteredData, 'successfulAttackingActions');
const leagueRankSuccessfulAttackingActions = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.league === selectedPlayer.league);
const allCsvRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => true, p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const leagueRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.league === selectedPlayer.league, p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const positionRankSuccessfulAttackingActions = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.position === selectedPlayer.position);
const positionRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.position === selectedPlayer.position, p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulAttackingActions = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(filteredData, 'successfulAttackingActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));

// Metric: goals
const allCsvRankGoals = calculateRankForMetric(filteredData, 'goals');
const leagueRankGoals = calculateRankForMetric(filteredData, 'goals', p => p.league === selectedPlayer.league);
const allCsvRankGoalsWithMinutes = calculateRankForMetric(filteredData, 'goals', p => true, p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const leagueRankGoalsWithMinutes = calculateRankForMetric(filteredData, 'goals', p => p.league === selectedPlayer.league, p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const positionRankGoals = calculateRankForMetric(filteredData, 'goals', p => p.position === selectedPlayer.position);
const positionRankGoalsWithMinutes = calculateRankForMetric(filteredData, 'goals', p => p.position === selectedPlayer.position, p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const samePositionAndLeagueGoals = calculateRankForMetric(filteredData, 'goals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueGoalsWithMinutes = calculateRankForMetric(filteredData, 'goals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));

// Metric: nonPenaltyGoals
const allCsvRankNonPenaltyGoals = calculateRankForMetric(filteredData, 'nonPenaltyGoals');
const leagueRankNonPenaltyGoals = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.league === selectedPlayer.league);
const allCsvRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => true, p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const leagueRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.league === selectedPlayer.league, p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const positionRankNonPenaltyGoals = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.position === selectedPlayer.position);
const positionRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.position === selectedPlayer.position, p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const samePositionAndLeagueNonPenaltyGoals = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueNonPenaltyGoalsWithMinutes = calculateRankForMetric(filteredData, 'nonPenaltyGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));

// Metric: xG
const allCsvRankXG = calculateRankForMetric(filteredData, 'xG');
const leagueRankXG = calculateRankForMetric(filteredData, 'xG', p => p.league === selectedPlayer.league);
const allCsvRankXGWithMinutes = calculateRankForMetric(filteredData, 'xG', p => true, p => ({...p, xG: p.xG * p.minutes}));
const leagueRankXGWithMinutes = calculateRankForMetric(filteredData, 'xG', p => p.league === selectedPlayer.league, p => ({...p, xG: p.xG * p.minutes}));
const positionRankXG = calculateRankForMetric(filteredData, 'xG', p => p.position === selectedPlayer.position);
const positionRankXGWithMinutes = calculateRankForMetric(filteredData, 'xG', p => p.position === selectedPlayer.position, p => ({...p, xG: p.xG * p.minutes}));
const samePositionAndLeagueXG = calculateRankForMetric(filteredData, 'xG', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXGWithMinutes = calculateRankForMetric(filteredData, 'xG', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, xG: p.xG * p.minutes}));

// Metric: headGoals
const allCsvRankHeadGoals = calculateRankForMetric(filteredData, 'headGoals');
const leagueRankHeadGoals = calculateRankForMetric(filteredData, 'headGoals', p => p.league === selectedPlayer.league);
const allCsvRankHeadGoalsWithMinutes = calculateRankForMetric(filteredData, 'headGoals', p => true, p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const leagueRankHeadGoalsWithMinutes = calculateRankForMetric(filteredData, 'headGoals', p => p.league === selectedPlayer.league, p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const positionRankHeadGoals = calculateRankForMetric(filteredData, 'headGoals', p => p.position === selectedPlayer.position);
const positionRankHeadGoalsWithMinutes = calculateRankForMetric(filteredData, 'headGoals', p => p.position === selectedPlayer.position, p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const samePositionAndLeagueHeadGoals = calculateRankForMetric(filteredData, 'headGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueHeadGoalsWithMinutes = calculateRankForMetric(filteredData, 'headGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));

// Metric: shots
const allCsvRankShots = calculateRankForMetric(filteredData, 'shots');
const leagueRankShots = calculateRankForMetric(filteredData, 'shots', p => p.league === selectedPlayer.league);
const allCsvRankShotsWithMinutes = calculateRankForMetric(filteredData, 'shots', p => true, p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const leagueRankShotsWithMinutes = calculateRankForMetric(filteredData, 'shots', p => p.league === selectedPlayer.league, p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const positionRankShots = calculateRankForMetric(filteredData, 'shots', p => p.position === selectedPlayer.position);
const positionRankShotsWithMinutes = calculateRankForMetric(filteredData, 'shots', p => p.position === selectedPlayer.position, p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const samePositionAndLeagueShots = calculateRankForMetric(filteredData, 'shots', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotsWithMinutes = calculateRankForMetric(filteredData, 'shots', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));

// Metric: assists
const allCsvRankAssists = calculateRankForMetric(filteredData, 'assists');
const leagueRankAssists = calculateRankForMetric(filteredData, 'assists', p => p.league === selectedPlayer.league);
const allCsvRankAssistsWithMinutes = calculateRankForMetric(filteredData, 'assists', p => true, p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const leagueRankAssistsWithMinutes = calculateRankForMetric(filteredData, 'assists', p => p.league === selectedPlayer.league, p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const positionRankAssists = calculateRankForMetric(filteredData, 'assists', p => p.position === selectedPlayer.position);
const positionRankAssistsWithMinutes = calculateRankForMetric(filteredData, 'assists', p => p.position === selectedPlayer.position, p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const samePositionAndLeagueAssists = calculateRankForMetric(filteredData, 'assists', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAssistsWithMinutes = calculateRankForMetric(filteredData, 'assists', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));

// Metric: crosses
const allCsvRankCrosses = calculateRankForMetric(filteredData, 'crosses');
const leagueRankCrosses = calculateRankForMetric(filteredData, 'crosses', p => p.league === selectedPlayer.league);
const allCsvRankCrossesWithMinutes = calculateRankForMetric(filteredData, 'crosses', p => true, p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const leagueRankCrossesWithMinutes = calculateRankForMetric(filteredData, 'crosses', p => p.league === selectedPlayer.league, p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const positionRankCrosses = calculateRankForMetric(filteredData, 'crosses', p => p.position === selectedPlayer.position);
const positionRankCrossesWithMinutes = calculateRankForMetric(filteredData, 'crosses', p => p.position === selectedPlayer.position, p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const samePositionAndLeagueCrosses = calculateRankForMetric(filteredData, 'crosses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueCrossesWithMinutes = calculateRankForMetric(filteredData, 'crosses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));

// Metric: crossesToGoalieBox
const allCsvRankCrossesToGoalieBox = calculateRankForMetric(filteredData, 'crossesToGoalieBox');
const leagueRankCrossesToGoalieBox = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.league === selectedPlayer.league);
const allCsvRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => true, p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const leagueRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.league === selectedPlayer.league, p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const positionRankCrossesToGoalieBox = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.position === selectedPlayer.position);
const positionRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.position === selectedPlayer.position, p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const samePositionAndLeagueCrossesToGoalieBox = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueCrossesToGoalieBoxWithMinutes = calculateRankForMetric(filteredData, 'crossesToGoalieBox', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));

// Metric: dribbles
const allCsvRankDribbles = calculateRankForMetric(filteredData, 'dribbles');
const leagueRankDribbles = calculateRankForMetric(filteredData, 'dribbles', p => p.league === selectedPlayer.league);
const allCsvRankDribblesWithMinutes = calculateRankForMetric(filteredData, 'dribbles', p => true, p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const leagueRankDribblesWithMinutes = calculateRankForMetric(filteredData, 'dribbles', p => p.league === selectedPlayer.league, p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const positionRankDribbles = calculateRankForMetric(filteredData, 'dribbles', p => p.position === selectedPlayer.position);
const positionRankDribblesWithMinutes = calculateRankForMetric(filteredData, 'dribbles', p => p.position === selectedPlayer.position, p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const samePositionAndLeagueDribbles = calculateRankForMetric(filteredData, 'dribbles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDribblesWithMinutes = calculateRankForMetric(filteredData, 'dribbles', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));

// Metric: offensiveDuels
const allCsvRankOffensiveDuels = calculateRankForMetric(filteredData, 'offensiveDuels');
const leagueRankOffensiveDuels = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.league === selectedPlayer.league);
const allCsvRankOffensiveDuelsWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuels', p => true, p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const leagueRankOffensiveDuelsWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.league === selectedPlayer.league, p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const positionRankOffensiveDuels = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.position === selectedPlayer.position);
const positionRankOffensiveDuelsWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.position === selectedPlayer.position, p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const samePositionAndLeagueOffensiveDuels = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueOffensiveDuelsWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));

// Metric: touchesInBox
const allCsvRankTouchesInBox = calculateRankForMetric(filteredData, 'touchesInBox');
const leagueRankTouchesInBox = calculateRankForMetric(filteredData, 'touchesInBox', p => p.league === selectedPlayer.league);
const allCsvRankTouchesInBoxWithMinutes = calculateRankForMetric(filteredData, 'touchesInBox', p => true, p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const leagueRankTouchesInBoxWithMinutes = calculateRankForMetric(filteredData, 'touchesInBox', p => p.league === selectedPlayer.league, p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const positionRankTouchesInBox = calculateRankForMetric(filteredData, 'touchesInBox', p => p.position === selectedPlayer.position);
const positionRankTouchesInBoxWithMinutes = calculateRankForMetric(filteredData, 'touchesInBox', p => p.position === selectedPlayer.position, p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const samePositionAndLeagueTouchesInBox = calculateRankForMetric(filteredData, 'touchesInBox', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueTouchesInBoxWithMinutes = calculateRankForMetric(filteredData, 'touchesInBox', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));

// Metric: progressiveRuns
const allCsvRankProgressiveRuns = calculateRankForMetric(filteredData, 'progressiveRuns');
const leagueRankProgressiveRuns = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.league === selectedPlayer.league);
const allCsvRankProgressiveRunsWithMinutes = calculateRankForMetric(filteredData, 'progressiveRuns', p => true, p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const leagueRankProgressiveRunsWithMinutes = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.league === selectedPlayer.league, p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const positionRankProgressiveRuns = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.position === selectedPlayer.position);
const positionRankProgressiveRunsWithMinutes = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.position === selectedPlayer.position, p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const samePositionAndLeagueProgressiveRuns = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressiveRunsWithMinutes = calculateRankForMetric(filteredData, 'progressiveRuns', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));

// Metric: accelerations
const allCsvRankAccelerations = calculateRankForMetric(filteredData, 'accelerations');
const leagueRankAccelerations = calculateRankForMetric(filteredData, 'accelerations', p => p.league === selectedPlayer.league);
const allCsvRankAccelerationsWithMinutes = calculateRankForMetric(filteredData, 'accelerations', p => true, p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const leagueRankAccelerationsWithMinutes = calculateRankForMetric(filteredData, 'accelerations', p => p.league === selectedPlayer.league, p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const positionRankAccelerations = calculateRankForMetric(filteredData, 'accelerations', p => p.position === selectedPlayer.position);
const positionRankAccelerationsWithMinutes = calculateRankForMetric(filteredData, 'accelerations', p => p.position === selectedPlayer.position, p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const samePositionAndLeagueAccelerations = calculateRankForMetric(filteredData, 'accelerations', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccelerationsWithMinutes = calculateRankForMetric(filteredData, 'accelerations', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));

// Metric: foulsSuffered
const allCsvRankFoulsSuffered = calculateRankForMetric(filteredData, 'foulsSuffered');
const leagueRankFoulsSuffered = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.league === selectedPlayer.league);
const allCsvRankFoulsSufferedWithMinutes = calculateRankForMetric(filteredData, 'foulsSuffered', p => true, p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const leagueRankFoulsSufferedWithMinutes = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.league === selectedPlayer.league, p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const positionRankFoulsSuffered = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.position === selectedPlayer.position);
const positionRankFoulsSufferedWithMinutes = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.position === selectedPlayer.position, p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const samePositionAndLeagueFoulsSuffered = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueFoulsSufferedWithMinutes = calculateRankForMetric(filteredData, 'foulsSuffered', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));

// Metric: passes
const allCsvRankPasses = calculateRankForMetric(filteredData, 'passes');
const leagueRankPasses = calculateRankForMetric(filteredData, 'passes', p => p.league === selectedPlayer.league);
const allCsvRankPassesWithMinutes = calculateRankForMetric(filteredData, 'passes', p => true, p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const leagueRankPassesWithMinutes = calculateRankForMetric(filteredData, 'passes', p => p.league === selectedPlayer.league, p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const positionRankPasses = calculateRankForMetric(filteredData, 'passes', p => p.position === selectedPlayer.position);
const positionRankPassesWithMinutes = calculateRankForMetric(filteredData, 'passes', p => p.position === selectedPlayer.position, p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const samePositionAndLeaguePasses = calculateRankForMetric(filteredData, 'passes', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePassesWithMinutes = calculateRankForMetric(filteredData, 'passes', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));

// Metric: forwardPasses
const allCsvRankForwardPasses = calculateRankForMetric(filteredData, 'forwardPasses');
const leagueRankForwardPasses = calculateRankForMetric(filteredData, 'forwardPasses', p => p.league === selectedPlayer.league);
const allCsvRankForwardPassesWithMinutes = calculateRankForMetric(filteredData, 'forwardPasses', p => true, p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const leagueRankForwardPassesWithMinutes = calculateRankForMetric(filteredData, 'forwardPasses', p => p.league === selectedPlayer.league, p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const positionRankForwardPasses = calculateRankForMetric(filteredData, 'forwardPasses', p => p.position === selectedPlayer.position);
const positionRankForwardPassesWithMinutes = calculateRankForMetric(filteredData, 'forwardPasses', p => p.position === selectedPlayer.position, p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const samePositionAndLeagueForwardPasses = calculateRankForMetric(filteredData, 'forwardPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueForwardPassesWithMinutes = calculateRankForMetric(filteredData, 'forwardPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));

// Metric: shortMediumPasses
const allCsvRankShortMediumPasses = calculateRankForMetric(filteredData, 'shortMediumPasses');
const leagueRankShortMediumPasses = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.league === selectedPlayer.league);
const allCsvRankShortMediumPassesWithMinutes = calculateRankForMetric(filteredData, 'shortMediumPasses', p => true, p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const leagueRankShortMediumPassesWithMinutes = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.league === selectedPlayer.league, p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const positionRankShortMediumPasses = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.position === selectedPlayer.position);
const positionRankShortMediumPassesWithMinutes = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.position === selectedPlayer.position, p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const samePositionAndLeagueShortMediumPasses = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShortMediumPassesWithMinutes = calculateRankForMetric(filteredData, 'shortMediumPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));

// Metric: longPasses
const allCsvRankLongPasses = calculateRankForMetric(filteredData, 'longPasses');
const leagueRankLongPasses = calculateRankForMetric(filteredData, 'longPasses', p => p.league === selectedPlayer.league);
const allCsvRankLongPassesWithMinutes = calculateRankForMetric(filteredData, 'longPasses', p => true, p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const leagueRankLongPassesWithMinutes = calculateRankForMetric(filteredData, 'longPasses', p => p.league === selectedPlayer.league, p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const positionRankLongPasses = calculateRankForMetric(filteredData, 'longPasses', p => p.position === selectedPlayer.position);
const positionRankLongPassesWithMinutes = calculateRankForMetric(filteredData, 'longPasses', p => p.position === selectedPlayer.position, p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const samePositionAndLeagueLongPasses = calculateRankForMetric(filteredData, 'longPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueLongPassesWithMinutes = calculateRankForMetric(filteredData, 'longPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));


// Metric: xA (Expected Assists)
const allCsvRankXA = calculateRankForMetric(filteredData, 'xA');
const leagueRankXA = calculateRankForMetric(filteredData, 'xA', p => p.league === selectedPlayer.league);
const allCsvRankXAWithMinutes = calculateRankForMetric(filteredData, 'xA', p => true, p => ({...p, xA: p.xA * p.minutes}));
const leagueRankXAWithMinutes = calculateRankForMetric(filteredData, 'xA', p => p.league === selectedPlayer.league, p => ({...p, xA: p.xA * p.minutes}));
const positionRankXA = calculateRankForMetric(filteredData, 'xA', p => p.position === selectedPlayer.position);
const positionRankXAWithMinutes = calculateRankForMetric(filteredData, 'xA', p => p.position === selectedPlayer.position, p => ({...p, xA: p.xA * p.minutes}));
const samePositionAndLeagueXA = calculateRankForMetric(filteredData, 'xA', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXAWithMinutes = calculateRankForMetric(filteredData, 'xA', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, xA: p.xA * p.minutes}));

// Metric: shotAssists
const allCsvRankShotAssists = calculateRankForMetric(filteredData, 'shotAssists');
const leagueRankShotAssists = calculateRankForMetric(filteredData, 'shotAssists', p => p.league === selectedPlayer.league);
const allCsvRankShotAssistsWithMinutes = calculateRankForMetric(filteredData, 'shotAssists', p => true, p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const leagueRankShotAssistsWithMinutes = calculateRankForMetric(filteredData, 'shotAssists', p => p.league === selectedPlayer.league, p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const positionRankShotAssists = calculateRankForMetric(filteredData, 'shotAssists', p => p.position === selectedPlayer.position);
const positionRankShotAssistsWithMinutes = calculateRankForMetric(filteredData, 'shotAssists', p => p.position === selectedPlayer.position, p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const samePositionAndLeagueShotAssists = calculateRankForMetric(filteredData, 'shotAssists', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotAssistsWithMinutes = calculateRankForMetric(filteredData, 'shotAssists', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));

// Metric: keyPasses
const allCsvRankKeyPasses = calculateRankForMetric(filteredData, 'keyPasses');
const leagueRankKeyPasses = calculateRankForMetric(filteredData, 'keyPasses', p => p.league === selectedPlayer.league);
const allCsvRankKeyPassesWithMinutes = calculateRankForMetric(filteredData, 'keyPasses', p => true, p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const leagueRankKeyPassesWithMinutes = calculateRankForMetric(filteredData, 'keyPasses', p => p.league === selectedPlayer.league, p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const positionRankKeyPasses = calculateRankForMetric(filteredData, 'keyPasses', p => p.position === selectedPlayer.position);
const positionRankKeyPassesWithMinutes = calculateRankForMetric(filteredData, 'keyPasses', p => p.position === selectedPlayer.position, p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const samePositionAndLeagueKeyPasses = calculateRankForMetric(filteredData, 'keyPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueKeyPassesWithMinutes = calculateRankForMetric(filteredData, 'keyPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));

// Metric: passesToFinalThird
const allCsvRankPassesToFinalThird = calculateRankForMetric(filteredData, 'passesToFinalThird');
const leagueRankPassesToFinalThird = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.league === selectedPlayer.league);
const allCsvRankPassesToFinalThirdWithMinutes = calculateRankForMetric(filteredData, 'passesToFinalThird', p => true, p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const leagueRankPassesToFinalThirdWithMinutes = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.league === selectedPlayer.league, p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const positionRankPassesToFinalThird = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.position === selectedPlayer.position);
const positionRankPassesToFinalThirdWithMinutes = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.position === selectedPlayer.position, p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const samePositionAndLeaguePassesToFinalThird = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePassesToFinalThirdWithMinutes = calculateRankForMetric(filteredData, 'passesToFinalThird', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));

// Metric: passesToPenaltyArea
const allCsvRankPassesToPenaltyArea = calculateRankForMetric(filteredData, 'passesToPenaltyArea');
const leagueRankPassesToPenaltyArea = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.league === selectedPlayer.league);
const allCsvRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => true, p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const leagueRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.league === selectedPlayer.league, p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const positionRankPassesToPenaltyArea = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.position === selectedPlayer.position);
const positionRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.position === selectedPlayer.position, p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const samePositionAndLeaguePassesToPenaltyArea = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePassesToPenaltyAreaWithMinutes = calculateRankForMetric(filteredData, 'passesToPenaltyArea', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));

// Metric: throughPasses
const allCsvRankThroughPasses = calculateRankForMetric(filteredData, 'throughPasses');
const leagueRankThroughPasses = calculateRankForMetric(filteredData, 'throughPasses', p => p.league === selectedPlayer.league);
const allCsvRankThroughPassesWithMinutes = calculateRankForMetric(filteredData, 'throughPasses', p => true, p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const leagueRankThroughPassesWithMinutes = calculateRankForMetric(filteredData, 'throughPasses', p => p.league === selectedPlayer.league, p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const positionRankThroughPasses = calculateRankForMetric(filteredData, 'throughPasses', p => p.position === selectedPlayer.position);
const positionRankThroughPassesWithMinutes = calculateRankForMetric(filteredData, 'throughPasses', p => p.position === selectedPlayer.position, p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const samePositionAndLeagueThroughPasses = calculateRankForMetric(filteredData, 'throughPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueThroughPassesWithMinutes = calculateRankForMetric(filteredData, 'throughPasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));

// Metric: deepCompletions
const allCsvRankDeepCompletions = calculateRankForMetric(filteredData, 'deepCompletions');
const leagueRankDeepCompletions = calculateRankForMetric(filteredData, 'deepCompletions', p => p.league === selectedPlayer.league);
const allCsvRankDeepCompletionsWithMinutes = calculateRankForMetric(filteredData, 'deepCompletions', p => true, p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const leagueRankDeepCompletionsWithMinutes = calculateRankForMetric(filteredData, 'deepCompletions', p => p.league === selectedPlayer.league, p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const positionRankDeepCompletions = calculateRankForMetric(filteredData, 'deepCompletions', p => p.position === selectedPlayer.position);
const positionRankDeepCompletionsWithMinutes = calculateRankForMetric(filteredData, 'deepCompletions', p => p.position === selectedPlayer.position, p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const samePositionAndLeagueDeepCompletions = calculateRankForMetric(filteredData, 'deepCompletions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDeepCompletionsWithMinutes = calculateRankForMetric(filteredData, 'deepCompletions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));

// Metric: progressivePasses
const allCsvRankProgressivePasses = calculateRankForMetric(filteredData, 'progressivePasses');
const leagueRankProgressivePasses = calculateRankForMetric(filteredData, 'progressivePasses', p => p.league === selectedPlayer.league);
const allCsvRankProgressivePassesWithMinutes = calculateRankForMetric(filteredData, 'progressivePasses', p => true, p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const leagueRankProgressivePassesWithMinutes = calculateRankForMetric(filteredData, 'progressivePasses', p => p.league === selectedPlayer.league, p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const positionRankProgressivePasses = calculateRankForMetric(filteredData, 'progressivePasses', p => p.position === selectedPlayer.position);
const positionRankProgressivePassesWithMinutes = calculateRankForMetric(filteredData, 'progressivePasses', p => p.position === selectedPlayer.position, p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const samePositionAndLeagueProgressivePasses = calculateRankForMetric(filteredData, 'progressivePasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressivePassesWithMinutes = calculateRankForMetric(filteredData, 'progressivePasses', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));

// Metric: shotsAgainst
const allCsvRankShotsAgainst = calculateRankForMetric(filteredData, 'shotsAgainst');
const leagueRankShotsAgainst = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.league === selectedPlayer.league);
const allCsvRankShotsAgainstWithMinutes = calculateRankForMetric(filteredData, 'shotsAgainst', p => true, p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const leagueRankShotsAgainstWithMinutes = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.league === selectedPlayer.league, p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const positionRankShotsAgainst = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.position === selectedPlayer.position);
const positionRankShotsAgainstWithMinutes = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.position === selectedPlayer.position, p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const samePositionAndLeagueShotsAgainst = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotsAgainstWithMinutes = calculateRankForMetric(filteredData, 'shotsAgainst', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));

// Metric: cleanSheets
const allCsvRankCleanSheets = calculateRankForMetric(filteredData, 'cleanSheets');
const leagueRankCleanSheets = calculateRankForMetric(filteredData, 'cleanSheets', p => p.league === selectedPlayer.league);
const allCsvRankCleanSheetsWithMinutes = calculateRankForMetric(filteredData, 'cleanSheets');
const leagueRankCleanSheetsWithMinutes = calculateRankForMetric(filteredData, 'cleanSheets', p => p.league === selectedPlayer.league);
const positionRankCleanSheets = calculateRankForMetric(filteredData, 'cleanSheets', p => p.position === selectedPlayer.position);
const positionRankCleanSheetsWithMinutes = calculateRankForMetric(filteredData, 'cleanSheets', p => p.position === selectedPlayer.position);
const samePositionAndLeagueCleanSheets = calculateRankForMetric(filteredData, 'cleanSheets', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueCleanSheetsWithMinutes = calculateRankForMetric(filteredData, 'cleanSheets', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: xGAgainst
const allCsvRankXGAgainst = calculateRankForMetric(filteredData, 'xGAgainst');
const leagueRankXGAgainst = calculateRankForMetric(filteredData, 'xGAgainst', p => p.league === selectedPlayer.league);
const allCsvRankXGAgainstWithMinutes = calculateRankForMetric(filteredData, 'xGAgainst', p => true, p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const leagueRankXGAgainstWithMinutes = calculateRankForMetric(filteredData, 'xGAgainst', p => p.league === selectedPlayer.league, p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const positionRankXGAgainst = calculateRankForMetric(filteredData, 'xGAgainst', p => p.position === selectedPlayer.position);
const positionRankXGAgainstWithMinutes = calculateRankForMetric(filteredData, 'xGAgainst', p => p.position === selectedPlayer.position, p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const samePositionAndLeagueXGAgainst = calculateRankForMetric(filteredData, 'xGAgainst', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXGAgainstWithMinutes = calculateRankForMetric(filteredData, 'xGAgainst', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));

// Metric: preventedGoals
const allCsvRankPreventedGoals = calculateRankForMetric(filteredData, 'preventedGoals');
const leagueRankPreventedGoals = calculateRankForMetric(filteredData, 'preventedGoals', p => p.league === selectedPlayer.league);
const allCsvRankPreventedGoalsWithMinutes = calculateRankForMetric(filteredData, 'preventedGoals', p => true, p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const leagueRankPreventedGoalsWithMinutes = calculateRankForMetric(filteredData, 'preventedGoals', p => p.league === selectedPlayer.league, p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const positionRankPreventedGoals = calculateRankForMetric(filteredData, 'preventedGoals', p => p.position === selectedPlayer.position);
const positionRankPreventedGoalsWithMinutes = calculateRankForMetric(filteredData, 'preventedGoals', p => p.position === selectedPlayer.position, p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const samePositionAndLeaguePreventedGoals = calculateRankForMetric(filteredData, 'preventedGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePreventedGoalsWithMinutes = calculateRankForMetric(filteredData, 'preventedGoals', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));

// Metric: exits
const allCsvRankExits = calculateRankForMetric(filteredData, 'exits');
const leagueRankExits = calculateRankForMetric(filteredData, 'exits', p => p.league === selectedPlayer.league);
const allCsvRankExitsWithMinutes = calculateRankForMetric(filteredData, 'exits', p => true, p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const leagueRankExitsWithMinutes = calculateRankForMetric(filteredData, 'exits', p => p.league === selectedPlayer.league, p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const positionRankExits = calculateRankForMetric(filteredData, 'exits', p => p.position === selectedPlayer.position);
const positionRankExitsWithMinutes = calculateRankForMetric(filteredData, 'exits', p => p.position === selectedPlayer.position, p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const samePositionAndLeagueExits = calculateRankForMetric(filteredData, 'exits', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueExitsWithMinutes = calculateRankForMetric(filteredData, 'exits', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));

// Metric: defensiveDuelsWonPercentage
const allCsvRankDefensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage');
const leagueRankDefensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.league === selectedPlayer.league);
const allCsvRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage');
const leagueRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankDefensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.position === selectedPlayer.position);
const positionRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueDefensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: aerialDuelsWonPercentage
const allCsvRankAerialDuelsWonPercentage = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage');
const leagueRankAerialDuelsWonPercentage = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage');
const leagueRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAerialDuelsWonPercentage = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.position === selectedPlayer.position);
const positionRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAerialDuelsWonPercentage = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: shotsOnTargetPercentage
const allCsvRankShotsOnTargetPercentage = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage');
const leagueRankShotsOnTargetPercentage = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.league === selectedPlayer.league);
const allCsvRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage');
const leagueRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankShotsOnTargetPercentage = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.position === selectedPlayer.position);
const positionRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueShotsOnTargetPercentage = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotsOnTargetPercentageWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: goalConversionPercentage
const allCsvRankGoalConversionPercentage = calculateRankForMetric(filteredData, 'goalConversionPercentage');
const leagueRankGoalConversionPercentage = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.league === selectedPlayer.league);
const allCsvRankGoalConversionPercentageWithMinutes = calculateRankForMetric(filteredData, 'goalConversionPercentage');
const leagueRankGoalConversionPercentageWithMinutes = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankGoalConversionPercentage = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.position === selectedPlayer.position);
const positionRankGoalConversionPercentageWithMinutes = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueGoalConversionPercentage = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueGoalConversionPercentageWithMinutes = calculateRankForMetric(filteredData, 'goalConversionPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accurateCrossesPercentage
const allCsvRankAccurateCrossesPercentage = calculateRankForMetric(filteredData, 'accurateCrossesPercentage');
const leagueRankAccurateCrossesPercentage = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPercentage');
const leagueRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccurateCrossesPercentage = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccurateCrossesPercentage = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateCrossesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: successfulDribblesPercentage
const allCsvRankSuccessfulDribblesPercentage = calculateRankForMetric(filteredData, 'successfulDribblesPercentage');
const leagueRankSuccessfulDribblesPercentage = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPercentage');
const leagueRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankSuccessfulDribblesPercentage = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.position === selectedPlayer.position);
const positionRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueSuccessfulDribblesPercentage = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: offensiveDuelsWonPercentage
const allCsvRankOffensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage');
const leagueRankOffensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.league === selectedPlayer.league);
const allCsvRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage');
const leagueRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankOffensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.position === selectedPlayer.position);
const positionRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueOffensiveDuelsWonPercentage = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accuratePassesPercentage
const allCsvRankAccuratePassesPercentage = calculateRankForMetric(filteredData, 'accuratePassesPercentage');
const leagueRankAccuratePassesPercentage = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesPercentage');
const leagueRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccuratePassesPercentage = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccuratePassesPercentage = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccuratePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accurateForwardPassesPercentage
const allCsvRankAccurateForwardPassesPercentage = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage');
const leagueRankAccurateForwardPassesPercentage = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage');
const leagueRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccurateForwardPassesPercentage = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccurateForwardPassesPercentage = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateForwardPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accurateShortMediumPassesPercentage
const allCsvRankAccurateShortMediumPassesPercentage = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage');
const leagueRankAccurateShortMediumPassesPercentage = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage');
const leagueRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccurateShortMediumPassesPercentage = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccurateShortMediumPassesPercentage = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateShortMediumPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accurateLongPassesPercentage
const allCsvRankAccurateLongPassesPercentage = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage');
const leagueRankAccurateLongPassesPercentage = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage');
const leagueRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccurateLongPassesPercentage = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccurateLongPassesPercentage = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateLongPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accuratePassesToFinalThirdPercentage
const allCsvRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage');
const leagueRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage');
const leagueRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.position === selectedPlayer.position);
const positionRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccuratePassesToFinalThirdPercentage = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accuratePassesToPenaltyAreaPercentage
const allCsvRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage');
const leagueRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage');
const leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.position === selectedPlayer.position);
const positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToPenaltyAreaPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: accurateProgressivePassesPercentage
const allCsvRankAccurateProgressivePassesPercentage = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage');
const leagueRankAccurateProgressivePassesPercentage = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.league === selectedPlayer.league);
const allCsvRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage');
const leagueRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankAccurateProgressivePassesPercentage = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.position === selectedPlayer.position);
const positionRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueAccurateProgressivePassesPercentage = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateProgressivePassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// Metric: saveRatePercentage
const allCsvRankSaveRatePercentage = calculateRankForMetric(filteredData, 'saveRatePercentage');
const leagueRankSaveRatePercentage = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.league === selectedPlayer.league);
const allCsvRankSaveRatePercentageWithMinutes = calculateRankForMetric(filteredData, 'saveRatePercentage');
const leagueRankSaveRatePercentageWithMinutes = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.league === selectedPlayer.league, p => ({...p}));
const positionRankSaveRatePercentage = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.position === selectedPlayer.position);
const positionRankSaveRatePercentageWithMinutes = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.position === selectedPlayer.position, p => ({...p}));
const samePositionAndLeagueSaveRatePercentage = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSaveRatePercentageWithMinutes = calculateRankForMetric(filteredData, 'saveRatePercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

// NEW METRICS

// Metric: preAssistsPerNinety
const allCsvRankPreAssistsPerNinety = calculateRankForMetric(filteredData, 'preAssistsPerNinety');
const leagueRankPreAssistsPerNinety = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => true, p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const leagueRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.league === selectedPlayer.league, p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const positionRankPreAssistsPerNinety = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.position === selectedPlayer.position);
const positionRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.position === selectedPlayer.position, p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePreAssistsPerNinety = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePreAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'preAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));


// Metric: duelsPerNinety
const allCsvRankDuelsPerNinety = calculateRankForMetric(filteredData, 'duelsPerNinety');
const leagueRankDuelsPerNinety = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankDuelsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsPerNinety', p => true, p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const leagueRankDuelsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.league === selectedPlayer.league, p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const positionRankDuelsPerNinety = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.position === selectedPlayer.position);
const positionRankDuelsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.position === selectedPlayer.position, p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDuelsPerNinety = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDuelsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));

// Metric: goalsAndAssistsPerNinety
const allCsvRankGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety');
const leagueRankGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => true, p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.league === selectedPlayer.league, p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.position === selectedPlayer.position);
const positionRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.position === selectedPlayer.position, p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsAndAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));

// Metric: npGoalsAndAssistsPerNinety
const allCsvRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety');
const leagueRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => true, p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.league === selectedPlayer.league, p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.position === selectedPlayer.position);
const positionRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.position === selectedPlayer.position, p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueNpGoalsAndAssistsPerNinety = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npGoalsAndAssistsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));

// Metric: successfulDribblesPerNinety
const allCsvRankSuccessfulDribblesPerNinety = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety');
const leagueRankSuccessfulDribblesPerNinety = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => true, p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const leagueRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.league === selectedPlayer.league, p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const positionRankSuccessfulDribblesPerNinety = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.position === selectedPlayer.position);
const positionRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.position === selectedPlayer.position, p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulDribblesPerNinety = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'successfulDribblesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));

// Metric: shotsOnTargetPerNinety
const allCsvRankShotsOnTargetPerNinety = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety');
const leagueRankShotsOnTargetPerNinety = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => true, p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const leagueRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.league === selectedPlayer.league, p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const positionRankShotsOnTargetPerNinety = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.position === selectedPlayer.position);
const positionRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.position === selectedPlayer.position, p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShotsOnTargetPerNinety = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shotsOnTargetPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));


// Metric: accurateCrossesPerNinety
const allCsvRankAccurateCrossesPerNinety = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety');
const leagueRankAccurateCrossesPerNinety = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => true, p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const leagueRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.league === selectedPlayer.league, p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const positionRankAccurateCrossesPerNinety = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.position === selectedPlayer.position);
const positionRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.position === selectedPlayer.position, p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccurateCrossesPerNinety = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accurateCrossesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));



// Metric: offensiveDuelsWonPerNinety
const allCsvRankOffensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety');
const leagueRankOffensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => true, p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.league === selectedPlayer.league, p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankOffensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position);
const positionRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position, p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueOffensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'offensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));


// Metric: defensiveDuelsWonPerNinety
const allCsvRankDefensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety');
const leagueRankDefensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => true, p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.league === selectedPlayer.league, p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankDefensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position);
const positionRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position, p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDefensiveDuelsWonPerNinety = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'defensiveDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));


// Metric: aerialDuelsWonPerNinety
const allCsvRankAerialDuelsWonPerNinety = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety');
const leagueRankAerialDuelsWonPerNinety = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => true, p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.league === selectedPlayer.league, p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const positionRankAerialDuelsWonPerNinety = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.position === selectedPlayer.position);
const positionRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.position === selectedPlayer.position, p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAerialDuelsWonPerNinety = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'aerialDuelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));


// Metric: touchesPerNinety
const allCsvRankTouchesPerNinety = calculateRankForMetric(filteredData, 'touchesPerNinety');
const leagueRankTouchesPerNinety = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankTouchesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'touchesPerNinety', p => true, p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const leagueRankTouchesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.league === selectedPlayer.league, p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const positionRankTouchesPerNinety = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.position === selectedPlayer.position);
const positionRankTouchesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.position === selectedPlayer.position, p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueTouchesPerNinety = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueTouchesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'touchesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));

// Metric: passesCompletedPerNinety
const allCsvRankPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'passesCompletedPerNinety');
const leagueRankPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => true, p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const leagueRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const positionRankPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePassesCompletedPerNinety = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'passesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));

// Metric: forwardPassesCompletedPerNinety
const allCsvRankForwardPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety');
const leagueRankForwardPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => true, p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankForwardPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueForwardPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'forwardPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));

// Metric: shortPassesCompletedPerNinety
const allCsvRankShortPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety');
const leagueRankShortPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => true, p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankShortPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShortPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'shortPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));

// Metric: longPassesCompletedPerNinety
const allCsvRankLongPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety');
const leagueRankLongPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => true, p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankLongPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueLongPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'longPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));

// Metric: accuratePassesToFinalThirdPerNinety
const allCsvRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety');
const leagueRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => true, p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const leagueRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.league === selectedPlayer.league, p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const positionRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.position === selectedPlayer.position);
const positionRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.position === selectedPlayer.position, p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'accuratePassesToFinalThirdPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));


// Metric: throughPassesCompletedPerNinety
const allCsvRankThroughPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety');
const leagueRankThroughPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => true, p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankThroughPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueThroughPassesCompletedPerNinety = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'throughPassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));



// Metric: progressivePassesCompletedPerNinety
const allCsvRankProgressivePassesCompletedPerNinety = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety');
const leagueRankProgressivePassesCompletedPerNinety = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => true, p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.league === selectedPlayer.league, p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const positionRankProgressivePassesCompletedPerNinety = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.position === selectedPlayer.position);
const positionRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.position === selectedPlayer.position, p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressivePassesCompletedPerNinety = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesCompletedPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));




// Metric: savesPerNinety
const allCsvRankSavesPerNinety = calculateRankForMetric(filteredData, 'savesPerNinety');
const leagueRankSavesPerNinety = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankSavesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'savesPerNinety', p => true, p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const leagueRankSavesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.league === selectedPlayer.league, p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const positionRankSavesPerNinety = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.position === selectedPlayer.position);
const positionRankSavesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.position === selectedPlayer.position, p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueSavesPerNinety = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueSavesPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'savesPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));

// Metric: possessionsWonMinusLostPerNinety
const allCsvRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety');
const leagueRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => true, p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const leagueRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.league === selectedPlayer.league, p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const positionRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.position === selectedPlayer.position);
const positionRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.position === selectedPlayer.position, p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePossessionsWonMinusLostPerNinety = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'possessionsWonMinusLostPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));

// Metric: duelsWonPerNinety
const allCsvRankDuelsWonPerNinety = calculateRankForMetric(filteredData, 'duelsWonPerNinety');
const leagueRankDuelsWonPerNinety = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => true, p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const leagueRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.league === selectedPlayer.league, p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const positionRankDuelsWonPerNinety = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.position === selectedPlayer.position);
const positionRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.position === selectedPlayer.position, p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDuelsWonPerNinety = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDuelsWonPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));

// Metric: progressiveActionsPerNinety
const allCsvRankProgressiveActionsPerNinety = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety');
const leagueRankProgressiveActionsPerNinety = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => true, p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const leagueRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.league === selectedPlayer.league, p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const positionRankProgressiveActionsPerNinety = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.position === selectedPlayer.position);
const positionRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.position === selectedPlayer.position, p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressiveActionsPerNinety = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionsPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));


// Metric: duelsWonPercentage
const allCsvRankDuelsWonPercentage = calculateRankForMetric(filteredData, 'duelsWonPercentage');
const leagueRankDuelsWonPercentage = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.league === selectedPlayer.league);
const allCsvRankDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPercentage');
const leagueRankDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.league === selectedPlayer.league);
const positionRankDuelsWonPercentage = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.position === selectedPlayer.position);
const positionRankDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.position === selectedPlayer.position);
const samePositionAndLeagueDuelsWonPercentage = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDuelsWonPercentageWithMinutes = calculateRankForMetric(filteredData, 'duelsWonPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: possessionPlusMinus
const allCsvRankPossessionPlusMinus = calculateRankForMetric(filteredData, 'possessionPlusMinus');
const leagueRankPossessionPlusMinus = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.league === selectedPlayer.league);
const allCsvRankPossessionPlusMinusWithMinutes = calculateRankForMetric(filteredData, 'possessionPlusMinus');
const leagueRankPossessionPlusMinusWithMinutes = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.league === selectedPlayer.league);
const positionRankPossessionPlusMinus = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.position === selectedPlayer.position);
const positionRankPossessionPlusMinusWithMinutes = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.position === selectedPlayer.position);
const samePositionAndLeaguePossessionPlusMinus = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeaguePossessionPlusMinusWithMinutes = calculateRankForMetric(filteredData, 'possessionPlusMinus', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: forwardPassRatio
const allCsvRankForwardPassRatio = calculateRankForMetric(filteredData, 'forwardPassRatio');
const leagueRankForwardPassRatio = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.league === selectedPlayer.league);
const allCsvRankForwardPassRatioWithMinutes = calculateRankForMetric(filteredData, 'forwardPassRatio');
const leagueRankForwardPassRatioWithMinutes = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.league === selectedPlayer.league);
const positionRankForwardPassRatio = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.position === selectedPlayer.position);
const positionRankForwardPassRatioWithMinutes = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.position === selectedPlayer.position);
const samePositionAndLeagueForwardPassRatio = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueForwardPassRatioWithMinutes = calculateRankForMetric(filteredData, 'forwardPassRatio', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: xAPer100Passes
const allCsvRankXAPer100Passes = calculateRankForMetric(filteredData, 'xAPer100Passes');
const leagueRankXAPer100Passes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.league === selectedPlayer.league);
const allCsvRankXAPer100PassesWithMinutes = calculateRankForMetric(filteredData, 'xAPer100Passes');
const leagueRankXAPer100PassesWithMinutes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.league === selectedPlayer.league);
const positionRankXAPer100Passes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.position === selectedPlayer.position);
const positionRankXAPer100PassesWithMinutes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.position === selectedPlayer.position);
const samePositionAndLeagueXAPer100Passes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXAPer100PassesWithMinutes = calculateRankForMetric(filteredData, 'xAPer100Passes', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: chanceCreationRatio
const allCsvRankChanceCreationRatio = calculateRankForMetric(filteredData, 'chanceCreationRatio');
const leagueRankChanceCreationRatio = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.league === selectedPlayer.league);
const allCsvRankChanceCreationRatioWithMinutes = calculateRankForMetric(filteredData, 'chanceCreationRatio');
const leagueRankChanceCreationRatioWithMinutes = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.league === selectedPlayer.league);
const positionRankChanceCreationRatio = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.position === selectedPlayer.position);
const positionRankChanceCreationRatioWithMinutes = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.position === selectedPlayer.position);
const samePositionAndLeagueChanceCreationRatio = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueChanceCreationRatioWithMinutes = calculateRankForMetric(filteredData, 'chanceCreationRatio', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: npxGPerShot
const allCsvRankNpxGPerShot = calculateRankForMetric(filteredData, 'npxGPerShot');
const leagueRankNpxGPerShot = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.league === selectedPlayer.league);
const allCsvRankNpxGPerShotWithMinutes = calculateRankForMetric(filteredData, 'npxGPerShot');
const leagueRankNpxGPerShotWithMinutes = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.league === selectedPlayer.league);
const positionRankNpxGPerShot = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.position === selectedPlayer.position);
const positionRankNpxGPerShotWithMinutes = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.position === selectedPlayer.position);
const samePositionAndLeagueNpxGPerShot = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueNpxGPerShotWithMinutes = calculateRankForMetric(filteredData, 'npxGPerShot', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: progressiveActionRate
const allCsvRankProgressiveActionRate = calculateRankForMetric(filteredData, 'progressiveActionRate');
const leagueRankProgressiveActionRate = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.league === selectedPlayer.league);
const allCsvRankProgressiveActionRateWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionRate');
const leagueRankProgressiveActionRateWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.league === selectedPlayer.league);
const positionRankProgressiveActionRate = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.position === selectedPlayer.position);
const positionRankProgressiveActionRateWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.position === selectedPlayer.position);
const samePositionAndLeagueProgressiveActionRate = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressiveActionRateWithMinutes = calculateRankForMetric(filteredData, 'progressiveActionRate', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: progressivePassesPAdj
const allCsvRankProgressivePassesPAdj = calculateRankForMetric(filteredData, 'progressivePassesPAdj');
const leagueRankProgressivePassesPAdj = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.league === selectedPlayer.league);
const allCsvRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesPAdj');
const leagueRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.league === selectedPlayer.league);
const positionRankProgressivePassesPAdj = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.position === selectedPlayer.position);
const positionRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.position === selectedPlayer.position);
const samePositionAndLeagueProgressivePassesPAdj = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueProgressivePassesPAdjWithMinutes = calculateRankForMetric(filteredData, 'progressivePassesPAdj', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: ballCarryingFrequency
const allCsvRankBallCarryingFrequency = calculateRankForMetric(filteredData, 'ballCarryingFrequency');
const leagueRankBallCarryingFrequency = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.league === selectedPlayer.league);
const allCsvRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(filteredData, 'ballCarryingFrequency');
const leagueRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.league === selectedPlayer.league);
const positionRankBallCarryingFrequency = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.position === selectedPlayer.position);
const positionRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.position === selectedPlayer.position);
const samePositionAndLeagueBallCarryingFrequency = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueBallCarryingFrequencyWithMinutes = calculateRankForMetric(filteredData, 'ballCarryingFrequency', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: xGPer100Touches
const allCsvRankXGPer100Touches = calculateRankForMetric(filteredData, 'xGPer100Touches');
const leagueRankXGPer100Touches = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.league === selectedPlayer.league);
const allCsvRankXGPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'xGPer100Touches');
const leagueRankXGPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.league === selectedPlayer.league);
const positionRankXGPer100Touches = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.position === selectedPlayer.position);
const positionRankXGPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.position === selectedPlayer.position);
const samePositionAndLeagueXGPer100Touches = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXGPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'xGPer100Touches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: shotFrequency
const allCsvRankShotFrequency = calculateRankForMetric(filteredData, 'shotFrequency');
const leagueRankShotFrequency = calculateRankForMetric(filteredData, 'shotFrequency', p => p.league === selectedPlayer.league);
const allCsvRankShotFrequencyWithMinutes = calculateRankForMetric(filteredData, 'shotFrequency');
const leagueRankShotFrequencyWithMinutes = calculateRankForMetric(filteredData, 'shotFrequency', p => p.league === selectedPlayer.league);
const positionRankShotFrequency = calculateRankForMetric(filteredData, 'shotFrequency', p => p.position === selectedPlayer.position);
const positionRankShotFrequencyWithMinutes = calculateRankForMetric(filteredData, 'shotFrequency', p => p.position === selectedPlayer.position);
const samePositionAndLeagueShotFrequency = calculateRankForMetric(filteredData, 'shotFrequency', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueShotFrequencyWithMinutes = calculateRankForMetric(filteredData, 'shotFrequency', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: dribblesPerHundredTouches
const allCsvRankDribblesPerHundredTouches = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches');
const leagueRankDribblesPerHundredTouches = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.league === selectedPlayer.league);
const allCsvRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches');
const leagueRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.league === selectedPlayer.league);
const positionRankDribblesPerHundredTouches = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.position === selectedPlayer.position);
const positionRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.position === selectedPlayer.position);
const samePositionAndLeagueDribblesPerHundredTouches = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(filteredData, 'dribblesPerHundredTouches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

// Metric: goalsPer100Touches
const allCsvRankGoalsPer100Touches = calculateRankForMetric(filteredData, 'goalsPer100Touches');
const leagueRankGoalsPer100Touches = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.league === selectedPlayer.league);
const allCsvRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'goalsPer100Touches');
const leagueRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.league === selectedPlayer.league);
const positionRankGoalsPer100Touches = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.position === selectedPlayer.position);
const positionRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.position === selectedPlayer.position);
const samePositionAndLeagueGoalsPer100Touches = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueGoalsPer100TouchesWithMinutes = calculateRankForMetric(filteredData, 'goalsPer100Touches', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);


// Metric: goalsMinusxGPerNinety
const allCsvRankGoalsMinusxGPerNinety = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety');
const leagueRankGoalsMinusxGPerNinety = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => true, p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const leagueRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.league === selectedPlayer.league, p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const positionRankGoalsMinusxGPerNinety = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.position === selectedPlayer.position);
const positionRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.position === selectedPlayer.position, p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueGoalsMinusxGPerNinety = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'goalsMinusxGPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));


// Metric: npxGAndxAPerNinety
const allCsvRankNpxGAndxAPerNinety = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety');
const leagueRankNpxGAndxAPerNinety = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => true, p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const leagueRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.league === selectedPlayer.league, p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const positionRankNpxGAndxAPerNinety = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.position === selectedPlayer.position);
const positionRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.position === selectedPlayer.position, p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGAndxAPerNinety = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGAndxAPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));


// Metric: npxGPerNinety
const allCsvRankNpxGPerNinety = calculateRankForMetric(filteredData, 'npxGPerNinety');
const leagueRankNpxGPerNinety = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankNpxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGPerNinety', p => true, p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const leagueRankNpxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.league === selectedPlayer.league, p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const positionRankNpxGPerNinety = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.position === selectedPlayer.position);
const positionRankNpxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.position === selectedPlayer.position, p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGPerNinety = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueNpxGPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'npxGPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));


// Metric: xGAndxAPerNinety
const allCsvRankXGAndxAPerNinety = calculateRankForMetric(filteredData, 'xGAndxAPerNinety');
const leagueRankXGAndxAPerNinety = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.league === selectedPlayer.league);
const allCsvRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => true, p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const leagueRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.league === selectedPlayer.league, p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const positionRankXGAndxAPerNinety = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.position === selectedPlayer.position);
const positionRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.position === selectedPlayer.position, p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueXGAndxAPerNinety = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
const samePositionAndLeagueXGAndxAPerNinetyWithMinutes = calculateRankForMetric(filteredData, 'xGAndxAPerNinety', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));



    const sectionSelect = document.getElementById('sectionSelect');
    const selectedSection = sectionSelect.options[sectionSelect.selectedIndex].value;
    let titleSuffix = ''; // Initialize the title suffix

// Update the title suffix based on the selected age
if (selectedAge && selectedAge !== '') {
    titleSuffix = ` U${selectedAge}`;
}

    let playerResults = '';

    if (selectedSection === 'samePositionAndLeague') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: samePositionAndLeagueActions },
          { name: 'Defensive duels', data: samePositionAndLeagueDuels },
          { name: 'Aerial duels', data: samePositionAndLeagueAerialDuels },
          { name: 'Sliding tackles', data: samePositionAndLeagueSlidingTackles },
          { name: 'Sliding tackles (PAdj)', data: samePositionAndLeaguePAdjSlidingTackles },
          { name: 'Shots blocked', data: samePositionAndLeagueShotsBlocked },
          { name: 'Interceptions', data: samePositionAndLeagueInterceptions },
          { name: 'Interceptions (PAdj)', data: samePositionAndLeaguePAdjInterceptions },
          { name: 'Successful attacking actions', data: samePositionAndLeagueSuccessfulAttackingActions },
          { name: 'Goals', data: samePositionAndLeagueGoals },
          { name: 'Non-penalty goals', data: samePositionAndLeagueNonPenaltyGoals },
          { name: 'Expected goals (xG)', data: samePositionAndLeagueXG },
          { name: 'Headed goals', data: samePositionAndLeagueHeadGoals },
          { name: 'Shots', data: samePositionAndLeagueShots },
          { name: 'Assists', data: samePositionAndLeagueAssists },
          { name: 'Crosses', data: samePositionAndLeagueCrosses },
          { name: 'Crosses to box', data: samePositionAndLeagueCrossesToGoalieBox },
          { name: 'Dribbles attempted', data: samePositionAndLeagueDribbles },
          { name: 'Offensive duels', data: samePositionAndLeagueOffensiveDuels },
          { name: 'Touches in box', data: samePositionAndLeagueTouchesInBox },
          { name: 'Progressive carries', data: samePositionAndLeagueProgressiveRuns },
          { name: 'Accelerations', data: samePositionAndLeagueAccelerations },
          { name: 'Fouls suffered', data: samePositionAndLeagueFoulsSuffered },
          { name: 'Passes', data: samePositionAndLeaguePasses },
          { name: 'Forward passes', data: samePositionAndLeagueForwardPasses },
          { name: 'Short passes', data: samePositionAndLeagueShortMediumPasses },
          { name: 'Long passes', data: samePositionAndLeagueLongPasses },
          { name: 'Expected assists (xA)', data: samePositionAndLeagueXA },
          { name: 'Shot assists', data: samePositionAndLeagueShotAssists },
          { name: 'Key passes', data: samePositionAndLeagueKeyPasses },
          { name: 'Passes to final third', data: samePositionAndLeaguePassesToFinalThird },
          { name: 'Passes to penalty box', data: samePositionAndLeaguePassesToPenaltyArea },
          { name: 'Through passes', data: samePositionAndLeagueThroughPasses },
          { name: 'Deep completions', data: samePositionAndLeagueDeepCompletions },
          { name: 'Progressive passes', data: samePositionAndLeagueProgressivePasses },
          { name: 'Shots conceded', data: samePositionAndLeagueShotsAgainst },
          { name: 'Clean sheets', data: samePositionAndLeagueCleanSheets },
          { name: 'xG conceded', data: samePositionAndLeagueXGAgainst },
          { name: 'Prevented goals (PSxG-GA)', data: samePositionAndLeaguePreventedGoals },
          { name: 'Line exits', data: samePositionAndLeagueExits },
          { name: 'Defensive duels won %', data: samePositionAndLeagueDefensiveDuelsWonPercentage },
          { name: 'Aerial duels won %', data: samePositionAndLeagueAerialDuelsWonPercentage },
          { name: 'Shots on target %', data: samePositionAndLeagueShotsOnTargetPercentage },
          { name: 'Goal conversion %', data: samePositionAndLeagueGoalConversionPercentage },
          { name: 'Cross accuracy %', data: samePositionAndLeagueAccurateCrossesPercentage },
          { name: 'Dribble success rate %', data: samePositionAndLeagueSuccessfulDribblesPercentage },
          { name: 'Offensive duels won %', data: samePositionAndLeagueOffensiveDuelsWonPercentage },
          { name: 'Pass completion %', data: samePositionAndLeagueAccuratePassesPercentage },
          { name: 'Forward pass completion %', data: samePositionAndLeagueAccurateForwardPassesPercentage },
          { name: 'Short pass completion %', data: samePositionAndLeagueAccurateShortMediumPassesPercentage },
          { name: 'Long pass accuracy %', data: samePositionAndLeagueAccurateLongPassesPercentage },
          { name: 'Pass completion (to final third) %', data: samePositionAndLeagueAccuratePassesToFinalThirdPercentage },
          { name: 'Pass completion (to penalty box) %', data: samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage },
          { name: 'Progressive pass accuracy %', data: samePositionAndLeagueAccurateProgressivePassesPercentage },
          { name: 'Save percentage %', data: samePositionAndLeagueSaveRatePercentage },
        { name: 'Pre-assists', data: samePositionAndLeaguePreAssistsPerNinety },
        { name: 'Duels', data: samePositionAndLeagueDuelsPerNinety },
        { name: 'Duels won %', data: samePositionAndLeagueDuelsWonPercentage },
        { name: 'Possession +/-', data: samePositionAndLeaguePossessionPlusMinus },
        { name: 'Forward pass ratio', data: samePositionAndLeagueForwardPassRatio },
        { name: 'xA per 100 passes', data: samePositionAndLeagueXAPer100Passes },
        { name: 'Chance creation ratio', data: samePositionAndLeagueChanceCreationRatio },
        { name: 'Goals + assists', data: samePositionAndLeagueGoalsAndAssistsPerNinety },
        { name: 'Non-penalty goals + assists', data: samePositionAndLeagueNpGoalsAndAssistsPerNinety },
        { name: 'xG + xA', data: samePositionAndLeagueXGAndxAPerNinety },
        { name: 'Goals - xG', data: samePositionAndLeagueGoalsMinusxGPerNinety },
        { name: 'Successful dribbles', data: samePositionAndLeagueSuccessfulDribblesPerNinety },
        { name: 'Shots on target', data: samePositionAndLeagueShotsOnTargetPerNinety },
        { name: 'Accurate crosses', data: samePositionAndLeagueAccurateCrossesPerNinety },
        { name: 'Offensive duels won', data: samePositionAndLeagueOffensiveDuelsWonPerNinety },
        { name: 'Defensive duels won', data: samePositionAndLeagueDefensiveDuelsWonPerNinety },
        { name: 'Aerial duels won', data: samePositionAndLeagueAerialDuelsWonPerNinety },
        { name: 'Passes completed', data: samePositionAndLeaguePassesCompletedPerNinety },
        { name: 'Forward passes completed', data: samePositionAndLeagueForwardPassesCompletedPerNinety },
        { name: 'Short passes completed', data: samePositionAndLeagueShortPassesCompletedPerNinety },
        { name: 'Long passes completed', data: samePositionAndLeagueLongPassesCompletedPerNinety },
        { name: 'Accurate passes to final third', data: samePositionAndLeagueAccuratePassesToFinalThirdPerNinety },
        { name: 'Through passes completed', data: samePositionAndLeagueThroughPassesCompletedPerNinety },
        { name: 'Progressive passes completed', data: samePositionAndLeagueProgressivePassesCompletedPerNinety },
        { name: 'Saves', data: samePositionAndLeagueSavesPerNinety },
        { name: 'Possessions won - lost', data: samePositionAndLeaguePossessionsWonMinusLostPerNinety },
        { name: 'Progressive actions', data: samePositionAndLeagueProgressiveActionsPerNinety },
        { name: 'Duels won', data: samePositionAndLeagueDuelsWonPerNinety },
        { name: 'Non-penalty xG', data: samePositionAndLeagueNpxGPerNinety },
        { name: 'npxG/Shot', data: samePositionAndLeagueNpxGPerShot },
        { name: 'npxG + xA', data: samePositionAndLeagueNpxGAndxAPerNinety },
        { name: 'Touches', data: samePositionAndLeagueTouchesPerNinety },
        { name: 'Progressive action rate', data: samePositionAndLeagueProgressiveActionRate },
        { name: 'Progressive passes (PAdj)', data: samePositionAndLeagueProgressivePassesPAdj },
        { name: 'Ball carrying frequency', data: samePositionAndLeagueBallCarryingFrequency },
        { name: 'xG per 100 touches', data: samePositionAndLeagueXGPer100Touches },
        { name: 'Shot frequency', data: samePositionAndLeagueShotFrequency },
        { name: 'Dribbles per 100 touches', data: samePositionAndLeagueDribblesPerHundredTouches },
        { name: 'Goals per 100 touches', data: samePositionAndLeagueGoalsPer100Touches }
        ];
        
        const positionOrder = {
        'Goalkeeper': [
        'Prevented goals (PSxG-GA)',
        'Saves',
        'Save percentage %',
        'Clean sheets',
        'Shots conceded',
        'xG conceded',
        'Line exits',
        'Touches',
        'Passes',
        'Passes completed',
        'Pass completion %',
        'Short passes',
        'Short passes completed',
        'Short pass completion %',
        'Long passes',
        'Long passes completed',
        'Long pass accuracy %',
        'Passes to final third',
        'Progressive passes',
        'Pass completion (to final third) %',
        'Progressive pass accuracy %',
        'Through passes',
        'Defensive duels won',
        'Aerial duels won',
        'Possessions won',
        'Interceptions'
          ],
          'Centre-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Through passes completed',
            'Progressive carries',
            'Progressive actions',
            'Progressive action rate',
            'Ball carrying frequency',
            'Successful dribbles',
            'Key passes',
            'Assists',
            'Goals',
            'Headed goals'
          ],
          'Full-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Successful attacking actions',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Goals',
            'Expected goals (xG)',
            'Goals + assists',
            'xG + xA',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed'
          ],
          'Midfielder': [
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes',
            'Through passes completed',
            'Pre-assists',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'xA per 100 passes',
            'Key passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Headed goals',
            'Non-penalty xG',
            'Shots',
            'Shots on target',
            'npxG/Shot',
            'Goals - xG',
            'xG per 100 touches',
            'Goals per 100 touches',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Successful attacking actions',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Possession +/-',
            'Possessions won - lost',
            'Possessions won',
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked'
          ],
          'Winger': [
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Non-penalty xG',
            'Goals per 100 touches',
            'xG per 100 touches',
            'Headed goals',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Fouls suffered',
            'Successful attacking actions',
            'Duels won',
            'Duels won %',
            'Touches in box',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Long passes',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possession +/-',
            'Possessions won - lost',
            'Interceptions',
            'Defensive duels won',
            'Aerial duels won',
            'Aerial duels won %',
            'Possessions won'
          ],
          'Striker': [
            'Goals',
            'Non-penalty goals',
            'Goals per 100 touches',
            'Expected goals (xG)',
            'Non-penalty xG',
            'xG per 100 touches',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Headed goals',
            'Touches in box',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Accurate crosses',
            'Successful attacking actions',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribbles per 100 touches',
            'Fouls suffered',
            'Touches',
            'Duels won',
            'Duels won %',
            'Offensive duels',  
            'Offensive duels won',
            'Offensive duels won %',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possessions won',
            'Interceptions',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Defensive duels won'
          ]
        };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
  metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}// Construct HTML for metrics
const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
    const filteredData1 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
        (!selectedAge || player.age <= selectedAge));
        const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
            // Get the current value for the selected player and metric
            const currentValue = getMetricValueFunction(filteredData1, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth1 = 100 - (((playerRank - 1) / filteredData1.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth1 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth1); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth1 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
        ${metric.name} – ${playerRank}${rankSuffix}
<div class="rank-bar" onclick="toggleActive(this)">
    <div class="rank-bar-fill" style="width: ${rankBarWidth1}%; background-color: ${color}"></div>
        <span class="hover-content">${currentValue}</span>
   
</div>

          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');



    // Construct player results HTML
    playerResults = `
        ${metricsHTML}
         `;
         const selectedAge = parseInt(ageSelect.value);
const filteredData1 = parseCSV(csvData).filter(player => 
    player.position === selectedPlayer.position && 
    player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge)
);

const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };
const metricsToInclude = {

  'Defensive duels': samePositionAndLeagueDuels,
  'Defensive duels won': samePositionAndLeagueDefensiveDuelsWonPerNinety,
  'Aerial duels': samePositionAndLeagueAerialDuels,
  'Aerial duels won': samePositionAndLeagueAerialDuelsWonPerNinety,
  'Defensive duel %': samePositionAndLeagueDefensiveDuelsWonPercentage,
  'Aerial duel %': samePositionAndLeagueAerialDuelsWonPercentage,
  'Possessions won': samePositionAndLeagueActions,
  'Tackles': samePositionAndLeagueSlidingTackles,
  'Tackles (PAdj)': samePositionAndLeaguePAdjSlidingTackles,
  'Interceptions': samePositionAndLeagueInterceptions,
  'Interceptions (PAdj)': samePositionAndLeaguePAdjInterceptions,
  'Shots blocked': samePositionAndLeagueShotsBlocked,
  'Duels': samePositionAndLeagueDuelsPerNinety,
  'Duels won': samePositionAndLeagueDuelsWonPerNinety,
  'Duel %': samePositionAndLeagueDuelsWonPercentage,
  'Poss won-lost': samePositionAndLeaguePossessionsWonMinusLostPerNinety,
  'Poss +/-': samePositionAndLeaguePossessionPlusMinus,
  'Touches': samePositionAndLeagueTouchesPerNinety,
  'Touches in box': samePositionAndLeagueTouchesInBox,
  'Goals': samePositionAndLeagueGoals,
  'Non-penalty goals': samePositionAndLeagueNonPenaltyGoals,
  'Expected goals': samePositionAndLeagueXG,
  'Headed goals': samePositionAndLeagueHeadGoals,
  'Shots': samePositionAndLeagueShots,
  'SoT %': samePositionAndLeagueShotsOnTargetPercentage,
  'Shots on target': samePositionAndLeagueShotsOnTargetPerNinety,
  'Goals - xG': samePositionAndLeagueGoalsMinusxGPerNinety,
  'Non-penalty xG': samePositionAndLeagueNpxGPerNinety,
  'Goal per 100T': samePositionAndLeagueGoalsPer100Touches,
  'xG per 100T': samePositionAndLeagueXGPer100Touches,
  'Shot frequency': samePositionAndLeagueShotFrequency,
  'Goal conversion': samePositionAndLeagueGoalConversionPercentage,
  'npxG/Shot': samePositionAndLeagueNpxGPerShot,
  'xG + xA': samePositionAndLeagueXGAndxAPerNinety,
  'npxG + xA': samePositionAndLeagueNpxGAndxAPerNinety,
  'Goals + assists': samePositionAndLeagueGoalsAndAssistsPerNinety,
  'NPG+A': samePositionAndLeagueNpGoalsAndAssistsPerNinety,
  'Assists': samePositionAndLeagueAssists,
  'Expected assists': samePositionAndLeagueXA,
  'Key passes': samePositionAndLeagueKeyPasses,
  'Shot assists': samePositionAndLeagueShotAssists,
  'xA per 100 passes': samePositionAndLeagueXAPer100Passes,
  'Creativity ratio': samePositionAndLeagueChanceCreationRatio,
  'Deep completions': samePositionAndLeagueDeepCompletions,
  'Crosses': samePositionAndLeagueCrosses,
  'Accurate crosses': samePositionAndLeagueAccurateCrossesPerNinety,
  'Cross %': samePositionAndLeagueAccurateCrossesPercentage,
  'Crosses to box': samePositionAndLeagueCrossesToGoalieBox,
  'Passes': samePositionAndLeaguePasses,
  'Passes completed': samePositionAndLeaguePassesCompletedPerNinety,
  'Forward passes': samePositionAndLeagueForwardPasses,
  'Fwd passes comp': samePositionAndLeagueForwardPassesCompletedPerNinety,
  'Short passes': samePositionAndLeagueShortMediumPasses,
  'Short passes comp': samePositionAndLeagueShortPassesCompletedPerNinety,
  'Long passes': samePositionAndLeagueLongPasses,
  'Long passes comp': samePositionAndLeagueLongPassesCompletedPerNinety,
  'Progressive passes': samePositionAndLeagueProgressivePasses,
  'Prog passes comp': samePositionAndLeagueProgressivePassesCompletedPerNinety,
  'Prog passes (PAdj)': samePositionAndLeagueProgressivePassesPAdj,
  'Passes to fin 3rd': samePositionAndLeaguePassesToFinalThird,
  'Passes to pen box': samePositionAndLeaguePassesToPenaltyArea,
  'Through passes': samePositionAndLeagueThroughPasses,
  'Through passes comp': samePositionAndLeagueThroughPassesCompletedPerNinety,
  'Pass %': samePositionAndLeagueAccuratePassesPercentage,
  'Forward pass %': samePositionAndLeagueAccurateForwardPassesPercentage,
  'Short pass %': samePositionAndLeagueAccurateShortMediumPassesPercentage,
  'Progressive pass %': samePositionAndLeagueAccurateProgressivePassesPercentage,
  'Long pass %': samePositionAndLeagueAccurateLongPassesPercentage,
  'Pass to fin 3rd %': samePositionAndLeagueAccuratePassesToFinalThirdPercentage,
  'Pass to pen box %': samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage,
  'Pre-assists': samePositionAndLeaguePreAssistsPerNinety,
  'Forward pass ratio': samePositionAndLeagueForwardPassRatio,
  'Progressive actions': samePositionAndLeagueProgressiveActionsPerNinety,
  'Prog action rate': samePositionAndLeagueProgressiveActionRate,
  'Progressive carries': samePositionAndLeagueProgressiveRuns,
  'Carrying frequency': samePositionAndLeagueBallCarryingFrequency,
  'Accelerations': samePositionAndLeagueAccelerations,
  'Offensive duels': samePositionAndLeagueOffensiveDuels,
  'Offensive duels won': samePositionAndLeagueOffensiveDuelsWonPerNinety,
  'Offensive duel %': samePositionAndLeagueOffensiveDuelsWonPercentage,
  'Dribbles attempted': samePositionAndLeagueDribbles,
  'Successful dribbles': samePositionAndLeagueSuccessfulDribblesPerNinety,
  'Dribble success %': samePositionAndLeagueSuccessfulDribblesPercentage,
  'Dribbles per 100T': samePositionAndLeagueDribblesPerHundredTouches,
  'Attacking actions': samePositionAndLeagueSuccessfulAttackingActions,
  'Fouls suffered': samePositionAndLeagueFoulsSuffered,
  'Save %': samePositionAndLeagueSaveRatePercentage,
  'Saves': samePositionAndLeagueSavesPerNinety,
  'Shots conceded': samePositionAndLeagueShotsAgainst,
  'Clean sheets': samePositionAndLeagueCleanSheets,
  'xG conceded': samePositionAndLeagueXGAgainst,
  'Prevented goals': samePositionAndLeaguePreventedGoals,
  'Line exits': samePositionAndLeagueExits,

};



// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData1.length;
});



document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs ${selectedPlayer.league} ${titleSuffix} ${selectedPlayer.position}s, per 90</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;

    createPizzaChart(rankData, player.player);

// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData1.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}
else if (selectedSection === 'samePositionAndLeagueWithMinutes') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: samePositionAndLeagueActionsWithMinutes },
          { name: 'Defensive duels', data: samePositionAndLeagueDuelsWithMinutes },
          { name: 'Aerial duels', data: samePositionAndLeagueAerialDuelsWithMinutes },
          { name: 'Sliding tackles', data: samePositionAndLeagueSlidingTacklesWithMinutes },
          { name: 'Sliding tackles (PAdj)', data: samePositionAndLeaguePAdjSlidingTacklesWithMinutes },
          { name: 'Shots blocked', data: samePositionAndLeagueShotsBlockedWithMinutes },
          { name: 'Interceptions', data: samePositionAndLeagueInterceptionsWithMinutes },
          { name: 'Interceptions (PAdj)', data: samePositionAndLeaguePAdjInterceptionsWithMinutes },
          { name: 'Successful attacking actions', data: samePositionAndLeagueSuccessfulAttackingActionsWithMinutes },
          { name: 'Goals', data: samePositionAndLeagueGoalsWithMinutes },
          { name: 'Non-penalty goals', data: samePositionAndLeagueNonPenaltyGoalsWithMinutes },
          { name: 'Expected goals (xG)', data: samePositionAndLeagueXGWithMinutes },
          { name: 'Headed goals', data: samePositionAndLeagueHeadGoalsWithMinutes },
          { name: 'Shots', data: samePositionAndLeagueShotsWithMinutes },
          { name: 'Assists', data: samePositionAndLeagueAssistsWithMinutes },
          { name: 'Crosses', data: samePositionAndLeagueCrossesWithMinutes },
          { name: 'Crosses to box', data: samePositionAndLeagueCrossesToGoalieBoxWithMinutes },
          { name: 'Dribbles attempted', data: samePositionAndLeagueDribblesWithMinutes },
          { name: 'Offensive duels', data: samePositionAndLeagueOffensiveDuelsWithMinutes },
          { name: 'Touches in box', data: samePositionAndLeagueTouchesInBoxWithMinutes },
          { name: 'Progressive carries', data: samePositionAndLeagueProgressiveRunsWithMinutes },
          { name: 'Accelerations', data: samePositionAndLeagueAccelerationsWithMinutes },
          { name: 'Fouls suffered', data: samePositionAndLeagueFoulsSufferedWithMinutes },
          { name: 'Passes', data: samePositionAndLeaguePassesWithMinutes },
          { name: 'Forward passes', data: samePositionAndLeagueForwardPassesWithMinutes },
          { name: 'Short passes', data: samePositionAndLeagueShortMediumPassesWithMinutes },
          { name: 'Long passes', data: samePositionAndLeagueLongPassesWithMinutes },
          { name: 'Expected assists (xA)', data: samePositionAndLeagueXAWithMinutes },
          { name: 'Shot assists', data: samePositionAndLeagueShotAssistsWithMinutes },
          { name: 'Key passes', data: samePositionAndLeagueKeyPassesWithMinutes },
          { name: 'Passes to final third', data: samePositionAndLeaguePassesToFinalThirdWithMinutes },
          { name: 'Passes to penalty box', data: samePositionAndLeaguePassesToPenaltyAreaWithMinutes },
          { name: 'Through passes', data: samePositionAndLeagueThroughPassesWithMinutes },
          { name: 'Deep completions', data: samePositionAndLeagueDeepCompletionsWithMinutes },
          { name: 'Progressive passes', data: samePositionAndLeagueProgressivePassesWithMinutes },
          { name: 'Shots conceded', data: samePositionAndLeagueShotsAgainstWithMinutes },
          { name: 'Clean sheets', data: samePositionAndLeagueCleanSheetsWithMinutes },
          { name: 'xG conceded', data: samePositionAndLeagueXGAgainstWithMinutes },
          { name: 'Prevented goals (PSxG-GA)', data: samePositionAndLeaguePreventedGoalsWithMinutes },
          { name: 'Line exits', data: samePositionAndLeagueExitsWithMinutes },
          { name: 'Defensive duels won %', data: samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes },
          { name: 'Aerial duels won %', data: samePositionAndLeagueAerialDuelsWonPercentageWithMinutes },
          { name: 'Shots on target %', data: samePositionAndLeagueShotsOnTargetPercentageWithMinutes },
          { name: 'Goal conversion %', data: samePositionAndLeagueGoalConversionPercentageWithMinutes },
          { name: 'Cross accuracy %', data: samePositionAndLeagueAccurateCrossesPercentageWithMinutes },
          { name: 'Dribble success rate %', data: samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes },
          { name: 'Offensive duels won %', data: samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes },
          { name: 'Pass completion %', data: samePositionAndLeagueAccuratePassesPercentageWithMinutes },
          { name: 'Forward pass completion %', data: samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes },
          { name: 'Short pass completion %', data: samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes },
          { name: 'Long pass accuracy %', data: samePositionAndLeagueAccurateLongPassesPercentageWithMinutes },
          { name: 'Pass completion (to final third) %', data: samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes },
          { name: 'Pass completion (to penalty box) %', data: samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes },
          { name: 'Progressive pass accuracy %', data: samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes },
          { name: 'Save percentage %', data: samePositionAndLeagueSaveRatePercentageWithMinutes },
          { name: 'Pre-assists', data: samePositionAndLeaguePreAssistsPerNinetyWithMinutes },
          { name: 'Duels', data: samePositionAndLeagueDuelsPerNinetyWithMinutes },
          { name: 'Duels won %', data: samePositionAndLeagueDuelsWonPercentageWithMinutes },
          { name: 'Possession +/-', data: samePositionAndLeaguePossessionPlusMinusWithMinutes },
          { name: 'Forward pass ratio', data: samePositionAndLeagueForwardPassRatioWithMinutes },
          { name: 'xA per 100 passes', data: samePositionAndLeagueXAPer100PassesWithMinutes },
          { name: 'Chance creation ratio', data: samePositionAndLeagueChanceCreationRatioWithMinutes },
          { name: 'Goals + assists', data: samePositionAndLeagueGoalsAndAssistsPerNinetyWithMinutes },
          { name: 'Non-penalty goals + assists', data: samePositionAndLeagueNpGoalsAndAssistsPerNinetyWithMinutes },
          { name: 'xG + xA', data: samePositionAndLeagueXGAndxAPerNinetyWithMinutes },
          { name: 'Goals - xG', data: samePositionAndLeagueGoalsMinusxGPerNinetyWithMinutes },
          { name: 'Successful dribbles', data: samePositionAndLeagueSuccessfulDribblesPerNinetyWithMinutes },
          { name: 'Shots on target', data: samePositionAndLeagueShotsOnTargetPerNinetyWithMinutes },
          { name: 'Accurate crosses', data: samePositionAndLeagueAccurateCrossesPerNinetyWithMinutes },
          { name: 'Offensive duels won', data: samePositionAndLeagueOffensiveDuelsWonPerNinetyWithMinutes },
          { name: 'Defensive duels won', data: samePositionAndLeagueDefensiveDuelsWonPerNinetyWithMinutes },
          { name: 'Aerial duels won', data: samePositionAndLeagueAerialDuelsWonPerNinetyWithMinutes },
          { name: 'Passes completed', data: samePositionAndLeaguePassesCompletedPerNinetyWithMinutes },
          { name: 'Forward passes completed', data: samePositionAndLeagueForwardPassesCompletedPerNinetyWithMinutes },
          { name: 'Short passes completed', data: samePositionAndLeagueShortPassesCompletedPerNinetyWithMinutes },
          { name: 'Long passes completed', data: samePositionAndLeagueLongPassesCompletedPerNinetyWithMinutes },
          { name: 'Accurate passes to final third', data: samePositionAndLeagueAccuratePassesToFinalThirdPerNinetyWithMinutes },
          { name: 'Through passes completed', data: samePositionAndLeagueThroughPassesCompletedPerNinetyWithMinutes },
          { name: 'Progressive passes completed', data: samePositionAndLeagueProgressivePassesCompletedPerNinetyWithMinutes },
          { name: 'Saves', data: samePositionAndLeagueSavesPerNinetyWithMinutes },
          { name: 'Possessions won - lost', data: samePositionAndLeaguePossessionsWonMinusLostPerNinetyWithMinutes },
          { name: 'Progressive actions', data: samePositionAndLeagueProgressiveActionsPerNinetyWithMinutes },
          { name: 'Duels won', data: samePositionAndLeagueDuelsWonPerNinetyWithMinutes },
          { name: 'Non-penalty xG', data: samePositionAndLeagueNpxGPerNinetyWithMinutes },
          { name: 'npxG/Shot', data: samePositionAndLeagueNpxGPerShotWithMinutes },
          { name: 'npxG + xA', data: samePositionAndLeagueNpxGAndxAPerNinetyWithMinutes },
          { name: 'Touches', data: samePositionAndLeagueTouchesPerNinetyWithMinutes },
          { name: 'Progressive action rate', data: samePositionAndLeagueProgressiveActionRateWithMinutes },
          { name: 'Progressive passes (PAdj)', data: samePositionAndLeagueProgressivePassesPAdjWithMinutes },
          { name: 'Ball carrying frequency', data: samePositionAndLeagueBallCarryingFrequencyWithMinutes },
          { name: 'xG per 100 touches', data: samePositionAndLeagueXGPer100TouchesWithMinutes },
          { name: 'Shot frequency', data: samePositionAndLeagueShotFrequencyWithMinutes },
          { name: 'Dribbles per 100 touches', data: samePositionAndLeagueDribblesPerHundredTouchesWithMinutes },
          { name: 'Goals per 100 touches', data: samePositionAndLeagueGoalsPer100TouchesWithMinutes }
          ];
        
        const positionOrder = {
        'Goalkeeper': [
        'Prevented goals (PSxG-GA)',
        'Saves',
        'Save percentage %',
        'Clean sheets',
        'Shots conceded',
        'xG conceded',
        'Line exits',
        'Touches',
        'Passes',
        'Passes completed',
        'Pass completion %',
        'Short passes',
        'Short passes completed',
        'Short pass completion %',
        'Long passes',
        'Long passes completed',
        'Long pass accuracy %',
        'Passes to final third',
        'Progressive passes',
        'Pass completion (to final third) %',
        'Progressive pass accuracy %',
        'Through passes',
        'Defensive duels won',
        'Aerial duels won',
        'Possessions won',
        'Interceptions'
          ],
          'Centre-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Through passes completed',
            'Progressive carries',
            'Progressive actions',
            'Progressive action rate',
            'Ball carrying frequency',
            'Successful dribbles',
            'Key passes',
            'Assists',
            'Goals',
            'Headed goals'
          ],
          'Full-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Successful attacking actions',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Goals',
            'Expected goals (xG)',
            'Goals + assists',
            'xG + xA',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed'
          ],
          'Midfielder': [
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes',
            'Through passes completed',
            'Pre-assists',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'xA per 100 passes',
            'Key passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Headed goals',
            'Non-penalty xG',
            'Shots',
            'Shots on target',
            'npxG/Shot',
            'Goals - xG',
            'xG per 100 touches',
            'Goals per 100 touches',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Successful attacking actions',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Possession +/-',
            'Possessions won - lost',
            'Possessions won',
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked'
          ],
          'Winger': [
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Non-penalty xG',
            'Goals per 100 touches',
            'xG per 100 touches',
            'Headed goals',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Fouls suffered',
            'Successful attacking actions',
            'Duels won',
            'Duels won %',
            'Touches in box',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Long passes',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possession +/-',
            'Possessions won - lost',
            'Interceptions',
            'Defensive duels won',
            'Aerial duels won',
            'Aerial duels won %',
            'Possessions won'
          ],
          'Striker': [
            'Goals',
            'Non-penalty goals',
            'Goals per 100 touches',
            'Expected goals (xG)',
            'Non-penalty xG',
            'xG per 100 touches',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Headed goals',
            'Touches in box',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Accurate crosses',
            'Successful attacking actions',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribbles per 100 touches',
            'Fouls suffered',
            'Touches',
            'Duels won',
            'Duels won %',
            'Offensive duels',  
            'Offensive duels won',
            'Offensive duels won %',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possessions won',
            'Interceptions',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Defensive duels won'
          ]
          };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
// Construct HTML for metrics
const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData2 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue2 = getMetricValueFunction(filteredData2, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth2 = 100 - (((playerRank - 1) / filteredData2.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth2 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth2); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth2 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth2}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue2}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');

// Construct player results HTML
    playerResults = `
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData2 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping
const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };

    const metricsToInclude = {
  'Defensive duels': samePositionAndLeagueDuelsWithMinutes,
  'Defensive duels won': samePositionAndLeagueDefensiveDuelsWonPerNinetyWithMinutes,
  'Aerial duels': samePositionAndLeagueAerialDuelsWithMinutes,
  'Aerial duels won': samePositionAndLeagueAerialDuelsWonPerNinetyWithMinutes,
  'Defensive duel %': samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes,
  'Aerial duel %': samePositionAndLeagueAerialDuelsWonPercentageWithMinutes,
  'Possessions won': samePositionAndLeagueActionsWithMinutes,
  'Tackles': samePositionAndLeagueSlidingTacklesWithMinutes,
  'Tackles (PAdj)': samePositionAndLeaguePAdjSlidingTacklesWithMinutes,
  'Interceptions': samePositionAndLeagueInterceptionsWithMinutes,
  'Interceptions (PAdj)': samePositionAndLeaguePAdjInterceptionsWithMinutes,
  'Shots blocked': samePositionAndLeagueShotsBlockedWithMinutes,
  'Duels': samePositionAndLeagueDuelsPerNinetyWithMinutes,
  'Duels won': samePositionAndLeagueDuelsWonPerNinetyWithMinutes,
  'Duel %': samePositionAndLeagueDuelsWonPercentageWithMinutes,
  'Poss won-lost': samePositionAndLeaguePossessionsWonMinusLostPerNinetyWithMinutes,
  'Poss +/-': samePositionAndLeaguePossessionPlusMinusWithMinutes,
  'Touches': samePositionAndLeagueTouchesPerNinetyWithMinutes,
  'Touches in box': samePositionAndLeagueTouchesInBoxWithMinutes,
  'Goals': samePositionAndLeagueGoalsWithMinutes,
  'Non-penalty goals': samePositionAndLeagueNonPenaltyGoalsWithMinutes,
  'Expected goals': samePositionAndLeagueXGWithMinutes,
  'Headed goals': samePositionAndLeagueHeadGoalsWithMinutes,
  'Shots': samePositionAndLeagueShotsWithMinutes,
  'SoT %': samePositionAndLeagueShotsOnTargetPercentageWithMinutes,
  'Shots on target': samePositionAndLeagueShotsOnTargetPerNinetyWithMinutes,
  'Goals - xG': samePositionAndLeagueGoalsMinusxGPerNinetyWithMinutes,
  'Non-penalty xG': samePositionAndLeagueNpxGPerNinetyWithMinutes,
  'Goal per 100T': samePositionAndLeagueGoalsPer100TouchesWithMinutes,
  'xG per 100T': samePositionAndLeagueXGPer100TouchesWithMinutes,
  'Shot frequency': samePositionAndLeagueShotFrequencyWithMinutes,
  'Goal conversion': samePositionAndLeagueGoalConversionPercentageWithMinutes,
  'npxG/Shot': samePositionAndLeagueNpxGPerShotWithMinutes,
  'xG + xA': samePositionAndLeagueXGAndxAPerNinetyWithMinutes,
  'npxG + xA': samePositionAndLeagueNpxGAndxAPerNinetyWithMinutes,
  'Goals + assists': samePositionAndLeagueGoalsAndAssistsPerNinetyWithMinutes,
  'NPG+A': samePositionAndLeagueNpGoalsAndAssistsPerNinetyWithMinutes,
  'Assists': samePositionAndLeagueAssistsWithMinutes,
  'Expected assists': samePositionAndLeagueXAWithMinutes,
  'Key passes': samePositionAndLeagueKeyPassesWithMinutes,
  'Shot assists': samePositionAndLeagueShotAssistsWithMinutes,
  'xA per 100 passes': samePositionAndLeagueXAPer100PassesWithMinutes,
  'Creativity ratio': samePositionAndLeagueChanceCreationRatioWithMinutes,
  'Deep completions': samePositionAndLeagueDeepCompletionsWithMinutes,
  'Crosses': samePositionAndLeagueCrossesWithMinutes,
  'Accurate crosses': samePositionAndLeagueAccurateCrossesPerNinetyWithMinutes,
  'Cross %': samePositionAndLeagueAccurateCrossesPercentageWithMinutes,
  'Crosses to box': samePositionAndLeagueCrossesToGoalieBoxWithMinutes,
  'Passes': samePositionAndLeaguePassesWithMinutes,
  'Passes completed': samePositionAndLeaguePassesCompletedPerNinetyWithMinutes,
  'Forward passes': samePositionAndLeagueForwardPassesWithMinutes,
  'Fwd passes comp': samePositionAndLeagueForwardPassesCompletedPerNinetyWithMinutes,
  'Short passes': samePositionAndLeagueShortMediumPassesWithMinutes,
  'Short passes comp': samePositionAndLeagueShortPassesCompletedPerNinetyWithMinutes,
  'Long passes': samePositionAndLeagueLongPassesWithMinutes,
  'Long passes comp': samePositionAndLeagueLongPassesCompletedPerNinetyWithMinutes,
  'Progressive passes': samePositionAndLeagueProgressivePassesWithMinutes,
  'Prog passes comp': samePositionAndLeagueProgressivePassesCompletedPerNinetyWithMinutes,
  'Prog passes (PAdj)': samePositionAndLeagueProgressivePassesPAdjWithMinutes,
  'Passes to fin 3rd': samePositionAndLeaguePassesToFinalThirdWithMinutes,
  'Passes to pen box': samePositionAndLeaguePassesToPenaltyAreaWithMinutes,
  'Through passes': samePositionAndLeagueThroughPassesWithMinutes,
  'Through passes comp': samePositionAndLeagueThroughPassesCompletedPerNinetyWithMinutes,
  'Pass %': samePositionAndLeagueAccuratePassesPercentageWithMinutes,
  'Forward pass %': samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes,
  'Short pass %': samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes,
  'Progressive pass %': samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes,
  'Long pass %': samePositionAndLeagueAccurateLongPassesPercentageWithMinutes,
  'Pass to fin 3rd %': samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes,
  'Pass to pen box %': samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes,
  'Pre-assists': samePositionAndLeaguePreAssistsPerNinetyWithMinutes,
  'Forward pass ratio': samePositionAndLeagueForwardPassRatioWithMinutes,
  'Progressive actions': samePositionAndLeagueProgressiveActionsPerNinetyWithMinutes,
  'Prog action rate': samePositionAndLeagueProgressiveActionRateWithMinutes,
  'Progressive carries': samePositionAndLeagueProgressiveRunsWithMinutes,
  'Carrying frequency': samePositionAndLeagueBallCarryingFrequencyWithMinutes,
  'Accelerations': samePositionAndLeagueAccelerationsWithMinutes,
  'Offensive duels': samePositionAndLeagueOffensiveDuelsWithMinutes,
  'Offensive duels won': samePositionAndLeagueOffensiveDuelsWonPerNinetyWithMinutes,
  'Offensive duel %': samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes,
  'Dribbles attempted': samePositionAndLeagueDribblesWithMinutes,
  'Successful dribbles': samePositionAndLeagueSuccessfulDribblesPerNinetyWithMinutes,
  'Dribble success %': samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes,
  'Dribbles per 100T': samePositionAndLeagueDribblesPerHundredTouchesWithMinutes,
  'Attacking actions': samePositionAndLeagueSuccessfulAttackingActionsWithMinutes,
  'Fouls suffered': samePositionAndLeagueFoulsSufferedWithMinutes,
  'Save %': samePositionAndLeagueSaveRatePercentageWithMinutes,
  'Saves': samePositionAndLeagueSavesPerNinetyWithMinutes,
  'Shots conceded': samePositionAndLeagueShotsAgainstWithMinutes,
  'Clean sheets': samePositionAndLeagueCleanSheetsWithMinutes,
  'xG conceded': samePositionAndLeagueXGAgainstWithMinutes,
  'Prevented goals': samePositionAndLeaguePreventedGoalsWithMinutes,
  'Line exits': samePositionAndLeagueExitsWithMinutes,
};


// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData2.length;
});
document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs ${selectedPlayer.league} ${titleSuffix} ${selectedPlayer.position}s</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;
}
     else if (selectedSection === 'position') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: positionRankActions },
        { name: 'Defensive duels', data: positionRankDuels },
        { name: 'Aerial duels', data: positionRankAerialDuels },
        { name: 'Sliding tackles', data: positionRankSlidingTackles },
        { name: 'Sliding tackles (PAdj)', data: positionRankPAdjSlidingTackles },
        { name: 'Shots blocked', data: positionRankShotsBlocked },
        { name: 'Interceptions', data: positionRankInterceptions },
        { name: 'Interceptions (PAdj)', data: positionRankPAdjInterceptions },
        { name: 'Successful attacking actions', data: positionRankSuccessfulAttackingActions },
        { name: 'Goals', data: positionRankGoals },
        { name: 'Non-penalty goals', data: positionRankNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: positionRankXG },
        { name: 'Headed goals', data: positionRankHeadGoals },
        { name: 'Shots', data: positionRankShots },
        { name: 'Assists', data: positionRankAssists },
        { name: 'Crosses', data: positionRankCrosses },
        { name: 'Crosses to box', data: positionRankCrossesToGoalieBox },
        { name: 'Dribbles attempted', data: positionRankDribbles },
        { name: 'Offensive duels', data: positionRankOffensiveDuels },
        { name: 'Touches in box', data: positionRankTouchesInBox },
        { name: 'Progressive carries', data: positionRankProgressiveRuns },
        { name: 'Accelerations', data: positionRankAccelerations },
        { name: 'Fouls suffered', data: positionRankFoulsSuffered },
        { name: 'Passes', data: positionRankPasses },
        { name: 'Forward passes', data: positionRankForwardPasses },
        { name: 'Short passes', data: positionRankShortMediumPasses },
        { name: 'Long passes', data: positionRankLongPasses },
        { name: 'Expected assists (xA)', data: positionRankXA },
        { name: 'Shot assists', data: positionRankShotAssists },
        { name: 'Key passes', data: positionRankKeyPasses },
        { name: 'Passes to final third', data: positionRankPassesToFinalThird },
        { name: 'Passes to penalty box', data: positionRankPassesToPenaltyArea },
        { name: 'Through passes', data: positionRankThroughPasses },
        { name: 'Deep completions', data: positionRankDeepCompletions },
        { name: 'Progressive passes', data: positionRankProgressivePasses },
        { name: 'Shots conceded', data: positionRankShotsAgainst },
        { name: 'Clean sheets', data: positionRankCleanSheets },
        { name: 'xG conceded', data: positionRankXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: positionRankPreventedGoals },
        { name: 'Line exits', data: positionRankExits },
        { name: 'Defensive duels won %', data: positionRankDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: positionRankAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: positionRankShotsOnTargetPercentage },
        { name: 'Goal conversion %', data: positionRankGoalConversionPercentage },
        { name: 'Cross accuracy %', data: positionRankAccurateCrossesPercentage },
        { name: 'Dribble success rate %', data: positionRankSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: positionRankOffensiveDuelsWonPercentage },
        { name: 'Pass completion %', data: positionRankAccuratePassesPercentage },
        { name: 'Forward pass completion %', data: positionRankAccurateForwardPassesPercentage },
        { name: 'Short pass completion %', data: positionRankAccurateShortMediumPassesPercentage },
        { name: 'Long pass accuracy %', data: positionRankAccurateLongPassesPercentage },
        { name: 'Pass completion (to final third) %', data: positionRankAccuratePassesToFinalThirdPercentage },
        { name: 'Pass completion (to penalty box) %', data: positionRankAccuratePassesToPenaltyAreaPercentage },
        { name: 'Progressive pass accuracy %', data: positionRankAccurateProgressivePassesPercentage },
        { name: 'Save percentage %', data: positionRankSaveRatePercentage },
      { name: 'Pre-assists', data: positionRankPreAssistsPerNinety },
      { name: 'Duels', data: positionRankDuelsPerNinety },
      { name: 'Duels won %', data: positionRankDuelsWonPercentage },
      { name: 'Possession +/-', data: positionRankPossessionPlusMinus },
      { name: 'Forward pass ratio', data: positionRankForwardPassRatio },
      { name: 'xA per 100 passes', data: positionRankXAPer100Passes },
      { name: 'Chance creation ratio', data: positionRankChanceCreationRatio },
      { name: 'Goals + assists', data: positionRankGoalsAndAssistsPerNinety },
      { name: 'Non-penalty goals + assists', data: positionRankNpGoalsAndAssistsPerNinety },
      { name: 'xG + xA', data: positionRankXGAndxAPerNinety },
      { name: 'Goals - xG', data: positionRankGoalsMinusxGPerNinety },
      { name: 'Successful dribbles', data: positionRankSuccessfulDribblesPerNinety },
      { name: 'Shots on target', data: positionRankShotsOnTargetPerNinety },
      { name: 'Accurate crosses', data: positionRankAccurateCrossesPerNinety },
      { name: 'Offensive duels won', data: positionRankOffensiveDuelsWonPerNinety },
      { name: 'Defensive duels won', data: positionRankDefensiveDuelsWonPerNinety },
      { name: 'Aerial duels won', data: positionRankAerialDuelsWonPerNinety },
      { name: 'Passes completed', data: positionRankPassesCompletedPerNinety },
      { name: 'Forward passes completed', data: positionRankForwardPassesCompletedPerNinety },
      { name: 'Short passes completed', data: positionRankShortPassesCompletedPerNinety },
      { name: 'Long passes completed', data: positionRankLongPassesCompletedPerNinety },
      { name: 'Accurate passes to final third', data: positionRankAccuratePassesToFinalThirdPerNinety },
      { name: 'Through passes completed', data: positionRankThroughPassesCompletedPerNinety },
      { name: 'Progressive passes completed', data: positionRankProgressivePassesCompletedPerNinety },
      { name: 'Saves', data: positionRankSavesPerNinety },
      { name: 'Possessions won - lost', data: positionRankPossessionsWonMinusLostPerNinety },
      { name: 'Progressive actions', data: positionRankProgressiveActionsPerNinety },
      { name: 'Duels won', data: positionRankDuelsWonPerNinety },
      { name: 'Non-penalty xG', data: positionRankNpxGPerNinety },
      { name: 'npxG/Shot', data: positionRankNpxGPerShot },
      { name: 'npxG + xA', data: positionRankNpxGAndxAPerNinety },
      { name: 'Touches', data: positionRankTouchesPerNinety },
      { name: 'Progressive action rate', data: positionRankProgressiveActionRate },
      { name: 'Progressive passes (PAdj)', data: positionRankProgressivePassesPAdj },
      { name: 'Ball carrying frequency', data: positionRankBallCarryingFrequency },
      { name: 'xG per 100 touches', data: positionRankXGPer100Touches },
      { name: 'Shot frequency', data: positionRankShotFrequency },
      { name: 'Dribbles per 100 touches', data: positionRankDribblesPerHundredTouches },
      { name: 'Goals per 100 touches', data: positionRankGoalsPer100Touches }
      ];
      
      const positionOrder = {
      'Goalkeeper': [
      'Prevented goals (PSxG-GA)',
      'Saves',
      'Save percentage %',
      'Clean sheets',
      'Shots conceded',
      'xG conceded',
      'Line exits',
      'Touches',
      'Passes',
      'Passes completed',
      'Pass completion %',
      'Short passes',
      'Short passes completed',
      'Short pass completion %',
      'Long passes',
      'Long passes completed',
      'Long pass accuracy %',
      'Passes to final third',
      'Progressive passes',
      'Pass completion (to final third) %',
      'Progressive pass accuracy %',
      'Through passes',
      'Defensive duels won',
      'Aerial duels won',
      'Possessions won',
      'Interceptions'
        ],
        'Centre-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Through passes completed',
          'Progressive carries',
          'Progressive actions',
          'Progressive action rate',
          'Ball carrying frequency',
          'Successful dribbles',
          'Key passes',
          'Assists',
          'Goals',
          'Headed goals'
        ],
        'Full-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Successful attacking actions',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Goals',
          'Expected goals (xG)',
          'Goals + assists',
          'xG + xA',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed'
        ],
        'Midfielder': [
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes',
          'Through passes completed',
          'Pre-assists',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'xA per 100 passes',
          'Key passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Headed goals',
          'Non-penalty xG',
          'Shots',
          'Shots on target',
          'npxG/Shot',
          'Goals - xG',
          'xG per 100 touches',
          'Goals per 100 touches',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Successful attacking actions',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Possession +/-',
          'Possessions won - lost',
          'Possessions won',
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked'
        ],
        'Winger': [
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Non-penalty xG',
          'Goals per 100 touches',
          'xG per 100 touches',
          'Headed goals',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Fouls suffered',
          'Successful attacking actions',
          'Duels won',
          'Duels won %',
          'Touches in box',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Long passes',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possession +/-',
          'Possessions won - lost',
          'Interceptions',
          'Defensive duels won',
          'Aerial duels won',
          'Aerial duels won %',
          'Possessions won'
        ],
        'Striker': [
          'Goals',
          'Non-penalty goals',
          'Goals per 100 touches',
          'Expected goals (xG)',
          'Non-penalty xG',
          'xG per 100 touches',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Headed goals',
          'Touches in box',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Accurate crosses',
          'Successful attacking actions',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribbles per 100 touches',
          'Fouls suffered',
          'Touches',
          'Duels won',
          'Duels won %',
          'Offensive duels',  
          'Offensive duels won',
          'Offensive duels won %',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possessions won',
          'Interceptions',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Defensive duels won'
        ]
        };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
    // Construct HTML for metrics
    const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData3 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position &&
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue3 = getMetricValueFunction(filteredData3, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth3 = 100 - (((playerRank - 1) / filteredData3.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth3 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth3); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth3 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth3}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue3}</span>                    
               
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');


// Construct player results HTML
    playerResults = `
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData3 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position &&
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping

const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };
    const metricsToInclude = {
  'Defensive duels': positionRankDuels,
  'Defensive duels won': positionRankDefensiveDuelsWonPerNinety,
  'Aerial duels': positionRankAerialDuels,
  'Aerial duels won': positionRankAerialDuelsWonPerNinety,
  'Defensive duel %': positionRankDefensiveDuelsWonPercentage,
  'Aerial duel %': positionRankAerialDuelsWonPercentage,
  'Possessions won': positionRankActions,
  'Tackles': positionRankSlidingTackles,
  'Tackles (PAdj)': positionRankPAdjSlidingTackles,
  'Interceptions': positionRankInterceptions,
  'Interceptions (PAdj)': positionRankPAdjInterceptions,
  'Shots blocked': positionRankShotsBlocked,
  'Duels': positionRankDuelsPerNinety,
  'Duels won': positionRankDuelsWonPerNinety,
  'Duel %': positionRankDuelsWonPercentage,
  'Poss won-lost': positionRankPossessionsWonMinusLostPerNinety,
  'Poss +/-': positionRankPossessionPlusMinus,
  'Touches': positionRankTouchesPerNinety,
  'Touches in box': positionRankTouchesInBox,
  'Goals': positionRankGoals,
  'Non-penalty goals': positionRankNonPenaltyGoals,
  'Expected goals': positionRankXG,
  'Headed goals': positionRankHeadGoals,
  'Shots': positionRankShots,
  'SoT %': positionRankShotsOnTargetPercentage,
  'Shots on target': positionRankShotsOnTargetPerNinety,
  'Goals - xG': positionRankGoalsMinusxGPerNinety,
  'Non-penalty xG': positionRankNpxGPerNinety,
  'Goal per 100T': positionRankGoalsPer100Touches,
  'xG per 100T': positionRankXGPer100Touches,
  'Shot frequency': positionRankShotFrequency,
  'Goal conversion': positionRankGoalConversionPercentage,
  'npxG/Shot': positionRankNpxGPerShot,
  'xG + xA': positionRankXGAndxAPerNinety,
  'npxG + xA': positionRankNpxGAndxAPerNinety,
  'Goals + assists': positionRankGoalsAndAssistsPerNinety,
  'NPG+A': positionRankNpGoalsAndAssistsPerNinety,
  'Assists': positionRankAssists,
  'Expected assists': positionRankXA,
  'Key passes': positionRankKeyPasses,
  'Shot assists': positionRankShotAssists,
  'xA per 100 passes': positionRankXAPer100Passes,
  'Creativity ratio': positionRankChanceCreationRatio,
  'Deep completions': positionRankDeepCompletions,
  'Crosses': positionRankCrosses,
  'Accurate crosses': positionRankAccurateCrossesPerNinety,
  'Cross %': positionRankAccurateCrossesPercentage,
  'Crosses to box': positionRankCrossesToGoalieBox,
  'Passes': positionRankPasses,
  'Passes completed': positionRankPassesCompletedPerNinety,
  'Forward passes': positionRankForwardPasses,
  'Fwd passes comp': positionRankForwardPassesCompletedPerNinety,
  'Short passes': positionRankShortMediumPasses,
  'Short passes comp': positionRankShortPassesCompletedPerNinety,
  'Long passes': positionRankLongPasses,
  'Long passes comp': positionRankLongPassesCompletedPerNinety,
  'Progressive passes': positionRankProgressivePasses,
  'Prog passes comp': positionRankProgressivePassesCompletedPerNinety,
  'Prog passes (PAdj)': positionRankProgressivePassesPAdj,
  'Passes to fin 3rd': positionRankPassesToFinalThird,
  'Passes to pen box': positionRankPassesToPenaltyArea,
  'Through passes': positionRankThroughPasses,
  'Through passes comp': positionRankThroughPassesCompletedPerNinety,
  'Pass %': positionRankAccuratePassesPercentage,
  'Forward pass %': positionRankAccurateForwardPassesPercentage,
  'Short pass %': positionRankAccurateShortMediumPassesPercentage,
  'Progressive pass %': positionRankAccurateProgressivePassesPercentage,
  'Long pass %': positionRankAccurateLongPassesPercentage,
  'Pass to fin 3rd %': positionRankAccuratePassesToFinalThirdPercentage,
  'Pass to pen box %': positionRankAccuratePassesToPenaltyAreaPercentage,
  'Pre-assists': positionRankPreAssistsPerNinety,
  'Forward pass ratio': positionRankForwardPassRatio,
  'Progressive actions': positionRankProgressiveActionsPerNinety,
  'Prog action rate': positionRankProgressiveActionRate,
  'Progressive carries': positionRankProgressiveRuns,
  'Carrying frequency': positionRankBallCarryingFrequency,
  'Accelerations': positionRankAccelerations,
  'Offensive duels': positionRankOffensiveDuels,
  'Offensive duels won': positionRankOffensiveDuelsWonPerNinety,
  'Offensive duel %': positionRankOffensiveDuelsWonPercentage,
  'Dribbles attempted': positionRankDribbles,
  'Successful dribbles': positionRankSuccessfulDribblesPerNinety,
  'Dribble success %': positionRankSuccessfulDribblesPercentage,
  'Dribbles per 100T': positionRankDribblesPerHundredTouches,
  'Attacking actions': positionRankSuccessfulAttackingActions,
  'Fouls suffered': positionRankFoulsSuffered,
  'Save %': positionRankSaveRatePercentage,
  'Saves': positionRankSavesPerNinety,
  'Shots conceded': positionRankShotsAgainst,
  'Clean sheets': positionRankCleanSheets,
  'xG conceded': positionRankXGAgainst,
  'Prevented goals': positionRankPreventedGoals,
  'Line exits': positionRankExits,
};

// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData3.length;
});

document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs All Leagues ${titleSuffix} ${selectedPlayer.position}s, per 90</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;

    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData3.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}
     else if (selectedSection === 'positionWithMinutes') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: positionRankActionsWithMinutes },
        { name: 'Defensive duels', data: positionRankDuelsWithMinutes },
        { name: 'Aerial duels', data: positionRankAerialDuelsWithMinutes },
        { name: 'Sliding tackles', data: positionRankSlidingTacklesWithMinutes },
        { name: 'Sliding tackles (PAdj)', data: positionRankPAdjSlidingTacklesWithMinutes },
        { name: 'Shots blocked', data: positionRankShotsBlockedWithMinutes },
        { name: 'Interceptions', data: positionRankInterceptionsWithMinutes },
        { name: 'Interceptions (PAdj)', data: positionRankPAdjInterceptionsWithMinutes },
        { name: 'Successful attacking actions', data: positionRankSuccessfulAttackingActionsWithMinutes },
        { name: 'Goals', data: positionRankGoalsWithMinutes },
        { name: 'Non-penalty goals', data: positionRankNonPenaltyGoalsWithMinutes },
        { name: 'Expected goals (xG)', data: positionRankXGWithMinutes },
        { name: 'Headed goals', data: positionRankHeadGoalsWithMinutes },
        { name: 'Shots', data: positionRankShotsWithMinutes },
        { name: 'Assists', data: positionRankAssistsWithMinutes },
        { name: 'Crosses', data: positionRankCrossesWithMinutes },
        { name: 'Crosses to box', data: positionRankCrossesToGoalieBoxWithMinutes },
        { name: 'Dribbles attempted', data: positionRankDribblesWithMinutes },
        { name: 'Offensive duels', data: positionRankOffensiveDuelsWithMinutes },
        { name: 'Touches in box', data: positionRankTouchesInBoxWithMinutes },
        { name: 'Progressive carries', data: positionRankProgressiveRunsWithMinutes },
        { name: 'Accelerations', data: positionRankAccelerationsWithMinutes },
        { name: 'Fouls suffered', data: positionRankFoulsSufferedWithMinutes },
        { name: 'Passes', data: positionRankPassesWithMinutes },
        { name: 'Forward passes', data: positionRankForwardPassesWithMinutes },
        { name: 'Short passes', data: positionRankShortMediumPassesWithMinutes },
        { name: 'Long passes', data: positionRankLongPassesWithMinutes },
        { name: 'Expected assists (xA)', data: positionRankXAWithMinutes },
        { name: 'Shot assists', data: positionRankShotAssistsWithMinutes },
        { name: 'Key passes', data: positionRankKeyPassesWithMinutes },
        { name: 'Passes to final third', data: positionRankPassesToFinalThirdWithMinutes },
        { name: 'Passes to penalty box', data: positionRankPassesToPenaltyAreaWithMinutes },
        { name: 'Through passes', data: positionRankThroughPassesWithMinutes },
        { name: 'Deep completions', data: positionRankDeepCompletionsWithMinutes },
        { name: 'Progressive passes', data: positionRankProgressivePassesWithMinutes },
        { name: 'Shots conceded', data: positionRankShotsAgainstWithMinutes },
        { name: 'Clean sheets', data: positionRankCleanSheetsWithMinutes },
        { name: 'xG conceded', data: positionRankXGAgainstWithMinutes },
        { name: 'Prevented goals (PSxG-GA)', data: positionRankPreventedGoalsWithMinutes },
        { name: 'Line exits', data: positionRankExitsWithMinutes },
        { name: 'Defensive duels won %', data: positionRankDefensiveDuelsWonPercentageWithMinutes },
        { name: 'Aerial duels won %', data: positionRankAerialDuelsWonPercentageWithMinutes },
        { name: 'Shots on target %', data: positionRankShotsOnTargetPercentageWithMinutes },
        { name: 'Goal conversion %', data: positionRankGoalConversionPercentageWithMinutes },
        { name: 'Cross accuracy %', data: positionRankAccurateCrossesPercentageWithMinutes },
        { name: 'Dribble success rate %', data: positionRankSuccessfulDribblesPercentageWithMinutes },
        { name: 'Offensive duels won %', data: positionRankOffensiveDuelsWonPercentageWithMinutes },
        { name: 'Pass completion %', data: positionRankAccuratePassesPercentageWithMinutes },
        { name: 'Forward pass completion %', data: positionRankAccurateForwardPassesPercentageWithMinutes },
        { name: 'Short pass completion %', data: positionRankAccurateShortMediumPassesPercentageWithMinutes },
        { name: 'Long pass accuracy %', data: positionRankAccurateLongPassesPercentageWithMinutes },
        { name: 'Pass completion (to final third) %', data: positionRankAccuratePassesToFinalThirdPercentageWithMinutes },
        { name: 'Pass completion (to penalty box) %', data: positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
        { name: 'Progressive pass accuracy %', data: positionRankAccurateProgressivePassesPercentageWithMinutes },
        { name: 'Save percentage %', data: positionRankSaveRatePercentageWithMinutes },
      { name: 'Pre-assists', data: positionRankPreAssistsPerNinetyWithMinutes },
      { name: 'Duels', data: positionRankDuelsPerNinetyWithMinutes },
      { name: 'Duels won %', data: positionRankDuelsWonPercentageWithMinutes },
      { name: 'Possession +/-', data: positionRankPossessionPlusMinusWithMinutes },
      { name: 'Forward pass ratio', data: positionRankForwardPassRatioWithMinutes },
      { name: 'xA per 100 passes', data: positionRankXAPer100PassesWithMinutes },
      { name: 'Chance creation ratio', data: positionRankChanceCreationRatioWithMinutes },
      { name: 'Goals + assists', data: positionRankGoalsAndAssistsPerNinetyWithMinutes },
      { name: 'Non-penalty goals + assists', data: positionRankNpGoalsAndAssistsPerNinetyWithMinutes },
      { name: 'xG + xA', data: positionRankXGAndxAPerNinetyWithMinutes },
      { name: 'Goals - xG', data: positionRankGoalsMinusxGPerNinetyWithMinutes },
      { name: 'Successful dribbles', data: positionRankSuccessfulDribblesPerNinetyWithMinutes },
      { name: 'Shots on target', data: positionRankShotsOnTargetPerNinetyWithMinutes },
      { name: 'Accurate crosses', data: positionRankAccurateCrossesPerNinetyWithMinutes },
      { name: 'Offensive duels won', data: positionRankOffensiveDuelsWonPerNinetyWithMinutes },
      { name: 'Defensive duels won', data: positionRankDefensiveDuelsWonPerNinetyWithMinutes },
      { name: 'Aerial duels won', data: positionRankAerialDuelsWonPerNinetyWithMinutes },
      { name: 'Passes completed', data: positionRankPassesCompletedPerNinetyWithMinutes },
      { name: 'Forward passes completed', data: positionRankForwardPassesCompletedPerNinetyWithMinutes },
      { name: 'Short passes completed', data: positionRankShortPassesCompletedPerNinetyWithMinutes },
      { name: 'Long passes completed', data: positionRankLongPassesCompletedPerNinetyWithMinutes },
      { name: 'Passes to final third', data: positionRankPassesToFinalThirdWithMinutes },
      { name: 'Passes to penalty box', data: positionRankPassesToPenaltyAreaWithMinutes },
      { name: 'Through passes completed', data: positionRankThroughPassesCompletedPerNinetyWithMinutes },
      { name: 'Progressive passes completed', data: positionRankProgressivePassesCompletedPerNinetyWithMinutes },
      { name: 'Saves', data: positionRankSavesPerNinetyWithMinutes },
      { name: 'Possessions won - lost', data: positionRankPossessionsWonMinusLostPerNinetyWithMinutes },
      { name: 'Progressive actions', data: positionRankProgressiveActionsPerNinetyWithMinutes },
      { name: 'Duels won', data: positionRankDuelsWonPerNinetyWithMinutes },
      { name: 'Non-penalty xG', data: positionRankNpxGPerNinetyWithMinutes },
      { name: 'npxG/Shot', data: positionRankNpxGPerShotWithMinutes },
      { name: 'npxG + xA', data: positionRankNpxGAndxAPerNinetyWithMinutes },
      { name: 'Touches', data: positionRankTouchesPerNinetyWithMinutes },
      { name: 'Progressive action rate', data: positionRankProgressiveActionRateWithMinutes },
      { name: 'Progressive passes (PAdj)', data: positionRankProgressivePassesPAdjWithMinutes },
      { name: 'Ball carrying frequency', data: positionRankBallCarryingFrequencyWithMinutes },
      { name: 'xG per 100 touches', data: positionRankXGPer100TouchesWithMinutes },
      { name: 'Shot frequency', data: positionRankShotFrequencyWithMinutes },
      { name: 'Dribbles per 100 touches', data: positionRankDribblesPerHundredTouchesWithMinutes },
      { name: 'Goals per 100 touches', data: positionRankGoalsPer100TouchesWithMinutes }
      ];
      
      const positionOrder = {
      'Goalkeeper': [
      'Prevented goals (PSxG-GA)',
      'Saves',
      'Save percentage %',
      'Clean sheets',
      'Shots conceded',
      'xG conceded',
      'Line exits',
      'Touches',
      'Passes',
      'Passes completed',
      'Pass completion %',
      'Short passes',
      'Short passes completed',
      'Short pass completion %',
      'Long passes',
      'Long passes completed',
      'Long pass accuracy %',
      'Passes to final third',
      'Progressive passes',
      'Pass completion (to final third) %',
      'Progressive pass accuracy %',
      'Through passes',
      'Defensive duels won',
      'Aerial duels won',
      'Possessions won',
      'Interceptions'
        ],
        'Centre-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Through passes completed',
          'Progressive carries',
          'Progressive actions',
          'Progressive action rate',
          'Ball carrying frequency',
          'Successful dribbles',
          'Key passes',
          'Assists',
          'Goals',
          'Headed goals'
        ],
        'Full-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Successful attacking actions',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Goals',
          'Expected goals (xG)',
          'Goals + assists',
          'xG + xA',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed'
        ],
        'Midfielder': [
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes',
          'Through passes completed',
          'Pre-assists',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'xA per 100 passes',
          'Key passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Headed goals',
          'Non-penalty xG',
          'Shots',
          'Shots on target',
          'npxG/Shot',
          'Goals - xG',
          'xG per 100 touches',
          'Goals per 100 touches',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Successful attacking actions',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Possession +/-',
          'Possessions won - lost',
          'Possessions won',
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked'
        ],
        'Winger': [
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Non-penalty xG',
          'Goals per 100 touches',
          'xG per 100 touches',
          'Headed goals',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Fouls suffered',
          'Successful attacking actions',
          'Duels won',
          'Duels won %',
          'Touches in box',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Long passes',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possession +/-',
          'Possessions won - lost',
          'Interceptions',
          'Defensive duels won',
          'Aerial duels won',
          'Aerial duels won %',
          'Possessions won'
        ],
        'Striker': [
          'Goals',
          'Non-penalty goals',
          'Goals per 100 touches',
          'Expected goals (xG)',
          'Non-penalty xG',
          'xG per 100 touches',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Headed goals',
          'Touches in box',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Accurate crosses',
          'Successful attacking actions',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribbles per 100 touches',
          'Fouls suffered',
          'Touches',
          'Duels won',
          'Duels won %',
          'Offensive duels',  
          'Offensive duels won',
          'Offensive duels won %',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possessions won',
          'Interceptions',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Defensive duels won'
        ]
        };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
    // Construct HTML for metrics
    const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData4 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position &&
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue4 = getMetricValueFunction(filteredData4, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth4 = 100 - (((playerRank - 1) / filteredData4.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth4 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth4); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth4 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth4}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue4}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');


// Construct player results HTML
    playerResults = `
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData4 = parseCSV(csvData).filter(player => player.position === selectedPlayer.position &&
    (!selectedAge || player.age <= selectedAge) );
   
    
    const exclusionMapping = {
        'Goalkeeper': [
        'Defensive duels',
        'Tackles',
        'Tackles (PAdj)',
        'Shots blocked',
        'Interceptions',
        'Interceptions (PAdj)',
        'Attacking actions',
        'Goals',
        'Non-penalty goals',
        'Expected goals',
        'Headed goals',
        'Shots',
        'Assists',
        'Crosses',
        'Crosses to box',
        'Dribbles attempted',
        'Offensive duels',
        'Touches in box',
        'Progressive carries',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Expected assists',
        'Shot assists',
        'Key passes',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Progressive passes',
        'Shots conceded',
        'xG conceded',
        'Defensive duel %',
        'Aerial duel %',
        'SoT %',
        'Goal conversion',
        'Cross %',
        'Dribble success %',
        'Offensive duel %',
        'Forward pass %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'Goals + assists',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Successful dribbles',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Poss won-lost',
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Prog passes (PAdj)',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T',
        'Short passes comp', 'Long passes comp', 'Possessions won'
        ],
        'Centre-back': [
        'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
        'Possessions won',
        'Tackles',
        'Shots blocked',
        'Interceptions',
        'Attacking actions',
        'Goals',
        'Non-penalty goals',
        'Expected goals',
        'Headed goals',
        'Shots',
        'Assists',
        'Crosses',
        'Crosses to box',
        'Dribbles attempted',
        'Offensive duels',
        'Touches in box',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Expected assists',
        'Shot assists',
        'Key passes',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Shots conceded',
        'Clean sheets',
        'xG conceded',
        'Prevented goals',
        'Line exits',
        'Goal conversion',
        'Cross %',
        'Dribble success %',
        'Offensive duel %',
        'Forward pass %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Save %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'Goals + assists',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Successful dribbles',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Saves',
        'Poss won-lost',
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Prog passes (PAdj)',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T'
        ], 
        'Full-back': [
        'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
        'Defensive duels',
        'Tackles',
        'Shots blocked',
        'Interceptions',
        'Goals',
        'Non-penalty goals',
        'Expected goals',
        'Headed goals',
        'Shots',
        'Assists',
        'Crosses to box',
        'Dribbles attempted',
        'Offensive duels',
        'Touches in box',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Shot assists',
        'Key passes',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Shots conceded',
        'Clean sheets',
        'xG conceded',
        'Prevented goals',
        'Line exits',
        'SoT %',
        'Goal conversion',
        'Dribble success %',
        'Offensive duel %',
        'Forward pass %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Save %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'Goals + assists',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Successful dribbles',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Short passes comp',
        'Long passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Saves',
        'Poss won-lost',
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Prog passes (PAdj)',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T'
        ]
        ,
        'Midfielder': [
        'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
        'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
        'Non-penalty goals',
        'Expected goals',
        'Headed goals',
        'Shots',
        'Assists',
        'Crosses',
        'Crosses to box',
        'Dribbles attempted',
        'Offensive duels',
        'Touches in box',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Shot assists',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Shots conceded',
        'Clean sheets',
        'xG conceded',
        'Prevented goals',
        'Line exits',
        'SoT %',
        'Goal conversion',
        'Dribble success %',
        'Offensive duel %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Save %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'Goals + assists',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Successful dribbles',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Short passes comp',
        'Long passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Saves',
        'Poss won-lost',
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T'
        ]
        ,
        'Winger': [
        'Possessions won', 'Progressive passes',
        'Poss won-lost',
        'Tackles',
        'Tackles (PAdj)',
        'Shots blocked',
        'Interceptions',
        'Interceptions (PAdj)',
        'Non-penalty goals',
        'Headed goals',
        'Shots',
        'Crosses to box',
        'Offensive duels',
        'Touches in box',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Shot assists',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Shots conceded',
        'Clean sheets',
        'xG conceded',
        'Prevented goals',
        'Line exits',
        'SoT %',
        'Goal conversion',
        'Offensive duel %',
        'Forward pass %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Save %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Short passes comp',
        'Long passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Saves',
        'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Prog passes (PAdj)',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T'
        ],
        'Striker': [
        'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
        'Possessions won',
        'Defensive duels',
        'Tackles',
        'Tackles (PAdj)',
        'Shots blocked',
        'Interceptions',
        'Interceptions (PAdj)',
        'Headed goals',
        'Shots',
        'Crosses to box',
        'Offensive duels',
        'Touches in box',
        'Accelerations',
        'Fouls suffered',
        'Forward passes',
        'Shot assists',
        'Passes to fin 3rd',
        'Passes to pen box',
        'Through passes',
        'Deep completions',
        'Shots conceded',
        'Clean sheets',
        'xG conceded',
        'Prevented goals',
        'Line exits',
        'Dribble success %',
        'Offensive duel %',
        'Forward pass %',
        'Pass to fin 3rd %',
        'Pass to pen box %',
        'Progressive pass %',
        'Save %',
        'Pre-assists',
        'Duels',
        'Duel %',
        'Poss +/-',
        'Forward pass ratio',
        'xA per 100 passes',
        'Creativity ratio',
        'NPG+A',
        'xG + xA',
        'Goals - xG',
        'Shots on target',
        'Accurate crosses',
        'Offensive duels won',
        'Defensive duels won',
        'Aerial duels won',
        'Passes completed',
        'Fwd passes comp',
        'Short passes comp',
        'Long passes comp',
        'Through passes comp',
        'Prog passes comp',
        'Saves',
        'Poss won-lost',
        'Progressive actions',
        'Duels won',
        'Non-penalty xG',
        'npxG/Shot',
        'npxG + xA',
        'Touches',
        'Prog action rate',
        'Prog passes (PAdj)',
        'Carrying frequency',
        'xG per 100T',
        'Shot frequency',
        'Dribbles per 100T',
        'Goal per 100T'
        ]
        };
const metricsToInclude = {
  'Defensive duels': positionRankDuelsWithMinutes,
  'Defensive duels won': positionRankDefensiveDuelsWonPerNinetyWithMinutes,
  'Aerial duels': positionRankAerialDuelsWithMinutes,
  'Aerial duels won': positionRankAerialDuelsWonPerNinetyWithMinutes,
  'Defensive duel %': positionRankDefensiveDuelsWonPercentageWithMinutes,
  'Aerial duel %': positionRankAerialDuelsWonPercentageWithMinutes,
  'Possessions won': positionRankActionsWithMinutes,
  'Tackles': positionRankSlidingTacklesWithMinutes,
  'Tackles (PAdj)': positionRankPAdjSlidingTacklesWithMinutes,
  'Interceptions': positionRankInterceptionsWithMinutes,
  'Interceptions (PAdj)': positionRankPAdjInterceptionsWithMinutes,
  'Shots blocked': positionRankShotsBlockedWithMinutes,
  'Duels': positionRankDuelsPerNinetyWithMinutes,
  'Duels won': positionRankDuelsWonPerNinetyWithMinutes,
  'Duel %': positionRankDuelsWonPercentageWithMinutes,
  'Poss won-lost': positionRankPossessionsWonMinusLostPerNinetyWithMinutes,
  'Poss +/-': positionRankPossessionPlusMinusWithMinutes,
  'Touches': positionRankTouchesPerNinetyWithMinutes,
  'Touches in box': positionRankTouchesInBoxWithMinutes,
  'Goals': positionRankGoalsWithMinutes,
  'Non-penalty goals': positionRankNonPenaltyGoalsWithMinutes,
  'Expected goals': positionRankXGWithMinutes,
  'Headed goals': positionRankHeadGoalsWithMinutes,
  'Shots': positionRankShotsWithMinutes,
  'SoT %': positionRankShotsOnTargetPercentageWithMinutes,
  'Shots on target': positionRankShotsOnTargetPerNinetyWithMinutes,
  'Goals - xG': positionRankGoalsMinusxGPerNinetyWithMinutes,
  'Non-penalty xG': positionRankNpxGPerNinetyWithMinutes,
  'Goal per 100T': positionRankGoalsPer100TouchesWithMinutes,
  'xG per 100T': positionRankXGPer100TouchesWithMinutes,
  'Shot frequency': positionRankShotFrequencyWithMinutes,
  'Goal conversion': positionRankGoalConversionPercentageWithMinutes,
  'npxG/Shot': positionRankNpxGPerShotWithMinutes,
  'xG + xA': positionRankXGAndxAPerNinetyWithMinutes,
  'npxG + xA': positionRankNpxGAndxAPerNinetyWithMinutes,
  'Goals + assists': positionRankGoalsAndAssistsPerNinetyWithMinutes,
  'NPG+A': positionRankNpGoalsAndAssistsPerNinetyWithMinutes,
  'Assists': positionRankAssistsWithMinutes,
  'Expected assists': positionRankXAWithMinutes,
  'Key passes': positionRankKeyPassesWithMinutes,
  'Shot assists': positionRankShotAssistsWithMinutes,
  'xA per 100 passes': positionRankXAPer100PassesWithMinutes,
  'Creativity ratio': positionRankChanceCreationRatioWithMinutes,
  'Deep completions': positionRankDeepCompletionsWithMinutes,
  'Crosses': positionRankCrossesWithMinutes,
  'Accurate crosses': positionRankAccurateCrossesPerNinetyWithMinutes,
  'Cross %': positionRankAccurateCrossesPercentageWithMinutes,
  'Crosses to box': positionRankCrossesToGoalieBoxWithMinutes,
  'Passes': positionRankPassesWithMinutes,
  'Passes completed': positionRankPassesCompletedPerNinetyWithMinutes,
  'Forward passes': positionRankForwardPassesWithMinutes,
  'Fwd passes comp': positionRankForwardPassesCompletedPerNinetyWithMinutes,
  'Short passes': positionRankShortMediumPassesWithMinutes,
  'Short passes comp': positionRankShortPassesCompletedPerNinetyWithMinutes,
  'Long passes': positionRankLongPassesWithMinutes,
  'Long passes comp': positionRankLongPassesCompletedPerNinetyWithMinutes,
  'Progressive passes': positionRankProgressivePassesWithMinutes,
  'Prog passes comp': positionRankProgressivePassesCompletedPerNinetyWithMinutes,
  'Prog passes (PAdj)': positionRankProgressivePassesPAdjWithMinutes,
  'Passes to fin 3rd': positionRankPassesToFinalThirdWithMinutes,
  'Passes to pen box': positionRankPassesToPenaltyAreaWithMinutes,
  'Through passes': positionRankThroughPassesWithMinutes,
  'Through passes comp': positionRankThroughPassesCompletedPerNinetyWithMinutes,
  'Pass %': positionRankAccuratePassesPercentageWithMinutes,
  'Forward pass %': positionRankAccurateForwardPassesPercentageWithMinutes,
  'Short pass %': positionRankAccurateShortMediumPassesPercentageWithMinutes,
  'Progressive pass %': positionRankAccurateProgressivePassesPercentageWithMinutes,
  'Long pass %': positionRankAccurateLongPassesPercentageWithMinutes,
  'Pass to fin 3rd %': positionRankAccuratePassesToFinalThirdPercentageWithMinutes,
  'Pass to pen box %': positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
  'Pre-assists': positionRankPreAssistsPerNinetyWithMinutes,
  'Forward pass ratio': positionRankForwardPassRatioWithMinutes,
  'Progressive actions': positionRankProgressiveActionsPerNinetyWithMinutes,
  'Prog action rate': positionRankProgressiveActionRateWithMinutes,
  'Progressive carries': positionRankProgressiveRunsWithMinutes,
  'Carrying frequency': positionRankBallCarryingFrequencyWithMinutes,
  'Accelerations': positionRankAccelerationsWithMinutes,
  'Offensive duels': positionRankOffensiveDuelsWithMinutes,
  'Offensive duels won': positionRankOffensiveDuelsWonPerNinetyWithMinutes,
  'Offensive duel %': positionRankOffensiveDuelsWonPercentageWithMinutes,
  'Dribbles attempted': positionRankDribblesWithMinutes,
  'Successful dribbles': positionRankSuccessfulDribblesPerNinetyWithMinutes,
  'Dribble success %': positionRankSuccessfulDribblesPercentageWithMinutes,
  'Dribbles per 100T': positionRankDribblesPerHundredTouchesWithMinutes,
  'Attacking actions': positionRankSuccessfulAttackingActionsWithMinutes,
  'Fouls suffered': positionRankFoulsSufferedWithMinutes,
  'Save %': positionRankSaveRatePercentageWithMinutes,
  'Saves': positionRankSavesPerNinetyWithMinutes,
  'Shots conceded': positionRankShotsAgainstWithMinutes,
  'Clean sheets': positionRankCleanSheetsWithMinutes,
  'xG conceded': positionRankXGAgainstWithMinutes,
  'Prevented goals': positionRankPreventedGoalsWithMinutes,
  'Line exits': positionRankExitsWithMinutes,
};


// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData4.length;
});

document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs All Leagues ${titleSuffix} ${selectedPlayer.position}s</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;
    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData4.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}


     else if (selectedSection === 'league') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: leagueRankActions },
        { name: 'Defensive duels', data: leagueRankDuels },
        { name: 'Aerial duels', data: leagueRankAerialDuels },
        { name: 'Sliding tackles', data: leagueRankSlidingTackles },
        { name: 'Sliding tackles (PAdj)', data: leagueRankPAdjSlidingTackles },
        { name: 'Shots blocked', data: leagueRankShotsBlocked },
        { name: 'Interceptions', data: leagueRankInterceptions },
        { name: 'Interceptions (PAdj)', data: leagueRankPAdjInterceptions },
        { name: 'Successful attacking actions', data: leagueRankSuccessfulAttackingActions },
        { name: 'Goals', data: leagueRankGoals },
        { name: 'Non-penalty goals', data: leagueRankNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: leagueRankXG },
        { name: 'Headed goals', data: leagueRankHeadGoals },
        { name: 'Shots', data: leagueRankShots },
        { name: 'Assists', data: leagueRankAssists },
        { name: 'Crosses', data: leagueRankCrosses },
        { name: 'Crosses to box', data: leagueRankCrossesToGoalieBox },
        { name: 'Dribbles attempted', data: leagueRankDribbles },
        { name: 'Offensive duels', data: leagueRankOffensiveDuels },
        { name: 'Touches in box', data: leagueRankTouchesInBox },
        { name: 'Progressive carries', data: leagueRankProgressiveRuns },
        { name: 'Accelerations', data: leagueRankAccelerations },
        { name: 'Fouls suffered', data: leagueRankFoulsSuffered },
        { name: 'Passes', data: leagueRankPasses },
        { name: 'Forward passes', data: leagueRankForwardPasses },
        { name: 'Short passes', data: leagueRankShortMediumPasses },
        { name: 'Long passes', data: leagueRankLongPasses },
        { name: 'Expected assists (xA)', data: leagueRankXA },
        { name: 'Shot assists', data: leagueRankShotAssists },
        { name: 'Key passes', data: leagueRankKeyPasses },
        { name: 'Passes to final third', data: leagueRankPassesToFinalThird },
        { name: 'Passes to penalty box', data: leagueRankPassesToPenaltyArea },
        { name: 'Through passes', data: leagueRankThroughPasses },
        { name: 'Deep completions', data: leagueRankDeepCompletions },
        { name: 'Progressive passes', data: leagueRankProgressivePasses },
        { name: 'Shots conceded', data: leagueRankShotsAgainst },
        { name: 'Clean sheets', data: leagueRankCleanSheets },
        { name: 'xG conceded', data: leagueRankXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: leagueRankPreventedGoals },
        { name: 'Line exits', data: leagueRankExits },
        { name: 'Defensive duels won %', data: leagueRankDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: leagueRankAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: leagueRankShotsOnTargetPercentage },
        { name: 'Goal conversion %', data: leagueRankGoalConversionPercentage },
        { name: 'Cross accuracy %', data: leagueRankAccurateCrossesPercentage },
        { name: 'Dribble success rate %', data: leagueRankSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: leagueRankOffensiveDuelsWonPercentage },
        { name: 'Pass completion %', data: leagueRankAccuratePassesPercentage },
        { name: 'Forward pass completion %', data: leagueRankAccurateForwardPassesPercentage },
        { name: 'Short pass completion %', data: leagueRankAccurateShortMediumPassesPercentage },
        { name: 'Long pass accuracy %', data: leagueRankAccurateLongPassesPercentage },
        { name: 'Pass completion (to final third) %', data: leagueRankAccuratePassesToFinalThirdPercentage },
        { name: 'Pass completion (to penalty box) %', data: leagueRankAccuratePassesToPenaltyAreaPercentage },
        { name: 'Progressive pass accuracy %', data: leagueRankAccurateProgressivePassesPercentage },
        { name: 'Save percentage %', data: leagueRankSaveRatePercentage },
        { name: 'Pre-assists', data: leagueRankPreAssistsPerNinety },
      { name: 'Duels', data: leagueRankDuelsPerNinety },
      { name: 'Duels won %', data: leagueRankDuelsWonPercentage },
      { name: 'Possession +/-', data: leagueRankPossessionPlusMinus },
      { name: 'Forward pass ratio', data: leagueRankForwardPassRatio },
      { name: 'xA per 100 passes', data: leagueRankXAPer100Passes },
      { name: 'Chance creation ratio', data: leagueRankChanceCreationRatio },
      { name: 'Goals + assists', data: leagueRankGoalsAndAssistsPerNinety },
      { name: 'Non-penalty goals + assists', data: leagueRankNpGoalsAndAssistsPerNinety },
      { name: 'xG + xA', data: leagueRankXGAndxAPerNinety },
      { name: 'Goals - xG', data: leagueRankGoalsMinusxGPerNinety },
      { name: 'Successful dribbles', data: leagueRankSuccessfulDribblesPerNinety },
      { name: 'Shots on target', data: leagueRankShotsOnTargetPerNinety },
      { name: 'Accurate crosses', data: leagueRankAccurateCrossesPerNinety },
      { name: 'Offensive duels won', data: leagueRankOffensiveDuelsWonPerNinety },
      { name: 'Defensive duels won', data: leagueRankDefensiveDuelsWonPerNinety },
      { name: 'Aerial duels won', data: leagueRankAerialDuelsWonPerNinety },
      { name: 'Passes completed', data: leagueRankPassesCompletedPerNinety },
      { name: 'Forward passes completed', data: leagueRankForwardPassesCompletedPerNinety },
      { name: 'Short passes completed', data: leagueRankShortPassesCompletedPerNinety },
      { name: 'Long passes completed', data: leagueRankLongPassesCompletedPerNinety },
      { name: 'Passes to final third', data: leagueRankPassesToFinalThird },
      { name: 'Passes to penalty box', data: leagueRankPassesToPenaltyArea },
      { name: 'Through passes completed', data: leagueRankThroughPassesCompletedPerNinety },
      { name: 'Progressive passes completed', data: leagueRankProgressivePassesCompletedPerNinety },
      { name: 'Saves', data: leagueRankSavesPerNinety },
      { name: 'Possessions won - lost', data: leagueRankPossessionsWonMinusLostPerNinety },
      { name: 'Progressive actions', data: leagueRankProgressiveActionsPerNinety },
      { name: 'Duels won', data: leagueRankDuelsWonPerNinety },
      { name: 'Non-penalty xG', data: leagueRankNpxGPerNinety },
      { name: 'npxG/Shot', data: leagueRankNpxGPerShot },
      { name: 'npxG + xA', data: leagueRankNpxGAndxAPerNinety },
      { name: 'Touches', data: leagueRankTouchesPerNinety },
      { name: 'Progressive action rate', data: leagueRankProgressiveActionRate },
      { name: 'Progressive passes (PAdj)', data: leagueRankProgressivePassesPAdj },
      { name: 'Ball carrying frequency', data: leagueRankBallCarryingFrequency },
      { name: 'xG per 100 touches', data: leagueRankXGPer100Touches },
      { name: 'Shot frequency', data: leagueRankShotFrequency },
      { name: 'Dribbles per 100 touches', data: leagueRankDribblesPerHundredTouches },
      { name: 'Goals per 100 touches', data: leagueRankGoalsPer100Touches }
        ];
      
      const positionOrder = {
      'Goalkeeper': [
      'Prevented goals (PSxG-GA)',
      'Saves',
      'Save percentage %',
      'Clean sheets',
      'Shots conceded',
      'xG conceded',
      'Line exits',
      'Touches',
      'Passes',
      'Passes completed',
      'Pass completion %',
      'Short passes',
      'Short passes completed',
      'Short pass completion %',
      'Long passes',
      'Long passes completed',
      'Long pass accuracy %',
      'Passes to final third',
      'Progressive passes',
      'Pass completion (to final third) %',
      'Progressive pass accuracy %',
      'Through passes',
      'Defensive duels won',
      'Aerial duels won',
      'Possessions won',
      'Interceptions'
        ],
        'Centre-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Through passes completed',
          'Progressive carries',
          'Progressive actions',
          'Progressive action rate',
          'Ball carrying frequency',
          'Successful dribbles',
          'Key passes',
          'Assists',
          'Goals',
          'Headed goals'
        ],
        'Full-back': [
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked',
          'Possessions won',
          'Possessions won - lost',
          'Possession +/-',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Successful attacking actions',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Goals',
          'Expected goals (xG)',
          'Goals + assists',
          'xG + xA',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed'
        ],
        'Midfielder': [
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Forward passes',
          'Forward passes completed',
          'Forward pass completion %',
          'Forward pass ratio',
          'Short passes',
          'Short passes completed',
          'Short pass completion %',
          'Long passes',
          'Long passes completed',
          'Long pass accuracy %',
          'Progressive passes',
          'Progressive passes completed',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Accurate passes to final third',
          'Pass completion (to final third) %',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes',
          'Through passes completed',
          'Pre-assists',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'xA per 100 passes',
          'Key passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Headed goals',
          'Non-penalty xG',
          'Shots',
          'Shots on target',
          'npxG/Shot',
          'Goals - xG',
          'xG per 100 touches',
          'Goals per 100 touches',
          'Duels',
          'Duels won',
          'Duels won %',
          'Touches',
          'Touches in box',
          'Progressive actions',
          'Progressive action rate',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Successful attacking actions',
          'Fouls suffered',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Possession +/-',
          'Possessions won - lost',
          'Possessions won',
          'Defensive duels',
          'Defensive duels won',
          'Defensive duels won %',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Sliding tackles',
          'Sliding tackles (PAdj)',
          'Interceptions',
          'Interceptions (PAdj)',
          'Shots blocked'
        ],
        'Winger': [
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Crosses',
          'Accurate crosses',
          'Cross accuracy %',
          'Crosses to box',
          'Deep completions',
          'Goals',
          'Non-penalty goals',
          'Expected goals (xG)',
          'Non-penalty xG',
          'Goals per 100 touches',
          'xG per 100 touches',
          'Headed goals',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribble success rate %',
          'Dribbles per 100 touches',
          'Offensive duels',
          'Offensive duels won',
          'Offensive duels won %',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Fouls suffered',
          'Successful attacking actions',
          'Duels won',
          'Duels won %',
          'Touches in box',
          'Touches',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Long passes',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Progressive passes (PAdj)',
          'Passes to final third',
          'Passes to penalty box',
          'Pass completion (to penalty box) %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possession +/-',
          'Possessions won - lost',
          'Interceptions',
          'Defensive duels won',
          'Aerial duels won',
          'Aerial duels won %',
          'Possessions won'
        ],
        'Striker': [
          'Goals',
          'Non-penalty goals',
          'Goals per 100 touches',
          'Expected goals (xG)',
          'Non-penalty xG',
          'xG per 100 touches',
          'Shots',
          'Shots on target',
          'Shots on target %',
          'Goal conversion %',
          'Shot frequency',
          'npxG/Shot',
          'Goals - xG',
          'Headed goals',
          'Touches in box',
          'Goals + assists',
          'Non-penalty goals + assists',
          'xG + xA',
          'npxG + xA',
          'Assists',
          'Expected assists (xA)',
          'Shot assists',
          'Key passes',
          'xA per 100 passes',
          'Chance creation ratio',
          'Accurate crosses',
          'Successful attacking actions',
          'Progressive carries',
          'Accelerations',
          'Ball carrying frequency',
          'Dribbles attempted',
          'Successful dribbles',
          'Dribbles per 100 touches',
          'Fouls suffered',
          'Touches',
          'Duels won',
          'Duels won %',
          'Offensive duels',  
          'Offensive duels won',
          'Offensive duels won %',
          'Passes',
          'Passes completed',
          'Pass completion %',
          'Progressive passes',
          'Progressive pass accuracy %',
          'Through passes completed',
          'Progressive actions',
          'Progressive action rate',
          'Possessions won',
          'Interceptions',
          'Aerial duels',
          'Aerial duels won',
          'Aerial duels won %',
          'Defensive duels won'
        ]
        };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
 // Construct HTML for metrics
 const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData5 = parseCSV(csvData).filter(player => player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue5 = getMetricValueFunction(filteredData5, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth5 = 100 - (((playerRank - 1) / filteredData5.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth5 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth5); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth5 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth5}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue5}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');

// Construct player results HTML
    playerResults = `    
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData5 = parseCSV(csvData).filter(player => player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping

const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };
const metricsToInclude = {
  'Defensive duels': leagueRankDuels,
  'Defensive duels won': leagueRankDefensiveDuelsWonPerNinety,
  'Aerial duels': leagueRankAerialDuels,
  'Aerial duels won': leagueRankAerialDuelsWonPerNinety,
  'Defensive duel %': leagueRankDefensiveDuelsWonPercentage,
  'Aerial duel %': leagueRankAerialDuelsWonPercentage,
  'Possessions won': leagueRankActions,
  'Tackles': leagueRankSlidingTackles,
  'Tackles (PAdj)': leagueRankPAdjSlidingTackles,
  'Interceptions': leagueRankInterceptions,
  'Interceptions (PAdj)': leagueRankPAdjInterceptions,
  'Shots blocked': leagueRankShotsBlocked,
  'Duels': leagueRankDuelsPerNinety,
  'Duels won': leagueRankDuelsWonPerNinety,
  'Duel %': leagueRankDuelsWonPercentage,
  'Poss won-lost': leagueRankPossessionsWonMinusLostPerNinety,
  'Poss +/-': leagueRankPossessionPlusMinus,
  'Touches': leagueRankTouchesPerNinety,
  'Touches in box': leagueRankTouchesInBox,
  'Goals': leagueRankGoals,
  'Non-penalty goals': leagueRankNonPenaltyGoals,
  'Expected goals': leagueRankXG,
  'Headed goals': leagueRankHeadGoals,
  'Shots': leagueRankShots,
  'SoT %': leagueRankShotsOnTargetPercentage,
  'Shots on target': leagueRankShotsOnTargetPerNinety,
  'Goals - xG': leagueRankGoalsMinusxGPerNinety,
  'Non-penalty xG': leagueRankNpxGPerNinety,
  'Goal per 100T': leagueRankGoalsPer100Touches,
  'xG per 100T': leagueRankXGPer100Touches,
  'Shot frequency': leagueRankShotFrequency,
  'Goal conversion': leagueRankGoalConversionPercentage,
  'npxG/Shot': leagueRankNpxGPerShot,
  'xG + xA': leagueRankXGAndxAPerNinety,
  'npxG + xA': leagueRankNpxGAndxAPerNinety,
  'Goals + assists': leagueRankGoalsAndAssistsPerNinety,
  'NPG+A': leagueRankNpGoalsAndAssistsPerNinety,
  'Assists': leagueRankAssists,
  'Expected assists': leagueRankXA,
  'Key passes': leagueRankKeyPasses,
  'Shot assists': leagueRankShotAssists,
  'xA per 100 passes': leagueRankXAPer100Passes,
  'Creativity ratio': leagueRankChanceCreationRatio,
  'Deep completions': leagueRankDeepCompletions,
  'Crosses': leagueRankCrosses,
  'Accurate crosses': leagueRankAccurateCrossesPerNinety,
  'Cross %': leagueRankAccurateCrossesPercentage,
  'Crosses to box': leagueRankCrossesToGoalieBox,
  'Passes': leagueRankPasses,
  'Passes completed': leagueRankPassesCompletedPerNinety,
  'Forward passes': leagueRankForwardPasses,
  'Fwd passes comp': leagueRankForwardPassesCompletedPerNinety,
  'Short passes': leagueRankShortMediumPasses,
  'Short passes comp': leagueRankShortPassesCompletedPerNinety,
  'Long passes': leagueRankLongPasses,
  'Long passes comp': leagueRankLongPassesCompletedPerNinety,
  'Progressive passes': leagueRankProgressivePasses,
  'Prog passes comp': leagueRankProgressivePassesCompletedPerNinety,
  'Prog passes (PAdj)': leagueRankProgressivePassesPAdj,
  'Passes to fin 3rd': leagueRankPassesToFinalThird,
  'Passes to pen box': leagueRankPassesToPenaltyArea,
  'Through passes': leagueRankThroughPasses,
  'Through passes comp': leagueRankThroughPassesCompletedPerNinety,
  'Pass %': leagueRankAccuratePassesPercentage,
  'Forward pass %': leagueRankAccurateForwardPassesPercentage,
  'Short pass %': leagueRankAccurateShortMediumPassesPercentage,
  'Progressive pass %': leagueRankAccurateProgressivePassesPercentage,
  'Long pass %': leagueRankAccurateLongPassesPercentage,
  'Pass to fin 3rd %': leagueRankAccuratePassesToFinalThirdPercentage,
  'Pass to pen box %': leagueRankAccuratePassesToPenaltyAreaPercentage,
  'Pre-assists': leagueRankPreAssistsPerNinety,
  'Forward pass ratio': leagueRankForwardPassRatio,
  'Progressive actions': leagueRankProgressiveActionsPerNinety,
  'Prog action rate': leagueRankProgressiveActionRate,
  'Progressive carries': leagueRankProgressiveRuns,
  'Carrying frequency': leagueRankBallCarryingFrequency,
  'Accelerations': leagueRankAccelerations,
  'Offensive duels': leagueRankOffensiveDuels,
  'Offensive duels won': leagueRankOffensiveDuelsWonPerNinety,
  'Offensive duel %': leagueRankOffensiveDuelsWonPercentage,
  'Dribbles attempted': leagueRankDribbles,
  'Successful dribbles': leagueRankSuccessfulDribblesPerNinety,
  'Dribble success %': leagueRankSuccessfulDribblesPercentage,
  'Dribbles per 100T': leagueRankDribblesPerHundredTouches,
  'Attacking actions': leagueRankSuccessfulAttackingActions,
  'Fouls suffered': leagueRankFoulsSuffered,
  'Save %': leagueRankSaveRatePercentage,
  'Saves': leagueRankSavesPerNinety,
  'Shots conceded': leagueRankShotsAgainst,
  'Clean sheets': leagueRankCleanSheets,
  'xG conceded': leagueRankXGAgainst,
  'Prevented goals': leagueRankPreventedGoals,
  'Line exits': leagueRankExits,
};


// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData5.length;
});

document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs ${selectedPlayer.league} ${titleSuffix} players, per 90</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;
    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData5.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}
     else if (selectedSection === 'leagueWithMinutes') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: leagueRankActionsWithMinutes },
          { name: 'Defensive duels', data: leagueRankDuelsWithMinutes },
          { name: 'Aerial duels', data: leagueRankAerialDuelsWithMinutes },
          { name: 'Sliding tackles', data: leagueRankSlidingTacklesWithMinutes },
          { name: 'Sliding tackles (PAdj)', data: leagueRankPAdjSlidingTacklesWithMinutes },
          { name: 'Shots blocked', data: leagueRankShotsBlockedWithMinutes },
          { name: 'Interceptions', data: leagueRankInterceptionsWithMinutes },
          { name: 'Interceptions (PAdj)', data: leagueRankPAdjInterceptionsWithMinutes },
          { name: 'Successful attacking actions', data: leagueRankSuccessfulAttackingActionsWithMinutes },
          { name: 'Goals', data: leagueRankGoalsWithMinutes },
          { name: 'Non-penalty goals', data: leagueRankNonPenaltyGoalsWithMinutes },
          { name: 'Expected goals (xG)', data: leagueRankXGWithMinutes },
          { name: 'Headed goals', data: leagueRankHeadGoalsWithMinutes },
          { name: 'Shots', data: leagueRankShotsWithMinutes },
          { name: 'Assists', data: leagueRankAssistsWithMinutes },
          { name: 'Crosses', data: leagueRankCrossesWithMinutes },
          { name: 'Crosses to box', data: leagueRankCrossesToGoalieBoxWithMinutes },
          { name: 'Dribbles attempted', data: leagueRankDribblesWithMinutes },
          { name: 'Offensive duels', data: leagueRankOffensiveDuelsWithMinutes },
          { name: 'Touches in box', data: leagueRankTouchesInBoxWithMinutes },
          { name: 'Progressive carries', data: leagueRankProgressiveRunsWithMinutes },
          { name: 'Accelerations', data: leagueRankAccelerationsWithMinutes },
          { name: 'Fouls suffered', data: leagueRankFoulsSufferedWithMinutes },
          { name: 'Passes', data: leagueRankPassesWithMinutes },
          { name: 'Forward passes', data: leagueRankForwardPassesWithMinutes },
          { name: 'Short passes', data: leagueRankShortMediumPassesWithMinutes },
          { name: 'Long passes', data: leagueRankLongPassesWithMinutes },
          { name: 'Expected assists (xA)', data: leagueRankXAWithMinutes },
          { name: 'Shot assists', data: leagueRankShotAssistsWithMinutes },
          { name: 'Key passes', data: leagueRankKeyPassesWithMinutes },
          { name: 'Passes to final third', data: leagueRankPassesToFinalThirdWithMinutes },
          { name: 'Passes to penalty box', data: leagueRankPassesToPenaltyAreaWithMinutes },
          { name: 'Through passes', data: leagueRankThroughPassesWithMinutes },
          { name: 'Deep completions', data: leagueRankDeepCompletionsWithMinutes },
          { name: 'Progressive passes', data: leagueRankProgressivePassesWithMinutes },
          { name: 'Shots conceded', data: leagueRankShotsAgainstWithMinutes },
          { name: 'Clean sheets', data: leagueRankCleanSheetsWithMinutes },
          { name: 'xG conceded', data: leagueRankXGAgainstWithMinutes },
          { name: 'Prevented goals (PSxG-GA)', data: leagueRankPreventedGoalsWithMinutes },
          { name: 'Line exits', data: leagueRankExitsWithMinutes },
          { name: 'Defensive duels won %', data: leagueRankDefensiveDuelsWonPercentageWithMinutes },
          { name: 'Aerial duels won %', data: leagueRankAerialDuelsWonPercentageWithMinutes },
          { name: 'Shots on target %', data: leagueRankShotsOnTargetPercentageWithMinutes },
          { name: 'Goal conversion %', data: leagueRankGoalConversionPercentageWithMinutes },
          { name: 'Cross accuracy %', data: leagueRankAccurateCrossesPercentageWithMinutes },
          { name: 'Dribble success rate %', data: leagueRankSuccessfulDribblesPercentageWithMinutes },
          { name: 'Offensive duels won %', data: leagueRankOffensiveDuelsWonPercentageWithMinutes },
          { name: 'Pass completion %', data: leagueRankAccuratePassesPercentageWithMinutes },
          { name: 'Forward pass completion %', data: leagueRankAccurateForwardPassesPercentageWithMinutes },
          { name: 'Short pass completion %', data: leagueRankAccurateShortMediumPassesPercentageWithMinutes },
          { name: 'Long pass accuracy %', data: leagueRankAccurateLongPassesPercentageWithMinutes },
          { name: 'Pass completion (to final third) %', data: leagueRankAccuratePassesToFinalThirdPercentageWithMinutes },
          { name: 'Pass completion (to penalty box) %', data: leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
          { name: 'Progressive pass accuracy %', data: leagueRankAccurateProgressivePassesPercentageWithMinutes },
          { name: 'Save percentage %', data: leagueRankSaveRatePercentageWithMinutes },
          { name: 'Pre-assists', data: leagueRankPreAssistsPerNinetyWithMinutes },
        { name: 'Duels', data: leagueRankDuelsPerNinetyWithMinutes },
        { name: 'Duels won %', data: leagueRankDuelsWonPercentageWithMinutes },
        { name: 'Possession +/-', data: leagueRankPossessionPlusMinusWithMinutes },
        { name: 'Forward pass ratio', data: leagueRankForwardPassRatioWithMinutes },
        { name: 'xA per 100 passes', data: leagueRankXAPer100PassesWithMinutes },
        { name: 'Chance creation ratio', data: leagueRankChanceCreationRatioWithMinutes },
        { name: 'Goals + assists', data: leagueRankGoalsAndAssistsPerNinetyWithMinutes },
        { name: 'Non-penalty goals + assists', data: leagueRankNpGoalsAndAssistsPerNinetyWithMinutes },
        { name: 'xG + xA', data: leagueRankXGAndxAPerNinetyWithMinutes },
        { name: 'Goals - xG', data: leagueRankGoalsMinusxGPerNinetyWithMinutes },
        { name: 'Successful dribbles', data: leagueRankSuccessfulDribblesPerNinetyWithMinutes },
        { name: 'Shots on target', data: leagueRankShotsOnTargetPerNinetyWithMinutes },
        { name: 'Accurate crosses', data: leagueRankAccurateCrossesPerNinetyWithMinutes },
        { name: 'Offensive duels won', data: leagueRankOffensiveDuelsWonPerNinetyWithMinutes },
        { name: 'Defensive duels won', data: leagueRankDefensiveDuelsWonPerNinetyWithMinutes },
        { name: 'Aerial duels won', data: leagueRankAerialDuelsWonPerNinetyWithMinutes },
        { name: 'Passes completed', data: leagueRankPassesCompletedPerNinetyWithMinutes },
        { name: 'Forward passes completed', data: leagueRankForwardPassesCompletedPerNinetyWithMinutes },
        { name: 'Short passes completed', data: leagueRankShortPassesCompletedPerNinetyWithMinutes },
        { name: 'Long passes completed', data: leagueRankLongPassesCompletedPerNinetyWithMinutes },
        { name: 'Accurate passes to final third', data: leagueRankAccuratePassesToFinalThirdPerNinetyWithMinutes },
        { name: 'Through passes completed', data: leagueRankThroughPassesCompletedPerNinetyWithMinutes },
        { name: 'Progressive passes completed', data: leagueRankProgressivePassesCompletedPerNinetyWithMinutes },
        { name: 'Saves', data: leagueRankSavesPerNinetyWithMinutes },
        { name: 'Possessions won - lost', data: leagueRankPossessionsWonMinusLostPerNinetyWithMinutes },
        { name: 'Progressive actions', data: leagueRankProgressiveActionsPerNinetyWithMinutes },
        { name: 'Duels won', data: leagueRankDuelsWonPerNinetyWithMinutes },
        { name: 'Non-penalty xG', data: leagueRankNpxGPerNinetyWithMinutes },
        { name: 'npxG/Shot', data: leagueRankNpxGPerShotWithMinutes },
        { name: 'npxG + xA', data: leagueRankNpxGAndxAPerNinetyWithMinutes },
        { name: 'Touches', data: leagueRankTouchesPerNinetyWithMinutes },
        { name: 'Progressive action rate', data: leagueRankProgressiveActionRateWithMinutes },
        { name: 'Progressive passes (PAdj)', data: leagueRankProgressivePassesPAdjWithMinutes },
        { name: 'Ball carrying frequency', data: leagueRankBallCarryingFrequencyWithMinutes },
        { name: 'xG per 100 touches', data: leagueRankXGPer100TouchesWithMinutes },
        { name: 'Shot frequency', data: leagueRankShotFrequencyWithMinutes },
        { name: 'Dribbles per 100 touches', data: leagueRankDribblesPerHundredTouchesWithMinutes },
        { name: 'Goals per 100 touches', data: leagueRankGoalsPer100TouchesWithMinutes }
        ];
        
        const positionOrder = {
        'Goalkeeper': [
        'Prevented goals (PSxG-GA)',
        'Saves',
        'Save percentage %',
        'Clean sheets',
        'Shots conceded',
        'xG conceded',
        'Line exits',
        'Touches',
        'Passes',
        'Passes completed',
        'Pass completion %',
        'Short passes',
        'Short passes completed',
        'Short pass completion %',
        'Long passes',
        'Long passes completed',
        'Long pass accuracy %',
        'Passes to final third',
        'Progressive passes',
        'Pass completion (to final third) %',
        'Progressive pass accuracy %',
        'Through passes',
        'Defensive duels won',
        'Aerial duels won',
        'Possessions won',
        'Interceptions'
          ],
          'Centre-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Through passes completed',
            'Progressive carries',
            'Progressive actions',
            'Progressive action rate',
            'Ball carrying frequency',
            'Successful dribbles',
            'Key passes',
            'Assists',
            'Goals',
            'Headed goals'
          ],
          'Full-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Successful attacking actions',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Goals',
            'Expected goals (xG)',
            'Goals + assists',
            'xG + xA',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed'
          ],
          'Midfielder': [
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes',
            'Through passes completed',
            'Pre-assists',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'xA per 100 passes',
            'Key passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Headed goals',
            'Non-penalty xG',
            'Shots',
            'Shots on target',
            'npxG/Shot',
            'Goals - xG',
            'xG per 100 touches',
            'Goals per 100 touches',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Successful attacking actions',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Possession +/-',
            'Possessions won - lost',
            'Possessions won',
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked'
          ],
          'Winger': [
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Non-penalty xG',
            'Goals per 100 touches',
            'xG per 100 touches',
            'Headed goals',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Fouls suffered',
            'Successful attacking actions',
            'Duels won',
            'Duels won %',
            'Touches in box',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Long passes',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possession +/-',
            'Possessions won - lost',
            'Interceptions',
            'Defensive duels won',
            'Aerial duels won',
            'Aerial duels won %',
            'Possessions won'
          ],
          'Striker': [
            'Goals',
            'Non-penalty goals',
            'Goals per 100 touches',
            'Expected goals (xG)',
            'Non-penalty xG',
            'xG per 100 touches',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Headed goals',
            'Touches in box',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Accurate crosses',
            'Successful attacking actions',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribbles per 100 touches',
            'Fouls suffered',
            'Touches',
            'Duels won',
            'Duels won %',
            'Offensive duels',  
            'Offensive duels won',
            'Offensive duels won %',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possessions won',
            'Interceptions',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Defensive duels won'
          ]
          };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
    // Construct HTML for metrics
    const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData6 = parseCSV(csvData).filter(player => player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue6 = getMetricValueFunction(filteredData6, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth6 = 100 - (((playerRank - 1) / filteredData6.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth6 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth6); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth6 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth6}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue6}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');


// Construct player results HTML
    playerResults = `
        ${metricsHTML}
          `;
    const selectedAge = parseInt(ageSelect.value);
        const filteredData6 = parseCSV(csvData).filter(player => player.league === selectedPlayer.league &&
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping

const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };
    const metricsToInclude = {
  'Defensive duels': leagueRankDuelsWithMinutes,
  'Defensive duels won': leagueRankDefensiveDuelsWonPerNinetyWithMinutes,
  'Aerial duels': leagueRankAerialDuelsWithMinutes,
  'Aerial duels won': leagueRankAerialDuelsWonPerNinetyWithMinutes,
  'Defensive duel %': leagueRankDefensiveDuelsWonPercentageWithMinutes,
  'Aerial duel %': leagueRankAerialDuelsWonPercentageWithMinutes,
  'Possessions won': leagueRankActionsWithMinutes,
  'Tackles': leagueRankSlidingTacklesWithMinutes,
  'Tackles (PAdj)': leagueRankPAdjSlidingTacklesWithMinutes,
  'Interceptions': leagueRankInterceptionsWithMinutes,
  'Interceptions (PAdj)': leagueRankPAdjInterceptionsWithMinutes,
  'Shots blocked': leagueRankShotsBlockedWithMinutes,
  'Duels': leagueRankDuelsPerNinetyWithMinutes,
  'Duels won': leagueRankDuelsWonPerNinetyWithMinutes,
  'Duel %': leagueRankDuelsWonPercentageWithMinutes,
  'Poss won-lost': leagueRankPossessionsWonMinusLostPerNinetyWithMinutes,
  'Poss +/-': leagueRankPossessionPlusMinusWithMinutes,
  'Touches': leagueRankTouchesPerNinetyWithMinutes,
  'Touches in box': leagueRankTouchesInBoxWithMinutes,
  'Goals': leagueRankGoalsWithMinutes,
  'Non-penalty goals': leagueRankNonPenaltyGoalsWithMinutes,
  'Expected goals': leagueRankXGWithMinutes,
  'Headed goals': leagueRankHeadGoalsWithMinutes,
  'Shots': leagueRankShotsWithMinutes,
  'SoT %': leagueRankShotsOnTargetPercentageWithMinutes,
  'Shots on target': leagueRankShotsOnTargetPerNinetyWithMinutes,
  'Goals - xG': leagueRankGoalsMinusxGPerNinetyWithMinutes,
  'Non-penalty xG': leagueRankNpxGPerNinetyWithMinutes,
  'Goal per 100T': leagueRankGoalsPer100TouchesWithMinutes,
  'xG per 100T': leagueRankXGPer100TouchesWithMinutes,
  'Shot frequency': leagueRankShotFrequencyWithMinutes,
  'Goal conversion': leagueRankGoalConversionPercentageWithMinutes,
  'npxG/Shot': leagueRankNpxGPerShotWithMinutes,
  'xG + xA': leagueRankXGAndxAPerNinetyWithMinutes,
  'npxG + xA': leagueRankNpxGAndxAPerNinetyWithMinutes,
  'Goals + assists': leagueRankGoalsAndAssistsPerNinetyWithMinutes,
  'NPG+A': leagueRankNpGoalsAndAssistsPerNinetyWithMinutes,
  'Assists': leagueRankAssistsWithMinutes,
  'Expected assists': leagueRankXAWithMinutes,
  'Key passes': leagueRankKeyPassesWithMinutes,
  'Shot assists': leagueRankShotAssistsWithMinutes,
  'xA per 100 passes': leagueRankXAPer100PassesWithMinutes,
  'Creativity ratio': leagueRankChanceCreationRatioWithMinutes,
  'Deep completions': leagueRankDeepCompletionsWithMinutes,
  'Crosses': leagueRankCrossesWithMinutes,
  'Accurate crosses': leagueRankAccurateCrossesPerNinetyWithMinutes,
  'Cross %': leagueRankAccurateCrossesPercentageWithMinutes,
  'Crosses to box': leagueRankCrossesToGoalieBoxWithMinutes,
  'Passes': leagueRankPassesWithMinutes,
  'Passes completed': leagueRankPassesCompletedPerNinetyWithMinutes,
  'Forward passes': leagueRankForwardPassesWithMinutes,
  'Fwd passes comp': leagueRankForwardPassesCompletedPerNinetyWithMinutes,
  'Short passes': leagueRankShortMediumPassesWithMinutes,
  'Short passes comp': leagueRankShortPassesCompletedPerNinetyWithMinutes,
  'Long passes': leagueRankLongPassesWithMinutes,
  'Long passes comp': leagueRankLongPassesCompletedPerNinetyWithMinutes,
  'Progressive passes': leagueRankProgressivePassesWithMinutes,
  'Prog passes comp': leagueRankProgressivePassesCompletedPerNinetyWithMinutes,
  'Prog passes (PAdj)': leagueRankProgressivePassesPAdjWithMinutes,
  'Passes to fin 3rd': leagueRankPassesToFinalThirdWithMinutes,
  'Passes to pen box': leagueRankPassesToPenaltyAreaWithMinutes,
  'Through passes': leagueRankThroughPassesWithMinutes,
  'Through passes comp': leagueRankThroughPassesCompletedPerNinetyWithMinutes,
  'Pass %': leagueRankAccuratePassesPercentageWithMinutes,
  'Forward pass %': leagueRankAccurateForwardPassesPercentageWithMinutes,
  'Short pass %': leagueRankAccurateShortMediumPassesPercentageWithMinutes,
  'Progressive pass %': leagueRankAccurateProgressivePassesPercentageWithMinutes,
  'Long pass %': leagueRankAccurateLongPassesPercentageWithMinutes,
  'Pass to fin 3rd %': leagueRankAccuratePassesToFinalThirdPercentageWithMinutes,
  'Pass to pen box %': leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
  'Pre-assists': leagueRankPreAssistsPerNinetyWithMinutes,
  'Forward pass ratio': leagueRankForwardPassRatioWithMinutes,
  'Progressive actions': leagueRankProgressiveActionsPerNinetyWithMinutes,
  'Prog action rate': leagueRankProgressiveActionRateWithMinutes,
  'Progressive carries': leagueRankProgressiveRunsWithMinutes,
  'Carrying frequency': leagueRankBallCarryingFrequencyWithMinutes,
  'Accelerations': leagueRankAccelerationsWithMinutes,
  'Offensive duels': leagueRankOffensiveDuelsWithMinutes,
  'Offensive duels won': leagueRankOffensiveDuelsWonPerNinetyWithMinutes,
  'Offensive duel %': leagueRankOffensiveDuelsWonPercentageWithMinutes,
  'Dribbles attempted': leagueRankDribblesWithMinutes,
  'Successful dribbles': leagueRankSuccessfulDribblesPerNinetyWithMinutes,
  'Dribble success %': leagueRankSuccessfulDribblesPercentageWithMinutes,
  'Dribbles per 100T': leagueRankDribblesPerHundredTouchesWithMinutes,
  'Attacking actions': leagueRankSuccessfulAttackingActionsWithMinutes,
  'Fouls suffered': leagueRankFoulsSufferedWithMinutes,
  'Save %': leagueRankSaveRatePercentageWithMinutes,
  'Saves': leagueRankSavesPerNinetyWithMinutes,
  'Shots conceded': leagueRankShotsAgainstWithMinutes,
  'Clean sheets': leagueRankCleanSheetsWithMinutes,
  'xG conceded': leagueRankXGAgainstWithMinutes,
  'Prevented goals': leagueRankPreventedGoalsWithMinutes,
  'Line exits': leagueRankExitsWithMinutes,
};

// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData6.length;
});
document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
          <h1><i>vs ${selectedPlayer.league} ${titleSuffix} players</i></h1>
              
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;

    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData6.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}
     else if (selectedSection === 'allCsv') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: allCsvRankActions },
          { name: 'Defensive duels', data: allCsvRankDuels },
          { name: 'Aerial duels', data: allCsvRankAerialDuels },
          { name: 'Sliding tackles', data: allCsvRankSlidingTackles },
          { name: 'Sliding tackles (PAdj)', data: allCsvRankPAdjSlidingTackles },
          { name: 'Shots blocked', data: allCsvRankShotsBlocked },
          { name: 'Interceptions', data: allCsvRankInterceptions },
          { name: 'Interceptions (PAdj)', data: allCsvRankPAdjInterceptions },
          { name: 'Successful attacking actions', data: allCsvRankSuccessfulAttackingActions },
          { name: 'Goals', data: allCsvRankGoals },
          { name: 'Non-penalty goals', data: allCsvRankNonPenaltyGoals },
          { name: 'Expected goals (xG)', data: allCsvRankXG },
          { name: 'Headed goals', data: allCsvRankHeadGoals },
          { name: 'Shots', data: allCsvRankShots },
          { name: 'Assists', data: allCsvRankAssists },
          { name: 'Crosses', data: allCsvRankCrosses },
          { name: 'Crosses to box', data: allCsvRankCrossesToGoalieBox },
          { name: 'Dribbles attempted', data: allCsvRankDribbles },
          { name: 'Offensive duels', data: allCsvRankOffensiveDuels },
          { name: 'Touches in box', data: allCsvRankTouchesInBox },
          { name: 'Progressive carries', data: allCsvRankProgressiveRuns },
          { name: 'Accelerations', data: allCsvRankAccelerations },
          { name: 'Fouls suffered', data: allCsvRankFoulsSuffered },
          { name: 'Passes', data: allCsvRankPasses },
          { name: 'Forward passes', data: allCsvRankForwardPasses },
          { name: 'Short passes', data: allCsvRankShortMediumPasses },
          { name: 'Long passes', data: allCsvRankLongPasses },
          { name: 'Expected assists (xA)', data: allCsvRankXA },
          { name: 'Shot assists', data: allCsvRankShotAssists },
          { name: 'Key passes', data: allCsvRankKeyPasses },
          { name: 'Passes to final third', data: allCsvRankPassesToFinalThird },
          { name: 'Passes to penalty box', data: allCsvRankPassesToPenaltyArea },
          { name: 'Through passes', data: allCsvRankThroughPasses },
          { name: 'Deep completions', data: allCsvRankDeepCompletions },
          { name: 'Progressive passes', data: allCsvRankProgressivePasses },
          { name: 'Shots conceded', data: allCsvRankShotsAgainst },
          { name: 'Clean sheets', data: allCsvRankCleanSheets },
          { name: 'xG conceded', data: allCsvRankXGAgainst },
          { name: 'Prevented goals (PSxG-GA)', data: allCsvRankPreventedGoals },
          { name: 'Line exits', data: allCsvRankExits },
          { name: 'Defensive duels won %', data: allCsvRankDefensiveDuelsWonPercentage },
          { name: 'Aerial duels won %', data: allCsvRankAerialDuelsWonPercentage },
          { name: 'Shots on target %', data: allCsvRankShotsOnTargetPercentage },
          { name: 'Goal conversion %', data: allCsvRankGoalConversionPercentage },
          { name: 'Cross accuracy %', data: allCsvRankAccurateCrossesPercentage },
          { name: 'Dribble success rate %', data: allCsvRankSuccessfulDribblesPercentage },
          { name: 'Offensive duels won %', data: allCsvRankOffensiveDuelsWonPercentage },
          { name: 'Pass completion %', data: allCsvRankAccuratePassesPercentage },
          { name: 'Forward pass completion %', data: allCsvRankAccurateForwardPassesPercentage },
          { name: 'Short pass completion %', data: allCsvRankAccurateShortMediumPassesPercentage },
          { name: 'Long pass accuracy %', data: allCsvRankAccurateLongPassesPercentage },
          { name: 'Pass completion (to final third) %', data: allCsvRankAccuratePassesToFinalThirdPercentage },
          { name: 'Pass completion (to penalty box) %', data: allCsvRankAccuratePassesToPenaltyAreaPercentage },
          { name: 'Progressive pass accuracy %', data: allCsvRankAccurateProgressivePassesPercentage },
          { name: 'Save percentage %', data: allCsvRankSaveRatePercentage },
          { name: 'Pre-assists', data: allCsvRankPreAssistsPerNinety },
        { name: 'Duels', data: allCsvRankDuelsPerNinety },
        { name: 'Duels won %', data: allCsvRankDuelsWonPercentage },
        { name: 'Possession +/-', data: allCsvRankPossessionPlusMinus },
        { name: 'Forward pass ratio', data: allCsvRankForwardPassRatio },
        { name: 'xA per 100 passes', data: allCsvRankXAPer100Passes },
        { name: 'Chance creation ratio', data: allCsvRankChanceCreationRatio },
        { name: 'Goals + assists', data: allCsvRankGoalsAndAssistsPerNinety },
        { name: 'Non-penalty goals + assists', data: allCsvRankNpGoalsAndAssistsPerNinety },
        { name: 'xG + xA', data: allCsvRankXGAndxAPerNinety },
        { name: 'Goals - xG', data: allCsvRankGoalsMinusxGPerNinety },
        { name: 'Successful dribbles', data: allCsvRankSuccessfulDribblesPerNinety },
        { name: 'Shots on target', data: allCsvRankShotsOnTargetPerNinety },
        { name: 'Accurate crosses', data: allCsvRankAccurateCrossesPerNinety },
        { name: 'Offensive duels won', data: allCsvRankOffensiveDuelsWonPerNinety },
        { name: 'Defensive duels won', data: allCsvRankDefensiveDuelsWonPerNinety },
        { name: 'Aerial duels won', data: allCsvRankAerialDuelsWonPerNinety },
        { name: 'Passes completed', data: allCsvRankPassesCompletedPerNinety },
        { name: 'Forward passes completed', data: allCsvRankForwardPassesCompletedPerNinety },
        { name: 'Short passes completed', data: allCsvRankShortPassesCompletedPerNinety },
        { name: 'Long passes completed', data: allCsvRankLongPassesCompletedPerNinety },
        { name: 'Accurate passes to final third', data: allCsvRankAccuratePassesToFinalThirdPerNinety },
        { name: 'Through passes completed', data: allCsvRankThroughPassesCompletedPerNinety },
        { name: 'Progressive passes completed', data: allCsvRankProgressivePassesCompletedPerNinety },
        { name: 'Saves', data: allCsvRankSavesPerNinety },
        { name: 'Possessions won - lost', data: allCsvRankPossessionsWonMinusLostPerNinety },
        { name: 'Progressive actions', data: allCsvRankProgressiveActionsPerNinety },
        { name: 'Duels won', data: allCsvRankDuelsWonPerNinety },
        { name: 'Non-penalty xG', data: allCsvRankNpxGPerNinety },
        { name: 'npxG/Shot', data: allCsvRankNpxGPerShot },
        { name: 'npxG + xA', data: allCsvRankNpxGAndxAPerNinety },
        { name: 'Touches', data: allCsvRankTouchesPerNinety },
        { name: 'Progressive action rate', data: allCsvRankProgressiveActionRate },
        { name: 'Progressive passes (PAdj)', data: allCsvRankProgressivePassesPAdj },
        { name: 'Ball carrying frequency', data: allCsvRankBallCarryingFrequency },
        { name: 'xG per 100 touches', data: allCsvRankXGPer100Touches },
        { name: 'Shot frequency', data: allCsvRankShotFrequency },
        { name: 'Dribbles per 100 touches', data: allCsvRankDribblesPerHundredTouches },
        { name: 'Goals per 100 touches', data: allCsvRankGoalsPer100Touches }
        ];
        
        const positionOrder = {
        'Goalkeeper': [
        'Prevented goals (PSxG-GA)',
        'Saves',
        'Save percentage %',
        'Clean sheets',
        'Shots conceded',
        'xG conceded',
        'Line exits',
        'Touches',
        'Passes',
        'Passes completed',
        'Pass completion %',
        'Short passes',
        'Short passes completed',
        'Short pass completion %',
        'Long passes',
        'Long passes completed',
        'Long pass accuracy %',
        'Passes to final third',
        'Progressive passes',
        'Pass completion (to final third) %',
        'Progressive pass accuracy %',
        'Through passes',
        'Defensive duels won',
        'Aerial duels won',
        'Possessions won',
        'Interceptions'
          ],
          'Centre-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Through passes completed',
            'Progressive carries',
            'Progressive actions',
            'Progressive action rate',
            'Ball carrying frequency',
            'Successful dribbles',
            'Key passes',
            'Assists',
            'Goals',
            'Headed goals'
          ],
          'Full-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Successful attacking actions',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Goals',
            'Expected goals (xG)',
            'Goals + assists',
            'xG + xA',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed'
          ],
          'Midfielder': [
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes',
            'Through passes completed',
            'Pre-assists',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'xA per 100 passes',
            'Key passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Headed goals',
            'Non-penalty xG',
            'Shots',
            'Shots on target',
            'npxG/Shot',
            'Goals - xG',
            'xG per 100 touches',
            'Goals per 100 touches',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Successful attacking actions',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Possession +/-',
            'Possessions won - lost',
            'Possessions won',
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked'
          ],
          'Winger': [
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Non-penalty xG',
            'Goals per 100 touches',
            'xG per 100 touches',
            'Headed goals',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Fouls suffered',
            'Successful attacking actions',
            'Duels won',
            'Duels won %',
            'Touches in box',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Long passes',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possession +/-',
            'Possessions won - lost',
            'Interceptions',
            'Defensive duels won',
            'Aerial duels won',
            'Aerial duels won %',
            'Possessions won'
          ],
          'Striker': [
            'Goals',
            'Non-penalty goals',
            'Goals per 100 touches',
            'Expected goals (xG)',
            'Non-penalty xG',
            'xG per 100 touches',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Headed goals',
            'Touches in box',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Accurate crosses',
            'Successful attacking actions',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribbles per 100 touches',
            'Fouls suffered',
            'Touches',
            'Duels won',
            'Duels won %',
            'Offensive duels',  
            'Offensive duels won',
            'Offensive duels won %',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possessions won',
            'Interceptions',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Defensive duels won'
          ]
          };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {
metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});
}

    // Construct HTML for metrics
// Construct HTML for metrics
const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData7 = parseCSV(csvData).filter(player =>
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue7 = getMetricValueFunction(filteredData7, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth7 = 100 - (((playerRank - 1) / filteredData7.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth7 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth7); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth7 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth7}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue7}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');


// Construct player results HTML
    playerResults = `     
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData7 = parseCSV(csvData).filter(player =>
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping

const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };
const metricsToInclude = {
  'Defensive duels': allCsvRankDuels,
  'Defensive duels won': allCsvRankDefensiveDuelsWonPerNinety,
  'Aerial duels': allCsvRankAerialDuels,
  'Aerial duels won': allCsvRankAerialDuelsWonPerNinety,
  'Defensive duel %': allCsvRankDefensiveDuelsWonPercentage,
  'Aerial duel %': allCsvRankAerialDuelsWonPercentage,
  'Possessions won': allCsvRankActions,
  'Tackles': allCsvRankSlidingTackles,
  'Tackles (PAdj)': allCsvRankPAdjSlidingTackles,
  'Interceptions': allCsvRankInterceptions,
  'Interceptions (PAdj)': allCsvRankPAdjInterceptions,
  'Shots blocked': allCsvRankShotsBlocked,
  'Duels': allCsvRankDuelsPerNinety,
  'Duels won': allCsvRankDuelsWonPerNinety,
  'Duel %': allCsvRankDuelsWonPercentage,
  'Poss won-lost': allCsvRankPossessionsWonMinusLostPerNinety,
  'Poss +/-': allCsvRankPossessionPlusMinus,
  'Touches': allCsvRankTouchesPerNinety,
  'Touches in box': allCsvRankTouchesInBox,
  'Goals': allCsvRankGoals,
  'Non-penalty goals': allCsvRankNonPenaltyGoals,
  'Expected goals': allCsvRankXG,
  'Headed goals': allCsvRankHeadGoals,
  'Shots': allCsvRankShots,
  'SoT %': allCsvRankShotsOnTargetPercentage,
  'Shots on target': allCsvRankShotsOnTargetPerNinety,
  'Goals - xG': allCsvRankGoalsMinusxGPerNinety,
  'Non-penalty xG': allCsvRankNpxGPerNinety,
  'Goal per 100T': allCsvRankGoalsPer100Touches,
  'xG per 100T': allCsvRankXGPer100Touches,
  'Shot frequency': allCsvRankShotFrequency,
  'Goal conversion': allCsvRankGoalConversionPercentage,
  'npxG/Shot': allCsvRankNpxGPerShot,
  'xG + xA': allCsvRankXGAndxAPerNinety,
  'npxG + xA': allCsvRankNpxGAndxAPerNinety,
  'Goals + assists': allCsvRankGoalsAndAssistsPerNinety,
  'NPG+A': allCsvRankNpGoalsAndAssistsPerNinety,
  'Assists': allCsvRankAssists,
  'Expected assists': allCsvRankXA,
  'Key passes': allCsvRankKeyPasses,
  'Shot assists': allCsvRankShotAssists,
  'xA per 100 passes': allCsvRankXAPer100Passes,
  'Creativity ratio': allCsvRankChanceCreationRatio,
  'Deep completions': allCsvRankDeepCompletions,
  'Crosses': allCsvRankCrosses,
  'Accurate crosses': allCsvRankAccurateCrossesPerNinety,
  'Cross %': allCsvRankAccurateCrossesPercentage,
  'Crosses to box': allCsvRankCrossesToGoalieBox,
  'Passes': allCsvRankPasses,
  'Passes completed': allCsvRankPassesCompletedPerNinety,
  'Forward passes': allCsvRankForwardPasses,
  'Fwd passes comp': allCsvRankForwardPassesCompletedPerNinety,
  'Short passes': allCsvRankShortMediumPasses,
  'Short passes comp': allCsvRankShortPassesCompletedPerNinety,
  'Long passes': allCsvRankLongPasses,
  'Long passes comp': allCsvRankLongPassesCompletedPerNinety,
  'Progressive passes': allCsvRankProgressivePasses,
  'Prog passes comp': allCsvRankProgressivePassesCompletedPerNinety,
  'Prog passes (PAdj)': allCsvRankProgressivePassesPAdj,
  'Passes to fin 3rd': allCsvRankPassesToFinalThird,
  'Passes to pen box': allCsvRankPassesToPenaltyArea,
  'Through passes': allCsvRankThroughPasses,
  'Through passes comp': allCsvRankThroughPassesCompletedPerNinety,
  'Pass %': allCsvRankAccuratePassesPercentage,
  'Forward pass %': allCsvRankAccurateForwardPassesPercentage,
  'Short pass %': allCsvRankAccurateShortMediumPassesPercentage,
  'Progressive pass %': allCsvRankAccurateProgressivePassesPercentage,
  'Long pass %': allCsvRankAccurateLongPassesPercentage,
  'Pass to fin 3rd %': allCsvRankAccuratePassesToFinalThirdPercentage,
  'Pass to pen box %': allCsvRankAccuratePassesToPenaltyAreaPercentage,
  'Pre-assists': allCsvRankPreAssistsPerNinety,
  'Forward pass ratio': allCsvRankForwardPassRatio,
  'Progressive actions': allCsvRankProgressiveActionsPerNinety,
  'Prog action rate': allCsvRankProgressiveActionRate,
  'Progressive carries': allCsvRankProgressiveRuns,
  'Carrying frequency': allCsvRankBallCarryingFrequency,
  'Accelerations': allCsvRankAccelerations,
  'Offensive duels': allCsvRankOffensiveDuels,
  'Offensive duels won': allCsvRankOffensiveDuelsWonPerNinety,
  'Offensive duel %': allCsvRankOffensiveDuelsWonPercentage,
  'Dribbles attempted': allCsvRankDribbles,
  'Successful dribbles': allCsvRankSuccessfulDribblesPerNinety,
  'Dribble success %': allCsvRankSuccessfulDribblesPercentage,
  'Dribbles per 100T': allCsvRankDribblesPerHundredTouches,
  'Attacking actions': allCsvRankSuccessfulAttackingActions,
  'Fouls suffered': allCsvRankFoulsSuffered,
  'Save %': allCsvRankSaveRatePercentage,
  'Saves': allCsvRankSavesPerNinety,
  'Shots conceded': allCsvRankShotsAgainst,
  'Clean sheets': allCsvRankCleanSheets,
  'xG conceded': allCsvRankXGAgainst,
  'Prevented goals': allCsvRankPreventedGoals,
  'Line exits': allCsvRankExits,
};



// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData7.length;
});
document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
        <h1><i>vs All Leagues ${titleSuffix} players, per 90</i></h1>
            
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;
    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData7.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}

document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}
     else if (selectedSection === 'allCsvWithMinutes') {
    // Define the metrics and their corresponding data
    const metricsData = [
        { name: 'Possessions won', data: allCsvRankActionsWithMinutes },
          { name: 'Defensive duels', data: allCsvRankDuelsWithMinutes },
          { name: 'Aerial duels', data: allCsvRankAerialDuelsWithMinutes },
          { name: 'Sliding tackles', data: allCsvRankSlidingTacklesWithMinutes },
          { name: 'Sliding tackles (PAdj)', data: allCsvRankPAdjSlidingTacklesWithMinutes },
          { name: 'Shots blocked', data: allCsvRankShotsBlockedWithMinutes },
          { name: 'Interceptions', data: allCsvRankInterceptionsWithMinutes },
          { name: 'Interceptions (PAdj)', data: allCsvRankPAdjInterceptionsWithMinutes },
          { name: 'Successful attacking actions', data: allCsvRankSuccessfulAttackingActionsWithMinutes },
          { name: 'Goals', data: allCsvRankGoalsWithMinutes },
          { name: 'Non-penalty goals', data: allCsvRankNonPenaltyGoalsWithMinutes },
          { name: 'Expected goals (xG)', data: allCsvRankXGWithMinutes },
          { name: 'Headed goals', data: allCsvRankHeadGoalsWithMinutes },
          { name: 'Shots', data: allCsvRankShotsWithMinutes },
          { name: 'Assists', data: allCsvRankAssistsWithMinutes },
          { name: 'Crosses', data: allCsvRankCrossesWithMinutes },
          { name: 'Crosses to box', data: allCsvRankCrossesToGoalieBoxWithMinutes },
          { name: 'Dribbles attempted', data: allCsvRankDribblesWithMinutes },
          { name: 'Offensive duels', data: allCsvRankOffensiveDuelsWithMinutes },
          { name: 'Touches in box', data: allCsvRankTouchesInBoxWithMinutes },
          { name: 'Progressive carries', data: allCsvRankProgressiveRunsWithMinutes },
          { name: 'Accelerations', data: allCsvRankAccelerationsWithMinutes },
          { name: 'Fouls suffered', data: allCsvRankFoulsSufferedWithMinutes },
          { name: 'Passes', data: allCsvRankPassesWithMinutes },
          { name: 'Forward passes', data: allCsvRankForwardPassesWithMinutes },
          { name: 'Short passes', data: allCsvRankShortMediumPassesWithMinutes },
          { name: 'Long passes', data: allCsvRankLongPassesWithMinutes },
          { name: 'Expected assists (xA)', data: allCsvRankXAWithMinutes },
          { name: 'Shot assists', data: allCsvRankShotAssistsWithMinutes },
          { name: 'Key passes', data: allCsvRankKeyPassesWithMinutes },
          { name: 'Passes to final third', data: allCsvRankPassesToFinalThirdWithMinutes },
          { name: 'Passes to penalty box', data: allCsvRankPassesToPenaltyAreaWithMinutes },
          { name: 'Through passes', data: allCsvRankThroughPassesWithMinutes },
          { name: 'Deep completions', data: allCsvRankDeepCompletionsWithMinutes },
          { name: 'Progressive passes', data: allCsvRankProgressivePassesWithMinutes },
          { name: 'Shots conceded', data: allCsvRankShotsAgainstWithMinutes },
          { name: 'Clean sheets', data: allCsvRankCleanSheetsWithMinutes },
          { name: 'xG conceded', data: allCsvRankXGAgainstWithMinutes },
          { name: 'Prevented goals (PSxG-GA)', data: allCsvRankPreventedGoalsWithMinutes },
          { name: 'Line exits', data: allCsvRankExitsWithMinutes },
          { name: 'Defensive duels won %', data: allCsvRankDefensiveDuelsWonPercentageWithMinutes },
          { name: 'Aerial duels won %', data: allCsvRankAerialDuelsWonPercentageWithMinutes },
          { name: 'Shots on target %', data: allCsvRankShotsOnTargetPercentageWithMinutes },
          { name: 'Goal conversion %', data: allCsvRankGoalConversionPercentageWithMinutes },
          { name: 'Cross accuracy %', data: allCsvRankAccurateCrossesPercentageWithMinutes },
          { name: 'Dribble success rate %', data: allCsvRankSuccessfulDribblesPercentageWithMinutes },
          { name: 'Offensive duels won %', data: allCsvRankOffensiveDuelsWonPercentageWithMinutes },
          { name: 'Pass completion %', data: allCsvRankAccuratePassesPercentageWithMinutes },
          { name: 'Forward pass completion %', data: allCsvRankAccurateForwardPassesPercentageWithMinutes },
          { name: 'Short pass completion %', data: allCsvRankAccurateShortMediumPassesPercentageWithMinutes },
          { name: 'Long pass accuracy %', data: allCsvRankAccurateLongPassesPercentageWithMinutes },
          { name: 'Pass completion (to final third) %', data: allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes },
          { name: 'Pass completion (to penalty box) %', data: allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
          { name: 'Progressive pass accuracy %', data: allCsvRankAccurateProgressivePassesPercentageWithMinutes },
          { name: 'Save percentage %', data: allCsvRankSaveRatePercentageWithMinutes },
          { name: 'Pre-assists', data: allCsvRankPreAssistsPerNinetyWithMinutes },
        { name: 'Duels', data: allCsvRankDuelsPerNinetyWithMinutes },
        { name: 'Duels won %', data: allCsvRankDuelsWonPercentageWithMinutes },
        { name: 'Possession +/-', data: allCsvRankPossessionPlusMinusWithMinutes },
        { name: 'Forward pass ratio', data: allCsvRankForwardPassRatioWithMinutes },
        { name: 'xA per 100 passes', data: allCsvRankXAPer100PassesWithMinutes },
        { name: 'Chance creation ratio', data: allCsvRankChanceCreationRatioWithMinutes },
        { name: 'Goals + assists', data: allCsvRankGoalsAndAssistsPerNinetyWithMinutes },
        { name: 'Non-penalty goals + assists', data: allCsvRankNpGoalsAndAssistsPerNinetyWithMinutes },
        { name: 'xG + xA', data: allCsvRankXGAndxAPerNinetyWithMinutes },
        { name: 'Goals - xG', data: allCsvRankGoalsMinusxGPerNinetyWithMinutes },
        { name: 'Successful dribbles', data: allCsvRankSuccessfulDribblesPerNinetyWithMinutes },
        { name: 'Shots on target', data: allCsvRankShotsOnTargetPerNinetyWithMinutes },
        { name: 'Accurate crosses', data: allCsvRankAccurateCrossesPerNinetyWithMinutes },
        { name: 'Offensive duels won', data: allCsvRankOffensiveDuelsWonPerNinetyWithMinutes },
        { name: 'Defensive duels won', data: allCsvRankDefensiveDuelsWonPerNinetyWithMinutes },
        { name: 'Aerial duels won', data: allCsvRankAerialDuelsWonPerNinetyWithMinutes },
        { name: 'Passes completed', data: allCsvRankPassesCompletedPerNinetyWithMinutes },
        { name: 'Forward passes completed', data: allCsvRankForwardPassesCompletedPerNinetyWithMinutes },
        { name: 'Short passes completed', data: allCsvRankShortPassesCompletedPerNinetyWithMinutes },
        { name: 'Long passes completed', data: allCsvRankLongPassesCompletedPerNinetyWithMinutes },
        { name: 'Accurate passes to final third', data: allCsvRankAccuratePassesToFinalThirdPerNinetyWithMinutes },
        { name: 'Through passes completed', data: allCsvRankThroughPassesCompletedPerNinetyWithMinutes },
        { name: 'Progressive passes completed', data: allCsvRankProgressivePassesCompletedPerNinetyWithMinutes },
        { name: 'Saves', data: allCsvRankSavesPerNinetyWithMinutes },
        { name: 'Possessions won - lost', data: allCsvRankPossessionsWonMinusLostPerNinetyWithMinutes },
        { name: 'Progressive actions', data: allCsvRankProgressiveActionsPerNinetyWithMinutes },
        { name: 'Duels won', data: allCsvRankDuelsWonPerNinetyWithMinutes },
        { name: 'Non-penalty xG', data: allCsvRankNpxGPerNinetyWithMinutes },
        { name: 'npxG/Shot', data: allCsvRankNpxGPerShotWithMinutes },
        { name: 'npxG + xA', data: allCsvRankNpxGAndxAPerNinetyWithMinutes },
        { name: 'Touches', data: allCsvRankTouchesPerNinetyWithMinutes },
        { name: 'Progressive action rate', data: allCsvRankProgressiveActionRateWithMinutes },
        { name: 'Progressive passes (PAdj)', data: allCsvRankProgressivePassesPAdjWithMinutes },
        { name: 'Ball carrying frequency', data: allCsvRankBallCarryingFrequencyWithMinutes },
        { name: 'xG per 100 touches', data: allCsvRankXGPer100TouchesWithMinutes },
        { name: 'Shot frequency', data: allCsvRankShotFrequencyWithMinutes },
        { name: 'Dribbles per 100 touches', data: allCsvRankDribblesPerHundredTouchesWithMinutes },
        { name: 'Goals per 100 touches', data: allCsvRankGoalsPer100TouchesWithMinutes }
        ];
        
        const positionOrder = {
        'Goalkeeper': [
        'Prevented goals (PSxG-GA)',
        'Saves',
        'Save percentage %',
        'Clean sheets',
        'Shots conceded',
        'xG conceded',
        'Line exits',
        'Touches',
        'Passes',
        'Passes completed',
        'Pass completion %',
        'Short passes',
        'Short passes completed',
        'Short pass completion %',
        'Long passes',
        'Long passes completed',
        'Long pass accuracy %',
        'Passes to final third',
        'Progressive passes',
        'Pass completion (to final third) %',
        'Progressive pass accuracy %',
        'Through passes',
        'Defensive duels won',
        'Aerial duels won',
        'Possessions won',
        'Interceptions'
          ],
          'Centre-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Through passes completed',
            'Progressive carries',
            'Progressive actions',
            'Progressive action rate',
            'Ball carrying frequency',
            'Successful dribbles',
            'Key passes',
            'Assists',
            'Goals',
            'Headed goals'
          ],
          'Full-back': [
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked',
            'Possessions won',
            'Possessions won - lost',
            'Possession +/-',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Successful attacking actions',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Goals',
            'Expected goals (xG)',
            'Goals + assists',
            'xG + xA',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed'
          ],
          'Midfielder': [
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Forward passes',
            'Forward passes completed',
            'Forward pass completion %',
            'Forward pass ratio',
            'Short passes',
            'Short passes completed',
            'Short pass completion %',
            'Long passes',
            'Long passes completed',
            'Long pass accuracy %',
            'Progressive passes',
            'Progressive passes completed',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Accurate passes to final third',
            'Pass completion (to final third) %',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes',
            'Through passes completed',
            'Pre-assists',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'xA per 100 passes',
            'Key passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Headed goals',
            'Non-penalty xG',
            'Shots',
            'Shots on target',
            'npxG/Shot',
            'Goals - xG',
            'xG per 100 touches',
            'Goals per 100 touches',
            'Duels',
            'Duels won',
            'Duels won %',
            'Touches',
            'Touches in box',
            'Progressive actions',
            'Progressive action rate',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Successful attacking actions',
            'Fouls suffered',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Possession +/-',
            'Possessions won - lost',
            'Possessions won',
            'Defensive duels',
            'Defensive duels won',
            'Defensive duels won %',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Sliding tackles',
            'Sliding tackles (PAdj)',
            'Interceptions',
            'Interceptions (PAdj)',
            'Shots blocked'
          ],
          'Winger': [
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Crosses',
            'Accurate crosses',
            'Cross accuracy %',
            'Crosses to box',
            'Deep completions',
            'Goals',
            'Non-penalty goals',
            'Expected goals (xG)',
            'Non-penalty xG',
            'Goals per 100 touches',
            'xG per 100 touches',
            'Headed goals',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribble success rate %',
            'Dribbles per 100 touches',
            'Offensive duels',
            'Offensive duels won',
            'Offensive duels won %',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Fouls suffered',
            'Successful attacking actions',
            'Duels won',
            'Duels won %',
            'Touches in box',
            'Touches',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Long passes',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Progressive passes (PAdj)',
            'Passes to final third',
            'Passes to penalty box',
            'Pass completion (to penalty box) %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possession +/-',
            'Possessions won - lost',
            'Interceptions',
            'Defensive duels won',
            'Aerial duels won',
            'Aerial duels won %',
            'Possessions won'
          ],
          'Striker': [
            'Goals',
            'Non-penalty goals',
            'Goals per 100 touches',
            'Expected goals (xG)',
            'Non-penalty xG',
            'xG per 100 touches',
            'Shots',
            'Shots on target',
            'Shots on target %',
            'Goal conversion %',
            'Shot frequency',
            'npxG/Shot',
            'Goals - xG',
            'Headed goals',
            'Touches in box',
            'Goals + assists',
            'Non-penalty goals + assists',
            'xG + xA',
            'npxG + xA',
            'Assists',
            'Expected assists (xA)',
            'Shot assists',
            'Key passes',
            'xA per 100 passes',
            'Chance creation ratio',
            'Accurate crosses',
            'Successful attacking actions',
            'Progressive carries',
            'Accelerations',
            'Ball carrying frequency',
            'Dribbles attempted',
            'Successful dribbles',
            'Dribbles per 100 touches',
            'Fouls suffered',
            'Touches',
            'Duels won',
            'Duels won %',
            'Offensive duels',  
            'Offensive duels won',
            'Offensive duels won %',
            'Passes',
            'Passes completed',
            'Pass completion %',
            'Progressive passes',
            'Progressive pass accuracy %',
            'Through passes completed',
            'Progressive actions',
            'Progressive action rate',
            'Possessions won',
            'Interceptions',
            'Aerial duels',
            'Aerial duels won',
            'Aerial duels won %',
            'Defensive duels won'
          ]
          };

        // Reorder the metrics data array based on the selected player's position
        if (selectedPlayer.position in positionOrder) {
            const orderedMetricsData = positionOrder[selectedPlayer.position].map(metricName => metricsData.find(metric => metric.name === metricName));
            metricsData.splice(0, metricsData.length, ...orderedMetricsData);
        }

// Modify your sorting logic to conditionally perform sorting based on the state of the sortEnabled variable
if (sortEnabled) {

metricsData.sort((a, b) => {
const rankA = a.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;
const rankB = b.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

    // Handle "N/A" ranks by assigning a default value (e.g., Infinity)
    const defaultRank = Infinity;

    // Convert "N/A" ranks to a default value
    const numericRankA = rankA === "N/A" ? defaultRank : parseInt(rankA);
    const numericRankB = rankB === "N/A" ? defaultRank : parseInt(rankB);

    // Compare ranks
    return numericRankA - numericRankB;
});}

    // Construct HTML for metrics
  // Construct HTML for metrics
  const metricsHTML = metricsData.map(metric => {
    const selectedAge = parseInt(ageSelect.value);
        const filteredData8 = parseCSV(csvData).filter(player =>
    (!selectedAge || player.age <= selectedAge) );
    const playerRank = metric.data.find(rank => rank.player === selectedPlayer.player && rank.team === selectedPlayer.team).rank;

            // Get the current value for the selected player and metric
            const currentValue8 = getMetricValueFunction(filteredData8, selectedPlayer, metric.name);

            // Calculate the rank bar width
            const rankBarWidth8 = 100 - (((playerRank - 1) / filteredData8.length) * 100);


    // Interpolate between blue and red based on rank
    const red = Math.round((255 * (1 - Math.pow(rankBarWidth8 / 100, 2))) ); // Red decreases as rank decreases
    const green = Math.round(rankBarWidth8); // Green decreases as rank decreases
    const blue = Math.round((255 * Math.pow(rankBarWidth8 / 100, 2))); // Blue increases as rank increases
    const alpha = 0.75; // Alpha value remains constant

    // Construct the color string
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    if (playerRank !== undefined) {
        // Get the rank suffix
        const rankSuffix = getRankSuffix(playerRank);

        // Construct the HTML with the rank and suffix
        return `
            ${metric.name} – ${playerRank}${rankSuffix}
            <div class="rank-bar" onclick="toggleActive(this)">
              <div class="rank-bar-fill" style="width: ${rankBarWidth8}%; background-color: ${color}"></div>
                <span class="hover-content">${currentValue8}</span>
                                    
            </div>
          `;
    } else {
        // If player rank not found, display a message
        return `${metric.name} – Not available`;
    }
}).join('');
// Construct player results HTML
    playerResults = `
        ${metricsHTML}
          `;
          const selectedAge = parseInt(ageSelect.value);
        const filteredData8 = parseCSV(csvData).filter(player =>
    (!selectedAge || player.age <= selectedAge) );
   
// Define the exclusion mapping
const exclusionMapping = {
    'Goalkeeper': [
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Progressive carries',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Progressive passes',
    'Shots conceded',
    'xG conceded',
    'Defensive duel %',
    'Aerial duel %',
    'SoT %',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T',
    'Short passes comp', 'Long passes comp', 'Possessions won'
    ],
    'Centre-back': [
    'Long passes comp', 'Short passes comp', 'SoT %', 'Defensive duels won', 'Long passes', 'Short passes', 
    'Possessions won',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Attacking actions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Expected assists',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Goal conversion',
    'Cross %',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ], 
    'Full-back': [
    'Short passes', 'Long passes','Passes', 'Short pass %', 'Long pass %', 'Aerial duels', 
    'Defensive duels',
    'Tackles',
    'Shots blocked',
    'Interceptions',
    'Goals',
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Key passes',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Midfielder': [
    'Cross %', 'Short pass %', 'Long pass %', 'Prog passes (PAdj)', 'Aerial duels', 'Short passes', 'Long passes', 
    'Goals', 'Defensive duels won', 'Possessions won', 'Defensive duels', 'Tackles', 'Shots blocked', 'Interceptions', 
    'Non-penalty goals',
    'Expected goals',
    'Headed goals',
    'Shots',
    'Assists',
    'Crosses',
    'Crosses to box',
    'Dribbles attempted',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Dribble success %',
    'Offensive duel %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'Goals + assists',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Successful dribbles',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    ,
    'Winger': [
    'Possessions won', 'Progressive passes',
    'Poss won-lost',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Non-penalty goals',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'SoT %',
    'Goal conversion',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Goals + assists', 'Long pass %', 'Short pass %', 'Cross %', 'Aerial duel %', 'Defensive duel %', 'Long passes', 'Short passes', 'Passes', 'Aerial duels', 'Successful dribbles', 
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ],
    'Striker': [
    'Cross %', 'Pass %' , 'Short pass %', 'Long pass %', 'Goals + assists', 'Crosses', 'Dribbles attempted', 'Progressive carries', 'Passes', 'Short passes', 'Long passes', 'Defensive duel %', 'Progressive passes',
    'Possessions won',
    'Defensive duels',
    'Tackles',
    'Tackles (PAdj)',
    'Shots blocked',
    'Interceptions',
    'Interceptions (PAdj)',
    'Headed goals',
    'Shots',
    'Crosses to box',
    'Offensive duels',
    'Touches in box',
    'Accelerations',
    'Fouls suffered',
    'Forward passes',
    'Shot assists',
    'Passes to fin 3rd',
    'Passes to pen box',
    'Through passes',
    'Deep completions',
    'Shots conceded',
    'Clean sheets',
    'xG conceded',
    'Prevented goals',
    'Line exits',
    'Dribble success %',
    'Offensive duel %',
    'Forward pass %',
    'Pass to fin 3rd %',
    'Pass to pen box %',
    'Progressive pass %',
    'Save %',
    'Pre-assists',
    'Duels',
    'Duel %',
    'Poss +/-',
    'Forward pass ratio',
    'xA per 100 passes',
    'Creativity ratio',
    'NPG+A',
    'xG + xA',
    'Goals - xG',
    'Shots on target',
    'Accurate crosses',
    'Offensive duels won',
    'Defensive duels won',
    'Aerial duels won',
    'Passes completed',
    'Fwd passes comp',
    'Short passes comp',
    'Long passes comp',
    'Through passes comp',
    'Prog passes comp',
    'Saves',
    'Poss won-lost',
    'Progressive actions',
    'Duels won',
    'Non-penalty xG',
    'npxG/Shot',
    'npxG + xA',
    'Touches',
    'Prog action rate',
    'Prog passes (PAdj)',
    'Carrying frequency',
    'xG per 100T',
    'Shot frequency',
    'Dribbles per 100T',
    'Goal per 100T'
    ]
    };

const metricsToInclude = {
  'Defensive duels': allCsvRankDuelsWithMinutes,
  'Defensive duels won': allCsvRankDefensiveDuelsWonPerNinetyWithMinutes,
  'Aerial duels': allCsvRankAerialDuelsWithMinutes,
  'Aerial duels won': allCsvRankAerialDuelsWonPerNinetyWithMinutes,
  'Defensive duel %': allCsvRankDefensiveDuelsWonPercentageWithMinutes,
  'Aerial duel %': allCsvRankAerialDuelsWonPercentageWithMinutes,
  'Possessions won': allCsvRankActionsWithMinutes,
  'Tackles': allCsvRankSlidingTacklesWithMinutes,
  'Tackles (PAdj)': allCsvRankPAdjSlidingTacklesWithMinutes,
  'Interceptions': allCsvRankInterceptionsWithMinutes,
  'Interceptions (PAdj)': allCsvRankPAdjInterceptionsWithMinutes,
  'Shots blocked': allCsvRankShotsBlockedWithMinutes,
  'Duels': allCsvRankDuelsPerNinetyWithMinutes,
  'Duels won': allCsvRankDuelsWonPerNinetyWithMinutes,
  'Duel %': allCsvRankDuelsWonPercentageWithMinutes,
  'Poss won-lost': allCsvRankPossessionsWonMinusLostPerNinetyWithMinutes,
  'Poss +/-': allCsvRankPossessionPlusMinusWithMinutes,
  'Touches': allCsvRankTouchesPerNinetyWithMinutes,
  'Touches in box': allCsvRankTouchesInBoxWithMinutes,
  'Goals': allCsvRankGoalsWithMinutes,
  'Non-penalty goals': allCsvRankNonPenaltyGoalsWithMinutes,
  'Expected goals': allCsvRankXGWithMinutes,
  'Headed goals': allCsvRankHeadGoalsWithMinutes,
  'Shots': allCsvRankShotsWithMinutes,
  'SoT %': allCsvRankShotsOnTargetPercentageWithMinutes,
  'Shots on target': allCsvRankShotsOnTargetPerNinetyWithMinutes,
  'Goals - xG': allCsvRankGoalsMinusxGPerNinetyWithMinutes,
  'Non-penalty xG': allCsvRankNpxGPerNinetyWithMinutes,
  'Goal per 100T': allCsvRankGoalsPer100TouchesWithMinutes,
  'xG per 100T': allCsvRankXGPer100TouchesWithMinutes,
  'Shot frequency': allCsvRankShotFrequencyWithMinutes,
  'Goal conversion': allCsvRankGoalConversionPercentageWithMinutes,
  'npxG/Shot': allCsvRankNpxGPerShotWithMinutes,
  'xG + xA': allCsvRankXGAndxAPerNinetyWithMinutes,
  'npxG + xA': allCsvRankNpxGAndxAPerNinetyWithMinutes,
  'Goals + assists': allCsvRankGoalsAndAssistsPerNinetyWithMinutes,
  'NPG+A': allCsvRankNpGoalsAndAssistsPerNinetyWithMinutes,
  'Assists': allCsvRankAssistsWithMinutes,
  'Expected assists': allCsvRankXAWithMinutes,
  'Key passes': allCsvRankKeyPassesWithMinutes,
  'Shot assists': allCsvRankShotAssistsWithMinutes,
  'xA per 100 passes': allCsvRankXAPer100PassesWithMinutes,
  'Creativity ratio': allCsvRankChanceCreationRatioWithMinutes,
  'Deep completions': allCsvRankDeepCompletionsWithMinutes,
  'Crosses': allCsvRankCrossesWithMinutes,
  'Accurate crosses': allCsvRankAccurateCrossesPerNinetyWithMinutes,
  'Cross %': allCsvRankAccurateCrossesPercentageWithMinutes,
  'Crosses to box': allCsvRankCrossesToGoalieBoxWithMinutes,
  'Passes': allCsvRankPassesWithMinutes,
  'Passes completed': allCsvRankPassesCompletedPerNinetyWithMinutes,
  'Forward passes': allCsvRankForwardPassesWithMinutes,
  'Fwd passes comp': allCsvRankForwardPassesCompletedPerNinetyWithMinutes,
  'Short passes': allCsvRankShortMediumPassesWithMinutes,
  'Short passes comp': allCsvRankShortPassesCompletedPerNinetyWithMinutes,
  'Long passes': allCsvRankLongPassesWithMinutes,
  'Long passes comp': allCsvRankLongPassesCompletedPerNinetyWithMinutes,
  'Progressive passes': allCsvRankProgressivePassesWithMinutes,
  'Prog passes comp': allCsvRankProgressivePassesCompletedPerNinetyWithMinutes,
  'Prog passes (PAdj)': allCsvRankProgressivePassesPAdjWithMinutes,
  'Passes to fin 3rd': allCsvRankPassesToFinalThirdWithMinutes,
  'Passes to pen box': allCsvRankPassesToPenaltyAreaWithMinutes,
  'Through passes': allCsvRankThroughPassesWithMinutes,
  'Through passes comp': allCsvRankThroughPassesCompletedPerNinetyWithMinutes,
  'Pass %': allCsvRankAccuratePassesPercentageWithMinutes,
  'Forward pass %': allCsvRankAccurateForwardPassesPercentageWithMinutes,
  'Short pass %': allCsvRankAccurateShortMediumPassesPercentageWithMinutes,
  'Progressive pass %': allCsvRankAccurateProgressivePassesPercentageWithMinutes,
  'Long pass %': allCsvRankAccurateLongPassesPercentageWithMinutes,
  'Pass to fin 3rd %': allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes,
  'Pass to pen box %': allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
  'Pre-assists': allCsvRankPreAssistsPerNinetyWithMinutes,
  'Forward pass ratio': allCsvRankForwardPassRatioWithMinutes,
  'Progressive actions': allCsvRankProgressiveActionsPerNinetyWithMinutes,
  'Prog action rate': allCsvRankProgressiveActionRateWithMinutes,
  'Progressive carries': allCsvRankProgressiveRunsWithMinutes,
  'Carrying frequency': allCsvRankBallCarryingFrequencyWithMinutes,
  'Accelerations': allCsvRankAccelerationsWithMinutes,
  'Offensive duels': allCsvRankOffensiveDuelsWithMinutes,
  'Offensive duels won': allCsvRankOffensiveDuelsWonPerNinetyWithMinutes,
  'Offensive duel %': allCsvRankOffensiveDuelsWonPercentageWithMinutes,
  'Dribbles attempted': allCsvRankDribblesWithMinutes,
  'Successful dribbles': allCsvRankSuccessfulDribblesPerNinetyWithMinutes,
  'Dribble success %': allCsvRankSuccessfulDribblesPercentageWithMinutes,
  'Dribbles per 100T': allCsvRankDribblesPerHundredTouchesWithMinutes,
  'Attacking actions': allCsvRankSuccessfulAttackingActionsWithMinutes,
  'Fouls suffered': allCsvRankFoulsSufferedWithMinutes,
  'Save %': allCsvRankSaveRatePercentageWithMinutes,
  'Saves': allCsvRankSavesPerNinetyWithMinutes,
  'Shots conceded': allCsvRankShotsAgainstWithMinutes,
  'Clean sheets': allCsvRankCleanSheetsWithMinutes,
  'xG conceded': allCsvRankXGAgainstWithMinutes,
  'Prevented goals': allCsvRankPreventedGoalsWithMinutes,
  'Line exits': allCsvRankExitsWithMinutes,
};


// Filter out the excluded metrics based on position
const playerPosition = selectedPlayer.position;
const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
    !exclusionMapping[playerPosition]?.includes(metric)
);

const rankData = {};

// Compute the rank data only for the included metrics
metricsToCompute.forEach(metric => {
    const data = metricsToInclude[metric];
    const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

    rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
        ? 1
        : playerData.rank === 1
            ? 0
            : playerData.rank / filteredData8.length;
});

document.getElementById('chartTitle').innerHTML = `
<img class="logo-image2" src="https://datamb.football/logopro.png" alt="">
<h3><b>${selectedPlayer.player} (${selectedPlayer.team}, ${selectedPlayer.age})</b></h3>
        <h1><i>vs All Leagues ${titleSuffix} players</i></h1>
            
 `;
document.getElementById('chartButton').innerHTML = `
       <div class="dropdown">
            <button class="dropbtn"><i class="fa fa-bar-chart"></i></button>
            <div id="metric-controls" class="dropdown-content">
                <!-- Checkboxes will be generated here by JavaScript -->
            </div>
</div> `;

    createPizzaChart(rankData, player.player);
// JavaScript part
let userExclusions = new Set();

// Function to populate checkboxes in the dropdown
function populateMetricControls() {
    const metricControlsDiv = document.getElementById('metric-controls');
    metricControlsDiv.innerHTML = ''; // Clear any existing content

    Object.keys(metricsToInclude).forEach(metric => {
        const isExcluded = exclusionMapping[playerPosition]?.includes(metric) || userExclusions.has(metric);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-metric', metric);
        checkbox.checked = !isExcluded;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(metric));
        
        metricControlsDiv.appendChild(label);

        // Add event listener to handle changes
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Remove the metric from userExclusions and exclusionMapping
                userExclusions.delete(metric);

                // Remove the metric from exclusionMapping array for the player's position
                const index = exclusionMapping[playerPosition]?.indexOf(metric);
                if (index !== -1) {
                    exclusionMapping[playerPosition].splice(index, 1);
                }
            } else {
                userExclusions.add(metric);
            }
            updateChart();
        });
    });
}
function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('show');
}

// Function to update the chart based on current exclusions

// Function to update the chart based on current exclusions
function updateChart() {
    // Filter out the excluded metrics based on position and user selections
    const metricsToCompute = Object.keys(metricsToInclude).filter(metric => 
        !exclusionMapping[playerPosition]?.includes(metric) && !userExclusions.has(metric)
    );

    const rankData = {};

    // Compute the rank data only for the included metrics
    metricsToCompute.forEach(metric => {
        const data = metricsToInclude[metric];
        const playerData = data.find(rank => rank.player === player.player && rank.team === player.team);

        rankData[metric] =  playerData.rank === "N/A" || playerData.rank === "0"
            ? 1
            : playerData.rank === 1
                ? 0
                : playerData.rank / filteredData8.length;
    });

    // Redraw the chart with the updated rank data
    createPizzaChart(rankData, player.player);
}
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);

// Initial setup: populate the dropdown with checkboxes
populateMetricControls();

// Initial chart rendering
updateChart();

}


    // Add more sections as needed

    document.getElementById('results').innerHTML = playerResults;
  }

 



const parsedData = parseCSV(csvData);
populatePlayerOptions();

function populatePlayerOptions() {
    const playerSelect = document.getElementById('playerSelect');
    const spinner = document.querySelector('.spinner');
    filterPlayerOptions();

    // Function to remove special characters from a string
    function removeSpecialChars(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'') 
        .replace(/Ø/g, 'O')
        .replace(/ø/g, 'o')
        .replace(/ı/g, 'i');
      }

    // Function to filter player options based on search text
    function filterPlayerOptions(searchText = '') {
        // Clear existing options
        playerSelect.innerHTML = '';

        const emptyOption = document.createElement('option');
        emptyOption.value = ''; // Set an empty value
        emptyOption.textContent = ''; // Provide a placeholder text
        playerSelect.appendChild(emptyOption);

        // Filter players based on search text
        const filteredPlayers = parsedData.filter(player => {
            const playerName = player.player.toLowerCase();
            const playerNameWithoutSpecialChars = removeSpecialChars(playerName);
            return playerName.includes(searchText.toLowerCase()) ||
                playerNameWithoutSpecialChars.includes(searchText.toLowerCase());
        });

        // Append filtered player options
        filteredPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = player.player;
            option.textContent = `${player.player}, ${player.position}, ${player.team}`;
            playerSelect.appendChild(option);
        });

        // Sort the options alphabetically
        const optionsArray = Array.from(playerSelect.options);
        optionsArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
        optionsArray.forEach(option => playerSelect.appendChild(option));

        // Ensure nothing is pre-selected
        playerSelect.selectedIndex = -1;
    }

    
    // Call filterPlayerOptions initially without any searchText

    // Bind event listeners to update player options
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchText = this.value.trim();
        filterPlayerOptions(searchText);
    });

    // Handle keyup event to update player options (for Safari)
    searchInput.addEventListener('keyup', function () {
        const searchText = this.value.trim();
        filterPlayerOptions(searchText);
    });

    // Hide spinner
    spinner.style.display = 'none';
}

  

      const searchInput = document.getElementById('searchInput');
      const customDropdown = document.querySelector('.custom-dropdown');
      const playerSelect = document.getElementById('playerSelect');
      const spinner = document.querySelector('.spinner');




// Bind event listener to the search input
searchInput.addEventListener('input', function () {
  // Show spinner

  // Get the search text and remove special characters
  const searchText = removeSpecialChars(this.value.trim());

  // Simulate long computation with setTimeout
  setTimeout(() => {
    // Loop through options and display only those that match the search text
    for (let i = 0; i < playerSelect.options.length; i++) {
      const optionText = playerSelect.options[i].textContent;
      if (removeSpecialChars(optionText.toLowerCase()).includes(searchText.toLowerCase()) || i === 0) {
        playerSelect.options[i].style.display = '';
      } else {
        playerSelect.options[i].style.display = 'none';
      }
    }

    // Show or hide the custom dropdown based on input value
    if (searchText === '') {
      customDropdown.classList.remove('open');
    } else {
      customDropdown.classList.add('open');
    }

    // Hide spinner
    hideSpinner();
  }, 1); // Adjust the timeout value as needed
});

      // Bind event listener to the select element for selection
      playerSelect.addEventListener('change', function () {
        // Show spinner
        showSpinner();

        const selectedIndex = this.selectedIndex;
        searchInput.value = '';
        const selectedPlayerName = this.options[selectedIndex].value;
        const selectedPlayerPosition = this.options[selectedIndex].textContent.split(', ')[1];
        const selectedPlayerTeam = this.options[selectedIndex].textContent.split(', ')[2];
        const selectedPlayer = {
          player: selectedPlayerName,
          team: selectedPlayerTeam,
          position: selectedPlayerPosition
        };

        // Simulate long computation with setTimeout
        setTimeout(() => {
          displaySelectedPlayer(selectedPlayer);

          // Hide spinner
          hideSpinner();
        }, 1000); // Adjust the timeout value as needed
      });

      // Bind event listener to sectionSelect for selection
      document.getElementById('sectionSelect').addEventListener('change', function () {
        // Show spinner
        showSpinner();

        // Simulate long computation with setTimeout
        setTimeout(() => {
            displaySelectedPlayer();
          // Hide spinner
          hideSpinner();
        }, 1000); // Adjust the timeout value as needed
      });

      // Bind event listener to ageSelect for selection
      document.getElementById('ageSelect').addEventListener('change', function () {
        // Show spinner
        showSpinner();

        // Simulate long computation with setTimeout
        setTimeout(() => {
            displaySelectedPlayer();

          // Hide spinner
          hideSpinner();
        }, 1000); // Adjust the timeout value as needed
      });
 

    // Your existing code for populating options and other event listeners
    
    // Bind event listener to toggleMetrics for selection
    document.getElementById('toggleMetrics').addEventListener('change', function () {
        // Show spinner
        showSpinner();

        // Simulate long computation with setTimeout
        setTimeout(() => {
            displaySelectedPlayer();
            // Hide spinner
            hideSpinner();
        }, 1000); // Adjust the timeout value as needed
    });


document.getElementById('toggleSortingButton').addEventListener('change', function () {
    // Show spinner
    showSpinner();

    // Toggle the sorting preference
    sortEnabled = !sortEnabled;



    // Simulate long computation with setTimeout
    setTimeout(() => {
        // Display selected player again to reflect the change
        displaySelectedPlayer();

        // Hide spinner
        hideSpinner();
    }, 1000); // Adjust the timeout value as needed
});


};function toggleActive(element) {
  element.classList.toggle('active');
}

const resultsDiv = document.getElementById('results');
const chartContainer = document.getElementById('chartContainer');




window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.parentElement.classList.contains('show')) {
                openDropdown.parentElement.classList.remove('show');
            }
        }
    }
}
