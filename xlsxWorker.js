self.onmessage = async function(event) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    
    const urls = event.data.urls;
    const positions = {
        0: 'Goalkeeper', 1: 'Goalkeeper', 2: 'Goalkeeper',
        3: 'Centre-back', 4: 'Centre-back', 5: 'Centre-back',
        6: 'Full-back', 7: 'Full-back', 8: 'Full-back',
        9: 'Midfielder', 10: 'Midfielder', 11: 'Midfielder',
        12: 'Winger', 13: 'Winger', 14: 'Winger',
        15: 'Striker', 16: 'Striker', 17: 'Striker'
    };

    let allData = [];
    const BATCH_SIZE = 6; // Process 6 files at a time for balance between speed and memory

    try {
        for (let i = 0; i < urls.length; i += BATCH_SIZE) {
            const batchUrls = urls.slice(i, Math.min(i + BATCH_SIZE, urls.length));
            
            // Fetch all files in current batch concurrently
            const batchPromises = batchUrls.map(async (url, batchIndex) => {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const position = positions[i + batchIndex];
                
                // Process each file as soon as it's downloaded
                const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { 
                    header: 1,
                    raw: false, // Convert to strings for faster processing
                    defval: '' // Use empty string for empty cells
                });

                // Process rows directly during conversion
                return jsonData.slice(1).map(row => {
                    const processedRow = row.slice(0, 93);
                    processedRow.splice(2, 0, position);
                    return processedRow;
                });
            });

            // Wait for current batch to complete
            const batchResults = await Promise.all(batchPromises);
            
            // Combine batch results
            batchResults.forEach(data => {
                allData.push(...data);
            });

            // Report progress
            self.postMessage({
                type: 'progress',
                progress: Math.min(100, Math.round((i + BATCH_SIZE) / urls.length * 100))
            });
        }

        // Send completed data
        self.postMessage({
            type: 'complete',
            data: allData
        });

    } catch (error) {
        self.postMessage({
            type: 'error',
            error: error.message
        });
    }
};
