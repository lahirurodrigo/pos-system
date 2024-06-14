import {PlaceOrderModel} from '/model/OrderModel.js'
import { items } from '/db/db.js';


var $itemCodesSelect = $('#input-item-code');

// load item codes
function loadItemCodes() {
    $itemCodesSelect.empty();

    items.forEach(function(item) {
        console.log("load method")
            $itemCodesSelect.append($('<option></option>').val(item.code).text(item.code));
    });

    $itemCodesSelect.val('');
}


$("#add-item-order").eq(0).on('click', () => {
    console.log(items.length);

});

$("#orders-link").on('click', () => {
    loadItemCodes();
});

// giving an action for item selection
$itemCodesSelect.on('change', function() {
    var selectedCode = $(this).val();

    console.log("Selected item code:", selectedCode);


});