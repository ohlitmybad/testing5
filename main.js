
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

let teamData = [];
allData.forEach(row => {
    if (row.length >= 3) {
        const team = row[1];
        const league = getTeamLeague(team);

        if (league !== "Unknown League") {
            row.splice(2, 0, league);
            const filteredRow = row.filter((_, index) => !columnsToDelete.includes(index));
            teamData.push(filteredRow);
        }
    }
});

allData = teamData;

let outputLines = [];
allData.forEach(row => {
    let rowString = row.join(",");
    outputLines.push(rowString);
});
const csvData = outputLines.join("\n");

const parsedData = parseCSV(csvData);
	
  
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
    
    
 function calculateRankForMetric(data, metric, transformFn) {

        const processedData = data.map(transformFn || (p => p));
        
        // Store the first occurrence of each unique player-team combo
        const uniquePlayers = new Map();
        for (const player of processedData) {
            const key = `${player.player}-${player.team}`;
            if (!uniquePlayers.has(key)) {
                uniquePlayers.set(key, player);
            }
        }
        // Sort unique players by metric (Descending order)
        const sortedData = [...uniquePlayers.values()].sort((a, b) => b[metric] - a[metric]);
        
        // Assign ranks
        let rank = 1, prevValue = null;
        return sortedData.map((player, i) => {
            if (player[metric] === 0) return { player: player.player, team: player.team, rank: "N/A" };
            if (player[metric] !== prevValue) rank = i + 1;
            prevValue = player[metric];
            return { player: player.player, team: player.team, rank };
        });
    }
    
    function displayPlayerRankings(player) {
        
        const selectedPlayer = parsedData.find(p => p.player === player.player && p.position === player.position && p.team === player.team);
        const selectedAge = parseInt(document.getElementById('ageSelect').value);
        const toggleMetrics = document.getElementById('toggleMetrics').checked;
        const getMetricValueFunction = toggleMetrics ? updateCurrentMetricValue : getCurrentMetricValue;
        
    const baseFiltered = selectedAge ? parsedData.filter(p => p.age <= selectedAge) : parsedData;

    const samePositionAndLeague = baseFiltered.filter(p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

    const samePosition = baseFiltered.filter(p => p.position === selectedPlayer.position);

    const sameLeague = baseFiltered.filter(p => p.league === selectedPlayer.league);






    const sectionSelect = document.getElementById('sectionSelect');
    const selectedSection = sectionSelect.options[sectionSelect.selectedIndex].value;
    let titleSuffix = ''; // Initialize the title suffix

// Update the title suffix based on the selected age
if (selectedAge && selectedAge !== '') {
    titleSuffix = ` U${selectedAge}`;
}

    let playerResults = '';

    if (selectedSection === 'samePositionAndLeague') {
const samePositionAndLeagueAccelerations = calculateRankForMetric(samePositionAndLeague, 'accelerations');
const samePositionAndLeagueAccelerationsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const samePositionAndLeagueAccurateCrossesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPercentage');
const samePositionAndLeagueAccurateCrossesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateCrossesPerNinety = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPerNinety');
const samePositionAndLeagueAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccurateForwardPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateForwardPassesPercentage');
const samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateForwardPassesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateLongPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateLongPassesPercentage');
const samePositionAndLeagueAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateLongPassesPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesPercentage');
const samePositionAndLeagueAccuratePassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesToFinalThirdPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPercentage');
const samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPerNinety');
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToPenaltyAreaPercentage');
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const samePositionAndLeagueAccurateProgressivePassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateProgressivePassesPercentage');
const samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateProgressivePassesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateShortMediumPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateShortMediumPassesPercentage');
const samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateShortMediumPassesPercentage', p => ({...p}));
const samePositionAndLeagueActions = calculateRankForMetric(samePositionAndLeague, 'defActions');
const samePositionAndLeagueActionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const samePositionAndLeagueAerialDuels = calculateRankForMetric(samePositionAndLeague, 'aerialDuels');
const samePositionAndLeagueAerialDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const samePositionAndLeagueAerialDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPercentage');
const samePositionAndLeagueAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueAerialDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPerNinety');
const samePositionAndLeagueAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAssists = calculateRankForMetric(samePositionAndLeague, 'assists');
const samePositionAndLeagueAssistsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const samePositionAndLeagueBallCarryingFrequency = calculateRankForMetric(samePositionAndLeague, 'ballCarryingFrequency');
const samePositionAndLeagueBallCarryingFrequencyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'ballCarryingFrequency');
const samePositionAndLeagueChanceCreationRatio = calculateRankForMetric(samePositionAndLeague, 'chanceCreationRatio');
const samePositionAndLeagueChanceCreationRatioWithMinutes = calculateRankForMetric(samePositionAndLeague, 'chanceCreationRatio');
const samePositionAndLeagueCleanSheets = calculateRankForMetric(samePositionAndLeague, 'cleanSheets');
const samePositionAndLeagueCleanSheetsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'cleanSheets');
const samePositionAndLeagueCrosses = calculateRankForMetric(samePositionAndLeague, 'crosses');
const samePositionAndLeagueCrossesToGoalieBox = calculateRankForMetric(samePositionAndLeague, 'crossesToGoalieBox');
const samePositionAndLeagueCrossesToGoalieBoxWithMinutes = calculateRankForMetric(samePositionAndLeague, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const samePositionAndLeagueCrossesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const samePositionAndLeagueDeepCompletions = calculateRankForMetric(samePositionAndLeague, 'deepCompletions');
const samePositionAndLeagueDeepCompletionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const samePositionAndLeagueDefensiveDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPercentage');
const samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueDefensiveDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPerNinety');
const samePositionAndLeagueDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDribbles = calculateRankForMetric(samePositionAndLeague, 'dribbles');
const samePositionAndLeagueDribblesPerHundredTouches = calculateRankForMetric(samePositionAndLeague, 'dribblesPerHundredTouches');
const samePositionAndLeagueDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'dribblesPerHundredTouches');
const samePositionAndLeagueDribblesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const samePositionAndLeagueDuels = calculateRankForMetric(samePositionAndLeague, 'defDuels');
const samePositionAndLeagueDuelsPerNinety = calculateRankForMetric(samePositionAndLeague, 'duelsPerNinety');
const samePositionAndLeagueDuelsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const samePositionAndLeagueDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'duelsWonPercentage');
const samePositionAndLeagueDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsWonPercentage');
const samePositionAndLeagueDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'duelsWonPerNinety');
const samePositionAndLeagueDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueExits = calculateRankForMetric(samePositionAndLeague, 'exits');
const samePositionAndLeagueExitsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const samePositionAndLeagueForwardPasses = calculateRankForMetric(samePositionAndLeague, 'forwardPasses');
const samePositionAndLeagueForwardPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'forwardPassesCompletedPerNinety');
const samePositionAndLeagueForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueForwardPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const samePositionAndLeagueForwardPassRatio = calculateRankForMetric(samePositionAndLeague, 'forwardPassRatio');
const samePositionAndLeagueForwardPassRatioWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPassRatio');
const samePositionAndLeagueFoulsSuffered = calculateRankForMetric(samePositionAndLeague, 'foulsSuffered');
const samePositionAndLeagueFoulsSufferedWithMinutes = calculateRankForMetric(samePositionAndLeague, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const samePositionAndLeagueGoalConversionPercentage = calculateRankForMetric(samePositionAndLeague, 'goalConversionPercentage');
const samePositionAndLeagueGoalConversionPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalConversionPercentage', p => ({...p}));
const samePositionAndLeagueGoals = calculateRankForMetric(samePositionAndLeague, 'goals');
const samePositionAndLeagueGoalsAndAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'goalsAndAssistsPerNinety');
const samePositionAndLeagueGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueGoalsMinusxGPerNinety = calculateRankForMetric(samePositionAndLeague, 'goalsMinusxGPerNinety');
const samePositionAndLeagueGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueGoalsPer100Touches = calculateRankForMetric(samePositionAndLeague, 'goalsPer100Touches');
const samePositionAndLeagueGoalsPer100TouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsPer100Touches');
const samePositionAndLeagueGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const samePositionAndLeagueHeadGoals = calculateRankForMetric(samePositionAndLeague, 'headGoals');
const samePositionAndLeagueHeadGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const samePositionAndLeagueInterceptions = calculateRankForMetric(samePositionAndLeague, 'interceptions');
const samePositionAndLeagueInterceptionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const samePositionAndLeagueKeyPasses = calculateRankForMetric(samePositionAndLeague, 'keyPasses');
const samePositionAndLeagueKeyPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const samePositionAndLeagueLongPasses = calculateRankForMetric(samePositionAndLeague, 'longPasses');
const samePositionAndLeagueLongPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'longPassesCompletedPerNinety');
const samePositionAndLeagueLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueLongPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const samePositionAndLeagueNonPenaltyGoals = calculateRankForMetric(samePositionAndLeague, 'nonPenaltyGoals');
const samePositionAndLeagueNonPenaltyGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const samePositionAndLeagueNpGoalsAndAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'npGoalsAndAssistsPerNinety');
const samePositionAndLeagueNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueNpxGAndxAPerNinety = calculateRankForMetric(samePositionAndLeague, 'npxGAndxAPerNinety');
const samePositionAndLeagueNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGPerNinety = calculateRankForMetric(samePositionAndLeague, 'npxGPerNinety');
const samePositionAndLeagueNpxGPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGPerShot = calculateRankForMetric(samePositionAndLeague, 'npxGPerShot');
const samePositionAndLeagueNpxGPerShotWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGPerShot');
const samePositionAndLeagueOffensiveDuels = calculateRankForMetric(samePositionAndLeague, 'offensiveDuels');
const samePositionAndLeagueOffensiveDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const samePositionAndLeagueOffensiveDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPercentage');
const samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueOffensiveDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPerNinety');
const samePositionAndLeagueOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePAdjInterceptions = calculateRankForMetric(samePositionAndLeague, 'pAdjInterceptions');
const samePositionAndLeaguePAdjInterceptionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'pAdjInterceptions');
const samePositionAndLeaguePAdjSlidingTackles = calculateRankForMetric(samePositionAndLeague, 'pAdjSlidingTackles');
const samePositionAndLeaguePAdjSlidingTacklesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'pAdjSlidingTackles');
const samePositionAndLeaguePasses = calculateRankForMetric(samePositionAndLeague, 'passes');
const samePositionAndLeaguePassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'passesCompletedPerNinety');
const samePositionAndLeaguePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePassesToFinalThird = calculateRankForMetric(samePositionAndLeague, 'passesToFinalThird');
const samePositionAndLeaguePassesToFinalThirdWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const samePositionAndLeaguePassesToPenaltyArea = calculateRankForMetric(samePositionAndLeague, 'passesToPenaltyArea');
const samePositionAndLeaguePassesToPenaltyAreaWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const samePositionAndLeaguePassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const samePositionAndLeaguePossessionPlusMinus = calculateRankForMetric(samePositionAndLeague, 'possessionPlusMinus');
const samePositionAndLeaguePossessionPlusMinusWithMinutes = calculateRankForMetric(samePositionAndLeague, 'possessionPlusMinus');
const samePositionAndLeaguePossessionsWonMinusLostPerNinety = calculateRankForMetric(samePositionAndLeague, 'possessionsWonMinusLostPerNinety');
const samePositionAndLeaguePossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePreAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'preAssistsPerNinety');
const samePositionAndLeaguePreAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePreventedGoals = calculateRankForMetric(samePositionAndLeague, 'preventedGoals');
const samePositionAndLeaguePreventedGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const samePositionAndLeagueProgressiveActionRate = calculateRankForMetric(samePositionAndLeague, 'progressiveActionRate');
const samePositionAndLeagueProgressiveActionRateWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveActionRate');
const samePositionAndLeagueProgressiveActionsPerNinety = calculateRankForMetric(samePositionAndLeague, 'progressiveActionsPerNinety');
const samePositionAndLeagueProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressivePasses = calculateRankForMetric(samePositionAndLeague, 'progressivePasses');
const samePositionAndLeagueProgressivePassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'progressivePassesCompletedPerNinety');
const samePositionAndLeagueProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressivePassesPAdj = calculateRankForMetric(samePositionAndLeague, 'progressivePassesPAdj');
const samePositionAndLeagueProgressivePassesPAdjWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePassesPAdj');
const samePositionAndLeagueProgressivePassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const samePositionAndLeagueProgressiveRuns = calculateRankForMetric(samePositionAndLeague, 'progressiveRuns');
const samePositionAndLeagueProgressiveRunsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const samePositionAndLeagueSaveRatePercentage = calculateRankForMetric(samePositionAndLeague, 'saveRatePercentage');
const samePositionAndLeagueSaveRatePercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'saveRatePercentage', p => ({...p}));
const samePositionAndLeagueSavesPerNinety = calculateRankForMetric(samePositionAndLeague, 'savesPerNinety');
const samePositionAndLeagueSavesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShortMediumPasses = calculateRankForMetric(samePositionAndLeague, 'shortMediumPasses');
const samePositionAndLeagueShortMediumPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const samePositionAndLeagueShortPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'shortPassesCompletedPerNinety');
const samePositionAndLeagueShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShotAssists = calculateRankForMetric(samePositionAndLeague, 'shotAssists');
const samePositionAndLeagueShotAssistsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const samePositionAndLeagueShotFrequency = calculateRankForMetric(samePositionAndLeague, 'shotFrequency');
const samePositionAndLeagueShotFrequencyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotFrequency');
const samePositionAndLeagueShots = calculateRankForMetric(samePositionAndLeague, 'shots');
const samePositionAndLeagueShotsAgainst = calculateRankForMetric(samePositionAndLeague, 'shotsAgainst');
const samePositionAndLeagueShotsAgainstWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const samePositionAndLeagueShotsBlocked = calculateRankForMetric(samePositionAndLeague, 'shotsBlocked');
const samePositionAndLeagueShotsBlockedWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const samePositionAndLeagueShotsOnTargetPercentage = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPercentage');
const samePositionAndLeagueShotsOnTargetPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPercentage', p => ({...p}));
const samePositionAndLeagueShotsOnTargetPerNinety = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPerNinety');
const samePositionAndLeagueShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShotsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const samePositionAndLeagueSlidingTackles = calculateRankForMetric(samePositionAndLeague, 'slidingTackles');
const samePositionAndLeagueSlidingTacklesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulAttackingActions = calculateRankForMetric(samePositionAndLeague, 'successfulAttackingActions');
const samePositionAndLeagueSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulDribblesPercentage = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPercentage');
const samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPercentage', p => ({...p}));
const samePositionAndLeagueSuccessfulDribblesPerNinety = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPerNinety');
const samePositionAndLeagueSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueThroughPasses = calculateRankForMetric(samePositionAndLeague, 'throughPasses');
const samePositionAndLeagueThroughPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'throughPassesCompletedPerNinety');
const samePositionAndLeagueThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueThroughPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const samePositionAndLeagueTouchesInBox = calculateRankForMetric(samePositionAndLeague, 'touchesInBox');
const samePositionAndLeagueTouchesInBoxWithMinutes = calculateRankForMetric(samePositionAndLeague, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const samePositionAndLeagueTouchesPerNinety = calculateRankForMetric(samePositionAndLeague, 'touchesPerNinety');
const samePositionAndLeagueTouchesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueXA = calculateRankForMetric(samePositionAndLeague, 'xA');
const samePositionAndLeagueXAPer100Passes = calculateRankForMetric(samePositionAndLeague, 'xAPer100Passes');
const samePositionAndLeagueXAPer100PassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xAPer100Passes');
const samePositionAndLeagueXAWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const samePositionAndLeagueXG = calculateRankForMetric(samePositionAndLeague, 'xG');
const samePositionAndLeagueXGAgainst = calculateRankForMetric(samePositionAndLeague, 'xGAgainst');
const samePositionAndLeagueXGAgainstWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const samePositionAndLeagueXGAndxAPerNinety = calculateRankForMetric(samePositionAndLeague, 'xGAndxAPerNinety');
const samePositionAndLeagueXGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueXGPer100Touches = calculateRankForMetric(samePositionAndLeague, 'xGPer100Touches');
const samePositionAndLeagueXGPer100TouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGPer100Touches');
const samePositionAndLeagueXGWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
    const filteredData1 = parsedData.filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
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
const filteredData1 = parsedData.filter(player => 
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
const samePositionAndLeagueAccelerations = calculateRankForMetric(samePositionAndLeague, 'accelerations');
const samePositionAndLeagueAccelerationsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const samePositionAndLeagueAccurateCrossesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPercentage');
const samePositionAndLeagueAccurateCrossesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateCrossesPerNinety = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPerNinety');
const samePositionAndLeagueAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccurateForwardPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateForwardPassesPercentage');
const samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateForwardPassesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateLongPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateLongPassesPercentage');
const samePositionAndLeagueAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateLongPassesPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesPercentage');
const samePositionAndLeagueAccuratePassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesToFinalThirdPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPercentage');
const samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPerNinety');
const samePositionAndLeagueAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToPenaltyAreaPercentage');
const samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const samePositionAndLeagueAccurateProgressivePassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateProgressivePassesPercentage');
const samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateProgressivePassesPercentage', p => ({...p}));
const samePositionAndLeagueAccurateShortMediumPassesPercentage = calculateRankForMetric(samePositionAndLeague, 'accurateShortMediumPassesPercentage');
const samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'accurateShortMediumPassesPercentage', p => ({...p}));
const samePositionAndLeagueActions = calculateRankForMetric(samePositionAndLeague, 'defActions');
const samePositionAndLeagueActionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const samePositionAndLeagueAerialDuels = calculateRankForMetric(samePositionAndLeague, 'aerialDuels');
const samePositionAndLeagueAerialDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const samePositionAndLeagueAerialDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPercentage');
const samePositionAndLeagueAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueAerialDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPerNinety');
const samePositionAndLeagueAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueAssists = calculateRankForMetric(samePositionAndLeague, 'assists');
const samePositionAndLeagueAssistsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const samePositionAndLeagueBallCarryingFrequency = calculateRankForMetric(samePositionAndLeague, 'ballCarryingFrequency');
const samePositionAndLeagueBallCarryingFrequencyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'ballCarryingFrequency');
const samePositionAndLeagueChanceCreationRatio = calculateRankForMetric(samePositionAndLeague, 'chanceCreationRatio');
const samePositionAndLeagueChanceCreationRatioWithMinutes = calculateRankForMetric(samePositionAndLeague, 'chanceCreationRatio');
const samePositionAndLeagueCleanSheets = calculateRankForMetric(samePositionAndLeague, 'cleanSheets');
const samePositionAndLeagueCleanSheetsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'cleanSheets');
const samePositionAndLeagueCrosses = calculateRankForMetric(samePositionAndLeague, 'crosses');
const samePositionAndLeagueCrossesToGoalieBox = calculateRankForMetric(samePositionAndLeague, 'crossesToGoalieBox');
const samePositionAndLeagueCrossesToGoalieBoxWithMinutes = calculateRankForMetric(samePositionAndLeague, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const samePositionAndLeagueCrossesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const samePositionAndLeagueDeepCompletions = calculateRankForMetric(samePositionAndLeague, 'deepCompletions');
const samePositionAndLeagueDeepCompletionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const samePositionAndLeagueDefensiveDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPercentage');
const samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueDefensiveDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPerNinety');
const samePositionAndLeagueDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDribbles = calculateRankForMetric(samePositionAndLeague, 'dribbles');
const samePositionAndLeagueDribblesPerHundredTouches = calculateRankForMetric(samePositionAndLeague, 'dribblesPerHundredTouches');
const samePositionAndLeagueDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'dribblesPerHundredTouches');
const samePositionAndLeagueDribblesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const samePositionAndLeagueDuels = calculateRankForMetric(samePositionAndLeague, 'defDuels');
const samePositionAndLeagueDuelsPerNinety = calculateRankForMetric(samePositionAndLeague, 'duelsPerNinety');
const samePositionAndLeagueDuelsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const samePositionAndLeagueDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'duelsWonPercentage');
const samePositionAndLeagueDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsWonPercentage');
const samePositionAndLeagueDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'duelsWonPerNinety');
const samePositionAndLeagueDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeagueExits = calculateRankForMetric(samePositionAndLeague, 'exits');
const samePositionAndLeagueExitsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const samePositionAndLeagueForwardPasses = calculateRankForMetric(samePositionAndLeague, 'forwardPasses');
const samePositionAndLeagueForwardPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'forwardPassesCompletedPerNinety');
const samePositionAndLeagueForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueForwardPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const samePositionAndLeagueForwardPassRatio = calculateRankForMetric(samePositionAndLeague, 'forwardPassRatio');
const samePositionAndLeagueForwardPassRatioWithMinutes = calculateRankForMetric(samePositionAndLeague, 'forwardPassRatio');
const samePositionAndLeagueFoulsSuffered = calculateRankForMetric(samePositionAndLeague, 'foulsSuffered');
const samePositionAndLeagueFoulsSufferedWithMinutes = calculateRankForMetric(samePositionAndLeague, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const samePositionAndLeagueGoalConversionPercentage = calculateRankForMetric(samePositionAndLeague, 'goalConversionPercentage');
const samePositionAndLeagueGoalConversionPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalConversionPercentage', p => ({...p}));
const samePositionAndLeagueGoals = calculateRankForMetric(samePositionAndLeague, 'goals');
const samePositionAndLeagueGoalsAndAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'goalsAndAssistsPerNinety');
const samePositionAndLeagueGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueGoalsMinusxGPerNinety = calculateRankForMetric(samePositionAndLeague, 'goalsMinusxGPerNinety');
const samePositionAndLeagueGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueGoalsPer100Touches = calculateRankForMetric(samePositionAndLeague, 'goalsPer100Touches');
const samePositionAndLeagueGoalsPer100TouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goalsPer100Touches');
const samePositionAndLeagueGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const samePositionAndLeagueHeadGoals = calculateRankForMetric(samePositionAndLeague, 'headGoals');
const samePositionAndLeagueHeadGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const samePositionAndLeagueInterceptions = calculateRankForMetric(samePositionAndLeague, 'interceptions');
const samePositionAndLeagueInterceptionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const samePositionAndLeagueKeyPasses = calculateRankForMetric(samePositionAndLeague, 'keyPasses');
const samePositionAndLeagueKeyPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const samePositionAndLeagueLongPasses = calculateRankForMetric(samePositionAndLeague, 'longPasses');
const samePositionAndLeagueLongPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'longPassesCompletedPerNinety');
const samePositionAndLeagueLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueLongPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const samePositionAndLeagueNonPenaltyGoals = calculateRankForMetric(samePositionAndLeague, 'nonPenaltyGoals');
const samePositionAndLeagueNonPenaltyGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const samePositionAndLeagueNpGoalsAndAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'npGoalsAndAssistsPerNinety');
const samePositionAndLeagueNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueNpxGAndxAPerNinety = calculateRankForMetric(samePositionAndLeague, 'npxGAndxAPerNinety');
const samePositionAndLeagueNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGPerNinety = calculateRankForMetric(samePositionAndLeague, 'npxGPerNinety');
const samePositionAndLeagueNpxGPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const samePositionAndLeagueNpxGPerShot = calculateRankForMetric(samePositionAndLeague, 'npxGPerShot');
const samePositionAndLeagueNpxGPerShotWithMinutes = calculateRankForMetric(samePositionAndLeague, 'npxGPerShot');
const samePositionAndLeagueOffensiveDuels = calculateRankForMetric(samePositionAndLeague, 'offensiveDuels');
const samePositionAndLeagueOffensiveDuelsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const samePositionAndLeagueOffensiveDuelsWonPercentage = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPercentage');
const samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPercentage', p => ({...p}));
const samePositionAndLeagueOffensiveDuelsWonPerNinety = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPerNinety');
const samePositionAndLeagueOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePAdjInterceptions = calculateRankForMetric(samePositionAndLeague, 'pAdjInterceptions');
const samePositionAndLeaguePAdjInterceptionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'pAdjInterceptions');
const samePositionAndLeaguePAdjSlidingTackles = calculateRankForMetric(samePositionAndLeague, 'pAdjSlidingTackles');
const samePositionAndLeaguePAdjSlidingTacklesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'pAdjSlidingTackles');
const samePositionAndLeaguePasses = calculateRankForMetric(samePositionAndLeague, 'passes');
const samePositionAndLeaguePassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'passesCompletedPerNinety');
const samePositionAndLeaguePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePassesToFinalThird = calculateRankForMetric(samePositionAndLeague, 'passesToFinalThird');
const samePositionAndLeaguePassesToFinalThirdWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const samePositionAndLeaguePassesToPenaltyArea = calculateRankForMetric(samePositionAndLeague, 'passesToPenaltyArea');
const samePositionAndLeaguePassesToPenaltyAreaWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const samePositionAndLeaguePassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const samePositionAndLeaguePossessionPlusMinus = calculateRankForMetric(samePositionAndLeague, 'possessionPlusMinus');
const samePositionAndLeaguePossessionPlusMinusWithMinutes = calculateRankForMetric(samePositionAndLeague, 'possessionPlusMinus');
const samePositionAndLeaguePossessionsWonMinusLostPerNinety = calculateRankForMetric(samePositionAndLeague, 'possessionsWonMinusLostPerNinety');
const samePositionAndLeaguePossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePreAssistsPerNinety = calculateRankForMetric(samePositionAndLeague, 'preAssistsPerNinety');
const samePositionAndLeaguePreAssistsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const samePositionAndLeaguePreventedGoals = calculateRankForMetric(samePositionAndLeague, 'preventedGoals');
const samePositionAndLeaguePreventedGoalsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const samePositionAndLeagueProgressiveActionRate = calculateRankForMetric(samePositionAndLeague, 'progressiveActionRate');
const samePositionAndLeagueProgressiveActionRateWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveActionRate');
const samePositionAndLeagueProgressiveActionsPerNinety = calculateRankForMetric(samePositionAndLeague, 'progressiveActionsPerNinety');
const samePositionAndLeagueProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressivePasses = calculateRankForMetric(samePositionAndLeague, 'progressivePasses');
const samePositionAndLeagueProgressivePassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'progressivePassesCompletedPerNinety');
const samePositionAndLeagueProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueProgressivePassesPAdj = calculateRankForMetric(samePositionAndLeague, 'progressivePassesPAdj');
const samePositionAndLeagueProgressivePassesPAdjWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePassesPAdj');
const samePositionAndLeagueProgressivePassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const samePositionAndLeagueProgressiveRuns = calculateRankForMetric(samePositionAndLeague, 'progressiveRuns');
const samePositionAndLeagueProgressiveRunsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const samePositionAndLeagueSaveRatePercentage = calculateRankForMetric(samePositionAndLeague, 'saveRatePercentage');
const samePositionAndLeagueSaveRatePercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'saveRatePercentage', p => ({...p}));
const samePositionAndLeagueSavesPerNinety = calculateRankForMetric(samePositionAndLeague, 'savesPerNinety');
const samePositionAndLeagueSavesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShortMediumPasses = calculateRankForMetric(samePositionAndLeague, 'shortMediumPasses');
const samePositionAndLeagueShortMediumPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const samePositionAndLeagueShortPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'shortPassesCompletedPerNinety');
const samePositionAndLeagueShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShotAssists = calculateRankForMetric(samePositionAndLeague, 'shotAssists');
const samePositionAndLeagueShotAssistsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const samePositionAndLeagueShotFrequency = calculateRankForMetric(samePositionAndLeague, 'shotFrequency');
const samePositionAndLeagueShotFrequencyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotFrequency');
const samePositionAndLeagueShots = calculateRankForMetric(samePositionAndLeague, 'shots');
const samePositionAndLeagueShotsAgainst = calculateRankForMetric(samePositionAndLeague, 'shotsAgainst');
const samePositionAndLeagueShotsAgainstWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const samePositionAndLeagueShotsBlocked = calculateRankForMetric(samePositionAndLeague, 'shotsBlocked');
const samePositionAndLeagueShotsBlockedWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const samePositionAndLeagueShotsOnTargetPercentage = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPercentage');
const samePositionAndLeagueShotsOnTargetPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPercentage', p => ({...p}));
const samePositionAndLeagueShotsOnTargetPerNinety = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPerNinety');
const samePositionAndLeagueShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const samePositionAndLeagueShotsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const samePositionAndLeagueSlidingTackles = calculateRankForMetric(samePositionAndLeague, 'slidingTackles');
const samePositionAndLeagueSlidingTacklesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulAttackingActions = calculateRankForMetric(samePositionAndLeague, 'successfulAttackingActions');
const samePositionAndLeagueSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const samePositionAndLeagueSuccessfulDribblesPercentage = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPercentage');
const samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPercentage', p => ({...p}));
const samePositionAndLeagueSuccessfulDribblesPerNinety = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPerNinety');
const samePositionAndLeagueSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueThroughPasses = calculateRankForMetric(samePositionAndLeague, 'throughPasses');
const samePositionAndLeagueThroughPassesCompletedPerNinety = calculateRankForMetric(samePositionAndLeague, 'throughPassesCompletedPerNinety');
const samePositionAndLeagueThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const samePositionAndLeagueThroughPassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const samePositionAndLeagueTouchesInBox = calculateRankForMetric(samePositionAndLeague, 'touchesInBox');
const samePositionAndLeagueTouchesInBoxWithMinutes = calculateRankForMetric(samePositionAndLeague, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const samePositionAndLeagueTouchesPerNinety = calculateRankForMetric(samePositionAndLeague, 'touchesPerNinety');
const samePositionAndLeagueTouchesPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const samePositionAndLeagueXA = calculateRankForMetric(samePositionAndLeague, 'xA');
const samePositionAndLeagueXAPer100Passes = calculateRankForMetric(samePositionAndLeague, 'xAPer100Passes');
const samePositionAndLeagueXAPer100PassesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xAPer100Passes');
const samePositionAndLeagueXAWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const samePositionAndLeagueXG = calculateRankForMetric(samePositionAndLeague, 'xG');
const samePositionAndLeagueXGAgainst = calculateRankForMetric(samePositionAndLeague, 'xGAgainst');
const samePositionAndLeagueXGAgainstWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const samePositionAndLeagueXGAndxAPerNinety = calculateRankForMetric(samePositionAndLeague, 'xGAndxAPerNinety');
const samePositionAndLeagueXGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const samePositionAndLeagueXGPer100Touches = calculateRankForMetric(samePositionAndLeague, 'xGPer100Touches');
const samePositionAndLeagueXGPer100TouchesWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xGPer100Touches');
const samePositionAndLeagueXGWithMinutes = calculateRankForMetric(samePositionAndLeague, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
        const filteredData2 = parsedData.filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
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
        const filteredData2 = parsedData.filter(player => player.position === selectedPlayer.position && player.league === selectedPlayer.league &&
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
                : playerData.rank / filteredData2.length;
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
     else if (selectedSection === 'position') {
const positionRankAccelerations = calculateRankForMetric(samePosition, 'accelerations');
const positionRankAccelerationsWithMinutes = calculateRankForMetric(samePosition, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const positionRankAccurateCrossesPercentage = calculateRankForMetric(samePosition, 'accurateCrossesPercentage');
const positionRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateCrossesPercentage', p => ({...p}));
const positionRankAccurateCrossesPerNinety = calculateRankForMetric(samePosition, 'accurateCrossesPerNinety');
const positionRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const positionRankAccurateForwardPassesPercentage = calculateRankForMetric(samePosition, 'accurateForwardPassesPercentage');
const positionRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateForwardPassesPercentage', p => ({...p}));
const positionRankAccurateLongPassesPercentage = calculateRankForMetric(samePosition, 'accurateLongPassesPercentage');
const positionRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateLongPassesPercentage', p => ({...p}));
const positionRankAccuratePassesPercentage = calculateRankForMetric(samePosition, 'accuratePassesPercentage');
const positionRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesPercentage', p => ({...p}));
const positionRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPercentage');
const positionRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const positionRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPerNinety');
const positionRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const positionRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(samePosition, 'accuratePassesToPenaltyAreaPercentage');
const positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const positionRankAccurateProgressivePassesPercentage = calculateRankForMetric(samePosition, 'accurateProgressivePassesPercentage');
const positionRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateProgressivePassesPercentage', p => ({...p}));
const positionRankAccurateShortMediumPassesPercentage = calculateRankForMetric(samePosition, 'accurateShortMediumPassesPercentage');
const positionRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateShortMediumPassesPercentage', p => ({...p}));
const positionRankActions = calculateRankForMetric(samePosition, 'defActions');
const positionRankActionsWithMinutes = calculateRankForMetric(samePosition, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const positionRankAerialDuels = calculateRankForMetric(samePosition, 'aerialDuels');
const positionRankAerialDuelsWithMinutes = calculateRankForMetric(samePosition, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const positionRankAerialDuelsWonPercentage = calculateRankForMetric(samePosition, 'aerialDuelsWonPercentage');
const positionRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'aerialDuelsWonPercentage', p => ({...p}));
const positionRankAerialDuelsWonPerNinety = calculateRankForMetric(samePosition, 'aerialDuelsWonPerNinety');
const positionRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const positionRankAssists = calculateRankForMetric(samePosition, 'assists');
const positionRankAssistsWithMinutes = calculateRankForMetric(samePosition, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const positionRankBallCarryingFrequency = calculateRankForMetric(samePosition, 'ballCarryingFrequency');
const positionRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(samePosition, 'ballCarryingFrequency');
const positionRankChanceCreationRatio = calculateRankForMetric(samePosition, 'chanceCreationRatio');
const positionRankChanceCreationRatioWithMinutes = calculateRankForMetric(samePosition, 'chanceCreationRatio');
const positionRankCleanSheets = calculateRankForMetric(samePosition, 'cleanSheets');
const positionRankCleanSheetsWithMinutes = calculateRankForMetric(samePosition, 'cleanSheets');
const positionRankCrosses = calculateRankForMetric(samePosition, 'crosses');
const positionRankCrossesToGoalieBox = calculateRankForMetric(samePosition, 'crossesToGoalieBox');
const positionRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(samePosition, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const positionRankCrossesWithMinutes = calculateRankForMetric(samePosition, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const positionRankDeepCompletions = calculateRankForMetric(samePosition, 'deepCompletions');
const positionRankDeepCompletionsWithMinutes = calculateRankForMetric(samePosition, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const positionRankDefensiveDuelsWonPercentage = calculateRankForMetric(samePosition, 'defensiveDuelsWonPercentage');
const positionRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'defensiveDuelsWonPercentage', p => ({...p}));
const positionRankDefensiveDuelsWonPerNinety = calculateRankForMetric(samePosition, 'defensiveDuelsWonPerNinety');
const positionRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankDribbles = calculateRankForMetric(samePosition, 'dribbles');
const positionRankDribblesPerHundredTouches = calculateRankForMetric(samePosition, 'dribblesPerHundredTouches');
const positionRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(samePosition, 'dribblesPerHundredTouches');
const positionRankDribblesWithMinutes = calculateRankForMetric(samePosition, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const positionRankDuels = calculateRankForMetric(samePosition, 'defDuels');
const positionRankDuelsPerNinety = calculateRankForMetric(samePosition, 'duelsPerNinety');
const positionRankDuelsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const positionRankDuelsWithMinutes = calculateRankForMetric(samePosition, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const positionRankDuelsWonPercentage = calculateRankForMetric(samePosition, 'duelsWonPercentage');
const positionRankDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'duelsWonPercentage');
const positionRankDuelsWonPerNinety = calculateRankForMetric(samePosition, 'duelsWonPerNinety');
const positionRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const positionRankExits = calculateRankForMetric(samePosition, 'exits');
const positionRankExitsWithMinutes = calculateRankForMetric(samePosition, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const positionRankForwardPasses = calculateRankForMetric(samePosition, 'forwardPasses');
const positionRankForwardPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'forwardPassesCompletedPerNinety');
const positionRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankForwardPassesWithMinutes = calculateRankForMetric(samePosition, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const positionRankForwardPassRatio = calculateRankForMetric(samePosition, 'forwardPassRatio');
const positionRankForwardPassRatioWithMinutes = calculateRankForMetric(samePosition, 'forwardPassRatio');
const positionRankFoulsSuffered = calculateRankForMetric(samePosition, 'foulsSuffered');
const positionRankFoulsSufferedWithMinutes = calculateRankForMetric(samePosition, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const positionRankGoalConversionPercentage = calculateRankForMetric(samePosition, 'goalConversionPercentage');
const positionRankGoalConversionPercentageWithMinutes = calculateRankForMetric(samePosition, 'goalConversionPercentage', p => ({...p}));
const positionRankGoals = calculateRankForMetric(samePosition, 'goals');
const positionRankGoalsAndAssistsPerNinety = calculateRankForMetric(samePosition, 'goalsAndAssistsPerNinety');
const positionRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankGoalsMinusxGPerNinety = calculateRankForMetric(samePosition, 'goalsMinusxGPerNinety');
const positionRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const positionRankGoalsPer100Touches = calculateRankForMetric(samePosition, 'goalsPer100Touches');
const positionRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(samePosition, 'goalsPer100Touches');
const positionRankGoalsWithMinutes = calculateRankForMetric(samePosition, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const positionRankHeadGoals = calculateRankForMetric(samePosition, 'headGoals');
const positionRankHeadGoalsWithMinutes = calculateRankForMetric(samePosition, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const positionRankInterceptions = calculateRankForMetric(samePosition, 'interceptions');
const positionRankInterceptionsWithMinutes = calculateRankForMetric(samePosition, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const positionRankKeyPasses = calculateRankForMetric(samePosition, 'keyPasses');
const positionRankKeyPassesWithMinutes = calculateRankForMetric(samePosition, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const positionRankLongPasses = calculateRankForMetric(samePosition, 'longPasses');
const positionRankLongPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'longPassesCompletedPerNinety');
const positionRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankLongPassesWithMinutes = calculateRankForMetric(samePosition, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const positionRankNonPenaltyGoals = calculateRankForMetric(samePosition, 'nonPenaltyGoals');
const positionRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(samePosition, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const positionRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(samePosition, 'npGoalsAndAssistsPerNinety');
const positionRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankNpxGAndxAPerNinety = calculateRankForMetric(samePosition, 'npxGAndxAPerNinety');
const positionRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const positionRankNpxGPerNinety = calculateRankForMetric(samePosition, 'npxGPerNinety');
const positionRankNpxGPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const positionRankNpxGPerShot = calculateRankForMetric(samePosition, 'npxGPerShot');
const positionRankNpxGPerShotWithMinutes = calculateRankForMetric(samePosition, 'npxGPerShot');
const positionRankOffensiveDuels = calculateRankForMetric(samePosition, 'offensiveDuels');
const positionRankOffensiveDuelsWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const positionRankOffensiveDuelsWonPercentage = calculateRankForMetric(samePosition, 'offensiveDuelsWonPercentage');
const positionRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuelsWonPercentage', p => ({...p}));
const positionRankOffensiveDuelsWonPerNinety = calculateRankForMetric(samePosition, 'offensiveDuelsWonPerNinety');
const positionRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankPAdjInterceptions = calculateRankForMetric(samePosition, 'pAdjInterceptions');
const positionRankPAdjInterceptionsWithMinutes = calculateRankForMetric(samePosition, 'pAdjInterceptions');
const positionRankPAdjSlidingTackles = calculateRankForMetric(samePosition, 'pAdjSlidingTackles');
const positionRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(samePosition, 'pAdjSlidingTackles');
const positionRankPasses = calculateRankForMetric(samePosition, 'passes');
const positionRankPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'passesCompletedPerNinety');
const positionRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const positionRankPassesToFinalThird = calculateRankForMetric(samePosition, 'passesToFinalThird');
const positionRankPassesToFinalThirdWithMinutes = calculateRankForMetric(samePosition, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const positionRankPassesToPenaltyArea = calculateRankForMetric(samePosition, 'passesToPenaltyArea');
const positionRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(samePosition, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const positionRankPassesWithMinutes = calculateRankForMetric(samePosition, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const positionRankPossessionPlusMinus = calculateRankForMetric(samePosition, 'possessionPlusMinus');
const positionRankPossessionPlusMinusWithMinutes = calculateRankForMetric(samePosition, 'possessionPlusMinus');
const positionRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(samePosition, 'possessionsWonMinusLostPerNinety');
const positionRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const positionRankPreAssistsPerNinety = calculateRankForMetric(samePosition, 'preAssistsPerNinety');
const positionRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const positionRankPreventedGoals = calculateRankForMetric(samePosition, 'preventedGoals');
const positionRankPreventedGoalsWithMinutes = calculateRankForMetric(samePosition, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const positionRankProgressiveActionRate = calculateRankForMetric(samePosition, 'progressiveActionRate');
const positionRankProgressiveActionRateWithMinutes = calculateRankForMetric(samePosition, 'progressiveActionRate');
const positionRankProgressiveActionsPerNinety = calculateRankForMetric(samePosition, 'progressiveActionsPerNinety');
const positionRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const positionRankProgressivePasses = calculateRankForMetric(samePosition, 'progressivePasses');
const positionRankProgressivePassesCompletedPerNinety = calculateRankForMetric(samePosition, 'progressivePassesCompletedPerNinety');
const positionRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const positionRankProgressivePassesPAdj = calculateRankForMetric(samePosition, 'progressivePassesPAdj');
const positionRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(samePosition, 'progressivePassesPAdj');
const positionRankProgressivePassesWithMinutes = calculateRankForMetric(samePosition, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const positionRankProgressiveRuns = calculateRankForMetric(samePosition, 'progressiveRuns');
const positionRankProgressiveRunsWithMinutes = calculateRankForMetric(samePosition, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const positionRankSaveRatePercentage = calculateRankForMetric(samePosition, 'saveRatePercentage');
const positionRankSaveRatePercentageWithMinutes = calculateRankForMetric(samePosition, 'saveRatePercentage', p => ({...p}));
const positionRankSavesPerNinety = calculateRankForMetric(samePosition, 'savesPerNinety');
const positionRankSavesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const positionRankShortMediumPasses = calculateRankForMetric(samePosition, 'shortMediumPasses');
const positionRankShortMediumPassesWithMinutes = calculateRankForMetric(samePosition, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const positionRankShortPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'shortPassesCompletedPerNinety');
const positionRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankShotAssists = calculateRankForMetric(samePosition, 'shotAssists');
const positionRankShotAssistsWithMinutes = calculateRankForMetric(samePosition, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const positionRankShotFrequency = calculateRankForMetric(samePosition, 'shotFrequency');
const positionRankShotFrequencyWithMinutes = calculateRankForMetric(samePosition, 'shotFrequency');
const positionRankShots = calculateRankForMetric(samePosition, 'shots');
const positionRankShotsAgainst = calculateRankForMetric(samePosition, 'shotsAgainst');
const positionRankShotsAgainstWithMinutes = calculateRankForMetric(samePosition, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const positionRankShotsBlocked = calculateRankForMetric(samePosition, 'shotsBlocked');
const positionRankShotsBlockedWithMinutes = calculateRankForMetric(samePosition, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const positionRankShotsOnTargetPercentage = calculateRankForMetric(samePosition, 'shotsOnTargetPercentage');
const positionRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(samePosition, 'shotsOnTargetPercentage', p => ({...p}));
const positionRankShotsOnTargetPerNinety = calculateRankForMetric(samePosition, 'shotsOnTargetPerNinety');
const positionRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const positionRankShotsWithMinutes = calculateRankForMetric(samePosition, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const positionRankSlidingTackles = calculateRankForMetric(samePosition, 'slidingTackles');
const positionRankSlidingTacklesWithMinutes = calculateRankForMetric(samePosition, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const positionRankSuccessfulAttackingActions = calculateRankForMetric(samePosition, 'successfulAttackingActions');
const positionRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(samePosition, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const positionRankSuccessfulDribblesPercentage = calculateRankForMetric(samePosition, 'successfulDribblesPercentage');
const positionRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(samePosition, 'successfulDribblesPercentage', p => ({...p}));
const positionRankSuccessfulDribblesPerNinety = calculateRankForMetric(samePosition, 'successfulDribblesPerNinety');
const positionRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const positionRankThroughPasses = calculateRankForMetric(samePosition, 'throughPasses');
const positionRankThroughPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'throughPassesCompletedPerNinety');
const positionRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankThroughPassesWithMinutes = calculateRankForMetric(samePosition, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const positionRankTouchesInBox = calculateRankForMetric(samePosition, 'touchesInBox');
const positionRankTouchesInBoxWithMinutes = calculateRankForMetric(samePosition, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const positionRankTouchesPerNinety = calculateRankForMetric(samePosition, 'touchesPerNinety');
const positionRankTouchesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const positionRankXA = calculateRankForMetric(samePosition, 'xA');
const positionRankXAPer100Passes = calculateRankForMetric(samePosition, 'xAPer100Passes');
const positionRankXAPer100PassesWithMinutes = calculateRankForMetric(samePosition, 'xAPer100Passes');
const positionRankXAWithMinutes = calculateRankForMetric(samePosition, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const positionRankXG = calculateRankForMetric(samePosition, 'xG');
const positionRankXGAgainst = calculateRankForMetric(samePosition, 'xGAgainst');
const positionRankXGAgainstWithMinutes = calculateRankForMetric(samePosition, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const positionRankXGAndxAPerNinety = calculateRankForMetric(samePosition, 'xGAndxAPerNinety');
const positionRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const positionRankXGPer100Touches = calculateRankForMetric(samePosition, 'xGPer100Touches');
const positionRankXGPer100TouchesWithMinutes = calculateRankForMetric(samePosition, 'xGPer100Touches');
const positionRankXGWithMinutes = calculateRankForMetric(samePosition, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
        const filteredData3 = parsedData.filter(player => player.position === selectedPlayer.position &&
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
        const filteredData3 = parsedData.filter(player => player.position === selectedPlayer.position &&
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
const positionRankAccelerations = calculateRankForMetric(samePosition, 'accelerations');
const positionRankAccelerationsWithMinutes = calculateRankForMetric(samePosition, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const positionRankAccurateCrossesPercentage = calculateRankForMetric(samePosition, 'accurateCrossesPercentage');
const positionRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateCrossesPercentage', p => ({...p}));
const positionRankAccurateCrossesPerNinety = calculateRankForMetric(samePosition, 'accurateCrossesPerNinety');
const positionRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const positionRankAccurateForwardPassesPercentage = calculateRankForMetric(samePosition, 'accurateForwardPassesPercentage');
const positionRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateForwardPassesPercentage', p => ({...p}));
const positionRankAccurateLongPassesPercentage = calculateRankForMetric(samePosition, 'accurateLongPassesPercentage');
const positionRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateLongPassesPercentage', p => ({...p}));
const positionRankAccuratePassesPercentage = calculateRankForMetric(samePosition, 'accuratePassesPercentage');
const positionRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesPercentage', p => ({...p}));
const positionRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPercentage');
const positionRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const positionRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPerNinety');
const positionRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const positionRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(samePosition, 'accuratePassesToPenaltyAreaPercentage');
const positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(samePosition, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const positionRankAccurateProgressivePassesPercentage = calculateRankForMetric(samePosition, 'accurateProgressivePassesPercentage');
const positionRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateProgressivePassesPercentage', p => ({...p}));
const positionRankAccurateShortMediumPassesPercentage = calculateRankForMetric(samePosition, 'accurateShortMediumPassesPercentage');
const positionRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(samePosition, 'accurateShortMediumPassesPercentage', p => ({...p}));
const positionRankActions = calculateRankForMetric(samePosition, 'defActions');
const positionRankActionsWithMinutes = calculateRankForMetric(samePosition, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const positionRankAerialDuels = calculateRankForMetric(samePosition, 'aerialDuels');
const positionRankAerialDuelsWithMinutes = calculateRankForMetric(samePosition, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const positionRankAerialDuelsWonPercentage = calculateRankForMetric(samePosition, 'aerialDuelsWonPercentage');
const positionRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'aerialDuelsWonPercentage', p => ({...p}));
const positionRankAerialDuelsWonPerNinety = calculateRankForMetric(samePosition, 'aerialDuelsWonPerNinety');
const positionRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const positionRankAssists = calculateRankForMetric(samePosition, 'assists');
const positionRankAssistsWithMinutes = calculateRankForMetric(samePosition, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const positionRankBallCarryingFrequency = calculateRankForMetric(samePosition, 'ballCarryingFrequency');
const positionRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(samePosition, 'ballCarryingFrequency');
const positionRankChanceCreationRatio = calculateRankForMetric(samePosition, 'chanceCreationRatio');
const positionRankChanceCreationRatioWithMinutes = calculateRankForMetric(samePosition, 'chanceCreationRatio');
const positionRankCleanSheets = calculateRankForMetric(samePosition, 'cleanSheets');
const positionRankCleanSheetsWithMinutes = calculateRankForMetric(samePosition, 'cleanSheets');
const positionRankCrosses = calculateRankForMetric(samePosition, 'crosses');
const positionRankCrossesToGoalieBox = calculateRankForMetric(samePosition, 'crossesToGoalieBox');
const positionRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(samePosition, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const positionRankCrossesWithMinutes = calculateRankForMetric(samePosition, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const positionRankDeepCompletions = calculateRankForMetric(samePosition, 'deepCompletions');
const positionRankDeepCompletionsWithMinutes = calculateRankForMetric(samePosition, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const positionRankDefensiveDuelsWonPercentage = calculateRankForMetric(samePosition, 'defensiveDuelsWonPercentage');
const positionRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'defensiveDuelsWonPercentage', p => ({...p}));
const positionRankDefensiveDuelsWonPerNinety = calculateRankForMetric(samePosition, 'defensiveDuelsWonPerNinety');
const positionRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankDribbles = calculateRankForMetric(samePosition, 'dribbles');
const positionRankDribblesPerHundredTouches = calculateRankForMetric(samePosition, 'dribblesPerHundredTouches');
const positionRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(samePosition, 'dribblesPerHundredTouches');
const positionRankDribblesWithMinutes = calculateRankForMetric(samePosition, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const positionRankDuels = calculateRankForMetric(samePosition, 'defDuels');
const positionRankDuelsPerNinety = calculateRankForMetric(samePosition, 'duelsPerNinety');
const positionRankDuelsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const positionRankDuelsWithMinutes = calculateRankForMetric(samePosition, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const positionRankDuelsWonPercentage = calculateRankForMetric(samePosition, 'duelsWonPercentage');
const positionRankDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'duelsWonPercentage');
const positionRankDuelsWonPerNinety = calculateRankForMetric(samePosition, 'duelsWonPerNinety');
const positionRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const positionRankExits = calculateRankForMetric(samePosition, 'exits');
const positionRankExitsWithMinutes = calculateRankForMetric(samePosition, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const positionRankForwardPasses = calculateRankForMetric(samePosition, 'forwardPasses');
const positionRankForwardPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'forwardPassesCompletedPerNinety');
const positionRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankForwardPassesWithMinutes = calculateRankForMetric(samePosition, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const positionRankForwardPassRatio = calculateRankForMetric(samePosition, 'forwardPassRatio');
const positionRankForwardPassRatioWithMinutes = calculateRankForMetric(samePosition, 'forwardPassRatio');
const positionRankFoulsSuffered = calculateRankForMetric(samePosition, 'foulsSuffered');
const positionRankFoulsSufferedWithMinutes = calculateRankForMetric(samePosition, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const positionRankGoalConversionPercentage = calculateRankForMetric(samePosition, 'goalConversionPercentage');
const positionRankGoalConversionPercentageWithMinutes = calculateRankForMetric(samePosition, 'goalConversionPercentage', p => ({...p}));
const positionRankGoals = calculateRankForMetric(samePosition, 'goals');
const positionRankGoalsAndAssistsPerNinety = calculateRankForMetric(samePosition, 'goalsAndAssistsPerNinety');
const positionRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankGoalsMinusxGPerNinety = calculateRankForMetric(samePosition, 'goalsMinusxGPerNinety');
const positionRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const positionRankGoalsPer100Touches = calculateRankForMetric(samePosition, 'goalsPer100Touches');
const positionRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(samePosition, 'goalsPer100Touches');
const positionRankGoalsWithMinutes = calculateRankForMetric(samePosition, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const positionRankHeadGoals = calculateRankForMetric(samePosition, 'headGoals');
const positionRankHeadGoalsWithMinutes = calculateRankForMetric(samePosition, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const positionRankInterceptions = calculateRankForMetric(samePosition, 'interceptions');
const positionRankInterceptionsWithMinutes = calculateRankForMetric(samePosition, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const positionRankKeyPasses = calculateRankForMetric(samePosition, 'keyPasses');
const positionRankKeyPassesWithMinutes = calculateRankForMetric(samePosition, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const positionRankLongPasses = calculateRankForMetric(samePosition, 'longPasses');
const positionRankLongPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'longPassesCompletedPerNinety');
const positionRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankLongPassesWithMinutes = calculateRankForMetric(samePosition, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const positionRankNonPenaltyGoals = calculateRankForMetric(samePosition, 'nonPenaltyGoals');
const positionRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(samePosition, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const positionRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(samePosition, 'npGoalsAndAssistsPerNinety');
const positionRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const positionRankNpxGAndxAPerNinety = calculateRankForMetric(samePosition, 'npxGAndxAPerNinety');
const positionRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const positionRankNpxGPerNinety = calculateRankForMetric(samePosition, 'npxGPerNinety');
const positionRankNpxGPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const positionRankNpxGPerShot = calculateRankForMetric(samePosition, 'npxGPerShot');
const positionRankNpxGPerShotWithMinutes = calculateRankForMetric(samePosition, 'npxGPerShot');
const positionRankOffensiveDuels = calculateRankForMetric(samePosition, 'offensiveDuels');
const positionRankOffensiveDuelsWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const positionRankOffensiveDuelsWonPercentage = calculateRankForMetric(samePosition, 'offensiveDuelsWonPercentage');
const positionRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuelsWonPercentage', p => ({...p}));
const positionRankOffensiveDuelsWonPerNinety = calculateRankForMetric(samePosition, 'offensiveDuelsWonPerNinety');
const positionRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const positionRankPAdjInterceptions = calculateRankForMetric(samePosition, 'pAdjInterceptions');
const positionRankPAdjInterceptionsWithMinutes = calculateRankForMetric(samePosition, 'pAdjInterceptions');
const positionRankPAdjSlidingTackles = calculateRankForMetric(samePosition, 'pAdjSlidingTackles');
const positionRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(samePosition, 'pAdjSlidingTackles');
const positionRankPasses = calculateRankForMetric(samePosition, 'passes');
const positionRankPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'passesCompletedPerNinety');
const positionRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const positionRankPassesToFinalThird = calculateRankForMetric(samePosition, 'passesToFinalThird');
const positionRankPassesToFinalThirdWithMinutes = calculateRankForMetric(samePosition, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const positionRankPassesToPenaltyArea = calculateRankForMetric(samePosition, 'passesToPenaltyArea');
const positionRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(samePosition, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const positionRankPassesWithMinutes = calculateRankForMetric(samePosition, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const positionRankPossessionPlusMinus = calculateRankForMetric(samePosition, 'possessionPlusMinus');
const positionRankPossessionPlusMinusWithMinutes = calculateRankForMetric(samePosition, 'possessionPlusMinus');
const positionRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(samePosition, 'possessionsWonMinusLostPerNinety');
const positionRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const positionRankPreAssistsPerNinety = calculateRankForMetric(samePosition, 'preAssistsPerNinety');
const positionRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const positionRankPreventedGoals = calculateRankForMetric(samePosition, 'preventedGoals');
const positionRankPreventedGoalsWithMinutes = calculateRankForMetric(samePosition, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const positionRankProgressiveActionRate = calculateRankForMetric(samePosition, 'progressiveActionRate');
const positionRankProgressiveActionRateWithMinutes = calculateRankForMetric(samePosition, 'progressiveActionRate');
const positionRankProgressiveActionsPerNinety = calculateRankForMetric(samePosition, 'progressiveActionsPerNinety');
const positionRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const positionRankProgressivePasses = calculateRankForMetric(samePosition, 'progressivePasses');
const positionRankProgressivePassesCompletedPerNinety = calculateRankForMetric(samePosition, 'progressivePassesCompletedPerNinety');
const positionRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const positionRankProgressivePassesPAdj = calculateRankForMetric(samePosition, 'progressivePassesPAdj');
const positionRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(samePosition, 'progressivePassesPAdj');
const positionRankProgressivePassesWithMinutes = calculateRankForMetric(samePosition, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const positionRankProgressiveRuns = calculateRankForMetric(samePosition, 'progressiveRuns');
const positionRankProgressiveRunsWithMinutes = calculateRankForMetric(samePosition, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const positionRankSaveRatePercentage = calculateRankForMetric(samePosition, 'saveRatePercentage');
const positionRankSaveRatePercentageWithMinutes = calculateRankForMetric(samePosition, 'saveRatePercentage', p => ({...p}));
const positionRankSavesPerNinety = calculateRankForMetric(samePosition, 'savesPerNinety');
const positionRankSavesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const positionRankShortMediumPasses = calculateRankForMetric(samePosition, 'shortMediumPasses');
const positionRankShortMediumPassesWithMinutes = calculateRankForMetric(samePosition, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const positionRankShortPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'shortPassesCompletedPerNinety');
const positionRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankShotAssists = calculateRankForMetric(samePosition, 'shotAssists');
const positionRankShotAssistsWithMinutes = calculateRankForMetric(samePosition, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const positionRankShotFrequency = calculateRankForMetric(samePosition, 'shotFrequency');
const positionRankShotFrequencyWithMinutes = calculateRankForMetric(samePosition, 'shotFrequency');
const positionRankShots = calculateRankForMetric(samePosition, 'shots');
const positionRankShotsAgainst = calculateRankForMetric(samePosition, 'shotsAgainst');
const positionRankShotsAgainstWithMinutes = calculateRankForMetric(samePosition, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const positionRankShotsBlocked = calculateRankForMetric(samePosition, 'shotsBlocked');
const positionRankShotsBlockedWithMinutes = calculateRankForMetric(samePosition, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const positionRankShotsOnTargetPercentage = calculateRankForMetric(samePosition, 'shotsOnTargetPercentage');
const positionRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(samePosition, 'shotsOnTargetPercentage', p => ({...p}));
const positionRankShotsOnTargetPerNinety = calculateRankForMetric(samePosition, 'shotsOnTargetPerNinety');
const positionRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const positionRankShotsWithMinutes = calculateRankForMetric(samePosition, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const positionRankSlidingTackles = calculateRankForMetric(samePosition, 'slidingTackles');
const positionRankSlidingTacklesWithMinutes = calculateRankForMetric(samePosition, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const positionRankSuccessfulAttackingActions = calculateRankForMetric(samePosition, 'successfulAttackingActions');
const positionRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(samePosition, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const positionRankSuccessfulDribblesPercentage = calculateRankForMetric(samePosition, 'successfulDribblesPercentage');
const positionRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(samePosition, 'successfulDribblesPercentage', p => ({...p}));
const positionRankSuccessfulDribblesPerNinety = calculateRankForMetric(samePosition, 'successfulDribblesPerNinety');
const positionRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const positionRankThroughPasses = calculateRankForMetric(samePosition, 'throughPasses');
const positionRankThroughPassesCompletedPerNinety = calculateRankForMetric(samePosition, 'throughPassesCompletedPerNinety');
const positionRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const positionRankThroughPassesWithMinutes = calculateRankForMetric(samePosition, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const positionRankTouchesInBox = calculateRankForMetric(samePosition, 'touchesInBox');
const positionRankTouchesInBoxWithMinutes = calculateRankForMetric(samePosition, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const positionRankTouchesPerNinety = calculateRankForMetric(samePosition, 'touchesPerNinety');
const positionRankTouchesPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const positionRankXA = calculateRankForMetric(samePosition, 'xA');
const positionRankXAPer100Passes = calculateRankForMetric(samePosition, 'xAPer100Passes');
const positionRankXAPer100PassesWithMinutes = calculateRankForMetric(samePosition, 'xAPer100Passes');
const positionRankXAWithMinutes = calculateRankForMetric(samePosition, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const positionRankXG = calculateRankForMetric(samePosition, 'xG');
const positionRankXGAgainst = calculateRankForMetric(samePosition, 'xGAgainst');
const positionRankXGAgainstWithMinutes = calculateRankForMetric(samePosition, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const positionRankXGAndxAPerNinety = calculateRankForMetric(samePosition, 'xGAndxAPerNinety');
const positionRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(samePosition, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const positionRankXGPer100Touches = calculateRankForMetric(samePosition, 'xGPer100Touches');
const positionRankXGPer100TouchesWithMinutes = calculateRankForMetric(samePosition, 'xGPer100Touches');
const positionRankXGWithMinutes = calculateRankForMetric(samePosition, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
      { name: 'Accurate passes to final third', data: positionRankAccuratePassesToFinalThirdPerNinetyWithMinutes },
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
        const filteredData4 = parsedData.filter(player => player.position === selectedPlayer.position &&
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
        const filteredData4 = parsedData.filter(player => player.position === selectedPlayer.position &&
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

const leagueRankAccelerations = calculateRankForMetric(sameLeague, 'accelerations');
const leagueRankAccelerationsWithMinutes = calculateRankForMetric(sameLeague, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const leagueRankAccurateCrossesPercentage = calculateRankForMetric(sameLeague, 'accurateCrossesPercentage');
const leagueRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateCrossesPercentage', p => ({...p}));
const leagueRankAccurateCrossesPerNinety = calculateRankForMetric(sameLeague, 'accurateCrossesPerNinety');
const leagueRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const leagueRankAccurateForwardPassesPercentage = calculateRankForMetric(sameLeague, 'accurateForwardPassesPercentage');
const leagueRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateForwardPassesPercentage', p => ({...p}));
const leagueRankAccurateLongPassesPercentage = calculateRankForMetric(sameLeague, 'accurateLongPassesPercentage');
const leagueRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateLongPassesPercentage', p => ({...p}));
const leagueRankAccuratePassesPercentage = calculateRankForMetric(sameLeague, 'accuratePassesPercentage');
const leagueRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesPercentage', p => ({...p}));
const leagueRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPercentage');
const leagueRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const leagueRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPerNinety');
const leagueRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const leagueRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(sameLeague, 'accuratePassesToPenaltyAreaPercentage');
const leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const leagueRankAccurateProgressivePassesPercentage = calculateRankForMetric(sameLeague, 'accurateProgressivePassesPercentage');
const leagueRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateProgressivePassesPercentage', p => ({...p}));
const leagueRankAccurateShortMediumPassesPercentage = calculateRankForMetric(sameLeague, 'accurateShortMediumPassesPercentage');
const leagueRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateShortMediumPassesPercentage', p => ({...p}));
const leagueRankActions = calculateRankForMetric(sameLeague, 'defActions');
const leagueRankActionsWithMinutes = calculateRankForMetric(sameLeague, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const leagueRankAerialDuels = calculateRankForMetric(sameLeague, 'aerialDuels');
const leagueRankAerialDuelsWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const leagueRankAerialDuelsWonPercentage = calculateRankForMetric(sameLeague, 'aerialDuelsWonPercentage');
const leagueRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuelsWonPercentage', p => ({...p}));
const leagueRankAerialDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'aerialDuelsWonPerNinety');
const leagueRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankAssists = calculateRankForMetric(sameLeague, 'assists');
const leagueRankAssistsWithMinutes = calculateRankForMetric(sameLeague, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const leagueRankBallCarryingFrequency = calculateRankForMetric(sameLeague, 'ballCarryingFrequency');
const leagueRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(sameLeague, 'ballCarryingFrequency');
const leagueRankChanceCreationRatio = calculateRankForMetric(sameLeague, 'chanceCreationRatio');
const leagueRankChanceCreationRatioWithMinutes = calculateRankForMetric(sameLeague, 'chanceCreationRatio');
const leagueRankCleanSheets = calculateRankForMetric(sameLeague, 'cleanSheets');
const leagueRankCleanSheetsWithMinutes = calculateRankForMetric(sameLeague, 'cleanSheets');
const leagueRankCrosses = calculateRankForMetric(sameLeague, 'crosses');
const leagueRankCrossesToGoalieBox = calculateRankForMetric(sameLeague, 'crossesToGoalieBox');
const leagueRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(sameLeague, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const leagueRankCrossesWithMinutes = calculateRankForMetric(sameLeague, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const leagueRankDeepCompletions = calculateRankForMetric(sameLeague, 'deepCompletions');
const leagueRankDeepCompletionsWithMinutes = calculateRankForMetric(sameLeague, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const leagueRankDefensiveDuelsWonPercentage = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPercentage');
const leagueRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPercentage', p => ({...p}));
const leagueRankDefensiveDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPerNinety');
const leagueRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankDribbles = calculateRankForMetric(sameLeague, 'dribbles');
const leagueRankDribblesPerHundredTouches = calculateRankForMetric(sameLeague, 'dribblesPerHundredTouches');
const leagueRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(sameLeague, 'dribblesPerHundredTouches');
const leagueRankDribblesWithMinutes = calculateRankForMetric(sameLeague, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const leagueRankDuels = calculateRankForMetric(sameLeague, 'defDuels');
const leagueRankDuelsPerNinety = calculateRankForMetric(sameLeague, 'duelsPerNinety');
const leagueRankDuelsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const leagueRankDuelsWithMinutes = calculateRankForMetric(sameLeague, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const leagueRankDuelsWonPercentage = calculateRankForMetric(sameLeague, 'duelsWonPercentage');
const leagueRankDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'duelsWonPercentage');
const leagueRankDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'duelsWonPerNinety');
const leagueRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const leagueRankExits = calculateRankForMetric(sameLeague, 'exits');
const leagueRankExitsWithMinutes = calculateRankForMetric(sameLeague, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const leagueRankForwardPasses = calculateRankForMetric(sameLeague, 'forwardPasses');
const leagueRankForwardPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'forwardPassesCompletedPerNinety');
const leagueRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankForwardPassesWithMinutes = calculateRankForMetric(sameLeague, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const leagueRankForwardPassRatio = calculateRankForMetric(sameLeague, 'forwardPassRatio');
const leagueRankForwardPassRatioWithMinutes = calculateRankForMetric(sameLeague, 'forwardPassRatio');
const leagueRankFoulsSuffered = calculateRankForMetric(sameLeague, 'foulsSuffered');
const leagueRankFoulsSufferedWithMinutes = calculateRankForMetric(sameLeague, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const leagueRankGoalConversionPercentage = calculateRankForMetric(sameLeague, 'goalConversionPercentage');
const leagueRankGoalConversionPercentageWithMinutes = calculateRankForMetric(sameLeague, 'goalConversionPercentage', p => ({...p}));
const leagueRankGoals = calculateRankForMetric(sameLeague, 'goals');
const leagueRankGoalsAndAssistsPerNinety = calculateRankForMetric(sameLeague, 'goalsAndAssistsPerNinety');
const leagueRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankGoalsMinusxGPerNinety = calculateRankForMetric(sameLeague, 'goalsMinusxGPerNinety');
const leagueRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const leagueRankGoalsPer100Touches = calculateRankForMetric(sameLeague, 'goalsPer100Touches');
const leagueRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(sameLeague, 'goalsPer100Touches');
const leagueRankGoalsWithMinutes = calculateRankForMetric(sameLeague, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const leagueRankHeadGoals = calculateRankForMetric(sameLeague, 'headGoals');
const leagueRankHeadGoalsWithMinutes = calculateRankForMetric(sameLeague, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const leagueRankInterceptions = calculateRankForMetric(sameLeague, 'interceptions');
const leagueRankInterceptionsWithMinutes = calculateRankForMetric(sameLeague, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const leagueRankKeyPasses = calculateRankForMetric(sameLeague, 'keyPasses');
const leagueRankKeyPassesWithMinutes = calculateRankForMetric(sameLeague, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const leagueRankLongPasses = calculateRankForMetric(sameLeague, 'longPasses');
const leagueRankLongPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'longPassesCompletedPerNinety');
const leagueRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankLongPassesWithMinutes = calculateRankForMetric(sameLeague, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const leagueRankNonPenaltyGoals = calculateRankForMetric(sameLeague, 'nonPenaltyGoals');
const leagueRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(sameLeague, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const leagueRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(sameLeague, 'npGoalsAndAssistsPerNinety');
const leagueRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankNpxGAndxAPerNinety = calculateRankForMetric(sameLeague, 'npxGAndxAPerNinety');
const leagueRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const leagueRankNpxGPerNinety = calculateRankForMetric(sameLeague, 'npxGPerNinety');
const leagueRankNpxGPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const leagueRankNpxGPerShot = calculateRankForMetric(sameLeague, 'npxGPerShot');
const leagueRankNpxGPerShotWithMinutes = calculateRankForMetric(sameLeague, 'npxGPerShot');
const leagueRankOffensiveDuels = calculateRankForMetric(sameLeague, 'offensiveDuels');
const leagueRankOffensiveDuelsWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const leagueRankOffensiveDuelsWonPercentage = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPercentage');
const leagueRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPercentage', p => ({...p}));
const leagueRankOffensiveDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPerNinety');
const leagueRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankPAdjInterceptions = calculateRankForMetric(sameLeague, 'pAdjInterceptions');
const leagueRankPAdjInterceptionsWithMinutes = calculateRankForMetric(sameLeague, 'pAdjInterceptions');
const leagueRankPAdjSlidingTackles = calculateRankForMetric(sameLeague, 'pAdjSlidingTackles');
const leagueRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(sameLeague, 'pAdjSlidingTackles');
const leagueRankPasses = calculateRankForMetric(sameLeague, 'passes');
const leagueRankPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'passesCompletedPerNinety');
const leagueRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const leagueRankPassesToFinalThird = calculateRankForMetric(sameLeague, 'passesToFinalThird');
const leagueRankPassesToFinalThirdWithMinutes = calculateRankForMetric(sameLeague, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const leagueRankPassesToPenaltyArea = calculateRankForMetric(sameLeague, 'passesToPenaltyArea');
const leagueRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(sameLeague, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const leagueRankPassesWithMinutes = calculateRankForMetric(sameLeague, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const leagueRankPossessionPlusMinus = calculateRankForMetric(sameLeague, 'possessionPlusMinus');
const leagueRankPossessionPlusMinusWithMinutes = calculateRankForMetric(sameLeague, 'possessionPlusMinus');
const leagueRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(sameLeague, 'possessionsWonMinusLostPerNinety');
const leagueRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const leagueRankPreAssistsPerNinety = calculateRankForMetric(sameLeague, 'preAssistsPerNinety');
const leagueRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const leagueRankPreventedGoals = calculateRankForMetric(sameLeague, 'preventedGoals');
const leagueRankPreventedGoalsWithMinutes = calculateRankForMetric(sameLeague, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const leagueRankProgressiveActionRate = calculateRankForMetric(sameLeague, 'progressiveActionRate');
const leagueRankProgressiveActionRateWithMinutes = calculateRankForMetric(sameLeague, 'progressiveActionRate');
const leagueRankProgressiveActionsPerNinety = calculateRankForMetric(sameLeague, 'progressiveActionsPerNinety');
const leagueRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const leagueRankProgressivePasses = calculateRankForMetric(sameLeague, 'progressivePasses');
const leagueRankProgressivePassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'progressivePassesCompletedPerNinety');
const leagueRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankProgressivePassesPAdj = calculateRankForMetric(sameLeague, 'progressivePassesPAdj');
const leagueRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(sameLeague, 'progressivePassesPAdj');
const leagueRankProgressivePassesWithMinutes = calculateRankForMetric(sameLeague, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const leagueRankProgressiveRuns = calculateRankForMetric(sameLeague, 'progressiveRuns');
const leagueRankProgressiveRunsWithMinutes = calculateRankForMetric(sameLeague, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const leagueRankSaveRatePercentage = calculateRankForMetric(sameLeague, 'saveRatePercentage');
const leagueRankSaveRatePercentageWithMinutes = calculateRankForMetric(sameLeague, 'saveRatePercentage', p => ({...p}));
const leagueRankSavesPerNinety = calculateRankForMetric(sameLeague, 'savesPerNinety');
const leagueRankSavesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const leagueRankShortMediumPasses = calculateRankForMetric(sameLeague, 'shortMediumPasses');
const leagueRankShortMediumPassesWithMinutes = calculateRankForMetric(sameLeague, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const leagueRankShortPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'shortPassesCompletedPerNinety');
const leagueRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankShotAssists = calculateRankForMetric(sameLeague, 'shotAssists');
const leagueRankShotAssistsWithMinutes = calculateRankForMetric(sameLeague, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const leagueRankShotFrequency = calculateRankForMetric(sameLeague, 'shotFrequency');
const leagueRankShotFrequencyWithMinutes = calculateRankForMetric(sameLeague, 'shotFrequency');
const leagueRankShots = calculateRankForMetric(sameLeague, 'shots');
const leagueRankShotsAgainst = calculateRankForMetric(sameLeague, 'shotsAgainst');
const leagueRankShotsAgainstWithMinutes = calculateRankForMetric(sameLeague, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const leagueRankShotsBlocked = calculateRankForMetric(sameLeague, 'shotsBlocked');
const leagueRankShotsBlockedWithMinutes = calculateRankForMetric(sameLeague, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const leagueRankShotsOnTargetPercentage = calculateRankForMetric(sameLeague, 'shotsOnTargetPercentage');
const leagueRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(sameLeague, 'shotsOnTargetPercentage', p => ({...p}));
const leagueRankShotsOnTargetPerNinety = calculateRankForMetric(sameLeague, 'shotsOnTargetPerNinety');
const leagueRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const leagueRankShotsWithMinutes = calculateRankForMetric(sameLeague, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const leagueRankSlidingTackles = calculateRankForMetric(sameLeague, 'slidingTackles');
const leagueRankSlidingTacklesWithMinutes = calculateRankForMetric(sameLeague, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const leagueRankSuccessfulAttackingActions = calculateRankForMetric(sameLeague, 'successfulAttackingActions');
const leagueRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(sameLeague, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const leagueRankSuccessfulDribblesPercentage = calculateRankForMetric(sameLeague, 'successfulDribblesPercentage');
const leagueRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'successfulDribblesPercentage', p => ({...p}));
const leagueRankSuccessfulDribblesPerNinety = calculateRankForMetric(sameLeague, 'successfulDribblesPerNinety');
const leagueRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const leagueRankThroughPasses = calculateRankForMetric(sameLeague, 'throughPasses');
const leagueRankThroughPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'throughPassesCompletedPerNinety');
const leagueRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankThroughPassesWithMinutes = calculateRankForMetric(sameLeague, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const leagueRankTouchesInBox = calculateRankForMetric(sameLeague, 'touchesInBox');
const leagueRankTouchesInBoxWithMinutes = calculateRankForMetric(sameLeague, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const leagueRankTouchesPerNinety = calculateRankForMetric(sameLeague, 'touchesPerNinety');
const leagueRankTouchesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const leagueRankXA = calculateRankForMetric(sameLeague, 'xA');
const leagueRankXAPer100Passes = calculateRankForMetric(sameLeague, 'xAPer100Passes');
const leagueRankXAPer100PassesWithMinutes = calculateRankForMetric(sameLeague, 'xAPer100Passes');
const leagueRankXAWithMinutes = calculateRankForMetric(sameLeague, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const leagueRankXG = calculateRankForMetric(sameLeague, 'xG');
const leagueRankXGAgainst = calculateRankForMetric(sameLeague, 'xGAgainst');
const leagueRankXGAgainstWithMinutes = calculateRankForMetric(sameLeague, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const leagueRankXGAndxAPerNinety = calculateRankForMetric(sameLeague, 'xGAndxAPerNinety');
const leagueRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const leagueRankXGPer100Touches = calculateRankForMetric(sameLeague, 'xGPer100Touches');
const leagueRankXGPer100TouchesWithMinutes = calculateRankForMetric(sameLeague, 'xGPer100Touches');
const leagueRankXGWithMinutes = calculateRankForMetric(sameLeague, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
      { name: 'Accurate passes to final third', data: leagueRankAccuratePassesToFinalThirdPerNinety },
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
        const filteredData5 = parsedData.filter(player => player.league === selectedPlayer.league &&
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
        const filteredData5 = parsedData.filter(player => player.league === selectedPlayer.league &&
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

const leagueRankAccelerations = calculateRankForMetric(sameLeague, 'accelerations');
const leagueRankAccelerationsWithMinutes = calculateRankForMetric(sameLeague, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const leagueRankAccurateCrossesPercentage = calculateRankForMetric(sameLeague, 'accurateCrossesPercentage');
const leagueRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateCrossesPercentage', p => ({...p}));
const leagueRankAccurateCrossesPerNinety = calculateRankForMetric(sameLeague, 'accurateCrossesPerNinety');
const leagueRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const leagueRankAccurateForwardPassesPercentage = calculateRankForMetric(sameLeague, 'accurateForwardPassesPercentage');
const leagueRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateForwardPassesPercentage', p => ({...p}));
const leagueRankAccurateLongPassesPercentage = calculateRankForMetric(sameLeague, 'accurateLongPassesPercentage');
const leagueRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateLongPassesPercentage', p => ({...p}));
const leagueRankAccuratePassesPercentage = calculateRankForMetric(sameLeague, 'accuratePassesPercentage');
const leagueRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesPercentage', p => ({...p}));
const leagueRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPercentage');
const leagueRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPercentage', p => ({...p}));
const leagueRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPerNinety');
const leagueRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const leagueRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(sameLeague, 'accuratePassesToPenaltyAreaPercentage');
const leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accuratePassesToPenaltyAreaPercentage', p => ({...p}));
const leagueRankAccurateProgressivePassesPercentage = calculateRankForMetric(sameLeague, 'accurateProgressivePassesPercentage');
const leagueRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateProgressivePassesPercentage', p => ({...p}));
const leagueRankAccurateShortMediumPassesPercentage = calculateRankForMetric(sameLeague, 'accurateShortMediumPassesPercentage');
const leagueRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'accurateShortMediumPassesPercentage', p => ({...p}));
const leagueRankActions = calculateRankForMetric(sameLeague, 'defActions');
const leagueRankActionsWithMinutes = calculateRankForMetric(sameLeague, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const leagueRankAerialDuels = calculateRankForMetric(sameLeague, 'aerialDuels');
const leagueRankAerialDuelsWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const leagueRankAerialDuelsWonPercentage = calculateRankForMetric(sameLeague, 'aerialDuelsWonPercentage');
const leagueRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuelsWonPercentage', p => ({...p}));
const leagueRankAerialDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'aerialDuelsWonPerNinety');
const leagueRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankAssists = calculateRankForMetric(sameLeague, 'assists');
const leagueRankAssistsWithMinutes = calculateRankForMetric(sameLeague, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const leagueRankBallCarryingFrequency = calculateRankForMetric(sameLeague, 'ballCarryingFrequency');
const leagueRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(sameLeague, 'ballCarryingFrequency');
const leagueRankChanceCreationRatio = calculateRankForMetric(sameLeague, 'chanceCreationRatio');
const leagueRankChanceCreationRatioWithMinutes = calculateRankForMetric(sameLeague, 'chanceCreationRatio');
const leagueRankCleanSheets = calculateRankForMetric(sameLeague, 'cleanSheets');
const leagueRankCleanSheetsWithMinutes = calculateRankForMetric(sameLeague, 'cleanSheets');
const leagueRankCrosses = calculateRankForMetric(sameLeague, 'crosses');
const leagueRankCrossesToGoalieBox = calculateRankForMetric(sameLeague, 'crossesToGoalieBox');
const leagueRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(sameLeague, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const leagueRankCrossesWithMinutes = calculateRankForMetric(sameLeague, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const leagueRankDeepCompletions = calculateRankForMetric(sameLeague, 'deepCompletions');
const leagueRankDeepCompletionsWithMinutes = calculateRankForMetric(sameLeague, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const leagueRankDefensiveDuelsWonPercentage = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPercentage');
const leagueRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPercentage', p => ({...p}));
const leagueRankDefensiveDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPerNinety');
const leagueRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankDribbles = calculateRankForMetric(sameLeague, 'dribbles');
const leagueRankDribblesPerHundredTouches = calculateRankForMetric(sameLeague, 'dribblesPerHundredTouches');
const leagueRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(sameLeague, 'dribblesPerHundredTouches');
const leagueRankDribblesWithMinutes = calculateRankForMetric(sameLeague, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const leagueRankDuels = calculateRankForMetric(sameLeague, 'defDuels');
const leagueRankDuelsPerNinety = calculateRankForMetric(sameLeague, 'duelsPerNinety');
const leagueRankDuelsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const leagueRankDuelsWithMinutes = calculateRankForMetric(sameLeague, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const leagueRankDuelsWonPercentage = calculateRankForMetric(sameLeague, 'duelsWonPercentage');
const leagueRankDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'duelsWonPercentage');
const leagueRankDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'duelsWonPerNinety');
const leagueRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const leagueRankExits = calculateRankForMetric(sameLeague, 'exits');
const leagueRankExitsWithMinutes = calculateRankForMetric(sameLeague, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const leagueRankForwardPasses = calculateRankForMetric(sameLeague, 'forwardPasses');
const leagueRankForwardPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'forwardPassesCompletedPerNinety');
const leagueRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankForwardPassesWithMinutes = calculateRankForMetric(sameLeague, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const leagueRankForwardPassRatio = calculateRankForMetric(sameLeague, 'forwardPassRatio');
const leagueRankForwardPassRatioWithMinutes = calculateRankForMetric(sameLeague, 'forwardPassRatio');
const leagueRankFoulsSuffered = calculateRankForMetric(sameLeague, 'foulsSuffered');
const leagueRankFoulsSufferedWithMinutes = calculateRankForMetric(sameLeague, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const leagueRankGoalConversionPercentage = calculateRankForMetric(sameLeague, 'goalConversionPercentage');
const leagueRankGoalConversionPercentageWithMinutes = calculateRankForMetric(sameLeague, 'goalConversionPercentage', p => ({...p}));
const leagueRankGoals = calculateRankForMetric(sameLeague, 'goals');
const leagueRankGoalsAndAssistsPerNinety = calculateRankForMetric(sameLeague, 'goalsAndAssistsPerNinety');
const leagueRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankGoalsMinusxGPerNinety = calculateRankForMetric(sameLeague, 'goalsMinusxGPerNinety');
const leagueRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const leagueRankGoalsPer100Touches = calculateRankForMetric(sameLeague, 'goalsPer100Touches');
const leagueRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(sameLeague, 'goalsPer100Touches');
const leagueRankGoalsWithMinutes = calculateRankForMetric(sameLeague, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const leagueRankHeadGoals = calculateRankForMetric(sameLeague, 'headGoals');
const leagueRankHeadGoalsWithMinutes = calculateRankForMetric(sameLeague, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const leagueRankInterceptions = calculateRankForMetric(sameLeague, 'interceptions');
const leagueRankInterceptionsWithMinutes = calculateRankForMetric(sameLeague, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const leagueRankKeyPasses = calculateRankForMetric(sameLeague, 'keyPasses');
const leagueRankKeyPassesWithMinutes = calculateRankForMetric(sameLeague, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const leagueRankLongPasses = calculateRankForMetric(sameLeague, 'longPasses');
const leagueRankLongPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'longPassesCompletedPerNinety');
const leagueRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankLongPassesWithMinutes = calculateRankForMetric(sameLeague, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const leagueRankNonPenaltyGoals = calculateRankForMetric(sameLeague, 'nonPenaltyGoals');
const leagueRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(sameLeague, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const leagueRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(sameLeague, 'npGoalsAndAssistsPerNinety');
const leagueRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const leagueRankNpxGAndxAPerNinety = calculateRankForMetric(sameLeague, 'npxGAndxAPerNinety');
const leagueRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const leagueRankNpxGPerNinety = calculateRankForMetric(sameLeague, 'npxGPerNinety');
const leagueRankNpxGPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const leagueRankNpxGPerShot = calculateRankForMetric(sameLeague, 'npxGPerShot');
const leagueRankNpxGPerShotWithMinutes = calculateRankForMetric(sameLeague, 'npxGPerShot');
const leagueRankOffensiveDuels = calculateRankForMetric(sameLeague, 'offensiveDuels');
const leagueRankOffensiveDuelsWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const leagueRankOffensiveDuelsWonPercentage = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPercentage');
const leagueRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPercentage', p => ({...p}));
const leagueRankOffensiveDuelsWonPerNinety = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPerNinety');
const leagueRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const leagueRankPAdjInterceptions = calculateRankForMetric(sameLeague, 'pAdjInterceptions');
const leagueRankPAdjInterceptionsWithMinutes = calculateRankForMetric(sameLeague, 'pAdjInterceptions');
const leagueRankPAdjSlidingTackles = calculateRankForMetric(sameLeague, 'pAdjSlidingTackles');
const leagueRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(sameLeague, 'pAdjSlidingTackles');
const leagueRankPasses = calculateRankForMetric(sameLeague, 'passes');
const leagueRankPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'passesCompletedPerNinety');
const leagueRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const leagueRankPassesToFinalThird = calculateRankForMetric(sameLeague, 'passesToFinalThird');
const leagueRankPassesToFinalThirdWithMinutes = calculateRankForMetric(sameLeague, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const leagueRankPassesToPenaltyArea = calculateRankForMetric(sameLeague, 'passesToPenaltyArea');
const leagueRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(sameLeague, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const leagueRankPassesWithMinutes = calculateRankForMetric(sameLeague, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const leagueRankPossessionPlusMinus = calculateRankForMetric(sameLeague, 'possessionPlusMinus');
const leagueRankPossessionPlusMinusWithMinutes = calculateRankForMetric(sameLeague, 'possessionPlusMinus');
const leagueRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(sameLeague, 'possessionsWonMinusLostPerNinety');
const leagueRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const leagueRankPreAssistsPerNinety = calculateRankForMetric(sameLeague, 'preAssistsPerNinety');
const leagueRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const leagueRankPreventedGoals = calculateRankForMetric(sameLeague, 'preventedGoals');
const leagueRankPreventedGoalsWithMinutes = calculateRankForMetric(sameLeague, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const leagueRankProgressiveActionRate = calculateRankForMetric(sameLeague, 'progressiveActionRate');
const leagueRankProgressiveActionRateWithMinutes = calculateRankForMetric(sameLeague, 'progressiveActionRate');
const leagueRankProgressiveActionsPerNinety = calculateRankForMetric(sameLeague, 'progressiveActionsPerNinety');
const leagueRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const leagueRankProgressivePasses = calculateRankForMetric(sameLeague, 'progressivePasses');
const leagueRankProgressivePassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'progressivePassesCompletedPerNinety');
const leagueRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankProgressivePassesPAdj = calculateRankForMetric(sameLeague, 'progressivePassesPAdj');
const leagueRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(sameLeague, 'progressivePassesPAdj');
const leagueRankProgressivePassesWithMinutes = calculateRankForMetric(sameLeague, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const leagueRankProgressiveRuns = calculateRankForMetric(sameLeague, 'progressiveRuns');
const leagueRankProgressiveRunsWithMinutes = calculateRankForMetric(sameLeague, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const leagueRankSaveRatePercentage = calculateRankForMetric(sameLeague, 'saveRatePercentage');
const leagueRankSaveRatePercentageWithMinutes = calculateRankForMetric(sameLeague, 'saveRatePercentage', p => ({...p}));
const leagueRankSavesPerNinety = calculateRankForMetric(sameLeague, 'savesPerNinety');
const leagueRankSavesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const leagueRankShortMediumPasses = calculateRankForMetric(sameLeague, 'shortMediumPasses');
const leagueRankShortMediumPassesWithMinutes = calculateRankForMetric(sameLeague, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const leagueRankShortPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'shortPassesCompletedPerNinety');
const leagueRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankShotAssists = calculateRankForMetric(sameLeague, 'shotAssists');
const leagueRankShotAssistsWithMinutes = calculateRankForMetric(sameLeague, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const leagueRankShotFrequency = calculateRankForMetric(sameLeague, 'shotFrequency');
const leagueRankShotFrequencyWithMinutes = calculateRankForMetric(sameLeague, 'shotFrequency');
const leagueRankShots = calculateRankForMetric(sameLeague, 'shots');
const leagueRankShotsAgainst = calculateRankForMetric(sameLeague, 'shotsAgainst');
const leagueRankShotsAgainstWithMinutes = calculateRankForMetric(sameLeague, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const leagueRankShotsBlocked = calculateRankForMetric(sameLeague, 'shotsBlocked');
const leagueRankShotsBlockedWithMinutes = calculateRankForMetric(sameLeague, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const leagueRankShotsOnTargetPercentage = calculateRankForMetric(sameLeague, 'shotsOnTargetPercentage');
const leagueRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(sameLeague, 'shotsOnTargetPercentage', p => ({...p}));
const leagueRankShotsOnTargetPerNinety = calculateRankForMetric(sameLeague, 'shotsOnTargetPerNinety');
const leagueRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const leagueRankShotsWithMinutes = calculateRankForMetric(sameLeague, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const leagueRankSlidingTackles = calculateRankForMetric(sameLeague, 'slidingTackles');
const leagueRankSlidingTacklesWithMinutes = calculateRankForMetric(sameLeague, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const leagueRankSuccessfulAttackingActions = calculateRankForMetric(sameLeague, 'successfulAttackingActions');
const leagueRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(sameLeague, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const leagueRankSuccessfulDribblesPercentage = calculateRankForMetric(sameLeague, 'successfulDribblesPercentage');
const leagueRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(sameLeague, 'successfulDribblesPercentage', p => ({...p}));
const leagueRankSuccessfulDribblesPerNinety = calculateRankForMetric(sameLeague, 'successfulDribblesPerNinety');
const leagueRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const leagueRankThroughPasses = calculateRankForMetric(sameLeague, 'throughPasses');
const leagueRankThroughPassesCompletedPerNinety = calculateRankForMetric(sameLeague, 'throughPassesCompletedPerNinety');
const leagueRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const leagueRankThroughPassesWithMinutes = calculateRankForMetric(sameLeague, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const leagueRankTouchesInBox = calculateRankForMetric(sameLeague, 'touchesInBox');
const leagueRankTouchesInBoxWithMinutes = calculateRankForMetric(sameLeague, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const leagueRankTouchesPerNinety = calculateRankForMetric(sameLeague, 'touchesPerNinety');
const leagueRankTouchesPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const leagueRankXA = calculateRankForMetric(sameLeague, 'xA');
const leagueRankXAPer100Passes = calculateRankForMetric(sameLeague, 'xAPer100Passes');
const leagueRankXAPer100PassesWithMinutes = calculateRankForMetric(sameLeague, 'xAPer100Passes');
const leagueRankXAWithMinutes = calculateRankForMetric(sameLeague, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const leagueRankXG = calculateRankForMetric(sameLeague, 'xG');
const leagueRankXGAgainst = calculateRankForMetric(sameLeague, 'xGAgainst');
const leagueRankXGAgainstWithMinutes = calculateRankForMetric(sameLeague, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const leagueRankXGAndxAPerNinety = calculateRankForMetric(sameLeague, 'xGAndxAPerNinety');
const leagueRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(sameLeague, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const leagueRankXGPer100Touches = calculateRankForMetric(sameLeague, 'xGPer100Touches');
const leagueRankXGPer100TouchesWithMinutes = calculateRankForMetric(sameLeague, 'xGPer100Touches');
const leagueRankXGWithMinutes = calculateRankForMetric(sameLeague, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
        const filteredData6 = parsedData.filter(player => player.league === selectedPlayer.league &&
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
        const filteredData6 = parsedData.filter(player => player.league === selectedPlayer.league &&
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
const allCsvRankAccelerations = calculateRankForMetric(baseFiltered, 'accelerations');
const allCsvRankAccelerationsWithMinutes = calculateRankForMetric(baseFiltered, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const allCsvRankAccurateCrossesPercentage = calculateRankForMetric(baseFiltered, 'accurateCrossesPercentage');
const allCsvRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateCrossesPercentage');
const allCsvRankAccurateCrossesPerNinety = calculateRankForMetric(baseFiltered, 'accurateCrossesPerNinety');
const allCsvRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const allCsvRankAccurateForwardPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateForwardPassesPercentage');
const allCsvRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateForwardPassesPercentage');
const allCsvRankAccurateLongPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateLongPassesPercentage');
const allCsvRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateLongPassesPercentage');
const allCsvRankAccuratePassesPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesPercentage');
const allCsvRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesPercentage');
const allCsvRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPercentage');
const allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPercentage');
const allCsvRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPerNinety');
const allCsvRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const allCsvRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesToPenaltyAreaPercentage');
const allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToPenaltyAreaPercentage');
const allCsvRankAccurateProgressivePassesPercentage = calculateRankForMetric(baseFiltered, 'accurateProgressivePassesPercentage');
const allCsvRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateProgressivePassesPercentage');
const allCsvRankAccurateShortMediumPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateShortMediumPassesPercentage');
const allCsvRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateShortMediumPassesPercentage');
const allCsvRankActions = calculateRankForMetric(baseFiltered, 'defActions');
const allCsvRankActionsWithMinutes = calculateRankForMetric(baseFiltered, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const allCsvRankAerialDuels = calculateRankForMetric(baseFiltered, 'aerialDuels');
const allCsvRankAerialDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const allCsvRankAerialDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPercentage');
const allCsvRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPercentage');
const allCsvRankAerialDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPerNinety');
const allCsvRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankAssists = calculateRankForMetric(baseFiltered, 'assists');
const allCsvRankAssistsWithMinutes = calculateRankForMetric(baseFiltered, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const allCsvRankBallCarryingFrequency = calculateRankForMetric(baseFiltered, 'ballCarryingFrequency');
const allCsvRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(baseFiltered, 'ballCarryingFrequency');
const allCsvRankChanceCreationRatio = calculateRankForMetric(baseFiltered, 'chanceCreationRatio');
const allCsvRankChanceCreationRatioWithMinutes = calculateRankForMetric(baseFiltered, 'chanceCreationRatio');
const allCsvRankCleanSheets = calculateRankForMetric(baseFiltered, 'cleanSheets');
const allCsvRankCleanSheetsWithMinutes = calculateRankForMetric(baseFiltered, 'cleanSheets');
const allCsvRankCrosses = calculateRankForMetric(baseFiltered, 'crosses');
const allCsvRankCrossesToGoalieBox = calculateRankForMetric(baseFiltered, 'crossesToGoalieBox');
const allCsvRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(baseFiltered, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const allCsvRankCrossesWithMinutes = calculateRankForMetric(baseFiltered, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const allCsvRankDeepCompletions = calculateRankForMetric(baseFiltered, 'deepCompletions');
const allCsvRankDeepCompletionsWithMinutes = calculateRankForMetric(baseFiltered, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const allCsvRankDefensiveDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPercentage');
const allCsvRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPercentage');
const allCsvRankDefensiveDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPerNinety');
const allCsvRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankDribbles = calculateRankForMetric(baseFiltered, 'dribbles');
const allCsvRankDribblesPerHundredTouches = calculateRankForMetric(baseFiltered, 'dribblesPerHundredTouches');
const allCsvRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(baseFiltered, 'dribblesPerHundredTouches');
const allCsvRankDribblesWithMinutes = calculateRankForMetric(baseFiltered, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const allCsvRankDuels = calculateRankForMetric(baseFiltered, 'defDuels');
const allCsvRankDuelsPerNinety = calculateRankForMetric(baseFiltered, 'duelsPerNinety');
const allCsvRankDuelsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const allCsvRankDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const allCsvRankDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'duelsWonPercentage');
const allCsvRankDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'duelsWonPercentage');
const allCsvRankDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'duelsWonPerNinety');
const allCsvRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const allCsvRankExits = calculateRankForMetric(baseFiltered, 'exits');
const allCsvRankExitsWithMinutes = calculateRankForMetric(baseFiltered, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const allCsvRankForwardPasses = calculateRankForMetric(baseFiltered, 'forwardPasses');
const allCsvRankForwardPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'forwardPassesCompletedPerNinety');
const allCsvRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankForwardPassesWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const allCsvRankForwardPassRatio = calculateRankForMetric(baseFiltered, 'forwardPassRatio');
const allCsvRankForwardPassRatioWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPassRatio');
const allCsvRankFoulsSuffered = calculateRankForMetric(baseFiltered, 'foulsSuffered');
const allCsvRankFoulsSufferedWithMinutes = calculateRankForMetric(baseFiltered, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const allCsvRankGoalConversionPercentage = calculateRankForMetric(baseFiltered, 'goalConversionPercentage');
const allCsvRankGoalConversionPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'goalConversionPercentage');
const allCsvRankGoals = calculateRankForMetric(baseFiltered, 'goals');
const allCsvRankGoalsAndAssistsPerNinety = calculateRankForMetric(baseFiltered, 'goalsAndAssistsPerNinety');
const allCsvRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const allCsvRankGoalsMinusxGPerNinety = calculateRankForMetric(baseFiltered, 'goalsMinusxGPerNinety');
const allCsvRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const allCsvRankGoalsPer100Touches = calculateRankForMetric(baseFiltered, 'goalsPer100Touches');
const allCsvRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(baseFiltered, 'goalsPer100Touches');
const allCsvRankGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const allCsvRankHeadGoals = calculateRankForMetric(baseFiltered, 'headGoals');
const allCsvRankHeadGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const allCsvRankInterceptions = calculateRankForMetric(baseFiltered, 'interceptions');
const allCsvRankInterceptionsWithMinutes = calculateRankForMetric(baseFiltered, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const allCsvRankKeyPasses = calculateRankForMetric(baseFiltered, 'keyPasses');
const allCsvRankKeyPassesWithMinutes = calculateRankForMetric(baseFiltered, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const allCsvRankLongPasses = calculateRankForMetric(baseFiltered, 'longPasses');
const allCsvRankLongPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'longPassesCompletedPerNinety');
const allCsvRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankLongPassesWithMinutes = calculateRankForMetric(baseFiltered, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const allCsvRankNonPenaltyGoals = calculateRankForMetric(baseFiltered, 'nonPenaltyGoals');
const allCsvRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const allCsvRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(baseFiltered, 'npGoalsAndAssistsPerNinety');
const allCsvRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const allCsvRankNpxGAndxAPerNinety = calculateRankForMetric(baseFiltered, 'npxGAndxAPerNinety');
const allCsvRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const allCsvRankNpxGPerNinety = calculateRankForMetric(baseFiltered, 'npxGPerNinety');
const allCsvRankNpxGPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const allCsvRankNpxGPerShot = calculateRankForMetric(baseFiltered, 'npxGPerShot');
const allCsvRankNpxGPerShotWithMinutes = calculateRankForMetric(baseFiltered, 'npxGPerShot');
const allCsvRankOffensiveDuels = calculateRankForMetric(baseFiltered, 'offensiveDuels');
const allCsvRankOffensiveDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const allCsvRankOffensiveDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPercentage');
const allCsvRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPercentage');
const allCsvRankOffensiveDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPerNinety');
const allCsvRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankPAdjInterceptions = calculateRankForMetric(baseFiltered, 'pAdjInterceptions');
const allCsvRankPAdjInterceptionsWithMinutes = calculateRankForMetric(baseFiltered, 'pAdjInterceptions');
const allCsvRankPAdjSlidingTackles = calculateRankForMetric(baseFiltered, 'pAdjSlidingTackles');
const allCsvRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(baseFiltered, 'pAdjSlidingTackles');
const allCsvRankPasses = calculateRankForMetric(baseFiltered, 'passes');
const allCsvRankPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'passesCompletedPerNinety');
const allCsvRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankPassesToFinalThird = calculateRankForMetric(baseFiltered, 'passesToFinalThird');
const allCsvRankPassesToFinalThirdWithMinutes = calculateRankForMetric(baseFiltered, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const allCsvRankPassesToPenaltyArea = calculateRankForMetric(baseFiltered, 'passesToPenaltyArea');
const allCsvRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(baseFiltered, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const allCsvRankPassesWithMinutes = calculateRankForMetric(baseFiltered, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const allCsvRankPossessionPlusMinus = calculateRankForMetric(baseFiltered, 'possessionPlusMinus');
const allCsvRankPossessionPlusMinusWithMinutes = calculateRankForMetric(baseFiltered, 'possessionPlusMinus');
const allCsvRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(baseFiltered, 'possessionsWonMinusLostPerNinety');
const allCsvRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const allCsvRankPreAssistsPerNinety = calculateRankForMetric(baseFiltered, 'preAssistsPerNinety');
const allCsvRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const allCsvRankPreventedGoals = calculateRankForMetric(baseFiltered, 'preventedGoals');
const allCsvRankPreventedGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const allCsvRankProgressiveActionRate = calculateRankForMetric(baseFiltered, 'progressiveActionRate');
const allCsvRankProgressiveActionRateWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveActionRate');
const allCsvRankProgressiveActionsPerNinety = calculateRankForMetric(baseFiltered, 'progressiveActionsPerNinety');
const allCsvRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const allCsvRankProgressivePasses = calculateRankForMetric(baseFiltered, 'progressivePasses');
const allCsvRankProgressivePassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'progressivePassesCompletedPerNinety');
const allCsvRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankProgressivePassesPAdj = calculateRankForMetric(baseFiltered, 'progressivePassesPAdj');
const allCsvRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePassesPAdj');
const allCsvRankProgressivePassesWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const allCsvRankProgressiveRuns = calculateRankForMetric(baseFiltered, 'progressiveRuns');
const allCsvRankProgressiveRunsWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const allCsvRankSaveRatePercentage = calculateRankForMetric(baseFiltered, 'saveRatePercentage');
const allCsvRankSaveRatePercentageWithMinutes = calculateRankForMetric(baseFiltered, 'saveRatePercentage');
const allCsvRankSavesPerNinety = calculateRankForMetric(baseFiltered, 'savesPerNinety');
const allCsvRankSavesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const allCsvRankShortMediumPasses = calculateRankForMetric(baseFiltered, 'shortMediumPasses');
const allCsvRankShortMediumPassesWithMinutes = calculateRankForMetric(baseFiltered, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const allCsvRankShortPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'shortPassesCompletedPerNinety');
const allCsvRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankShotAssists = calculateRankForMetric(baseFiltered, 'shotAssists');
const allCsvRankShotAssistsWithMinutes = calculateRankForMetric(baseFiltered, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const allCsvRankShotFrequency = calculateRankForMetric(baseFiltered, 'shotFrequency');
const allCsvRankShotFrequencyWithMinutes = calculateRankForMetric(baseFiltered, 'shotFrequency');
const allCsvRankShots = calculateRankForMetric(baseFiltered, 'shots');
const allCsvRankShotsAgainst = calculateRankForMetric(baseFiltered, 'shotsAgainst');
const allCsvRankShotsAgainstWithMinutes = calculateRankForMetric(baseFiltered, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const allCsvRankShotsBlocked = calculateRankForMetric(baseFiltered, 'shotsBlocked');
const allCsvRankShotsBlockedWithMinutes = calculateRankForMetric(baseFiltered, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const allCsvRankShotsOnTargetPercentage = calculateRankForMetric(baseFiltered, 'shotsOnTargetPercentage');
const allCsvRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'shotsOnTargetPercentage');
const allCsvRankShotsOnTargetPerNinety = calculateRankForMetric(baseFiltered, 'shotsOnTargetPerNinety');
const allCsvRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const allCsvRankShotsWithMinutes = calculateRankForMetric(baseFiltered, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const allCsvRankSlidingTackles = calculateRankForMetric(baseFiltered, 'slidingTackles');
const allCsvRankSlidingTacklesWithMinutes = calculateRankForMetric(baseFiltered, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const allCsvRankSuccessfulAttackingActions = calculateRankForMetric(baseFiltered, 'successfulAttackingActions');
const allCsvRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(baseFiltered, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const allCsvRankSuccessfulDribblesPercentage = calculateRankForMetric(baseFiltered, 'successfulDribblesPercentage');
const allCsvRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'successfulDribblesPercentage');
const allCsvRankSuccessfulDribblesPerNinety = calculateRankForMetric(baseFiltered, 'successfulDribblesPerNinety');
const allCsvRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const allCsvRankThroughPasses = calculateRankForMetric(baseFiltered, 'throughPasses');
const allCsvRankThroughPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'throughPassesCompletedPerNinety');
const allCsvRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankThroughPassesWithMinutes = calculateRankForMetric(baseFiltered, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const allCsvRankTouchesInBox = calculateRankForMetric(baseFiltered, 'touchesInBox');
const allCsvRankTouchesInBoxWithMinutes = calculateRankForMetric(baseFiltered, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const allCsvRankTouchesPerNinety = calculateRankForMetric(baseFiltered, 'touchesPerNinety');
const allCsvRankTouchesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const allCsvRankXA = calculateRankForMetric(baseFiltered, 'xA');
const allCsvRankXAPer100Passes = calculateRankForMetric(baseFiltered, 'xAPer100Passes');
const allCsvRankXAPer100PassesWithMinutes = calculateRankForMetric(baseFiltered, 'xAPer100Passes');
const allCsvRankXAWithMinutes = calculateRankForMetric(baseFiltered, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const allCsvRankXG = calculateRankForMetric(baseFiltered, 'xG');
const allCsvRankXGAgainst = calculateRankForMetric(baseFiltered, 'xGAgainst');
const allCsvRankXGAgainstWithMinutes = calculateRankForMetric(baseFiltered, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const allCsvRankXGAndxAPerNinety = calculateRankForMetric(baseFiltered, 'xGAndxAPerNinety');
const allCsvRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const allCsvRankXGPer100Touches = calculateRankForMetric(baseFiltered, 'xGPer100Touches');
const allCsvRankXGPer100TouchesWithMinutes = calculateRankForMetric(baseFiltered, 'xGPer100Touches');
const allCsvRankXGWithMinutes = calculateRankForMetric(baseFiltered, 'xG', p => ({...p, xG: p.xG * p.minutes}));
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
        const filteredData7 = parsedData.filter(player =>
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
        const filteredData7 = parsedData.filter(player =>
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
const allCsvRankAccelerations = calculateRankForMetric(baseFiltered, 'accelerations');
const allCsvRankAccelerationsWithMinutes = calculateRankForMetric(baseFiltered, 'accelerations', p => ({...p, accelerations: Math.round(p.accelerations * p.minutes / 90)}));
const allCsvRankAccurateCrossesPercentage = calculateRankForMetric(baseFiltered, 'accurateCrossesPercentage');
const allCsvRankAccurateCrossesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateCrossesPercentage');
const allCsvRankAccurateCrossesPerNinety = calculateRankForMetric(baseFiltered, 'accurateCrossesPerNinety');
const allCsvRankAccurateCrossesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'accurateCrossesPerNinety', p => ({...p, accurateCrossesPerNinety: Math.round(p.accurateCrossesPerNinety * p.minutes / 90)}));
const allCsvRankAccurateForwardPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateForwardPassesPercentage');
const allCsvRankAccurateForwardPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateForwardPassesPercentage');
const allCsvRankAccurateLongPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateLongPassesPercentage');
const allCsvRankAccurateLongPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateLongPassesPercentage');
const allCsvRankAccuratePassesPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesPercentage');
const allCsvRankAccuratePassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesPercentage');
const allCsvRankAccuratePassesToFinalThirdPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPercentage');
const allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPercentage');
const allCsvRankAccuratePassesToFinalThirdPerNinety = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPerNinety');
const allCsvRankAccuratePassesToFinalThirdPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToFinalThirdPerNinety', p => ({...p, accuratePassesToFinalThirdPerNinety: Math.round(p.accuratePassesToFinalThirdPerNinety * p.minutes / 90)}));
const allCsvRankAccuratePassesToPenaltyAreaPercentage = calculateRankForMetric(baseFiltered, 'accuratePassesToPenaltyAreaPercentage');
const allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accuratePassesToPenaltyAreaPercentage');
const allCsvRankAccurateProgressivePassesPercentage = calculateRankForMetric(baseFiltered, 'accurateProgressivePassesPercentage');
const allCsvRankAccurateProgressivePassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateProgressivePassesPercentage');
const allCsvRankAccurateShortMediumPassesPercentage = calculateRankForMetric(baseFiltered, 'accurateShortMediumPassesPercentage');
const allCsvRankAccurateShortMediumPassesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'accurateShortMediumPassesPercentage');
const allCsvRankActions = calculateRankForMetric(baseFiltered, 'defActions');
const allCsvRankActionsWithMinutes = calculateRankForMetric(baseFiltered, 'defActions', p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
const allCsvRankAerialDuels = calculateRankForMetric(baseFiltered, 'aerialDuels');
const allCsvRankAerialDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuels', p => ({...p, aerialDuels: Math.round(p.aerialDuels * p.minutes / 90)}));
const allCsvRankAerialDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPercentage');
const allCsvRankAerialDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPercentage');
const allCsvRankAerialDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPerNinety');
const allCsvRankAerialDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'aerialDuelsWonPerNinety', p => ({...p, aerialDuelsWonPerNinety: Math.round(p.aerialDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankAssists = calculateRankForMetric(baseFiltered, 'assists');
const allCsvRankAssistsWithMinutes = calculateRankForMetric(baseFiltered, 'assists', p => ({...p, assists: Math.round(p.assists * p.minutes / 90)}));
const allCsvRankBallCarryingFrequency = calculateRankForMetric(baseFiltered, 'ballCarryingFrequency');
const allCsvRankBallCarryingFrequencyWithMinutes = calculateRankForMetric(baseFiltered, 'ballCarryingFrequency');
const allCsvRankChanceCreationRatio = calculateRankForMetric(baseFiltered, 'chanceCreationRatio');
const allCsvRankChanceCreationRatioWithMinutes = calculateRankForMetric(baseFiltered, 'chanceCreationRatio');
const allCsvRankCleanSheets = calculateRankForMetric(baseFiltered, 'cleanSheets');
const allCsvRankCleanSheetsWithMinutes = calculateRankForMetric(baseFiltered, 'cleanSheets');
const allCsvRankCrosses = calculateRankForMetric(baseFiltered, 'crosses');
const allCsvRankCrossesToGoalieBox = calculateRankForMetric(baseFiltered, 'crossesToGoalieBox');
const allCsvRankCrossesToGoalieBoxWithMinutes = calculateRankForMetric(baseFiltered, 'crossesToGoalieBox', p => ({...p, crossesToGoalieBox: Math.round(p.crossesToGoalieBox * p.minutes / 90)}));
const allCsvRankCrossesWithMinutes = calculateRankForMetric(baseFiltered, 'crosses', p => ({...p, crosses: Math.round(p.crosses * p.minutes / 90)}));
const allCsvRankDeepCompletions = calculateRankForMetric(baseFiltered, 'deepCompletions');
const allCsvRankDeepCompletionsWithMinutes = calculateRankForMetric(baseFiltered, 'deepCompletions', p => ({...p, deepCompletions: Math.round(p.deepCompletions * p.minutes / 90)}));
const allCsvRankDefensiveDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPercentage');
const allCsvRankDefensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPercentage');
const allCsvRankDefensiveDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPerNinety');
const allCsvRankDefensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'defensiveDuelsWonPerNinety', p => ({...p, defensiveDuelsWonPerNinety: Math.round(p.defensiveDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankDribbles = calculateRankForMetric(baseFiltered, 'dribbles');
const allCsvRankDribblesPerHundredTouches = calculateRankForMetric(baseFiltered, 'dribblesPerHundredTouches');
const allCsvRankDribblesPerHundredTouchesWithMinutes = calculateRankForMetric(baseFiltered, 'dribblesPerHundredTouches');
const allCsvRankDribblesWithMinutes = calculateRankForMetric(baseFiltered, 'dribbles', p => ({...p, dribbles: Math.round(p.dribbles * p.minutes / 90)}));
const allCsvRankDuels = calculateRankForMetric(baseFiltered, 'defDuels');
const allCsvRankDuelsPerNinety = calculateRankForMetric(baseFiltered, 'duelsPerNinety');
const allCsvRankDuelsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'duelsPerNinety', p => ({...p, duelsPerNinety: Math.round(p.duelsPerNinety * p.minutes / 90)}));
const allCsvRankDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'defDuels', p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
const allCsvRankDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'duelsWonPercentage');
const allCsvRankDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'duelsWonPercentage');
const allCsvRankDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'duelsWonPerNinety');
const allCsvRankDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'duelsWonPerNinety', p => ({...p, duelsWonPerNinety: Math.round(p.duelsWonPerNinety * p.minutes / 90)}));
const allCsvRankExits = calculateRankForMetric(baseFiltered, 'exits');
const allCsvRankExitsWithMinutes = calculateRankForMetric(baseFiltered, 'exits', p => ({...p, exits: Math.round(p.exits * p.minutes / 90)}));
const allCsvRankForwardPasses = calculateRankForMetric(baseFiltered, 'forwardPasses');
const allCsvRankForwardPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'forwardPassesCompletedPerNinety');
const allCsvRankForwardPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPassesCompletedPerNinety', p => ({...p, forwardPassesCompletedPerNinety: Math.round(p.forwardPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankForwardPassesWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPasses', p => ({...p, forwardPasses: Math.round(p.forwardPasses * p.minutes / 90)}));
const allCsvRankForwardPassRatio = calculateRankForMetric(baseFiltered, 'forwardPassRatio');
const allCsvRankForwardPassRatioWithMinutes = calculateRankForMetric(baseFiltered, 'forwardPassRatio');
const allCsvRankFoulsSuffered = calculateRankForMetric(baseFiltered, 'foulsSuffered');
const allCsvRankFoulsSufferedWithMinutes = calculateRankForMetric(baseFiltered, 'foulsSuffered', p => ({...p, foulsSuffered: Math.round(p.foulsSuffered * p.minutes / 90)}));
const allCsvRankGoalConversionPercentage = calculateRankForMetric(baseFiltered, 'goalConversionPercentage');
const allCsvRankGoalConversionPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'goalConversionPercentage');
const allCsvRankGoals = calculateRankForMetric(baseFiltered, 'goals');
const allCsvRankGoalsAndAssistsPerNinety = calculateRankForMetric(baseFiltered, 'goalsAndAssistsPerNinety');
const allCsvRankGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'goalsAndAssistsPerNinety', p => ({...p, goalsAndAssistsPerNinety: Math.round(p.goalsAndAssistsPerNinety * p.minutes / 90)}));
const allCsvRankGoalsMinusxGPerNinety = calculateRankForMetric(baseFiltered, 'goalsMinusxGPerNinety');
const allCsvRankGoalsMinusxGPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'goalsMinusxGPerNinety', p => ({...p, goalsMinusxGPerNinety: p.goalsMinusxGPerNinety * p.minutes / 90}));
const allCsvRankGoalsPer100Touches = calculateRankForMetric(baseFiltered, 'goalsPer100Touches');
const allCsvRankGoalsPer100TouchesWithMinutes = calculateRankForMetric(baseFiltered, 'goalsPer100Touches');
const allCsvRankGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'goals', p => ({...p, goals: Math.round(p.goals * p.minutes / 90)}));
const allCsvRankHeadGoals = calculateRankForMetric(baseFiltered, 'headGoals');
const allCsvRankHeadGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'headGoals', p => ({...p, headGoals: Math.round(p.headGoals * p.minutes / 90)}));
const allCsvRankInterceptions = calculateRankForMetric(baseFiltered, 'interceptions');
const allCsvRankInterceptionsWithMinutes = calculateRankForMetric(baseFiltered, 'interceptions', p => ({...p, interceptions: Math.round(p.interceptions * p.minutes / 90)}));
const allCsvRankKeyPasses = calculateRankForMetric(baseFiltered, 'keyPasses');
const allCsvRankKeyPassesWithMinutes = calculateRankForMetric(baseFiltered, 'keyPasses', p => ({...p, keyPasses: Math.round(p.keyPasses * p.minutes / 90)}));
const allCsvRankLongPasses = calculateRankForMetric(baseFiltered, 'longPasses');
const allCsvRankLongPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'longPassesCompletedPerNinety');
const allCsvRankLongPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'longPassesCompletedPerNinety', p => ({...p, longPassesCompletedPerNinety: Math.round(p.longPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankLongPassesWithMinutes = calculateRankForMetric(baseFiltered, 'longPasses', p => ({...p, longPasses: Math.round(p.longPasses * p.minutes / 90)}));
const allCsvRankNonPenaltyGoals = calculateRankForMetric(baseFiltered, 'nonPenaltyGoals');
const allCsvRankNonPenaltyGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'nonPenaltyGoals', p => ({...p, nonPenaltyGoals: Math.round(p.nonPenaltyGoals * p.minutes / 90)}));
const allCsvRankNpGoalsAndAssistsPerNinety = calculateRankForMetric(baseFiltered, 'npGoalsAndAssistsPerNinety');
const allCsvRankNpGoalsAndAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npGoalsAndAssistsPerNinety', p => ({...p, npGoalsAndAssistsPerNinety: Math.round(p.npGoalsAndAssistsPerNinety * p.minutes / 90)}));
const allCsvRankNpxGAndxAPerNinety = calculateRankForMetric(baseFiltered, 'npxGAndxAPerNinety');
const allCsvRankNpxGAndxAPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npxGAndxAPerNinety', p => ({...p, npxGAndxAPerNinety: p.npxGAndxAPerNinety * p.minutes / 90}));
const allCsvRankNpxGPerNinety = calculateRankForMetric(baseFiltered, 'npxGPerNinety');
const allCsvRankNpxGPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'npxGPerNinety', p => ({...p, npxGPerNinety: p.npxGPerNinety * p.minutes / 90}));
const allCsvRankNpxGPerShot = calculateRankForMetric(baseFiltered, 'npxGPerShot');
const allCsvRankNpxGPerShotWithMinutes = calculateRankForMetric(baseFiltered, 'npxGPerShot');
const allCsvRankOffensiveDuels = calculateRankForMetric(baseFiltered, 'offensiveDuels');
const allCsvRankOffensiveDuelsWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuels', p => ({...p, offensiveDuels: Math.round(p.offensiveDuels * p.minutes / 90)}));
const allCsvRankOffensiveDuelsWonPercentage = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPercentage');
const allCsvRankOffensiveDuelsWonPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPercentage');
const allCsvRankOffensiveDuelsWonPerNinety = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPerNinety');
const allCsvRankOffensiveDuelsWonPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'offensiveDuelsWonPerNinety', p => ({...p, offensiveDuelsWonPerNinety: Math.round(p.offensiveDuelsWonPerNinety * p.minutes / 90)}));
const allCsvRankPAdjInterceptions = calculateRankForMetric(baseFiltered, 'pAdjInterceptions');
const allCsvRankPAdjInterceptionsWithMinutes = calculateRankForMetric(baseFiltered, 'pAdjInterceptions');
const allCsvRankPAdjSlidingTackles = calculateRankForMetric(baseFiltered, 'pAdjSlidingTackles');
const allCsvRankPAdjSlidingTacklesWithMinutes = calculateRankForMetric(baseFiltered, 'pAdjSlidingTackles');
const allCsvRankPasses = calculateRankForMetric(baseFiltered, 'passes');
const allCsvRankPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'passesCompletedPerNinety');
const allCsvRankPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'passesCompletedPerNinety', p => ({...p, passesCompletedPerNinety: Math.round(p.passesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankPassesToFinalThird = calculateRankForMetric(baseFiltered, 'passesToFinalThird');
const allCsvRankPassesToFinalThirdWithMinutes = calculateRankForMetric(baseFiltered, 'passesToFinalThird', p => ({...p, passesToFinalThird: Math.round(p.passesToFinalThird * p.minutes / 90)}));
const allCsvRankPassesToPenaltyArea = calculateRankForMetric(baseFiltered, 'passesToPenaltyArea');
const allCsvRankPassesToPenaltyAreaWithMinutes = calculateRankForMetric(baseFiltered, 'passesToPenaltyArea', p => ({...p, passesToPenaltyArea: Math.round(p.passesToPenaltyArea * p.minutes / 90)}));
const allCsvRankPassesWithMinutes = calculateRankForMetric(baseFiltered, 'passes', p => ({...p, passes: Math.round(p.passes * p.minutes / 90)}));
const allCsvRankPossessionPlusMinus = calculateRankForMetric(baseFiltered, 'possessionPlusMinus');
const allCsvRankPossessionPlusMinusWithMinutes = calculateRankForMetric(baseFiltered, 'possessionPlusMinus');
const allCsvRankPossessionsWonMinusLostPerNinety = calculateRankForMetric(baseFiltered, 'possessionsWonMinusLostPerNinety');
const allCsvRankPossessionsWonMinusLostPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'possessionsWonMinusLostPerNinety', p => ({...p, possessionsWonMinusLostPerNinety: Math.round(p.possessionsWonMinusLostPerNinety * p.minutes / 90)}));
const allCsvRankPreAssistsPerNinety = calculateRankForMetric(baseFiltered, 'preAssistsPerNinety');
const allCsvRankPreAssistsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'preAssistsPerNinety', p => ({...p, preAssistsPerNinety: Math.round(p.preAssistsPerNinety * p.minutes / 90)}));
const allCsvRankPreventedGoals = calculateRankForMetric(baseFiltered, 'preventedGoals');
const allCsvRankPreventedGoalsWithMinutes = calculateRankForMetric(baseFiltered, 'preventedGoals', p => ({...p, preventedGoals: p.preventedGoals * p.minutes}));
const allCsvRankProgressiveActionRate = calculateRankForMetric(baseFiltered, 'progressiveActionRate');
const allCsvRankProgressiveActionRateWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveActionRate');
const allCsvRankProgressiveActionsPerNinety = calculateRankForMetric(baseFiltered, 'progressiveActionsPerNinety');
const allCsvRankProgressiveActionsPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveActionsPerNinety', p => ({...p, progressiveActionsPerNinety: Math.round(p.progressiveActionsPerNinety * p.minutes / 90)}));
const allCsvRankProgressivePasses = calculateRankForMetric(baseFiltered, 'progressivePasses');
const allCsvRankProgressivePassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'progressivePassesCompletedPerNinety');
const allCsvRankProgressivePassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePassesCompletedPerNinety', p => ({...p, progressivePassesCompletedPerNinety: Math.round(p.progressivePassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankProgressivePassesPAdj = calculateRankForMetric(baseFiltered, 'progressivePassesPAdj');
const allCsvRankProgressivePassesPAdjWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePassesPAdj');
const allCsvRankProgressivePassesWithMinutes = calculateRankForMetric(baseFiltered, 'progressivePasses', p => ({...p, progressivePasses: Math.round(p.progressivePasses * p.minutes / 90)}));
const allCsvRankProgressiveRuns = calculateRankForMetric(baseFiltered, 'progressiveRuns');
const allCsvRankProgressiveRunsWithMinutes = calculateRankForMetric(baseFiltered, 'progressiveRuns', p => ({...p, progressiveRuns: Math.round(p.progressiveRuns * p.minutes / 90)}));
const allCsvRankSaveRatePercentage = calculateRankForMetric(baseFiltered, 'saveRatePercentage');
const allCsvRankSaveRatePercentageWithMinutes = calculateRankForMetric(baseFiltered, 'saveRatePercentage');
const allCsvRankSavesPerNinety = calculateRankForMetric(baseFiltered, 'savesPerNinety');
const allCsvRankSavesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'savesPerNinety', p => ({...p, savesPerNinety: Math.round(p.savesPerNinety * p.minutes / 90)}));
const allCsvRankShortMediumPasses = calculateRankForMetric(baseFiltered, 'shortMediumPasses');
const allCsvRankShortMediumPassesWithMinutes = calculateRankForMetric(baseFiltered, 'shortMediumPasses', p => ({...p, shortMediumPasses: Math.round(p.shortMediumPasses * p.minutes / 90)}));
const allCsvRankShortPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'shortPassesCompletedPerNinety');
const allCsvRankShortPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'shortPassesCompletedPerNinety', p => ({...p, shortPassesCompletedPerNinety: Math.round(p.shortPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankShotAssists = calculateRankForMetric(baseFiltered, 'shotAssists');
const allCsvRankShotAssistsWithMinutes = calculateRankForMetric(baseFiltered, 'shotAssists', p => ({...p, shotAssists: Math.round(p.shotAssists * p.minutes / 90)}));
const allCsvRankShotFrequency = calculateRankForMetric(baseFiltered, 'shotFrequency');
const allCsvRankShotFrequencyWithMinutes = calculateRankForMetric(baseFiltered, 'shotFrequency');
const allCsvRankShots = calculateRankForMetric(baseFiltered, 'shots');
const allCsvRankShotsAgainst = calculateRankForMetric(baseFiltered, 'shotsAgainst');
const allCsvRankShotsAgainstWithMinutes = calculateRankForMetric(baseFiltered, 'shotsAgainst', p => ({...p, shotsAgainst: Math.round(p.shotsAgainst * p.minutes / 90)}));
const allCsvRankShotsBlocked = calculateRankForMetric(baseFiltered, 'shotsBlocked');
const allCsvRankShotsBlockedWithMinutes = calculateRankForMetric(baseFiltered, 'shotsBlocked', p => ({...p, shotsBlocked: Math.round(p.shotsBlocked * p.minutes / 90)}));
const allCsvRankShotsOnTargetPercentage = calculateRankForMetric(baseFiltered, 'shotsOnTargetPercentage');
const allCsvRankShotsOnTargetPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'shotsOnTargetPercentage');
const allCsvRankShotsOnTargetPerNinety = calculateRankForMetric(baseFiltered, 'shotsOnTargetPerNinety');
const allCsvRankShotsOnTargetPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'shotsOnTargetPerNinety', p => ({...p, shotsOnTargetPerNinety: Math.round(p.shotsOnTargetPerNinety * p.minutes / 90)}));
const allCsvRankShotsWithMinutes = calculateRankForMetric(baseFiltered, 'shots', p => ({...p, shots: Math.round(p.shots * p.minutes / 90)}));
const allCsvRankSlidingTackles = calculateRankForMetric(baseFiltered, 'slidingTackles');
const allCsvRankSlidingTacklesWithMinutes = calculateRankForMetric(baseFiltered, 'slidingTackles', p => ({...p, slidingTackles: Math.round(p.slidingTackles * p.minutes / 90)}));
const allCsvRankSuccessfulAttackingActions = calculateRankForMetric(baseFiltered, 'successfulAttackingActions');
const allCsvRankSuccessfulAttackingActionsWithMinutes = calculateRankForMetric(baseFiltered, 'successfulAttackingActions', p => ({...p, successfulAttackingActions: Math.round(p.successfulAttackingActions * p.minutes / 90)}));
const allCsvRankSuccessfulDribblesPercentage = calculateRankForMetric(baseFiltered, 'successfulDribblesPercentage');
const allCsvRankSuccessfulDribblesPercentageWithMinutes = calculateRankForMetric(baseFiltered, 'successfulDribblesPercentage');
const allCsvRankSuccessfulDribblesPerNinety = calculateRankForMetric(baseFiltered, 'successfulDribblesPerNinety');
const allCsvRankSuccessfulDribblesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'successfulDribblesPerNinety', p => ({...p, successfulDribblesPerNinety: Math.round(p.successfulDribblesPerNinety * p.minutes / 90)}));
const allCsvRankThroughPasses = calculateRankForMetric(baseFiltered, 'throughPasses');
const allCsvRankThroughPassesCompletedPerNinety = calculateRankForMetric(baseFiltered, 'throughPassesCompletedPerNinety');
const allCsvRankThroughPassesCompletedPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'throughPassesCompletedPerNinety', p => ({...p, throughPassesCompletedPerNinety: Math.round(p.throughPassesCompletedPerNinety * p.minutes / 90)}));
const allCsvRankThroughPassesWithMinutes = calculateRankForMetric(baseFiltered, 'throughPasses', p => ({...p, throughPasses: Math.round(p.throughPasses * p.minutes / 90)}));
const allCsvRankTouchesInBox = calculateRankForMetric(baseFiltered, 'touchesInBox');
const allCsvRankTouchesInBoxWithMinutes = calculateRankForMetric(baseFiltered, 'touchesInBox', p => ({...p, touchesInBox: Math.round(p.touchesInBox * p.minutes / 90)}));
const allCsvRankTouchesPerNinety = calculateRankForMetric(baseFiltered, 'touchesPerNinety');
const allCsvRankTouchesPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'touchesPerNinety', p => ({...p, touchesPerNinety: Math.round(p.touchesPerNinety * p.minutes / 90)}));
const allCsvRankXA = calculateRankForMetric(baseFiltered, 'xA');
const allCsvRankXAPer100Passes = calculateRankForMetric(baseFiltered, 'xAPer100Passes');
const allCsvRankXAPer100PassesWithMinutes = calculateRankForMetric(baseFiltered, 'xAPer100Passes');
const allCsvRankXAWithMinutes = calculateRankForMetric(baseFiltered, 'xA', p => ({...p, xA: p.xA * p.minutes}));
const allCsvRankXG = calculateRankForMetric(baseFiltered, 'xG');
const allCsvRankXGAgainst = calculateRankForMetric(baseFiltered, 'xGAgainst');
const allCsvRankXGAgainstWithMinutes = calculateRankForMetric(baseFiltered, 'xGAgainst', p => ({...p, xGAgainst: p.xGAgainst * p.minutes}));
const allCsvRankXGAndxAPerNinety = calculateRankForMetric(baseFiltered, 'xGAndxAPerNinety');
const allCsvRankXGAndxAPerNinetyWithMinutes = calculateRankForMetric(baseFiltered, 'xGAndxAPerNinety', p => ({...p, xGAndxAPerNinety: p.xGAndxAPerNinety * p.minutes / 90}));
const allCsvRankXGPer100Touches = calculateRankForMetric(baseFiltered, 'xGPer100Touches');
const allCsvRankXGPer100TouchesWithMinutes = calculateRankForMetric(baseFiltered, 'xGPer100Touches');
const allCsvRankXGWithMinutes = calculateRankForMetric(baseFiltered, 'xG', p => ({...p, xG: p.xG * p.minutes}));    const metricsData = [
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
        const filteredData8 = parsedData.filter(player =>
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
        const filteredData8 = parsedData.filter(player =>
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
