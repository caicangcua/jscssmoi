//https://skalman.github.io/UglifyJS-online/

"use strict";
window.ComApp = window.ComApp || {};
var realDevice = DevExpress.devices.real(), bullhorn,
    isWinPhone = realDevice.platform == "win" && realDevice.phone, chochut = function (id,msg) {
        $('.loader_frm').fadeOut("slow", function () {
            $(this).css('display', 'none');
        });
        if (id>0)DevExpress.ui.dialog.alert("We cannot load template view now. Please check your internet connection and try later.");
    }
ComApp.Store = window.ComApp.Store || {};
var initview = 'Menu', extendApiDB, hwndDevice = '', timestamp = "337647087620164299029740", appstate = "41e085b4-e7b8-41c4-8e5f-23d81438e91f", bkheartbeat, hbua, CacheVersion, _bannedTimer = null
    , preventBackbutton = false, logincatcha = '', serOpts, reqDomain, _lechtime = 0
    , memorybag = {}, eventCallbacks = {}, __$ncc = '', communicateEVT = {};
function apiHistory(attachName,hisLog) {
    var his = eventCallbacks[attachName] || {}, __log = $.extend(true, {}, hisLog), _fuckLog = his.log || {};
    for (var k in __log) {
        _fuckLog[k.toString()] = __log[k.toString()];
    };
    his.log = _fuckLog;
}
var chochut = function (id, callback, exMsg) {

    if (id == '0') {
        screenloader_frm.css('display', '');
    } else {
        screenloader_frm.fadeOut("slow", function () {
            screenloader_frm.css('display', 'none');
        });
    };
    if (id < 0) {
        preventBackbutton = true;//raise

        if (exMsg) {
            exMsg = "<div style='height:150px'><img src='" + gitpath + "images/" + exMsg.img + "' style='display: block;margin: 0 auto;' /></div>" + exMsg.msg;
        } else {
            exMsg = "<div style='height:150px'><img src='" + gitpath + "images/404_init.png' style='display: block;margin: 0 auto;' /></div>" + gbM("404Msg");
        }

        var myDialog = DevExpress.ui.dialog.custom({
            message: exMsg,
            buttons: [{
                text: gbM("404Close"), visible: isDevice, onClick: function () {
                    myDialog.hide();
                    navigator.app.exitApp();
                    return false;
                }
            }, { text: gbM("404Retry"), onClick: function () { return callback; } }],
            showTitle: false
        });
        myDialog.show().done(function (callback) {
            preventBackbutton = false;//reset
            if (callback) {
                callback();//ComApp.app.navigate(dialogResult.uri, dialogResult.options);
            };
        });
        //DevExpress.ui.dialog.alert("We cannot load template view now. Please check your internet connection and try later.");
    };
},
confirmDlg = function (msg, btn, callback) {
    //0:OK	
    //1:OKCancel		
    //4:YesNo		
    //3:YesNoCancel		
    //---result
    //0:None	
    //---icon
    //16:Error		
    //64:Information		
    //32:Question		
    //48:Warning	
    var btOK = {
        text: gbM("OK"), onClick: function () {
            return 1;//OK
        }
    }, btYes = {
        text: gbM("Yes"), onClick: function () {
            return 6;//Yes
        }
    }, btnNo = {
        text: gbM("No"), onClick: function () {
            return 7;//No
        }
    }, btnCancel = {
        text: gbM("Cancel"), onClick: function () {
            return 2;//Cancel
        }
    }, msgicon = ['fa fa-info-circle', 'blue'], CMD = []; if (btn[0] == 0) { CMD = [btOK] } else if (btn[0] == 1) { CMD = [btOK, btnCancel] } else if (btn[0] == 4) { CMD = [btYes, btnNo] } else if (btn[0] == 3) { CMD = [btYes, btnNo, btnCancel] };
    if (btn[1] == 32) { msgicon = ['dx-icon-help', 'black'] } else if (btn[1] == 64) { msgicon = ['dx-icon-info', 'blue'] } else if (btn[1] == 48) { msgicon = ['dx-icon-warning', 'orange'] }
    var exMsg = "<div style='position: relative;max-width:300px'><i class='" + msgicon[0] + "' style='color:" + msgicon[1] + ";font-size:30px;padding-right:10px'/><span>" + msg + "</span></div>";
    //
    preventBackbutton = true;//raise
    var myDialog = DevExpress.ui.dialog.custom({
        message: exMsg,
        buttons: CMD,
        showTitle: false
    });
    myDialog.show().done(function (dialogResult) {
        preventBackbutton = false;//reset
        if (callback) {
            callback(dialogResult);
        };
    });
}
, banned = function (msg, callback) {
    preventBackbutton = true;//raise
    screenloader_frm.fadeOut("slow", function () {
        screenloader_frm.css('display', 'none');
    });
    var bannedobj = JSON.parse($('<div>').html(msg)[0].textContent);
    var myDialog = DevExpress.ui.dialog.custom({
        message: "<div style='height:150px'><img src='" + gitpath + "images/banned.png' onload='_bannedTimer.start(this)' style='display: block;margin: 0 auto;' /></div>" + bannedobj.msg,
        buttons: [{
            text: gbM("404Close"), visible: isDevice, onClick: function () {
                myDialog.hide();
                navigator.app.exitApp(); return false;
            }
        }, {
            template: "<div id='bannedTimer'><span class='dx-button-text' id='gio'>00</span>:<span class='dx-button-text' id='phut'>00</span>:<span class='dx-button-text' id='giay'>00</span></div>"
            , onClick: function () { return callback; }
        }],
        showTitle: false
    });
    myDialog.show().done(function (callback) {
        preventBackbutton = false;//reset
        if (_bannedTimer) _bannedTimer.destroy();
        //screenloader_frm.fadeOut("slow", function () {
        if (callback) {
            callback();
        };
        //});
    });
    _bannedTimer = new countdown(parseInt(bannedobj.duration) * 1000 * 60, myDialog);
}
, countdown = function (offsetSecond, dialoghwnd) {
    var days, hours, minutes, seconds, interval, _timerDisplay, _dialogHWND = dialoghwnd;
    var endDate = new Date().getTime() + offsetSecond;// new Date(endDate).getTime();
    if (isNaN(endDate)) {
        return;
    }

    this.start = function (startEL) {
        _timerDisplay = $(startEL).closest('.dx-popup-content.dx-dialog-content').next().find("#bannedTimer");
        interval = setInterval(calculate, 1000);
    }
    this.destroy = function () {
        clearInterval(interval);
    }

    function calculate() {
        var startDate = new Date();
        startDate = startDate.getTime();

        var timeRemaining = parseInt((endDate - startDate) / 1000);

        if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);

            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);

            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);

            seconds = parseInt(timeRemaining);

            //document.getElementById("days").innerHTML = parseInt(days, 10);
            _timerDisplay.find('#gio').text(("0" + hours).slice(-2));
            _timerDisplay.find('#phut').text(("0" + minutes).slice(-2));
            _timerDisplay.find('#giay').text(("0" + seconds).slice(-2));
        } else {
            clearInterval(interval);
            var retryBtn = _timerDisplay.closest('.dx-button')[0];
            if (retryBtn) retryBtn.click();
            return;
        }
    }

    return {
        destroy: this.destroy,
        start: this.start,
        get_time: 0
    }
}
, _$a, _$tmpver = '0', _$screenTimer
, scrLocked = function (delay) {
    clearTimeout(_$screenTimer);
    screenloader_frm.css('display', '');
    _$screenTimer = setTimeout(function () {
        scrReleased();
        DevExpress.ui.notify('Released screen timeout!', 'warning', 1000);
    }, (delay) ? delay : 5000);// auto release 2 second
}
, scrReleased = function () {
    clearTimeout(_$screenTimer);
    screenloader_frm.fadeOut("fast", function () {
        screenloader_frm.css('display', 'none');
    });
},
_isDeviceReady = $.Deferred(),
_globalReady = $.Deferred(),
_onDeviceReady = $.Deferred(),
isDevice = false, releaseVer = !/http:\/\/localhost/.test(window.location.href),
notyFunc = function (data, tmpver) {
    var _rst = $.parseJSON($('<div/>').html(data).text());
    if (tmpver != _$tmpver) {
        DevExpress.ui.notify({
            message: gbM("S0_000"),
            onHiding: function () { window.location.reload(); },
            width: 200,
            position: {
                my: "center",
                at: "center"
            }
        }, "info", 2000);
    };
    console.log(timestamp);
};

function _templateMapCHK(name) {
    var re = {};
    if (!ComApp.app.viewEngine._templateMap.hasOwnProperty(name)) {
        re['nextview'] = name;
        scrLocked();
    };
    return re;
}

function globalCHK(_$p) {
    (function () {
        var _$txt = _$p.validator._$element;
        _$txt.addClass('loader2');
        var rst = function (e, i, m) {
            e.rule.isValid = i;
            e.rule.message = m;
            e.validator.validate();
            _$txt.removeClass('loader2');
            //
            //console.log('after server check');
            _$q.next(false);
        };
        var dogAJAX = function () {
            //method = 'post|0';
            _$a.api(_$p.$m, _$p.$a, _$p.$s, function (result) {
                var isValid = (result.isValid == '0') ? false : true;
                rst(_$p, isValid, gbM(result.Msg));
            }, function (err) {
                rst(_$p, false, err.description);
            });
        }
        //
        _$q.add(dogAJAX);
        //
    })(_$p);
    return true;
}

function appStarting(isQoute, tmp) {
    $.when(_globalReady).done(function (v1) {
        var rst = function () {
            ComApp.app.router.register(":view/:id", { view: initview, id: undefined });
            _$a = ComApp.Warehouse.srcv.Utils;
            ComApp.app.navigate();


            DevExpress.devices.on("orientationChanged", function (orientation) {
                if (ComApp.app.maCurrentView && ComApp.app.maCurrentView._orientationChanged) ComApp.app.maCurrentView._orientationChanged(orientation);
            });


            //DevExpress.ui.notify({
            //    message: 'Request Domain: ' + reqDomain + ' w: ' + $(window).width() + ' ; H: ' + $(window).height() + ' ; mobileClient: ' + mobileClient,
            //    width: 200,
            //    onHiding: function () {
            //        //alert('why 1');
            //    },
            //    position: {
            //        my: "center",
            //        at: "center"
            //    }
            //}, "info", 2000);
        }
        if (tmp) {
            //console.log(tmp);
            var dog = ComApp.app.viewEngine;
            //dog._clearCache();
            if (isQoute == '1') {
                dog._loadTemplatesFromString($('<div>').html(tmp)[0].textContent);
            } else {
                dog._loadTemplatesFromString(tmp);
            };
            rst();
        } else {
            ComApp.app.loadTemplates(ComApp.srcv.dxView._url).done(function () {
                //ComApp.apiweb = new DevExpress.data.ODataContext(extendApiDB('apiweb'));
                //
                //window.MyHandler.paramChannel("apiURI", "http://10.0.2.2:2432/api/CaptchaImage/GetCaptcha");
                //
                rst();
            }).fail(function (err) {
                rst();
            });
        };
    });
}

$(function () {
    _$tmpver = localDB.exe('get', 'tmpver', null, 0);
    if (_$tmpver == '') { _$tmpver = '0' };

    DevExpress.devices.current({ platform: "generic" });

    //function setScreenSize() {
    //    if (isWinPhone) {
    //        ComApp.app.templateContext().option("screenSize", "small");
    //        $.each(document.styleSheets, function (index, element) {
    //            if (element.href) {
    //                if (element.href.indexOf("index.small.css") >= 0) {
    //                    for (var i = element.media.length - 1; i >= 0; i--)
    //                        element.media.deleteMedium(element.media.item(i));
    //                }
    //                if (element.href.indexOf("index.medium.css") >= 0) {
    //                    element.disabled = true;
    //                }
    //            }
    //        });
    //        return;
    //    }
    //    var el = $("<div>").addClass("screen-size").appendTo(".dx-viewport");
    //    setTimeout(function () {
    //        var size = getComputedStyle(el[0], ":after").content.replace(/["']/g, "");
    //        el.remove();

    //        ComApp.app.templateContext().option("screenSize", size);
    //    }, 0);
    //}

    function exitApp() {
        //var exitMessage = "Are you sure you want to exit?";

        //if (window.WinJS) {
        //    var msg = new Windows.UI.Popups.MessageDialog(exitMessage);

        //    msg.commands.append(new Windows.UI.Popups.UICommand("OK", function () {
        //        MSApp.terminateApp('');
        //    }));
        //    msg.commands.append(
        //        new Windows.UI.Popups.UICommand("Cancel"));

        //    msg.showAsync();
        //} else {
        //    if (confirm(exitMessage)) {
        //        navigator.app.exitApp();
        //    }
        //}
    }

    function onDeviceReady() {
        //document.addEventListener("backbutton", onBackButton, false);
        //navigator.splashscreen.hide();
    }

    function onBackButton() {
        //DevExpress.processHardwareBackButton();
    }

    //window.localStorage && window.localStorage.clear();

    ComApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: ComApp.Store,
        commandMapping: ComApp.config.commandMapping,
        layoutSet: DevExpress.framework.html.layoutSets[ComApp.config.layoutSet],
        animationSet: DevExpress.framework.html.animationSets[ComApp.config.animationSet],
        navigation: ComApp.config.navigation,
        //navigateToRootViewMode: "resetHistory",//'keepHistory' | 'resetHistory'
        templatesVersion: "ComApp.Store-15.2.5"
    });

    ComApp.app.on("navigatingBack", function (args) {
        if (!ComApp.app.canBack()) {
            args.cancel = true;
            exitApp();
        } else {
            bullhorn._$element.css({ 'left': '5px', 'opacity': '0.5' });
        }
    });

    //ComApp.app.router.register(":view/:type/:id", { view: "Menu", type: undefined, id: undefined });

    //setScreenSize();
    //$(window).bind("load resize", setScreenSize);

    //ComApp.app.navigate();



    document.addEventListener("deviceready", onDeviceReady, false);
    if (!window.cordova && window.WinJS && Windows.Phone) {
        Windows.Phone.UI.Input.HardwareButtons.addEventListener("backpressed",
            function (e) {
                e.handled = true;
                onBackButton();
            });
    }

    ComApp.app.on("viewShowing", function (args) {
        var viewModel = args.viewInfo.model,
            direction = args.direction, view = args.viewInfo.model.name, clsView = '';
        ComApp.app.maCurrentView = viewModel;
    }).on("viewShown", function (args) {
        if (!bullhorn) {
            bullhorn = $('#bullhorn').dxButton({ 'visible':false, 'icon': 'fa fa-bullhorn', 'elementAttr': { 'class': 'btnstyle1 bullhorn-event' } }).dxButton("instance");
        } else {
            bullhorn._$element.css({ 'opacity': '1' });
        }
        if (!args.params.unlock || args.params.unlock == 'T') scrReleased();
    });

    if (_$locate == 'vi') {
        $.when(
            $.getJSON(gitpath + "cldr/main/vi/ca-gregorian.json"),
            $.getJSON(gitpath + "cldr/main/vi/numbers.json"),
            $.getJSON(gitpath + "cldr/main/vi/currencies.json"),
            $.getJSON(gitpath + "cldr/supplemental/likelySubtags.json"),
            $.getJSON(gitpath + "cldr/supplemental/timeData.json"),
            $.getJSON(gitpath + "cldr/supplemental/weekData.json"),
            $.getJSON(gitpath + "cldr/supplemental/currencyData.json"),
            $.getJSON(gitpath + "cldr/supplemental/numberingSystems.json")
        ).then(function () {
            return [].slice.apply(arguments, [0]).map(function (result) {
                return result[0];
            });
        }).then(
          Globalize.load
        ).then(function () {
            //
            Globalize.locale(_$locate);
            //_$hieu = MyHandler(window);
            _globalReady.resolve();
        }).fail(function () {
            _globalReady.resolve();
        });
    } else {
        //
        //_$hieu = MyHandler(window);
        _globalReady.resolve();
    };


});