//https://skalman.github.io/UglifyJS-online/
"use strict";

//<script type="text/javascript">
//https://jscompress.com/
//https://www.webpagetest.org/

function MyHandler(iframeWindow) {
    if (!(this instanceof MyHandler)) { return new MyHandler(iframeWindow); }

    var that = iframeWindow, apiURI = new that.DevExpress.EndpointSelector(that.ComApp.config.endpoints).urlFor('srcv'), userAgent = that.navigator.userAgent,
        uuid =that.localDB.exe('get', 'uuid', null, 2), SYN_LAZY_QUEUE = {}, LAZY_KEY = [];
    userAgent = userAgent.replace(' .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2;', '');
    if (uuid==''){
        uuid = $uuid;
        localDB.exe('add', 'uuid', uuid, 2);
    };
    $.ajax({
        retryLimit: 0,
        tryCount: 3,
        url: apiURI + "/634444437875156250031580?" + $.param({ "dxv": "Menu", "svrcode": "appstate", "pricekm": parent.pricekm, "uuid": uuid, "clockpulse": userAgent }),
        type: "POST",
        dataType: 'html',
        cache: false,
        timeout: 7000, //5 second timeout that.localDB.exe('get', 'viewui', null, 0)
        data: $.param({ "userstate": that.localDB.exe('get', 'userstate', null, 0), "viewui": 'Home', "locate": _$locate, "tmpver": that.localDB.exe('get', 'tmpver', null, 0) })
        , success: function (result, textStatus, xhr) {
            if (data != '') {
                var data = jQuery.parseJSON(result);
                appStarting('0', data.dxtmp);
                memorybag[initview] = data.mnudata;
                that.hwndDevice = uuid;
                that.__$ncc = data.ncc;
                //
                setTimeout(function () {
                    var loadcount = $('#loadcount');
                    loadcount.next().css('background-image', 'url(' + gitpath + 'images/hourgrass.gif)');
                    loadcount.remove();
                    //
                    localTHAT.start_noty_timer(); //debug  
                    //
                }, 200);
            } else {
                this.tryCount++; var fuck = this;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(fuck);
                    return;
                } else {
                    chochut(-1, function () {
                        screenloader_frm.css('display', '');
                        $.ajax(fuck);
                    });
                }
            };
        },
        error: function (xhr, textStatus, errorThrown) {
            var fuck = this;
            if (xhr.status == '451') {
                banned(xhr.responseText, function () { $.ajax(fuck); });
            } else if (xhr.status == '500') {
                scrReleased();
                masklockscreen.text(xhr.statusText);
                masklockscreen.css('display', '');
            } else if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(fuck);
                    return;
                }
                return;
            } else {
                chochut(-1, function () {
                    screenloader_frm.css('display', '');
                    $.ajax(fuck);
                });
            }
        }
    });

    this.paramChannel = function (action, param) {
        switch (action) {
            case "timestampAPI": {
                _paramChannel_timestampAPI(param);
                break;
            }
        }
    };

    function _paramChannel_timestampAPI(param) {
        if (param == 'start') {
            localTHAT.get_noty();
        } else {
            localTHAT.stop_noty_timer();
        }
    }


    var localTHAT = this, noty_timer = null, noty_duration = 20, limit_noty_timer = 0, counter_noty_timer = 0;
    this.start_noty_timer = function () {
        if (limit_noty_timer == 0 || counter_noty_timer <= limit_noty_timer) {
            noty_timer = setTimeout(function () { counter_noty_timer += 1; localTHAT.noty_timer_callback(); }, noty_duration * 1000);
        };
    };
    this.stop_noty_timer = function () {
        clearTimeout(noty_timer);
    };
    this.noty_timer_callback = function () {
        //
        localTHAT.get_noty();
        //
    };
    this.get_noty = function (_$cb) {
        localTHAT.stop_noty_timer();
        //
        //
        _$q.add(function () {
            var args = {}, getmore = {}, isGetmore = false;
            for (var evt in eventCallbacks) {
                if (eventCallbacks.hasOwnProperty(evt)) {
                    if (evt.indexOf("$attach_") == 0 && eventCallbacks[evt].act == '1') {
                        var __his = $.extend(true, [], eventCallbacks[evt].log.his), uid = '-1';
                        if (buttonlogout() != 'user' && lgmk=='' && eventCallbacks[evt].log.hasOwnProperty('deli')) {
                            var deli = eventCallbacks[evt].log['deli'];
                            if (deli.hasOwnProperty('uid')) {
                                uid = deli['uid'];
                            };
                        };
                        args[evt] = { 'his': __his, 'more': eventCallbacks[evt].log.more, 'uid': uid };// eventCallbacks[evt].log;
                        isGetmore = true;
                        //console.log(eventCallbacks[evt].log);
                    };
                }
            }

            LAZY_KEY = [];
            $.each(SYN_LAZY_QUEUE, function (key, val) {
                isGetmore = true;
                args[key] = val; LAZY_KEY.push(key);
                delete SYN_LAZY_QUEUE[key];
            });

            if (isGetmore) {
                getmore['getmore'] = args;
            }
            //$.support.cors = true;
            _$a.api('POST', '634374721143258750061757?uuid=' + uuid + '&clockpulse=' + userAgent, getmore, function (result) {
                _$q.next(false);
                if (result.ReScript) {
                    that.eval(result.ReScript);
                }
                if (result.rstmore) {
                    $.each(args, function (key, value) {
                        if (result.rstmore.hasOwnProperty(key)) {
                            var rst = result.rstmore[key];
                            if ($.inArray(key, LAZY_KEY) == -1) {
                                if (rst.hasOwnProperty('lgmk') && rst['lgmk']!='') {
                                    lgmk = rst['lgmk'];
                                    localDB.exe('add', 'lgmk', lgmk, 2);
                                };
                                eventCallbacks[key].cb(null, rst);
                            } else {
                                commnunicateTrigger(key, '1', rst);
                            }
                        }
                    });
                };
                //
                if (_$cb) _$cb();
                //
                localTHAT.start_noty_timer(); //debug  
                //
            }, function (err) {
                _$q.next(false); if (_$cb) _$cb();
                DevExpress.ui.notify("Error: '" + err, 'error', 5000);
                localTHAT.start_noty_timer(); //debug  
            });
        });
    }


    this.bind = function (events, callback) {
        for (var i = 0; i < events.length; i++) {
            var evt = events[i].split('_'), _$cb = { cb: callback, act: '1', log: {} }, event = evt[0];
            if (evt[0] == '$attach') {
                _$cb['act'] = evt[2];
                event = evt[0] + '_' + evt[1];
            }
            eventCallbacks[event] = (_$cb);
            //
            if (memorybag.hasOwnProperty(event)) {
                var reserveData = memorybag[event]; delete memorybag[event];
                if (_$cb.act == '1') {
                    _$cb.cb(null, reserveData);
                }
            }
        }
    },
    this.trigger = function (event, _$callback, data) {
        var callback = eventCallbacks[event];
        if (callback && callback.act == '1') {
            callback.cb(_$callback, data);
        }
    };

    return {
        paramChannel: this.paramChannel,
        get_noty: this.get_noty,
        start_noty_timer: this.start_noty_timer,
        stop_noty_timer: this.stop_noty_timer,
        bind: this.bind,
        trigger: this.trigger,
        CommChannel: function (act, jsonObj, $callback) {
            var jsonLAZY = { "status": "0" }, __err = false;//ERR
            try {
                $.each(jsonObj, function (key, val) {
                    if (val['init'] == "RMV") {// co the client dang request server
                        delete SYN_LAZY_QUEUE[key];
                    } else {
                        SYN_LAZY_QUEUE[key] = val;
                    }
                });
                if (!__err) {
                    jsonLAZY["status"] = "1";//OK
                }
            } catch (e) {
            }
            $callback(jsonLAZY);
        }
    }
}
//</script>

//<script type="text/javascript">

var _$hieu, screenloader_frm = $('.screenloader_frm'), masklockscreen = $('#masklockscreen'), $cartTMP, pigActionSheet = $("#action-sheet"), buttonlogout = ko.observable('overflow');

function ImgBase64(url, callback) {
    var image = new Image();
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
        canvas.getContext('2d').drawImage(this, 0, 0);
        callback(canvas.toDataURL('image/png'), url.substr(url.lastIndexOf('/') + 1));
    };
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
}
//</script>

//<script type="text/javascript">
//http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
var jscss_addin = $('#jscss_addin')[0],
    filesadded = "", //list of files already added
    jsLoader = function () { };

jsLoader.prototype = {
    require: function (scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;
        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (src) {
        if (filesadded.indexOf("[" + src + "]") == -1) {
            var self = this;
            var s = document.createElement('script');
            s.type = "text/javascript";
            s.async = true;
            s.src = src;
            s.addEventListener('load', function (e) { self.loaded(e); }, false);
            jscss_addin.appendChild(s);
            //
            filesadded += "[" + src + "]" //add to list of files already added, in the form of "[filename1],[filename2],etc"
        } else {
            this.loaded();
        }
    }
}
function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined")
        //document.getElementsByTagName("head")[0].appendChild(fileref)
        jscss_addin.appendChild(fileref);
}

function checkloadjscssfile(filename, filetype) {
    if (filesadded.indexOf("[" + filename + "]") == -1) {
        loadjscssfile(filename, filetype)
        filesadded += "[" + filename + "]" //add to list of files already added, in the form of "[filename1],[filename2],etc"
    }
}

function removejscssfile(filename, filetype) {
    var removedelements = 0
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist using
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
            removedelements += 1
        }
    }
    if (removedelements > 0)
        alert("Removed " + removedelements + " instances of " + filename)
}

function createjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    return fileref
}

function replacejscssfile(oldfilename, newfilename, filetype) {
    var replacedelements = 0
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist using
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1) {
            var newelement = createjscssfile(newfilename, filetype)
            allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
            replacedelements += 1
        }
    }
    if (replacedelements > 0)
        alert("Replaced " + replacedelements + " instances of " + oldfilename + " with " + newfilename)
}
function get_query(url) {
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
function __retriveCart() {
    function retriveCart(init, suplier) {
        var cartString = localDB.exe('get', 'giohang', null, 0) || '';
        if (cartString.length > 0) {
            var allCart = JSON.parse(atob(cartString).norm_to_unicode());
            if (init) storeGioHang['deliInfo'] = allCart['deliInfo'] || {};
            //
            if (!suplier) {
                return allCart;
            } else {
                if (suplier && allCart.hasOwnProperty(suplier)) {
                    return allCart[suplier];
                }
            }
        }
        return {};
    }
    var storeGioHang = retriveCart(false); storeGioHang['deliInfo'] = {}; storeGioHang[__$ncc] = retriveCart(true, __$ncc);
    return storeGioHang;
}
function logoutmenu(s, e) {
    funActionSheet({
        'dataSource': [{ id: 'signIn', text: gbM('signIn'), 'icon': 'user', visible: buttonlogout() == 'overflow' }
                    , { id: 'signOut', text: gbM('signOut'), 'icon': 'runner' ,visible: buttonlogout() == 'user' }]
                    , 'width': 'auto'
                    , itemTemplate: 'item'
                    , target: s.event.currentTarget
                    ,visible:true,
        usePopover: true,
        showTitle: false,
        onContentReady: function (e) {
            e.component._$itemContainer.parent().parent().addClass('fuckdxActionSheet');
        },
        onItemClick: function (e) {
            if (e.itemData.id == 'signIn') {
                ComApp.app.navigate("Profile", { root: true });
            } else if (e.itemData.id == 'signOut') {
                var storeGioHang = __retriveCart();
                if (storeGioHang['deliInfo'].uid) delete storeGioHang['deliInfo'].uid;
                if (storeGioHang['deliInfo'].phone) delete storeGioHang['deliInfo'].phone;
                if (storeGioHang['deliInfo'].name) delete storeGioHang['deliInfo'].name;
                if (storeGioHang['deliInfo'].addr) delete storeGioHang['deliInfo'].addr;
                localDB.exe('add', 'giohang', btoa(JSON.stringify(storeGioHang).norm_to_ascii()), 0);
                buttonlogout('overflow');
                buttonlogout.cptmp = undefined;
                buttonlogout.refreshCartData = '1';
                localDB.exe('rmv', 'exUI', null, 0);
                if (ComApp.app.maCurrentView.name == "Profile") {
                    ComApp.app.maCurrentView.logout();
                } else if (ComApp.app.maCurrentView.name == "Menu" || ComApp.app.maCurrentView.name == "Order") {
                    ComApp.app.maCurrentView.reloadCart();
                }
            };
        }
    });
}
function quanlydangnhap(deliData, cartxx) {
    if (buttonlogout() == 'user' || (deliData && deliData.hasOwnProperty('uid') && deliData.hasOwnProperty('MatchRst') && deliData['MatchRst']!='0')) {
        var placeorder = cartxx.find('.screen-placeorder');
        placeorder.find('.guest').remove();
        var legend = placeorder.find('.legend.plane');
        legend.parent().removeClass('fastcartform').addClass('usercartform');
        legend.removeClass('plane');
        legend.addClass('nguoidung');
        legend.html('<span>' + gbM('S1_036') + '</span>');
        placeorder.find('.placeorder_button').html('<span><i class="fa fa-check-square-o"></i>' + gbM('S1_014') + '</span>');
    };
}
function quanlyorderlogin(uid, MatchRst) {
    if (MatchRst && MatchRst != '0') {
        buttonlogout('user');
        buttonlogout.cptmp = uid;
    };
}
function lookupmore($el, exUI, prop) {
    if (buttonlogout()=='user' && exUI.length == 2) {
        var moreLK = $el.next(),  data = exUI[1][prop];
        if (exUI[0].hasOwnProperty(prop)) {
            if (data.length > 0 || $el.val() != exUI[0][prop]) {
                data.push(exUI[0][prop]);
            };
        }
        moreLK[((data.length > 0) ? 'remove' : 'add') + 'Class']('noex');
        moreLK.data('exUI', data);
    };
}
function global_login(__$input, __feedback, __$cb) {
    var isValid = true, that = this, rstLOGIN = function (rst, kq) {
        _$q.next(false);
        var msgFail = '';
        if (kq == 'err') {
            msgFail = rst;
        } else if (rst.kq != 'OK') {
            var msg = JSON.parse(rst.msg);
            msgFail = msg['loginfail'] + '<br/>' + msg['failmsg'];
        };
        if (msgFail != '') {
            __feedback.parent().removeClass('info').addClass('fail');
            __feedback.html('<span class="fa fa-exclamation-triangle"></span><div>' + msgFail + '</div>');
        } else {//OK
            __$input.val('');
            var retriveCart= function(init, suplier) {
                var cartString = localDB.exe('get', 'giohang', null, 0) || '';
                if (cartString.length > 0) {
                    var allCart = JSON.parse(atob(cartString).norm_to_unicode());
                    if (init) storeGioHang['deliInfo'] = allCart['deliInfo'] || {};
                    //
                    if (!suplier) {
                        return allCart;
                    } else {
                        if (suplier && allCart.hasOwnProperty(suplier)) {
                            return allCart[suplier];
                        }
                    }
                }
                return {};
            }
            var storeGioHang = retriveCart(false); storeGioHang['deliInfo'] = {};storeGioHang[__$ncc] = retriveCart(true, __$ncc);
            var arg = JSON.parse(rst.msg); $.extend(arg, rst.data);
            var storeObj = { 'uid': arg.uid, 'name': arg.name, 'phone': arg.phone, 'addr': arg.addr, 'MatchRst': arg.MatchRst };
            $.each(storeObj, function (k, v) {
                storeGioHang['deliInfo'][k] = v;
            });
            localDB.exe('add', 'giohang', btoa(JSON.stringify(storeGioHang).norm_to_ascii()), 0);
            localDB.exe('add', 'exUI',[rst.data, rst.exdata], 0);
            buttonlogout.refreshCartData = '1';
            if (__$cb) __$cb(rst);
        }
        scrReleased();
    };
    var Args = { 'act': 'login' };
    __$input.each(function (i, el) {
        if ($.trim($(el).val()) == '') {
            var _$p = $(el).parent(), __$p = _$p.parent();
            _$p.addClass('txt-invalid'); __$p.addClass('errdulieu');
            isValid = false;
            $(el).focus();
        } else {
            Args[el.name] = $.trim(el.value);
        };
    })
    if (isValid) {
        scrLocked();
        _$q.add(function () {
            _$a.api('POST', '634445598610781250052977', Args, function (rst) {
                rstLOGIN(rst, 'ok');
            }, function (err) {
                rstLOGIN(err, 'err');
            });
        }, true);
    }
}


function do_km(params,_cb) {
    var editorURL = '../luckyspin/spin.html?isDevice=' + mobileClient + '&w=200&h=200&bagid=1&' + JsCssPrefix.replace('?', '');
    var editor = $('<div class="iframe-wrapper" style="z-index:200"><iframe scrolling="no" src="' + editorURL + '"></iframe></div>');
    editor.find('iframe').on("load", function () {
        var args = $.extend({}, { 'act': '-1'}, params), exitgame = function (rst) {
            scrLocked();
            args['gamerst'] =rst ;
            memorybag['luckyspin'] = args;
            editor.fadeOut('slow', function () {
                editor.remove();
            });
            if (_cb) _cb();
        };
        this.contentWindow.startGame(args, function (p) {
            switch (p['act']) {
                case 'exit': {
                    while (DevExpress.hideTopOverlay()) { };
                    exitgame('exit');
                    break;
                }
                case 'srcLocked': {
                    scrLocked(p['delay']);
                    break;
                }
                case 'save': {
                    exitgame(p['rst']);
                    break;
                }
            };
        });
    });
    editor.appendTo('.dx-viewport');
}

//</script>


$(document).ready(function () {
    //_$q.add(function () {
    _$hieu = MyHandler(window);
    //});
    //screenloader_frm.css('display', 'none');

    if (mobileClient=='1'){
        checkloadjscssfile(gitpath + "js/virtualKeyboardDetector.js", "js");
    }

    $('body').on('keypress', 'input[type=number][maxlength]', function (event) {
        var key = event.keyCode || event.charCode;
        var charcodestring = String.fromCharCode(event.which);
        var txtVal = $(this).val();
        var maxlength = $(this).attr('maxlength');
        var regex = new RegExp('^[0-9]+$');
        // 8 = backspace 46 = Del 13 = Enter 39 = Left 37 = right Tab = 9
        if (key == 8 || key == 46 || key == 13 || key == 37 || key == 39 || key == 9) {
            return true;
        }
        // maxlength allready reached
        //if (txtVal.length == maxlength) {
        //    event.preventDefault();
        //    return false;
        //}
        // pressed key have to be a number
        if (!regex.test(charcodestring)) {
            event.preventDefault();
            return false;
        }
        return true;
    });
    $('body').on('paste', 'input[type=number][maxlength]', function (event) {
        //catch copy and paste
        var ref = $(this);
        var regex = new RegExp('^[0-9]+$');
        var maxlength = ref.attr('maxlength');
        var clipboardData = ($isIE) ? window.clipboardData.getData('text') : event.originalEvent.clipboardData.getData('text/plain');
        var txtVal = ref.val();//current value
        var filteredString = '';
        var combined_input = txtVal + clipboardData;//dont forget old data

        for (var i = 0; i < combined_input.length; i++) {
            if (filteredString.length < maxlength) {
                if (regex.test(combined_input[i])) {
                    filteredString += combined_input[i];
                }
            }
        }
        setTimeout(function () {
            ref.val('').val(filteredString)
        }, 100);
    });

    //https://coderwall.com/p/_8jxgw/autoresize-text-to-fit-into-a-div-width-height
    $.fn.autoSizr = function () {
        var el, elements, _i, _len, _results;
        elements = $(this);
        if (elements.length < 0) {
            return;
        }
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
            el = elements[_i];
            _results.push((function (el) {
                var resizeText, _results1;
                resizeText = function () {
                    var elNewFontSize;
                    elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
                    return $(el).css('font-size', elNewFontSize);
                };
                _results1 = [];
                while (el.scrollWidth > el.offsetWidth) {
                    _results1.push(resizeText());
                }
                return _results1;
            })(el));
        }
        return $(this);
    };
});

function _virtualKeyboard(act,show,hide) {
    if (mobileClient == '1') {
        if (show) virtualKeyboardDetector[act]('virtualKeyboardVisible', show);
        if (hide) virtualKeyboardDetector[act]('virtualKeyboardHidden', hide);
    }
}

function funActionSheet(opts) {
    var options = $.extend(true, {}, {
        showTitle: false, showCancelButton: false, mode: 'init',
    }, opts);
    pigActionSheet.dxActionSheet(options).dxActionSheet("instance");
}

var clickPrevent = '', clickDelay, clickLocked = function (toVAL) {
    clickPrevent = '1';var defTO = 1000;
    clearTimeout(clickDelay);
    if (toVAL) defTO = toVAL;
    clickDelay = setTimeout(function () { clickPrevent = ''; }, defTO);
};

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function nutclickeffect(nut) {
    nut.attr('tabindex', 1).focus();
    setTimeout(function () { nut.removeAttr('tabindex').blur(); }, 1000);
}