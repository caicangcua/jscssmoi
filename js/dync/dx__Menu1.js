﻿"use strict";!function(t){function a(a,s){var n=a.find(".digit");if(n.is(":animated"))return!1;if(a.data("digit")==s)return!1;a.data("digit",s);var i=t("<span>",{class:"digit",css:{top:"-2.1em",opacity:0},html:s});n.before(i).removeClass("static").animate({top:"2.5em",opacity:0},"fast",function(){n.remove()}),i.delay(100).animate({top:0,opacity:1},"fast",function(){i.addClass("static")})}t.fn.countdown=function(s){this.empty();var n,i,o,c,e,p,d,l=t.extend({callback:function(){},timestamp:0},s);function f(t,s,n){a(p.eq(t),Math.floor(n/10)%10),a(p.eq(s),n%10)}return(d=this).addClass("countdownHolder"),t.each(["Days","Hours","Minutes","Seconds"],function(a){t('<span class="count'+this+'">').html('<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>\t\t\t\t<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>').appendTo(d),"Seconds"!=this&&d.append('<span class="countDiv countDiv'+a+'"></span>')}),p=this.find(".position"),function t(){(n=Math.floor((l.timestamp-new Date)/1e3))<0&&(n=0),f(0,1,i=Math.floor(n/86400)),n-=86400*i,f(2,3,o=Math.floor(n/3600)),n-=3600*o,f(4,5,c=Math.floor(n/60)),f(6,7,e=n-=60*c),l.callback(i,o,c,e),setTimeout(t,1e3)}(),this}}(jQuery);