export default class Observable {
    _events = {};

    on = (event, callback) => {
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(callback);
    };

    off = (event) => {
        if (this._events[event]) {
            this._events[event] = undefined;
        }
    };

    emit = (event, params) => {
        if (this._events[event]) {
            for (let i in this._events[event]) this._events[event][i](params);
        }
    };

    getEvents() {
        return Object.keys(this._events);
    }
}