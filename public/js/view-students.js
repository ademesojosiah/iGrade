document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch students initially
        await fetchStudents();

        // Add event listener for search button
        document.getElementById('search-btn').addEventListener('click', async () => {
            const searchInput = document.getElementById('search-input').value.trim().toUpperCase();
            await fetchStudents(searchInput);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
});

async function fetchStudents(searchQuery = '') {
    try{
    const response = await fetch('/api/students');
    if (response.status === 401) {
        window.location.href = '/';
        alert('signup !!!');
    }
    const students = await response.json();
    const tbody = document.getElementById('students-table-body');

    // Clear previous content
    tbody.innerHTML = '';

    students.forEach(student => {
        // Check if searchQuery matches matric number
        if (searchQuery && !student.matric_number.includes(searchQuery)) {
            return; // Skip iteration if not matched
        }

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.matric_number}</td>
            <td>${student.first_name}</td>
            <td>${student.middle_name}</td>
            <td>${student.last_name}</td>
            <td>${student.department}</td>
            <td>${student.week1 || ''}</td>
            <td>${student.week2 || ''}</td>
            <td>${student.week3 || ''}</td>
        `;

        tbody.appendChild(row);
    })
    }catch(err){
        window.location.href = '/';
            alert('signup !!!');
    }
    ;
}        