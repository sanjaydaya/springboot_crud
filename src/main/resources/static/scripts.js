document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    document.getElementById('saveUserButton').addEventListener('click', function() {
        const id = document.getElementById('userId').value;
        const name = document.getElementById('userName').value;
        const age = document.getElementById('userAge').value;
        const address = document.getElementById('userAddress').value;

        const user = { name, age, address };
        if (id) {
            // Update user
            fetch(`/user/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => loadUsers());
        } else {
            // Add new user
            fetch('/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => loadUsers());
        }

        $('#userModal').modal('hide');
    });
});

function loadUsers() {
    fetch('/user')
        .then(response => response.json())
        .then(users => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.address}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        });
}

function editUser(id) {
    fetch(`/user/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('userName').value = user.name;
            document.getElementById('userAge').value = user.age;
            document.getElementById('userAddress').value = user.address;
            $('#userModal').modal('show');
        });
}

function deleteUser(id) {
    fetch(`/user/delete/${id}`, {
        method: 'DELETE'
    }).then(() => loadUsers());
}
