async function fetchCategories() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/categories/', {
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
        console.log("categories", data);
        loadCategories(data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

document.getElementById('categoryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const categoryName = document.getElementById('categoryName')?.value;
    const button = document.getElementById('addCategoryBtn');
    const originalText = button?.textContent;
    if (button) button.textContent = "Adding...";
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/category/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ name: categoryName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        alert('Category added successfully!');
        fetchCategories();
        document.getElementById('categoryName').value = '';
    } catch (error) {
        console.error('Error adding category:', error);
        alert(error.message);
    } finally {
        if (button) button.textContent = originalText;
    }
});

document.getElementById('unitForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const unitName = document.getElementById('unitName')?.value;
    const button = document.getElementById('addUnitBtn');
    const originalText = button?.textContent;
    if (button) button.textContent = "Adding...";
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/unit/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ name: unitName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        alert('unit added successfully!');
        fetchUnits();
        document.getElementById('unitName').value = '';
    } catch (error) {
        console.error('Error adding unit:', error);
        alert(error.message);
    } finally {
        if (button) button.textContent = originalText;
    }
});


async function fetchUnits() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/units/', {
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
        console.log("units", data);
        loadUnits(data);
    } catch (error) {
        console.error('Error fetching archives:', error);
    }
}

function loadCategories(data) {
    const categoryList = document.getElementById('categoryList');
    const categoryDropdown = document.getElementById('category');
    
    categoryList.innerHTML = '';
    categoryDropdown.innerHTML = '';

    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}`;
        categoryList.appendChild(listItem);

        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        option.id = item.id;
        categoryDropdown.appendChild(option);
    }); 
}


function loadUnits(data) {
    const unitList = document.getElementById('unitList');
    const unitDropdown = document.getElementById('unit');
    unitList.innerHTML = '';
    unitDropdown.innerHTML = '';

    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}`;
        unitList.appendChild(listItem);

        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        option.id = item.id;
        unitDropdown.appendChild(option);
    });
}



// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
    fetchCategories();
    fetchUnits();
};