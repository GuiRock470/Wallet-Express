const ctx3 = document.getElementById('myChart3').getContext('2d');

const getOrCreateTooltip3 = (chart) => {
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
        tooltipEl.style.width = '162px';
        tooltipEl.style.margin = '0px';
        tooltipEl.style.zIndex = '50';
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
  
const externalTooltipHandler3 = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip3(chart);
  
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

            if(chart.tooltip.dataPoints[0].dataset.label == "SLP"){
                p1.style.color = "#F7D2FF";
                p1.style.textShadow = "0px 0px 15px #FF82E2";
                p1.style.display = "inline";
                p1.innerText = (chart.tooltip.dataPoints[0].dataset.label + " • ");
                p2.style.color = "#AEACCC";
                p2.style.display = "inline";
                p2.innerText = title.substring(0, 3);
            }
            else{
                p1.style.color = "#8C54FF";
                p1.style.textShadow = "0px 0px 15px #6E65FE69";
                p1.style.display = "inline";
                p1.innerText = (chart.tooltip.dataPoints[0].dataset.label + " • ");
                p2.style.color = "#AEACCC";
                p2.style.display = "inline";
                p2.innerText = title.substring(0, 3);
            }

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
            const text = document.createTextNode(price);
            
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

const gradientBg22 = ctx2.createLinearGradient(0, 0, 0, 228);
gradientBg22.addColorStop(0, "#F7D2FF");
gradientBg22.addColorStop(1, "#FF82E2");

const gradientBg32 = ctx2.createLinearGradient(0, 0, 0, 228);
gradientBg32.addColorStop(0, "#C6AEFF");
gradientBg32.addColorStop(1, "#7C37FA");

const myChart3 = new Chart(ctx3, {
    type: "bar",
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', "Julho", "Agosto", "Setembro"],
        datasets: [
            {
                label: 'SLP',
                data: [23000, 46000, 40000, 41000, 39000, 25000, 45000, 40500, 41000],
                backgroundColor: gradientBg22,
                borderRadius: 9,
                /* barThickness: 29, */
                categoryPercentage: 0.8,
                barPercentage: 0.8
            },
            {
                label: 'AXS',
                data: [19000, 22000, 19000, 42000, 39500, 18000, 22000, 18000, 42000],
                backgroundColor: gradientBg32,
                borderRadius: 9,
                /* barThickness: 29, */
                categoryPercentage: 0.8,
                barPercentage: 0.8
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: false
            },
            legend:{
                display: false,
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 10,
                    boxHeight: 11,
                    borderRadius: 2,
                    color: '#FFFFFF',
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 400
                    },
                }
            },
            tooltip:{
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler3 
            }
        },
        scales: {
            y: {
                grid:{
                    display: false
                },
                beginAtZero: true,
                grace: '15%',
                ticks: {
                    color: "#FFFFFF",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    },
                    stepSize: 10000,
                    padding: 30
                }
            },
            x: {
                grid:{
                    display: false,
                    drawBorder: true,
                    borderColor: "#353746"
                },
                ticks: {
                    color: "#AEACCC",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    },
                    maxTicksLimit: 9
                }
            }
        },
        maintainAspectRatio: false
    }
});