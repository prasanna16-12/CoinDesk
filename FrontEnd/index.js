
let ctx = document.getElementById('myChart');
let fromDateTimeInput = document.getElementById('fromDateTimeInput');
let toDateTimeInput = document.getElementById('toDateTimeInput');
let USD_BTN = document.getElementById('USD_BTN');
let GBP_BTN = document.getElementById('GBP_BTN');
let EUR_BTN = document.getElementById('EUR_BTN');
let RESET_BTN = document.getElementById('RESET_BTN');

let USD_MAX_CARD = document.getElementById('USD-MAX');
let GBP_MAX_CARD = document.getElementById('GBP-MAX');
let EUR_MAX_CARD = document.getElementById('EUR-MAX');

let USD_MIN_CARD = document.getElementById('USD-MIN');
let GBP_MIN_CARD = document.getElementById('GBP-MIN');
let EUR_MIN_CARD = document.getElementById('EUR-MIN');

let CHEAP = document.getElementById('CHEAP');
let EXPENSIVE = document.getElementById('EXPENSIVE');


let LABEL = []
let USD = []
let GBP = []
let EUR = []

let MIN = 0
let MAX = 100

let USD_MIN = 0
let USD_MAX = 100

let GBP_MIN = 0
let GBP_MAX = 100

let EUR_MIN = 0
let EUR_MAX = 100

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1"],
        datasets: [{
            label: 'USD ($)',
            data: [1],
            fill: true,
            borderColor: 'rgb(230,75,48)',
            backgroundColor: 'rgb(230,75,48, 0.1)',
            tension: .1
        },
        {
            label: 'GBP (£)',
            data: [1],
            fill: true,
            borderColor: 'rgb(51,111,178)',
            backgroundColor: 'rgb(51,111,178, 0.1)',
            tension: .1
        },
        {
            label: 'EUR (€)',
            data: [1],
            fill: true,
            borderColor: 'rgb(240,166,22)',
            backgroundColor: 'rgb(240,166,22, 0.1)',
            tension: .1
        }]
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    //footer: footer,
                }
            }
        },
        maintainAspectRatio: false,
        scales: {

            y: {
                title: {
                    display: true,
                    text: 'Bitcoin Price Index',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1,
                    },
                },
                max: 1,
                min: 1,
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    },
                    callback: (label) => `${(label / 1000).toFixed(2)} K`,
                },
            },

            x: {
                title: {
                    display: true,
                    text: 'Time',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1,
                    },
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    },
                    autoSkip: true,
                    maxTicksLimit: 7,
                    callback: function (val, index) {
                        let date = new Date(this.getLabelForValue(val))
                        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JAN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                        return (monthArr[date.getMonth()] +
                            " " + date.getDate() + " • " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0'))
                    }
                },
            }
        }
    }
});

//hiding chart initially
ctx.style.display = "none"



// draw chart after receiving data
function drawChart() {

    myChart.data.labels = LABEL
    myChart.data.datasets[0].data = USD
    myChart.data.datasets[1].data = GBP
    myChart.data.datasets[2].data = EUR


    myChart.options.scales.y.min = MIN
    myChart.options.scales.y.max = MAX

    console.log(LABEL);

    myChart.update();
    console.log('chart updated');
    ctx.style.display = "block";
}

function formatDate(date = Date) {
    date = new Date(date.getTime() - (330 * 60000))
    return date
}

function processData(data = []) {

    LABEL = data.map(obj => formatDate(new Date(obj.updated_on)))//new Date(obj.updated_on).getHours() + ":" + new Date(obj.updated_on).getMinutes())
    USD = data.map(obj => obj.USD)
    GBP = data.map(obj => obj.GBP)
    EUR = data.map(obj => obj.EUR)

    USD_MIN = Math.min(...USD) - 100
    USD_MAX = Math.max(...USD) + 100

    GBP_MIN = Math.min(...GBP) - 100
    GBP_MAX = Math.max(...GBP) + 100

    EUR_MIN = Math.min(...EUR) - 100
    EUR_MAX = Math.max(...EUR) + 100

    USD_MAX_CARD.innerHTML = `$ ${isFinite(Math.max(...USD).toFixed(2)) ? Math.max(...USD).toFixed(2) : 'Insufficient Data'}`
    USD_MIN_CARD.innerHTML = `$ ${isFinite(Math.min(...USD).toFixed(2)) ? Math.min(...USD).toFixed(2) : 'Insufficient Data'}`

    GBP_MAX_CARD.innerHTML = `£ ${isFinite(Math.max(...GBP).toFixed(2)) ? Math.max(...GBP).toFixed(2) : 'Insufficient Data'}`
    GBP_MIN_CARD.innerHTML = `£ ${isFinite(Math.min(...GBP).toFixed(2)) ? Math.min(...GBP).toFixed(2) : 'Insufficient Data'}`

    EUR_MAX_CARD.innerHTML = `€ ${isFinite(Math.max(...EUR).toFixed(2)) ? Math.max(...EUR).toFixed(2) : 'Insufficient Data'}`
    EUR_MIN_CARD.innerHTML = `€ ${isFinite(Math.min(...EUR).toFixed(2)) ? Math.min(...EUR).toFixed(2) : 'Insufficient Data'}`

    MIN = Math.min(EUR_MIN, GBP_MIN, USD_MIN) - 100
    MAX = Math.max(EUR_MIN, GBP_MIN, USD_MIN) + 1000

}
// getting initial data
async function getData(from, to) {

    const response = await fetch(`https://coindesk-production.up.railway.app/api/coindesk/v1/analytics/data?from=${from}:00&to=${to}:00`,
        {
            method: 'GET',
        })
    if (!response.ok) {
        let err = await response.json()
        alert(err.message)
        throw new Error(`status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)

    if (data.count > 0) {

        CHEAP.innerHTML = data.cheapestCurrencyToBuyBitCoin.Currency + ' - ' + data.cheapestCurrencyToBuyBitCoin.Frequency
        EXPENSIVE.innerHTML = data.expensiveCurrencyToBuyBitCoin.Currency + ' - ' + data.expensiveCurrencyToBuyBitCoin.Frequency

        processData(data.result);
        drawChart()

    }
    else {
        alert('No data found')
    }




}

// UTC -> IST
let UTCtoIST = ((date) => {
    return new Date(date.getTime() + (330 * 60000))
})

//setting appropriate date when page loads
let setDates = (() => {
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1);

    today = UTCtoIST(today)
    yesterday = UTCtoIST(yesterday)

    console.log(today, yesterday);
    fromDateTimeInput.setAttribute("max", today.toISOString().split('.')[0].substring(0, 16))
    toDateTimeInput.setAttribute("max", today.toISOString().split('.')[0].substring(0, 16))


    toDateTimeInput.setAttribute("min", yesterday.toISOString().split('.')[0].substring(0, 16))

    //console.log(today.toISOString().split('.')[0].substring(0, 16), yesterday.toISOString().split('.')[0].substring(0, 16));
    fromDateTimeInput.value = yesterday.toISOString().split('.')[0].substring(0, 16)
    toDateTimeInput.value = today.toISOString().split('.')[0].substring(0, 16)


    //calling api for first time
    getData(yesterday.toISOString().split('.')[0].substring(0, 16), today.toISOString().split('.')[0].substring(0, 16))

})()

//setting to date limit when from date is changed
let setMinimunToDate = (() => {
    let today = new Date(fromDateTimeInput.value)
    //console.log(today);
    today = UTCtoIST(today)
    toDateTimeInput.setAttribute("min", today.toISOString().split('.')[0].substring(0, 16));
})


fromDateTimeInput.addEventListener('change', () => {
    setMinimunToDate()
    getData(fromDateTimeInput.value, toDateTimeInput.value)
})

toDateTimeInput.addEventListener('change', () => {

    getData(fromDateTimeInput.value, toDateTimeInput.value)
})


USD_BTN.addEventListener('click', () => {



    myChart.data.labels = LABEL

    myChart.data.datasets[0].data = USD
    myChart.data.datasets[1].data = GBP
    myChart.data.datasets[2].data = EUR


    myChart.options.scales.y.min = USD_MIN
    myChart.options.scales.y.max = USD_MAX

    myChart.data.datasets[0].fill = true
    myChart.data.datasets[1].fill = false
    myChart.data.datasets[2].fill = false



    myChart.update();
    console.log('chart updated');
    ctx.style.display = "block";
})

GBP_BTN.addEventListener('click', () => {


    myChart.data.labels = LABEL
    myChart.data.datasets[0].data = USD
    myChart.data.datasets[1].data = GBP
    myChart.data.datasets[2].data = EUR


    myChart.options.scales.y.min = GBP_MIN
    myChart.options.scales.y.max = GBP_MAX

    myChart.data.datasets[0].fill = false
    myChart.data.datasets[1].fill = true
    myChart.data.datasets[2].fill = false

    myChart.update();
    console.log('chart updated');
    ctx.style.display = "block";
})

EUR_BTN.addEventListener('click', () => {


    myChart.data.labels = LABEL
    myChart.data.datasets[0].data = USD
    myChart.data.datasets[1].data = GBP
    myChart.data.datasets[2].data = EUR


    myChart.options.scales.y.min = EUR_MIN
    myChart.options.scales.y.max = EUR_MAX


    myChart.data.datasets[0].fill = false
    myChart.data.datasets[1].fill = false
    myChart.data.datasets[2].fill = true

    myChart.update();
    console.log('chart updated');
    ctx.style.display = "block";
})

RESET_BTN.addEventListener('click', () => {


    myChart.data.labels = LABEL
    myChart.data.datasets[0].data = USD
    myChart.data.datasets[1].data = GBP
    myChart.data.datasets[2].data = EUR


    myChart.options.scales.y.min = MIN
    myChart.options.scales.y.max = MAX


    myChart.data.datasets[0].fill = true
    myChart.data.datasets[1].fill = true
    myChart.data.datasets[2].fill = true

    myChart.update();
    console.log('chart updated');
    ctx.style.display = "block";
})

