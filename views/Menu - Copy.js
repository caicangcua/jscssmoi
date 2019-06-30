"use strict";

ComApp.Store.Menu = function (params) {
    jQuery.extend(jQuery.easing, { easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a } });
    jQuery.fn.shake = function (interval, distance, times) {
        interval = typeof interval == "undefined" ? 100 : interval;
        distance = typeof distance == "undefined" ? 10 : distance;
        times = typeof times == "undefined" ? 3 : times;
        var jTarget = $(this);
        jTarget.css('position', 'relative');
        for (var iter = 0; iter < (times + 1) ; iter++) {
            jTarget.animate({ top: ((iter % 2 == 0 ? distance * Math.random() : distance * Math.random() * -1)), left: ((iter % 2 == 0 ? distance * Math.random() : distance * Math.random() * -1)) }, interval);
        }
        return jTarget.animate({ top: 0, left: 0 }, interval);
    }
    var fuck = function () {

        (function ($) {
            $.fn.slideUpTransition = function () {
                return this.each(function () {
                    var $el = $(this);
                    $el.css("max-height", "0");
                    $el.addClass("height-transition-hidden");

                });
            };

            $.fn.slideDownTransition = function () {
                return this.each(function () {
                    var $el = $(this);
                    $el.removeClass("height-transition-hidden");

                    // temporarily make visible to get the size
                    $el.css("max-height", "none");
                    var height = $el.outerHeight();

                    // reset to 0 then animate with small delay
                    $el.css("max-height", "0");

                    setTimeout(function () {
                        $el.css({
                            "max-height": height
                        });
                    }, 1);
                });
            };
        })(jQuery);

        (function ($) {
            //https://demo.tutorialzine.com/2011/12/countdown-jquery/
            // Number of seconds in every time division
            var days = 24 * 60 * 60,
                hours = 60 * 60,
                minutes = 60;


            // Creating the plugin
            $.fn.countdown = function (prop) {
                this.empty();

                var options = $.extend({
                    callback: function () { },
                    timestamp: 0
                }, prop);

                var left, d, h, m, s, positions;

                // Initialize the plugin
                init(this, options);

                positions = this.find('.position');

                (function tick() {

                    // Time left
                    left = Math.floor((options.timestamp - (new Date())) / 1000);

                    if (left < 0) {
                        left = 0;
                    }

                    // Number of days left
                    d = Math.floor(left / days);
                    updateDuo(0, 1, d);
                    left -= d * days;

                    // Number of hours left
                    h = Math.floor(left / hours);
                    updateDuo(2, 3, h);
                    left -= h * hours;

                    // Number of minutes left
                    m = Math.floor(left / minutes);
                    updateDuo(4, 5, m);
                    left -= m * minutes;

                    // Number of seconds left
                    s = left;
                    updateDuo(6, 7, s);

                    // Calling an optional user supplied callback
                    options.callback(d, h, m, s);

                    // Scheduling another call of this function in 1s
                    setTimeout(tick, 1000);
                })();

                // This function updates two digit positions at once
                function updateDuo(minor, major, value) {
                    switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
                    switchDigit(positions.eq(major), value % 10);
                }

                return this;
            };



            function init(elem, options) {
                elem.addClass('countdownHolder');

                // Creating the markup inside the container
                $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {
                    $('<span class="count' + this + '">').html(
                        '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
                    ).appendTo(elem);

                    if (this != "Seconds") {
                        elem.append('<span class="countDiv countDiv' + i + '"></span>');
                    }
                });

            }

            // Creates an animated transition between the two numbers
            function switchDigit(position, number) {

                var digit = position.find('.digit')

                if (digit.is(':animated')) {
                    return false;
                }

                if (position.data('digit') == number) {
                    // We are already showing this number
                    return false;
                }

                position.data('digit', number);

                var replacement = $('<span>', {
                    'class': 'digit',
                    css: {
                        top: '-2.1em',
                        opacity: 0
                    },
                    html: number
                });

                // The .static class is added when the animation
                // completes. This makes it run smoother.

                digit
                    .before(replacement)
                    .removeClass('static')
                    .animate({ top: '2.5em', opacity: 0 }, 'fast', function () {
                        digit.remove();
                    })

                replacement
                    .delay(100)
                    .animate({ top: 0, opacity: 1 }, 'fast', function () {
                        replacement.addClass('static');
                    });
            }
        })(jQuery);
    }

    function giohang(id, sl) {
        var incart = (cartData[id] || 0) + sl;
        if (incart > 0) { cartData[id] = incart; } else { delete cartData[id]; };
        apiHistory($attach, { 'cart': cartData });
        localDB.exe('add', 'giohang', cartData, 0);
    }
    function giohangItems(cart, sl, hitCart) {
        if (!sl) {
            sl = 0
            $.each(cartData, function (key, val) {
                sl += 1;
            });
        };
        if (sl != 0) cart.shake(100, 10, 3);
        var badge = cart.find('#cartcount');
        if (badge.length == 0 && sl>0) {
            cart.append($('<div id="cartcount" class="badge pulsate">' + sl + '</div>'));
        } else {
            var no = badge.text(), newSL = sl + parseInt(no);
            if (newSL > 0) {
                badge.text(newSL);
            } else {
                badge.remove();
            }
        }
        if (hitCart) hitCart[(sl>0)?'addClass':'removeClass']('oncart');
    }
    function add2Cart(hitCart) {
        var cart = $('#giodunghang'), sl = 0;
        if (!$(hitCart).hasClass('oncart')) {
            var imgtodrag = $(hitCart).parent().parent().find('img').eq(0), doAdd = function () {
                giohangItems(cart, sl, $(hitCart));
            };
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': imgtodrag.height() + 'px',
                        'width': imgtodrag.width() + 'px',
                        'z-index': '100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 1000, 'easeInOutExpo', function () {
                        doAdd();
                    });
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });
            } else {
                doAdd();
            }
            sl = 1;
        } else {
            sl = -1;
            giohangItems(cart, sl, $(hitCart));
        }
        giohang($(hitCart).parent().closest('li').data().id, sl);
    }

    function MenuList() {
        var clickEvent = (function () {
            if ('ontouchstart' in document.documentElement === true)
                return 'touchstart';
            else
                return 'click';
        })(),
        _rotateItem = function (trigger, item) {
            var nextQ = function (_idx) {
                var queImg = $(item).data('queImg'), $imgs = $(item).find('img'), _imgs = queImg[0], _imgIdx = queImg[1];
                if (_imgs.length > 0) {
                    if (_imgIdx < _imgs.length - 1) {
                        _imgIdx += 1;
                    } else {
                        _imgIdx = 0;
                    }
                    $imgs.eq(_idx).attr('src', _imgs[_imgIdx]);
                    queImg[1] = _imgIdx;
                }
            }
            if (item.getAttribute('data-open') === 'open') {
                item.setAttribute('data-open', '');
                trigger.className = trigger.className.replace(/\b cbp-pgrotate-active\b/, '');
                item.className = item.className.replace(/\b cbp-pgitem-showback\b/, '');
                setTimeout(function () { nextQ(1) }, 10);
            }
            else {
                item.setAttribute('data-open', 'open');
                trigger.className += ' cbp-pgrotate-active';
                item.className += ' cbp-pgitem-showback';
                setTimeout(function () { nextQ(0) }, 10);
            }
        },
        _showItemOptions = function (trigger) {
            if (trigger.getAttribute('data-open') === 'open') {
                trigger.setAttribute('data-open', '');
                trigger.parentNode.className = trigger.parentNode.className.replace(/\b cbp-pgoption-active\b/, '');
            }
            else {
                trigger.setAttribute('data-open', 'open');
                trigger.parentNode.className += ' cbp-pgoption-active';
            }
        }


        this._init = function (el) {
            var self = this;
            el.on(clickEvent, 'span.cbp-pgrotate', function (e) {
                _rotateItem(this, this.nextElementSibling);
            }).on(clickEvent, 'ul.cbp-pgoptions', function (evt) {
                switch (evt.target.className.split(' ')[0]) {
                    case 'cbp-pgoptcart': {
                        add2Cart(evt.target || evt.srcElement);                        
                        break;
                    }
                    case 'cbp-pgoptcolor': {
                        _$hieu.get_noty();
                        break;
                    }
                    case 'cbp-pgoptfav': {
                        alert('here');
                        break;
                    }
                    default: {
                        //_$hieu.trigger("Menu", null, [1, 2, 3]);
                        break;
                    }
                };
            });
        }


        return {
            _init: this._init
        }
    };

    function displayBlankMenu($el,total) {
        var cnt=$el.children().length;
        if (cnt == 12) {
            var $fooding = $("<div class='fooding'><div class='fooding1'></div><div class='fooding2'>COM DANG NAU ...</div></div>");
            $el.closest('#dxScrollView_food').append($fooding);
        } else {
            $fooding = $el.closest('#dxScrollView_food').find('.fooding');
            $fooding.remove();
        };
        var releaseState = (cnt - 12) == total;
        instanceScroll.release(releaseState);
        if (!releaseState) triggerScrollReachBottom();
        _$q.next();
    }
    function add2MenuList($el, _rst) {
        if (!_blankli) _blankli = $el.find('li.chew-cell--ghost').eq(0);
        if (!sampleLI) {
            sampleLI = _blankli.prev(), sampleLI.detach();
        };
        //
        var _NEW = function (monAn) {
            if (monAn) {
                for (var i = 0; i < monAn.length; i++) {
                    var eachFood = function () {
                        var newLi = sampleLI.clone();
                        addOrUpt(this, newLi);
                        newLi.hide().insertBefore(_blankli).fadeIn('slow', function () {
                            _$q.next();
                        });
                    };
                    _$q.add(eachFood.bind(monAn[i]));
                }
            }
        },
        _RST = function (monAn) {
            $el.find('>li:not(.chew-cell--ghost)').filter(function () {
                var _eLI = $(this), _id = _eLI.data('id'), isMatch = -1;
                $.grep(monAn, function (m, i) {
                    if (m.id == _id) {
                        isMatch = m.status;
                        if (m.status == 1) {//modify
                            addOrUpt(m, _eLI);
                            m.itemModify = '1';
                        }
                    }
                });
                if (isMatch != 1) {//delete
                    _$q.add(function () {
                        this.fadeOut('fast', function () {
                            $(this).remove();
                            _$q.next();
                        });
                    }.bind(_eLI));
                }
            });
            return $.grep(monAn, function (m, i) {
                return !m.itemModify;
            });
        },
        _UPT = function (monAn) {
            $el.find('>li:not(.chew-cell--ghost)').filter(function () {
                var _eLI = $(this), _id = _eLI.data('id');
                $.grep(monAn, function (m, i) {
                    if (m.id == _id) {
                        if (m.status == 1) {//modify
                            addOrUpt(m, _eLI);
                        } else {//remove
                            _$q.add(function () {
                                this.fadeOut('fast', function () {
                                    $(this).remove();
                                    _$q.next();
                                });
                            }.bind(_eLI));
                        }
                        m.itemModify = '1';
                    }
                });
            });
            //
            return $.grep(monAn, function (m, i) {
                return m.itemModify==undefined;
            });
        };
        //
        if (_rst.act == 0) {// new blank
            _NEW(_rst.n);
        } else if (_rst.act == 1) { // new reset
            var _rst = _RST(_rst.n);
            _NEW(_rst);
        } else if (_rst.act == 2) { // upt & new page
            var _ins = _UPT(_rst.u);
            if (_rst.n) {
                $.extend(true, _ins, _rst.n);
            }
            _NEW(_ins);
        };
        _$q.add(displayBlankMenu.bind(this, $el, _rst.athis[3]));
    }

    function addOrUpt(info, $li) {
        $li.data('id', info['id']);
        $li.find('.cbp-pginfo h3').text(info['ten']);
        var giaban = Globalize.formatCurrency(info['giaban'], gbM('_$GL'), {
            maximumFractionDigits: 0
        })
        $li.find('.cbp-pginfo .cbp-pgprice').text(giaban);
        //
        if (info.imgs.length > 0) {
            var _baseURL = function (_raws) {
                _raws[_raws.length - 1] = ''; return _raws.join('/');
            }, tarea_regex = /(http(s?))\:\/\//gi, imgs = info.imgs.split(','), img = '', backI =-1;
            for (var z = 0; z < imgs.length; z++) {
                if (!tarea_regex.test(imgs[z])) {
                    imgs[z] = _baseURL(imgs[z - 1].split('/')) + imgs[z];
                };
                if (z < 2) {
                    backI += 1;
                    img += '<img draggable="false" src="' + imgs[z] + '"/>';
                }
            };
            $li.find('.cbp-pgitem-flip').html(img).parent().data('queImg', [imgs, backI]);
        }
        //cart exists
        if (cartData.hasOwnProperty(info['id'])) {
            $li.find('.cbp-pgoptcart').addClass('oncart');
        };
    }

    function cartcolQty() {
        var pQTY = $('.giohang .cartx'), colQTY = pQTY.find('.col-qty');
        if (colQTY.length > 0) {
            colQTY.removeClass('ex2 ex1');
            var fDIV = pQTY.find('.scrollbody .col-qty').eq(0).find('div'), f0 = fDIV[0].parentNode.getBoundingClientRect(), f1 = fDIV[0].getBoundingClientRect(), f2 = fDIV[1].getBoundingClientRect(), __offset = parseInt(f2.left - f1.left), pad = parseInt(f1.left - f0.left), cls = '',
                __w = pQTY.find('.table').width(), __wMin = __w * 12 / 100, __wMax = __w * 17 / 100;
            if (__offset == 0) {
                if (f0.width < 60) {
                    cls += ' ex1';
                    if (f0.width < 50) cls += ' ex2';
                }
            } else if (parseInt(f1.top - f2.top) != 0) {
                if (f0.width < 125) {
                    cls += ' ex1';
                    if (f0.width < __wMax && f0.width < 95) {
                        cls += ' ex2';
                    };
                }
            }
            if (cls.length > 0) pQTY.find('.col-qty').addClass(cls);
        }
    }


    function listenChannel($el, _rst) {
        apiHistory($attach, { 'his': _rst.athis,'more':'u' });
        add2MenuList($el, _rst);
        //
        //if (!act) {
   
        //} else if (act == 'new') {
        //    add2MenuList($el, _rst); // ly do man hinh con trong
        //    //if (instanceScroll._$element.find(".dx-scrollview-content").height() <= instanceScroll._$element.find(".dx-scrollable-container").height()) {
        //    //    add2MenuList($el, _rst); // ly do man hinh con trong
        //    //} else  {
        //    //    reserveData = _rst;//store de do, chung nao user scroll thi add vao.
        //    //}
        //}
    }

    function triggerScrollReachBottom() {
        setTimeout(function () {
            var viewH = instanceScroll._$element.find(".dx-scrollable-container").height(),
                _$body = instanceScroll._$element.find(".dx-scrollview-content").height();
            if (_$body <= viewH) {
                instanceScroll.release(true);
                apiHistory($attach, { 'more': 'b' });
            } else {
                var _$pocketT = instanceScroll._$bottomPocket.offset().top;
                if (_$pocketT <= viewH) {
                    instanceScroll.scrollTo(_$body - _$pocketT - 20);
                };
                apiHistory($attach, { 'more': 'u' });
            };
        });
    }


    function xulyScrollReachBottom(e) {
        clearTimeout(timerReachBottom);
        timerReachBottom=setTimeout(function () {
            _$hieu.stop_noty_timer();
            apiHistory($attach, { 'more': 'b' });
            _$hieu.get_noty();
        },200);
    }

    var evtname, $attach = '$attach_634444690322031250072038', shop, instanceScroll = null, sampleLI, _blankli, cartData = localDB.exe('get', 'giohang', null, 0) || {}, showCart = false, viewloaded = false, timerReachBottom;
    var viewModel = {
        viewRendered: function (e) {
            evtname = e.viewInfo.viewName;
            var $el = $(e.viewInfo.renderResult.$markup[1]).find('.cbp-pggrid');
            _$hieu.bind([$attach + '_1', evtname], function (_$cb, monAn) {
                listenChannel($el, monAn);
            });
            shop = new MenuList()._init($el.parent());
        }
        ,viewShown:function(e){
            if (!viewloaded) {
                viewloaded = true;
                giohangItems($('#giodunghang'));
                apiHistory($attach, { 'cart': cartData });
                fuck();
            };
        }
        , _orientationChanged: function (ori) {
            setTimeout(function () {
                triggerScrollReachBottom();
                if (showCart) cartcolQty();
            }, 500);
        }
        , onInitScroll: function (e) {
            instanceScroll = e.component;
        }
        , onReachBottomMenu: function (e) {
            xulyScrollReachBottom(e);
        }
        , testapi: function (e) {
            //debugger;
            var uptLan = gbM("S1_CACHEVER");
            _gbM({ 'vi': { 'S1_CACHEVER': '1' } });
            uptLan = gbM("S1_CACHEVER");
            ;
            _$q.add(function () {
                var args = ['634374721143258750061757'];
                _$a.api('POST', '634444690322031250072038', args, function (result) {
                    _$q.next(false);
                    //
                }, function (err) {
                    DevExpress.ui.notify("Error: '" + err, 'error', 5000);
                    _$q.next(false); scrReleased();
                });
            });
        }
        , and2Cart: function (s,evt) {
            //add2Cart(event.target || event.srcElement);
        }
        ,cartHandler: function (e) {
            if ($.isEmptyObject(cartData)) return;
            scrLocked();
            //
            var popupElement = $("<div class='shared_popup placeorder'></div>").appendTo('.dx-viewport'), dathangcase = {}, renderPopupCart = function (contentElement, __rawHTML) {
                var cartxx = $(__rawHTML);
                var dathang = cartxx.find('.dathangcase');
                dathangcase['3'] = $(dathang[3]).clone(); $(dathang[3]).remove();
                dathangcase['2'] = $(dathang[2]).clone();   $(dathang[2]).remove();
                dathangcase['0'] = $(dathang[0]).clone(); $(dathang[0]).remove();
                //
                var  scrollOpts = {}, __bCart = cartxx.find('.scrollbody'), __sampleP = __bCart.children().first(); __sampleP.detach();
                $.each(cartData, function (key, val) {
                    __bCart.append(__sampleP.clone());
                });
                //
                contentElement.append(scrollView);
                ComApp.app._localizeMarkup(cartxx)
                scrollView.append(cartxx);
                //
                if (mobileClient == '1') {
                    scrollOpts = {
                        onScroll: function (e) {
                            clearTimeout(scrollTimer);
                            scrollTimer = setTimeout(function () {
                                scrollData = e.scrollOffset;
                            }, 500);
                        }
                    }
                }
                scrollView.dxScrollView(scrollOpts).dxScrollView('instance');
            }
            , scrollView = $("<div/>"), scrollTimer, scrollData, scrollDataXXX, virtualPad = function (s) {
                clearTimeout(scrollTimer);
                scrollView.data().dxScrollView.scrollTo(scrollData);
            }
            , popupEvts = function () {
                //
                scrollView.find('#cart_clear').click(function (s, e) {
                    popupInstance.hide();
                    ComApp.app.navigate("Order", { root: true });
                });
                //
                scrollView.find('.placeorder_button').on('click', function (e) {
                    var isValid = true;
                    if (this.id == 'fastplaceorder') {
                        scrollView.find('#fastcartform input.sodienthoai').each(function (i, el) {
                            if ($.trim($(el).val()) == '') {
                                var _$p = $(el).parent(), __$p = _$p.parent();
                                _$p.addClass('txt-invalid'); __$p.addClass('errdulieu');
                                isValid = false;
                                $(el).focus();
                            }
                        });
                    }
                    if (!isValid) return;
                    //
                    var postRst = function (data, args) {
                        _$q.next(false);
                        if (args['act'] == '0') {
                            var popup = null, popupOptions = {
                                width: 300,
                                height: 270,
                                contentTemplate: function () {
                                    var tmp = dathangcase[3];
                                    ComApp.app._localizeMarkup(tmp);
                                    //
                                    tmp.find('.a_demo_one').on('click', function () {
                                        popup.hide();
                                        kicksvr({ 'act': '1' });
                                    });
                                    tmp.find('img').attr('src', 'data:image/png;base64,' + data.captcha.CaptchaImage);
                                    return tmp;
                                },
                                showTitle: true,
                                toolbarItems: [
                                    {
                                        location: "before",
                                        toolbar: "top",
                                        widget: "dxButton",
                                        options: {
                                            icon: "refresh",
                                            elementAttr: { 'class': 'flatbutton' },
                                            onClick: function (e) {
                                                alert('here');
                                            }
                                        }
                                    }
                                ,{
                                    location: "center",
                                    toolbar: "top",
                                    text: 'BUOC XAC NHAN'
                                }]
                                ,onHidden: function () {
                                    $popupContainer.remove();
                                },
                                dragEnabled: false
                            };
                            var $popupContainer = $("<div class='captcha_popup'/>").appendTo(popupElement);
                            popup = $popupContainer.dxPopup(popupOptions).dxPopup("instance");
                            popup.show();
                        } else {
                            popupInstance.hide();
                        }
                        scrReleased();
                    }, kicksvr = function (args) {
                        scrLocked();
                        _$q.add(function () {
                            _$a.api('POST', '634445158944375000020258', args, function (result) {
                                _$q.next(false);
                                postRst(result, args);
                            }, function (err) {
                                _$q.next(false);
                                postRst(result, args);
                            });
                        });
                    };
                    kicksvr({ 'act': '0' });
                });
                //
                if (dathangcase.hasOwnProperty('0')) {//new visistor
                    var loginEvts = function () {
                        scrollView.find('.resetpass').on('click', function () {
                            var chotdonhang = scrollView.find('.login.chotdonhang');
                            var datlaipass = scrollView.find('.login.datlaipass');

                            var dateAdd = function (date, interval, units) {
                                var ret = new Date(date); //don't change original date
                                var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
                                switch (interval.toLowerCase()) {
                                    case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
                                    case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
                                    case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
                                    case 'week': ret.setDate(ret.getDate() + 7 * units); break;
                                    case 'day': ret.setDate(ret.getDate() + units); break;
                                    case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
                                    case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
                                    case 'second': ret.setTime(ret.getTime() + units * 1000); break;
                                    default: ret = undefined; break;
                                }
                                return ret;
                            }

                            var note = $('#note'), ts = dateAdd(new Date(), 'minute', 2), newYear = true;// new Date(2019, 0, 1),

                            if ((new Date()) > ts) {
                                // The new year is here! Count towards something else.
                                // Notice the *1000 at the end - time must be in milliseconds
                                ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
                                newYear = false;
                            }

                            $('#countdown').countdown({
                                timestamp: ts,
                                callback: function (days, hours, minutes, seconds) {

                                    var message = "";

                                    message += days + " day" + (days == 1 ? '' : 's') + ", ";
                                    message += hours + " hour" + (hours == 1 ? '' : 's') + ", ";
                                    message += minutes + " minute" + (minutes == 1 ? '' : 's') + " and ";
                                    message += seconds + " second" + (seconds == 1 ? '' : 's') + " <br />";

                                    if (newYear) {
                                        message += "left until the new year!";
                                    }
                                    else {
                                        message += "left to 10 days from now!";
                                    }

                                    note.html(message);
                                }
                            });

                            chotdonhang.fadeOut(300, function () {
                                $('.table').css({ 'display': 'none' });
                                datlaipass.fadeIn('slow', function () {

                                });
                            });

                            //scrollView.find('.login.chotdonhang,.login.datlaipass').toggle(300);
                        });

                        scrollView.find('#resetpass_close').on('click', function () {
                            var chotdonhang = scrollView.find('.login.chotdonhang');
                            var datlaipass = scrollView.find('.login.datlaipass');

                            datlaipass.fadeOut(500, function () {
                                chotdonhang.fadeIn('slow');
                            });

                        });

                        scrollView.find('#dologin_close').on('click', function () {
                            var placeorder = scrollView.find('.screen-placeorder');
                            var dangnhap = scrollView.find('.screen-dangnhap');
                            dangnhap.fadeOut(500, function () {
                                placeorder.fadeIn('slow');
                                $('.table').css({ 'display': '' });
                                scrollView.data().dxScrollView.scrollTo(scrollDataXXX);//restore scrollPosition
                            });
                        });
                    }
                    //
                    scrollView.find('#dangnhap_button').on('click', function () {
                        scrollDataXXX = scrollView.data().dxScrollView.scrollOffset();//backup scrollPosition
                        var placeorder = scrollView.find('.screen-placeorder');
                        var dangnhap = scrollView.find('.screen-dangnhap');
                        placeorder.fadeOut(500, function () {
                            //has 2 placeorder
                        });
                        setTimeout(function () {
                            dangnhap.fadeIn('slow');
                            $('.table').css({ 'display': 'none' });
                            if (!dangnhap.data('loginEvts')) loginEvts();
                            dangnhap.data('loginEvts', '1');
                        }, 500);
                    });
                    scrollView.find('#fastcartform input').blur(function () {
                        var $input = $(this);
                        if ($input.hasClass('sodienthoai')) {
                            var _$p = $input.parent(), __$p = _$p.parent();
                            if (_$p.hasClass('txt-invalid')) {
                                if ($.trim($input.val()) != '') {
                                    _$p.removeClass('txt-invalid'); __$p.removeClass('errdulieu');
                                }
                            }
                        }
                        $(this).parent().parent().removeClass("dx-state-focused");
                    }).focus(function () {
                        $(this).parent().parent().addClass("dx-state-focused")
                    });
                    scrollView.find('#fastcartform input[type=tel]').keypress(function (e) {
                        //if the letter is not digit then display error and don't type anything
                        if (e.which != 32 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                            //display error message
                            //$("#errmsg").html("Digits Only").show().fadeOut("slow");
                            return false;
                        }
                    });
                }
            }
            ,popupInstance = popupElement.dxPopup({
                fullScreen: true
                , dragEnabled: false
                , showTitle: true
                , deferRendering:false
                , contentTemplate: function (contentElement) {
                    $.get(gitpath + "template/tmpcart.html", function (data) {
                        renderPopupCart(contentElement, data);
                    });
                }
                , onHidden: function () {
                    _virtualKeyboard('off', null, virtualPad);
                    popupElement.remove();
                    showCart = false;
                }
                , onShown: function (e) {
                    showCart = true;
                    setTimeout(function () {
                        cartcolQty();
                        e.element.find('.dx-toolbar-center').html(gbM("S1_002"));
                        _virtualKeyboard('on', null, virtualPad);
                        popupEvts();
                        scrReleased();
                    });
                }
            }).dxPopup('instance');
            setTimeout(function () {
                popupInstance.show();
            }, 200);
        }
        , getDS: function (e) {
            var c = e;
        }
        , scrollRelease: function (e) {
            if (instanceScroll) {
                instanceScroll.release(false);
            }
        }
    };

    return viewModel;
};