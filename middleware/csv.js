const { createObjectCsvStringifier } = require('csv-writer');

// Function to generate CSV string from student data
const generateCSVString = (students) => {
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'id', title: 'S/N' },
            { id: 'session', title: 'session' },
            { id: 'semester', title: 'semester' },
            { id: 'course', title: 'course' },
            { id: 'course_unit', title: 'course unit' },
            { id: 'matric_number', title: 'Reg No' },
            { id: 'name', title: 'Name' },
            { id: 'part', title: 'Part' },
            { id: 'department', title: 'Department' },
            { id: 'week1', title: 'Week 1' },
            { id: 'week2', title: 'Week 2' },
            { id: 'week3', title: 'Week 3' },
            { id: 'week4', title: 'Week 4' }
        ]
    });

    const csvHeader = csvStringifier.getHeaderString();
    const csvRecords = csvStringifier.stringifyRecords(students);

    return csvHeader + '\n' + csvRecords;
};

module.exports = {generateCSVString};