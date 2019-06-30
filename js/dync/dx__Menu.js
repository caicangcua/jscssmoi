"use strict";

(function () {
    ComApp.app.maCurrentView__$cartPopup = function (__$shared, cartxx, tgGiaoHang) {
        var that = this, popupElement = $("<div class='shared_popup placeorder'></div>").appendTo('.dx-viewport'), dathangcase = {},tongcong, cartData = __$shared._cartData()
        , renderPopupCart = function (contentElement) {
            var dathang = cartxx.find('.dathangcase'), deliverytime = cartxx.find('.deliverytime'), timeLabel = deliverytime.children().first();
            dathangcase['3'] = $(dathang[3]).clone(); $(dathang[3]).remove();
            dathangcase['2'] = $(dathang[2]).clone(); $(dathang[2]).remove();
            dathangcase['0'] = $(dathang[0]).clone(); $(dathang[0]).remove();
            //
            var scrollOpts = {}, deliData = __$shared._deliInfo(), __bCart = cartxx.find('.scrollbody'),
                UptCart = function (el, sl) {
                    __$shared._cbCart(el.parent().data().id.toString(), {
                        'sl': sl
                    });
                }
                , QTY = function (el, sl) {
                    if (el && el.length > 0) {
                        var $d = cartData[el.data().id.toString()];
                        if (sl != undefined && sl != null) {
                            $d['sl'] = parseInt(sl);
                        } else {
                            el.find('.col-qty input').val($d['sl']);
                        };
                        var sotien = parseFloat($d['giaban']) * parseFloat($d['sl']),
                            colTotal = el.find('.col-total p');
                        colTotal.html(_Tien($d['sl'] * $d['giaban'], 0));
                    };
                    var $tong = cartxx.find('.tf .row .subtotal');
                    $tong[0].innerHTML = _Tien(0, 0);
                    $tong[1].innerHTML = _Tien(0, 0);
                    tongcong = 0;
                    $.each(cartData, function (key, $d) {
                        tongcong += $d['sl'] * $d['giaban'];
                    });
                    $tong[2].innerHTML = _Tien(0, 0);
                    $tong[3].innerHTML = _Tien(tongcong, 0);
                }
                , SPview = function (el) {
                    var $d = cartData[el.data().id];
                    el.find('.col-pro >*').each(function (i, s) {
                        switch (s.tagName.toLowerCase()) {
                            case 'span': {
                                s.innerHTML = 'G: ' + _Tien($d['giaban'], 0);// + '<br/>Vat: ' + _Tien($d['v'], 0);
                                break;
                            }
                            case 'img': {
                                var imgs = $d.imgs.split(',');
                                if (imgs.length > 0 && imgs[0] != '') s.src = imgs[0];
                                break;
                            }
                            case 'p': {
                                s.innerHTML = $d['ten'];
                                break;
                            }
                        }
                    });
                    el.find('.col-price').html('<p>' + _Tien($d['giaban'], 0) + '</p>');
                    el.find('.col-vat p').html(_Tien($d['v'], 0));
                    function isInt(value) {
                        if (isNaN(value)) {
                            return false;
                        }
                        var x= parseFloat(value);
                        return (x | 0) === x && x>0;
                    }
                    el.find('.col-qty input').change(function () {
                        var $sl = $(this), __slVal = $.trim($sl.val());
                        if (__slVal == '' || __slVal == '0' || !isInt(__slVal)) {
                            __slVal = 1; $sl.val(1);
                        } else {
                            __slVal = parseInt(__slVal);
                            $sl.val(__slVal);
                        };
                        UptCart($sl.parent(), __slVal);
                        QTY($sl.parent().parent(), __slVal);
                    }).on('keyup', function (e) {
                        var keycode = e.keyCode || e.which;
                        var element = $(this);
                        var len = element.val().length;
                        var max = element.attr("maxlength");
                        if (len > max) {
                            element.val(element.val().substring(0, max));
                        };
                    });
                    //
                    QTY(el,null);
                    //
                }, bgClass = 'row row-bg2', cnt = 1, __sampleP = __bCart.children().first(); __sampleP.detach();
            
            function a_qtyClick(qty) {
                var cartItem = qty.parent();
                var $spin = cartItem.find('input');
                var val = parseInt($spin.val());
                var cong = qty.hasClass('qty-plus');
                if (val > 1 || cong == true) {
                    var newVal = val + parseInt(((cong) ? 1 : -1));
                    UptCart(cartItem, newVal);
                    QTY(cartItem.parent(), null);
                    setTimeout(function () { cartItem.find('input').select(); }, 300);
                };
            };
            function removeitemTimeOutClick(that, triggerP) {
                var doRMV = function () {
                    var waitCount = 2, recount = function () {
                        waitCount--;
                        if (waitCount == 0) {
                            if ($.isEmptyObject(cartData)) {
                                popupInstance.hide();
                            } else {
                                QTY(null, null);
                                __bCart.find('.layout-inline.row').each(function (index) {
                                    if (index > 0 && index % 2 == 1) {
                                        $(this).addClass('row-bg2');
                                    } else {
                                        $(this).removeClass('row-bg2');
                                    };
                                });
                            }
                        }
                    }
                    setTimeout(function () {
                        __$shared._rmvOutCart(that.parent().data().id, recount);
                    });
                    setTimeout(function () {
                        that.parent().fadeOut('slow', function (s) {
                            $(this).remove();
                            recount();
                        });
                    }, 10);
                };
                if (triggerP == undefined) {
                    var result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px">' + gbM("S1_027") + '</div>', "Confirm changes");
                    result.done(function (rst) {
                        if (rst) {
                            doRMV();
                        };
                    });
                } else {
                    doRMV();
                };
            };
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
            timeLabel.detach(); deliverytime.html(scrollView.find('.dx-scrollview-scrollbottom-indicator').clone());
            //
            $.each(cartData, function (key, val) {
                var spitem = __sampleP.clone();
                if (cnt % 2 == 0) spitem.addClass(bgClass);
                spitem.data('id', key);
                spitem.find('.removeitem').click(function (e, triggerP) {
                    if (triggerP == undefined) {
                        if (clickPrevent == '1') return;
                        clickLocked();
                    };
                    var that = $(this);
                    that.attr('tabindex', 1).focus();
                    setTimeout(function () {
                        removeitemTimeOutClick(that, triggerP);
                    }, 300);
                    setTimeout(function () { that.removeAttr('tabindex').blur(); }, 1000);
                });
                SPview(spitem); __bCart.append(spitem); cnt++;
            });
            //
            cartxx.on('click', '.a_qty', function (evt) {
                if (clickPrevent == '1') return;
                clickLocked(100);
                var qty = $(evt.target);
                qty.attr('tabindex', 1).focus();
                setTimeout(function () {
                    a_qtyClick(qty);
                }, 100);
                setTimeout(function () {qty.removeAttr('tabindex').blur();}, 1000);
            });
            //
            tgGiaoHang.then(function (kq,_$t) {
                var defTime, exUI = localDB.exe('get', 'exUI', null, 0) || [];
                deliverytime.empty();
                if (kq=='1' && _$t.length > 0) {
                     defTime = _$t[0];
                    for (var i = 0; i < _$t.length; i += 2) {
                        var _$timeLabel = timeLabel.clone(); _$timeLabel.attr('id', 'deliver_' + _$t[i]); _$timeLabel.find("input").val(_$t[i]); _$timeLabel.append(_$t[i + 1]);
                        deliverytime.append(_$timeLabel);
                        if (deliData.hasOwnProperty('time') && deliData['time'] == _$t[i]) {
                            defTime = _$t[i]
                        }
                    };
                    deliverytime.find('input').change(function () {
                        __$shared._cbCart('delivery', { 'time': this.value });
                    });
                    deliverytime.find('input[value="' + defTime + '"]').prop('checked', true).trigger('change');
                    //
                    $(dathang[1]).fadeIn('slow').find('#fastcartform input').change(function () {
                        var _$ip = $(this); var storeObj = {}; storeObj[_$ip.attr('name')] = _$ip.val();
                        __$shared._cbCart('delivery', storeObj);
                    }).each(function (i, txt) {
                        var _$ip = $(txt), prop = _$ip.attr('name');
                        if (deliData.hasOwnProperty(prop)) {
                            _$ip.val(deliData[prop]);
                        };
                        lookupmore(_$ip, exUI, prop);
                    });
                } else {
                    deliverytime.html('<label class="stopreceiving">' + _$t.toString() + '</label>');
                }
            });
            quanlydangnhap(deliData, cartxx);
        }
        , scrollView = $("<div/>"), scrollTimer, scrollData, scrollDataXXX, virtualPad = function (s) {
            clearTimeout(scrollTimer);
            scrollView.data().dxScrollView.scrollTo(scrollData);
        }
        , popupEvts = function () {
            //
            var clearAll = function (cb) {
                scrLocked();
                setTimeout(function () {
                    var allList = scrollView.find('.removeitem'), waitCount = allList.length, recount = function () {
                        waitCount--;
                        if (waitCount == 0) {
                            if (cb) {
                                cb();
                            } else {
                                popupInstance.hide();
                                scrReleased();
                            }
                        }
                    }
                    allList.each(function (i, el) {
                        var that = el;
                        setTimeout(function () {
                            __$shared._rmvOutCart($(that).parent().data().id, recount);
                        });
                        setTimeout(function () {
                            $(that).parent().fadeOut('slow', function (s) {
                                $(this).remove();
                                recount()
                            });
                        });
                    });
                }, 10);
            }

            scrollView.find('#cart_clear').click(function (s, e) {
                if (clickPrevent == '1') return;
                clickLocked();
                var  result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px">' + gbM("S1_027") + '</div>', "Confirm changes");
                result.done(function (rst) {
                    if (rst) {
                        clearAll();
                    }
                });
            });

            _$dondatHang(0, cartxx, scrollView, dathangcase,
                {
                    _deliInfo: function () { return __$shared._deliInfo() },
                    cartData: function () { return cartData; },
                    tongcong: function () { return tongcong; }
                }
                , function (arg) {
                    if (arg['act'] == 'clearAll') {
                        var storeObj = {}, navOrder = function () {
                            setTimeout(function () {
                                memorybag['navigate_Order'] = { 'id': 1, 'params': arg['data'] };
                                ComApp.app.navigate("Order", { root: true });
                            }, 100);
                        };
                        storeObj['uid'] = arg['data'].uid;
                        __$shared._cbCart('delivery', storeObj);
                        clearAll(function () {
                            if (arg['data'].hasOwnProperty('luckyspin')) {
                                do_km(arg['data'], function () {
                                    navOrder();
                                });
                            } else {
                                navOrder();
                            };
                            popupInstance.hide();
                        });
                    } else if (arg['act'] == 'hidePU') {
                        popupInstance.hide();
                    } else if (arg['act'] == 'rmvitem') {
                        popupElement.find('.cartx .scrollbody .layout-inline.row').each(function (i, el) {
                            var row = $(el);
                            if (row.data()['id'] == arg['id']) {
                                row.find('.removeitem').trigger('click', { 'id': arg['id'] });
                                return false;
                            };
                        });
                    };
                    //} else if (arg['act'] == 'loginO') {
                    //    var storeObj = { 'uid': arg['data'].uid, 'name': arg['data'].name, 'phone': arg['data'].phone, 'addr': arg['data'].addr[0] };
                    //    __$shared._cbCart('delivery', storeObj);
                    //    quanlydangnhap(storeObj, cartxx);
                    //};
            });
        }
        , popupInstance = popupElement.dxPopup({
            fullScreen: true
            , dragEnabled: false
            , showTitle: true
            , deferRendering: false
            , contentTemplate: function (contentElement) {
                renderPopupCart(contentElement);
            }
            , onHidden: function () {
                scrReleased();
                _virtualKeyboard('off', null, virtualPad);
                popupElement.remove();
                __$shared.showCart = false;
            }
            , onHiding: function () {
                scrLocked();
            }
            , onShown: function (e) {
                __$shared.showCart = true;
                setTimeout(function () {
                    __$shared.cartcolQty();
                    _virtualKeyboard('on', null, virtualPad);
                    popupEvts();
                },500);
                e.element.find('.dx-toolbar-center').html(gbM("S1_002"));
                scrReleased();
            }
        }).dxPopup('instance');
        setTimeout(function () {
            popupInstance.show();
        },100);
    }
}());