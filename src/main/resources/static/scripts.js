document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    document.getElementById('saveUserButton').addEventListener('click', function() {
        const id = document.getElementById('userId').value;
        const user = {
            name: document.getElementById('userName').value,
            age: document.getElementById('userAge').value,
            address: document.getElementById('userAddress').value
        };
        if (id) {
            updateUser(id, user);
        } else {
            addUser(user);
        }
    });
});

function loadUsers() {
    fetch('/user')
        .then(response => response.json())
        .then(users => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.address}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                </tr>`;
                userTableBody.innerHTML += row;
            });
        });
}

function addUser(user) {
    fetch('/user/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        loadUsers();
        $('#userModal').modal('hide');
    });
}

function updateUser(id, user) {
    fetch(`/user/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        loadUsers();
        $('#userModal').modal('hide');
    });
}

function deleteUser(id) {
    fetch(`/user/delete/${id}`, {
        method: 'DELETE'
    }).then(() => {
        loadUsers();
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
