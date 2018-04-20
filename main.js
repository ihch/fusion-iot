var GoogleSpreadsheet = require("google-spreadsheet")
var Chart = require("chart.js")

main()

function main() {
  getSpreadsheet()
}


function getSpreadsheet(callback) {
  var spreadsheet_client = new GoogleSpreadsheet("1gnInzFHiK8aGHNUH4ZgeYqGkuVkyHvqDev0yTFsPVzk")
  var credentials = require("../private/fusion-iot-d4cc9aaed1d2.json")
  var col_names_candidate = [
    ["time", "value1", "value2", "value3"],
    ["time", "BPM", "IBI", "signal", "Temperature", "vibration"].map(x => x.toLowerCase()),
    // シートのカラム名の候補の配列を入れて行く
  ];

  spreadsheet_client.useServiceAccountAuth(credentials, function(err) {
    spreadsheet_client.getInfo(function(err, data) {
      for (var i in data.worksheets) {
        data.worksheets[i].getRows(function(err, rows) {
          var col_name = ((head_row) => {
            console.log("poypoypoy", head_row);
            // シートのカラム名の候補から合うものをとる
            for (var col_name_candidate of col_names_candidate) {
              var diff = true;
              for (var e of col_name_candidate) {
                diff &= head_row.includes(e);
              }
              if (diff) {
                return col_name_candidate;
              }
            }
          })(Object.values(Object.keys(rows[0])));

          console.log("row: ", rows[0])
          console.log(col_name);
          var res = {
            col_name: col_name,
            "time": [],
            "value": new Array(col_name.length - 1).fill(0).map(() => {
              return new Array();
            }),
          }
          // ワークシートからの情報取得
          console.log(res.col_name)
          for (var j in rows.slice(1)) {
            for (var k in res.col_name) {
              if (k == 0) {
                res["time"].push(rows[j][res.col_name[k]])
              }
              else {
                res["value"][k - 1].push(rows[j][res.col_name[k]])
              }
            }
          }
          writeChart(data.worksheets, res)
        })
      }
    })
  })
}


function writeChart(worksheets, data) {
  console.log(data);
  if (!("ChartNumber" in writeChart)) {
    writeChart.ChartNumber = 0
  }

  var borderColors = [
    'rgba(244, 99, 132)',
    'rgba(179,181,198)',
    'rgba(54,164,235)',
    'rgba(217,242,77)',
    'rgba(32,247,172)',
    'rgba(34,188,191)',
  ]
  var ctx = document.getElementById("myChart" + String(writeChart.ChartNumber + 1))
  var options = {
    responsive: false
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data["time"],
      datasets: (() => {
        // カラム毎の折れ線用データを生成
        let res = [];
        for (var i in data.col_name.slice(1)) { // data.col_name[0]は時間データなので省く
          res.push({
            label: data.col_name[i],
            // 折れ線のカーブ
            lineTension: 0,
            // 塗りつぶし
            fill: false,
            data: data["value"][i],
            borderColor: [borderColors[i % 6]],
            borderWidth: 1,
          });
        }
        return res;
      })()
    }
  }, options)
  writeChart.ChartNumber++;
}

