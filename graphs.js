import Chart from 'chart.js/auto';

/* Insert chart CDN script in document */ 
const chartCDNScript = document.createElement("script");
chartCDNScript.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js" 
/* "https://cdn.jsdelivr.net/npm/chart.js" */;


/* Inline data section */

(()=>{
/* Retrieving "table1" data */

    const dataTable01 = [];
    const table01 = document.getElementById("table1");

    if (table01) {
        const tbody01 = table01.getElementsByTagName("tbody")[0];
        const rows01 = tbody01.getElementsByTagName("tr");

        for (let i = 1; i < rows01.length; i++) {
            let row01 = rows01[i];
            let cells01 = row01.getElementsByTagName("td");

            let country01 = cells01[0].textContent;
            let yearData01 = [];
            for (let j = 1; j < cells01.length; j++) {
                yearData01.push(parseFloat(cells01[j].textContent.replace(',', '.')));
            }
            dataTable01.push({
                label: country01,
                data: yearData01,
            });
        }
        console.log(dataTable01)
    } else {
        console.log("Table not found");
    }

    /* Insert canvas01 element in document */
    const canvasTable01 = document.createElement("canvas");
    canvasTable01.id = "myChart01";

    const containerDiv01 = document.createElement("div");
    containerDiv01.id = "chartContainer01";

    const parentElement = table01.parentNode; // Get the shared parent element

    if (table01 && parentElement) {
        // Insert the container div before the table
        parentElement.insertBefore(containerDiv01, table01);

        // Append the canvas to the container div
        containerDiv01.appendChild(canvasTable01);
    } else {
        console.log("One or both of the specified elements not found.");
    }

    const body = document.body;
    const scriptElement = document.querySelector('script[src="graphs.js"]');

    if (body && scriptElement) {
        body.insertBefore(chartCDNScript, scriptElement);
    } else {
        console.log('Script element with src="graphs.js" not found.');
    }

    // creating the chart using chart.js
    const ctx = document.getElementById("myChart01");

    const chartData01 = {
        labels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"],
        datasets: dataTable01.map(function (country01, index){
            return {
                label: country01.label,
                data: country01.data,
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderWidth: 1,
            };
        }),
    };
    const chartTable01 = new Chart(ctx,{
            type: "bar",
            data: chartData01,
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });
})();


/* Retrieving "table2" data */
(()=>{
    const dataTable02 = [];
    const table02 = document.getElementById("table2");

    if (table02) {
        const tbody02 = table02.getElementsByTagName("tbody")[0];
        const rows02 = tbody02.getElementsByTagName("tr");
        
        for (let i = 0; i < rows02.length; i++) {
            let row02 =rows02[i];
            let cells02 = row02.getElementsByTagName("td");

            let country = cells02[0].textContent;
            let yearData02 = [];
            for (let j = 1; j < cells02.length; j++){
                yearData02.push(parseFloat(cells02[j].textContent));
            }

            dataTable02.push({

                country: country,
                data: yearData02,
            });
        }
        console.log(dataTable02);
    } else {
        console.log("Table not found");
    }

    /* inline data graph2 */

    const canvasTable02 = document.createElement("canvas");
    canvasTable02.id = "chartTable02";

    const containerDiv02 = document.createElement("div");
    containerDiv02.id = "chartContainer02";

    const parentElement = table02.parentNode;

    if (table02 && parentElement) {
        parentElement.insertBefore(containerDiv02, table02);
        containerDiv02.appendChild(canvasTable02);
    } else {
        console.log("One or both of the specified elements not found.");
    }


    const ctx = document.getElementById("chartTable02");

    const chartData02 = {
        labels: ["2007-09","2010-12" ],
        datasets: dataTable02.map(item => ({
            label: item.country,
            data: item.data,
            backgroundColor: getRandomColor(), // Function to generate random colors
            fill: false,
          })),
    };

    const chartTable02 = new Chart(ctx, {
        type: "bar",
        data: chartData02,
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
    });


    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})();

/* Live chart with dataPoints from external JSON */
(()=>{
    const canvasRemote = document.createElement("canvas");
    canvasRemote.id = "canvasRemote";

    const containerDivRemote = document.createElement("div");
    containerDivRemote.id = "chartRemoteContainer";

    const firstHeading = document.getElementById("firstHeading")
    const parentElement = firstHeading.parentNode;

    if (firstHeading && parentElement) {
        parentElement.insertBefore(containerDivRemote, firstHeading.nextSibling);
        containerDivRemote.appendChild(canvasRemote);
    } else {
        console.log("One or both of the specified elements not found.");
    };

    const dataPoints = [];

    const ctx = canvasRemote;
    const chartRemote = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Data Points",
                    data: dataPoints,
                    borderColor: "",
                    fill: false,
                    tension: 0.1
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: "Live Chart with dataPoints from External JSON",
            },
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });


    // Function to update the Chart.js chart
    function fetchDataAndUpdateChart(){
        // "/api" url is declared in vite.config.js to avoid CORS issues
        let url = "/api" + "?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1]) + "&length=1&type=json";
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    dataPoints.push(data[0][1]);
                    chartRemote.data.labels.push(data[0][0]);
                    chartRemote.update();
                }
                console.log(dataPoints);
            })
            .catch(error => console.error("Error fetching data: " + error));

        setTimeout(fetchDataAndUpdateChart, 1000);
    };

    fetchDataAndUpdateChart();

})(); 