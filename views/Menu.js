﻿"use strict";function _$dondatHang(t,e,n,a,i,o){if(!(this instanceof _$dondatHang))return new _$dondatHang(t,e,n,a,i,o);var c;function r(){var t={};return $.each(i.cartData(),function(e,n){t[e]=[n.sl]}),t}if(e.find(".placeorder_button").on("click",function(n,c){if(null==c){if("1"==clickPrevent)return;clickLocked()}var s=!0;if("fastplaceorder"==this.id&&e.find("#fastcartform input.sodienthoai").each(function(t,e){if(""==$.trim($(e).val())){var n=$(e).parent(),a=n.parent();n.addClass("txt-invalid"),a.addClass("errdulieu"),s=!1,$(e).focus()}}),s){var d,l,p=null,f=function(t){if(l.empty(),0==t.length)return l.parent().css("display","none"),"";for(var e=i.cartData(),n=0;n<t.length;n++)if(e.hasOwnProperty(t[n])){var a=e[t[n]];l.append($('<div id="'+t[n]+'" class="invalidrow"><div class="invalidstt">'+(n+1)+' .</div> <div class="invalidtg">'+a.ten+'</div><div class="invalidprice"><i class="fa fa-trash-o"></i></div></div>'))}return l.parent().css("display",""),"none"},u=function(n,c){if("showcaptcha"==c.act){var s={width:300,height:270,contentTemplate:function(c){var r=a[3].clone();ComApp.app._localizeMarkup(r),r.find(".a_demo_one").on("click",function(){if("1"!=clickPrevent){clickLocked();var n=!0;if(r.find("input").each(function(t,e){if(""==$.trim($(e).val())){var a=$(e).parent(),i=a.parent();a.addClass("txt-invalid"),i.addClass("errdulieu"),a.parent().find(".dx-overlay-content").text(gbM("S1_031")),n=!1,$(e).focus()}}),n){p._$$$customP="0",p.hide();var a={},o=i.cartData(),c=e.find("#fastcartform").serializeArray(),s={act:"dathangnhanh",captcha:$(this).data().captcha,icaptcha:r.find("input").val(),uid:"-1",tien:i.tongcong(),notes:t,isuser:"user"==buttonlogout()?"1":"0"};$.extend(s,i._deliInfo()),$.each(c,function(t,e){s[e.name]=e.value}),$.each(o,function(t,e){a[t]=[e.sl,e.giaban,e.v]}),s.hh=a,h(s)}}}).data("captcha",n.captcha.CaptchaText),r.find("img").attr("src","data:image/png;base64,"+n.captcha.CaptchaImage);var s=function(t){var e=t.parent(),n=e.parent();e.hasClass("txt-invalid")&&""!=$.trim(t.val())&&(e.removeClass("txt-invalid"),n.removeClass("errdulieu"))};r.find("input").keypress(function(t){"13"==(t.keyCode||t.which)?r.find(".a_demo_one").trigger("click"):s($(this))}).blur(function(){s($(this)),$(this).parent().parent().removeClass("dx-state-focused")}).focus(function(){$(this).parent().parent().addClass("dx-state-focused")}).val("");var d=$('<div style="padding:10px"/>');d.append(r),l=$('<div class="invalid-menulist"></div>');var u=$('<div style="text-align:center;padding-bottom:10px"/>'),g=$("<div>"+gbM("S0_014")+"</div>");u.on("click",".invalidrow",function(){if("1"!=clickPrevent){clickLocked();var t,e,n=$(this);t=n.attr("id"),e=0,$.each(i.cartData(),function(n,a){t!=n&&(e+=1)}),e>0?n.fadeOut("slow",function(){n.remove(),0==l.find(".invalidrow").length&&(r.css("display",""),u.css("display","none"))}):p.hide(),o({act:"rmvitem",id:n.attr("id")})}}),u.append(l),u.append(g),r.css("display",f(n.invalidP)),d.append(u),c.append(d),d.dxScrollView({}).dxScrollView("instance")},showTitle:!0,toolbarItems:[{location:"before",toolbar:"top",widget:"dxButton",options:{icon:"refresh",elementAttr:{class:"flatbutton"},onClick:function(t){h({act:"newcaptcha",thoigian:i._deliInfo().time,hh:r(),ncc:__$ncc})}}},{location:"center",toolbar:"top",text:gbM("S1_028")}],onShown:function(t){p._$popupContent.find("input").focus()},onHidden:function(t){p._$$$customP&&"1"!=p._$$$customP||d.remove()},dragEnabled:!1};d=$("<div class='captcha_popup'/>").appendTo(".dx-viewport"),(p=d.dxPopup(s).dxPopup("instance")).show()}else if("newcaptcha"==c.act)p._$popupContent.find(".dathangcase").css("display",f(n.invalidP)),p._$popupContent.find(".a_demo_one").data("captcha",n.captcha.CaptchaText),p._$popupContent.find("img").attr("src","data:image/png;base64,"+n.captcha.CaptchaImage),p._$popupContent.find("input").focus().val("");else if("dathangnhanh"==c.act)switch(n.kq){case"errcaptcha":p.show(),p._$popupContent.find(".a_demo_one").data("captcha",n.captcha.CaptchaText),p._$popupContent.find("img").attr("src","data:image/png;base64,"+n.captcha.CaptchaImage),p._$popupContent.find("input").each(function(t,e){var n=$(e).parent(),a=n.parent();n.addClass("txt-invalid"),a.addClass("errdulieu"),a.parent().find(".dx-overlay-content").text(gbM("S1_032")),$(e).focus().select()});break;case"OK":p._$$$customP="1";var u=i._deliInfo();u.hasOwnProperty("gamegiamgia")&&(delete u.gamegiamgia,localDB.exe("rmv","gamegiamgia",null,2),kmribbon.empty()),d.remove(),o&&o({act:"clearAll",data:n})}else o&&o({act:"hidePU"});scrReleased()},h=function(t){scrLocked(),_$a.api("POST","634445158944375000020258",t,function(e){u(e,t)},function(e){chochut(-1,function(){h(t)},{img:"emoji.png",msg:'<div style="text-align:center">'+('<h1 style="color:red;background-color:yellow;display:inline-block;font-weight: 1000;">500</h1><h2>Oops! '+e+"</h2>")+"</div"})})};h({act:"showcaptcha",thoigian:i._deliInfo().time,hh:r(),ncc:__$ncc})}}),a.hasOwnProperty("0")){e.find(".lookupmore").on("click",function(t){if("1"!=clickPrevent){clickLocked();var e=$(this),n=[],a=e.prev().val();nutclickeffect(e.children()),$.each(e.data("exUI"),function(t,e){e!=a&&n.push(e)}),n.length>0&&(scrLocked(),setTimeout(function(){var t,a={width:300,height:270,showTitle:!1,contentTemplate:function(e){t=$("<div/>").appendTo(e).dxList({dataSource:n,showSelectionControls:!0,searchEnabled:!0,selectionMode:"single",selectedItems:[n[0]]}).dxList("instance")},toolbarItems:[{location:"before",toolbar:"bottom",widget:"dxButton",options:{elementAttr:{class:"get-to-work bmd-main-btn"},type:"success",text:"OK",onClick:function(n){e.prev().val(t.option("selectedItems").toString()),e.prev().trigger("change"),o.hide()}}},{location:"after",toolbar:"bottom",widget:"dxButton",options:{elementAttr:{class:"get-to-work bmd-main-btn"},type:"danger",text:"Cancel",onClick:function(t){o.hide()}}}],onShowing:function(t){scrReleased()},onHidden:function(t){i.remove()},dragEnabled:!1},i=$("<div class='captcha_popup'/>").appendTo(".dx-viewport"),o=i.dxPopup(a).dxPopup("instance");o.show()},200))}}),e.find("#dangnhap_button").on("click",function(t,a){if(null==a){if("1"==clickPrevent)return;clickLocked()}c=n.data().dxScrollView.scrollOffset();var i=e.find(".screen-placeorder"),o=e.find(".screen-dangnhap");o.removeClass("fail").removeClass("info");var r=o.find("input");r.val("").parent().removeClass("txt-invalid"),o.find(".feedback").empty(),o.find(".errdulieu").removeClass("errdulieu"),i.fadeOut(500,function(){}),setTimeout(function(){if(o.fadeIn("slow"),$(".table").css({display:"none"}),o.data("loginEvts")||function(){e.find("#dologin_close").on("click",function(t,a){if(null==a){if("1"==clickPrevent)return;clickLocked()}var i=e.find(".screen-placeorder");e.find(".screen-dangnhap").fadeOut(500,function(){if(i.fadeIn("slow"),$(".table").css({display:""}),n.data().dxScrollView.scrollTo(c),null!=a){i.find(".guest").remove();var t=i.find(".legend.plane");t.parent().removeClass("fastcartform").addClass("usercartform"),t.removeClass("plane"),t.addClass("nguoidung"),t.html("<span>"+gbM("S1_036")+"</span>"),i.find(".placeorder_button").html('<span><i class="fa fa-check-square-o"></i>'+gbM("S1_014")+"</span>"),i.find("#fastcartform input").each(function(t,e){var n=this.name;this.value=a[n],lookupmore($(this),[{prop:a[n]},a.exdata],n)}),quanlyorderlogin(a.uid,a.MatchRst),"Menu"!=ComApp.app.maCurrentView.name&&"Order"!=ComApp.app.maCurrentView.name||ComApp.app.maCurrentView.reloadCart()}})});var t=e.find("#dologin_button"),a=t.parent().parent().find("input"),i=t.parent().parent().find(".feedback");t.on("click",function(t,n){if(null==n){if("1"==clickPrevent)return;clickLocked()}global_login(a,i,function(t){var n=JSON.parse(t.msg);$.extend(n,t.data),n.exdata=t.exdata,e.find("#dologin_close").trigger("click",n)})}),a.blur(function(){var t=$(this);if(t.hasClass("sodienthoai")){var e=t.parent(),n=e.parent();e.hasClass("txt-invalid")&&""!=$.trim(t.val())&&(e.removeClass("txt-invalid"),n.removeClass("errdulieu"))}$(this).parent().parent().removeClass("dx-state-focused")}).focus(function(){$(this).parent().parent().addClass("dx-state-focused")}).keypress(function(e){var n=e.keyCode||e.which;if("13"==n){if("1"==clickPrevent)return;clickLocked(),t.trigger("click",{causeby:"1"})}else if("tel"==this.type&&8!=n&&0!=n&&(n<48||n>57))return!1}).keydown(function(t){i.parent().removeClass("fail").removeClass("info")})}(),o.data("loginEvts","1"),lgmk.length>0){for(var t=lgmk.split(String.fromCharCode(36)),a=0;a<r.length;a++)r[a].value=t[a];o.find(".feedback").html("<div>"+gbM("defacc")+"</div>"),o.addClass("info")}},500)}),e.find("#fastcartform input").keypress(function(t){var n=t.keyCode||t.which;if("13"==n){if("1"==clickPrevent)return;clickLocked(),e.find(".placeorder_button").trigger("click",{causeby:"1"})}else if("tel"==this.type&&8!=n&&0!=n&&(n<48||n>57))return!1}).blur(function(){var t=$(this);if(t.hasClass("sodienthoai")){var e=t.parent(),n=e.parent();e.hasClass("txt-invalid")&&""!=$.trim(t.val())&&(e.removeClass("txt-invalid"),n.removeClass("errdulieu"))}$(this).parent().parent().removeClass("dx-state-focused")}).focus(function(){$(this).parent().parent().addClass("dx-state-focused")})}}ComApp.Store.Menu=function(t){function e(){var t=d(!1);t[__$ncc]=m,t.deliInfo=v,localDB.exe("add","giohang",btoa(JSON.stringify(t).norm_to_ascii()),0);var e={};$.each(m,function(t,n){e[t]=n.sl}),apiHistory(h,{cart:e,deli:$.extend(!0,{},v)})}function n(t,n){if(m.hasOwnProperty(t.id))delete m[t.id];else{var a=$.extend({},t);a.sl=n,m[t.id]=a}e()}function a(t,e,n){e||(e=0,$.each(m,function(t,n){e+=1})),0!=e&&t.shake(100,10,3);var a=t.find("#cartcount");if(0==a.length&&e>0)t.append($('<div id="cartcount" class="badge pulsate">'+e+"</div>"));else{var i=a.text(),o=e+parseInt(i);o>0?a.text(o):a.remove()}if(n){var c=e>0?"addClass":"removeClass";n[c]("oncart"),n.prev()[c]("oncart")}}function i(t){var e=$("#giodunghang"),i=0;if($(t).hasClass("oncart"))a(e,i=-1,$(t));else{var o=$(t).parent().parent().find("img").eq(0),c=function(){a(e,i,$(t))};if(o)o.clone().offset({top:o.offset().top,left:o.offset().left}).css({opacity:"0.5",position:"absolute",height:o.height()+"px",width:o.width()+"px","z-index":"100"}).appendTo($("body")).animate({top:e.offset().top+10,left:e.offset().left+10,width:75,height:75},1e3,"easeInOutExpo",function(){c()}).animate({width:0,height:0},function(){$(this).detach()});else c();i=1}n($(t).parent().closest("li").data().info,i)}function o(){var t="click"in document.documentElement==1?"click":"ontouchend"in document.documentElement==1?"touchend":"ontouchstart"in document.documentElement==1?"ontouchstart":void 0;return this._init=function(e){e.on(t,"span.cbp-pgrotate",function(t){var e,n,a;e=this,n=this.nextElementSibling,a=function(t){var e=$(n).data("queImg"),a=$(n).find("img"),i=e[0],o=e[1];i.length>0&&(o<i.length-1?o+=1:o=0,a.eq(t).attr("src",i[o]),e[1]=o)},"open"===n.getAttribute("data-open")?(n.setAttribute("data-open",""),e.className=e.className.replace(/\b cbp-pgrotate-active\b/,""),n.className=n.className.replace(/\b cbp-pgitem-showback\b/,""),setTimeout(function(){a(1)},10)):(n.setAttribute("data-open","open"),e.className+=" cbp-pgrotate-active",n.className+=" cbp-pgitem-showback",setTimeout(function(){a(0)},10))}).on(t,"ul.cbp-pgoptions",function(t){switch(t.target.className.split(" ")[0]){case"cbp-pgoptcart":if("1"==clickPrevent)return;!function(t){clickLocked();var e=$(t.target);e.attr("tabindex",1).focus(),i(t.target||t.srcElement),setTimeout(function(){e.removeAttr("tabindex").blur()},1e3)}(t);break;case"cbp-pgoptcolor":_$hieu.get_noty();break;case"cbp-pgoptfav":alert("here")}}).on(t,".goimon .ordernow",function(t){if(t.stopPropagation(),"1"!=clickPrevent)return clickLocked(),setTimeout(function(){i(t.currentTarget.parentNode.nextElementSibling),$.isEmptyObject(m)||(scrLocked(),setTimeout(function(){x()},1200))},10),!1}).on(t,".goimon .orderok",function(t){if(t.stopPropagation(),"1"!=clickPrevent)return clickLocked(),setTimeout(function(){x()},10),!1})},{_init:this._init}}function c(t,e){f||(f=t.find("li.chew-cell--ghost").eq(0)),p||(p=f.prev()).detach(),e.hasOwnProperty("time_deli")&&(C._tgGiaoHang=e.time_deli);var n,a=function(t){if(t)for(var e=shuffle(t),n=0;n<e.length;n++){var a=p.clone();r(e[n],a),a.insertBefore(f)}};if(0==e.act)a(e.n);else if(1==e.act){a((n=e.n,t.find(">li:not(.chew-cell--ghost)").filter(function(){var t=$(this),e=t.data("id"),a=-1;$.grep(n,function(n,i){n.id==e&&(a=n.status,1==n.status&&(r(n,t),n.itemModify="1"))}),1!=a&&_$q.add(function(){this.fadeOut("fast",function(){$(this).remove(),_$q.next()})}.bind(t))}),$.grep(n,function(t,e){return!t.itemModify})))}else if(2==e.act){var i=function(e){return t.find(">li:not(.chew-cell--ghost)").filter(function(){var t=$(this),n=t.data("id");$.grep(e,function(e,a){e.id==n&&(1==e.status?r(e,t):_$q.add(function(){this.fadeOut("fast",function(){$(this).remove(),_$q.next()})}.bind(t)),e.itemModify="1")})}),$.grep(e,function(t,e){return null==t.itemModify})}(e.u);e.n&&$.extend(!0,i,e.n),a(i)}e.hasOwnProperty("athis")&&function(t,e,n){var a=t.children().length;if(0==e){if(0==t.closest("#dxScrollView_food").find(".fooding").length)if(""==n)t.closest("#dxScrollView_food").append($("<div class='fooding'><div class='fooding1'></div><div class='fooding2'>"+gbM("S1_035")+"</div></div>"));else{var i=n.split("|");"1"==i[0]&&t.closest("#dxScrollView_food").append($("<div class='fooding'><div class='nghiban-closed'></div><div class='fooding2'>"+i[1]+"</div></div>"))}}else t.closest("#dxScrollView_food").find(".fooding").remove();var o=0==e||a-12>=e;g.release(o),o||s()}(t,e.athis[3],e.athis[4])}function r(t,e){e.data("id",t.id),e.data("info",t),e.find(".cbp-pginfo h3").text(t.ten);var n=_Tien(t.giaban,0);e.find(".cbp-pginfo .cbp-pgprice").text(n);for(var a,i=t.imgs.split(","),o="",c=-1,r=0;r<i.length;r++)0!=i[r].indexOf("http://")&&0!=i[r].indexOf("https://")&&(i[r]=((a=i[r-1].split("/"))[a.length-1]="",a.join("/")+i[r])),r<2&&(c+=1,o+='<img draggable="false" src="'+i[r]+'"/>');if(e.find(".cbp-pgrotate").css("display",i.length>1?"":"none"),e.find(".cbp-pgitem-flip").html(o).parent().data("queImg",[i,c]),m.hasOwnProperty(t.id)){var s=e.find(".cbp-pgoptcart");s.addClass("oncart"),s.prev().addClass("oncart")}}function s(){_&&setTimeout(function(){var t=g._$element.find(".dx-scrollable-container").height(),e=g._$element.find(".dx-scrollview-content").height();if(e<=t)g.release(!0),apiHistory(h,{more:"b"});else{var n=g._$bottomPocket.offset().top;n<=t&&g.scrollTo(e-n-20),apiHistory(h,{more:"u"})}})}function d(t,e){var n=localDB.exe("get","giohang",null,0)||"";if(n.length>0){var a=JSON.parse(atob(n).norm_to_unicode());if(t&&(v=a.deliInfo||{}),!e)return a;if(e&&a.hasOwnProperty(e))return a[e]}return{}}jQuery.extend(jQuery.easing,{easeInOutExpo:function(t,e,n,a,i){return 0==e?n:e==i?n+a:(e/=i/2)<1?a/2*Math.pow(2,10*(e-1))+n:a/2*(2-Math.pow(2,-10*--e))+n}}),jQuery.fn.shake=function(t,e,n){t=void 0===t?100:t,e=void 0===e?10:e,n=void 0===n?3:n;var a=$(this);a.css("position","relative");for(var i=0;i<n+1;i++)a.animate({top:i%2==0?e*Math.random():e*Math.random()*-1,left:i%2==0?e*Math.random():e*Math.random()*-1},t);return a.animate({top:0,left:0},t)};var l,p,f,u,h="$attach_634444690322031250072038",g=null,v={},m=d(!0,__$ncc),_=!1,b=function(){buttonlogout.refreshCartData&&"1"==buttonlogout.refreshCartData&&(buttonlogout.refreshCartData="0",m=d(!0,__$ncc))},C={showCart:!1,_cartData:function(){return b(),m},_deliInfo:function(){return b(),v},_tgGiaoHang:null,_rmvOutCart:function(t,e){var i=!1,o=$("#giodunghang");$("#dxScrollView_food .oncart").each(function(e,n){$(n).parent().closest("li").data().id==t&&(i||a(o,-1,$(n)),$(n).removeClass("oncart"),i=!0)}),i||a(o,-1,null),n({id:t}),e&&e()},_cbCart:function(t,n){$.each(n,function(e,n){var a=t.toString(),i=e.toString();"delivery"!=t?m[a][i]=n:v[i]=n}),e()},cartcolQty:function(){var t=$(".giohang .cartx"),e=t.find(".col-qty");if(e.length>0){e.removeClass("ex2 ex1 ex3");var n=t.find(".scrollbody .col-qty").eq(0).find("div"),a=n[0].parentNode.getBoundingClientRect(),i=n[0].getBoundingClientRect(),o=n[1].getBoundingClientRect(),c=parseInt(o.left-i.left),r=(parseInt(i.left-a.left),""),s=t.find(".table").width(),d=17*s/100;0==c?a.width<78&&(r+=" ex1",a.width<60&&(r+=" ex2")):0!=parseInt(i.top-o.top)&&(a.width<125?(r+=" ex1",a.width<d&&a.width<95&&(r+=" ex2")):r+=" ex1"),r.length>0&&t.find(".col-qty").addClass(r)}}},x=function(){if(!$.isEmptyObject(m)){scrLocked();ComApp.app.maCurrentView;var t=function(){var t=$cartTMP.find(".dynamicjs");if(t.length>0){var n=t.attr("teps").split(";");t.remove();for(var a=0;a<n.length;a++)n[a]=dyncpath+n[a]+JsCssPrefix;(new jsLoader).require(n,function(){e()})}else e()},e=function(){var t,e;ComApp.app.maCurrentView__$cartPopup(C,$cartTMP.clone(),(t=$.Deferred(),e=function(){C._tgGiaoHang&&C._tgGiaoHang.length>0?t.resolve("1",C._tgGiaoHang):t.resolve("0",gbM("S0_013"))},C._tgGiaoHang?e():_$q.add(function(){_$a.api("POST","634445158944375000020258",{act:"deliverytime"},function(t){_$q.next(!1),C._tgGiaoHang=t.time,e()},function(e){_$q.next(!1),t.resolve("0",gbM("S0_013"))})}),t.promise()))};setTimeout(function(){$cartTMP?ComApp.app.maCurrentView__$cartPopup?e():t():$.get(gitpath+"template/tmpcart.html"+JsCssPrefix,function(e){$cartTMP=$(e),t()})},10)}};return{viewRendered:function(t){l=t.viewInfo.viewName;var e=$(t.viewInfo.renderResult.$markup[1]).find(".cbp-pggrid");_$hieu.bind([h+"_1",l],function(t,n){!function(t,e){apiHistory(h,{his:e.athis,more:"u"}),c(t,e)}(e,n)}),(new o)._init(e.parent())},viewShown:function(t){if(_)b();else{_=!0;var i=localDB.exe("get","gamegiamgia",null,2);if(""!=i){var o=i.split("|");if("triggerpopupform"==o[0]){var c=JSON.parse(o[1]);m.hasOwnProperty(c.id)||n(c,1),x()}else v.gamegiamgia=i,$('<div class="starburst3"><span><span><span><span><span><span><span><span></span></span></span></span></span></span></span></span></div><span class="dis">Mini Game<div style="font-size:50px">'+o[0]+"%</div>"+gbM("S3_003")+"!</span>").appendTo(kmribbon)}else v.hasOwnProperty("gamegiamgia")&&(delete v.gamegiamgia,e());a($("#giodunghang"));var r={};$.each(m,function(t,e){r[t]=e.sl}),apiHistory(h,{cart:r,deli:$.extend(!0,{},v)}),v.hasOwnProperty("uid")&&quanlyorderlogin(v.uid,v.MatchRst)}},_orientationChanged:function(t){setTimeout(function(){s(),C.showCart&&C.cartcolQty()},500)},onInitScroll:function(t){g=t.component},onReachBottomMenu:function(t){clearTimeout(u),u=setTimeout(function(){_$hieu.stop_noty_timer(),apiHistory(h,{more:"b"}),g.release(!0),_$hieu.get_noty()},200)},testapi:function(t){gbM("S1_CACHEVER");_gbM({vi:{S1_CACHEVER:"1"}}),gbM("S1_CACHEVER"),_$q.add(function(){_$a.api("POST","634444690322031250072038",["634374721143258750061757"],function(t){_$q.next(!1)},function(t){DevExpress.ui.notify("Error: '"+t,"error",5e3),_$q.next(!1),scrReleased()})})},and2Cart:function(t,e){},cartHandler:function(t){"1"!=clickPrevent&&(clickLocked(),x())},buttonlogout:buttonlogout,reloadCart:function(){m=d(!0,__$ncc)}}};