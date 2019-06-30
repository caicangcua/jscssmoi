String.prototype.norm_to_ascii = function () { return unescape(encodeURIComponent(this)) };
String.prototype.norm_to_unicode = function () { return decodeURIComponent(escape(this)) };
String.prototype.crypt_sym = function (k) { return String.fromCharCode.apply(undefined, this.split("").map(function (c) { return c.charCodeAt(0) ^ (k || 13) })) };

var localDB = {
    supports_html5_storage: function () {
        try { return 'localStorage' in window && window['localStorage'] !== null; } catch (e) { return false; }
    }, supports_json: function () { try { return 'JSON' in window && window['JSON'] !== null; } catch (e) { return false; } }
            , IsValid: function () { return this.supports_html5_storage() && this.supports_json() }
            , addOrUpdateStorage: function (id, label, F) {
                var data = this.getStorage(F);
                data[id] = label;
                this.saveStorage(data, F);
            }
            , getStorage: function (F) {
                var current = window.localStorage[this.folder[F]];
                var data = {};
                if (typeof current != "undefined") data = window.JSON.parse(current);
                return data;
            }
            , hasInStorage: function (id, F) {
                return (id in this.getStorage(F));
            }
            , removeFromStorage: function (id, F) {
                if (this.hasInStorage(id, F)) {
                    var data = this.getStorage(F);
                    delete data[id];
                    this.saveStorage(data, F);
                }
            }
            , saveStorage: function (data, F) {
                window.localStorage[this.folder[F]] = window.JSON.stringify(data);
            }
    , folder: { 0: "_onewaywithoutreturn", 1: "_viewtmp" }
    , exe: function (act, id, val, F) {
        if (this.IsValid) {
            switch (act) {
                case 'add': {
                    this.addOrUpdateStorage(id, val, F);
                    break;
                }
                case 'get': {
                    var rst = this.getStorage(F)[id];
                    if (rst) { return rst; } else { return ''; };
                    break;
                }
                case 'rmv': {
                    this.removeFromStorage(id, F);
                    break;
                }
                case 'rmvall': {
                    localStorage.removeItem(this.folder[F]);
                    break;
                }
            }
        }
    }
}
, LogDB = new HashTable();
function qryURL(a) {
    a = a.split('?');
    if (a.length > 1) a = a[1].split('&');
    //
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
};
function HashTable(obj) {
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function (key, value) {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function (key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function (key) {
        return this.items.hasOwnProperty(key);
    }

    this.removeItem = function (key) {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function () {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function () {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function (fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function () {
        this.items = {}
        this.length = 0;
    }
}

var _$userstate = localDB.exe('get', 'userstate', null, 0), _$locate = 'en', _$locate = localDB.exe('get', 'Globalize', null, 0), lgmk = localDB.exe('get', 'lgmk', null, 2);
if (!_$locate  || _$locate == '') { _$locate = 'vi' };