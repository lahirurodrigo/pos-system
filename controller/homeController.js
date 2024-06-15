import { items, customers, orders } from '/db/db.js';

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

function loadOrderList() {

    $("#home-orders-body").empty();

    let total = 0;

    orders.map(order => {


        var record = `<tr>
           <td class="order-id-value">${order._orderId}</td>
           <td class="cus-id-value">${order.customerId}</td>
           <td class="date-value">${order._date}</td>
           <td class="total-value">${order.orderTotal}</td>
       </tr>`;

        $("#home-orders-body").append(record);

    });

}

function loadCusHistory(cusId) {

    $("#cus-history-body").empty();

    console.log("cusid: "+cusId);

    orders.forEach(order => {
        if (order.customerId === cusId) {
            var record = `<tr>
           <td class="order-id-values">${order._orderId}</td>
           <td class="cus-id-values">${order.orderTotal}</td>
           <td class="date-values">${order.date}</td>
       </tr>`;

            $("#cus-history-body").append(record);
        }
    });
}


$("#view-orders").eq(0).on('click', () => {
    loadOrderList();
});

$("#cus-history-view").eq(0).on('click', () => {
    let cusId = $("#cus-name").val();
    console.log(cusId);
    loadCusHistory(cusId);

});