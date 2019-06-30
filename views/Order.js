"use strict";

ComApp.Store.Order = function (params) {
    var __$cartPopup = function (__$shared, cartFuck, idx) {
        var that = this, TroVeBtn, EditCart, PopupCart, isModify = false, popupElement = $("<div class='shared_popup placeorder'></div>").appendTo('.dx-viewport'), timeDeli,orderLOG
        , renderEditCart = function (contentElement,oInfo) {
            var cartxx = cartFuck.clone(),tongcongEdit, dathangcase = {}, cartData = $.extend(true,{}, __$shared.cartDulieu), dathang = cartxx.find('.dathangcase'), deliverytime = cartxx.find('.deliverytime'), timeLabel = deliverytime.children().first();
            dathangcase['3'] = $(dathang[3]).clone(); $(dathang[3]).remove();
            dathangcase['2'] = $(dathang[2]).clone(); $(dathang[2]).remove();
            dathangcase['0'] = $(dathang[0]).clone(); $(dathang[0]).remove();
            //
            var _$$cbCart = { 'uid': _$uid() }, __bCart = cartxx.find('.scrollbody'),
                UptCart = function (el, sl) {
                    cartData[el.parent().data().id]['sl'] = sl;
                }
                , QTY = function (el, sl) {
                    if (el) {
                        var $d = cartData[el.data().id];
                        if (sl) {
                            $d['sl'] = parseInt(sl);
                        } else {
                            el.find('.col-qty input').val($d['sl']);
                        }
                        el.find('.col-total p').html(_Tien($d['sl'] * $d['giaban'], 0));//.removeAttr('style').autoSizr();
                    }
                    //
                    var $tong = cartxx.find('.tf .row .subtotal');
                    $tong[0].innerHTML = _Tien(0, 0);
                    $tong[1].innerHTML = _Tien(0, 0);
                    tongcongEdit = 0;
                    $.each(cartData, function (key, $d) {
                        tongcongEdit += $d['sl'] * $d['giaban'];
                    });
                    $tong[2].innerHTML = _Tien(0, 0);
                    $tong[3].innerHTML = _Tien(tongcongEdit, 0);
                }
                , SPview = function (el, $d) {
                    var $d = cartData[el.data().id];
                    el.find('.col-pro >*').each(function (i,s) {
                        switch (s.tagName.toLowerCase()) {
                            case 'span': {
                                s.innerHTML = 'G: ' + _Tien($d['giaban'], 0);// + '<br/>Vat: ' + _Tien($d['v'], 0);
                                break;
                            }
                            case 'img': {
                                var imgs = $d.imgs.split(',');
                                if (imgs.length > 0 && imgs[0] != '')  s.src = imgs[0];
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
                        var x = parseFloat(value);
                        return (x | 0) === x && x > 0;
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
                    QTY(el);
                    //
                },bgClass='row row-bg2',cnt=1, __sampleP = __bCart.children().first(); __sampleP.detach();
            $.each(cartData, function (key, val) {
                var spitem = __sampleP.clone();
                if (cnt % 2 == 0) spitem.addClass(bgClass);
                spitem.data('id', key);
                newItem(spitem);
                SPview(spitem);__bCart.append(spitem);cnt++;
            });
            var a_qtyClick = function (qty) {
                var cartItem = qty.parent();
                var $spin = cartItem.find('input'), val = parseInt($spin.val()), cong = qty.hasClass('qty-plus');
                if (val > 1 || cong) {
                    UptCart(cartItem, val + ((cong) ? 1 : -1));
                    QTY(cartItem.parent());
                    //setTimeout(function () { cartItem.find('input').select(); },300);
                    isModify = true;
                }
            }, removeitemTimeOutClick = function (that, triggerP) {
                var doRMV = function () {
                    delete cartData[that.parent().data().id];
                    var recount = function () {
                        if ($.isEmptyObject(cartData)) {
                            exit_copy(function () {
                                EditCart = null;//restore orgin next copy
                            });
                        } else {
                            QTY();
                            __bCart.find('.layout-inline.row').each(function (index) {
                                if (index > 0 && index % 2 == 1) {
                                    $(this).addClass('row-bg2');
                                } else {
                                    $(this).removeClass('row-bg2');
                                };
                            });
                        };
                        isModify = true;
                    };
                    setTimeout(function () {
                        that.parent().fadeOut('slow', function (s) {
                            $(this).remove();
                            recount();
                        });
                    }, 10);
                }
                if (triggerP == undefined) {
                    var result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px">' + gbM("S1_027") + '</div>', "Confirm changes");
                    result.done(function (rst) {
                        if (rst) {
                            doRMV();
                        }
                    });
                } else {
                    doRMV();
                };
            };
            function newItem(spitem) {
                spitem.find('.a_qty').click(function (e) {
                    if (clickPrevent == '1') return;
                    clickLocked(100);
                    var qty = $(this);
                    qty.attr('tabindex', 1).focus();
                    setTimeout(function () {
                        a_qtyClick(qty);
                    }, 100);
                    setTimeout(function () { qty.removeAttr('tabindex').blur(); }, 1000);
                });
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
            };
            //
            ComApp.app._localizeMarkup(cartxx)
            contentElement.append(cartxx);
            //
            var _$t = timeDeli, defTime = _$t[0],exUI = localDB.exe('get', 'exUI', null, 0) || []; deliverytime.empty();
            for (var i = 0; i < _$t.length; i += 2) {
                var _$timeLabel = timeLabel.clone(); _$timeLabel.attr('id', 'deliver_' + _$t[i]); _$timeLabel.find("input").val(_$t[i]); _$timeLabel.append(_$t[i + 1]);
                deliverytime.append(_$timeLabel);
                if (oInfo.hasOwnProperty('time') && oInfo['timeID'] == _$t[i]) {
                    defTime = _$t[i]
                }
            };
            deliverytime.find('input').change(function () {
                $.extend(true, _$$cbCart, { 'time': this.value });
                isModify = true;
            });
            deliverytime.find('input[value="' + defTime + '"]').prop('checked', true).trigger('change');

            $(dathang[1]).fadeIn('slow').find('#fastcartform input').change(function () {
                isModify = true;
            }).each(function (i, txt) {
                var _$ip = $(txt), prop = _$ip.attr('name');
                if (oInfo.hasOwnProperty(prop)) {
                    _$ip.val(oInfo[prop]);
                    _$$cbCart[prop] = oInfo[prop];
                }
                lookupmore(_$ip, exUI, prop);
            });

            quanlydangnhap(null, cartxx);

            popupElement.find('.dx-toolbar-center').html(gbM("S1_002").toUpperCase());
            var cartClearBtn = cartxx.find('#cart_clear');
            cartClearBtn.removeClass('closebtn').empty();
            $('<span><i class="fa fa-plus"></i>' + gbM('S2_010') + '</span>').appendTo(cartClearBtn);
            cartClearBtn.on('click', function (e, trigger) {
                if (clickPrevent == '1') return;
                clickLocked();
                if (trigger) {
                    var countProperties = function (obj) {
                        var count = 0;
                        var max = 1;
                        for (var property in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                                count++;
                                if (!isNaN(property)) {
                                    var newMax = parseInt(property);
                                    if (newMax > max) { max = newMax };
                                }
                            }
                        }
                        return [count, max];
                    };
                    var fuckdog = countProperties(cartData), cntMax = fuckdog[1];
                    $.each(trigger['newSP'], function (i, val) {
                        var existsI = false;
                        $.map(cartData, function (value, index) {
                            if (value.id == val.id) {
                                existsI = true;
                                __bCart.find('.layout-inline.row').each(function (i,dog) {
                                    if ($(dog).data().id == index) {
                                        var $input = $(dog).find('input');
                                        $input.val(value['sl']+1);
                                        $input.trigger('change');
                                    };
                                });
                                return;
                            };
                        });
                        if (existsI) {
                            QTY();
                        } else {
                            cntMax++;
                            var spitem = __sampleP.clone(), cloneVAL = $.extend(true, {}, val);
                            var lastChild = __bCart.find('.layout-inline.row');
                            if (lastChild.length > 0 && !lastChild.last().hasClass(bgClass)) {
                                spitem.addClass(bgClass);
                            };
                            cloneVAL['sl'] = 1;
                            cartData[cntMax] = cloneVAL;
                            spitem.data('id', cntMax);
                            newItem(spitem);
                            SPview(spitem, val); __bCart.append(spitem);
                        }
                    });
                    __$shared.cartcolQty();
                    isModify = true;
                } else {
                    scrLocked();
                    var d1 = $.Deferred(), d2 = $.Deferred(), addBtn;
                    $.when(d1, d2).then(function (data, instance) {
                        instance.option({ 'dataSource': data });
                        scrReleased();
                    });

                    var ___menu = [];
                    //_$q.add(function () {
                        _$a.api('POST', '634445158944375000020258', { 'act': 'Cart_addSP', 'ncc': __$ncc, menu: ___menu }, function (result) {
                            //_$q.next(false);
                            d1.resolve(result.data[0]);
                        }, function (err) {
                            //_$q.next(false);
                            var c = err;
                        });
                    //},true);
                    d1.promise();

                    var popupElement = $("<div class='addSP'></div>").appendTo('.dx-viewport'), listInstance,
                        popupInstance = popupElement.dxPopup({
                            fullScreen: true
                                , dragEnabled: false
                                , showTitle: true
                                , deferRendering: false
                                , contentTemplate: function (contentElement) {
                                    var listWidget = $("<div></div>");
                                    contentElement.append(listWidget);
                                    listInstance = listWidget.dxList({
                                        elementAttr: { class: 'addSP' },
                                        height: '100%',
                                        showSelectionControls: true, selectionMode: "multiple",
                                        searchEnabled: true,
                                        searchExpr: "ten",
                                        onSelectionChanged: function (e) {
                                            addBtn.option({ disabled: listInstance.option('selectedItemKeys').length == 0 });
                                        }
                                        , itemTemplate: function (data) {
                                            var result = $("<div>").addClass("product");
                                            $("<img>").attr("src", data.imgs.split('|')[0]).appendTo(result);
                                            $("<div><span>" + data.ten + "</span></div>").appendTo(result);
                                            $("<div>").addClass("price").html(_Tien(data['giaban'], 0)).appendTo(result);
                                            return result;
                                        }
                                    }).dxList("instance");
                                    d2.resolve(listInstance);
                                }
                                , onHidden: function () {
                                    popupElement.remove();
                                }
                                , onShown: function (e) {

                                }
                                , toolbarItems: [
                                    {
                                        location: "before",
                                        toolbar: "top",
                                        widget: "dxButton",
                                        options: {
                                            onInitialized: function (e) { addBtn = e.component; },
                                            disabled: true,
                                            elementAttr: { 'class': 'addSP_btn get-to-work bmd-main-btn' },
                                            icon: "plus", type: "success",
                                            onClick: function (e) {
                                                var sels = listInstance.option('selectedItemKeys');
                                                if (sels.length > 0) {
                                                    setTimeout(function () {//ko timeout thi no raise two time !!!
                                                        if (clickPrevent == '1') return;
                                                        //clickLocked(); trigger bo qua cho nay !!!!
                                                        cartClearBtn.trigger('click', { 'act': 'addSP', 'newSP': sels });
                                                    }, 10);
                                                    popupInstance.hide();
                                                }
                                            }
                                        }
                                    }
                                , {
                                    location: "center",
                                    toolbar: "top",
                                    text: gbM('S2_0101').toUpperCase()
                                }]
                        }).dxPopup('instance');
                    setTimeout(function () {
                        popupInstance.show();
                    }, 100);
                    d2.promise();
                }
            });

            _$dondatHang(oInfo.id, cartxx, scrollView, dathangcase,
                {
                    _deliInfo: function () { return _$$cbCart },
                    cartData: function () {
                        var fuckcartData = {};
                        $.each(cartData, function (key, val) {
                            fuckcartData[val.id] = val;
                        });
                        return fuckcartData;
                    },
                    tongcong: function () { return tongcongEdit; }
                }, function (arg) {
                    if (arg['act'] == 'clearAll') {
                        var navOrder = function () {
                            setTimeout(function () { thankOrder(arg['data']); }, 10);
                            PAUSE_synTimer(false);
                            resetList = true;
                            initView(null, function () {
                                scrReleased();
                            });
                        }
                        if (arg['data'].hasOwnProperty('luckyspin')) {
                            do_km(arg['data'], function () {
                                navOrder();
                            });
                        } else {
                            navOrder();
                        };
                        popupInstance.hide();
                    } else if (arg['act'] == 'hidePU') {
                        popupInstance.hide();
                    } else if (arg['act'] == 'rmvitem') {
                        popupElement.find('.cartx .scrollbody .layout-inline.row').each(function (i, el) {
                            var row = $(el);
                            if (cartData[row.data()['id']].id== arg['id']) {
                                row.find('.removeitem').trigger('click', { 'id': arg['id'] });
                                return false;
                            };
                        });
                    }
            });
            isModify = false;//init
        }
        , exit_copy = function (_$cb) {
            TroVeBtn.option({ visible: false });
            EditCart = popupElement.find('.noidung_cart'); var currentContent = EditCart.parent();
            EditCart.fadeOut("fast", function () {
                EditCart.detach();
                currentContent.prepend(PopupCart);
                PopupCart.fadeIn('slow', _$cb);
            });
        }
        , renderPopupCart = function (contentElement) {
            var cartYY = cartFuck.clone(), dathangcase = {}, cartDulieu = __$shared.cartDulieu, giohang = cartYY.find('.giohang'); giohang.addClass('giohangviewdetail');
            giohang.detach();
            var dathang = cartYY.find('.dathang'); dathang.css('margin-bottom', '20px');
            $orderprocess.clone().prependTo(dathang);
            giohang.insertAfter(dathang);
            //
            var dathang = cartYY.find('.dathangcase'), deliverytime = cartYY.find('.deliverytime'), timeLabel = deliverytime.children().first();
            dathangcase['3'] = $(dathang[3]).clone(); $(dathang[3]).remove();
            dathangcase['2'] = $(dathang[2]).clone(); $(dathang[2]).remove();
            dathangcase['0'] = $(dathang[0]).clone(); $(dathang[0]).remove();
            //
            var rmvEL = $(dathang[1]).find('.screen-placeorder >div').first(); rmvEL.remove();
            rmvEL = $(dathang[1]).find('.screen-placeorder #fastplaceorder');
            rmvEL.parent().css({ 'padding-top': '0px', 'height': '1px' });
            rmvEL.remove();
            //
            rmvEL = $(dathang[1]).find('#contactinfo');
            rmvEL.empty(); rmvEL.append('<span>@S2_008</span>');
            //
            var scrollOpts = {}, deliData = __$shared._deliInfo(), __bCart = cartYY.find('.scrollbody'),
                UptCart = function (el, sl) {
                    __$shared._cbCart(el.parent().data().id, {
                        sl: sl
                    });
                }
                , QTY = function (el, sl) {
                    if (el) {
                        var $d = cartDulieu[el.data().id];
                        if (sl) {
                            $d['sl'] = parseInt(sl);
                        } else {
                            el.find('.col-qty input').val($d['sl']);
                        }
                        el.find('.col-total p').html(_Tien($d['sl'] * $d['giaban'], 0));//.removeAttr('style').autoSizr();
                    }
                    //
                    var $tong = cartYY.find('.tf .row .subtotal');
                    $tong[0].innerHTML = _Tien(0, 0);
                    $tong[1].innerHTML = _Tien(0, 0);
                    var tongcong = 0;
                    $.each(cartDulieu, function (key, $d) {
                        tongcong += $d['sl'] * $d['giaban'];
                    });
                    $tong[2].innerHTML = _Tien(dulieuR.km, 0);
                    $tong[3].innerHTML = _Tien(tongcong - dulieuR.km, 0);
                }
                , SPview = function (el) {
                    var $d = cartDulieu[el.data().id];
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
                    el.find('.col-qty input').change(function () {
                        var $sl = $(this), __slVal = $sl.val(); if (__slVal == '') { __slVal = 1; $sl.val(1); };
                        UptCart($sl.parent(), $sl.val());
                        QTY($sl.parent().parent(), __slVal);
                    });
                    //
                    QTY(el);
                    //
                }, bgClass = 'row row-bg2', cnt = 1, __sampleP = __bCart.children().first(); __sampleP.detach();

            //
            contentElement.append(scrollView);
            ComApp.app._localizeMarkup(cartYY);
            scrollView.append(cartYY);
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
            var editRow = $list.find('#' + idx);
            var dulieuR = editRow.data('dulieu');
            //
            $.each(cartDulieu, function (key, val) {
                var spitem = __sampleP.clone();
                if (cnt % 2 == 0) spitem.addClass(bgClass);
                spitem.data('id', key);
                spitem.find('.a_qty').remove();
                spitem.find('.removeitem').remove();
                //
                SPview(spitem); __bCart.append(spitem); cnt++;
            });
            cartYY.find('.giohang .cartx').append('<h2 style="text-align:center;display:block" class="fa fa-calendar">' + Globalize.formatDate(dulieuR.ngay, { date: 'medium' }) + '</h2>').append($thaihoa);
            var cartClearBtn = cartYY.find('#cart_clear');
            cartClearBtn.removeClass('closebtn').addClass('delbtn').empty();
            $('<i class="fa fa-bars"></i>').appendTo(cartClearBtn);
            cartClearBtn.on('click', function (e) {
                if (clickPrevent == '1') return;
                clickLocked();
                funActionSheet({
                    "onItemClick": function (e) {
                        if (e.itemData.id == 'copyNew') {
                            PAUSE_synTimer(false);//click la locked !!!,will release at CASE_(3),or Popup hidden event
                            PopupCart = popupElement.find('.noidung_cart'); var currentContent = PopupCart.parent();
                            var waitCount=1,recount = function () {
                                waitCount--;
                                if (waitCount == 0) {
                                    __$shared.cartcolQty();
                                }
                            }
                            PopupCart.fadeOut("fast", function () {
                                PopupCart.detach();
                                TroVeBtn.option({ visible: true });
                                //
                                if (EditCart) {
                                    currentContent.prepend(EditCart);
                                    EditCart.fadeIn('slow', function () { recount(); });
                                } else {
                                    recount();
                                };
                            });
                            if (!EditCart) {
                                waitCount = 2;
                                renderEditCart(currentContent, dulieuR);
                                recount();
                            };
                        } else if (e.itemData.id == 'cancelOrder') {
                            PAUSE_synTimer(false);//click la locked !!!,will release at CASE_(2)
                            var result = confirmDlg(gbM("S2_0091"), [4, 32], function (dlgRst) {
                                if (dlgRst == 7) {//No
                                    scrLocked();
                                    var closePopup = function () {
                                        //_$q.next(false);
                                        scrReleased();
                                        popupInstance.hide();
                                        //Debug Browser 
                                        DelayStartTime();//Release CASE_(2)
                                    };
                                    var args = { 'act': 'dathangnhanh_huydonhang', 'uid': _$uid(), 'id': idx.split('idx_')[1], 'tungay': TuNgay(), 'denngay': DenNgay(), 'ncc': __$ncc };
                                    if (svrP.hasOwnProperty('athis') && !resetList) {
                                        args['his'] = $.extend(true, [], svrP['athis']);
                                    };
                                    //_$q.add(function () {
                                        _$a.api('POST', '634445158944375000020258', args, function (rst) {
                                            //
                                            closePopup();
                                            //
                                            if (rst.kq == "RESET" || rst.kq == "NOTFOUND_RESET") $list.empty();
                                            renderOrderList(rst.donhang);
                                            //
                                            if (rst.kq != "NOTFOUND_RESET") {
                                                editRow.removeClass().addClass('ordersrow cancel');
                                                editRow.find('.orderscol-price .fa').removeClass().addClass('fa fa-trash-o');
                                            };
                                            if (rst.hasOwnProperty('delO')) {
                                                dulieuR['statux'] = rst.delO.statux;
                                            };
                                        }, function (err) {
                                            closePopup();
                                            DevExpress.ui.notify("Error: '" + err, 'error', 5000);
                                        });
                                    //},true);
                                } else {
                                    //Debug Browser 
                                    DelayStartTime();//Release CASE_(2)
                                };
                            });
                        }
                    }
                    , "dataSource": [
                        { text: gbM('S2_009'), id: 'cancelOrder', icon: 'fa fa-times-circle', type: 'danger', visible: (dulieuR['statux'].toString() == '0')?true:false },
                        { text: 'Copy ...', id: 'copyNew', icon: 'fa fa-plus', type: 'success' },
                        { text: gbM('Cancel'), id: 'closeMenu', icon: "chevrondown" }
                    ]
                    , "visible": true
                    , usePopover: false
                    ,onContentReady: function (e) {
                        e.component._$itemContainer.parent().parent().removeClass('fuckdxActionSheet');
                    }
                    , mode: 'edit'
                });
            });
            //
            //
            timeLabel.detach();
            var _$t = timeDeli, defTime = dulieuR['timeID'];
            deliverytime.empty();  
            var _$timeLabel = timeLabel.clone();
            _$timeLabel.addClass('fixedFocus');
            _$timeLabel.attr('id', 'deliver_' + defTime);
            _$timeLabel.find("input").val(defTime);
            _$timeLabel.append(dulieuR['time']);
            deliverytime.append(_$timeLabel);
            deliverytime.find('input[value="' + defTime + '"]').prop('checked', true);
            //
            $(dathang[1]).fadeIn('slow').find('#fastcartform input').each(function (i, txt) {
                var _$ip = $(txt);
                if (dulieuR.hasOwnProperty(_$ip.attr('name'))) {
                    _$ip.val(dulieuR[_$ip.attr('name')]);
                }
            });
            cartYY.find('input').prop("readonly", true);
            var tempfuck = $thaihoa.find('.tempfuck'), tempfuckLI = tempfuck.find('.event').first();tempfuckLI.detach();
            //
            //start order progresss ....
            var fuckModel = function () {
                var self = this;
                this.dat_hang = dat_$hang; this.cssdat_hang = cssdat_$hang;
                this.cho_duyet = cho_$duyet; this.csscho_duyet = csscho_$duyet;
                this.dong_goi = dong_$goi; this.cssdong_goi = cssdong_$goi;
                this.giao_hang = giao_$hang; this.cssgiao_hang = cssgiao_$hang;
            }
            , dynamicEL = function () {
                switch (parseInt(dulieuR['statux'])) {
                    case 0: {//place order , wait approve
                        cssdat_$hang('done'); csscho_$duyet('active');
                        break;
                    }
                    case 1: {// approved , wait shpping
                        cssdat_$hang('done'); csscho_$duyet('done'); cssdong_$goi('active');
                        cho_$duyet(gbM('S2_0074'));
                        break;
                    }
                    case 2: {// shipping
                        cssdat_$hang('done'); csscho_$duyet('done'); cssdong_$goi('done'); cssgiao_$hang('active');
                        cho_$duyet(gbM('S2_0074'));
                        break;
                    }
                    case 3: {// Done
                        cssdat_$hang('done'); csscho_$duyet('done'); cssdong_$goi('done'); cssgiao_$hang('done');
                        cho_$duyet(gbM('S2_0074')); giao_$hang(gbM('S2_0073'));
                        break;
                    }
                    case 4: {// Delivery fail
                        cssdat_$hang('done'); csscho_$duyet('done'); cssdong_$goi('done'); cssgiao_$hang('cancel');
                        cho_$duyet(gbM('S2_0074')); giao_$hang(gbM('S2_0076'));
                        break;
                    }
                    case 10: {
                        dat_$hang(gbM('S2_012')); cssdat_$hang('cancel');
                        break;
                    }
                    case 11: {//boss refused
                        cssdat_$hang('done');
                        cho_$duyet(gbM('S2_0121')); csscho_$duyet('cancel');
                        break;
                    }
                };
                //
                tempfuck.empty();
                $.each(orderLOG, function (key, val) {
                    var newLI = tempfuckLI.clone();
                    newLI.attr('data-date', key); newLI.find('h1').html(val[0]); newLI.find('h2').html((val[1]) == '' ? '-' : val[1]);
                    tempfuck.append(newLI);
                });
            }
            , dat_$hang = ko.observable(gbM('S2_007')), cssdat_$hang = ko.observable('')
            , cho_$duyet = ko.observable(gbM('S2_0071')), csscho_$duyet = ko.observable('')
            , dong_$goi = ko.observable(gbM('S2_0075')), cssdong_$goi = ko.observable('')
            , giao_$hang = ko.observable(gbM('S2_0072')), cssgiao_$hang = ko.observable('')
            ,fuckProgress = popupElement.find('.orderprocess'), title = fuckProgress.find('.title').first();
            fuckProgress.find("[data_fuck]").each(function () {
                var $a_with_title = $(this);
                $a_with_title.attr("data-bind", $a_with_title.attr('data_fuck'));
                $a_with_title.removeAttr('data_fuck');
            });
            //
            ko.applyBindings(new fuckModel(), fuckProgress[0]);
            dynamicEL();
            //end order progresss ....
            fuckProgress.css('height', fuckProgress.outerHeight() + title.outerHeight());
            popupElement.on('PROGRESS_CHANGED', function (e, params) {
                scrLocked();
                dulieuR = params['data'];
                prepare_showdetail(1, function () {
                    dat_$hang(gbM('S2_007'));
                    cssdat_$hang('');
                    cho_$duyet(gbM('S2_0071'));
                    csscho_$duyet('');
                    dong_$goi(gbM('S2_0075'));
                    cssdong_$goi('');
                    giao_$hang(gbM('S2_0072'));
                    cssgiao_$hang('');
                    dynamicEL();
                    var dogSheet = pigActionSheet.data()['dxActionSheet'];
                    if (dogSheet) {
                        dogSheet.option({ 'visible': false });
                    };
                    scrReleased();
                });
            })
        }
        , scrollView = $("<div/>"), scrollTimer, scrollData, scrollDataXXX, virtualPad = function (s) {
            clearTimeout(scrollTimer);
            scrollView.data().dxScrollView.scrollTo(scrollData);
        }
        , popupInstance = popupElement.dxPopup({
            fullScreen: true
            , dragEnabled: false
            , showTitle: true
            , deferRendering: true// khac biet voi cac cart list khac, vi phai cho data detail.
            , contentTemplate: function (contentElement) {
                renderPopupCart(contentElement);
            }
            , onHidden: function () {
                scrReleased();
                _virtualKeyboard('off', null, virtualPad);
                popupElement.remove();
                //Debug Browser 
                DelayStartTime();
                __$shared.showCart = '0';
            }
            , onHiding: function () {
                scrLocked();
            }
            , onShown: function (e) {
                setTimeout(function () {
                    __$shared.cartcolQty();
                    _virtualKeyboard('on', null, virtualPad);
                });
                __$shared.showCart = idx;
                scrReleased();
            }
            , toolbarItems: [
                {
                    location: "before",
                    toolbar: "top",
                    widget: "dxButton",
                    options: {
                        onInitialized: function (e) { TroVeBtn = e.component; },
                        visible: false,
                        elementAttr: { 'class': 'dx-closebutton' },
                        icon: "back",
                        onClick: function (e) {
                            if (clickPrevent == '1') return;
                            clickLocked();
                            if (isModify) {
                                confirmDlg(gbM('S2_011'), [4, 32], function (dlgRst) {
                                    exit_copy(function () {
                                        if (dlgRst == 7) {
                                            EditCart = null;
                                        };
                                        //Debug Browser 
                                        DelayStartTime();//Release CASE_(3)
                                    });
                                });
                            } else {
                                exit_copy(function () {
                                    //Debug Browser 
                                    DelayStartTime();//Release CASE_(3)
                                });
                            }
                        }
                    }
                }
            , {
                location: "center",
                toolbar: "top",
                text: gbM("S2_006").toUpperCase()
            }]
        }).dxPopup('instance');
        //
        function prepare_showdetail(act,$cb) {
            PAUSE_synTimer(false);//click la locked !!!,will release at CASE_(1)
            var args = { 'act': 'dathangnhanh_tracking_detail', 'uid': _$uid(), 'id': idx.split('idx_')[1], 'tungay': TuNgay(), 'denngay': DenNgay(), 'ncc': __$ncc },
            releaseQ = function () {
                //_$q.next(false);
                //Debug Browser 
                DelayStartTime(); //Relase CASE_(1)
            };
            if (svrP.hasOwnProperty('athis') && !resetList) {
                args['his'] = $.extend(true, [], svrP['athis']);
            };
            //_$q.add(function () {
                _$a.api('POST', '634445158944375000020258', args, function (rst) {
                    releaseQ();
                    if (rst["kq"] == 'OK') {
                        __$shared.cartDulieu = rst['sps'];
                    };
                    timeDeli = rst['delitime'];
                    orderLOG = rst['log'];
                    if (act == 0) {//init
                        popupInstance.show();
                    } else if ($cb) {
                        $cb();
                    };
                    //
                }, function (err) {
                    releaseQ();
                    scrReleased();
                    DevExpress.ui.notify("Error: '" + err, 'error', 5000);
                });
            //},true);
        };
        //
        prepare_showdetail(0);
        //
    };

    function retriveCart(init, suplier) {
        var cartString = localDB.exe('get', 'giohang', null, 0) || '';
        if (cartString.length > 0) {
            var allCart = JSON.parse(atob(cartString).norm_to_unicode());
            if (init) deliveryInfo = allCart['deliInfo'] || {};
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

    function thankOrder(params) {
        if (params.hasOwnProperty('luckyspin')) {

        } else {
            var num = new Date().getTime() % 3;
            var thanks = Thanksfucking((num == 0) ? '6' : (num == 1) ? '16' : '14');//
            thanks.appendTo('.dx-viewport');
            setTimeout(function () {
                thanks.fadeOut(1600, function () {
                    thanks.remove();
                });
            }, 700);
            thanks.trigger('thankyou');
        };
    }


    var evtname, $attach = '$attach_634445158944375000020258', shop, instanceScroll = null, sampleLI, _blankli, deliveryInfo = {}, viewloaded = false, timerReachBottom
        , svrP = {}, TuNgay = ko.observable(new Date()), DenNgay = ko.observable(new Date())
    , __$shared = {
            showCart: '0'
            ,_deliInfo: function () {
                return deliveryInfo;
            }
            , cartDulieu:[]
            , cartcolQty: function () {
                var pQTY = $('.giohang .cartx'), colQTY = pQTY.find('.col-qty');
                if (colQTY.length > 0) {
                    colQTY.removeClass('ex2 ex1');
                    var fDIV = pQTY.find('.scrollbody .col-qty').eq(0).find('div');
                    if (fDIV.length > 0) {
                        var f0 = fDIV[0].parentNode.getBoundingClientRect(), f1 = fDIV[0].getBoundingClientRect(), f2 = fDIV[1].getBoundingClientRect(), __offset = parseInt(f2.left - f1.left), pad = parseInt(f1.left - f0.left), cls = '',
                            __w = pQTY.find('.table').width(), __wMin = __w * 12 / 100, __wMax = __w * 17 / 100;
                        if (__offset == 0) {
                            if (f0.width < 78) {//android 85, iphone5 75
                                cls += ' ex1';
                                if (f0.width < 60) cls += ' ex2';
                            }
                        } else if (parseInt(f1.top - f2.top) != 0) {
                            if (f0.width < 125) {
                                cls += ' ex1';
                                if (f0.width < __wMax && f0.width < 95) {
                                    cls += ' ex2';
                                };
                            } else {
                                cls += ' ex1';//iphone 6 plus
                            }
                        }
                        if (cls.length > 0) pQTY.find('.col-qty').addClass(cls);
                    };
                }
                //pQTY.find('.col-total p').removeAttr('style').autoSizr();
            }
    };

    var emptyWH = ko.observable(true), $list, $listItem, $orderprocess, $thaihoa, resetList = true, ignoreSYN = false
    , cssfind_changed = ko.observable('')
    , renderOrderList = function (rst) {
        var equalHIS = dogHIS( rst['athis'])[0];
        if (resetList || !equalHIS) {
            while (DevExpress.hideTopOverlay()) { }
            $list.empty();
            cssfind_changed('');
        };
        if (rst.hasOwnProperty('act') && rst['act'] == 255) {
            DevExpress.ui.notify(rst['msg'], 'error', 1000);
            return;
        };
        var stateCls = function (st) {
            var statux = 'fa-hourglass-o', stateEx = '';
            switch (parseInt(st)) {
                case 1: {
                    statux = 'fa-gift';
                    stateEx = 'packing';
                    break;
                } case 2: {
                    statux = 'fa-motorcycle';
                    stateEx = 'shipping';
                    break;
                } case 3: {
                    statux = 'fa-check-circle';
                    stateEx = 'delivered';
                    break;
                } case 4: {
                    statux = 'fa-motorcycle';
                    stateEx = 'delifail';
                    break;
                } case 10: {//user cancel order
                    statux = 'fa-trash-o';
                    stateEx = 'cancel';
                    break;
                } case 11: {//boss refused
                    statux = 'fa-times-circle';
                    stateEx = 'refused';
                    break;
                }
            };
            return [stateEx,statux];
        }, newO = rst.n;
        for (var i = 0; i < newO.length; i++) {
            var newDIV = $listItem.clone();
            newDIV.find('.orderscol-name>div').html(newO[i].sps);
            newDIV.find('.orderscol-tg>span').html(Globalize.formatDate(newO[i].ngay, { date: 'medium' }));
            newDIV.find('.orderstime>span').html(newO[i].time);
            newDIV.find('.orderscol-price>div').html(_Tien(newO[i].tien -newO[i].km, 0));

            var _CLS = stateCls(newO[i].statux);

            newDIV.addClass(_CLS[0]);
            newDIV.find('.orderscol-price .fa').addClass(_CLS[1]);
            newDIV.attr('id', 'idx_' + newO[i].id);
            newDIV.data('dulieu', newO[i]);
            $list.append(newDIV);
        };
        //
        if (rst.hasOwnProperty('u')) {
            newO = rst.u;
            for (var i = 0; i < newO.length; i++) {
                var uptR = $list.find('.ordersrow#' + 'idx_' + newO[i].id);
                if (uptR.length > 0) {
                    var _CLS = stateCls(newO[i].statux);
                    uptR.removeClass().addClass('ordersrow ' + _CLS[0]);
                    uptR.find('.orderscol-price .fa').removeClass().addClass('fa ' + _CLS[1]);
                    uptR.data('dulieu', newO[i]);
                };
                if (__$shared.showCart != '0' && __$shared.showCart == 'idx_' + newO[i].id) {
                    $('.dx-viewport > .shared_popup.placeorder').trigger('PROGRESS_CHANGED', { 'data': newO[i] });
                };
            };
        }
        emptyWH($list.find('.ordersrow').length == 0);
    }
    , _$uid = function () {
        var loginP = retriveCart(true), uid = '-1';
        if (loginP.hasOwnProperty('deliInfo')) uid = loginP['deliInfo'].uid;
        if (uid == undefined || !uid) uid = '-1';
        return uid;
    }
    , frmArgs = function () {
        return { 'act': 'dathangnhanh_tracking', 'uid': _$uid(), 'tungay': TuNgay(), 'denngay': DenNgay(), 'ncc': __$ncc };
    }
    , dogHIS = function (newHIS) {
        //1. compare HIS, 2. Update svrP , 
        var oldHIS=null, theSame = false;
        if (svrP.hasOwnProperty('athis')) oldHIS = $.extend(true, [], svrP['athis']);
        if (newHIS) {
            theSame = (oldHIS!=null) && (oldHIS[4] == newHIS[4]);
            svrP['athis'] = $.extend(true, [], newHIS);
        };
        return [theSame, oldHIS];
    }
    , norForm = function ($cb) {
        //_$q.next(false);
        resetList = false;
        DelayStartTime();
        if ($cb) $cb();
    }
    , initView = function (cmdFind,$cb) {
        var args = $.extend(true,{},frmArgs());
        if (svrP.hasOwnProperty('athis') && !resetList) {
            args['his'] = $.extend(true, [], svrP['athis']);
        };
        if (memorybag.hasOwnProperty('luckyspin')) {
            var lks = $.extend(true, {}, memorybag['luckyspin']);
            delete memorybag['luckyspin'];
            args['luckyspin'] = { 'gamerst': lks.gamerst, 'ma': lks.ma, 'captcha': lks.luckyspin.captcha };
        };
        //_$q.add(function () {
            _$a.api('POST', '634445158944375000020258', args, function (rst) {
                renderOrderList(rst);
                norForm($cb);
                if (cmdFind) {
                    instanceScroll.scrollToElement(cmdFind);
                };
            }, function (err) {
                norForm($cb);
                DevExpress.ui.notify("Error: '" + err, 'error', 5000);
            });
        //},true);
    }
    , SyncEvent = function (isPrevent) {
        var loi = function (err) {

        }, channelRST = function (rst) {
            //needRESET_VIEW(rst);
        };
        try {
            var _order_tracking = { 'init': isPrevent, 'frmArgs': $.extend(true,{},frmArgs()) },
            heartArgs = {}; heartArgs[$attach.toString()] = _order_tracking;
            if (svrP.hasOwnProperty('athis') && !resetList) {
                _order_tracking['his'] = $.extend(true, [], svrP['athis']);
            };
            _$hieu.CommChannel('SYN_LAZY', heartArgs, channelRST);
        }
        catch (err) {
            loi(err);
        };
        //Debug Browser 
        DelayStartTime();
    }
    , _synTimer = undefined, DelayStartTimeHWND = 0
    , DelayStartTime = function () {
        clearTimeout(DelayStartTimeHWND);
        DelayStartTimeHWND = setTimeout(function () {
            if (_synTimer) {
                ignoreSYN = false;
                _synTimer.start_hwnd_timer();//start LAZY after 02 second
            }
        }, 2000);
    }
    , PAUSE_synTimer = function (STOP) {
        ignoreSYN = true;
        if (_synTimer) {
            _synTimer.stop_hwnd_timer();//stop timer
            SyncEvent('RMV'); // remove heartbeat attach
            if (STOP) {
                delete communicateEVT['orderchannel1'];//remove javascript channel listen
                _synTimer = undefined;
            }
        };
        clearTimeout(DelayStartTimeHWND);
    }
    , attachsyn_ToHeartBeat = function () {
        if (!_synTimer) {
            _synTimer = manualTimer({ 'dura': 15, limit: 0 }, function () {
                $list.trigger('LAZY_PUT_PARAM');
            });
            _synTimer.bind($attach.toString(), function (result) {
                $list.trigger($attach + '_result', { 'data': result });
            });
        }
    }
     , heartBeatResult = function (result) {
         try {
             if (!ignoreSYN) {//ket qua sync se dung de cap nhat Warehourse View...
                 console.log('heartBeatResult: ' + result.kq);
                 if (result.kq == "RESET") {
                     PAUSE_synTimer(false);
                     resetList = true;
                     renderOrderList(result);
                     norForm(false);
                 } else if (result.kq == "OK") {
                     renderOrderList(result);
                 }
             }
         } catch (err) {
             console.log(err);
         };
     }
     , KeoXuong = function (options) {
            if (clickPrevent == '1') return;
            clickLocked();
            options.component.release();
            setTimeout(function () {
                options.component.option({ 'onPullDown': null });
                setTimeout(function () {
                    instanceScroll.option({ 'onPullDown': KeoXuong });
                }, 4000);
            }, 1000);
            //
            $list.trigger('LAZY_PUT_PARAM');
            _$hieu.get_noty();
     }
    , viewModel = {
        emptyWH: emptyWH
        , TuNgay: TuNgay
        , DenNgay: DenNgay
        , TimKiem: function (e) {
            if (clickPrevent == '1') return;
            clickLocked();
            //
            PAUSE_synTimer(false);
            initView(e.element,null);
        }
        , cssfind_changed: cssfind_changed
        , findDateChanged: function (e) {
            if (e.value == null) e.component.option('value', e.previousValue);
            if (this == '0') {
                if (TuNgay() > DenNgay()) {
                    DenNgay(TuNgay());
                }
            } else {
                if (DenNgay() < TuNgay()) {
                    TuNgay(DenNgay());
                }
            };
            cssfind_changed('changed');
            resetList = true;
        }
        , viewShowing: function (e) {
            if (!viewloaded) {
                $list = e.viewInfo.renderResult.$viewItems.find('.dondathang-list');
                $listItem = $list.find('.ordersrow').first(); $listItem.detach();
                $orderprocess = $list.children().first(); $orderprocess.detach();
                $thaihoa = $list.children().first(); $thaihoa.detach();
                $list.empty();
                initView(null,null);

                $list.on($attach + '_result', function (e, params) {
                    heartBeatResult(params['data']);
                }).on('LAZY_PUT_PARAM', function (e) {
                    SyncEvent('0');
                    console.log("SyncEvent('0')");
                }).on("click", ".ordersrow", function (evt) {
                    if (clickPrevent == '1') return;
                    clickLocked();
                    //
                    scrLocked();
                    var itemR = $(this).attr("id");
                    setTimeout(function () {
                        if (!$cartTMP) {
                            $.get(gitpath + "template/tmpcart.html" + JsCssPrefix, function (data) {
                                $cartTMP = $(data);
                                var dynamicjs = $cartTMP.find('.dynamicjs');
                                if (dynamicjs.length > 0) {
                                    var teps = dynamicjs.attr('teps').split(';');
                                    dynamicjs.remove();
                                    for (var i = 0; i < teps.length; i++) {
                                        teps[i] = dyncpath + teps[i] + JsCssPrefix;
                                    }
                                    new jsLoader().require(teps, function () {});
                                };
                                __$cartPopup(__$shared, $cartTMP.clone(), itemR);
                            });
                        } else {
                            __$cartPopup(__$shared, $cartTMP.clone(), itemR);
                        }
                    }, 10);
                });
                setTimeout(function () {
                    if (memorybag.hasOwnProperty('navigate_Order')) {
                        var params = $.extend(true, {}, memorybag['navigate_Order']['params']);
                        delete memorybag['navigate_Order'];
                        thankOrder(params);
                    };
                }, 10);
            };
            viewloaded = true;
        }
        , viewShown: function (e) {
            attachsyn_ToHeartBeat();
        }
        ,viewDisposed: function () {
            clearTimeout(DelayStartTimeHWND);
            SyncEvent('RMV');
            delete communicateEVT[$attach.toString()];//remove javascript channel listen
        }
        , _orientationChanged: function (ori) {
            if (__$shared.showCart!='0') {
                __$shared.cartcolQty();
            };
        }
        , scrollInit: function (e) {
            instanceScroll = e.component;
            setTimeout(function () {
                instanceScroll.option({ 'onPullDown': KeoXuong });
            }, 2000);
        }
        , testfucking: function (e) {
            fucking($('.fuckingtest'));
        }
        , buttonlogout: buttonlogout
        , reloadCart: function () {
            PAUSE_synTimer(false);
            resetList = true;
            initView(null, null);
        }
    };
    return viewModel
}