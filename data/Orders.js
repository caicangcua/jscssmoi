"use strict";

window.ComApp = window.ComApp || {};
window.ComApp.Store = window.ComApp.Store || {};
window.ComApp.Store.db = window.ComApp.Store.db || {};

(function() {
    var CURRENT_ORDER_KEY = "cart-data";

    var db = {},
        endpointSelector = new DevExpress.EndpointSelector(ComApp.config.endpoints),
        cachedCartDataString = localStorage.getItem(CURRENT_ORDER_KEY),
        cachedCartData = cachedCartDataString ? JSON.parse(cachedCartDataString) : {},
        currentOrder;
    

    db.loadOrders = function (success, fail) {
        return ComApp.db.Orders.load({
            filter: ["Customer.ID", new DevExpress.data.Guid('341d70bd-49bb-49d4-8c12-53765eefdde2')],
            select: [
                "ID",
                "OrderDate",
                "State",
                "OrderItems.Product.Name",
                "OrderItems.Product.Price",
                "OrderItems.Product.Type.Name"
            ],
            sort: [{ selector: "OrderDate", desc: true }]
        })
        .done(function(result) {
            result = $.map(result, mapOrder);
            success.call(this, result);
        })
        .fail(fail);
    };

    db.placeOrder = function (products, successHandler, errorHandler) {
        ComApp.db.Orders.insert({
            "Customer": ComApp.db.objectLink("Customers", ComApp.Store.User.id),
            "OrderDate": new Date(),
            "State": 1,
        }).done(function (order, newId) {
            $.when(
                addOrderItem(newId, products[0].model() ? products[0].model().id : null),
                addOrderItem(newId, products[1].model() ? products[1].model().id : null),
                addOrderItem(newId, products[2].model() ? products[2].model().id : null)
            ).done(function () {
                currentOrder.setEmptyValues();
                successHandler();
            }).fail(function () {
                errorHandler();
            });
        });
    };

    function mapOrder(order) {
        var result = {
            id: order.ID,
            date: order.OrderDate,
            state: getOrderState(order.State),
            deck: mapOrderItem(order, "Decks"),
            truck: mapOrderItem(order, "Trucks"),
            wheel: mapOrderItem(order, "Wheels & Bearings")
        };

        result.title = result.deck.name + " + " + result.truck.name + " + " + result.wheel.name;
        result.price = result.deck.price + result.truck.price + result.wheel.price;
        return result;
    }

    function mapOrderItem(order, itemType) {
        var item = $.grep(order.OrderItems, function(item) { return item.Product.Type.Name == itemType; })[0];
        return {
            name: item.Product.Name,
            price: parseFloat(item.Product.Price)
        };
    }

    function getOrderState(stateId) {
        switch(stateId) {
            case 4:
                return "out of stock";
            case 3:
                return "completed";
            default:
                return "in progress";
        }
    }

    function addOrderItem(orderId, productId) {
        if (!orderId || !productId)
            return null;

        var added = $.Deferred();
        ComApp.db.OrderItems.insert({
            "Order": ComApp.db.objectLink("Orders", new DevExpress.data.Guid(orderId)),
            "Product": ComApp.db.objectLink("Products", new DevExpress.data.Guid(productId)),
        }).done(function () {
            added.resolve();
        }).fail(function () {
            added.reject();
        });

        return added;
    }

    ComApp.Store.Order = currentOrder;
    $.extend(ComApp.Store.db, db);
})();