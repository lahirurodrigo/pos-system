import {OrderModel} from '/model/OrderModel.js'
import { items, customers } from '/db/db.js';


var $itemCodesSelect = $('#input-item-code');
var $customerIdsSelect = $('#input-cus-id');

// load item codes
function loadItemCodes() {
    $itemCodesSelect.empty();

    items.forEach(function(item) {
        console.log("load method")
            $itemCodesSelect.append($('<option></option>').val(item.code).text(item.code));
    });

    $itemCodesSelect.val('');
}

// giving an action for item selection
$itemCodesSelect.on('change', function() {
    var selectedCode = $(this).val();

    items.forEach(function(item) {
        if (item.code === selectedCode){
            $("#order-itm-name").val(item.name);
            $("#order-itm-price").val(item.unitPrice);
            $("#itm-qty").val(item.unitPrice);
        }
    });

});


// loading customer ids
function loadCustomerIds() {
    $customerIdsSelect.empty();

    customers.forEach(function(customer) {
        console.log("load method")
        $customerIdsSelect.append($('<option></option>').val(customer.id).text(customer.id));
    });

    $customerIdsSelect.val('');
}

// giving an action for customer selection
$customerIdsSelect.on('change', function() {
    var selectedCode = $(this).val();

    customers.forEach(function(customer) {
        if (customer.id === selectedCode){
            $("#order-cus-name").val(customer.name);
            $("#order-cus-address").val(customer.address);
            $("#order-cus-email").val(customer.email);
        }
    });

});


$("#add-item-order").eq(0).on('click', () => {

});


// calling codes loading methods
$("#orders-link").on('click', () => {
    loadItemCodes();
    loadCustomerIds()
});