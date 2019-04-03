function getData() {
    var url = "ALL ACTIVE 2.xlsx";

    /* set up async GET request */
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function (e) {
        var data = new Uint8Array(req.response);
        var workbook = XLSX.read(data, { type: "array" });

        /* DO SOMETHING WITH workbook HERE */
        //   var fourth_sheet_name = workbook.SheetNames[3];

        /* Get worksheet */
        var worksheet = workbook.Sheets["ACTIVE"];
        var result = XLSX.utils.sheet_to_json(worksheet)
        localStorage.setItem('data', JSON.stringify(result));
    }

    req.send();
}

document.addEventListener("DOMContentLoaded", function () {
    getData()

    var result = JSON.parse(localStorage.getItem('data'));
    console.log("RESULTSSSSS", result, result[0]["Expert"], result[0]['Law Firm'])

    var main = document.getElementById('main')

    for (const item of result) {
        main.innerHTML += `<p>Expert: ${item["Expert"]}</p><p>Expert: ${item["Law Firm"]}</p>`
    }
});