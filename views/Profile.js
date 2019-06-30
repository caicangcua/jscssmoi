"use strict";

ComApp.Store.Profile = function (params) {
    var modelIsReady = $.Deferred(), viewloaded = false, logininput = null, feedback, userinfo = ko.observable(false), frmTITLE = ko.observable(''), userphoto = ko.observable(''), dxformI, frmDOI, formWidget
    , listHieu = { 'newlistEditor': '<div><div class="input"><input type="text" placeholder="' + gbM('require') + '" class="sodienthoai dx-texteditor-input"/></div><div class="dx-invalid-message dx-overlay"><div class="dx-overlay-wrapper dx-invalid-message"style="z-index: 1501; position: absolute;text-align: right;padding-right: 20px;"><div class="dx-overlay-content dx-resizable" style="width: auto; height: auto; z-index: 1501; margin: 0px; left: 0px; top: 0px; transform: translate(-1px, 1px); transition: all 0s ease 0s; max-width: 468px;">' + gbM('require') + '</div></div></div></div>' }
    , isEditProfile = ko.observable(false), formData, preventFieldChanged=true
    , delsecure = function (evt) {
        if (clickPrevent == '1') return;
        clickLocked();

        nutclickeffect($(evt.target));
        var ordersrow = $(evt.target).closest('.ordersrow'), coltg = ordersrow.find('.listcol-tg'), rowediting = ordersrow.hasClass('rowediting');
        if (rowediting) {
            coltg.find('.suarow').fadeOut('fast', function () {
                $(this).remove();
                ordersrow.removeClass('rowediting');
            });
        } else {
            var result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px"><i class="fa fa-question-circle" style="padding:10px"></i>' + gbM("confirmdel") + '</div>', "Confirm changes");
            result.done(function (rst) {
                if (rst) {
                    scrLocked();
                    ordersrow.fadeOut('fast', function () {
                        var lst = ordersrow.parent();
                        $(this).remove();
                        listSave(lst, undefined, function (formData) {
                            reloadLIST(['phone', 'name', 'addr'], formData)
                        });
                    });
                };
            });
        }
    }
    , itemLIST = function (data, lst, isMain) {
        for (var i = 0; i < data.length; i++) {
            var val = $.trim(data[i]);
            if (val.length > 0) {
                var item = listHieu['orderR'].clone(), defitem = '';
                if (isMain) {
                    item.addClass('defitem'); defitem = 'class="defitem"'
                };
                item.find('.listcol-tg').append('<span ' + defitem + '>' + data[i] + '</span>');
                item.find('.delrow').bind("click", function (e) { delsecure(e, isMain) });
                item.find('.stt').text(lst.find('.ordersrow').length + 1 + '/ ');
                lst.append(item);
            };
        }
    }
    , validateBind = function ($txt, type) {
        var isErr = function ($txt) {
            if ($txt.hasClass('sodienthoai')) {
                var _$p = $txt.parent(), __$p = _$p.parent();
                if (_$p.hasClass('txt-invalid')) {
                    if ($.trim($txt.val()) != '') {
                        _$p.removeClass('txt-invalid'); __$p.removeClass('errdulieu');
                    }
                }
            }
        };
        $txt.attr('type', type);
        $txt.blur(function () {
            isErr($(this));
            $(this).parent().parent().removeClass("dx-state-focused");
        }).focus(function () {
            $(this).parent().parent().addClass("dx-state-focused");
        }).keypress(function (e) {
            var keycode = e.keyCode || e.which;
            if (keycode == '13') {

            } else {
                if (type == 'tel') {
                    if (this.type == 'tel') {
                        if (keycode != 8 && keycode != 0 && (keycode < 48 || keycode > 57)) {
                            return false;
                        }
                    };
                }
            }
            isErr($(this));
        })
    }
    , reloadLIST = function (tasks, formData) {
        $.each(tasks, function (i, ten) {
            listHieu[ten].empty();
            itemLIST([formData['data'][ten]], listHieu[ten], true); itemLIST(formData['exdata'][ten], listHieu[ten], false);
        });
    }
    , jBind = function (rootEL) {
        var userData = {
            UserName: formData['exdata'].UserName,
            Email: formData['exdata'].Email,
            Gender: formData['exdata'].Gender
        };
        if (formData['exdata'].imgURL != '') {
            userphoto(formData['exdata'].imgURL);
        } else {
            userphoto('../images/useravatar.png');
        };
        preventFieldChanged = true;
        if (dxformI == undefined) {
            dxformI = rootEL.find('.frmUserInfor').dxForm({
                formData: userData,
                onFieldDataChanged: function (e) {
                    var updatedField = e.dataField;
                    var newValue = e.value;
                    // Event handling commands go here
                    var txt = e.component.getEditor(updatedField);
                    if (txt) {
                        var radiostyle = 'style="margin-top: -2px;margin-left: 32px;"'; if (updatedField != 'Gender') radiostyle = '';
                        var el = txt._$element.find('input').parent(), undobtn = $('<span ' + radiostyle + ' name="' + updatedField + '" class="ahieuungclick dx-icon-revert"></span>');
                        if (!preventFieldChanged) {
                            if (!el.hasClass('fieldvalchanged')) {
                                el.addClass('fieldvalchanged');
                                el.append(undobtn);
                                isEditProfile(true);
                            };
                        } else {
                            el.removeClass('fieldvalchanged');
                            el.find('span.dx-icon-revert').remove();
                            isEditProfile(false);
                        }
                    }
                },
                items: [{
                    itemType: 'group',
                    caption: gbM('userinfo'),
                    items: [{ dataField: 'UserName', label: { text: gbM('username') } },
                        {
                            dataField: 'Gender',
                            label: { text: gbM('gender') },
                            editorType: 'dxRadioGroup',
                            editorOptions: {
                                layout: "horizontal",
                                dataSource: [{ text: gbM('male'), value: "1" }, { text: gbM('female'), value: "0" }],
                                displayExpr: "text",
                                valueExpr: "value"
                            }
                        }
                        , {
                            dataField: "Email",
                            validationRules: [{
                                type: 'email',
                                message: 'Invalid email.'
                            }]
                        }
                    ]
                }
                ]
            }).dxForm("instance");
            dxformI._$element.on('click', 'span.dx-icon-revert', function (evt) {
                if (clickPrevent == '1') return;
                clickLocked();
                //
                var act = this, el = $(evt.target);
                nutclickeffect(el);
                //
                el.fadeOut('slow', function () {
                    el.parent().removeClass('fieldvalchanged');
                    el.remove();
                    isEditProfile(dxformI._$element.find('.fieldvalchanged').length > 0);
                });
                dxformI.updateData(el.attr('name'), formData['exdata'][el.attr('name')]);
            });
            rootEL.find('.lsthieu').each(function (i, el) {
                if (i == 0) {
                    listHieu['phone'] = $(el);
                    listHieu['orderR'] = listHieu['phone'].find('.ordersrow'); listHieu['orderR'].detach();
                    listHieu['suarow'] = listHieu['orderR'].find('.suarow'); listHieu['suarow'].detach();
                    //
                    itemLIST([formData['data'].phone], listHieu['phone'], true); itemLIST(formData['exdata'].phone, listHieu['phone'], false);
                    //
                } else if (i == 1) {
                    listHieu['name'] = $(el);
                    itemLIST([formData['data'].name], listHieu['name'], true); itemLIST(formData['exdata'].name, listHieu['name'], false);
                } else if (i == 2) {
                    listHieu['addr'] = $(el);
                    itemLIST([formData['data'].addr], listHieu['addr'], true); itemLIST(formData['exdata'].addr, listHieu['addr'], false);
                }
            });
            var canceladd = function (el) {
                $(el[0]).children().first().fadeOut('fast', function () {
                    $(el[0]).removeClass('dx-texteditor');
                    $(el[1]).css('display', 'none');
                    var dxButton = $(el[2]).data('dxButton');
                    dxButton.option({ icon: 'plus', type: 'normal' });
                    dxButton.cpInput = undefined;
                    $(this).remove();
                });
            };
            rootEL.on('click', '.canceladd', function (evt, triggerP) {
                var act = this, el = $(evt.target);
                if (triggerP == undefined) {
                    if (clickPrevent == '1') return;
                    clickLocked();
                    nutclickeffect(el);
                };
                canceladd(el.parent().children());
            }).on('click', '.editrow', function (evt) {
                if (clickPrevent == '1') return;
                clickLocked();

                nutclickeffect($(evt.target));

                var ordersrow = $(evt.target).closest('.ordersrow'), coltg = ordersrow.find('.listcol-tg');
                if (!ordersrow.hasClass('rowediting')) {
                    ordersrow.addClass('rowediting');
                    var suarow = listHieu['suarow'].clone(), $i = suarow.find('input');
                    coltg.append(suarow);
                    validateBind($i, (ordersrow.parent().attr('name') == 'phone') ? 'tel' : 'text');
                    $i.val(coltg.find('span').text());
                } else {
                    var el = coltg.find('input'), isValid = $.trim(el.val()) != '';
                    if (!isValid || !lstCHK(ordersrow.parent(), $.trim(el.val()), parseInt(ordersrow.find('.stt').text()))) {
                        var _$p = el.parent(), __$p = _$p.parent(), msgERR = '';
                        _$p.addClass('txt-invalid'); __$p.addClass('errdulieu');
                        if (!isValid) {
                            msgERR = gbM('require');
                        } else {
                            msgERR = gbM('dupinfo');
                        };
                        __$p.find('.dx-overlay-content').text(msgERR);
                        isValid = false;
                        setTimeout(function () { el.focus(); el.select(); }, 300);
                    };
                    if (isValid) {
                        canceladd(el.closest('lsthieu-additem').children().first());
                        coltg.find('span').text($.trim(el.val()));
                        listSave(ordersrow.parent(), undefined, function (formData) {
                            reloadLIST(['phone', 'name', 'addr'], formData)
                        });
                    };
                };
            });
        } else {
            reloadLIST(['phone', 'name', 'addr'], formData);
            dxformI.option('formData', userData);
        };
        preventFieldChanged = false;
    }
    , listSave = function (lst, newVal,$cb) {
        var  defitem = '', listI = []
        , KetQua = function (rst, kq) {
            _$q.next(false);
            if (kq == 'err') {
            } else {
                if ($cb) $cb(rst);
            };
            scrReleased();
        }
        lst.find('.listcol-tg span').each(function (i, span) {
            if ($(span).hasClass('defitem')) {
                defitem = $(span).text();
            } else {
                listI.push($(span).text());
            }
        });
        if (newVal != undefined) listI.push(newVal);
        scrLocked();
        _$q.add(function () {
            _$a.api('POST', '634445598610781250052977', { 'act': 'savelist', 'kind': 'mod' + lst.attr('name'), 'data': [defitem, listI], 'uid': buttonlogout.cptmp }, function (rst) {
                KetQua(rst, 'ok');
                exUI([rst.data, rst.exdata]);
            }, function (err) {
                KetQua(err, 'err');
            });
        }, true);
    }
    , lstCHK = function (lst, Val, isUPT) {
        var result = true;
        lst.find('.listcol-tg span').each(function (i, span) {
            if ($.trim($(span).text()) == $.trim(Val)) {
                if (isUPT > 0) {//update
                    var atSTT = parseInt($(span).closest('.ordersrow').find('.stt').text());
                    if (isUPT != atSTT) {
                        result = false;
                        return false;
                    }
                } else {
                    result = false;
                    return false;
                };
            };
        });
        return result;
    }
    , loginsecBind = function () {
        var $input = listHieu['loginsec'].find('input');
        feedback = listHieu['loginsec'].find('.feedback');
        viewloaded = true;
        $input.blur(function () {
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
        }).keypress(function (e) {
            var keycode = e.keyCode || e.which;
            if (keycode == '13') {
                if (clickPrevent == '1') return;
                clickLocked();
                listHieu['loginsec'].find('.dangnhap_button').trigger("click", { 'causeby': '1' });
                //dologin_button
            } else {
                if (this.type == 'tel') {
                    if (keycode != 8 && keycode != 0 && (keycode < 48 || keycode > 57)) {
                        return false;
                    }
                };
            }
        }).keydown(function (e) {
            feedback.parent().removeClass('fail').removeClass('info');
        });
        listHieu['loginsec'].on('click', '.dangnhap_button', function (evt, triggerP) {
            if (triggerP == undefined) {
                if (clickPrevent == '1') return;
                clickLocked();
            };
            var $input = listHieu['loginsec'].find('input');
            global_login($input, feedback, function (rst) {
                var triggerData = JSON.parse(rst.msg);
                $.extend(triggerData, rst.data);
                frmTITLE(gbM("S0_012").toUpperCase());
                formData = rst;
                jBind(listHieu['loginsec'].closest('.dx-scrollview-content'));
                quanlyorderlogin(triggerData.uid, triggerData.MatchRst);
                userinfo(true);
            });
        });
    }
    , exUI = function (exdata) {
        localDB.exe('add', 'exUI',exdata, 0);
    }
    , exitChangePass = function (isSwitch) {
        listHieu['loginsec'].removeClass('changematkhau');
        userinfo(isSwitch);
        frmTITLE(gbM("S0_012").toUpperCase());
        if (formWidget) {
            formWidget.dispose(); formWidget = null;
        };
        if (frmDOI) {
            frmDOI.remove();
        };
    }
    , ChangePass = function (e) {
        var isdefacc = ''
        if (lgmk.length > 0) {
            var test = lgmk.split(String.fromCharCode(36));
            if (buttonlogout.cptmp && buttonlogout.cptmp == test[2]) {
                isdefacc = test[1];
            };
        };
        frmDOI = $("<div style='max-width:450px;margin:auto;padding:20px'/>");
        var errmsg = null, doneBTN,
        fuckValidatorP,
        validateLogin = function (params) {
            fuckValidatorP = params;
            return true;
        }
        , resetERR = function () {
            if (errmsg != null) {
                errmsg.remove(); doneBTN.data('dxButton').option({ disabled: false });
                errmsg = null;
            };
        };
        formWidget = frmDOI.appendTo(listHieu['loginsec']).dxForm({
            showColonAfterLabel: true,
            labelLocation: "top",
            onFieldDataChanged: function (e) {
                resetERR();
            },
            items: [{
                dataField: "oldpass",
                label: { text: gbM('oldpass') },
                editorOptions: {
                    mode: "password",
                    disabled: isdefacc != '',
                    value:isdefacc
                },
                validationRules: [{
                    type: "required",
                    message: gbM("require")
                }, {
                    type: 'custom',
                    validationCallback: validateLogin
                }]
            },{
                itemType: "group",
                caption: gbM('newpass').toUpperCase(),
                horizontalAlignment: "center",
                items: [{
                    dataField: "newpass",
                    label: { text: gbM('newpass')},
                    editorOptions: {
                        mode: "password"
                    },
                    validationRules: [{
                        type: "required",
                        message: gbM("require")
                    }]
                }, {
                    label: {
                        text: gbM('renewpass')
                    },
                    editorType: "dxTextBox",
                    editorOptions: {
                        mode: "password"
                    },
                    validationRules: [{
                        type: "required",
                        message: gbM("require")
                    }, {
                        type: "compare",
                        message: gbM("notmatchpass"),
                        comparisonTarget: function () {
                            return formWidget.option("formData").newpass;
                        }
                    }]
                }]
            }, {
                template: function (data, element) {
                    var btndiv = $('<div style="text-align:center"/>').appendTo(element);
                    doneBTN=$("<div>").dxButton({
                        text: gbM("S1_024"),
                        type:"success",
                        useSubmitBehavior: true,
                        onClick: function (e) {
                            resetERR();
                            var result = formWidget.validate();
                            if (result.isValid) {
                                setTimeout(function () {
                                    var result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px"><i class="fa fa-question-circle" style="padding:10px"></i>' + gbM("confirmation") + '</div>', "Confirm changes");
                                    result.done(function (rst) {
                                        if (rst) {
                                            scrLocked();
                                            var ketqua = function (kq,rst) {
                                                _$q.next(false);
                                                var err = function () {
                                                    if (fuckValidatorP) {
                                                        var validator = fuckValidatorP.validator._validationRules[1];
                                                        validator.isValid = false;
                                                        validator.message = gbM("wrongpass");
                                                        fuckValidatorP.validator.validate();
                                                    };
                                                    doneBTN.data('dxButton').option({ disabled: true });
                                                };
                                                if (kq == 'ok') {
                                                    var msg = JSON.parse(rst['msg']);
                                                    if (msg.hasOwnProperty(rst.kq)) {
                                                        errmsg = $("<div class='dathang' style='margin-bottom:0px;display:block'><div class='login screen-dangnhap fail'><div class='feedback'><span class='fa fa-exclamation-triangle'></span><div>" + msg[rst.kq] + "</div></div></div></div>");
                                                        frmDOI.append(errmsg);
                                                        if (rst.kq <= 0) { err(); };
                                                    } else {
                                                        confirmDlg(msg['ok'], [0], function () {
                                                            lgmk = '';//reset
                                                            localDB.exe('rmv', 'lgmk', null, 2);
                                                            exitChangePass(true);
                                                        });
                                                    };
                                                } else {
                                                    err();
                                                };
                                                scrReleased();
                                            }
                                            _$q.add(function () {
                                                _$a.api('POST', '634445598610781250052977', { 'act': 'savelist', 'kind': 'changepass', 'uid': buttonlogout.cptmp, 'data': formWidget.option('formData') }, function (rst) {
                                                    ketqua('ok', rst);
                                                }, function (err) {
                                                    ketqua('err', err);
                                                });
                                            }, true);
                                        };
                                    });
                                }, 200);
                            };
                        }
                    }).appendTo(btndiv).css({
                        'margin-right': "10px",
                    });
                    $("<div>").dxButton({
                        text: gbM("S1_025"),
                        onClick: function (e) {
                            exitChangePass(true);
                        }
                    }).appendTo(btndiv);

                    return element;
                }
                }]
        }).dxForm("instance");
        userinfo(false);
        frmTITLE(gbM('changepass'));
    }
    , defACC = function () {
        if (lgmk.length > 0) {
            var test = lgmk.split(String.fromCharCode(36)), input = listHieu['loginsec'].find('input');
            for (var i = 0; i < input.length; i++) {
                input[i].value = test[i];
            };
            feedback.html('<div>' + gbM("defacc") + '</div>');
            feedback.parent().removeClass('fail').addClass('info');
        } else {
            feedback.empty();
            feedback.parent().removeClass('fail').removeClass('info');
        };
    }
    , viewModel = {
        modelIsReady: modelIsReady.promise(),
        slideMenu: function (e) {

        }
        , logout: function (p) {
            exitChangePass(false);
            frmTITLE(gbM('S1_015'));
            userinfo(false);
            feedback.parent().removeClass('fail').removeClass('info');
            defACC();
        }
        , changepass: function (e) {
            listHieu['loginsec'].addClass('changematkhau');
            ChangePass(e);
        }
        , title: frmTITLE
        , viewShowing: function (e) {
            if (buttonlogout() == 'user') {
                if (!formWidget) {
                    userinfo(true);
                    frmTITLE(gbM("S0_012").toUpperCase());
                };
            } else {
                userinfo(false);
                frmTITLE(gbM('S1_015').toUpperCase());
                if (listHieu.hasOwnProperty('loginsec')) {
                    exitChangePass(false);
                    defACC();
                };
            }
        }
        , save_action: function (w, evt) {
            if (clickPrevent == '1') return;
            clickLocked();
            //
            var act = this, fuckCart = $(evt.target).parent();
            nutclickeffect(fuckCart);
            var result = dxformI.validate();
            if (result.isValid) {
                setTimeout(function () {
                    var result = DevExpress.ui.dialog.confirm('<div style="text-align:center;max-width:300px"><i class="fa fa-question-circle" style="padding:10px"></i>' + gbM("confirmation") + '</div>', "Confirm changes");
                    result.done(function (rst) {
                        if (rst) {
                            scrLocked();
                            dxformI._$element.find('.fieldvalchanged').removeClass('fieldvalchanged').find('span.dx-icon-revert').remove();
                            isEditProfile(false);
                            _$q.add(function () {
                                _$a.api('POST', '634445598610781250052977', { 'act': 'savelist', 'kind': 'userinfo', 'uid': buttonlogout.cptmp, 'data': dxformI.option('formData') }, function (rst) {
                                    _$q.next(false);
                                    exUI([rst.data,rst.exdata]);
                                    scrReleased();
                                }, function (err) {
                                    _$q.next(false);
                                    scrReleased();
                                });
                            }, true);
                        };
                    });
                }, 200);
            } else {
                confirmDlg(result.brokenRules[0].message + ' ' + result.brokenRules[0].value, [0], function () { });
            };
        }
        , newlistItem: function (e) {
            if (e.component.cpInput == undefined) {
                e.component.option({ icon: 'save', type: 'success' });
                var newlistEditor = $(listHieu['newlistEditor']), themmoi = e.element.closest('.lsthieu-additem');
                themmoi.children().first().append(newlistEditor).addClass("dx-texteditor");
                themmoi.find('.canceladd').css('display', 'block');
                e.component.cpInput = newlistEditor.find('input');
                validateBind(e.component.cpInput,(this=='phone')? 'tel':'text');
            } else {
                var el = e.component.cpInput, newVal = $.trim(el.val()), isValid = newVal != '';
                if (!isValid || !lstCHK(e.component._$element.closest('.lsthieu-additem').prev(), newVal, 0)) {
                    var _$p = el.parent(), __$p = _$p.parent(), msgERR = '';
                    _$p.addClass('txt-invalid'); __$p.addClass('errdulieu');
                    if (!isValid) {
                        msgERR = gbM('require');
                    } else {
                        msgERR = gbM('dupinfo');
                    };
                    __$p.find('.dx-overlay-content').text(msgERR);
                    isValid = false;
                    setTimeout(function () { el.focus(); el.select(); }, 200);
                };
                if (isValid) {
                    e.element.closest('.lsthieu-additem').find('.canceladd').trigger('click', {'causeby':'1'});
                    listSave(e.component._$element.closest('.lsthieu-additem').prev(), newVal, function (rst) {
                        reloadLIST(['phone', 'name', 'addr'], rst)
                    });
                };
            }
        }
        , userinfo: userinfo
        , bindinput: function (el) {
            if (!viewloaded) {
                listHieu['loginsec'] = el.element.closest('.view-content.profile').prev();
                loginsecBind();
                if (buttonlogout() == 'user') {
                    jBind(el.element.closest('.dx-scrollview-content'));
                } else {
                    if (listHieu.hasOwnProperty('loginsec')) {
                        defACC();
                    };
                };
            };
        }
        , userphoto: userphoto, isEditProfile: isEditProfile
        , photoeditor: function (e) {
            var editorURL = '../photoeditor/index.htm?isDevice=' + mobileClient + '&w=200&h=200&bagid=1&' + JsCssPrefix.replace('?', '');
            var editor = $('<div class="iframe-wrapper" style="z-index:200"><iframe scrolling="no" src="' + editorURL + '"></iframe></div>');
            editor.find('iframe').on("load", function () {
                this.contentWindow.startEditor({ 'act': '-1' }, function (p) {
                    switch (p['act']) {
                        case 'exit': {
                            editor.remove();
                            break;
                        }
                        case 'srcLocked': {
                            scrLocked(p['delay']);
                            break;
                        }
                        case 'save': {
                            editor.remove();
                            _$q.add(function () {
                                _$a.api('POST', '634445598610781250052977', { 'act': 'savelist', 'kind': 'userimg', 'uid': buttonlogout.cptmp, 'imgURL': p.imgurLink }, function (rst) {
                                    _$q.next(false);
                                    userphoto(p.imgBase64);
                                    exUI([rst.data, rst.exdata]);
                                    scrReleased();
                                }, function (err) {
                                    _$q.next(false);
                                    scrReleased();
                                });
                            }, true);
                            break;
                        }
                    };
                });
            });
            editor.appendTo('.dx-viewport');
        }
    };
    if (!viewloaded) {
        if (buttonlogout() == 'user') {
            userinfo(true);
            var KetQua = function (rst, kq) {
                _$q.next(false);
                if (kq == 'ok') {
                    formData = rst;
                    modelIsReady.resolve();
                };
            };
            _$q.add(function () {
                _$a.api('POST', '634445598610781250052977', { 'act': 'savelist', 'kind': 'logininfo', 'uid': buttonlogout.cptmp }, function (rst) {
                    KetQua(rst, 'ok');
                    exUI([rst.data, rst.exdata]);
                }, function (err) {
                    KetQua(err, 'err');
                });
            }, true);
        } else {
            modelIsReady.resolve();
        }
    };
    return viewModel
}
