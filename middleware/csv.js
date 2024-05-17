const { createObjectCsvStringifier } = require('csv-writer');

// Function to generate CSV string from student data
const generateCSVString = (students) => {
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'matric_number', title: 'Matric Number' },
            { id: 'first_name', title: 'First Name' },
            { id: 'middle_name', title: 'Middle Name' },
            { id: 'last_name', title: 'Last Name' },
            { id: 'department', title: 'Department' },
            { id: 'week1', title: 'Week 1' },
            { id: 'week2', title: 'Week 2' },
            { id: 'week3', title: 'Week 3' }
        ]
    });

    const csvHeader = csvStringifier.getHeaderString();
    const csvRecords = csvStringifier.stringifyRecords(students);

    return csvHeader + '\n' + csvRecords;
};

module.exports = {generateCSVString};