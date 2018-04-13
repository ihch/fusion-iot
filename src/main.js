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
          console.log(rows)
          var row_name = rows[0];
          var res = {
            "time": [],
            "value": new Array(row_name.length).fill(0).map(() => {
              return new Array(1);
            }),
          }
          for (var j in rows.slice(0)) {
            res["time"].push(rows[j].time)

            for (var k in row_name.slice(1)) {
              res["value"][k].push(rows[j][row_name])
            }
            res["value"][0].push(rows[j].value1)
            res["value"][1].push(rows[j].value2)
            res["value"][2].push(rows[j].value3)
          }
          writeChart(data.worksheets, res)
        })
      }
    })
  })
}


function writeChart(worksheets, data) {
  if (!("ChartNumber" in writeChart)) {
    writeChart.ChartNumber = 0
  }
  console.log(data)
  console.log(data["time"])
  console.log(data["value"][0])
  console.log(data["value"][1])
  console.log(data["value"][2])
  /*
  console.log(writeChart.ChartNumber)
  console.log(worksheets[writeChart.ChartNumber])
  console.log(worksheets[writeChart.ChartNumber].title)
  */
  var ctx = document.getElementById("myChart" + String(writeChart.ChartNumber + 1))
  var options = {
    responsive: false
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data["time"],
      datasets: [
        {
          label: "temperature",
          // 折れ線のカーブ
          lineTension: 0,
          // 塗りつぶし
          fill: false,
          data: data["value"][0],
          borderColor: [
            'rgba(244, 99, 132)'
          ],
          borderWidth: 1,
        },
        {
          label: "heartbeat",
          // 折れ線のカーブ
          lineTension: 0,
          // 塗りつぶし
          fill: false,
          data: data["value"][1],
          borderColor: [
            'rgba(179,181,198)'
          ],
          borderWidth: 1,
        },
        {
          label: "vibration",
          // 折れ線のカーブ
          lineTension: 0,
          // 塗りつぶし
          fill: false,
          data: data["value"][2],
          borderColor: [
            'rgba(54,164,235)'
          ],
          borderWidth: 1,
        }
      ]
    }
  }, options)
  writeChart.ChartNumber++
}
