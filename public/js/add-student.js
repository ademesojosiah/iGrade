document.getElementById('add-student-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const student = {
        matric_number: document.getElementById('matric-number').value,
        first_name: document.getElementById('first-name').value,
        middle_name: document.getElementById('middle-name').value,
        last_name: document.getElementById('last-name').value,
        department: document.getElementById('department').value,
    };

    try {
        const response = await fetch('/api/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (response.status === 401) {
            window.location.href = '/';
            alert('signup !!!');
        }else if (response.ok) {
            alert('Student added successfully!');
            document.getElementById('add-student-form').reset();
        } else {
            alert('Error adding student.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding student.');
    }
});

