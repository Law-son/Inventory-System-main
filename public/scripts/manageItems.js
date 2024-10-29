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

function loadItemData(data) {
    const tableBody = document.getElementById('itemsBody');
    tableBody.innerHTML = ''; 

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row

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

// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
};
