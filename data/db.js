function __MyHandler() {
    return window.MyHandler.paramChannel('apiURI', "uri:'" + new DevExpress.EndpointSelector(ComApp.config.endpoints).urlFor('srcv') + "',agent:'" + navigator.userAgent + "',userstate:'" +
        localDB.exe('get', 'userstate', null, 0) + "',viewui:'" + localDB.exe('get', 'viewui', null, 0) + "',locate:'" + localDB.exe('get', 'Globalize', null, 0) + "',tmpver:'" + localDB.exe('get', 'tmpver', null, 0) + "'");
}
"use strict";
(function () {
    function countTimeStamp(url) {
        var s1 = '_' + gbM('cachever_' + url.split('?')[0].split('/').pop());
        if (_lechtime == 0) {
            return Date.now() + s1;
        } else {
            var dt = new Date();
            dt.setMinutes(dt.getMinutes() + _lechtime);
            return dt.getTime() + s1;
        }
    }
    if (window.MyHandler) { hwndDevice = __MyHandler(); console.log(hwndDevice); };
    var endpointSelector = new DevExpress.EndpointSelector(ComApp.config.endpoints);
    function serviceConfig(key) {
        return $.extend(true, {}, ComApp.config.services[key], {
            beforeSend: function (request) {
                request.timeout = 10000;
                request.params.timestamp = timestamp + "|" + appstate + "|" + hwndDevice + "|" + CacheVersion + "|" + _$locate + "|" + _$tmpver + "|" + _$userstate + "|" + countTimeStamp(request.url);
                if (LogDB.length > 0) {
                    request.headers.jslog = JSON.stringify(LogDB.items);
                    LogDB.clear();
                }
                //request.headers.Token = "zluMERc%5b%5el%5ewpm3G1t7%2fEz4QqKk%2bSDdMnkFfnJ5i8ucBfh07tScdzhzy7FMZuCx3g%60jZ%5cZ%2bTL3N";
            },
            url: endpointSelector.urlFor(key),
            jsonp: false,// !window.WinJS,
            withCredentials: true,

            errorHandler: function (error) {
                console.log("Data service error: " + error.message + " " + (error.stacktrace || ""));
            }
        });
    }

    ComApp.log = new DevExpress.data.ODataContext(serviceConfig('log'));
    ComApp.srcv = new DevExpress.data.ODataContext(serviceConfig('srcv'));
    ComApp.db = new DevExpress.data.ODataContext(serviceConfig('db'));
    ComApp.db.getImage = function (relativeUrl) {
        return endpointSelector.urlFor("storage") + relativeUrl;
    };

    // Initialize session connection to service
    //ComApp.db.invoke("StartSession");
    extendApiDB = serviceConfig;
}());

