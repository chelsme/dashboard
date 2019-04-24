function getData() {
    var url = "CPTtable.xlsx";

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
        var worksheet = workbook.Sheets["Sheet1"];
        var result = XLSX.utils.sheet_to_json(worksheet)
        localStorage.setItem('data', JSON.stringify(result));
    }

    req.send();
}

document.addEventListener("DOMContentLoaded", function () {
    getData()

    var result = JSON.parse(localStorage.getItem('data'));
    console.log("RESULTSSSSS", result, result[0]["Icon"], result[0]["CPT Code"])

    var main = document.getElementById('main')

    for (const item of result) {
        main.innerHTML += `<div style="border: 2px solid black; padding: 3px; margin: 5px;"><p>Icon: ${item["Expert"]}</p><p>Law Firm: ${item["Law Firm"]}</p><p>Due Date: ${item["Actual Due Date"]}</p><div>`
    }
});