self.onmessage = async function(event) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    
    const BATCH_SIZE = 9; // Increased batch size for modern browsers
    const cache = new Map();
    let urls = event.data.urls;
    let allData = [];
    let processedFiles = 0;
    
    // Pre-allocate array for better memory management
    const estimatedTotalRows = 20000; // Adjust based on expected data size
    allData = new Array(estimatedTotalRows);
    

    // Optimize XLSX reading configuration
    const xlsxOptions = {
        type: 'array',
        cellDates: false,
        cellNF: false,
        cellText: false,
        cellStyles: false,
        cellFormula: false,
        dense: true,
        raw: true,
        sheetStubs: false,
        WTF: false,
        cellHTML: false,
        bookVBA: false,
        numbers: true,    // Added: force number parsing
        dateNF: false,    // Added: skip date formatting
        sheets: [0],      // Added: only load first sheet
        codepage: 0       // Added: skip codepage checks
    };

    // Process files in batches
    async function processBatch(startIndex) {
        const endIndex = Math.min(startIndex + BATCH_SIZE, urls.length);
        const batchUrls = urls.slice(startIndex, endIndex);
        
        // Use Promise.all with optimized fetch
        const batchPromises = batchUrls.map(async (url, batchIndex) => {
            if (cache.has(url)) {
                return cache.get(url);
            }

            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                priority: 'high',
                cache: 'force-cache',
                keepalive: true
            });
            
            const buffer = await response.arrayBuffer();
            const workbook = XLSX.read(new Uint8Array(buffer), xlsxOptions);
            
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const range = XLSX.utils.decode_range(sheet['!ref']);
            
            const rowCount = range.e.r + 1;
            const processedData = new Array(rowCount);
            
            for (let R = 0; R <= range.e.r; R++) {
                const row = new Array(93);
                for (let C = 0; C <= Math.min(92, range.e.c); C++) {
                    const cell = sheet[XLSX.utils.encode_cell({r: R, c: C})];
                    row[C] = cell ? cell.v : '';
                }
                
                // Calculate the absolute file index
                const fileIndex = startIndex + batchIndex;
                
                // Skip headers for all files except the first one
                if (fileIndex !== 0 && R === 0) {
                    processedData[R] = null;
                    continue;
                }
                
                // Use fileIndex for position label
                row.splice(2, 0, getPositionLabel(fileIndex));
                processedData[R] = row;
            }
            
            workbook.Sheets = null;
            workbook.SheetNames = null;
            
            cache.set(url, processedData);
            return processedData;
        });

        const batchResults = await Promise.all(batchPromises);
        
        // Process batch results
        batchResults.forEach((data) => {
            if (!data) return;
            if (data.some(row => row !== null)) {
                allData.push(...data.filter(row => row !== null));
            }
        });

        processedFiles += batchResults.length;
        
        // Report progress
        self.postMessage({
            type: 'progress',
            progress: (processedFiles / urls.length) * 100
        });

        if (endIndex < urls.length) {
            // Use requestAnimationFrame equivalent for workers
            setTimeout(() => processBatch(endIndex), 0);
        } else {
            // Optimize final data transfer
            self.postMessage({
                type: 'complete',
                data: allData.filter(Boolean) // Remove any null entries
            });
        }
    }

    // Helper function for position labels
    function getPositionLabel(fileIndex) {
        if (fileIndex <= 2) return 'Goalkeeper';
        if (fileIndex <= 5) return 'Centre-back';
        if (fileIndex <= 8) return 'Full-back';
        if (fileIndex <= 11) return 'Midfielder';
        if (fileIndex <= 14) return 'Winger';
        if (fileIndex <= 17) return 'Striker';
        return 'Unknown';
    }

    // Start processing immediately
    await processBatch(0);
};
