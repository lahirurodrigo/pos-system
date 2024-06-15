import {OrderModel} from '/model/OrderModel.js'
import { items, customers, orders } from '/db/db.js';


var $itemCodesSelect = $('#input-item-code');
var $customerIdsSelect = $('#input-cus-id');
var cart = [];

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
            $("#itm-qty").text(item.quantity);
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

// generate order id
function getNextOrderId(items, prefix = 'O', padding = 3) {

    // if there are no items in items array
    if (orders.length === 0) {
        return `${prefix}${'1'.padStart(padding, '0')}`;
    }

    //taking numeric parts of the item code and save it to a new array
    const numericCodes = orders.map(orderModel => parseInt(orderModel.orderId.slice(1), 10));

    const maxCode = Math.max(...numericCodes);

    const nextCode = maxCode + 1;

    return `${prefix}${nextCode.toString().padStart(padding, '0')}`;
}

// next order id generate and set to the text field
const nextCode = getNextOrderId(orders);
document.getElementById('order-id').value = nextCode;


// add items to cart table
function loadCartTable() {
    $("#cart-table-body").empty();

    cart.map(item => {

        var record = `<tr>
           <td class="item-code-value">${item.code}</td>
           <td class="item-name-value">${item.name}</td>
           <td class="item-uniPric-value">${item.unitPrice}</td>
           <td class="item-total">${item.quantity}</td>
       </tr>`;

        $("#cart-table-body").append(record);

    });
}

$("#add-item-order").eq(0).on('click', () => {
    let itemCode = $itemCodesSelect.val();
    if(itemCode === null) {
        alert('select a item first');
    }else {
        items.forEach(function(item) {
            if (itemCode === item.code){
                var cartItem = item;
                cartItem.quantity = $('#itm-buy-qty').val() * item.unitPrice;
                cart.push(cartItem);
                loadCartTable();
            }
        });

    }

});


// calling codes loading methods
$("#orders-link").on('click', () => {
    loadItemCodes();
    loadCustomerIds()
});