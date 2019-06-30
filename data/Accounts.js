"use strict";

window.ComApp = window.ComApp || {};
window.ComApp.Warehouse = window.ComApp.Warehouse || {};
window.ComApp.Warehouse.srcv = window.ComApp.Warehouse.srcv || {};
window.ComApp.Warehouse.apiweb = window.ComApp.Warehouse.apiweb || {};

(function () {

    var srcv = {}, apiweb = {}, apiprefix = encodeURIComponent('@api');

    srcv.loadCatcha = function (success, fail,tryOpt) {
        var engine = ComApp.srcv.DimUtils, apisvr = engine._url.replace(apiprefix, '634384032773750000092197');
        engine._sendRequest(apisvr, "GET", null, null, tryOpt).done(function (serverResponse) {
           success.call(this, serverResponse);
        }).fail(function (err, responseText) {
            if (!tryOpt && err && err.errorDetails && err.errorDetails.statusText == 'JSTRY') {
                srcv.loadCatcha(success, fail, eval(err.errorDetails.responseText));
            } else {
                fail(err, responseText);
            }
        });

        //engine._sendRequest(apisvr, "GET", null, null, null).done(function (serverResponse) {
        //    success.call(this, serverResponse);
        //}).fail(function (err, responseText) {
        //    fail(err, responseText);
        //});

        ////////ComApp.srcv.GetCaptcha.load()
        ////////.done(function (result) {
        ////////    //result = mapCustomers(result[0]);
        ////////    success.call(this, result);
        ////////})
        ////////.fail(fail);
    };

    srcv.LOG = function (type, api, values, success, error) {
        var engine = eval(api), apisvr = engine._url;
        //engine._sendRequest(apisvr, type, null, values).done(function (serverResponse) {
        //    success.call(this, serverResponse);
        //}).fail(function (err, responseText) {
        //    error(err, responseText);
        //});

        //ComApp.srcv.Registration.insert(data)
        //    .done(success)
        //    .fail(function (result,responseText) {
        //        error(result, responseText);
        //    });
    };

    srcv.Utils = {
        busy: false,
        unlocked:false,
        retryLimit: 1,
        tryCount: 0,
        tryUI: function () {
            if (this.tryCount > 0) { this.tryCount = 0; }
            if (this.unlocked) { screenloader_frm.css('display', 'none'); };
        },
        api: function (type, api, values, success, error, tryOpt) {
            //masklockscreen.css('display', '');
            ////////if (this.busy) { _$q.clear(); console.log('duplicate server action'); DevExpress.ui.notify('duplicate server action ...busy!', 'error', 2000); return; };
            var that = this, engine = ComApp.srcv.DimUtils, apisvr = engine._url.replace(apiprefix, api);
            that.busy = true;
            var _params = null, _payload = null;
            if (type == 'GET') { _params = values; } else { _payload = values };
            return engine._sendRequest(apisvr, type, _params, _payload, tryOpt).done(function (serverResponse) {
                that.busy = false;
                success.call(this, serverResponse);
                that.tryUI();
                //console.log('suscess');
            }).fail(function (err, responseText) {
                that.busy = false;
                if (!tryOpt) {
                    if (err && err.errorDetails) {
                        if (err.httpStatus == 0 && api.split('?')[0] == '634374721143258750061757') {//heartbeat error
                            that.tryUI();
                            chochut(1, '');
                            error(err, responseText);
                            return;
                        }else if (err.errorDetails.statusText == 'JSTRY') {
                            that.api(type, api, values, success, error, eval(err.errorDetails.responseText));
                            return;
                        } else if (err.errorDetails.statusText == 'BANNED') {
                            banned(err.errorDetails.responseText, function () { screenloader_frm.css('display', ''); that.unlocked = true; that.api(type, api, values, success, error, tryOpt); });
                            return;
                        } else if (err.errorDetails.statusText != '_$ERR100%') {
                            that.tryCount++;
                            if (that.tryCount < that.retryLimit) {    //try again
                                screenloader_frm.css('display', ''); that.unlocked = true;
                                that.api(type, api, values, success, error, tryOpt);
                                return;
                            }
                        }
                    };
                }
                if (err.httpStatus == 500) {
                    //chochut(-1, function () {
                    //    screenloader_frm.css('display', '');
                    //    that.api(type, api, values, success, error, tryOpt);
                    //}, { img: '500_init.png', 'msg': err.message });
                    DevExpress.ui.notify("Error: '" + err.message, 'error', 5000);
                    LogDB.setItem(apisvr + '|' + Date.now().toString(), err.message);
                    //
                    error(err, responseText);
                    that.tryUI();
                    chochut(1, '');
                } else if (err.httpStatus == 0) {
                    chochut(-1, function () {
                        screenloader_frm.css('display', ''); that.unlocked = true;
                        that.api(type, api, values, success, error, tryOpt);
                    });
                } else {
                    error(err, responseText);
                    that.tryUI();
                    if (values && values.nextview) { chochut(1, ''); };//unlock screen
                }
            });
        }
    }

    //srcv.Utils = function (type, api, values, success, error, tryOpt) {
    //    var engine = ComApp.srcv.DimUtils, apisvr = engine._url.replace(apiprefix, api);
    //    engine._sendRequest(apisvr, type, null, values, tryOpt).done(function (serverResponse) {
    //        success.call(this, serverResponse);
    //    }).fail(function (err, responseText) {
    //        if (!tryOpt) {
    //            if (err && err.errorDetails) {
    //                if (err.errorDetails.statusText == 'JSTRY') {
    //                    srcv.Utils(type, api, values, success, error, eval(err.errorDetails.responseText));
    //                    return;
    //                } else if (err.errorDetails.statusText == 'BANNED') {
    //                    banned(err.errorDetails.responseText, function () { srcv.Utils(type, api, values, success, error, tryOpt); });
    //                    return;
    //                } else if (err.errorDetails.statusText == 'timeout') {
    //                }
    //            };
    //        }
    //        error(err, responseText);
    //    });
    //};

    //srcv.noty = new workScreen();

    $.extend(ComApp.Warehouse.srcv, srcv);

    apiweb.loadCatcha = function (success, fail) {
        var engine = ComApp.srcv.DimUtils, apisvr = engine._url.replace(apiprefix, 'CaptchaImage/GetCaptcha');
        engine._sendRequest(apisvr, "GET", null, null,
            { 'token': "zluMERc%5b%5el%5ewpm3G1t7%2fEz4QqKk%2bSDdMnkFfnJ5i8ucBfh07tScdzhzy7FMZuCx3g%60jZ%5cZ%2bTL3N", 'fuck': encodeURIComponent(window.location) }).done(function (serverResponse) {
                success.call(this, serverResponse);
            }).fail(function (err, responseText) {
                fail(err, responseText);
            });

        ////////ComApp.apiweb.GetCaptcha.load()
        ////////.done(function (result) {
        ////////    //result = mapCustomers(result[0]);
        ////////    success.call(this, result);
        ////////})
        ////////.fail(fail);
    };
    $.extend(ComApp.Warehouse.apiweb, apiweb);

})();


function taskTimer() {
    //
    var that = this, _timer = null, options = { _duration: 10, limit_timer: 0, counter_timer: 0 };
    this.init = function (opts) {
        options = $.extend(true, {}, options, opts);
    }
    this.start = function () {
        if (options.limit_timer == 0 || options.counter_timer <= options.limit_timer) {
            _timer = setTimeout(function () { options.counter_timer += 1; that.timer_callback(); }, options._duration * 1000);
        };
    },this.stop = function () {
        clearTimeout(_timer);
    },this.timer_callback = function () {
        //
        that.get_noty();
        //
    },this.get_noty = function (causeby) {
        that.stop();
        //
        if (options.callback) {
            options.callback(function (isLoop) {
                if (isLoop) that.start();
            });
        };
    }

    return {
        init:this.init,
        get_noty: this.get_noty,
        start: this.start,
        stop: this.stop
    }
}

function manualTimer(args, cb) {
    if (!(this instanceof manualTimer)) { return new manualTimer(args, cb); }
    //
    var that = this, hwnd_timer = null, hwnd_duration = 10, limit_hwnd_timer = 0, counter_hwnd_timer = 0;
    if (args) {
        if (args.hasOwnProperty('dura')) hwnd_duration = args['dura'];
        if (args.hasOwnProperty('limit')) limit_hwnd_timer = args['limit'];
    }
    //
    this.start_hwnd_timer = function () {
        that.stop_hwnd_timer();
        //
        if (limit_hwnd_timer == 0 || counter_hwnd_timer <= limit_hwnd_timer) {
            hwnd_timer = setTimeout(function () { counter_hwnd_timer += 1; that.hwnd_timer_callback(); }, hwnd_duration * 1000);
        };
    };
    this.stop_hwnd_timer = function () {
        clearTimeout(hwnd_timer);
    };
    this.hwnd_timer_callback = function () {
        that.stop_hwnd_timer();
        that.exe_hwnd('timer');
    };
    this.exe_hwnd = function (causeby, reorder) {
        try {
            if (cb) cb();
        } catch (err) {
        };
    }
    this.bind = function (event, callback) {
        //
        delete communicateEVT[event];// xoa cu truoc khi build moi
        //
        communicateEVT[event] = callback;
    }

    return {
        bind: this.bind,
        exe_hwnd: this.exe_hwnd,
        start_hwnd_timer: this.start_hwnd_timer,
        stop_hwnd_timer: this.stop_hwnd_timer
    }
};
function commnunicateTrigger(event, isLoop, data) {
    var callback = communicateEVT[event];
    if (callback) {
        try {
            callback(data);
        } catch (err) {
            isLoop = '0';
        }
        finally {
            if (isLoop == '0') {
                delete communicateEVT[event];
            }
        }
    }
}