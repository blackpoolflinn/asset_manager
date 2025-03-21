import React from "react";

const exportToCSV = (data, filename = "inventory.csv") => {
    if (!data || data.length === 0) {
        console.error("No data provided for CSV export");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    data.forEach(row => {
        const values = headers.map(header => JSON.stringify(row[header] || ""));
        csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const CsvDownloader = ({ data }) => {
    return (
        <button onClick={() => exportToCSV(data)} className="bg-green-500 text-white px-3 py-2 rounded">Export CSV</button>
    );
};

export default CsvDownloader;
