import React, { useState, useEffect } from "react";
import { fetchEarthquakeData } from "../models/earthquakeData";
import "./earthquake/earthquake.css";

const EarthQuake = ({ beginDate, endDate }) => {
    const [earthquakeData, setEarthquakeData] = useState([]);
    const [visibleData, setVisibleData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(20);

    useEffect(() => {
        if (!beginDate || !endDate) return;

        setIsLoading(true);
        fetchEarthquakeData(beginDate, endDate)
            .then((data) => {
                setEarthquakeData(data);
                setVisibleData(data.slice(0, displayCount));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [beginDate, endDate]);

    const handleShowMore = () => {
        const nextCount = Math.min(displayCount + 10, earthquakeData.length);
        setVisibleData(earthquakeData.slice(0, nextCount));
        setDisplayCount(nextCount);
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="earth-quake-data">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Title</th>
                                <th>Tsunami</th>
                                <th>Coordinates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleData.map((quake) => (
                                <tr key={quake.id}>
                                    <td>{quake.time}</td>
                                    <td>{quake.title}</td>
                                    <td>{quake.tsunami ? "Yes" : "No"}</td>
                                    <td>
                                        {quake.coordinates[0]}, {quake.coordinates[1]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="load-more"
                        onClick={handleShowMore}
                        disabled={displayCount >= earthquakeData.length}
                    >
                        {displayCount >= earthquakeData.length ? "No More Data" : "More"}
                    </button>
                </>
            )}
        </div>
    );
};

export default EarthQuake;
