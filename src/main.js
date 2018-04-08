var GoogleSpreadsheet = require("google-spreadsheet")
var Chart = require("chart.js")

main()

function main() {
  getSpreadsheet()
}


function getSpreadsheet(callback) {
  var spreadsheet_client = new GoogleSpreadsheet("1gnInzFHiK8aGHNUH4ZgeYqGkuVkyHvqDev0yTFsPVzk")
  var credentials = require("../private/fusion-iot-d4cc9aaed1d2.json")

  spreadsheet_client.useServiceAccountAuth(credentials, function(err) {
    spreadsheet_client.getInfo(function(err, data) {
      for (var i in data.worksheets) {
        data.worksheets[i].getRows(function(err, rows) {
          var res = []
          for (var j in rows) {
            res.push(rows[j].a)
          }
          // console.log(res)
          writeChart(data.worksheets, res)
        })
        /*
        console.log(data.worksheets[i])
        console.log(data.worksheets[i].title)
        */
      }
    })
  })
}


function writeChart(worksheets, data) {
  if (!("ChartNumber" in writeChart)) {
    writeChart.ChartNumber = 0
  }
  console.log(writeChart.ChartNumber)
  console.log(worksheets[writeChart.ChartNumber])
  console.log(worksheets[writeChart.ChartNumber].title)
  /*
  console.log(data)
  console.log(index)
  console.log("myChart" + String(writeChart.ChartNumber))
  */
  var ctx = document.getElementById("myChart" + String(writeChart.ChartNumber + 1))
  var options = {
    responsive: false
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data,
      datasets: [{
        label: worksheets[writeChart.ChartNumber].title,
        // 折れ線のカーブ
        lineTension: 0,
        // 塗りつぶし
        fill: false,
        data: data,
        /*
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        */
        borderColor: [
          'rgba(244, 99, 132)'
        ],
        borderWidth: 1
      }]
    }
  }, options)
  writeChart.ChartNumber++
}
