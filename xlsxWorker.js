
self.onmessage = async function(event) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    
    let urls = event.data.urls;
    let allData = [];
    let isFirstFileProcessed = false;

    const fetchPromises = urls.map(url => fetch(url).then(response => response.arrayBuffer()));
    const responses = await Promise.all(fetchPromises);

    responses.forEach((data, index) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        jsonData = jsonData
        
        let label;
        if (index >= 0 && index <= 2) label = 'Goalkeeper';
        else if (index >= 3 && index <= 5) label = 'Centre-back';
        else if (index >= 6 && index <= 8) label = 'Full-back';
        else if (index >= 9 && index <= 11) label = 'Midfielder';
        else if (index >= 12 && index <= 14) label = 'Winger';
        else if (index >= 15 && index <= 17) label = 'Striker';
        else label = 'Unknown';

        for (let i = 0; i < jsonData.length; i++) {
            if (index !== 0 && i === 0) continue;
            for (let j = jsonData[i].length - 1; j >= 2; j--) {
                jsonData[i][j] = jsonData[i][j - 1];
            }
            jsonData[i][2] = label;
        }

        if (!isFirstFileProcessed) {
            allData.push(...jsonData);
            isFirstFileProcessed = true;
        } else {
            allData.push(...jsonData.slice(1));
        }
    });

    self.postMessage(allData);
};
