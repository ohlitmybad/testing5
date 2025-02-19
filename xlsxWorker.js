self.onmessage = async function(event) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    
    const BATCH_SIZE = 6; // Process 6 files at a time
    const cache = new Map();
    let urls = event.data.urls;
    let allData = [];
    let processedFiles = 0;
    
    // Process files in batches
    async function processBatch(startIndex) {
        const endIndex = Math.min(startIndex + BATCH_SIZE, urls.length);
        const batchUrls = urls.slice(startIndex, endIndex);
        
        const batchPromises = batchUrls.map(async (url) => {
            if (cache.has(url)) {
                return cache.get(url);
            }

            const response = await fetch(url);
            const data = await response.arrayBuffer();
            
            // Optimize XLSX reading
            const workbook = XLSX.read(new Uint8Array(data), {
                type: 'array',
                cellDates: false,
                cellNF: false,
                cellText: false
            });
            
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                raw: true,
                defval: ''
            });

            // Trim data to 93 columns
            jsonData = jsonData.map(row => row.slice(0, 93));
            
            // Determine position label
            let label;
            const fileIndex = urls.indexOf(url);
            if (fileIndex >= 0 && fileIndex <= 2) label = 'Goalkeeper';
            else if (fileIndex >= 3 && fileIndex <= 5) label = 'Centre-back';
            else if (fileIndex >= 6 && fileIndex <= 8) label = 'Full-back';
            else if (fileIndex >= 9 && fileIndex <= 11) label = 'Midfielder';
            else if (fileIndex >= 12 && fileIndex <= 14) label = 'Winger';
            else if (fileIndex >= 15 && fileIndex <= 17) label = 'Striker';
            else label = 'Unknown';

            // Process rows
            for (let i = 0; i < jsonData.length; i++) {
                if (fileIndex !== 0 && i === 0) continue;
                // Shift columns and insert label
                const row = jsonData[i];
                for (let j = row.length - 1; j >= 2; j--) {
                    row[j] = row[j - 1];
                }
                row[2] = label;
            }

            cache.set(url, jsonData);
            return jsonData;
        });

        const batchResults = await Promise.all(batchPromises);
        
        // Merge batch results
        batchResults.forEach((jsonData, index) => {
            if (startIndex + index === 0) {
                allData.push(...jsonData);
            } else {
                allData.push(...jsonData.slice(1));
            }
        });

        processedFiles += batchResults.length;
        
        // Report progress
        self.postMessage({
            type: 'progress',
            progress: (processedFiles / urls.length) * 100
        });

        // Process next batch if needed
        if (endIndex < urls.length) {
            setTimeout(() => processBatch(endIndex), 0);
        } else {
            // All batches processed, send final data
            const transferableData = {
                data: allData,
                type: 'complete'
            };
            self.postMessage(transferableData);
        }
    }

    // Start processing with first batch
    await processBatch(0);
};
