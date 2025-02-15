
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

const metricColumnMap = {
    'Successful defensive actions': 'defActions',
    'Defensive duels': 'defDuels',
    'Aerial duels': 'aerialDuels',
    'Tackles': 'slidingTackles',
    'Possession-adjusted tackles': 'pAdjSlidingTackles',
    'Blocked shots': 'shotsBlocked',
    'Interceptions': 'interceptions',
    'Possession-adjusted interceptions': 'pAdjInterceptions',
    'Successful attacking actions': 'successfulAttackingActions',
    'Goals': 'goals',
    'Non-penalty goals': 'nonPenaltyGoals',
    'Expected goals (xG)': 'xG',
    'Headed goals': 'headGoals',
    'Shots': 'shots',
    'Assists': 'assists',
    'Crosses': 'crosses',
    'Crosses to goalkeeper\'s box': 'crossesToGoalieBox',
    'Dribbles': 'dribbles',
    'Offensive duels': 'offensiveDuels',
    'Touches in opponent\'s box': 'touchesInBox',
    'Progressive runs': 'progressiveRuns',
    'Accelerations': 'accelerations',
    'Fouls suffered': 'foulsSuffered',
    'Passes': 'passes',
    'Forward passes': 'forwardPasses',
    'Short passes': 'shortMediumPasses',
    'Long passes': 'longPasses',
    'Average pass length': 'averagePassLength',
    'Expected assists (xA)': 'xA',
    'Shot assists': 'shotAssists',
    'Key passes': 'keyPasses',
    'Passes to final third': 'passesToFinalThird',
    'Passes to penalty area': 'passesToPenaltyArea',
    'Through passes': 'throughPasses',
    'Deep completions': 'deepCompletions',
    'Progressive passes': 'progressivePasses',
    'Shots against': 'shotsAgainst',
    'Clean sheets': 'cleanSheets',
    'Expected goals against': 'xGAgainst',
    'Prevented goals (PSxG-GA)': 'preventedGoals',
    'Line exits': 'exits',
    'Defensive duels won %': 'defensiveDuelsWonPercentage',
    'Aerial duels won %': 'aerialDuelsWonPercentage',
    'Shots on target %': 'shotsOnTargetPercentage',
    'Goal conversion': 'goalConversionPercentage',
    'Cross accuracy': 'accurateCrossesPercentage',
    'Dribble success rate': 'successfulDribblesPercentage',
    'Offensive duels won %': 'offensiveDuelsWonPercentage',
    'Accurate passes %': 'accuratePassesPercentage',
    'Accurate forward passes %': 'accurateForwardPassesPercentage',
    'Accurate short passes %': 'accurateShortMediumPassesPercentage',
    'Accurate long passes %': 'accurateLongPassesPercentage',
    'Accurate passes to final third %': 'accuratePassesToFinalThirdPercentage',
    'Accurate passes to penalty area %': 'accuratePassesToPenaltyAreaPercentage',
    'Through pass accuracy': 'accurateThroughPassesPercentage',
    'Accurate progressive passes %': 'accurateProgressivePassesPercentage',
    'Save percentage': 'saveRatePercentage'
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

    // List of columns to exclude from multiplication
    const excludedColumns = [
        'pAdjSlidingTackles', 'pAdjInterceptions',
        'averagePassLength', 'xG', 'xA', 'cleanSheets', 'xGAgainst', 'preventedGoals',
        'defensiveDuelsWonPercentage', 'aerialDuelsWonPercentage', 'shotsOnTargetPercentage',
        'goalConversionPercentage', 'accurateCrossesPercentage', 'successfulDribblesPercentage',
        'offensiveDuelsWonPercentage', 'accuratePassesPercentage', 'accurateForwardPassesPercentage',
        'accurateShortMediumPassesPercentage', 'accurateLongPassesPercentage',
        'accuratePassesToFinalThirdPercentage', 'accuratePassesToPenaltyAreaPercentage',
        'accurateThroughPassesPercentage', 'accurateProgressivePassesPercentage', 'saveRatePercentage'
    ];

    const decimalColumns = ['xG', 'xA', 'xGAgainst', 'preventedGoals'];


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
    console.log('Data loaded:', allData);
    document.getElementById('loadingContainer').style.display = 'none';
    
    // Only set body visibility if membership works isn't controlling it
    if (!window.MembershipWorks || window.MembershipWorks.isAuthenticated) {
        document.body.style.visibility = "visible";
    }




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

const columnsToCopy = [7, 9, 24, 25, 28, 35, 37, 45, 47, 53, 55, 66, 68, 70, 74, 80];
let filteredData = [];

allData.forEach(row => {
    const copiedValues = columnsToCopy.map(col => row[col]);
    row.push(...copiedValues); // Append copied values to the end of the row

    // Check if there are enough elements in the row
    if (row.length >= 3) {
        const team = row[1];
        const league = getTeamLeague(team);

        if (league !== "Unknown League") {
            row.splice(2, 0, league); // Insert league information at index 2
            filteredData.push(row); // Add row to filteredData only if the league is not "Unknown League"
        }
    }
});

allData = filteredData; // Update allData with the filtered rows





const columnsToDelete = [30, 8,10,25,26,29,36,38,46,48,54,56,67,69,71,75,81,16,17,18,30,31,32,42,43,49,50,51,52,58,61,62,63,64,73,76,77,78,82,84,86,88,89,90,91,92,93];

allData.forEach(row => {
    // Sort columnsToDelete in descending order to ensure correct deletion
    columnsToDelete.sort((a, b) => b - a);

    columnsToDelete.forEach(colIndex => {
        if (colIndex < row.length) {
            row.splice(colIndex, 1); // Delete column at colIndex
        }
    });
});



const outputLines = [];

allData.forEach(row => {
    // Join the row back into a single string and replace sequences of commas if needed
    let rowString = row.join(",");
    // Perform any specific replacements or formatting as required
    outputLines.push(rowString);
});

const csvData = outputLines.join("\n");


	
  
function parseCSV(csv) {
    const rows = csv.split('\n').slice(1);
    return rows.map(row => {
      const [
      player, team, league, position, age, minutes, defActions, defDuels,
      aerialDuels, slidingTackles, pAdjSlidingTackles, shotsBlocked,
      interceptions, pAdjInterceptions, successfulAttackingActions, goals,
      nonPenaltyGoals, xG, headGoals, shots, assists, crosses, crossesToGoalieBox,
      dribbles, offensiveDuels, touchesInBox, progressiveRuns, accelerations,
      foulsSuffered, passes, forwardPasses, shortMediumPasses, longPasses,
      averagePassLength, xA, shotAssists, keyPasses, passesToFinalThird,
      passesToPenaltyArea, throughPasses, deepCompletions, progressivePasses,
      shotsAgainst, cleanSheets, xGAgainst, preventedGoals, exits,
      defensiveDuelsWonPercentage, aerialDuelsWonPercentage, shotsOnTargetPercentage,
      goalConversionPercentage, accurateCrossesPercentage, successfulDribblesPercentage,
      offensiveDuelsWonPercentage, accuratePassesPercentage, accurateForwardPassesPercentage,
      accurateShortMediumPassesPercentage, accurateLongPassesPercentage,
      accuratePassesToFinalThirdPercentage, accuratePassesToPenaltyAreaPercentage,
      accurateThroughPassesPercentage, accurateProgressivePassesPercentage,
      saveRatePercentage
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
      aerialDuels: parseFloat(aerialDuels),
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
      assists: parseFloat(assists),
      crosses: parseFloat(crosses),
      crossesToGoalieBox: parseFloat(crossesToGoalieBox),
      dribbles: parseFloat(dribbles),
      offensiveDuels: parseFloat(offensiveDuels),
      touchesInBox: parseFloat(touchesInBox),
      progressiveRuns: parseFloat(progressiveRuns),
      accelerations: parseFloat(accelerations),
      foulsSuffered: parseFloat(foulsSuffered),
      passes: parseFloat(passes),
      forwardPasses: parseFloat(forwardPasses),
      shortMediumPasses: parseFloat(shortMediumPasses),
      longPasses: parseFloat(longPasses),
      averagePassLength: parseFloat(averagePassLength),
      xA: parseFloat(xA),
      shotAssists: parseFloat(shotAssists),
      keyPasses: parseFloat(keyPasses),
      passesToFinalThird: parseFloat(passesToFinalThird),
      passesToPenaltyArea: parseFloat(passesToPenaltyArea),
      throughPasses: parseFloat(throughPasses),
      deepCompletions: parseFloat(deepCompletions),
      progressivePasses: parseFloat(progressivePasses),
      shotsAgainst: parseFloat(shotsAgainst),
      cleanSheets: parseFloat(cleanSheets),
      xGAgainst: parseFloat(xGAgainst),
      preventedGoals: parseFloat(preventedGoals),
      exits: parseFloat(exits),
      defensiveDuelsWonPercentage: parseFloat(defensiveDuelsWonPercentage),
      aerialDuelsWonPercentage: parseFloat(aerialDuelsWonPercentage),
      shotsOnTargetPercentage: parseFloat(shotsOnTargetPercentage),
      goalConversionPercentage: parseFloat(goalConversionPercentage),
      accurateCrossesPercentage: parseFloat(accurateCrossesPercentage),
      successfulDribblesPercentage: parseFloat(successfulDribblesPercentage),
      offensiveDuelsWonPercentage: parseFloat(offensiveDuelsWonPercentage),
      accuratePassesPercentage: parseFloat(accuratePassesPercentage),
      accurateForwardPassesPercentage: parseFloat(accurateForwardPassesPercentage),
      accurateShortMediumPassesPercentage: parseFloat(accurateShortMediumPassesPercentage),
      accurateLongPassesPercentage: parseFloat(accurateLongPassesPercentage),
      accuratePassesToFinalThirdPercentage: parseFloat(accuratePassesToFinalThirdPercentage),
      accuratePassesToPenaltyAreaPercentage: parseFloat(accuratePassesToPenaltyAreaPercentage),
      accurateThroughPassesPercentage: parseFloat(accurateThroughPassesPercentage),
      accurateProgressivePassesPercentage: parseFloat(accurateProgressivePassesPercentage),
      saveRatePercentage: parseFloat(saveRatePercentage)
      };
    });
  }

  
  function calculateRankForMetric(data, metric, filterFn, transformFn) {
    const filteredData = filterFn ? data.filter(filterFn) : data;

    // Apply transformation function if provided
    const transformedData = transformFn ? filteredData.map(transformFn) : filteredData;

    // Use a Map to store unique players based on their name and team
    const uniquePlayers = new Map();

    for (const player of transformedData) {
        const key = `${player.player}-${player.team}`;
        if (!uniquePlayers.has(key)) {
            uniquePlayers.set(key, player);
        }
    }

    // Convert Map to array and sort by metric (Descending order)
    const sortedData = Array.from(uniquePlayers.values()).sort((a, b) => b[metric] - a[metric]);

    // Assign ranks efficiently in a single pass (O(n))
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
            rank = i + 1; // Rank is based on position in sorted list
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
    const parsedData = parseCSV(csvData);
    const selectedPlayer = parsedData.find(p => p.player === player.player && p.position === player.position  &&
    p.team === player.team);
    const ageSelect = document.getElementById('ageSelect');
    const selectedAge = parseInt(ageSelect.value);
    const filteredData = selectedAge ? parsedData.filter(p => p.age <= selectedAge) : parsedData;
    const toggleMetrics = document.getElementById('toggleMetrics').checked; // Check if toggle is toggled
    const getMetricValueFunction = toggleMetrics ? updateCurrentMetricValue : getCurrentMetricValue;

    const samePositionAndLeagueActions = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
    const samePositionAndLeagueDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);
    const samePositionAndLeagueActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
    const samePositionAndLeagueDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
    const positionRankActions = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position);
    const positionRankDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position);
    const positionRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.position === selectedPlayer.position, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
    const positionRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.position === selectedPlayer.position, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
    const leagueRankActions = calculateRankForMetric(filteredData, 'defActions', p => p.league === selectedPlayer.league);
    const leagueRankDuels = calculateRankForMetric(filteredData, 'defDuels', p => p.league === selectedPlayer.league);
    const leagueRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => p.league === selectedPlayer.league, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
    const leagueRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => p.league === selectedPlayer.league, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
    const allCsvRankActions = calculateRankForMetric(filteredData, 'defActions');
    const allCsvRankDuels = calculateRankForMetric(filteredData, 'defDuels');
    const allCsvRankActionsWithMinutes = calculateRankForMetric(filteredData, 'defActions', p => true, p => ({...p, defActions: Math.round(p.defActions * p.minutes / 90)}));
    const allCsvRankDuelsWithMinutes = calculateRankForMetric(filteredData, 'defDuels', p => true, p => ({...p, defDuels: Math.round(p.defDuels * p.minutes / 90)}));
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

// Metric: averagePassLength
const allCsvRankAveragePassLength = calculateRankForMetric(filteredData, 'averagePassLength');

const leagueRankAveragePassLength = calculateRankForMetric(filteredData, 'averagePassLength', p => p.league === selectedPlayer.league);

const allCsvRankAveragePassLengthWithMinutes = calculateRankForMetric(filteredData, 'averagePassLength');

const leagueRankAveragePassLengthWithMinutes = calculateRankForMetric(filteredData, 'averagePassLength', p => p.league === selectedPlayer.league);

const positionRankAveragePassLength = calculateRankForMetric(filteredData, 'averagePassLength', p => p.position === selectedPlayer.position);

const positionRankAveragePassLengthWithMinutes = calculateRankForMetric(filteredData, 'averagePassLength', p => p.position === selectedPlayer.position);

const samePositionAndLeagueAveragePassLength = calculateRankForMetric(filteredData, 'averagePassLength', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

const samePositionAndLeagueAveragePassLengthWithMinutes = calculateRankForMetric(filteredData, 'averagePassLength', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

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

// Metric: accurateThroughPassesPercentage
const allCsvRankAccurateThroughPassesPercentage = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage');

const leagueRankAccurateThroughPassesPercentage = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.league === selectedPlayer.league);

const allCsvRankAccurateThroughPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage');

const leagueRankAccurateThroughPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.league === selectedPlayer.league, p => ({...p}));

const positionRankAccurateThroughPassesPercentage = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.position === selectedPlayer.position);

const positionRankAccurateThroughPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.position === selectedPlayer.position, p => ({...p}));

const samePositionAndLeagueAccurateThroughPassesPercentage = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league);

const samePositionAndLeagueAccurateThroughPassesPercentageWithMinutes = calculateRankForMetric(filteredData, 'accurateThroughPassesPercentage', p => p.position === selectedPlayer.position && p.league === selectedPlayer.league, p => ({...p}));

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
    { name: 'Successful defensive actions', data: samePositionAndLeagueActions },
        { name: 'Defensive duels', data: samePositionAndLeagueDuels },
        { name: 'Aerial duels', data: samePositionAndLeagueAerialDuels },
        { name: 'Tackles', data: samePositionAndLeagueSlidingTackles },
        { name: 'Possession-adjusted tackles', data: samePositionAndLeaguePAdjSlidingTackles },
        { name: 'Blocked shots', data: samePositionAndLeagueShotsBlocked },
        { name: 'Interceptions', data: samePositionAndLeagueInterceptions },
        { name: 'Possession-adjusted interceptions', data: samePositionAndLeaguePAdjInterceptions },
        { name: 'Successful attacking actions', data: samePositionAndLeagueSuccessfulAttackingActions },
        { name: 'Goals', data: samePositionAndLeagueGoals },
        { name: 'Non-penalty goals', data: samePositionAndLeagueNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: samePositionAndLeagueXG },
        { name: 'Headed goals', data: samePositionAndLeagueHeadGoals },
        { name: 'Shots', data: samePositionAndLeagueShots },
        { name: 'Assists', data: samePositionAndLeagueAssists },
        { name: 'Crosses', data: samePositionAndLeagueCrosses },
        { name: 'Crosses to goalkeeper\'s box', data: samePositionAndLeagueCrossesToGoalieBox },
        { name: 'Dribbles', data: samePositionAndLeagueDribbles },
        { name: 'Offensive duels', data: samePositionAndLeagueOffensiveDuels },
        { name: 'Touches in opponent\'s box', data: samePositionAndLeagueTouchesInBox },
        { name: 'Progressive runs', data: samePositionAndLeagueProgressiveRuns },
        { name: 'Accelerations', data: samePositionAndLeagueAccelerations },
        { name: 'Fouls suffered', data: samePositionAndLeagueFoulsSuffered },
        { name: 'Passes', data: samePositionAndLeaguePasses },
        { name: 'Forward passes', data: samePositionAndLeagueForwardPasses },
        { name: 'Short passes', data: samePositionAndLeagueShortMediumPasses },
        { name: 'Long passes', data: samePositionAndLeagueLongPasses },
        { name: 'Average pass length', data: samePositionAndLeagueAveragePassLength },
        { name: 'Expected assists (xA)', data: samePositionAndLeagueXA },
        { name: 'Shot assists', data: samePositionAndLeagueShotAssists },
        { name: 'Key passes', data: samePositionAndLeagueKeyPasses },
        { name: 'Passes to final third', data: samePositionAndLeaguePassesToFinalThird },
        { name: 'Passes to penalty area', data: samePositionAndLeaguePassesToPenaltyArea },
        { name: 'Through passes', data: samePositionAndLeagueThroughPasses },
        { name: 'Deep completions', data: samePositionAndLeagueDeepCompletions },
        { name: 'Progressive passes', data: samePositionAndLeagueProgressivePasses },
        { name: 'Shots against', data: samePositionAndLeagueShotsAgainst },
        { name: 'Clean sheets', data: samePositionAndLeagueCleanSheets },
        { name: 'Expected goals against', data: samePositionAndLeagueXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: samePositionAndLeaguePreventedGoals },
        { name: 'Line exits', data: samePositionAndLeagueExits },
        { name: 'Defensive duels won %', data: samePositionAndLeagueDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: samePositionAndLeagueAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: samePositionAndLeagueShotsOnTargetPercentage },
        { name: 'Goal conversion', data: samePositionAndLeagueGoalConversionPercentage },
        { name: 'Cross accuracy', data: samePositionAndLeagueAccurateCrossesPercentage },
        { name: 'Dribble success rate', data: samePositionAndLeagueSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: samePositionAndLeagueOffensiveDuelsWonPercentage },
        { name: 'Accurate passes %', data: samePositionAndLeagueAccuratePassesPercentage },
        { name: 'Accurate forward passes %', data: samePositionAndLeagueAccurateForwardPassesPercentage },
        { name: 'Accurate short passes %', data: samePositionAndLeagueAccurateShortMediumPassesPercentage },
        { name: 'Accurate long passes %', data: samePositionAndLeagueAccurateLongPassesPercentage },
        { name: 'Accurate passes to final third %', data: samePositionAndLeagueAccuratePassesToFinalThirdPercentage },
        { name: 'Accurate passes to penalty area %', data: samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage },
        { name: 'Through pass accuracy', data: samePositionAndLeagueAccurateThroughPassesPercentage },
        { name: 'Accurate progressive passes %', data: samePositionAndLeagueAccurateProgressivePassesPercentage },
        { name: 'Save percentage', data: samePositionAndLeagueSaveRatePercentage }
                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};

// Get the metrics to include based on player's position
const metricsToInclude = {
    'Defensive actions': samePositionAndLeagueActions,
    'Defensive duels': samePositionAndLeagueDuels,
    'Aerial duels': samePositionAndLeagueAerialDuels,
    'Tackles': samePositionAndLeagueSlidingTackles,
    'PAdj tackles': samePositionAndLeaguePAdjSlidingTackles,
    'Blocked shots': samePositionAndLeagueShotsBlocked,
    'Interceptions': samePositionAndLeagueInterceptions,
    'PAdj interceptions': samePositionAndLeaguePAdjInterceptions,
    'Attacking actions': samePositionAndLeagueSuccessfulAttackingActions,
    'Goals': samePositionAndLeagueGoals,
    'Non-penalty goals': samePositionAndLeagueNonPenaltyGoals,
    'Expected goals': samePositionAndLeagueXG,
    'Headed goals': samePositionAndLeagueHeadGoals,
    'Shots': samePositionAndLeagueShots,
    'Assists': samePositionAndLeagueAssists,
    'Crosses': samePositionAndLeagueCrosses,
    'Crosses to box': samePositionAndLeagueCrossesToGoalieBox,
    'Dribbles': samePositionAndLeagueDribbles,
    'Offensive duels': samePositionAndLeagueOffensiveDuels,
    'Touches in box': samePositionAndLeagueTouchesInBox,
    'Progressive runs': samePositionAndLeagueProgressiveRuns,
    'Accelerations': samePositionAndLeagueAccelerations,
    'Fouls suffered': samePositionAndLeagueFoulsSuffered,
    'Passes': samePositionAndLeaguePasses,
    'Forward passes': samePositionAndLeagueForwardPasses,
    'Short passes': samePositionAndLeagueShortMediumPasses,
    'Long passes': samePositionAndLeagueLongPasses,
    'Avg pass length': samePositionAndLeagueAveragePassLength,
    'Expected assists': samePositionAndLeagueXA,
    'Shot assists': samePositionAndLeagueShotAssists,
    'Key passes': samePositionAndLeagueKeyPasses,
    'Passes to final 3rd': samePositionAndLeaguePassesToFinalThird,
    'Passes to box': samePositionAndLeaguePassesToPenaltyArea,
    'Through passes': samePositionAndLeagueThroughPasses,
    'Deep completions': samePositionAndLeagueDeepCompletions,
    'Progressive passes': samePositionAndLeagueProgressivePasses,
    'Shots against': samePositionAndLeagueShotsAgainst,
    'Clean sheets': samePositionAndLeagueCleanSheets,
    'xG against': samePositionAndLeagueXGAgainst,
    'Prevented goals': samePositionAndLeaguePreventedGoals,
    'Line exits': samePositionAndLeagueExits,
    'Defensive duel %': samePositionAndLeagueDefensiveDuelsWonPercentage,
    'Aerial duel %': samePositionAndLeagueAerialDuelsWonPercentage,
    'Shots on target %': samePositionAndLeagueShotsOnTargetPercentage,
    'Goal conversion': samePositionAndLeagueGoalConversionPercentage,
    'Cross accuracy': samePositionAndLeagueAccurateCrossesPercentage,
    'Successful dribble %': samePositionAndLeagueSuccessfulDribblesPercentage,
    'Offensive duel %': samePositionAndLeagueOffensiveDuelsWonPercentage,
    'Pass %': samePositionAndLeagueAccuratePassesPercentage,
    'Forward pass %': samePositionAndLeagueAccurateForwardPassesPercentage,
    'Short pass %': samePositionAndLeagueAccurateShortMediumPassesPercentage,
    'Long pass %': samePositionAndLeagueAccurateLongPassesPercentage,
    'Pass to final 3rd %': samePositionAndLeagueAccuratePassesToFinalThirdPercentage,
    'Pass to box %': samePositionAndLeagueAccuratePassesToPenaltyAreaPercentage,
    'Through pass %': samePositionAndLeagueAccurateThroughPassesPercentage,
    'Progressive pass %': samePositionAndLeagueAccurateProgressivePassesPercentage,
    'Save %': samePositionAndLeagueSaveRatePercentage
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
    { name: 'Successful defensive actions', data: samePositionAndLeagueActionsWithMinutes },
        { name: 'Defensive duels', data: samePositionAndLeagueDuelsWithMinutes },
        { name: 'Aerial duels', data: samePositionAndLeagueAerialDuelsWithMinutes },
        { name: 'Tackles', data: samePositionAndLeagueSlidingTacklesWithMinutes },
        { name: 'Possession-adjusted tackles', data: samePositionAndLeaguePAdjSlidingTacklesWithMinutes },
        { name: 'Blocked shots', data: samePositionAndLeagueShotsBlockedWithMinutes },
        { name: 'Interceptions', data: samePositionAndLeagueInterceptionsWithMinutes },
        { name: 'Possession-adjusted interceptions', data: samePositionAndLeaguePAdjInterceptionsWithMinutes },
        { name: 'Successful attacking actions', data: samePositionAndLeagueSuccessfulAttackingActionsWithMinutes },
        { name: 'Goals', data: samePositionAndLeagueGoalsWithMinutes },
        { name: 'Non-penalty goals', data: samePositionAndLeagueNonPenaltyGoalsWithMinutes },
        { name: 'Expected goals (xG)', data: samePositionAndLeagueXGWithMinutes },
        { name: 'Headed goals', data: samePositionAndLeagueHeadGoalsWithMinutes },
        { name: 'Shots', data: samePositionAndLeagueShotsWithMinutes },
        { name: 'Assists', data: samePositionAndLeagueAssistsWithMinutes },
        { name: 'Crosses', data: samePositionAndLeagueCrossesWithMinutes },
        { name: 'Crosses to goalkeeper\'s box', data: samePositionAndLeagueCrossesToGoalieBoxWithMinutes },
        { name: 'Dribbles', data: samePositionAndLeagueDribblesWithMinutes },
        { name: 'Offensive duels', data: samePositionAndLeagueOffensiveDuelsWithMinutes },
        { name: 'Touches in opponent\'s box', data: samePositionAndLeagueTouchesInBoxWithMinutes },
        { name: 'Progressive runs', data: samePositionAndLeagueProgressiveRunsWithMinutes },
        { name: 'Accelerations', data: samePositionAndLeagueAccelerationsWithMinutes },
        { name: 'Fouls suffered', data: samePositionAndLeagueFoulsSufferedWithMinutes },
        { name: 'Passes', data: samePositionAndLeaguePassesWithMinutes },
        { name: 'Forward passes', data: samePositionAndLeagueForwardPassesWithMinutes },
        { name: 'Short passes', data: samePositionAndLeagueShortMediumPassesWithMinutes },
        { name: 'Long passes', data: samePositionAndLeagueLongPassesWithMinutes },
        { name: 'Average pass length', data: samePositionAndLeagueAveragePassLengthWithMinutes },
        { name: 'Expected assists (xA)', data: samePositionAndLeagueXAWithMinutes },
        { name: 'Shot assists', data: samePositionAndLeagueShotAssistsWithMinutes },
        { name: 'Key passes', data: samePositionAndLeagueKeyPassesWithMinutes },
        { name: 'Passes to final third', data: samePositionAndLeaguePassesToFinalThirdWithMinutes },
        { name: 'Passes to penalty area', data: samePositionAndLeaguePassesToPenaltyAreaWithMinutes },
        { name: 'Through passes', data: samePositionAndLeagueThroughPassesWithMinutes },
        { name: 'Deep completions', data: samePositionAndLeagueDeepCompletionsWithMinutes },
        { name: 'Progressive passes', data: samePositionAndLeagueProgressivePassesWithMinutes },
        { name: 'Shots against', data: samePositionAndLeagueShotsAgainstWithMinutes },
        { name: 'Clean sheets', data: samePositionAndLeagueCleanSheetsWithMinutes },
        { name: 'Expected goals against', data: samePositionAndLeagueXGAgainstWithMinutes },
        { name: 'Prevented goals (PSxG-GA)', data: samePositionAndLeaguePreventedGoalsWithMinutes },
        { name: 'Line exits', data: samePositionAndLeagueExitsWithMinutes },
        { name: 'Defensive duels won %', data: samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes },
        { name: 'Aerial duels won %', data: samePositionAndLeagueAerialDuelsWonPercentageWithMinutes },
        { name: 'Shots on target %', data: samePositionAndLeagueShotsOnTargetPercentageWithMinutes },
        { name: 'Goal conversion', data: samePositionAndLeagueGoalConversionPercentageWithMinutes },
        { name: 'Cross accuracy', data: samePositionAndLeagueAccurateCrossesPercentageWithMinutes },
        { name: 'Dribble success rate', data: samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes },
        { name: 'Offensive duels won %', data: samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes },
        { name: 'Accurate passes %', data: samePositionAndLeagueAccuratePassesPercentageWithMinutes },
        { name: 'Accurate forward passes %', data: samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes },
        { name: 'Accurate short passes %', data: samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes },
        { name: 'Accurate long passes %', data: samePositionAndLeagueAccurateLongPassesPercentageWithMinutes },
        { name: 'Accurate passes to final third %', data: samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes },
        { name: 'Accurate passes to penalty area %', data: samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes },
        { name: 'Through pass accuracy', data: samePositionAndLeagueAccurateThroughPassesPercentageWithMinutes },
        { name: 'Accurate progressive passes %', data: samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes },
        { name: 'Save percentage', data: samePositionAndLeagueSaveRatePercentageWithMinutes }
                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': samePositionAndLeagueActionsWithMinutes,
    'Defensive duels': samePositionAndLeagueDuelsWithMinutes,
    'Aerial duels': samePositionAndLeagueAerialDuelsWithMinutes,
    'Tackles': samePositionAndLeagueSlidingTacklesWithMinutes,
    'PAdj tackles': samePositionAndLeaguePAdjSlidingTacklesWithMinutes,
    'Blocked shots': samePositionAndLeagueShotsBlockedWithMinutes,
    'Interceptions': samePositionAndLeagueInterceptionsWithMinutes,
    'PAdj interceptions': samePositionAndLeaguePAdjInterceptionsWithMinutes,
    'Attacking actions': samePositionAndLeagueSuccessfulAttackingActionsWithMinutes,
    'Goals': samePositionAndLeagueGoalsWithMinutes,
    'Non-penalty goals': samePositionAndLeagueNonPenaltyGoalsWithMinutes,
    'Expected goals': samePositionAndLeagueXGWithMinutes,
    'Headed goals': samePositionAndLeagueHeadGoalsWithMinutes,
    'Shots': samePositionAndLeagueShotsWithMinutes,
    'Assists': samePositionAndLeagueAssistsWithMinutes,
    'Crosses': samePositionAndLeagueCrossesWithMinutes,
    'Crosses to box': samePositionAndLeagueCrossesToGoalieBoxWithMinutes,
    'Dribbles': samePositionAndLeagueDribblesWithMinutes,
    'Offensive duels': samePositionAndLeagueOffensiveDuelsWithMinutes,
    'Touches in box': samePositionAndLeagueTouchesInBoxWithMinutes,
    'Progressive runs': samePositionAndLeagueProgressiveRunsWithMinutes,
    'Accelerations': samePositionAndLeagueAccelerationsWithMinutes,
    'Fouls suffered': samePositionAndLeagueFoulsSufferedWithMinutes,
    'Passes': samePositionAndLeaguePassesWithMinutes,
    'Forward passes': samePositionAndLeagueForwardPassesWithMinutes,
    'Short passes': samePositionAndLeagueShortMediumPassesWithMinutes,
    'Long passes': samePositionAndLeagueLongPassesWithMinutes,
    'Avg pass length': samePositionAndLeagueAveragePassLengthWithMinutes,
    'Expected assists': samePositionAndLeagueXAWithMinutes,
    'Shot assists': samePositionAndLeagueShotAssistsWithMinutes,
    'Key passes': samePositionAndLeagueKeyPassesWithMinutes,
    'Passes to final 3rd': samePositionAndLeaguePassesToFinalThirdWithMinutes,
    'Passes to box': samePositionAndLeaguePassesToPenaltyAreaWithMinutes,
    'Through passes': samePositionAndLeagueThroughPassesWithMinutes,
    'Deep completions': samePositionAndLeagueDeepCompletionsWithMinutes,
    'Progressive passes': samePositionAndLeagueProgressivePassesWithMinutes,
    'Shots against': samePositionAndLeagueShotsAgainstWithMinutes,
    'Clean sheets': samePositionAndLeagueCleanSheetsWithMinutes,
    'xG against': samePositionAndLeagueXGAgainstWithMinutes,
    'Prevented goals': samePositionAndLeaguePreventedGoalsWithMinutes,
    'Line exits': samePositionAndLeagueExitsWithMinutes,
    'Defensive duel %': samePositionAndLeagueDefensiveDuelsWonPercentageWithMinutes,
    'Aerial duel %': samePositionAndLeagueAerialDuelsWonPercentageWithMinutes,
    'Shots on target %': samePositionAndLeagueShotsOnTargetPercentageWithMinutes,
    'Goal conversion': samePositionAndLeagueGoalConversionPercentageWithMinutes,
    'Cross accuracy': samePositionAndLeagueAccurateCrossesPercentageWithMinutes,
    'Successful dribble %': samePositionAndLeagueSuccessfulDribblesPercentageWithMinutes,
    'Offensive duel %': samePositionAndLeagueOffensiveDuelsWonPercentageWithMinutes,
    'Pass %': samePositionAndLeagueAccuratePassesPercentageWithMinutes,
    'Forward pass %': samePositionAndLeagueAccurateForwardPassesPercentageWithMinutes,
    'Short pass %': samePositionAndLeagueAccurateShortMediumPassesPercentageWithMinutes,
    'Long pass %': samePositionAndLeagueAccurateLongPassesPercentageWithMinutes,
    'Pass to final 3rd %': samePositionAndLeagueAccuratePassesToFinalThirdPercentageWithMinutes,
    'Pass to box %': samePositionAndLeagueAccuratePassesToPenaltyAreaPercentageWithMinutes,
    'Through pass %': samePositionAndLeagueAccurateThroughPassesPercentageWithMinutes,
    'Progressive pass %': samePositionAndLeagueAccurateProgressivePassesPercentageWithMinutes,
    'Save %': samePositionAndLeagueSaveRatePercentageWithMinutes
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
    // Define the metrics and their corresponding data
    const metricsData = [
    { name: 'Successful defensive actions', data: positionRankActions },
        { name: 'Defensive duels', data: positionRankDuels },
        { name: 'Aerial duels', data: positionRankAerialDuels },
        { name: 'Tackles', data: positionRankSlidingTackles },
        { name: 'Possession-adjusted tackles', data: positionRankPAdjSlidingTackles },
        { name: 'Blocked shots', data: positionRankShotsBlocked },
        { name: 'Interceptions', data: positionRankInterceptions },
        { name: 'Possession-adjusted interceptions', data: positionRankPAdjInterceptions },
        { name: 'Successful attacking actions', data: positionRankSuccessfulAttackingActions },
        { name: 'Goals', data: positionRankGoals },
        { name: 'Non-penalty goals', data: positionRankNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: positionRankXG },
        { name: 'Headed goals', data: positionRankHeadGoals },
        { name: 'Shots', data: positionRankShots },
        { name: 'Assists', data: positionRankAssists },
        { name: 'Crosses', data: positionRankCrosses },
        { name: 'Crosses to goalkeeper\'s box', data: positionRankCrossesToGoalieBox },
        { name: 'Dribbles', data: positionRankDribbles },
        { name: 'Offensive duels', data: positionRankOffensiveDuels },
        { name: 'Touches in opponent\'s box', data: positionRankTouchesInBox },
        { name: 'Progressive runs', data: positionRankProgressiveRuns },
        { name: 'Accelerations', data: positionRankAccelerations },
        { name: 'Fouls suffered', data: positionRankFoulsSuffered },
        { name: 'Passes', data: positionRankPasses },
        { name: 'Forward passes', data: positionRankForwardPasses },
        { name: 'Short passes', data: positionRankShortMediumPasses },
        { name: 'Long passes', data: positionRankLongPasses },
        { name: 'Average pass length', data: positionRankAveragePassLength },
        { name: 'Expected assists (xA)', data: positionRankXA },
        { name: 'Shot assists', data: positionRankShotAssists },
        { name: 'Key passes', data: positionRankKeyPasses },
        { name: 'Passes to final third', data: positionRankPassesToFinalThird },
        { name: 'Passes to penalty area', data: positionRankPassesToPenaltyArea },
        { name: 'Through passes', data: positionRankThroughPasses },
        { name: 'Deep completions', data: positionRankDeepCompletions },
        { name: 'Progressive passes', data: positionRankProgressivePasses },
        { name: 'Shots against', data: positionRankShotsAgainst },
        { name: 'Clean sheets', data: positionRankCleanSheets },
        { name: 'Expected goals against', data: positionRankXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: positionRankPreventedGoals },
        { name: 'Line exits', data: positionRankExits },
        { name: 'Defensive duels won %', data: positionRankDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: positionRankAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: positionRankShotsOnTargetPercentage },
        { name: 'Goal conversion', data: positionRankGoalConversionPercentage },
        { name: 'Cross accuracy', data: positionRankAccurateCrossesPercentage },
        { name: 'Dribble success rate', data: positionRankSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: positionRankOffensiveDuelsWonPercentage },
        { name: 'Accurate passes %', data: positionRankAccuratePassesPercentage },
        { name: 'Accurate forward passes %', data: positionRankAccurateForwardPassesPercentage },
        { name: 'Accurate short passes %', data: positionRankAccurateShortMediumPassesPercentage },
        { name: 'Accurate long passes %', data: positionRankAccurateLongPassesPercentage },
        { name: 'Accurate passes to final third %', data: positionRankAccuratePassesToFinalThirdPercentage },
        { name: 'Accurate passes to penalty area %', data: positionRankAccuratePassesToPenaltyAreaPercentage },
        { name: 'Through pass accuracy', data: positionRankAccurateThroughPassesPercentage },
        { name: 'Accurate progressive passes %', data: positionRankAccurateProgressivePassesPercentage },
        { name: 'Save percentage', data: positionRankSaveRatePercentage }
                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': positionRankActions,
    'Defensive duels': positionRankDuels,
    'Aerial duels': positionRankAerialDuels,
    'Tackles': positionRankSlidingTackles,
    'PAdj tackles': positionRankPAdjSlidingTackles,
    'Blocked shots': positionRankShotsBlocked,
    'Interceptions': positionRankInterceptions,
    'PAdj interceptions': positionRankPAdjInterceptions,
    'Attacking actions': positionRankSuccessfulAttackingActions,
    'Goals': positionRankGoals,
    'Non-penalty goals': positionRankNonPenaltyGoals,
    'Expected goals': positionRankXG,
    'Headed goals': positionRankHeadGoals,
    'Shots': positionRankShots,
    'Assists': positionRankAssists,
    'Crosses': positionRankCrosses,
    'Crosses to box': positionRankCrossesToGoalieBox,
    'Dribbles': positionRankDribbles,
    'Offensive duels': positionRankOffensiveDuels,
    'Touches in box': positionRankTouchesInBox,
    'Progressive runs': positionRankProgressiveRuns,
    'Accelerations': positionRankAccelerations,
    'Fouls suffered': positionRankFoulsSuffered,
    'Passes': positionRankPasses,
    'Forward passes': positionRankForwardPasses,
    'Short passes': positionRankShortMediumPasses,
    'Long passes': positionRankLongPasses,
    'Avg pass length': positionRankAveragePassLength,
    'Expected assists': positionRankXA,
    'Shot assists': positionRankShotAssists,
    'Key passes': positionRankKeyPasses,
    'Passes to final 3rd': positionRankPassesToFinalThird,
    'Passes to box': positionRankPassesToPenaltyArea,
    'Through passes': positionRankThroughPasses,
    'Deep completions': positionRankDeepCompletions,
    'Progressive passes': positionRankProgressivePasses,
    'Shots against': positionRankShotsAgainst,
    'Clean sheets': positionRankCleanSheets,
    'xG against': positionRankXGAgainst,
    'Prevented goals': positionRankPreventedGoals,
    'Line exits': positionRankExits,
    'Defensive duel %': positionRankDefensiveDuelsWonPercentage,
    'Aerial duel %': positionRankAerialDuelsWonPercentage,
    'Shots on target %': positionRankShotsOnTargetPercentage,
    'Goal conversion': positionRankGoalConversionPercentage,
    'Cross accuracy': positionRankAccurateCrossesPercentage,
    'Successful dribble %': positionRankSuccessfulDribblesPercentage,
    'Offensive duel %': positionRankOffensiveDuelsWonPercentage,
    'Pass %': positionRankAccuratePassesPercentage,
    'Forward pass %': positionRankAccurateForwardPassesPercentage,
    'Short pass %': positionRankAccurateShortMediumPassesPercentage,
    'Long pass %': positionRankAccurateLongPassesPercentage,
    'Pass to final 3rd %': positionRankAccuratePassesToFinalThirdPercentage,
    'Pass to box %': positionRankAccuratePassesToPenaltyAreaPercentage,
    'Through pass %': positionRankAccurateThroughPassesPercentage,
    'Progressive pass %': positionRankAccurateProgressivePassesPercentage,
    'Save %': positionRankSaveRatePercentage
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
    { name: 'Successful defensive actions', data: positionRankActionsWithMinutes },
        { name: 'Defensive duels', data: positionRankDuelsWithMinutes },
        { name: 'Aerial duels', data: positionRankAerialDuelsWithMinutes },
        { name: 'Tackles', data: positionRankSlidingTacklesWithMinutes },
        { name: 'Possession-adjusted tackles', data: positionRankPAdjSlidingTacklesWithMinutes },
        { name: 'Blocked shots', data: positionRankShotsBlockedWithMinutes },
        { name: 'Interceptions', data: positionRankInterceptionsWithMinutes },
        { name: 'Possession-adjusted interceptions', data: positionRankPAdjInterceptionsWithMinutes },
        { name: 'Successful attacking actions', data: positionRankSuccessfulAttackingActionsWithMinutes },
        { name: 'Goals', data: positionRankGoalsWithMinutes },
        { name: 'Non-penalty goals', data: positionRankNonPenaltyGoalsWithMinutes },
        { name: 'Expected goals (xG)', data: positionRankXGWithMinutes },
        { name: 'Headed goals', data: positionRankHeadGoalsWithMinutes },
        { name: 'Shots', data: positionRankShotsWithMinutes },
        { name: 'Assists', data: positionRankAssistsWithMinutes },
        { name: 'Crosses', data: positionRankCrossesWithMinutes },
        { name: 'Crosses to goalkeeper\'s box', data: positionRankCrossesToGoalieBoxWithMinutes },
        { name: 'Dribbles', data: positionRankDribblesWithMinutes },
        { name: 'Offensive duels', data: positionRankOffensiveDuelsWithMinutes },
        { name: 'Touches in opponent\'s box', data: positionRankTouchesInBoxWithMinutes },
        { name: 'Progressive runs', data: positionRankProgressiveRunsWithMinutes },
        { name: 'Accelerations', data: positionRankAccelerationsWithMinutes },
        { name: 'Fouls suffered', data: positionRankFoulsSufferedWithMinutes },
        { name: 'Passes', data: positionRankPassesWithMinutes },
        { name: 'Forward passes', data: positionRankForwardPassesWithMinutes },
        { name: 'Short passes', data: positionRankShortMediumPassesWithMinutes },
        { name: 'Long passes', data: positionRankLongPassesWithMinutes },
        { name: 'Average pass length', data: positionRankAveragePassLengthWithMinutes },
        { name: 'Expected assists (xA)', data: positionRankXAWithMinutes },
        { name: 'Shot assists', data: positionRankShotAssistsWithMinutes },
        { name: 'Key passes', data: positionRankKeyPassesWithMinutes },
        { name: 'Passes to final third', data: positionRankPassesToFinalThirdWithMinutes },
        { name: 'Passes to penalty area', data: positionRankPassesToPenaltyAreaWithMinutes },
        { name: 'Through passes', data: positionRankThroughPassesWithMinutes },
        { name: 'Deep completions', data: positionRankDeepCompletionsWithMinutes },
        { name: 'Progressive passes', data: positionRankProgressivePassesWithMinutes },
        { name: 'Shots against', data: positionRankShotsAgainstWithMinutes },
        { name: 'Clean sheets', data: positionRankCleanSheetsWithMinutes },
        { name: 'Expected goals against', data: positionRankXGAgainstWithMinutes },
        { name: 'Prevented goals (PSxG-GA)', data: positionRankPreventedGoalsWithMinutes },
        { name: 'Line exits', data: positionRankExitsWithMinutes },
        { name: 'Defensive duels won %', data: positionRankDefensiveDuelsWonPercentageWithMinutes },
        { name: 'Aerial duels won %', data: positionRankAerialDuelsWonPercentageWithMinutes },
        { name: 'Shots on target %', data: positionRankShotsOnTargetPercentageWithMinutes },
        { name: 'Goal conversion', data: positionRankGoalConversionPercentageWithMinutes },
        { name: 'Cross accuracy', data: positionRankAccurateCrossesPercentageWithMinutes },
        { name: 'Dribble success rate', data: positionRankSuccessfulDribblesPercentageWithMinutes },
        { name: 'Offensive duels won %', data: positionRankOffensiveDuelsWonPercentageWithMinutes },
        { name: 'Accurate passes %', data: positionRankAccuratePassesPercentageWithMinutes },
        { name: 'Accurate forward passes %', data: positionRankAccurateForwardPassesPercentageWithMinutes },
        { name: 'Accurate short passes %', data: positionRankAccurateShortMediumPassesPercentageWithMinutes },
        { name: 'Accurate long passes %', data: positionRankAccurateLongPassesPercentageWithMinutes },
        { name: 'Accurate passes to final third %', data: positionRankAccuratePassesToFinalThirdPercentageWithMinutes },
        { name: 'Accurate passes to penalty area %', data: positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
        { name: 'Through pass accuracy', data: positionRankAccurateThroughPassesPercentageWithMinutes },
        { name: 'Accurate progressive passes %', data: positionRankAccurateProgressivePassesPercentageWithMinutes },
        { name: 'Save percentage', data: positionRankSaveRatePercentageWithMinutes }

                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
   
    
// Define the exclusion mapping

const exclusionMapping = {
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': positionRankActionsWithMinutes,
    'Defensive duels': positionRankDuelsWithMinutes,
    'Aerial duels': positionRankAerialDuelsWithMinutes,
    'Tackles': positionRankSlidingTacklesWithMinutes,
    'PAdj tackles': positionRankPAdjSlidingTacklesWithMinutes,
    'Blocked shots': positionRankShotsBlockedWithMinutes,
    'Interceptions': positionRankInterceptionsWithMinutes,
    'PAdj interceptions': positionRankPAdjInterceptionsWithMinutes,
    'Attacking actions': positionRankSuccessfulAttackingActionsWithMinutes,
    'Goals': positionRankGoalsWithMinutes,
    'Non-penalty goals': positionRankNonPenaltyGoalsWithMinutes,
    'Expected goals': positionRankXGWithMinutes,
    'Headed goals': positionRankHeadGoalsWithMinutes,
    'Shots': positionRankShotsWithMinutes,
    'Assists': positionRankAssistsWithMinutes,
    'Crosses': positionRankCrossesWithMinutes,
    'Crosses to box': positionRankCrossesToGoalieBoxWithMinutes,
    'Dribbles': positionRankDribblesWithMinutes,
    'Offensive duels': positionRankOffensiveDuelsWithMinutes,
    'Touches in box': positionRankTouchesInBoxWithMinutes,
    'Progressive runs': positionRankProgressiveRunsWithMinutes,
    'Accelerations': positionRankAccelerationsWithMinutes,
    'Fouls suffered': positionRankFoulsSufferedWithMinutes,
    'Passes': positionRankPassesWithMinutes,
    'Forward passes': positionRankForwardPassesWithMinutes,
    'Short passes': positionRankShortMediumPassesWithMinutes,
    'Long passes': positionRankLongPassesWithMinutes,
    'Avg pass length': positionRankAveragePassLengthWithMinutes,
    'Expected assists': positionRankXAWithMinutes,
    'Shot assists': positionRankShotAssistsWithMinutes,
    'Key passes': positionRankKeyPassesWithMinutes,
    'Passes to final 3rd': positionRankPassesToFinalThirdWithMinutes,
    'Passes to box': positionRankPassesToPenaltyAreaWithMinutes,
    'Through passes': positionRankThroughPassesWithMinutes,
    'Deep completions': positionRankDeepCompletionsWithMinutes,
    'Progressive passes': positionRankProgressivePassesWithMinutes,
    'Shots against': positionRankShotsAgainstWithMinutes,
    'Clean sheets': positionRankCleanSheetsWithMinutes,
    'xG against': positionRankXGAgainstWithMinutes,
    'Prevented goals': positionRankPreventedGoalsWithMinutes,
    'Line exits': positionRankExitsWithMinutes,
    'Defensive duel %': positionRankDefensiveDuelsWonPercentageWithMinutes,
    'Aerial duel %': positionRankAerialDuelsWonPercentageWithMinutes,
    'Shots on target %': positionRankShotsOnTargetPercentageWithMinutes,
    'Goal conversion': positionRankGoalConversionPercentageWithMinutes,
    'Cross accuracy': positionRankAccurateCrossesPercentageWithMinutes,
    'Successful dribble %': positionRankSuccessfulDribblesPercentageWithMinutes,
    'Offensive duel %': positionRankOffensiveDuelsWonPercentageWithMinutes,
    'Pass %': positionRankAccuratePassesPercentageWithMinutes,
    'Forward pass %': positionRankAccurateForwardPassesPercentageWithMinutes,
    'Short pass %': positionRankAccurateShortMediumPassesPercentageWithMinutes,
    'Long pass %': positionRankAccurateLongPassesPercentageWithMinutes,
    'Pass to final 3rd %': positionRankAccuratePassesToFinalThirdPercentageWithMinutes,
    'Pass to box %': positionRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
    'Through pass %': positionRankAccurateThroughPassesPercentageWithMinutes,
    'Progressive pass %': positionRankAccurateProgressivePassesPercentageWithMinutes,
    'Save %': positionRankSaveRatePercentageWithMinutes
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
    { name: 'Successful defensive actions', data: leagueRankActions },
        { name: 'Defensive duels', data: leagueRankDuels },
        { name: 'Aerial duels', data: leagueRankAerialDuels },
        { name: 'Tackles', data: leagueRankSlidingTackles },
        { name: 'Possession-adjusted tackles', data: leagueRankPAdjSlidingTackles },
        { name: 'Blocked shots', data: leagueRankShotsBlocked },
        { name: 'Interceptions', data: leagueRankInterceptions },
        { name: 'Possession-adjusted interceptions', data: leagueRankPAdjInterceptions },
        { name: 'Successful attacking actions', data: leagueRankSuccessfulAttackingActions },
        { name: 'Goals', data: leagueRankGoals },
        { name: 'Non-penalty goals', data: leagueRankNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: leagueRankXG },
        { name: 'Headed goals', data: leagueRankHeadGoals },
        { name: 'Shots', data: leagueRankShots },
        { name: 'Assists', data: leagueRankAssists },
        { name: 'Crosses', data: leagueRankCrosses },
        { name: 'Crosses to goalkeeper\'s box', data: leagueRankCrossesToGoalieBox },
        { name: 'Dribbles', data: leagueRankDribbles },
        { name: 'Offensive duels', data: leagueRankOffensiveDuels },
        { name: 'Touches in opponent\'s box', data: leagueRankTouchesInBox },
        { name: 'Progressive runs', data: leagueRankProgressiveRuns },
        { name: 'Accelerations', data: leagueRankAccelerations },
        { name: 'Fouls suffered', data: leagueRankFoulsSuffered },
        { name: 'Passes', data: leagueRankPasses },
        { name: 'Forward passes', data: leagueRankForwardPasses },
        { name: 'Short passes', data: leagueRankShortMediumPasses },
        { name: 'Long passes', data: leagueRankLongPasses },
        { name: 'Average pass length', data: leagueRankAveragePassLength },
        { name: 'Expected assists (xA)', data: leagueRankXA },
        { name: 'Shot assists', data: leagueRankShotAssists },
        { name: 'Key passes', data: leagueRankKeyPasses },
        { name: 'Passes to final third', data: leagueRankPassesToFinalThird },
        { name: 'Passes to penalty area', data: leagueRankPassesToPenaltyArea },
        { name: 'Through passes', data: leagueRankThroughPasses },
        { name: 'Deep completions', data: leagueRankDeepCompletions },
        { name: 'Progressive passes', data: leagueRankProgressivePasses },
        { name: 'Shots against', data: leagueRankShotsAgainst },
        { name: 'Clean sheets', data: leagueRankCleanSheets },
        { name: 'Expected goals against', data: leagueRankXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: leagueRankPreventedGoals },
        { name: 'Line exits', data: leagueRankExits },
        { name: 'Defensive duels won %', data: leagueRankDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: leagueRankAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: leagueRankShotsOnTargetPercentage },
        { name: 'Goal conversion', data: leagueRankGoalConversionPercentage },
        { name: 'Cross accuracy', data: leagueRankAccurateCrossesPercentage },
        { name: 'Dribble success rate', data: leagueRankSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: leagueRankOffensiveDuelsWonPercentage },
        { name: 'Accurate passes %', data: leagueRankAccuratePassesPercentage },
        { name: 'Accurate forward passes %', data: leagueRankAccurateForwardPassesPercentage },
        { name: 'Accurate short passes %', data: leagueRankAccurateShortMediumPassesPercentage },
        { name: 'Accurate long passes %', data: leagueRankAccurateLongPassesPercentage },
        { name: 'Accurate passes to final third %', data: leagueRankAccuratePassesToFinalThirdPercentage },
        { name: 'Accurate passes to penalty area %', data: leagueRankAccuratePassesToPenaltyAreaPercentage },
        { name: 'Through pass accuracy', data: leagueRankAccurateThroughPassesPercentage },
        { name: 'Accurate progressive passes %', data: leagueRankAccurateProgressivePassesPercentage },
        { name: 'Save percentage', data: leagueRankSaveRatePercentage }
                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': leagueRankActions,
    'Defensive duels': leagueRankDuels,
    'Aerial duels': leagueRankAerialDuels,
    'Tackles': leagueRankSlidingTackles,
    'PAdj tackles': leagueRankPAdjSlidingTackles,
    'Blocked shots': leagueRankShotsBlocked,
    'Interceptions': leagueRankInterceptions,
    'PAdj interceptions': leagueRankPAdjInterceptions,
    'Attacking actions': leagueRankSuccessfulAttackingActions,
    'Goals': leagueRankGoals,
    'Non-penalty goals': leagueRankNonPenaltyGoals,
    'Expected goals': leagueRankXG,
    'Headed goals': leagueRankHeadGoals,
    'Shots': leagueRankShots,
    'Assists': leagueRankAssists,
    'Crosses': leagueRankCrosses,
    'Crosses to box': leagueRankCrossesToGoalieBox,
    'Dribbles': leagueRankDribbles,
    'Offensive duels': leagueRankOffensiveDuels,
    'Touches in box': leagueRankTouchesInBox,
    'Progressive runs': leagueRankProgressiveRuns,
    'Accelerations': leagueRankAccelerations,
    'Fouls suffered': leagueRankFoulsSuffered,
    'Passes': leagueRankPasses,
    'Forward passes': leagueRankForwardPasses,
    'Short passes': leagueRankShortMediumPasses,
    'Long passes': leagueRankLongPasses,
    'Avg pass length': leagueRankAveragePassLength,
    'Expected assists': leagueRankXA,
    'Shot assists': leagueRankShotAssists,
    'Key passes': leagueRankKeyPasses,
    'Passes to final 3rd': leagueRankPassesToFinalThird,
    'Passes to box': leagueRankPassesToPenaltyArea,
    'Through passes': leagueRankThroughPasses,
    'Deep completions': leagueRankDeepCompletions,
    'Progressive passes': leagueRankProgressivePasses,
    'Shots against': leagueRankShotsAgainst,
    'Clean sheets': leagueRankCleanSheets,
    'xG against': leagueRankXGAgainst,
    'Prevented goals': leagueRankPreventedGoals,
    'Line exits': leagueRankExits,
    'Defensive duel %': leagueRankDefensiveDuelsWonPercentage,
    'Aerial duel %': leagueRankAerialDuelsWonPercentage,
    'Shots on target %': leagueRankShotsOnTargetPercentage,
    'Goal conversion': leagueRankGoalConversionPercentage,
    'Cross accuracy': leagueRankAccurateCrossesPercentage,
    'Successful dribble %': leagueRankSuccessfulDribblesPercentage,
    'Offensive duel %': leagueRankOffensiveDuelsWonPercentage,
    'Pass %': leagueRankAccuratePassesPercentage,
    'Forward pass %': leagueRankAccurateForwardPassesPercentage,
    'Short pass %': leagueRankAccurateShortMediumPassesPercentage,
    'Long pass %': leagueRankAccurateLongPassesPercentage,
    'Pass to final 3rd %': leagueRankAccuratePassesToFinalThirdPercentage,
    'Pass to box %': leagueRankAccuratePassesToPenaltyAreaPercentage,
    'Through pass %': leagueRankAccurateThroughPassesPercentage,
    'Progressive pass %': leagueRankAccurateProgressivePassesPercentage,
    'Save %': leagueRankSaveRatePercentage
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
    { name: 'Successful defensive actions', data: leagueRankActionsWithMinutes },
        { name: 'Defensive duels', data: leagueRankDuelsWithMinutes },
        { name: 'Aerial duels', data: leagueRankAerialDuelsWithMinutes },
        { name: 'Tackles', data: leagueRankSlidingTacklesWithMinutes },
        { name: 'Possession-adjusted tackles', data: leagueRankPAdjSlidingTacklesWithMinutes },
        { name: 'Blocked shots', data: leagueRankShotsBlockedWithMinutes },
        { name: 'Interceptions', data: leagueRankInterceptionsWithMinutes },
        { name: 'Possession-adjusted interceptions', data: leagueRankPAdjInterceptionsWithMinutes },
        { name: 'Successful attacking actions', data: leagueRankSuccessfulAttackingActionsWithMinutes },
        { name: 'Goals', data: leagueRankGoalsWithMinutes },
        { name: 'Non-penalty goals', data: leagueRankNonPenaltyGoalsWithMinutes },
        { name: 'Expected goals (xG)', data: leagueRankXGWithMinutes },
        { name: 'Headed goals', data: leagueRankHeadGoalsWithMinutes },
        { name: 'Shots', data: leagueRankShotsWithMinutes },
        { name: 'Assists', data: leagueRankAssistsWithMinutes },
        { name: 'Crosses', data: leagueRankCrossesWithMinutes },
        { name: 'Crosses to goalkeeper\'s box', data: leagueRankCrossesToGoalieBoxWithMinutes },
        { name: 'Dribbles', data: leagueRankDribblesWithMinutes },
        { name: 'Offensive duels', data: leagueRankOffensiveDuelsWithMinutes },
        { name: 'Touches in opponent\'s box', data: leagueRankTouchesInBoxWithMinutes },
        { name: 'Progressive runs', data: leagueRankProgressiveRunsWithMinutes },
        { name: 'Accelerations', data: leagueRankAccelerationsWithMinutes },
        { name: 'Fouls suffered', data: leagueRankFoulsSufferedWithMinutes },
        { name: 'Passes', data: leagueRankPassesWithMinutes },
        { name: 'Forward passes', data: leagueRankForwardPassesWithMinutes },
        { name: 'Short passes', data: leagueRankShortMediumPassesWithMinutes },
        { name: 'Long passes', data: leagueRankLongPassesWithMinutes },
        { name: 'Average pass length', data: leagueRankAveragePassLengthWithMinutes },
        { name: 'Expected assists (xA)', data: leagueRankXAWithMinutes },
        { name: 'Shot assists', data: leagueRankShotAssistsWithMinutes },
        { name: 'Key passes', data: leagueRankKeyPassesWithMinutes },
        { name: 'Passes to final third', data: leagueRankPassesToFinalThirdWithMinutes },
        { name: 'Passes to penalty area', data: leagueRankPassesToPenaltyAreaWithMinutes },
        { name: 'Through passes', data: leagueRankThroughPassesWithMinutes },
        { name: 'Deep completions', data: leagueRankDeepCompletionsWithMinutes },
        { name: 'Progressive passes', data: leagueRankProgressivePassesWithMinutes },
        { name: 'Shots against', data: leagueRankShotsAgainstWithMinutes },
        { name: 'Clean sheets', data: leagueRankCleanSheetsWithMinutes },
        { name: 'Expected goals against', data: leagueRankXGAgainstWithMinutes },
        { name: 'Prevented goals (PSxG-GA)', data: leagueRankPreventedGoalsWithMinutes },
        { name: 'Line exits', data: leagueRankExitsWithMinutes },
        { name: 'Defensive duels won %', data: leagueRankDefensiveDuelsWonPercentageWithMinutes },
        { name: 'Aerial duels won %', data: leagueRankAerialDuelsWonPercentageWithMinutes },
        { name: 'Shots on target %', data: leagueRankShotsOnTargetPercentageWithMinutes },
        { name: 'Goal conversion', data: leagueRankGoalConversionPercentageWithMinutes },
        { name: 'Cross accuracy', data: leagueRankAccurateCrossesPercentageWithMinutes },
        { name: 'Dribble success rate', data: leagueRankSuccessfulDribblesPercentageWithMinutes },
        { name: 'Offensive duels won %', data: leagueRankOffensiveDuelsWonPercentageWithMinutes },
        { name: 'Accurate passes %', data: leagueRankAccuratePassesPercentageWithMinutes },
        { name: 'Accurate forward passes %', data: leagueRankAccurateForwardPassesPercentageWithMinutes },
        { name: 'Accurate short passes %', data: leagueRankAccurateShortMediumPassesPercentageWithMinutes },
        { name: 'Accurate long passes %', data: leagueRankAccurateLongPassesPercentageWithMinutes },
        { name: 'Accurate passes to final third %', data: leagueRankAccuratePassesToFinalThirdPercentageWithMinutes },
        { name: 'Accurate passes to penalty area %', data: leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
        { name: 'Through pass accuracy', data: leagueRankAccurateThroughPassesPercentageWithMinutes },
        { name: 'Accurate progressive passes %', data: leagueRankAccurateProgressivePassesPercentageWithMinutes },
        { name: 'Save percentage', data: leagueRankSaveRatePercentageWithMinutes }

                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Defensive actions', 'Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': leagueRankActionsWithMinutes,
    'Defensive duels': leagueRankDuelsWithMinutes,
    'Aerial duels': leagueRankAerialDuelsWithMinutes,
    'Tackles': leagueRankSlidingTacklesWithMinutes,
    'PAdj tackles': leagueRankPAdjSlidingTacklesWithMinutes,
    'Blocked shots': leagueRankShotsBlockedWithMinutes,
    'Interceptions': leagueRankInterceptionsWithMinutes,
    'PAdj interceptions': leagueRankPAdjInterceptionsWithMinutes,
    'Attacking actions': leagueRankSuccessfulAttackingActionsWithMinutes,
    'Goals': leagueRankGoalsWithMinutes,
    'Non-penalty goals': leagueRankNonPenaltyGoalsWithMinutes,
    'Expected goals': leagueRankXGWithMinutes,
    'Headed goals': leagueRankHeadGoalsWithMinutes,
    'Shots': leagueRankShotsWithMinutes,
    'Assists': leagueRankAssistsWithMinutes,
    'Crosses': leagueRankCrossesWithMinutes,
    'Crosses to box': leagueRankCrossesToGoalieBoxWithMinutes,
    'Dribbles': leagueRankDribblesWithMinutes,
    'Offensive duels': leagueRankOffensiveDuelsWithMinutes,
    'Touches in box': leagueRankTouchesInBoxWithMinutes,
    'Progressive runs': leagueRankProgressiveRunsWithMinutes,
    'Accelerations': leagueRankAccelerationsWithMinutes,
    'Fouls suffered': leagueRankFoulsSufferedWithMinutes,
    'Passes': leagueRankPassesWithMinutes,
    'Forward passes': leagueRankForwardPassesWithMinutes,
    'Short passes': leagueRankShortMediumPassesWithMinutes,
    'Long passes': leagueRankLongPassesWithMinutes,
    'Avg pass length': leagueRankAveragePassLengthWithMinutes,
    'Expected assists': leagueRankXAWithMinutes,
    'Shot assists': leagueRankShotAssistsWithMinutes,
    'Key passes': leagueRankKeyPassesWithMinutes,
    'Passes to final 3rd': leagueRankPassesToFinalThirdWithMinutes,
    'Passes to box': leagueRankPassesToPenaltyAreaWithMinutes,
    'Through passes': leagueRankThroughPassesWithMinutes,
    'Deep completions': leagueRankDeepCompletionsWithMinutes,
    'Progressive passes': leagueRankProgressivePassesWithMinutes,
    'Shots against': leagueRankShotsAgainstWithMinutes,
    'Clean sheets': leagueRankCleanSheetsWithMinutes,
    'xG against': leagueRankXGAgainstWithMinutes,
    'Prevented goals': leagueRankPreventedGoalsWithMinutes,
    'Line exits': leagueRankExitsWithMinutes,
    'Defensive duel %': leagueRankDefensiveDuelsWonPercentageWithMinutes,
    'Aerial duel %': leagueRankAerialDuelsWonPercentageWithMinutes,
    'Shots on target %': leagueRankShotsOnTargetPercentageWithMinutes,
    'Goal conversion': leagueRankGoalConversionPercentageWithMinutes,
    'Cross accuracy': leagueRankAccurateCrossesPercentageWithMinutes,
    'Successful dribble %': leagueRankSuccessfulDribblesPercentageWithMinutes,
    'Offensive duel %': leagueRankOffensiveDuelsWonPercentageWithMinutes,
    'Pass %': leagueRankAccuratePassesPercentageWithMinutes,
    'Forward pass %': leagueRankAccurateForwardPassesPercentageWithMinutes,
    'Short pass %': leagueRankAccurateShortMediumPassesPercentageWithMinutes,
    'Long pass %': leagueRankAccurateLongPassesPercentageWithMinutes,
    'Pass to final 3rd %': leagueRankAccuratePassesToFinalThirdPercentageWithMinutes,
    'Pass to box %': leagueRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
    'Through pass %': leagueRankAccurateThroughPassesPercentageWithMinutes,
    'Progressive pass %': leagueRankAccurateProgressivePassesPercentageWithMinutes,
    'Save %': leagueRankSaveRatePercentageWithMinutes
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
    { name: 'Successful defensive actions', data: allCsvRankActions },
        { name: 'Defensive duels', data: allCsvRankDuels },
        { name: 'Aerial duels', data: allCsvRankAerialDuels },
        { name: 'Tackles', data: allCsvRankSlidingTackles },
        { name: 'Possession-adjusted tackles', data: allCsvRankPAdjSlidingTackles },
        { name: 'Blocked shots', data: allCsvRankShotsBlocked },
        { name: 'Interceptions', data: allCsvRankInterceptions },
        { name: 'Possession-adjusted interceptions', data: allCsvRankPAdjInterceptions },
        { name: 'Successful attacking actions', data: allCsvRankSuccessfulAttackingActions },
        { name: 'Goals', data: allCsvRankGoals },
        { name: 'Non-penalty goals', data: allCsvRankNonPenaltyGoals },
        { name: 'Expected goals (xG)', data: allCsvRankXG },
        { name: 'Headed goals', data: allCsvRankHeadGoals },
        { name: 'Shots', data: allCsvRankShots },
        { name: 'Assists', data: allCsvRankAssists },
        { name: 'Crosses', data: allCsvRankCrosses },
        { name: 'Crosses to goalkeeper\'s box', data: allCsvRankCrossesToGoalieBox },
        { name: 'Dribbles', data: allCsvRankDribbles },
        { name: 'Offensive duels', data: allCsvRankOffensiveDuels },
        { name: 'Touches in opponent\'s box', data: allCsvRankTouchesInBox },
        { name: 'Progressive runs', data: allCsvRankProgressiveRuns },
        { name: 'Accelerations', data: allCsvRankAccelerations },
        { name: 'Fouls suffered', data: allCsvRankFoulsSuffered },
        { name: 'Passes', data: allCsvRankPasses },
        { name: 'Forward passes', data: allCsvRankForwardPasses },
        { name: 'Short passes', data: allCsvRankShortMediumPasses },
        { name: 'Long passes', data: allCsvRankLongPasses },
        { name: 'Average pass length', data: allCsvRankAveragePassLength },
        { name: 'Expected assists (xA)', data: allCsvRankXA },
        { name: 'Shot assists', data: allCsvRankShotAssists },
        { name: 'Key passes', data: allCsvRankKeyPasses },
        { name: 'Passes to final third', data: allCsvRankPassesToFinalThird },
        { name: 'Passes to penalty area', data: allCsvRankPassesToPenaltyArea },
        { name: 'Through passes', data: allCsvRankThroughPasses },
        { name: 'Deep completions', data: allCsvRankDeepCompletions },
        { name: 'Progressive passes', data: allCsvRankProgressivePasses },
        { name: 'Shots against', data: allCsvRankShotsAgainst },
        { name: 'Clean sheets', data: allCsvRankCleanSheets },
        { name: 'Expected goals against', data: allCsvRankXGAgainst },
        { name: 'Prevented goals (PSxG-GA)', data: allCsvRankPreventedGoals },
        { name: 'Line exits', data: allCsvRankExits },
        { name: 'Defensive duels won %', data: allCsvRankDefensiveDuelsWonPercentage },
        { name: 'Aerial duels won %', data: allCsvRankAerialDuelsWonPercentage },
        { name: 'Shots on target %', data: allCsvRankShotsOnTargetPercentage },
        { name: 'Goal conversion', data: allCsvRankGoalConversionPercentage },
        { name: 'Cross accuracy', data: allCsvRankAccurateCrossesPercentage },
        { name: 'Dribble success rate', data: allCsvRankSuccessfulDribblesPercentage },
        { name: 'Offensive duels won %', data: allCsvRankOffensiveDuelsWonPercentage },
        { name: 'Accurate passes %', data: allCsvRankAccuratePassesPercentage },
        { name: 'Accurate forward passes %', data: allCsvRankAccurateForwardPassesPercentage },
        { name: 'Accurate short passes %', data: allCsvRankAccurateShortMediumPassesPercentage },
        { name: 'Accurate long passes %', data: allCsvRankAccurateLongPassesPercentage },
        { name: 'Accurate passes to final third %', data: allCsvRankAccuratePassesToFinalThirdPercentage },
        { name: 'Accurate passes to penalty area %', data: allCsvRankAccuratePassesToPenaltyAreaPercentage },
        { name: 'Through pass accuracy', data: allCsvRankAccurateThroughPassesPercentage },
        { name: 'Accurate progressive passes %', data: allCsvRankAccurateProgressivePassesPercentage },
        { name: 'Save percentage', data: allCsvRankSaveRatePercentage }
                // Add more metrics as needed
    ];

    const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': allCsvRankActions,
    'Defensive duels': allCsvRankDuels,
    'Aerial duels': allCsvRankAerialDuels,
    'Tackles': allCsvRankSlidingTackles,
    'PAdj tackles': allCsvRankPAdjSlidingTackles,
    'Blocked shots': allCsvRankShotsBlocked,
    'Interceptions': allCsvRankInterceptions,
    'PAdj interceptions': allCsvRankPAdjInterceptions,
    'Attacking actions': allCsvRankSuccessfulAttackingActions,
    'Goals': allCsvRankGoals,
    'Non-penalty goals': allCsvRankNonPenaltyGoals,
    'Expected goals': allCsvRankXG,
    'Headed goals': allCsvRankHeadGoals,
    'Shots': allCsvRankShots,
    'Assists': allCsvRankAssists,
    'Crosses': allCsvRankCrosses,
    'Crosses to box': allCsvRankCrossesToGoalieBox,
    'Dribbles': allCsvRankDribbles,
    'Offensive duels': allCsvRankOffensiveDuels,
    'Touches in box': allCsvRankTouchesInBox,
    'Progressive runs': allCsvRankProgressiveRuns,
    'Accelerations': allCsvRankAccelerations,
    'Fouls suffered': allCsvRankFoulsSuffered,
    'Passes': allCsvRankPasses,
    'Forward passes': allCsvRankForwardPasses,
    'Short passes': allCsvRankShortMediumPasses,
    'Long passes': allCsvRankLongPasses,
    'Avg pass length': allCsvRankAveragePassLength,
    'Expected assists': allCsvRankXA,
    'Shot assists': allCsvRankShotAssists,
    'Key passes': allCsvRankKeyPasses,
    'Passes to final 3rd': allCsvRankPassesToFinalThird,
    'Passes to box': allCsvRankPassesToPenaltyArea,
    'Through passes': allCsvRankThroughPasses,
    'Deep completions': allCsvRankDeepCompletions,
    'Progressive passes': allCsvRankProgressivePasses,
    'Shots against': allCsvRankShotsAgainst,
    'Clean sheets': allCsvRankCleanSheets,
    'xG against': allCsvRankXGAgainst,
    'Prevented goals': allCsvRankPreventedGoals,
    'Line exits': allCsvRankExits,
    'Defensive duel %': allCsvRankDefensiveDuelsWonPercentage,
    'Aerial duel %': allCsvRankAerialDuelsWonPercentage,
    'Shots on target %': allCsvRankShotsOnTargetPercentage,
    'Goal conversion': allCsvRankGoalConversionPercentage,
    'Cross accuracy': allCsvRankAccurateCrossesPercentage,
    'Successful dribble %': allCsvRankSuccessfulDribblesPercentage,
    'Offensive duel %': allCsvRankOffensiveDuelsWonPercentage,
    'Pass %': allCsvRankAccuratePassesPercentage,
    'Forward pass %': allCsvRankAccurateForwardPassesPercentage,
    'Short pass %': allCsvRankAccurateShortMediumPassesPercentage,
    'Long pass %': allCsvRankAccurateLongPassesPercentage,
    'Pass to final 3rd %': allCsvRankAccuratePassesToFinalThirdPercentage,
    'Pass to box %': allCsvRankAccuratePassesToPenaltyAreaPercentage,
    'Through pass %': allCsvRankAccurateThroughPassesPercentage,
    'Progressive pass %': allCsvRankAccurateProgressivePassesPercentage,
    'Save %': allCsvRankSaveRatePercentage
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
    // Define the metrics and their corresponding data
    const metricsData = [
    { name: 'Successful defensive actions', data: allCsvRankActionsWithMinutes },
        { name: 'Defensive duels', data: allCsvRankDuelsWithMinutes },
        { name: 'Aerial duels', data: allCsvRankAerialDuelsWithMinutes },
        { name: 'Tackles', data: allCsvRankSlidingTacklesWithMinutes },
        { name: 'Possession-adjusted tackles', data: allCsvRankPAdjSlidingTacklesWithMinutes },
        { name: 'Blocked shots', data: allCsvRankShotsBlockedWithMinutes },
        { name: 'Interceptions', data: allCsvRankInterceptionsWithMinutes },
        { name: 'Possession-adjusted interceptions', data: allCsvRankPAdjInterceptionsWithMinutes },
        { name: 'Successful attacking actions', data: allCsvRankSuccessfulAttackingActionsWithMinutes },
        { name: 'Goals', data: allCsvRankGoalsWithMinutes },
        { name: 'Non-penalty goals', data: allCsvRankNonPenaltyGoalsWithMinutes },
        { name: 'Expected goals (xG)', data: allCsvRankXGWithMinutes },
        { name: 'Headed goals', data: allCsvRankHeadGoalsWithMinutes },
        { name: 'Shots', data: allCsvRankShotsWithMinutes },
        { name: 'Assists', data: allCsvRankAssistsWithMinutes },
        { name: 'Crosses', data: allCsvRankCrossesWithMinutes },
        { name: 'Crosses to goalkeeper\'s box', data: allCsvRankCrossesToGoalieBoxWithMinutes },
        { name: 'Dribbles', data: allCsvRankDribblesWithMinutes },
        { name: 'Offensive duels', data: allCsvRankOffensiveDuelsWithMinutes },
        { name: 'Touches in opponent\'s box', data: allCsvRankTouchesInBoxWithMinutes },
        { name: 'Progressive runs', data: allCsvRankProgressiveRunsWithMinutes },
        { name: 'Accelerations', data: allCsvRankAccelerationsWithMinutes },
        { name: 'Fouls suffered', data: allCsvRankFoulsSufferedWithMinutes },
        { name: 'Passes', data: allCsvRankPassesWithMinutes },
        { name: 'Forward passes', data: allCsvRankForwardPassesWithMinutes },
        { name: 'Short passes', data: allCsvRankShortMediumPassesWithMinutes },
        { name: 'Long passes', data: allCsvRankLongPassesWithMinutes },
        { name: 'Average pass length', data: allCsvRankAveragePassLengthWithMinutes },
        { name: 'Expected assists (xA)', data: allCsvRankXAWithMinutes },
        { name: 'Shot assists', data: allCsvRankShotAssistsWithMinutes },
        { name: 'Key passes', data: allCsvRankKeyPassesWithMinutes },
        { name: 'Passes to final third', data: allCsvRankPassesToFinalThirdWithMinutes },
        { name: 'Passes to penalty area', data: allCsvRankPassesToPenaltyAreaWithMinutes },
        { name: 'Through passes', data: allCsvRankThroughPassesWithMinutes },
        { name: 'Deep completions', data: allCsvRankDeepCompletionsWithMinutes },
        { name: 'Progressive passes', data: allCsvRankProgressivePassesWithMinutes },
        { name: 'Shots against', data: allCsvRankShotsAgainstWithMinutes },
        { name: 'Clean sheets', data: allCsvRankCleanSheetsWithMinutes },
        { name: 'Expected goals against', data: allCsvRankXGAgainstWithMinutes },
        { name: 'Prevented goals (PSxG-GA)', data: allCsvRankPreventedGoalsWithMinutes },
        { name: 'Line exits', data: allCsvRankExitsWithMinutes },
        { name: 'Defensive duels won %', data: allCsvRankDefensiveDuelsWonPercentageWithMinutes },
        { name: 'Aerial duels won %', data: allCsvRankAerialDuelsWonPercentageWithMinutes },
        { name: 'Shots on target %', data: allCsvRankShotsOnTargetPercentageWithMinutes },
        { name: 'Goal conversion', data: allCsvRankGoalConversionPercentageWithMinutes },
        { name: 'Cross accuracy', data: allCsvRankAccurateCrossesPercentageWithMinutes },
        { name: 'Dribble success rate', data: allCsvRankSuccessfulDribblesPercentageWithMinutes },
        { name: 'Offensive duels won %', data: allCsvRankOffensiveDuelsWonPercentageWithMinutes },
        { name: 'Accurate passes %', data: allCsvRankAccuratePassesPercentageWithMinutes },
        { name: 'Accurate forward passes %', data: allCsvRankAccurateForwardPassesPercentageWithMinutes },
        { name: 'Accurate short passes %', data: allCsvRankAccurateShortMediumPassesPercentageWithMinutes },
        { name: 'Accurate long passes %', data: allCsvRankAccurateLongPassesPercentageWithMinutes },
        { name: 'Accurate passes to final third %', data: allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes },
        { name: 'Accurate passes to penalty area %', data: allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes },
        { name: 'Through pass accuracy', data: allCsvRankAccurateThroughPassesPercentageWithMinutes },
        { name: 'Accurate progressive passes %', data: allCsvRankAccurateProgressivePassesPercentageWithMinutes },
        { name: 'Save percentage', data: allCsvRankSaveRatePercentageWithMinutes }
                // Add more metrics as needed
    ];

const positionOrder = {
      'Goalkeeper': [
    'Prevented goals (PSxG-GA)',
    'Save percentage',
    'Clean sheets',
    'Line exits',
    'Shots against',
    'Expected goals against',
    'Accurate passes %',
    'Accurate short passes %',
    'Accurate long passes %',
    'Accurate progressive passes %',
    'Passes',
    'Forward passes',
    'Short passes',
    'Long passes',
    'Progressive passes',
    'Average pass length',
    'Passes to final third',
    'Passes to penalty area',
    'Through passes',
    'Successful defensive actions',
    'Defensive duels',
    'Aerial duels',
    'Tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Fouls suffered',
    'Assists',
    'Dribbles'

],
'Centre-back': [
    'Defensive duels',
    'Defensive duels won %',
    'Successful defensive actions',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Deep completions',
    'Successful attacking actions',
    'Shots',
    'Goals',
    'Headed goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Shot assists',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Touches in opponent\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Accelerations',
    'Fouls suffered'

]
,
'Full-back': [
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Assists',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Shots',
    'Shots on target %',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Headed goals',
    'Goal conversion'




]
,
'Midfielder': [
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Key passes',
    'Expected assists (xA)',
    'Shot assists',
    'Assists',
    'Deep completions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Winger': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Headed goals',
    'Touches in opponent\'s box',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'

]
,
'Striker': [
    'Goals',
    'Non-penalty goals',
    'Expected goals (xG)',
    'Assists',
    'Expected assists (xA)',
    'Headed goals',
    'Shots',
    'Shots on target %',
    'Goal conversion',
    'Touches in opponent\'s box',
    'Successful attacking actions',
    'Crosses',
    'Cross accuracy',
    'Crosses to goalkeeper\'s box',
    'Dribbles',
    'Dribble success rate',
    'Offensive duels',
    'Offensive duels won %',
    'Progressive runs',
    'Accelerations',
    'Fouls suffered',
    'Key passes',
    'Shot assists',
    'Deep completions',
    'Passes',
    'Accurate passes %',
    'Forward passes',
    'Accurate forward passes %',
    'Short passes',
    'Accurate short passes %',
    'Long passes',
    'Accurate long passes %',
    'Progressive passes',
    'Accurate progressive passes %',
    'Passes to final third',
    'Accurate passes to final third %',
    'Passes to penalty area',
    'Accurate passes to penalty area %',
    'Through passes',
    'Average pass length',
    'Successful defensive actions',
    'Defensive duels',
    'Defensive duels won %',
    'Aerial duels',
    'Aerial duels won %',
    'Tackles',
    'Possession-adjusted tackles',
    'Interceptions',
    'Possession-adjusted interceptions',
    'Blocked shots'



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
    'Goalkeeper': ['Defensive duels', 'Tackles', 'PAdj tackles', 'Blocked shots', 'Interceptions', 'PAdj interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Progressive runs', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to final 3rd', 'Passes to box', 'Through passes', 'Deep completions', 'Progressive passes', 'Shots against', 'xG against', 'Defensive duel %', 'Aerial duel %', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Forward pass %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %'],
    'Centre-back': ['Blocked shots', 'Save %', 'Prevented goals', 'Clean sheets', 'Line exits', 'Tackles', 'Interceptions', 'Attacking actions', 'Goals', 'Non-penalty goals', 'Expected goals', 'Headed goals', 'Shots', 'Assists', 'Crosses', 'Crosses to box', 'Dribbles', 'Offensive duels', 'Touches in box', 'Accelerations', 'Fouls suffered', 'Forward passes', 'Avg pass length', 'Expected assists', 'Shot assists', 'Key passes', 'Passes to box', 'Through passes', 'Deep completions', 'Shots on target %', 'Goal conversion', 'Cross accuracy', 'Successful dribble %', 'Offensive duel %', 'Pass to final 3rd %', 'Pass to box %', 'Through pass %', 'Progressive pass %', 'Shots against', 'xG against', 'Defensive actions', 'Forward pass %', 'Passes to final 3rd', 'Long passes', 'Short passes' ],    
    'Full-back': ['Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
'Assists',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Successful dribble %',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Midfielder': ['Defensive actions',
 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'Blocked shots',
 'Interceptions',
 'Goals',
 'Non-penalty goals',
 'Expected goals',
 'Headed goals',
 'Shots',
 'Assists',
 'Crosses',
 'Crosses to box',
 'Dribbles',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Winger': [ 'Defensive duels',
 'Aerial duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Non-penalty goals',
 'Headed goals',
 'Shots',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Accelerations',
 'Fouls suffered',
 'Passes',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Aerial duel %',
 'Shots on target %',
 'Goal conversion',
 'Cross accuracy',
 'Offensive duel %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
    'Striker': ['Defensive actions',
 'Defensive duels',
 'Tackles',
 'PAdj tackles',
 'Blocked shots',
 'Interceptions',
 'PAdj interceptions',
 'Headed goals',
 'Shots',
 'Crosses',
 'Crosses to box',
 'Offensive duels',
 'Touches in box',
 'Progressive runs',
 'Accelerations',
 'Fouls suffered',
 'Forward passes',
 'Short passes',
 'Long passes',
 'Avg pass length',
 'Shot assists',
'Key passes',
 'Passes to final 3rd',
 'Passes to box',
 'Through passes',
 'Deep completions',
 'Progressive passes',
 'Shots against',
 'Clean sheets',
 'xG against',
 'Prevented goals',
 'Line exits',
 'Defensive duel %',
 'Cross accuracy',
 'Successful dribble %',
 'Offensive duel %',
 'Pass %',
 'Forward pass %',
 'Short pass %',
 'Long pass %',
 'Pass to final 3rd %',
 'Pass to box %',
 'Through pass %',
 'Progressive pass %',
 'Save %'],
};
const metricsToInclude = {
    'Defensive actions': allCsvRankActionsWithMinutes,
    'Defensive duels': allCsvRankDuelsWithMinutes,
    'Aerial duels': allCsvRankAerialDuelsWithMinutes,
    'Tackles': allCsvRankSlidingTacklesWithMinutes,
    'PAdj tackles': allCsvRankPAdjSlidingTacklesWithMinutes,
    'Blocked shots': allCsvRankShotsBlockedWithMinutes,
    'Interceptions': allCsvRankInterceptionsWithMinutes,
    'PAdj interceptions': allCsvRankPAdjInterceptionsWithMinutes,
    'Attacking actions': allCsvRankSuccessfulAttackingActionsWithMinutes,
    'Goals': allCsvRankGoalsWithMinutes,
    'Non-penalty goals': allCsvRankNonPenaltyGoalsWithMinutes,
    'Expected goals': allCsvRankXGWithMinutes,
    'Headed goals': allCsvRankHeadGoalsWithMinutes,
    'Shots': allCsvRankShotsWithMinutes,
    'Assists': allCsvRankAssistsWithMinutes,
    'Crosses': allCsvRankCrossesWithMinutes,
    'Crosses to box': allCsvRankCrossesToGoalieBoxWithMinutes,
    'Dribbles': allCsvRankDribblesWithMinutes,
    'Offensive duels': allCsvRankOffensiveDuelsWithMinutes,
    'Touches in box': allCsvRankTouchesInBoxWithMinutes,
    'Progressive runs': allCsvRankProgressiveRunsWithMinutes,
    'Accelerations': allCsvRankAccelerationsWithMinutes,
    'Fouls suffered': allCsvRankFoulsSufferedWithMinutes,
    'Passes': allCsvRankPassesWithMinutes,
    'Forward passes': allCsvRankForwardPassesWithMinutes,
    'Short passes': allCsvRankShortMediumPassesWithMinutes,
    'Long passes': allCsvRankLongPassesWithMinutes,
    'Avg pass length': allCsvRankAveragePassLengthWithMinutes,
    'Expected assists': allCsvRankXAWithMinutes,
    'Shot assists': allCsvRankShotAssistsWithMinutes,
    'Key passes': allCsvRankKeyPassesWithMinutes,
    'Passes to final 3rd': allCsvRankPassesToFinalThirdWithMinutes,
    'Passes to box': allCsvRankPassesToPenaltyAreaWithMinutes,
    'Through passes': allCsvRankThroughPassesWithMinutes,
    'Deep completions': allCsvRankDeepCompletionsWithMinutes,
    'Progressive passes': allCsvRankProgressivePassesWithMinutes,
    'Shots against': allCsvRankShotsAgainstWithMinutes,
    'Clean sheets': allCsvRankCleanSheetsWithMinutes,
    'xG against': allCsvRankXGAgainstWithMinutes,
    'Prevented goals': allCsvRankPreventedGoalsWithMinutes,
    'Line exits': allCsvRankExitsWithMinutes,
    'Defensive duel %': allCsvRankDefensiveDuelsWonPercentageWithMinutes,
    'Aerial duel %': allCsvRankAerialDuelsWonPercentageWithMinutes,
    'Shots on target %': allCsvRankShotsOnTargetPercentageWithMinutes,
    'Goal conversion': allCsvRankGoalConversionPercentageWithMinutes,
    'Cross accuracy': allCsvRankAccurateCrossesPercentageWithMinutes,
    'Successful dribble %': allCsvRankSuccessfulDribblesPercentageWithMinutes,
    'Offensive duel %': allCsvRankOffensiveDuelsWonPercentageWithMinutes,
    'Pass %': allCsvRankAccuratePassesPercentageWithMinutes,
    'Forward pass %': allCsvRankAccurateForwardPassesPercentageWithMinutes,
    'Short pass %': allCsvRankAccurateShortMediumPassesPercentageWithMinutes,
    'Long pass %': allCsvRankAccurateLongPassesPercentageWithMinutes,
    'Pass to final 3rd %': allCsvRankAccuratePassesToFinalThirdPercentageWithMinutes,
    'Pass to box %': allCsvRankAccuratePassesToPenaltyAreaPercentageWithMinutes,
    'Through pass %': allCsvRankAccurateThroughPassesPercentageWithMinutes,
    'Progressive pass %': allCsvRankAccurateProgressivePassesPercentageWithMinutes,
    'Save %': allCsvRankSaveRatePercentageWithMinutes
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
