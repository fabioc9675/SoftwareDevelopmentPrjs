import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { options, dataInit } from "./ChartInit";

// Register the Chart Object
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function DataChart(props) {
    // definition of props to use in the component
    const { data } = props;
    const [DataChart, setDataChart] = useState(dataInit);

    var red = Math.round(Math.random() * 255);
    var gre = Math.round(Math.random() * 255);
    var blu = Math.round(Math.random() * 255);

    // options of the chart component
    useEffect(() => {
        // creation of data temporal array
        const label = []; // data label
        const name = []; // data name
        const d1 = []; // data 1 axis

        for (let i = 0; i < data.length; i++) {
            label.push(i);
            name.push(data[i].varname);
            d1.push(data[i].varvalue);
        }

        const dataSet = {
            labels: label,
            datasets: [
                {
                    fill: true,
                    label: name[0],
                    data: d1,
                    borderColor: `rgb(${red}, ${gre}, ${blu})`,
                    backgroundColor: `rgba(${red}, ${gre}, ${blu}, 0.5)`,
                    yAxisID: "y",
                    color: "white",
                },
            ],
        };

        // add the data to the chart object
        setDataChart(dataSet);
    }, [data]);

    return (
        <div className="container bg-transparent text-white shadow-lg">
            <h4>Gráfica de datos</h4>
            <div className="grey lighten-3">
                <Line options={options} data={DataChart} />
            </div>
        </div>
    );
}
