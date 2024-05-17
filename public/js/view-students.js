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
            <td>
    <button class="btn btn-danger delete-btn" data-matric-number="${student.matric_number}">Delete</button>
</td>
        `;

        tbody.appendChild(row);
    })

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            // Ask for confirmation before deleting
            const confirmed = confirm('Are you sure you want to delete this student?');
            
            if (!confirmed) {
                return; // Cancel the delete operation
            }
    
            const matricNumber = event.target.getAttribute('data-matric-number');
            try {
                const response = await fetch(`/api/get-student?matric=${matricNumber}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Remove the deleted student's row from the table
                    event.target.closest('tr').remove();
                    alert('Student deleted successfully');
                } else {
                    alert('Error deleting student');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting student');
            }
        });
    });
    }catch(err){
        window.location.href = '/';
            alert('signup !!!');
    }
    ;
}        