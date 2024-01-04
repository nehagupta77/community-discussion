var row = null;

function Submit() {
    if (!validateAddress()) {
        return false;
    }

    var dataEntered = retrieveData();
    storingDataInLocalStorage(dataEntered);

    // The condition checks if any of the fields in dataEntered is empty
    if (dataEntered.some(field => field.trim() === '')) {
        alert('Please fill in all fields!');
        return false;
    }

    insertOrUpdate();

    document.getElementById("form").reset();
}

// Validate address
function validateAddress() {
    var addressValue = document.getElementById("address").value.trim();
    if (addressValue === '') {
        alert('Please enter address!');
        return false;
    }
    return true;
}

// Create and retrieve data from form 
function retrieveData() {
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var contact = document.getElementById("contact").value;
    //var password = document.getElementById("password").value;

    var arr = [userName, email, address, contact]; //, password
    return arr;
}

// Read: Store data in local storage
function storingDataInLocalStorage(dataEntered) {
    localStorage.setItem("userName", dataEntered[0]);
    localStorage.setItem("Email", dataEntered[1]);
    localStorage.setItem("Address", dataEntered[2]);
    localStorage.setItem("Content", dataEntered[3]);
    //localStorage.setItem("Password", dataEntered[4]);

    // Log stored values
    console.log("Stored Values:");
    console.log("UserName: " + localStorage.getItem("userName"));
    console.log("Email: " + localStorage.getItem("Email"));
    console.log("Address: " + localStorage.getItem("Address"));
    console.log("Content: " + localStorage.getItem("Content"));
    //console.log("Password: " + localStorage.getItem("Password"));
}

// Insert or Update based on the value of 'row'
function insertOrUpdate() {
    if (row == null) {
        insert(retrieveData());
        console.log("Data Inserted");
    } else {
        Update();
        console.log("Data Updated");
    }
}

// Insert
function insert(readData) {
    var table = document.getElementById("table");
    var newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = readData[0];
    newRow.insertCell(1).innerHTML = readData[1];
    newRow.insertCell(2).innerHTML = readData[2];
    newRow.insertCell(3).innerHTML = readData[3];
    //newRow.insertCell(4).innerHTML = readData[4];
    newRow.insertCell(4).innerHTML = `<button onclick="edit(this)">Edit</button> 
                                   <button onclick="remove(this)">Delete</button>`;
}

// Edit
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("userName").value = row.cells[0].innerHTML;
    document.getElementById("email").value = row.cells[1].innerHTML;
    document.getElementById("address").value = row.cells[2].innerHTML;
    document.getElementById("contact").value = row.cells[3].innerHTML;
    //document.getElementById("password").value = row.cells[4].innerHTML;
}

// Update
function Update() {
    row.cells[0].innerHTML = document.getElementById("userName").value;
    row.cells[1].innerHTML = document.getElementById("email").value;
    row.cells[2].innerHTML = document.getElementById("address").value;
    row.cells[3].innerHTML = document.getElementById("contact").value;
    row.cells[4].innerHTML = document.getElementById("password").value;
    row = null;
}

// Delete
function remove(td) {
    var ans = confirm("Are you sure you want to delete this record?");
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
    }
}
