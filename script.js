// ==========================================
// MediLens AI
// Medical Report Analyzer
// ==========================================


// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


// DOM ELEMENTS

const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");

const loading = document.getElementById("loading");
const results = document.getElementById("results");

const resultsTable = document.getElementById("resultsTable");
const explanationContent =
    document.getElementById("explanationContent");

const totalTests =
    document.getElementById("totalTests");

const normalTests =
    document.getElementById("normalTests");

const attentionTests =
    document.getElementById("attentionTests");

const highTests =
    document.getElementById("highTests");

const downloadBtn =
    document.getElementById("downloadBtn");


// STORE SELECTED FILE

let selectedFile = null;

let extractedText = "";

let analysisResults = [];


// ==========================================
// FILE SELECTION
// ==========================================

fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    handleFile(file);

});


// ==========================================
// HANDLE FILE
// ==========================================

function handleFile(file) {

    if (file.type !== "application/pdf") {

        alert("Please upload a PDF file.");

        return;
    }


    selectedFile = file;

    fileName.textContent =
        "📄 " + file.name;

    analyzeBtn.disabled = false;

}


// ==========================================
// DRAG & DROP
// ==========================================

uploadBox.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadBox.classList.add("dragover");

});


uploadBox.addEventListener("dragleave", function () {

    uploadBox.classList.remove("dragover");

});


uploadBox.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadBox.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    if (file) {

        handleFile(file);

    }

});


// ==========================================
// ANALYZE BUTTON
// ==========================================

analyzeBtn.addEventListener("click", async function () {

    if (!selectedFile) {

        alert("Please select a PDF first.");

        return;
    }


    // Hide previous results

    results.classList.add("hidden");

    // Show loading

    loading.classList.remove("hidden");

    analyzeBtn.disabled = true;


    try {

        extractedText =
            await extractPDFText(selectedFile);


        // Small delay for realistic UI

        await new Promise(resolve =>
            setTimeout(resolve, 1200)
        );


        analysisResults =
            analyzeMedicalText(extractedText);


        displayResults(analysisResults);


        loading.classList.add("hidden");

        results.classList.remove("hidden");


        // Scroll to results

        results.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        loading.classList.add("hidden");

        analyzeBtn.disabled = false;

        alert(
            "Could not analyze this PDF. " +
            "Please try another text-based medical report."
        );

    }

});


// ==========================================
// EXTRACT PDF TEXT
// ==========================================

async function extractPDFText(file) {

    const arrayBuffer =
        await file.arrayBuffer();


    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;


    let text = "";


    for (let pageNumber = 1;
         pageNumber <= pdf.numPages;
         pageNumber++) {


        const page =
            await pdf.getPage(pageNumber);


        const content =
            await page.getTextContent();


        const pageText =
            content.items
                .map(item => item.str)
                .join(" ");


        text += pageText + "\n";

    }


    return text;

}


// ==========================================
// MEDICAL TEST DEFINITIONS
// ==========================================

const medicalTests = [

    {
        name: "Hemoglobin",
        keywords: ["hemoglobin", "haemoglobin", "hb"],
        min: 12,
        max: 17,
        unit: "g/dL",
        explanation:
            "Hemoglobin is a protein in red blood cells that carries oxygen throughout the body."
    },

    {
        name: "Glucose",
        keywords: ["glucose", "blood sugar", "fasting glucose"],
        min: 70,
        max: 100,
        unit: "mg/dL",
        explanation:
            "Glucose is the main sugar found in the blood and is an important source of energy."
    },

    {
        name: "Vitamin D",
        keywords: ["vitamin d", "25-oh vitamin d", "25 oh vitamin d"],
        min: 30,
        max: 100,
        unit: "ng/mL",
        explanation:
            "Vitamin D helps the body maintain healthy bones and supports several normal body functions."
    },

    {
        name: "Total Cholesterol",
        keywords: ["total cholesterol", "cholesterol"],
        min: 0,
        max: 200,
        unit: "mg/dL",
        explanation:
            "Cholesterol is a waxy substance that the body needs, but its level is one factor considered when assessing cardiovascular health."
    },

    {
        name: "HDL Cholesterol",
        keywords: ["hdl", "hdl cholesterol"],
        min: 40,
        max: 100,
        unit: "mg/dL",
        explanation:
            "HDL is commonly known as a type of cholesterol involved in transporting cholesterol in the bloodstream."
    },

    {
        name: "LDL Cholesterol",
        keywords: ["ldl", "ldl cholesterol"],
        min: 0,
        max: 130,
        unit: "mg/dL",
        explanation:
            "LDL is a type of cholesterol that healthcare professionals consider when assessing cardiovascular risk."
    },

    {
        name: "Triglycerides",
        keywords: ["triglycerides", "triglyceride"],
        min: 0,
        max: 150,
        unit: "mg/dL",
        explanation:
            "Triglycerides are a type of fat found in the blood and are commonly included in lipid testing."
    },

    {
        name: "Creatinine",
        keywords: ["creatinine"],
        min: 0.6,
        max: 1.3,
        unit: "mg/dL",
        explanation:
            "Creatinine is a waste product commonly measured as part of kidney-related laboratory testing."
    },

    {
        name: "Sodium",
        keywords: ["sodium"],
        min: 135,
        max: 145,
        unit: "mmol/L",
        explanation:
            "Sodium is an electrolyte that helps regulate fluid balance and supports nerve and muscle function."
    },

    {
        name: "Potassium",
        keywords: ["potassium"],
        min: 3.5,
        max: 5.1,
        unit: "mmol/L",
        explanation:
            "Potassium is an electrolyte important for normal nerve, muscle and heart function."
    }

];


// ==========================================
// ANALYZE MEDICAL TEXT
// ==========================================

function analyzeMedicalText(text) {

    const normalizedText =
        text.toLowerCase();

    const results = [];


    medicalTests.forEach(test => {

        let found = false;

        let value = null;


        for (const keyword of test.keywords) {

            const escaped =
                keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


            /*
                Searches for patterns such as:

                Hemoglobin 13.5
                Glucose: 95
                Vitamin D - 22
            */

            const regex = new RegExp(
                escaped +
                "\\s*[:\\-]?\\s*" +
                "(\\d+(?:\\.\\d+)?)",
                "i"
            );


            const match =
                text.match(regex);


            if (match) {

                value =
                    parseFloat(match[1]);

                found = true;

                break;

            }

        }


        if (!found) {
            return;
        }


        let status = "Normal";


        if (value < test.min) {

            status = "Attention";

        }


        if (value > test.max) {

            status = "Outside Range";

        }


        results.push({

            name: test.name,

            value: value,

            unit: test.unit,

            min: test.min,

            max: test.max,

            status: status,

            explanation: test.explanation

        });

    });


    return results;

}


// ==========================================
// DISPLAY RESULTS
// ==========================================

function displayResults(data) {

    resultsTable.innerHTML = "";

    explanationContent.innerHTML = "";


    let normal = 0;
    let attention = 0;
    let high = 0;


    if (data.length === 0) {

        resultsTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No supported test values were automatically detected.
                    The PDF may contain scanned images or use a different format.
                </td>
            </tr>
        `;


        explanationContent.innerHTML = `
            <div class="explanation-item">
                <strong>Report text detected</strong>
                <p>
                    The uploaded PDF could not be matched against the
                    currently supported laboratory tests. More test
                    types can be added to the analyzer.
                </p>
            </div>
        `;

    }


    data.forEach(item => {

        if (item.status === "Normal") {

            normal++;

        } else if (item.status === "Attention") {

            attention++;

        } else {

            high++;

        }


        let statusClass = "status-normal";


        if (item.status === "Attention") {

            statusClass = "status-attention";

        }


        if (item.status === "Outside Range") {

            statusClass = "status-high";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${item.name}</strong>
            </td>

            <td>
                ${item.value} ${item.unit}
            </td>

            <td>
                ${item.min} - ${item.max} ${item.unit}
            </td>

            <td>
                <span class="status-badge ${statusClass}">
                    ${item.status}
                </span>
            </td>

        `;


        resultsTable.appendChild(row);


        const explanation =
            document.createElement("div");


        explanation.className =
            "explanation-item";


        explanation.innerHTML = `

            <strong>
                ${item.name}
            </strong>

            <p>
                ${item.explanation}
            </p>

        `;


        explanationContent.appendChild(
            explanation
        );

    });


    totalTests.textContent =
        data.length;

    normalTests.textContent =
        normal;

    attentionTests.textContent =
        attention;

    highTests.textContent =
        high;

}


// ==========================================
// DOWNLOAD SUMMARY
// ==========================================

downloadBtn.addEventListener(
    "click",
    function () {

        let report = "";

        report +=
            "MEDILENS AI - MEDICAL REPORT SUMMARY\n";

        report +=
            "=====================================\n\n";


        report +=
            "Total Tests Found: " +
            analysisResults.length +
            "\n\n";


        analysisResults.forEach(item => {

            report +=
                `${item.name}\n`;

            report +=
                `Result: ${item.value} ${item.unit}\n`;

            report +=
                `Reference Range: ${item.min} - ${item.max} ${item.unit}\n`;

            report +=
                `Status: ${item.status}\n`;

            report +=
                `Explanation: ${item.explanation}\n\n`;

        });


        report +=
            "IMPORTANT DISCLAIMER\n";

        report +=
            "This report is for educational purposes only. " +
            "It does not provide a medical diagnosis and " +
            "should not replace advice from a qualified healthcare professional.\n";


        const blob =
            new Blob(
                [report],
                { type: "text/plain" }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "MediLens-Medical-Summary.txt";


        link.click();


        URL.revokeObjectURL(url);

    }
);