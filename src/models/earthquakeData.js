export const fetchEarthquakeData = (dateBegin, dateEnd, timeout = 10000) => {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateBegin}&endtime=${dateEnd}`;

    const parseEarthquakeData = (data) => {
        console.log(data);
        return data.features.map((feature) => {
            const { id } = feature;
            const { time, title, tsunami } = feature.properties;
            const coordinates = feature.geometry.coordinates;
            const formattedTime = new Date(time).toISOString().replace('T', ' ').split('.')[0];
    
            return {
                id,
                time: formattedTime,
                title,
                tsunami,
                coordinates,
            };
        });
    }



    return new Promise((resolve, reject) => {

        // Timeout Promise
        const timer = setTimeout(() => {
            reject(new Error("Request timed out"));
        }, timeout);

        fetch(url)
            .then((response) => {
                clearTimeout(timer);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const parsedData = parseEarthquakeData(data);
                resolve(parsedData);
            })
            .catch((error) => {
                clearTimeout(timer);
                console.error("Error fetching earthquake data:", error);
                reject(error);
            });
    });
};
