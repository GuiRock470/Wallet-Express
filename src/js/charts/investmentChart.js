const ctx1 = document.getElementById('myChart').getContext('2d');

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = '#1E1F26';
        tooltipEl.style.borderRadius = '4px';
        tooltipEl.style.borderWidth = '1px';
        tooltipEl.style.borderColor = '#353746';
        tooltipEl.style.borderStyle = 'solid';
        tooltipEl.style.boxShadow = "0px 0px 3px #27282C47";
        tooltipEl.style.opacity = 1;
        tooltipEl.style.width = '180px';
        tooltipEl.style.margin = '0px';
        tooltipEl.style.padding = '10px 13px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
    
        const div = document.createElement('table');
        div.style.margin = '0px';
        div.style.width = '100%';
    
        tooltipEl.appendChild(div);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
};
  
const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }
  
    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);
    
        const tableHead = document.createElement('thead');
  
        titleLines.forEach(title => {
            const tr = document.createElement('tr');

    
            const th = document.createElement('th');
            th.style.border = 'none';
            th.style.Width = '100%';
            th.style.paddingBottom = "8px";
            th.style.fontWeight = 500;
            th.style.fontSize = "15px";
            th.style.lineHeight = "23px";
            th.style.textAlign = 'left';

            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            p1.style.color = "#6E65FE";
            p1.style.display = "inline";
            p1.innerText = (labelChart1 + " • ");
            p2.style.color = "#919BE8";
            p2.style.display = "inline";
            p2.innerText = (title);

            const span = document.createElement('span');
            span.style.display = "inline";
            span.appendChild(p1);
            span.appendChild(p2);
            

            
            th.appendChild(span);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });
  
        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
    
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;
    
            const td = document.createElement('td');
            td.style.borderWidth = 0;
            td.style.lineHeight = '30px';
            td.style.fontSize = '20px';
            td.style.fontWeight = 600;
            td.style.fontFamily = 'Poppins';
            td.style.color = "#FFFFFF";
            td.style.display = "inline";
            var price = body[0].replace("Investimento: ", "");
            const text = document.createTextNode("U$ " + price);
            
            td.appendChild(text);
            
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });
  
        const tableRoot = tooltipEl.querySelector('table');
  
        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }
  
        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 75 + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY - 75 + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const gradientBg1 = ctx1.createLinearGradient(0, 0, 0, 225);
gradientBg1.addColorStop(0, "#8743FF");
gradientBg1.addColorStop(1, "#4136F1");
const labelChart1 = 'Investimento';

const myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ['24/01', '25/01', '26/01', '27/01', '28/01', '29/01', "30/01", "31/01", "01/02"],
        datasets: [{
            label: labelChart1,
            data: [4100, 2500, 1800, 4000, 5000, 4000, 4200, 6900, 6000],
            backgroundColor: gradientBg1,
            borderRadius: 9,
            barThickness: "flex",
        }]
    },
    options: {
        //responsive: false,
        categoryPercentage: 1.0,
        barPercentage: 0.5,
        plugins: {
            legend:{
                display: false
            },
            tooltip:{
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler 
            }
        },
        scales: {
            y: {
                grid:{
                    display: false
                },
                beginAtZero: true,
                ticks: {
                    color: "#FFFFFF",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    },
                    stepSize: 2000,
                    padding: 25
                }
            },
            x: {
                grid:{
                    display: false,
                    color: "#FFFFFF",
                    drawBorder: true,
                    borderColor: "#353746"
                },
                ticks: {
                    color: "#AEACCC",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    }
                }
            }
        },
        maintainAspectRatio: false
    }
});