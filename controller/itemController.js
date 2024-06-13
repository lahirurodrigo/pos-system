import {ItemModel} from '/model/ItemModel.js'
import {items} from '/db/db.js'


// to generate next item code
function getNextItemCode(items, prefix = 'I', padding = 3) {

    // if there are no items in items array
    if (items.length === 0) {

        return `${prefix}${'1'.padStart(padding, '0')}`;
    }

    //taking numeric parts of the item code and save it to a new array
    const numericCodes = items.map(itemModel => parseInt(itemModel._code.slice(1), 10));

    const maxCode = Math.max(...numericCodes);

    const nextCode = maxCode + 1;

    return `${prefix}${nextCode.toString().padStart(padding, '0')}`;
}

const nextCode = getNextItemCode(items);
document.getElementById('item-id').value = nextCode;

$("#item-save").eq(0).on('click', () => {
    var code = $('#item-id').val();
    var name = $('#item-name').val();
    var unitPrice = parseFloat($('#item-uni-price').val());
    var qty = parseInt($('#item-qty').val(), 10);


    if (!validateItemId(code) || !validateItemName(name) || !validateItemPrice(unitPrice) || !validateItemQuantity(qty)) {
        alert("Failed to save");
        return;
    }

    saveItem(new ItemModel(code,name,unitPrice,qty));

    console.log("aiyoo");
    const nextCode = getNextItemCode(items);
    document.getElementById('item-id').value = nextCode;

});


function validateItemId(itemId) {
    if (!itemId.match("[I]\\d{3,}")) {
        $('#item-id').css("border", "2px solid red");
        return false;
    } else {
        $('#item-id').css("border", "2px solid #92F646");
        return true;
    }
}

function validateItemName(itemName) {
    if (!itemName.match("^[A-Z][a-zA-Z]{2,}$")) {
        $('#item-name').css("border", "2px solid red");
        return false;
    } else {
        $('#item-name').css("border", "2px solid #92F646");
        return true;
    }
}

function validateItemPrice(itemPrice) {
    if (isNaN(itemPrice) || itemPrice <= 0) {
        $('#item-uni-price').css("border", "2px solid red");
        return false;
    } else {
        $('#item-uni-price').css("border", "2px solid #92F646");
        return true;
    }
}

function validateItemQuantity(itemQty) {
    if (isNaN(itemQty) || itemQty <= 0) {
        $('#item-qty').css("border", "2px solid red");
        return false;
    } else {
        $('#item-qty').css("border", "2px solid #92F646");
        return true;
    }
}

function saveItem(item) {

    items.push(item);

    $('#item-form')[0].reset();
    alert('Item saved successfully!');
}
