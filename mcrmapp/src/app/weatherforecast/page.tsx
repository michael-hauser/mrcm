"use client";

import { useEffect, useState } from "react";

interface WeatherData {
    date: Date,
    temperatureC: number,
    temperatureF: number,
    summary: string,
}

export default function WeatherForecast() {
    const [data, setData] = useState<WeatherData[]>([]);

    useEffect(() => {
       const readData = async () => {
        const request = await fetch("https://localhost:7198/weatherforecast");
        const json = await request.json();
        if(json) {
            json.map((j: any) => j.date = new Date(j.date));
            setData(json);
        }
       };

       readData();
    }, []);

    return (
        <section className="flex flex-col p-4">
            <h1 className="text-4xl font-bold place-self-center m-8">Weather Forecast</h1>
            <div className="flex flex-row flex-wrap justify-center">
                {
                    data.map((d, idx) => 
                        <div key={idx} className="flex flex-col p-6 m-4 w-60 rounded-xl bg-neutral-100 border items-center">
                            <div className="text-5xl font-extralight m-4">{d.temperatureC}°C</div>
                            <div className="italic">{d.summary}</div>
                            <div className="font-bold">{d.date.toDateString()}</div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}