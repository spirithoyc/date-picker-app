export const fetchEarthquakeData = (dateBegin, dateEnd) => {
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
        fetch(url)
            .then((response) => {
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
                console.error("Error fetching earthquake data:", error);
                reject(error);
            });
    });
};
