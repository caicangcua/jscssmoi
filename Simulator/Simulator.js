(function ($, undefined) {
    var WIDGET_NAME = "dxSimulator", 
        SIMULATOR_APPLICATION_HASH = "dxapp-hash",
		DEVICE_KEY = "dx-force-device",
        DEVICE_OBJECT_KEY = "dx-force-device-object",
        ANDROID_PANEL_HEIGHT = 41,
        DEFAULT_MONITOR_DPI = 102.69,
        DEFAULT_IPHONE_CONFIG = {
            deviceType: "phone",
            platform: "ios",
            version: [7]
        },
        DEFAULT_IPAD_CONFIG = {
            deviceType: "tablet",
            platform: "ios",
            version: [6]
        },
        DEFAULT_DESKTOP_CONFIG = {
            platform: "desktop",
            version: []
        },
        ANDROID_PHONE_CONFIG = {
            platform: "android",
            deviceType: "phone",
            version: [5]
        },
        ANDROID_TABLET_CONFIG = {
            platform: "android",
            deviceType: "tablet",
            version: [5]
        },
        WIN_PHONE_CONFIG = {
            platform: "win",
            deviceType: "phone",
            version: [10]
        };

    var Simulator = function (frame, options) {
        this._options = this.DEFAULT_OPTIONS;
        if (this._options.wrapFrame || options.wrapFrame) {
            this._wrapFrame(frame);
        }
        this.initMarkup(frame);
        this.options(options);
    };

    Simulator.prototype = {

        DEFAULT_OPTIONS: {
            device: "iPad",
            orientation: "p",
            considerDPI: false,
            wrapFrame: false,
            // none, realDevice, simple
            chrome: "realDevice",
            scale: 1,
            displayExceptions: true
        },

        devices: {
            "iPhone": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 640,
                height: 960,
                config: DEFAULT_IPHONE_CONFIG
            },
            "iPhone5": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 640,
                height: 1136,
                config: DEFAULT_IPHONE_CONFIG
            },
            "iPhone6": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 750,
                height: 1334,
                config: DEFAULT_IPHONE_CONFIG
            },
            "iPhone6plus": {
                cssPixelRatio: 2,
                ppi: 401,
                width: 1080,
                height: 1920,
                config: DEFAULT_IPHONE_CONFIG
            },
            "iPhone7": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 750,
                height: 1334,
                config: DEFAULT_IPHONE_CONFIG
            },
            "iPad": {
                cssPixelRatio: 2,
                ppi: 264,
                width: 1536,
                height: 2048,
                config: DEFAULT_IPAD_CONFIG
            },
            "iPadMini": {
                cssPixelRatio: 1,
                ppi: 163,
                width: 768,
                height: 1024,
                config: DEFAULT_IPAD_CONFIG
            },
            "androidPhone": {
                cssPixelRatio: 2,
                ppi: 316,
                width: 720,
                height: 1280,
                config: ANDROID_PHONE_CONFIG
            },
            "androidTablet": {
                cssPixelRatio: 1.5,
                ppi: 149,
                width: 800,
                height: 1280,
                config: ANDROID_TABLET_CONFIG
            },
            "nexus7": {
                cssPixelRatio: 1.325,
                ppi: 216,
                width: 800,
                height: 1280,
                config: ANDROID_PHONE_CONFIG
            },
            "nokia920": {
                cssPixelRatio: 1.666,
                ppi: 332,
                width: 768,
                height: 1280,
                config: WIN_PHONE_CONFIG
            },
            "win10Phone": {
                cssPixelRatio: 1,
                ppi: 152,
                width: 330,
                height: 568
            },
            "msSurface": {
                cssPixelRatio: 1,
                ppi: 148,
                width: 768,
                height: 1366
            },
            //Sumsung Reference Device-PQ
            "tizen": {
                cssPixelRatio: 2,
                ppi: 306,
                width: 720,
                height: 1280
            },
            "desktop": {
                cssPixelRatio: 1,
                ppi: 149,
                width: 600,
                height: 766
            },
            "desktop_1280x720": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 720,
                height: 1280,
                config: DEFAULT_DESKTOP_CONFIG
            },
            "desktop_1440x900": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 900,
                height: 1440,
                config: DEFAULT_DESKTOP_CONFIG
            },
            "desktop_1920x1080": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 1080,
                height: 1920,
                config: DEFAULT_DESKTOP_CONFIG
            },
            "genericPhone": {
            }
        },

        _calculateDeviceScale: function () {
            for (var deviceName in this.devices) {
                this.devices[deviceName].scaleFactor = 1;

                if (this._options.considerDPI) {
                    this.devices[deviceName].dpi = this.devices[deviceName].ppi / this.devices[deviceName].cssPixelRatio;
                    this.devices[deviceName].scaleFactor = DEFAULT_MONITOR_DPI / this.devices[deviceName].dpi;
                    this.devices[deviceName].widthCSS = this.devices[deviceName].width / this.devices[deviceName].cssPixelRatio;
                    this.devices[deviceName].heightCSS = this.devices[deviceName].height / this.devices[deviceName].cssPixelRatio;
                }
            }
        },

        _wrapFrame: function (frame) {
            if (!$(".dx-simulator-wrapper").length) {
                frame.wrap("<div class='dx-simulator-wrapper'/>");
            }
        },

        setScale: function (options) {
            this._calculateDeviceScale();
            var orientation = options.orientation,
                device = options.device,
                $frame = $(this.frame);

            if (options.considerDPI) {

                var width = orientation === "p" ? this.devices[device].widthCSS : this.devices[device].heightCSS,
                    height = orientation === "p" ? this.devices[device].heightCSS : this.devices[device].widthCSS;

                if (device === "androidTablet") {
                    if (orientation === "p") {
                        height = height - ANDROID_PANEL_HEIGHT;
                        width = width + ANDROID_PANEL_HEIGHT;
                    }
                }

                $frame.width(width);
                $frame.height(height);
            }

            var scale = this.getAbsoluteScale(), marginTop = parseInt($(".dx-simulator").css('margin-top'));
            if (marginTop > 0) marginTop = 0;// chi lay nho hon 0

            if ("-webkit-transform" in $(".dx-simulator")[0].style ||
                "-moz-transform" in $(".dx-simulator")[0].style ||
                "-ms-transform" in $(".dx-simulator")[0].style ||
                "-o-transform" in $(".dx-simulator")[0].style ||
                "transform" in $(".dx-simulator")[0].style) {

                $(".dx-simulator-wrapper").width($(".dx-simulator").outerWidth(true) * scale)
                                          .height(($(".dx-simulator").outerHeight(true) + marginTop )* scale);


                $(".dx-simulator").css({
                    "-webkit-transform": "scale(" + scale + ")",
                    "-moz-transform": "scale(" + scale + ")",
                    "-ms-transform": "scale(" + scale + ")",
                    "-o-transform": "scale(" + scale + ")",
                    "transform": "scale(" + scale + ")",
                    "-webkit-transform-origin": "0 0",
                    "transform-origin": "0 0",
                    "-ms-transform-origin": "0 0",
                    "-moz-transform-origin": "0 0",
                    "-o-transform-origin": "0 0"
                });
            }
            else {
                $(".dx-simulator").css("zoom", 1);
                $(".dx-simulator-wrapper").width($(".dx-simulator").outerWidth(true) * scale)
                                          .height(($(".dx-simulator").outerHeight(true) + marginTop) * scale);
                $(".dx-simulator").css("zoom", scale);
            }
        },

        initMarkup: function ($frame) {
            this.frame = $frame;
            var self = this;
            this.frame.get(0).onload = function () {
                var frameWindow = self._frameWindow();
                $(frameWindow).on("hashchange", function () {
                    if (window.sessionStorage) {
                        sessionStorage.setItem(SIMULATOR_APPLICATION_HASH, this.location.hash.slice(1));
                    }
                });
                if (self._options.displayExceptions === true) {
                    attachErrorHandler(frameWindow);
                }
                self._tryToSetIOS7Theme();
                self._linkTouchEndHandlers($frame);
            };

            this.wrapperDiv = $("<div></div>");
            this.backDiv = $("<a></a>")
                .addClass("dx-simulator-back")
                .click($.proxy(this._handleBack, this));

            var $backDivWrapper = $("<div></div>")
                .addClass("dx-simulator-back-wrapper")
                .append(this.backDiv);

            this.frame.wrap(this.wrapperDiv);
            this.wrapperDiv = this.frame.parent();

            this.wrapperDiv.append($backDivWrapper);
        },

        options: function (a, b) {
            var changes;

            if (typeof a === "string") {
                if (b === undefined)
                    return this._options[a];
                changes = {};
                changes[a] = b;
            } else {
                changes = a;
            }
            this._changeOptions(changes);
        },

        getAbsoluteScale: function (options) {
            var options = options || this._options;
            return this.devices[options.device].scaleFactor * options.scale;
        },

        _changeOptions: function (changes) {
            var prevOptions = this._options,
                newOptions = this._options = $.extend({}, prevOptions, changes);

            var urlChanged = prevOptions.url !== newOptions.url,
                deviceChanged = prevOptions.device !== newOptions.device;
            if (deviceChanged) {
                newOptions.osVersionNumber = changes.osVersionNumber;
            }
            deviceChanged |= prevOptions.osVersionNumber != newOptions.osVersionNumber;

            var framedWindow = this.frame[0].contentWindow;

            if (newOptions.url) {
                if (urlChanged) {
                    setTimeout(function () {
                        framedWindow.location = newOptions.url ;
                    });
                }
                else if (deviceChanged) {
                    framedWindow.location.reload();
                }
            }

            if (deviceChanged) {
                if (window.sessionStorage) {
                    sessionStorage.setItem("dx-device", newOptions.device);
                    sessionStorage.setItem(DEVICE_KEY, newOptions.device);
                }
                framedWindow.top[DEVICE_KEY] = newOptions.device;
                framedWindow.top[DEVICE_OBJECT_KEY] = this._getDeviceToForce(newOptions.device, newOptions.osVersionNumber);
            }
            this.wrapperDiv.attr("class", this._wrapperClasses());

            this.setScale(newOptions);
        },

        _getDeviceToForce: function (device, osVersionNumber) {
            if (this.devices[device] && this.devices[device].config) {
                return $.extend({}, this.devices[device].config, osVersionNumber ? { version: [parseInt(osVersionNumber)] } : null);
            }
            return device;
        },

        _tryToSetIOS7Theme: function () {
            var frameWindow = this._frameWindow();
            if (!frameWindow.$ || !frameWindow.DevExpress || this._frameworkVersion() >= 13.2) {
                return;
            }
            if (this._options && this._isAppleDevice(this._options.device) && this._isOsVersionNumber(7)) {
                frameWindow.$(function () {
                    $(".dx-viewport", frameWindow.document)
                        .removeClass("dx-theme-ios")
                        .addClass("dx-theme-ios7");
                });
            }
        },

        _frameworkVersion: function () {
            return this._frameWindow().DevExpress.utils.findBestMatches ? 13.2 : 0;
        },

        _isAppleDevice: function (deviceName) {
            return this.devices[deviceName] && this.devices[deviceName].config && this.devices[deviceName].config.platform == "ios";
        },

        _isOsVersionNumber: function (osVersionNumber) {
            return this._options.osVersionNumber && parseInt(this._options.osVersionNumber) === osVersionNumber;
        },

        destroy: function () {
            this.backDiv.remove();
            this.frame.unwrap();
        },
        _wrapperClasses: function () {

            var device = this.options("device").toLowerCase();

            var simpleChrome = this.options("chrome") == "simple" ? "simple-chrome" : "";
            var emptyChrome = this.options("chrome") == "none" ? "empty-chrome" : "";

            return [
                "dx-simulator",
                ["dx-simulator", device, this.options("orientation")].join("-"),
                simpleChrome,
                emptyChrome
            ].join(" ");
        },

        _handleBack: function () {
            var framedWindow = this.frame[0].contentWindow;
            framedWindow.$(framedWindow).trigger("dxback");
        },

        _frameWindow: function () {
            return this.frame.get(0).contentWindow;
        },

        _linkTouchEndHandlers: function () {
            var $frame = this.frame,
                frameWindow = this._frameWindow(),
                events = {
                    "pointerout": {
                        fireEvent: "pointerup",
                        $target: $frame,
                        needToFire: function () { return true; }
                    },
                    "touchend": {
                        fireEvent: "touchend",
                        $target: $(window.document),
                        needToFire: function () { return true; }
                    },
                    "mouseout": {
                        fireEvent: "mouseup",
                        $target: $frame,
                        needToFire: function (event) { return event.which === 1; }
                    }
                };
            $.each(events, function (handleEventType, handleEvent) {
                handleEvent.$target.off(handleEventType).on(handleEventType, function (event) {http://imedia.imuzik.com.vn/media2/images/landing/a9/b6/6a/5c0f6ac5633d8.jpg
                    if (frameWindow.$ && handleEvent.needToFire(event)) {
                        frameWindow.$(frameWindow.document).trigger(
                            createFrameEvent(frameWindow, $frame, event, handleEvent.fireEvent)
                        );
                    }
                });
            });
        }

    };

    $.fn.dxSimulator = function (options) {
        var returnValue = this;

        this.each(function () {
            if (this.tagName !== "IFRAME")
                throw Error();

            var $frame = $(this),
                instance = $frame.data(WIDGET_NAME);

            if (!instance) {
                instance = new Simulator($frame, options);
                $frame.data(WIDGET_NAME, instance);
            } else {
                instance.options(options);
            }

            if (options.returnInstance)
                returnValue = instance;
        });

        return returnValue;
    };

    function createFrameEvent(frameWindow, $frame, sourceEvent, newEventType) {
        var event = frameWindow.$.Event(sourceEvent),
            originalEvent = event.originalEvent;

        if (typeof frameWindow.$.event.props != 'undefined') {
            var propNames = frameWindow.$.event.props.slice();
            $.merge(propNames, frameWindow.$.event.mouseHooks.props);
            $.each(propNames, function () {
                event[this] = originalEvent[this];
            });
        }
        var frameOffsets = $frame.offset(),
            framedX = fitCoordinateToLimits(originalEvent.clientX, frameOffsets.left, $frame.width()),
            framedY = fitCoordinateToLimits(originalEvent.clientY, frameOffsets.top, $frame.height());
        $.each(['client', 'page', 'offset', 'screen'], function () {
            event[this + 'X'] = framedX;
            event[this + 'Y'] = framedY;
        });

        return frameWindow.$.extend(event, {
            srcElement: frameWindow.document,
            currentTarget: frameWindow.document,
            target: frameWindow.document,
            view: frameWindow,
            type: newEventType
        });
    }

    function fitCoordinateToLimits(coordinate, startValue, length) {
        if (coordinate < startValue) {
            return 0;
        }
        var fitedValue = coordinate - startValue;
        return fitedValue > length ? length : fitedValue;
    }

    function attachErrorHandler(frameWindow) {
        var window_onerror = frameWindow.onerror;
        frameWindow.onerror = function (message, url, line) {
            try {
                var encodedMessage = $('<div/>').text(message).html();
                $(frameWindow.document.body).append(
                    "<div style='z-index: 2000; top:100px; left: 0; \
                                position: fixed; display: block;\
                                width: 100%; overflow: auto;'>\
                        <div style='background: red; text-align: left; color: white;\
                                white-space: pre-wrap; \
                                border-radius: 5px;\
                                margin: 0 10px; padding: 10px;\
                                -webkit-user-select: text;\
                                -moz-user-select: text;\
                                -ms-user-select: text;\
                                -o-user-select: text;\
                                user-select: text;\
                                word-break: normal; white-space: pre-wrap'>" +
                            "Error: '" + encodedMessage + "', line " + line + ", file '" + url + "'." +
                        "</div>\
                    </div>");
            } catch (e) { }

            if (window_onerror) {
                try {
                    return window_onerror(message, url, line);
                } catch (e) { }
            }
            return true;
        };
    }

})(jQuery);




//<script type="text/javascript">
var SIMULATOR_APPLICATION_HASH = 'dxapp-hash';

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        window.location.href = "#";
    }
}

function virtualKeyboard(act) {
    $('#simulatorFrame')[act]('virtualkeyboard');
}

$(function () {
    var DEVICE_KEY = "dx-simulator-device-name",
        OS_VERSION_NUMBER_KEY = "dx-simulator-os-version-number",
        ANDROID_VERSION_NUMBER_KEY = "dx-simulator-android-version-number",
        ORIENTATION_KEY = "dx-simulator-orientation",
        SIZE_KEY = "dx-simulator-size",
        defaultDevice = "iPhone",
        defaultOrientation = "p",
        defaultVersionNumber = "7",
        defaultAndroidVersionNumber = "5",
        $androidVersionChooser = $('.android-version-chooser'),
    $osVersionChooser = $('.os-version-chooser'),
    $sidebar = $(".sidebar"),
    $main = $(".main");

    // use cookies?
    var fromStorage = function (key, defaultValue) {
        var value = window.sessionStorage && sessionStorage.getItem(key);
        if (value === null)
            return defaultValue;
        return value;
    };

    var toStorage = function (key, value) {
        if (window.sessionStorage)
            sessionStorage.setItem(key, value);
    };

    var persistOptions = function () {
        toStorage(DEVICE_KEY, simulator.options("device"));
        if (isAppleDevice(simulator.options("device"))) {
            toStorage(OS_VERSION_NUMBER_KEY, simulator.options("osVersionNumber"));
        }
        if (isAndroidDevice(simulator.options("device"))) {
            toStorage(ANDROID_VERSION_NUMBER_KEY, simulator.options("osVersionNumber"));
        }
        toStorage(ORIENTATION_KEY, simulator.options("orientation"));
        toStorage(SIZE_KEY, simulator.options("scale"));
        //
        $(window).trigger('resize');
    };

    var getSizeByDevice = function (device) {
        return fromStorage(SIZE_KEY, (device === "iPhone" || device === "androidPhone" || device === "win10Phone" || device === "iPhone5" || device === "iPhone6" || device === "iPhone6plus" || device === "iPhone7") ? 1 : 0.5);
    };

    var getOsVersionNumberByDevice = function (device) {
        return isAppleDevice(device) ? fromStorage(OS_VERSION_NUMBER_KEY, defaultVersionNumber) : undefined;
    };

    var getAndroidVersionNumberByDevice = function (device) {
        return isAndroidDevice(device) ? fromStorage(ANDROID_VERSION_NUMBER_KEY, defaultAndroidVersionNumber) : undefined;
    };

    var isAppleDevice = function (device) {
        return device === "iPhone" || device === "iPhone5" || device === "iPhone6" || device === "iPhone6plus" || device === "iPhone7" || device === "iPad" || device === "iPadMini";
    };

    var isAndroidDevice = function (device) {
        return device === "androidPhone" || device === "androidTablet" || device === "nexus7";
    };

    var queryStringToObject = function (queryString) {
        queryString = "appPage=/index.aspx&device=androidPhone&orientation=p&displayExceptions=true&trialMessage="
        var result = {};

        if (queryString.charAt(0) === "?")
            queryString = queryString.substring(1);

        var chunks = queryString.split("&");

        $.each(chunks, function () {
            var keyValue = this.split("="),
                key = decodeURIComponent(keyValue[0]),
                value = decodeURIComponent(keyValue[1]);
            result[key] = value;
        });

        return result;
    };

    var query = queryStringToObject(window.location.search),
        appPage =  query["appPage"] || "app.html",
        device = fromStorage(DEVICE_KEY, query["device"] || defaultDevice);

    var _url = window.location.pathname.split('/');
    var newqry = (_url.length > 1) ? '/' + _url [1]: '';

    simulator = $("#simulatorFrame").dxSimulator({
        returnInstance: true,
        url:  appPage + newqry + "#" + fromStorage(SIMULATOR_APPLICATION_HASH, ""),
        device: device,
        osVersionNumber: getOsVersionNumberByDevice(device),
        orientation: fromStorage(ORIENTATION_KEY, query["orientation"] || defaultOrientation),
        scale: getSizeByDevice(device),
        wrapFrame: true,
        displayExceptions: query["displayExceptions"] !== "false"
    });

    var $dx_simulator = $('.dx-simulator'), $dx_simulator_wrapper = $dx_simulator.parent();

    // trial
    var $trial = $(".trial-panel");
    if (query["trialMessage"] != "")
        $trial.show().find("span").text("Your DevExtreme trial period has expired.");

    // device chooser
    var deviceChooser = $('.device-chooser'),
        setDevice = function (device) {
            simulator.options({
                "device": device,
                "osVersionNumber": isAppleDevice(device) ? getOsVersionNumberByDevice(device) : getAndroidVersionNumberByDevice(device)
            });
            $(".toolbar").toggleClass("ios", isAppleDevice(device));
            $(".toolbar").toggleClass("android", isAndroidDevice(device));
            activateElement(deviceChooser, 'data-device', device);
            activateElement($osVersionChooser, 'data-version', getOsVersionNumberByDevice(device));
            activateElement($androidVersionChooser, 'data-version', getAndroidVersionNumberByDevice(device));
            setSize(getSizeByDevice(device));
        };

    var deviceChooserHandler = function ($item) {
        var attr = $item.attr("data-device");
        if (attr !== undefined && attr !== false) {
            setDevice(attr);
            persistOptions();
            changeParentMenuOptions($item);
            return false;
        }
    };

    deviceChooser.on('click', 'a', function () {
        return deviceChooserHandler($(this));
    });

    var changeParentMenuOptions = function ($item) {
        $item.closest("ul.sub-menu").parent().children("a").first().attr("data-device", $item.attr("data-device"));
    }

    var timeoutCounter = 0;
    var mouseleave;
    deviceChooser.on('mouseenter', 'li', function () {
        mouseleave = false;
        timeoutCounter++;;
        window['_this'] = this;
        window.setTimeout(function () {
            timeoutCounter--;
            if (timeoutCounter == 0 && !mouseleave) {
                $(window['_this']).parent().find(".sub-menu").css("display", "none");
                $(window['_this']).parent().find("a").removeClass('selected');

                $(window['_this']).find(".sub-menu").css({ "display": "block", "color": "black" });
                $(window['_this']).find(".sub-menu").prev().addClass('selected');
            }
        }, 300);
    });
    deviceChooser.on('mouseleave', '', function () {
        mouseleave = true;
        $(this).find(".sub-menu").css({ "display": "none" });
        $(this).find("a").removeClass('selected');
    });
    deviceChooser.on('click', '.sub-menu li a', function () {
        return deviceChooserHandler($(this));
    });

    // orientation chooser
    var orientationChooser = $('.orientation-chooser'),
        setOrientation = function (orientation) {
            simulator.options("orientation", orientation);
            activateElement(orientationChooser, 'data-orientation', orientation);
        };
    orientationChooser.on('click', 'a', function () {
        setOrientation($(this).attr("data-orientation"));
        persistOptions();
        return false;
    });

    // size chooser
    var $sizeChooser = $('.size-chooser'),
        setSize = function (scale) {
            simulator.options("scale", scale);
            activateElement($sizeChooser, 'data-scale', scale);
        };
    $sizeChooser.on('click', 'a', function () {
        setSize($(this).attr("data-scale"));
        persistOptions();
        return false;
    });

    var setOsVersion = function (osVersionNumber) {
        simulator.options("osVersionNumber", osVersionNumber);
        activateElement($osVersionChooser, 'data-version', osVersionNumber);
    }

    var setAndroidVersion = function (osVersionNumber) {
        simulator.options("osVersionNumber", osVersionNumber);
        activateElement($androidVersionChooser, 'data-version', osVersionNumber);
    }

    $osVersionChooser.on('click', 'a', function () {
        setOsVersion($(this).attr("data-version"));
        persistOptions();
        return false;
    });

    $androidVersionChooser.on('click', 'a', function () {
        setAndroidVersion($(this).attr("data-version"));
        persistOptions();
        return false;
    });

    var activateElement = function ($chooser, dataAttrName, value) {
        $chooser.find('a').each(function () {
            $(this).toggleClass('active', false);
            //$(this).toggleClass('active', $(this).attr(dataAttrName) == value);
            if ($(this).attr(dataAttrName) == value) {
                $(this).toggleClass('active', true);
                var parent = $(this).parents("ul.sub-menu");
                parent.prev().toggleClass('active', true);
            }
        });
    }

    setDevice(simulator.options("device"));
    setOrientation(simulator.options("orientation"));
    persistOptions();

    $("#simulatorFrame").on("load", function () {
        //var proxyUrl = queryStringToObject(window.location.search)["proxyUrl"] || this.contentWindow.location;
        //$("#qr-small").attr("src", "https://chart.googleapis.com/chart?chs=141x141&cht=qr&chl=" + encodeURIComponent(proxyUrl));
        //$("#qr").attr("src", "https://chart.googleapis.com/chart?chs=512x512&cht=qr&chl=" + encodeURIComponent(proxyUrl));
        //$("#qr-link").attr("href", proxyUrl);
        //$("#proxy-link").attr("href", proxyUrl);
    });


    $(window).on("resize", function () {
        fuckResize();
    });

    var resizeTimeout;
    function doFuckResize() {
        var windowWidth = $(window).width(), windowHeight = $(window).height(),
        $wrapRect = $dx_simulator[0].getBoundingClientRect(),
        wrapW = $wrapRect.width,
        mainL = parseInt($main.css('left'));

        if (windowWidth > (mainL + wrapW)) {
            var $mainW = (windowWidth - mainL);
            if ($mainW < wrapW) {
                $main.css('width', (wrapW + mainL) + 'px');
            } else {
                $main.css('width', $mainW + 'px');
            }
        } else {
            $main.css('width', (wrapW + mainL) + 'px');
        }

        //center dx-simulator-wrapper
        var $simulator_wrapper = $dx_simulator_wrapper[0].getBoundingClientRect(),marginTop=0;
        if ($simulator_wrapper.height < windowHeight) {
            marginTop=(windowHeight-$simulator_wrapper.height)/2;
        }
        $dx_simulator_wrapper.css('margin-top', marginTop + 'px');
    }

    function fuckResize() {
        //var sidebarHeight = $sidebar.height(),
        //mainHeight = $main.outerHeight(false),
        //windowWidth = $(window).width(),
        //scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;


        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            doFuckResize();
        }, 200);





        //if (($mainW + $mainL )> windowWidth) {
        //    $main.removeClass('hidescroll');
        //} else {
        //    $main.addClass('hidescroll');
        //}
        //if (sidebarHeight > mainHeight) {
        //    $sidebar.css({ 'position': 'absolute' });

        //    mainHeight = $main.outerHeight(true) - parseInt($main.css('margin-top'));
        //    var marginTop = (mainHeight < windowHeight) ? scrollTop : 0;
        //    if (marginTop + mainHeight > sidebarHeight)
        //        marginTop = sidebarHeight - mainHeight;
        //    $main.css({ 'margin-top': marginTop });
        //}
        //else {
        //    $main.css({ 'margin-top': 0 });

        //    if (sidebarHeight <= windowHeight + scrollTop) {
        //        $sidebar.css({
        //            'position': 'fixed',
        //            'top': windowHeight - sidebarHeight
        //        });
        //    } else {
        //        $sidebar.css({
        //            'position': 'absolute',
        //            'top': 0
        //        });
        //    }
        //}
    }


    $(document).ready(function () {
        $('.menu-link').bigSlide({
            saveState: true
            ,state: 'open'
            ,afterOpen: function () {
                //$('.main').css('width', 'calc(100% - 150px)');
                setTimeout(function () {
                    fuckResize();
                }, 300);// tru thoi gian annimate  
            }
            , afterClose: function () {
                //$('.main').css('width', 'auto');
                setTimeout(function () {
                    fuckResize();
                }, 300);// tru thoi gian annimate  
            }
        });
        $('.toolbar').fadeIn();
        fuckResize();
    });



});
//</script>