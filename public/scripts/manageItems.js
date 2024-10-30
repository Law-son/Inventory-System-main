async function fetchItemData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        loadItemData(data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


async function fetchArchiveData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/archives/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        loadArchiveData(data);
    } catch (error) {
        console.error('Error fetching archives:', error);
    }
}

function archiveItem(event) {
    const button = event.target;
    const row = button.closest('tr');
    const id = row ? row.id : null;
    const token = localStorage.getItem('authToken');

    console.log("Button clicked:", button);
    console.log("Row element:", row);
    console.log("Extracted row_id:", id);

    if (!id) {
        console.error("ID not found for the row. Ensure each item has a unique ID.");
        return;
    }

    // fetch(`http://127.0.0.1:8000/items/archive/${id}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Token ${token}`
    //     }
    // })
    // .then(response => { 
    //     if (!response.ok) {
    //         throw new Error('Error archiving item');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     alert('Item archived successfully!');
    //     fetchItemData();
    //     fetchArchiveData();
    // })
    // .catch(error => {
    //     console.error(error);
    //     alert(error.message);
    // });
}

function loadItemData(data) {
    const tableBody = document.getElementById('itemsBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Ensure item.id is a valid unique identifier

        if (item.quantity <= item.reorder_quantity) {
            row.classList.add('bg-red-400', 'text-white');
        }

        row.innerHTML = `
          <td class="p-3 text-center">${index + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button class="text-blue-600 mr-3 updateBtn">Update</button>
            <button class="text-red-600 archiveBtn">Archive</button>
          </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach a single event listener to the table body for event delegation
    tableBody.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('archiveBtn')) {
            archiveItem(event); // Call archiveItem function
        }
    });
}



function loadArchiveData(data) {
    const tableBody = document.getElementById('archiveBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row

        row.innerHTML = `
          <td class="p-3 text-center">${data.indexOf(item) + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button id="restoreBtn" class="text-blue-600 mr-3">Restore</button>
            <button id="deleteBtn" class="text-red-600">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);
    });
}

function filterItems() {
    const searchInput = document.getElementById('searchItems').value.toLowerCase();
    const rows = document.querySelectorAll('#itemsBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name;
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}


function filterArchives() {
    const searchInput = document.getElementById('searchArchives').value.toLowerCase();
    const rows = document.querySelectorAll('#archiveBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name;
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}


// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
};
function loadItemData(data) {
    const tableBody = document.getElementById('itemsBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row
        row.dataset.name = item.name.toLowerCase(); // Store name in lowercase for filtering

        if (item.quantity <= item.reorder_quantity) {
            row.classList.add('bg-red-400');
            row.classList.add('text-white');
        }

        row.innerHTML = `
          <td class="p-3 text-center">${data.indexOf(item) + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button class="text-blue-600 mr-3">Update</button>
            <button class="text-red-600">Archive</button>
          </td>
        `;

        tableBody.appendChild(row);
    });
}

function loadArchiveData(data) {
    const tableBody = document.getElementById('archiveBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row
        row.dataset.name = item.name.toLowerCase(); // Store name in lowercase for filtering

        row.innerHTML = `
          <td class="p-3 text-center">${data.indexOf(item) + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button class="text-blue-600 mr-3">Restore</button>
            <button class="text-red-600">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);
    });
}

function filterItems() {
    const searchInput = document.getElementById('searchItems').value.toLowerCase();
    const rows = document.querySelectorAll('#itemsBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name; // Access the data-name attribute
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}

function filterArchives() {
    const searchInput = document.getElementById('searchArchives').value.toLowerCase();
    const rows = document.querySelectorAll('#archiveBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name; // Access the data-name attribute
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}

function createItem(event) {
    event.preventDefault();
    const addItemForm = document.getElementById('addItemForm');
    const button = document.getElementById('addFormData');
    const originalText = button?.textContent;
    const token = localStorage.getItem('authToken');
    if (button) button.textContent = "Add..."; 
    const modal = document.getElementById('itemForm');
    
    const data = { 
        name: document.getElementById('name').value || '',
        description: document.getElementById('description').value || '',
        quantity: document.getElementById('quantity').value || '',
        reorder_quantity: document.getElementById('reorder-quantity').value || '',
        price: document.getElementById('price').value || '',
        category_id: parseInt(document.getElementById('category').value) || 1,
        unit_id: parseInt(document.getElementById('unit').value) || 1
    };

    console.log(data);

    fetch('http://127.0.1:8000/items/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error adding item');
        }
        return response.json();
    })
    .then(data => {
        alert('Item added successfully!');
        fetchItemData();
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    })
    .finally(() => {
        modal.classList.add('hidden');
        button.textContent = originalText;
    });
}


document.getElementById('addFormData').addEventListener('click', createItem);


// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
};
