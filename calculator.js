// create variables to store insurance payment rate for company and person
var endowment_com, endowment_per,
    medical_com, medical_per,
    unemployment_com, unemployment_per,
    maternity_com, maternity_per,
    injury_com, injury_per;

// store average wage
var avrWage;

// create 5 arrays to store csv file
var taxRateArray, fiveInsuranceArray, averageWageArray, standardArray, staffListingArray, staffListingArray2;

// create an array to store input query
var inputArray = [];

// read in 5 csv files
var taxRateFile = document.getElementById('taxRate');
taxRateFile.addEventListener('change', function() {
    var reader = new FileReader();
    var f = taxRateFile.files[0];
    reader.onload = function(e) {
        taxRateArray = parseResult(e.target.result); //this is where the csv array will be
    };
    reader.readAsText(f);
});

var fiveInsuranceFile = document.getElementById('fiveInsurance');
fiveInsuranceFile.addEventListener('change', function() {
    var reader = new FileReader();
    var f = fiveInsuranceFile.files[0];
    reader.onload = function(e) {
        fiveInsuranceArray = parseResult(e.target.result); //this is where the csv array will be
    };
    reader.readAsText(f);
});

var averageWageFile = document.getElementById('averageWage');
averageWageFile.addEventListener('change', function() {
    var reader = new FileReader();
    var f = averageWageFile.files[0];
    reader.onload = function(e) {
        averageWageArray = parseResult(e.target.result); //this is where the csv array will be
        avrWage = averageWageArray[1][0];
    };
    reader.readAsText(f);
});

var standardFile = document.getElementById('standard');
standardFile.addEventListener('change', function() {
    var reader = new FileReader();
    var f = standardFile.files[0];
    reader.onload = function(e) {
        standardArray = parseResult(e.target.result); //this is where the csv array will be
    };
    reader.readAsText(f);
});

var staffListingFile = document.getElementById('staffListing');
staffListingFile.addEventListener('change', function() {
    var reader = new FileReader();
    var f = staffListingFile.files[0];
    reader.onload = function(e) {
        staffListingArray = parseResult(e.target.result); //this is where the csv array will be
        staffListingArray2 = parseResult(e.target.result);
        staffListingArray2.shift();
    };
    reader.readAsText(f);
});

function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function(row) {
        var rowArray = [];
        row.split(",").forEach(function(cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });
    return resultArray;
}

function createTable(array, output) {
    var content = "";
    array.forEach(function(row) {
        content += "<tr>";
        row.forEach(function(cell) {
            content += "<td>" + cell + "</td>" ;
        });
        content += "</tr>";
    });
    document.getElementById(output).innerHTML = content;
}

// use onclick to trigger createTable() function
btn1.onclick = function () {
    createTable(taxRateArray, "taxRateOut");
}

btn2.onclick = function () {
    createTable(fiveInsuranceArray, "fiveInsuranceOut");
}

btn3.onclick = function () {
    createTable(averageWageArray, "averageWageOut");
}

btn4.onclick = function () {
    createTable(standardArray, "standardOut");
}

btn5.onclick = function () {
    createTable(staffListingArray, "staffListingOut");
}

btnPrint.onclick = function () {
    calculate(staffListingArray2);
}

btnCalculate.onclick = function () {
    inputArray = [
        // ["Name", "Salary", "Performance-related Pay", "Housing Fund Percentage"],
        [document.getElementById("inputName").value, document.getElementById("inputSalary").value, document.getElementById("inputPerformance").value, document.getElementById("inputFund").value]
    ]
    calculate(inputArray);
}

// calculation part
function calculate(array) {
    var content1 = "";
    var content2 = "";

    endowment_com = fiveInsuranceArray[1][1];
    endowment_per = fiveInsuranceArray[2][1];
    medical_com = fiveInsuranceArray[1][2];
    medical_per = fiveInsuranceArray[2][2];
    unemployment_com = fiveInsuranceArray[1][3];
    unemployment_per = fiveInsuranceArray[2][3];
    maternity_com = fiveInsuranceArray[1][4];
    maternity_per = fiveInsuranceArray[2][4];
    injury_com = fiveInsuranceArray[1][5];
    injury_per = fiveInsuranceArray[2][5];

    avrWage = averageWageArray[1][0];

    // read each staff and calculate
    // var staffListingArray2 = [];
    // for (var i = 0; i < staffListingArray.length; i++) {
    //     for (var j = 0; j < staffListingArray[0].length; j++) {
    //         staffListingArray2.push(staffListingArray[i][j]);
    //     }
    // }
    //array.shift();
    array.forEach(function (row) {
        // add column name
        content1 += "<tr>";
        content1 += "<td>";
        content1 += " ";
        content1 += "</td>";
        content1 += "<td>";
        content1 += row[0];
        content1 += "</td>";
        content1 += "<td>";
        content1 += "company";
        content1 += "</td>";
        content1 += "</tr>";

        var salary = row[1];
        var performance = row[2];
        var fund = row[3];
        var insurancePer;
        var insuranceCom;

        if (salary > avrWage * 3) {
            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Endowment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * endowment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * endowment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Medicare";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * medical_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * medical_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Unemployment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * unemployment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * unemployment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Maternity";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * maternity_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * maternity_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Injury";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * injury_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * injury_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Housing";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * fund;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 3 * fund;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Total";
            content1 += "</td>";
            content1 += "<td>";
            insurancePer = parseFloat(avrWage) * 3 * (parseFloat(endowment_per) + parseFloat(medical_per) + parseFloat(unemployment_per) + parseFloat(maternity_per) + parseFloat(injury_per) + parseFloat(fund));
            content1 += insurancePer;
            content1 += "</td>";
            content1 += "<td>";
            insuranceCom = parseFloat(avrWage) * 3 * (parseFloat(endowment_com) + parseFloat(medical_com) + parseFloat(unemployment_com) + parseFloat(maternity_com) + parseFloat(injury_com) + parseFloat(fund));
            content1 += insuranceCom;
            content1 += "</td>";
            content1 += "</tr>";
        } else if (salary < avrWage * 0.6) {
            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Endowment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * endowment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * endowment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Medicare";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * medical_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * medical_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Unemployment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * unemployment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * unemployment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Maternity";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * maternity_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * maternity_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Injury";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * injury_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * injury_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Housing";
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * row[3];
            content1 += "</td>";
            content1 += "<td>";
            content1 += avrWage * 0.6 * row[3];
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Total";
            content1 += "</td>";
            content1 += "<td>";
            insurancePer = parseFloat(avrWage) * 0.6 * (parseFloat(endowment_per) + parseFloat(medical_per) + parseFloat(unemployment_per) + parseFloat(maternity_per) + parseFloat(injury_per) + parseFloat(fund));
            content1 += insurancePer;
            content1 += "</td>";
            content1 += "<td>";
            insuranceCom = parseFloat(avrWage) * 0.6 * (parseFloat(endowment_com) + parseFloat(medical_com) + parseFloat(unemployment_com) + parseFloat(maternity_com) + parseFloat(injury_com) + parseFloat(fund));
            content1 += insuranceCom;
            content1 += "</td>";
            content1 += "</tr>";
        } else {
            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Endowment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * endowment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * endowment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Medicare";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * medical_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * medical_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Unemployment";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * unemployment_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * unemployment_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Maternity";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * maternity_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * maternity_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Injury";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * injury_per;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * injury_com;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Housing";
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * fund;
            content1 += "</td>";
            content1 += "<td>";
            content1 += salary * fund;
            content1 += "</td>";
            content1 += "</tr>";

            content1 += "<tr>";
            content1 += "<td>";
            content1 += "Total";
            content1 += "</td>";
            content1 += "<td>";
            insurancePer = parseFloat(salary) * (parseFloat(endowment_per) + parseFloat(medical_per) + parseFloat(unemployment_per) + parseFloat(maternity_per) + parseFloat(injury_per) + parseFloat(fund));
            content1 += insurancePer;
            content1 += "</td>";
            content1 += "<td>";
            insuranceCom = parseFloat(salary) * (parseFloat(endowment_com) + parseFloat(medical_com) + parseFloat(unemployment_com) + parseFloat(maternity_com) + parseFloat(injury_com) + parseFloat(fund));
            content1 += insuranceCom;
            content1 += "</td>";
            content1 += "</tr>";
        }

        // add column name
        content2 += "<tr>";
        content2 += "<td>";
        content2 += "Name";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Salary";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Performance-related Pay";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Insurance and Housing Fund(personal)";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Insurance and Housing Fund(company)";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Pre-tax income";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "Tax";
        content2 += "</td>";
        content2 += "<td>";
        content2 += "After-tax income";
        content2 += "</td>";
        content2 += "</tr>";

        content2 += "<tr>";
        content2 += "<td>";
        content2 += row[0];
        content2 += "</td>";
        content2 += "<td>";
        content2 += salary;
        content2 += "</td>";
        // get performance-related pay
        var performance;
        if (row[2] == 'A') {
            content2 += "<td>";
            performance = standardArray[1][0];
            content2 += performance;
            content2 += "</td>";
        } else if (row[2] == 'B') {
            content2 += "<td>";
            performance = standardArray[1][1];
            content2 += performance;
            content2 += "</td>";
        } else if (row[2] == 'C') {
            content2 += "<td>";
            performance = standardArray[1][2];
            content2 += performance;
            content2 += "</td>";
        } else {
            content2 += "<td>";
            performance = standardArray[1][3];
            content2 += performance;
            content2 += "</td>";
        }

        content2 += "<td>";
        content2 +=  insurancePer;
        content2 += "</td>";
        content2 += "<td>";
        content2 +=  insuranceCom;
        content2 += "</td>";

        // pretax income
        var preTax = parseFloat(salary) + parseFloat(performance) - parseFloat(insurancePer);
        content2 += "<td>";
        content2 += preTax;
        content2 += "</td>";

        //tax
        var tax = 0;
        var length = taxRateArray[0].length;
        var extra = preTax - 3500;

        if (extra < 0) {
            tax = 0;
        } else if (extra > parseFloat(taxRateArray[0][length - 1])) {
            for (var i = 1; i < length; i++) {
                tax += (parseFloat(taxRateArray[0][i]) - parseFloat(taxRateArray[0][i - 1])) * parseFloat(taxRateArray[1][i - 1]);
            }
            tax += (extra - parseFloat(taxRateArray[0][length - 1])) * parseFloat(taxRateArray[1][length - 1]);
        } else {
            for (var i = 0; i < length - 1; i++) {
                if (extra >= parseFloat(taxRateArray[0][i]) && extra < parseFloat(taxRateArray[0][i + 1])) {
                    if (i == 0) {
                        tax = extra * parseFloat(taxRateArray[1][i]);
                    } else {
                        for (var k = 0; k < i; k++) {
                            tax += (parseFloat(taxRateArray[0][k + 1]) - parseFloat(taxRateArray[0][k])) * parseFloat(taxRateArray[1][k]);
                        }
                        tax += (extra - parseFloat(taxRateArray[0][i])) * parseFloat(taxRateArray[1][i]);
                    }
                }
            }
        }
        content2 += "<td>";
        content2 += tax;
        content2 += "</td>";

        // after-tex income
        content2 += "<td>";
        content2 += preTax - tax;
        content2 += "</td>";
    })

    document.getElementById("content1").innerHTML = content1;
    document.getElementById("content2").innerHTML = content2;
}