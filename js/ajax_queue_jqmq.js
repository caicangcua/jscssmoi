﻿/*!
http://benalman.com/code/projects/jquery-message-queuing/examples/ajax/
 * jQuery Message Queuing - v1.0 - 1/5/2010
 * http://benalman.com/projects/jquery-message-queuing-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
!function(n,t){"$:nomunge";var e={delay:100,batch:1,queue:[]};n.jqmq=function(c){var u,a,r,i,o,f={},d=n.extend(!0,{},e,c),l=d.queue,h=d.paused,m=[];function q(){u&&clearTimeout(u),u=t}return f.add=function(n,t){return r([n],t)},f.addEach=r=function(n,t){return n&&(a=!1,l=t?n.concat(l):l.concat(n),h||o()),i()},f.start=o=function(){h=!1,!i()||u||m.length||function n(){var t=d.delay,e=d.batch,c=d.complete,r=d.callback;if(q(),!i())return a=!0,void(c&&c.call(f));m=l.splice(0,e),r&&!0===r.call(f,1===e?m[0]:m)&&(l=m.concat(l),m=[]),"number"==typeof t&&t>=0&&(m=[],u=setTimeout(n,t))}()},f.next=function(n){var t=d.complete;n&&(l=m.concat(l)),m=[],i()?h||o():a||(a=!0,t&&t.call(f))},f.clear=function(){var n=l;return q(),l=[],a=!0,m=[],n},f.pause=function(){q(),h=!0},f.update=function(t){n.extend(d,t)},f.size=i=function(){return l.length},f.indexOf=function(t){return n.inArray(t,l)},h||o(),f},n.fn.jqmqAdd=function(n,t){return n.add(this.get(),t),this},n.fn.jqmqAddEach=function(n,t){return n.addEach(this.get(),t),this}}(jQuery);var _$q=$.jqmq({delay:-1,batch:1,callback:function(n){n()},complete:function(){}});