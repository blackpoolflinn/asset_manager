import React from "react";

const exportToCSV = (data, filename = "inventory.csv") => {

    // checks if data is empty or undefined
    if (!data || data.length === 0) {
        console.error("No data provided for CSV export");
        return;
    }

    // extracts headers for product_name etc ..
    const headers = Object.keys(data[0]);
    // creates an array to store csv content
    const csvRows = [headers.join(",")];

    // loops through each row of items
    data.forEach(row => {
        const values = headers.map(header => JSON.stringify(row[header] || ""));
        csvRows.push(values.join(","));
    });

    // joins all rows into a single string
    const csvString = csvRows.join("\n");

    // creates a blob (Binary Large Object) containing the CSV text, specifiying file type
    const blob = new Blob([csvString], { type: "text/csv" });

    // gives a temporary url that represents csv file
    const url = URL.createObjectURL(blob);

    // creates anchor element used to trigger file download via href tag
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // adds link to csv button
    document.body.appendChild(link);

    // auto downloads the element
    link.click();

    // removes link from the element
    document.body.removeChild(link);
};

const CsvDownloader = ({ data }) => {
    return (
        <button onClick={() => exportToCSV(data)} className="bg-green-500 text-white px-3 py-2 rounded">Export CSV</button>
    );
};

export default CsvDownloader;
