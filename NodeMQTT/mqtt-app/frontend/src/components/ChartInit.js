// parameters to initialize the chart

export const options = {
    responsive: true,
    interaction: {
        mode: "index",
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: "Gráfica de datos",
        },
    },
    scales: {
        y: {
            type: "linear",
            display: true,
            position: "left",
        },
    },
};

export const dataInit = {
    labels: [1],
    datasets: [
        {
            fill: true,
            label: "Dataset 1",
            data: [10, 20],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            yAxisID: "y",
        },
    ],
};
