class ItemModel {

    constructor(code, name, unitPrice, quantity) {
        this._code=code;
        this._name=name;
        this._unitPrice=unitPrice;
        this._quantity=quantity;
    }

    get code() {
        return this._code;
    }
    get name() {
        return this._name;
    }
    get unitPrice() {
        return this._unitPrice;
    }
    get quantity() {
        return this._quantity;
    }
    set code(code) {
        this._code=code;
    }
    set name(name) {
        this._name=name;
    }
    set unitPrice(unitPrice) {
        this._unitPrice=unitPrice;
    }
    set quantity(quantity) {
        this._quantity=quantity
    }
}
