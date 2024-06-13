import {CustomerModel} from '/model/CustomerModel.js'
import {customers} from '/db/db.js'


var searchItemIndex = undefined;

// save button action
$("#customer-save").eq(0).on('click', () => {
    var mobile = $('#customer-id').val();
    var name = $('#customer-name').val();
    var email = $('#customer-email').val();
    var address = $('#customer-address').val();


    if (!validateCustomerMobile(mobile) || !validateCustomerName(name) || !validateCustomerEmail(email) || !validateCustomerAddress(address)) {
        alert("Failed to save");
        return;
    }

    saveCustomer(new CustomerModel(mobile,name,email,address));

    loadCustomerTable();

});

// validation

function validateCustomerMobile(mobile) {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(mobile);
}

function validateCustomerName(name) {
    const namePattern = /^[A-Z][a-zA-Z]{1,}$/;
    return namePattern.test(name);
}

function validateCustomerEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validateCustomerAddress(address) {
    return address.trim().length > 0;
}

// save item to array
function saveCustomer(customer) {

    customers.push(customer);

    $('#customer-form')[0].reset();
    alert('customer saved successfully!');
}


// load values to the table

function loadCustomerTable() {
    $("#customer-table-body").empty();

    customers.map(customer => {
        var record = `<tr>
           <td class="customer-code-value">${customer.id}</td>
           <td class="customer-name-value">${customer.name}</td>
           <td class="customer-email-value">${customer.email}</td>
           <td class="customer-address-value">${customer.address}</td>
       </tr>`;

        $("#customer-table-body").append(record);

    });
}


// search item

$("#customer-search").eq(0).on('click', () => {

    $(document).ready(function() {
        let searchItemCode = $("#cus-id-search").val();

        customers.map((customer, index) => {
            if (customer.id === searchItemCode ) {
                $("#cus-id-search-modal").val(customer.id);
                $("#cus-name-search-modal").val(customer.name);
                $("#cus-email-search-modal").val(customer.email);
                $("#cus-address-search-modal").val(customer.address);

                $('#customerModal').modal('show');
            }

            searchItemIndex = index;
        });
    });

});


// reset add item page

$("#item-save-clear").eq(0).on('click', () => {
    $('#item-form')[0].reset();
    const nextCode = getNextItemCode(items);
    document.getElementById('item-id').value = nextCode;
});


// reset modal fields

$("#item-modal-clear").eq(0).on('click', () => {
    $('#item-modal-form')[0].reset();
});

$("#reset-item-search").eq(0).on('click', () => {
    $('#item-search-form')[0].reset();
});


$("#customer-delete").eq(0).on('click', () => {

    customers.splice(searchItemIndex, 1);

    loadCustomerTable();

    $('#customer-modal-form')[0].reset();
});

$("#customer-update").eq(0).on('click', () => {

    let customerObj = customers[searchItemIndex];

    customerObj.id = $("#cus-id-search-modal").val();
    customerObj.name = $("#cus-name-search-modal").val();
    customerObj.email = $("#cus-email-search-modal").val();
    customerObj.address = $("#cus-address-search-modal").val();

    loadCustomerTable()
    $('#customer-modal-clear').click();
});



