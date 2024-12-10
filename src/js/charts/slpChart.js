const ctx5 = document.getElementById('myChart5').getContext('2d');

const getOrCreateTooltip5 = (chart) => {
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
        tooltipEl.style.width = '141px';
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
  
const externalTooltipHandler5 = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip5(chart);
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
            p1.style.color = "#FF82E2";
            p1.style.textShadow = "0px 0px 15px #FF82E2";
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
            const text = document.createTextNode("BRL: " + chart.tooltip.dataPoints[0].raw);
            
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

const gradientBg5 = ctx5.createLinearGradient(0, 0, 0, 263);
gradientBg5.addColorStop(0, "rgba(255,130,226, 0.3)");
gradientBg5.addColorStop(1, "rgba(255,130,226, 0)");

const legendMarginRight = {
    afterInit(chart, args, options){
        console.log(chart.legend);
        const fitValue = chart.legend.fit;
        chart.legend.fit = function fit(){
            fitValue.bind(chart.legend)();
            var width = this.width;
            return width;
        }

    }
}

var dataArray = [,0.02148, 0.0209, 0.0214, 0.02135, 0.02145, 0.02142, 0.022, 0.0214, 0.02147,]

const myChart5 = new Chart(ctx5, {
    type: "line",
    data: {
        labels: ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', "Julho", "Agosto", "Setembro", ""],
        datasets: [{
            label: 'SLP',
            /* data: dataArray, */
            data: [,0.02148, 0.0213, 0.0214, 0.02135, 0.02145, 0.02142, 0.0215, 0.0214, 0.02147,],
            backgroundColor: gradientBg5,
            borderColor:'#FF82E2',
            fill: true,
            pointBorderWidth: 2,
            pointRadius: 6.25,
            pointBackgroundColor: "#101011",
            pointBorderColor: "#FF82E2"
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Oscilação do SLP',
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
                external: externalTooltipHandler5 
            }
        },
        scales: {
            y: {
                grid:{
                    display: true,
                    color: "#353746",
                    drawBorder: false
                },
                ticks: {
                    color: "#FFFFFF",
                    font: {
                        size: 10,
                        family: 'Poppins',
                        weight: 500
                    },
                    stepSize: 0.0001,
                    callback: (value, index, values) =>{
                        return value.toFixed(4) + " BRL";
                    },
                    maxTicksLimit: 6,
                    padding: 40
                },
                // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                suggestedMin: 0.0210,

                // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                suggestedMax: 0.0215,
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
    },
    plugins: [legendMarginRight]
});

