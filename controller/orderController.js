import {OrderModel} from '/model/OrderModel.js'
import { items, customers, orders } from '/db/db.js';


var $itemCodesSelect = $('#input-item-code');
var $customerIdsSelect = $('#input-cus-id');
var cart = [];
var total = 0;
var subtotal = 0;

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
function getNextOrderId(orders, prefix = 'O', padding = 3) {

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

function clearForms(){
    $('#form-cus-details')[0].reset();
    $('#form-item-details')[0].reset();
    $('#form-transaction-details')[0].reset();
    $("#cart-table-body").empty();
    $itemCodesSelect.val('');
    $customerIdsSelect.val('');
    $("#itm-qty").text('');
    $('#order-id').val(getNextOrderId(orders));

}


// Function to disable the customer form
function disableCustomerForm() {
    $('#form-cus-details :input').prop('disabled', true);
}

// Function to enable the customer form
function enableCustomerForm() {
    $('#form-cus-details :input').prop('disabled', false);
}



// add item button action
$("#add-item-order").eq(0).on('click', () => {
    let itemCode = $itemCodesSelect.val();
    let cusCode = $customerIdsSelect.val();

    if(cusCode === null || cusCode === ''){
        alert('select a customer first');
        return;
    }

    if(itemCode === null || itemCode === '') {
        alert('select an item');
    }else {
        items.forEach(function(item) {
            if (itemCode === item.code){
                let cartItem = { ...item };
                cartItem.code = item.code;
                cartItem.name = item.name;


                //in here cartItem.quantity represents the total amount for the item
                cartItem.quantity = $('#itm-buy-qty').val() * item.unitPrice;
                console.log("cart-total: "+cartItem.quantity);

                // in here i save buying quantity in unit price
                cartItem.unitPrice = $('#itm-buy-qty').val();
                cart.push(cartItem);

                subtotal += cartItem.quantity;
                $('#subtotal').val(subtotal);


                let totalForItem = cartItem.quantity;
                let discountRate = parseFloat($('#discount').val());

                let discountedTotalItem = totalForItem - (cartItem.quantity * discountRate / 100);
                total += discountedTotalItem;
                $('#total').val(total);

                cartItem.quantity = discountedTotalItem;
                console.log("price" + cartItem.quantity);

                loadCartTable();
                disableCustomerForm();
                $('#itm-buy-qty').val('');


            }
        });

    }

});


// purchase button action
$("#purchase").eq(0).on('click', () => {

    let oId = $('#order-id').val();
    let cusId = $('#input-cus-id').val();
    let date = $('#datepicker').val();


    cart.forEach(function(cartItem) {
         var uniPrice = undefined;
        items.forEach(function(item) {
            if (item.code === cartItem.code){
                item.quantity -= cartItem.unitPrice;
                uniPrice = item.unitPrice;
            }
        })

        // in here cartItem.unitPrice is quantity of item bought and cartItem.quantity is discounted total for items

        orders.push(
            new OrderModel(oId, cusId, date, cartItem.code, cartItem.name, uniPrice, cartItem.unitPrice, cartItem.quantity)
        );
    });

    alert('Order placed successfully');
    cart = [];
    enableCustomerForm();
    clearForms();
    total = 0;
    subtotal = 0;

    $('#order-id').val(getNextOrderId(orders));
});


$("#cancel-order").eq(0).on('click', () => {
    clearForms();
    $('#order-id').val(getNextOrderId(orders));
    enableCustomerForm();
});

// calling codes loading methods
$("#orders-link").on('click', () => {
    loadItemCodes();
    loadCustomerIds();
    $('#order-id').val(getNextOrderId(orders));
});
