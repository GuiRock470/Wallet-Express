const ctx7 = document.getElementById('myChart7').getContext('2d');

const getOrCreateTooltip7 = (chart) => {
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
        tooltipEl.style.width = '131px';
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
  
const externalTooltipHandler7 = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip7(chart);
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
            p1.style.color = "#3650FF";
            p1.style.display = "inline";
            p1.innerText = ('SLP' + " • ");
            p2.style.color = "#AEACCC";
            p2.style.display = "inline";
            p2.innerText = title.substring(0, 3);

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
            const text = document.createTextNode(chart.tooltip.dataPoints[0].raw + " SLP");
            
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

const gradientBg7 = ctx7.createLinearGradient(0, 0, 0, 263);
gradientBg7.addColorStop(0, "rgba(54,80,255, 0.3)");
gradientBg7.addColorStop(1, "rgba(54,80,255, 0)");


const myChart7 = new Chart(ctx7, {
    type: "line",
    data: {
        labels: ["",'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', "Julho", "Agosto", "Setembro", ""],
        datasets: [{
            label: 'SLP GANHO MENSALMENTE',
            data: [,460, 452, 458, 441, 460, 450, 445, 440, 443,],
            backgroundColor: gradientBg7,
            borderColor:'#3650FF',
            fill: true,
            pointBorderWidth: 2,
            pointRadius: 6.25,
            pointBackgroundColor: "#101011",
            pointBorderColor: "#3650FF"
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Performance de farm médio mensal',
                font: {
                    size: 18,
                    family: 'Poppins',
                    weight: 600
                },
                color: "#6E65FE"
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
                external: externalTooltipHandler7 
            }
        },
        scales: {
            y: {
                grid:{
                    display: true,
                    color: "#353746"
                },
                ticks: {
                    color: "#FFFFFF",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    },
                    stepSize: 20,
                    callback: (value, index, values) =>{
                        return value.toFixed(1) + " SLP";
                    },
                    padding: 40,
                    maxTicksLimit: 6
                },
                suggestedMin: 400,
                suggestedMax: 500
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
                    backdropPadding: {
                        x: 10,
                        y: 0
                    },
                    maxTicksLimit: 11
                }
            }
        },
        maintainAspectRatio: false
    }
});

