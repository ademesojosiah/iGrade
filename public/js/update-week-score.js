  document.getElementById('update-week-score-form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const student = {
            matric_number: document.getElementById('matric-number').value,
            week_number: document.getElementById('week-number').value,
            score: document.getElementById('score').value,
        };
    
        try {
            const response = await fetch('/api/update-week-score', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
    
            if (response.status === 401) {
                window.location.href = '/';
                alert('signup !!!');
            }else if (response.ok) {
                alert('Week score updated successfully!');
                document.getElementById('update-week-score-form').reset();
                document.getElementById('student-info').innerHTML = '';
            } else {
                alert('Error updating score.');
            }
        } catch (err) {
            console.error('Error updating score', err);
            alert('Error updating score.');
        }
    });

    document.getElementById('fetch-student-info').addEventListener('click', async () => {
    const matricNumber = document.getElementById('matric-number').value;

    if (matricNumber.trim() === '') {
        alert('Please enter a matric number.');
        return;
    }

    try {
        const response = await fetch(`/api/get-student?matric=${matricNumber}`);


        if (response.status === 401) {
            window.location.href = '/';
            alert('signup !!!');
        }else if (response.ok) {
            const student = await response.json();
            displayStudentInfo(student);
        } else {
            alert('Student not found.');
            document.getElementById('student-info').innerHTML = '';
        }
    } catch (err) {
        console.error('Error fetching student info', err);
        alert('Error fetching student info.');
    }
});

function displayStudentInfo(student) {
    const studentInfoDiv = document.getElementById('student-info');
    studentInfoDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <p class="card-text">Matric Number: ${student.matric_number}</p>
                <p class="card-text">Department: ${student.department}</p>
                <p class="card-text">Week 1 Score: ${student.week1 || 'N/A'}</p>
                <p class="card-text">Week 2 Score: ${student.week2 || 'N/A'}</p>
                <p class="card-text">Week 3 Score: ${student.week3 || 'N/A'}</p>
            </div>
        </div>
    `;
}


