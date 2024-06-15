import {ItemModel} from '/model/ItemModel.js'
import {items, orders} from '/db/db.js'


var searchItemIndex = undefined;

// to generate next item code
function getNextItemCode(items, prefix = 'I', padding = 3) {

    // if there are no items in items array
    if (items.length === 0) {

        return `${prefix}${'1'.padStart(padding, '0')}`;
    }

    //taking numeric parts of the item code and save it to a new array
    const numericCodes = items.map(itemModel => parseInt(itemModel.code.slice(1), 10));

    const maxCode = Math.max(...numericCodes);

    const nextCode = maxCode + 1;

    return `${prefix}${nextCode.toString().padStart(padding, '0')}`;
}

// next order id generate and set to the text field
const nextCode = getNextItemCode(items);
document.getElementById('item-id').value = nextCode;


// save button action
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

    const nextCode = getNextItemCode(items);
    document.getElementById('item-id').value = nextCode;

    loadItemTable();

});

// validation
function validateItemId(itemId) {
    if (!itemId.match("[I]\\d{3,}")) {
        $('#item-id').css("border", "2px solid red");
        return false;
    } else {
        //$('#item-id').css("border", "2px solid #92F646");
        return true;
    }
}

// validation
function validateItemName(itemName) {
    if (!itemName.match("^[A-Z][a-zA-Z]{2,}$")) {
        $('#item-name').css("border", "2px solid red");
        return false;
    } else {
        //$('#item-name').css("border", "2px solid #92F646");
        return true;
    }
}

// validation
function validateItemPrice(itemPrice) {
    if (isNaN(itemPrice) || itemPrice <= 0) {
        $('#item-uni-price').css("border", "2px solid red");
        return false;
    } else {
        //$('#item-uni-price').css("border", "2px solid #92F646");
        return true;
    }
}

// validation
function validateItemQuantity(itemQty) {
    if (isNaN(itemQty) || itemQty <= 0) {
        $('#item-qty').css("border", "2px solid red");
        return false;
    } else {
        //$('#item-qty').css("border", "2px solid #92F646");
        return true;
    }
}

// save item to array
function saveItem(item) {

    items.push(item);

    $('#item-form')[0].reset();
    alert('Item saved successfully!');
}


// load values to the table

function loadItemTable() {
    $("#item-table-body").empty();

    items.map(item => {
        var record = `<tr>
           <td class="item-code-value">${item.code}</td>
           <td class="item-name-value">${item.name}</td>
           <td class="item-uniPric-value">${item.unitPrice}</td>
           <td class="item-qty">${item.quantity}</td>
       </tr>`;

        $("#item-table-body").append(record);

    });
}


// search item

$("#item-search").eq(0).on('click', () => {

    $(document).ready(function() {
        let searchItemCode = $("#item-id-search").val();

        items.map((item, index) => {
            if (item.code === searchItemCode ) {
                $("#itm-code-search-modal").val(item.code);
                $("#itm-name-search-modal").val(item.name);
                $("#itm-uni-price-search-modal").val(item.unitPrice);
                $("#itm-qty-search-modal").val(item.quantity);

                $('#itemModal').modal('show');
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


$("#item-delete").eq(0).on('click', () => {

    items.splice(searchItemIndex, 1);

    loadItemTable();
    const nextCode = getNextItemCode(items);
    document.getElementById('item-id').value = nextCode;

    $('#item-modal-form')[0].reset();
});

$("#item-update").eq(0).on('click', () => {

    let itemObj = items[searchItemIndex];

    itemObj.code = $("#itm-code-search-modal").val();
    itemObj.name = $("#itm-name-search-modal").val();
    itemObj.unitPrice = $("#itm-uni-price-search-modal").val();
    itemObj.quantity = $("#itm-qty-search-modal").val();

    loadItemTable();
    $('#item-modal-clear').click();
});

$("#item-link").on('click', () => {
    loadItemTable();
});


