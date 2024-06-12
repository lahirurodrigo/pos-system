export class CustomerModel{
    constructor(id,name,tel,address) {
        this._id = id;
        this._name = name;
        this._tel = tel;
        this._address = address;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        this._tel = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}