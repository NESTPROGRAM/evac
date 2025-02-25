(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Marzipano = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = require("./gl-matrix/common.js");
exports.mat2 = require("./gl-matrix/mat2.js");
exports.mat2d = require("./gl-matrix/mat2d.js");
exports.mat3 = require("./gl-matrix/mat3.js");
exports.mat4 = require("./gl-matrix/mat4.js");
exports.quat = require("./gl-matrix/quat.js");
exports.vec2 = require("./gl-matrix/vec2.js");
exports.vec3 = require("./gl-matrix/vec3.js");
exports.vec4 = require("./gl-matrix/vec4.js");
},{"./gl-matrix/common.js":3,"./gl-matrix/mat2.js":4,"./gl-matrix/mat2d.js":5,"./gl-matrix/mat3.js":6,"./gl-matrix/mat4.js":7,"./gl-matrix/quat.js":8,"./gl-matrix/vec2.js":9,"./gl-matrix/vec3.js":10,"./gl-matrix/vec4.js":11}],3:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    glMatrix.ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function(a, b) {
	return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

module.exports = glMatrix;

},{}],4:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
mat2.fromValues = function(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
mat2.set = function(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
mat2.sub = mat2.subtract;

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
mat2.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

module.exports = mat2;

},{"./common.js":3}],5:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
mat2d.fromValues = function(a, b, c, d, tx, ty) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
mat2d.set = function(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
};

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
mat2d.sub = mat2d.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
mat2d.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
};

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
};

module.exports = mat2d;

},{"./common.js":3}],6:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
};

/*
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
};


module.exports = mat3;

},{"./common.js":3}],7:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
  scalar: {},
  SIMD: {},
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function(out, a) {
    var a0, a1, a2, a3,
        tmp01, tmp23,
        out0, out1, out2, out3;

    a0 = SIMD.Float32x4.loadAsync(a, 0);
    a1 = SIMD.Float32x4.loadAsync(a, 4);
    a2 = SIMD.Float32x4.loadAsync(a, 8);
    a3 = SIMD.Float32x4.loadAsync(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0,  out0);
    SIMD.Float32x4.store(out, 4,  out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8,  out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function(out, a) {
  var row0, row1, row2, row3,
      tmp1,
      minor0, minor1, minor2, minor3,
      det,
      a0 = SIMD.Float32x4.loadAsync(a, 0),
      a1 = SIMD.Float32x4.loadAsync(a, 4),
      a2 = SIMD.Float32x4.loadAsync(a, 8),
      a3 = SIMD.Float32x4.loadAsync(a, 12);

  // Compute matrix adjugate
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  // Compute matrix determinant
  det   = SIMD.Float32x4.mul(row0, minor0);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
  det   = SIMD.Float32x4.sub(
               SIMD.Float32x4.add(tmp1, tmp1),
               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
  if (!det) {
      return null;
  }

  // Compute matrix inverse
  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
  return out;
}

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function(out, a) {
  var a0, a1, a2, a3;
  var row0, row1, row2, row3;
  var tmp1;
  var minor0, minor1, minor2, minor3;

  var a0 = SIMD.Float32x4.loadAsync(a, 0);
  var a1 = SIMD.Float32x4.loadAsync(a, 4);
  var a2 = SIMD.Float32x4.loadAsync(a, 8);
  var a3 = SIMD.Float32x4.loadAsync(a, 12);

  // Transpose the source matrix.  Sort of.  Not a true transpose operation
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  SIMD.Float32x4.store(out, 0,  minor0);
  SIMD.Float32x4.store(out, 4,  minor1);
  SIMD.Float32x4.store(out, 8,  minor2);
  SIMD.Float32x4.store(out, 12, minor3);
  return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.loadAsync(a, 0);
    var a1 = SIMD.Float32x4.loadAsync(a, 4);
    var a2 = SIMD.Float32x4.loadAsync(a, 8);
    var a3 = SIMD.Float32x4.loadAsync(a, 12);

    var b0 = SIMD.Float32x4.loadAsync(b, 0);
    var out0 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.loadAsync(b, 4);
    var out1 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.loadAsync(b, 8);
    var out2 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.loadAsync(b, 12);
    var out3 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                        SIMD.Float32x4.add(
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.loadAsync(a, 0),
        a1 = SIMD.Float32x4.loadAsync(a, 4),
        a2 = SIMD.Float32x4.loadAsync(a, 8),
        a3 = SIMD.Float32x4.loadAsync(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

    if (a !== out) {
        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function(out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.loadAsync(a, 0);
    SIMD.Float32x4.store(
        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.loadAsync(a, 4);
    SIMD.Float32x4.store(
        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.loadAsync(a, 8);
    SIMD.Float32x4.store(
        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.loadAsync(a, 4);
    var a_2 = SIMD.Float32x4.loadAsync(a, 8);
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.loadAsync(a, 0);
    var a_2 = SIMD.Float32x4.loadAsync(a, 8);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.loadAsync(a, 0);
    var a_1 = SIMD.Float32x4.loadAsync(a, 4);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) { 
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S; 
    out[2] = (mat[1] - mat[4]) / S; 
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S; 
    out[2] = (mat[8] + mat[2]) / S; 
  } else if (mat[5] > mat[10]) { 
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S; 
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S; 
  } else { 
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
};



module.exports = mat4;

},{"./common.js":3}],8:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");
var mat3 = require("./mat3.js");
var vec3 = require("./vec3.js");
var vec4 = require("./vec4.js");

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

module.exports = quat;

},{"./common.js":3,"./mat3.js":6,"./vec3.js":10,"./vec4.js":11}],9:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

module.exports = vec2;

},{"./common.js":3}],10:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
};

module.exports = vec3;

},{"./common.js":3}],11:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

module.exports = vec4;

},{"./common.js":3}],12:[function(require,module,exports){
/*! Hammer.JS - v2.0.4 - 2015-01-30
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2015 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge]
 * @returns {Object} dest
 */
function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
function merge(dest, src) {
    return extend(dest, src, true);
}

/**
 * Basic Object.create polyfill (for IE8 support)
 *
 * This does not support the second argument to Object.create (property descriptor).
 *
 * Uses native Object.create if available, otherwise provides a basic polyfill.
 *
 * @param {Object} proto - the prototype to use for the new Object
 * @return {Object} - the new object
 */
function objectCreate(proto) {
    if (Object.create) {
        return Object.create(proto);
    }
    var Obj = function() {};
    Obj.prototype = proto;
    var result = new Obj();
    Obj.prototype = null;
    return result;
}

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = objectCreate(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        extend(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        this.evDoc && addEventListeners(document, this.evDoc, this.domHandler);
        this.evBody && addEventListeners(document.body, this.evBody, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        this.evDoc && removeEventListeners(document, this.evDoc, this.domHandler);
        this.evBody && removeEventListeners(document.body, this.evBody, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = last.deltaX - input.deltaX;
        var deltaY = last.deltaY - input.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

var isIE8 = window.navigator.userAgent.indexOf('MSIE 8') > 0;

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;

    if (isIE8) {
        // mousemove and moveup don't bubble to the window in IE8 - attach events to the document.body instead
        this.evDoc = MOUSE_WINDOW_EVENTS;
    } else {
        this.evWin = MOUSE_WINDOW_EVENTS;
    }

    this.allow = true; // used by Input.TouchMouse to disable mouse events
    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // IE8 uses non-standard button indices:
        // http://msdn.microsoft.com/en-us/library/ie/ms533544(v=vs.85).aspx
        // left button is 1
        //
        // Standard is here:
        // http://msdn.microsoft.com/en-us/library/ie/ff974877(v=vs.85).aspx
        // left button is 0
        var leftMouseButton = 0;
        if (isIE8) {
            leftMouseButton = 1;
        }

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === leftMouseButton) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.button !== leftMouseButton) {
            eventType = INPUT_END;
        }

        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
        if (!this.pressed || !this.allow) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */
function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        // when we're in a touch event, so  block all upcoming mouse events
        // most mobile browser also emit mouseevents, right after touchstart
        if (isTouch) {
            this.mouse.allow = false;
        } else if (isMouse && !this.mouse.allow) {
            return;
        }

        // reset the allowMouse when we're done
        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
            this.mouse.allow = true;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        // not needed with native support for the touchAction property
        if (NATIVE_TOUCH_ACTION) {
            return;
        }

        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // pan-x and pan-y can be combined
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.id = uniqueId();

    this.manager = null;
    this.options = merge(options || {}, this.defaults);

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        extend(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(withState) {
            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(true);
        }

        emit(); // simple 'eventName' events

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(true);
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = extend({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {
        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        this._super.emit.call(this, input);
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            this.manager.emit(this.options.event + inOut, input);
        }
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 500, // minimal time of the pointer to be pressed
        threshold: 5 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.65,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.velocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.velocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.velocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.direction &&
            input.distance > this.options.threshold &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.direction);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 2, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create an manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.4';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    options = options || {};

    this.options = merge(options, Hammer.defaults);
    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        extend(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        var recognizers = this.recognizers;
        recognizer = this.get(recognizer);
        recognizers.splice(inArray(recognizers, recognizer), 1);

        this.touchAction.update();
        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    each(manager.options.cssProps, function(value, name) {
        element.style[prefixed(element.style, name)] = add ? value : '';
    });
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

extend(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

if (typeof define == TYPE_FUNCTION && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');

},{}],13:[function(require,module,exports){
'use strict';

/**
 * @class
 * @classdesc Minimalistic event emitter
 */
function EventEmitter() {}

/**
 * @param {String} event
 * @param {Function} fn Handler function
 */
EventEmitter.prototype.addEventListener = function(event, fn) {
  var eventMap = this.__events = this.__events || {};
  var handlerList = eventMap[event] = eventMap[event] || [];
  handlerList.push(fn);
};

/**
 * @param {String} event
 * @param {Function} fn Handler function
 */
EventEmitter.prototype.removeEventListener = function(event, fn) {
  var eventMap = this.__events = this.__events || {};
  var handlerList = eventMap[event];
  if (handlerList) {
    var index = handlerList.indexOf(fn);
    if (index >= 0) {
      handlerList.splice(index, 1);
    }
  }
};

/**
 * Emit an event
 */
EventEmitter.prototype.emit = function() {
  var eventMap = this.__events = this.__events || {};
  var event = arguments[0];
  var handlerList = eventMap[event];
  if (handlerList) {
    for (var i = 0; i < handlerList.length; i++) {
      var fn = handlerList[i];
      fn.apply(this, arguments);
    }
  }
};

/**
 * Mixes in {@link EventEmitter} into a constructor function
 */
function eventEmitter(ctor) {
  for (var prop in EventEmitter.prototype) {
    if (EventEmitter.prototype.hasOwnProperty(prop)) {
      ctor.prototype[prop] = EventEmitter.prototype[prop];
    }
  }
}

module.exports = eventEmitter;

},{}],14:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var Set = require('./collections/Set');


// Creates a new GraphFinder given an node equality and hash function
// for the graph nodes.
function GraphFinder(equals, hash) {
  this._equals = equals;
  this._hash = hash;

  // The queue of nodes to be explored.
  this._queue = [];

  // The set of nodes already explored.
  this._visited = new Set(equals, hash);

  // Functions to be set by start().
  this._neighborsFun = null;
  this._exploreFun = null;
}


// Start a breadth-first search beginning at firstNode.
// neighborsFun(node) returns a list of neighbors for a node.
// continueFun(node) returns whether a node should be explored.
GraphFinder.prototype.start = function(firstNode, neighborsFun, exploreFun) {

  // Throw if there's a search already in progress.
  if (this._neighborsFun || this._exploreFun) {
    throw new Error('GraphFinder: search already in progress');
  }

  // Reset search state.
  this.reset();

  // Store the functions for use in next().
  this._neighborsFun = neighborsFun;
  this._exploreFun = exploreFun;

  // Push first node into the queue.
  this._queue.push(firstNode);

};


// Reset search state, aborting any search already in progress.
GraphFinder.prototype.reset = function() {
  this._neighborsFun = null;
  this._exploreFun = null;
  this._queue.length = 0;
  this._visited.clear();
};


// Return the next node for the current search, or null if no more nodes.
GraphFinder.prototype.next = function() {

  var queue = this._queue;
  var visited = this._visited;
  var neighborsFun = this._neighborsFun;
  var exploreFun = this._exploreFun;

  // Throw if no search is in progress.
  if (!neighborsFun || !exploreFun) {
    throw new Error('GraphFinder: no search in progress');
  }

  // Explore nodes until there are none left to explore.
  while (queue.length > 0) {

    // Get next node from queue.
    var node = this._queue.shift();

    // Skip already visited nodes.
    if (visited.has(node)) {
      continue;
    }

    // Skip nodes that should not be explored.
    if (!exploreFun(node)) {
      continue;
    }

    // Mark node as visited.
    visited.add(node);

    // Add the neighbors of the node into the queue.
    var neighbors = neighborsFun(node);
    for (var i = 0; i < neighbors.length; i++) {
      queue.push(neighbors[i]);
    }

    // Return the node.
    return node;
  }

  // Nothing left to explore.
  // Reset search state and signal end of search.
  this.reset();
  return null;
};


module.exports = GraphFinder;

},{"./collections/Set":33}],15:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var cssSupported = require('./support/Css');
var positionAbsolutely = require('./positionAbsolutely');
var setTransform = require('./util/dom').setTransform;

/**
 * Use {@link HotspotContainer#createHotspot} instead of this constructor
 * @class
 * @classdesc HTML object positioned at certain coordinates
 * @param {Element} domElement Element that will be positioned

  Positioning will be done using CSS Transforms when available and with the
  `top` and `left` properties when not.

  The `top` and `left` properties always position the top left corner of an
  element. Therefore, the content of `domElement` must be centered around
  its top left corner.

 * @param {Element} parentDomElement Usually the DOM element of a {@link HotspotContainer}
 * @param {View} view
 * @param {Object} params
 * @param {Object} opts
 * @param {Object} opts.perspective

 * @param {Number} [opts.perspective.radius=null] Transform hotspot as if it were on
 the surface of a sphere. The hotspot will then always cover the same part of the
 360° image.

 This feature will only work on browsers with CSS 3D Transforms.

 When `radius` is enabled the hotspots are automatically centered.

 This value represents the radius of the sphere where the hotspot is. Therefore,
 the smaller this value, the larger the hotspot will appear on the screen.

 * @param {String} opts.perspective.extraRotations This value will be added to the
 `transform` CSS rule that places the hotspot in its position.

 This enables transforming the hotspot to overlay a certain surface on the panorama.
 For instance, one possible value would be `rotateX(0.5rad) rotateY(-0.1rad)`.
*/
function Hotspot(domElement, parentDomElement, view, params, opts) {

  opts = opts || {};
  opts.perspective = opts.perspective || {};
  opts.perspective.extraRotations = opts.perspective.extraRotations != null ? opts.perspective.extraRotations : "";

  if (opts.perspective.radius && !cssSupported()) {
    throw new Error('Hotspot cannot not be embedded in sphere for lack of browser support');
  }

  this._domElement = domElement;
  this._parentDomElement = parentDomElement;
  this._view = view;
  this._params = {};
  this._perspective = {};

  this.setPosition(params);

  // Add hotspot into the DOM.
  this._parentDomElement.appendChild(this._domElement);

  this.setPerspective(opts.perspective);

  // Whether the hotspot is visible.
  // The hotspot may still be hidden if it's inside a hidden HotspotContainer.
  this._visible = true;

  // The current calculated screen position.
  this._position = { x: 0, y: 0 };
}

eventEmitter(Hotspot);


// Call hotspotContainer.destroyHotspot() instead of this.
Hotspot.prototype._destroy = function() {
  this._parentDomElement.removeChild(this._domElement);

  this._domElement = null;
  this._parentDomElement = null;
  this._params = null;
  this._view = null;

  this._position = null;
  this._visible = false;
};


/**
 * @return {Element}
 */
Hotspot.prototype.domElement = function() {
  return this._domElement;
};

/**
 * @return {Object} Position params
 */
Hotspot.prototype.position = function() {
  return this._params;
};

/**
 *  @param {Object} params Position params
 */
Hotspot.prototype.setPosition = function(params) {
  for(var key in params) {
    this._params[key] = params[key];
  }
  this._update();
  // TODO: We should probably emit a hotspotsChange event on the parent
  // HotspotContainer. What's the best way to do so?
};

/**
 * @return {Object} Perspective
 */
Hotspot.prototype.perspective = function() {
  return this._perspective;
};

/**
 *  @param {Object} params Perspective params
 */
Hotspot.prototype.setPerspective = function(perspective) {
  for(var key in perspective) {
    this._perspective[key] = perspective[key];
  }
  this._update();
};


/**
 * Show the hotspot
 */
Hotspot.prototype.show = function() {
  if (!this._visible) {
    this._visible = true;
    this._update();
  }
};


/**
 * Hide the hotspot
 */
Hotspot.prototype.hide = function() {
  if (this._visible) {
    this._visible = false;
    this._update();
  }
};


Hotspot.prototype._update = function() {
  var element = this._domElement;

  var params = this._params;
  var position = this._position;
  var x, y;

  var isVisible = false;

  if (this._visible) {
    var view = this._view;

    if (this._perspective.radius) {
      // Hotspots which are embedded in the sphere should always be displayed. Even
      // if they are behind the camera they can still be visible (e.g. a face-sized hotspot at yaw=91º)
      isVisible = true;
      this._setEmbeddedPosition(view, params);
    }
    else {
      // Regular hotspots need only be displayed if they are not behind the camera
      view.coordinatesToScreen(params, position);
      x = position.x;
      y = position.y;

      if (x != null && y != null) {
        isVisible = true;
        this._setPosition(x, y);
      }
    }
  }

  // Show if visible, hide if not.
  if (isVisible) {
    element.style.display = 'block';
    element.style.position = 'absolute';
  }
  else {
    element.style.display = 'none';
    element.style.position = '';
  }

};


Hotspot.prototype._setEmbeddedPosition = function(view, params) {
  var transform = view.coordinatesToPerspectiveTransform(params, this._perspective.radius, this._perspective.extraRotations);
  setTransform(this._domElement, transform);
};


Hotspot.prototype._setPosition = function(x, y) {
  positionAbsolutely(this._domElement, x, y);
};


module.exports = Hotspot;

},{"./positionAbsolutely":58,"./support/Css":80,"./util/dom":97,"minimal-event-emitter":13}],16:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var Hotspot = require('./Hotspot');
var calcRect = require('./calcRect');
var positionAbsolutely = require('./positionAbsolutely');
var cssPointerEventsSupported = require('./support/cssPointerEvents');
var setAbsolute = require('./util/dom').setAbsolute;
var setOverflowHidden = require('./util/dom').setOverflowHidden;
var setOverflowVisible = require('./util/dom').setOverflowVisible;
var setNullSize = require('./util/dom').setNullSize;
var setPixelSize = require('./util/dom').setPixelSize;
var setPointerEvents = require('./util/dom').setWithVendorPrefix('pointer-events');

/**
 * Signals that a hotspot has been created or destroyed on the container.
 * @event HotspotContainer#hotspotsChange
 */

/**
  * @class
  * @classdesc Creates a DOM element to hold {@link Hotspots} and updates their
  * position when necessary.
  *
  * @param {Element} parentDomElement DOM element inside which the
  * container is created
  * @param {Stage} stage Used to calculate the size and position of the container.
  *
  * Usually hotspots are associated to a {@link Layer}. That layer's stage
  * should be passed in here.
  *
  * @param {View} view View with which Hotspots are positioned
  *
  * @param {RenderLoop} renderLoop HotspotContainer and Hotspots will be
  * updated when this renderLoop renders.
  *
  * @param {Object} opts
  * @param {Rect} opts.rect Area that the container occupies. This is similar
  * to {@link Effects#rect} and relative to stage's size.
  */
function HotspotContainer(parentDomElement, stage, view, renderLoop, opts) {
  opts = opts || {};

  this._parentDomElement = parentDomElement;
  this._stage = stage;
  this._view = view;
  this._renderLoop = renderLoop;

  this._rect = opts.rect;

  // Wrapper around this._hotspotContainer. The wrapper may have a size
  // and `pointer-events: none` so that hotspots are hidden with `rect`.
  this._hotspotContainerWrapper = document.createElement('div');
  setAbsolute(this._hotspotContainerWrapper);
  setPointerEvents(this._hotspotContainerWrapper, 'none');
  this._parentDomElement.appendChild(this._hotspotContainerWrapper);

  // Hotspot container for scene.
  // This has size 0 and `pointer-events: all;` to overwrite the `none` on the
  // wrapper and allow hotspots to be interacted with.
  this._hotspotContainer = document.createElement('div');
  setAbsolute(this._hotspotContainer);
  setPointerEvents(this._hotspotContainer, 'all');
  this._hotspotContainerWrapper.appendChild(this._hotspotContainer);

  // Hotspot list.
  this._hotspots = [];

  // Whether the hotspot container is visible.
  // The hotspot container may still be hidden if an unsupported rect effect
  // has been set.
  this._visible = true;

  // This will be false when an unsupported rect effect has been set.
  this._supported = true;

  // Store state to prevent DOM accesses.
  this._isVisible = true;
  this._positionAndSize = {};
  this._hasRect = null;

  // Temporary variable used to calculate the updated position and size.
  this._newPositionAndSize = {};

  // Update when the hotspots change or scene is re-rendered.
  this._updateHandler = this._update.bind(this);
  this._renderLoop.addEventListener('afterRender', this._updateHandler);
}

eventEmitter(HotspotContainer);


/**
 * Destroy the instance
*/
HotspotContainer.prototype.destroy = function() {
  var self = this;

  while (this._hotspots.length) {
    this.destroyHotspot(this._hotspots[0]);
  }

  this._parentDomElement.removeChild(this._hotspotContainerWrapper);

  this._renderLoop.removeEventListener('afterRender', this._updateHandler);

  this._parentDomElement = null;
  this._stage = null;
  this._view = null;
  this._renderLoop  = null;
  this._rect = null;
};


/**
 * @return {Element}
 */
HotspotContainer.prototype.domElement = function() {
  return this._hotspotContainer;
};


/**
 * @param {Rect} rect
 */
HotspotContainer.prototype.setRect = function(rect) {
  this._rect = rect;
};


/**
 * @return {Rect}
 */
HotspotContainer.prototype.rect = function() {
  return this._rect;
};


/**
 * Add a hotspot to this container.
 * @param {Element} domElement DOM element to use for the hotspot
 * @param {Object} position View parameters with the hotspot position.
 * For {@link RectilinearView} it should have `{ pitch, yaw }`.
 *
 * @return {Hotspot}
 */
HotspotContainer.prototype.createHotspot = function(domElement, position, opts) {

  position = position || {};

  var hotspot = new Hotspot(domElement, this._hotspotContainer, this._view, position, opts);
  this._hotspots.push(hotspot);
  hotspot._update();

  this.emit('hotspotsChange');

  return hotspot;

};


/**
 * @param {Hotspot} hotspot
 * @return {boolean}
 */
HotspotContainer.prototype.hasHotspot = function(hotspot) {
  return this._hotspots.indexOf(hotspot) >= 0;
};


/**
 * @return {Hotspot[]}
 */
HotspotContainer.prototype.listHotspots = function() {
  return [].concat(this._hotspots);
};


/**
 * @param {Hotspot} hotspot
 */
HotspotContainer.prototype.destroyHotspot = function(hotspot) {
  var i = this._hotspots.indexOf(hotspot);
  if (i < 0) {
    throw new Error('No such hotspot');
  }
  this._hotspots.splice(i, 1);

  hotspot._destroy();
  this.emit('hotspotsChange');
};


/**
 * Hide the container's DOM element. This hides all {@link Hotspot} it contains.
 */
HotspotContainer.prototype.hide = function() {
  this._visible = false;
  this._updateVisibility();
};


/**
 * Show the container's DOM element.
 */
HotspotContainer.prototype.show = function() {
  this._visible = true;
  this._updateVisibility();
};


HotspotContainer.prototype._updateVisibility = function() {
  var shouldBeVisible = this._visible && this._supported;

  if(shouldBeVisible && !this._isVisible) {
    this._hotspotContainerWrapper.style.display = 'block';
    this._isVisible = true;
  }
  else if(!shouldBeVisible && this._isVisible) {
    this._hotspotContainerWrapper.style.display = 'none';
    this._isVisible = false;
  }
};


// Update the position of the hotspot container taking into account rect
HotspotContainer.prototype._update = function() {
  this._updatePositionAndSize();

  for(var i = 0; i < this._hotspots.length; i++) {
    this._hotspots[i]._update();
  }
};


HotspotContainer.prototype._updatePositionAndSize = function() {
  // The hotspot container has `pointer-events: none` if the browser supports it
  if(this._rect) {

    if(!cssPointerEventsSupported() && this._hotspots.length > 0) {
      console.warn("HotspotContainer: this browser does not support using effects.rect with hotspots. Hotspots will be hidden.")
      this._supported = false;
    }
    else {
      calcRect(this._stage.width(), this._stage.height(), this._rect, this._newPositionAndSize);
      this._setPositionAndSizeWithRect(this._newPositionAndSize);
      this._supported = true;
    }
  }
  else {
    // No rect, just set the hotspot container to empty with overflow visible
    this._setPositionAndSizeWithoutRect();
    this._supported = true;
  }

  this._updateVisibility();
};


HotspotContainer.prototype._setPositionAndSizeWithRect = function(newPositionAndSize) {
  // Only update the DOM if something has changed.
  var wrapper = this._hotspotContainerWrapper;
  if (this._hasRect !== true) {
    setOverflowHidden(wrapper);
  }

  if (this._hasRect !== true ||
     newPositionAndSize.left !== this._positionAndSize.left ||
     newPositionAndSize.top !== this._positionAndSize.top) {
    positionAbsolutely(wrapper, newPositionAndSize.left, newPositionAndSize.top);
  }

  if (this._hasRect !== true || +
     newPositionAndSize.width !== this._positionAndSize.width ||
     newPositionAndSize.height !== this._positionAndSize.height) {
    setPixelSize(wrapper, newPositionAndSize.width, newPositionAndSize.height);
  }

  this._positionAndSize.left = newPositionAndSize.left;
  this._positionAndSize.top = newPositionAndSize.top;
  this._positionAndSize.width = newPositionAndSize.width;
  this._positionAndSize.height = newPositionAndSize.height;
  this._hasRect = true;
};


HotspotContainer.prototype._setPositionAndSizeWithoutRect = function() {
  if (this._hasRect !== false) {
    positionAbsolutely(this._hotspotContainerWrapper, 0, 0);
    setNullSize(this._hotspotContainerWrapper);
    setOverflowVisible(this._hotspotContainerWrapper);
    this._hasRect = false;
  }
};


module.exports = HotspotContainer;

},{"./Hotspot":15,"./calcRect":29,"./positionAbsolutely":58,"./support/cssPointerEvents":83,"./util/dom":97,"minimal-event-emitter":13}],17:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var eventEmitter = require('minimal-event-emitter');
var extend = require('./util/extend');


/**
 * @class
 * @classdesc A Layer is a combination of {@link Source}, {@link Geometry},
 *            {@link View} and {@link TextureStore} that can be added into a
 *            {@link Stage} and rendered with effects.
 * @param {Stage} stage
 * @param {Source} source
 * @param {Geometry} geometry
 * @param {View} view
 * @param {TextureStore} textureStore
 * @param {Object} opts
 * @param {Effects} opts.effects
*/
function Layer(stage, source, geometry, view, textureStore, opts) {

  opts = opts || {};

  var self = this;

  this._stage = stage;
  this._source = source;
  this._geometry = geometry;
  this._view = view;
  this._textureStore = textureStore;

  this._effects = opts.effects || {};

  this._fixedLevelIndex = null;

  this._viewChangeHandler = function() {
    self.emit('viewChange', self.view());
  };

  this._view.addEventListener('change', this._viewChangeHandler);

  this._textureStoreChangeHandler = function() {
    self.emit('textureStoreChange', self.textureStore());
  };

  this._textureStore.addEventListener('textureLoad',
    this._textureStoreChangeHandler);
  this._textureStore.addEventListener('textureError',
    this._textureStoreChangeHandler);
  this._textureStore.addEventListener('textureInvalid',
    this._textureStoreChangeHandler);

}

eventEmitter(Layer);


/**
 * Destructor.
 */
Layer.prototype.destroy = function() {
  this._view.removeEventListener('change', this._viewChangeHandler);
  this._textureStore.removeEventListener('textureLoad',
    this._textureStoreChangeHandler);
  this._textureStore.removeEventListener('textureError',
    this._textureStoreChangeHandler);
  this._textureStore.removeEventListener('textureInvalid',
    this._textureStoreChangeHandler);
  this._stage.removeEventListener('resize', this._handleStageResize);
  this._stage = null;
  this._source = null;
  this._geometry = null;
  this._view = null;
  this._textureStore = null;
  this._fixedLevelIndex = null;
  this._effects = null;
  this._viewChangeHandler = null;
  this._textureStoreChangeHandler = null;
};


/**
 * Get the underlying source.
 * @return {Source}
 */
Layer.prototype.source = function() {
  return this._source;
};


/**
 * Get the underlying geometry.
 * @return {Geometry}
 */
Layer.prototype.geometry = function() {
  return this._geometry;
};


/**
 * Get the underlying view.
 * @return {View}
 */
Layer.prototype.view = function() {
  return this._view;
};


/**
 * Get the underlying TextureStore.
 * @return {TextureStore}
 */
Layer.prototype.textureStore = function() {
  return this._textureStore;
};


/**
 * Get the effects.
 * @return {Effects}
 */
Layer.prototype.effects = function() {
  return this._effects;
};


/**
 * Set the underlying view.
 * @param {View} view
 */
Layer.prototype.setView = function(view) {
  this._view = view;
  this.emit('viewChange', this._view);
};


/**
 * Set the effects.
 * @param {Effects} effects
 */
Layer.prototype.setEffects = function(effects) {
  this._effects = effects;
  this.emit('effectsChange', this._effects);
};


/**
 * Merge effects into the current ones. The merge is non-recursive; for
 * instance, if current effects are `{ rect: { relativeWidth: 0.5 } }`,
 * calling this method with `{ rect: { relativeX: 0.5 }}` will reset
 * `rect.relativeWidth`.
 *
 * @param {Effects} effects
 */
Layer.prototype.mergeEffects = function(effects) {
  extend(this._effects, effects);
  this.emit('effectsChange', this._effects);
};


/**
 * Get the fixed level index.
 * @return {(number|null)}
 */
Layer.prototype.fixedLevel = function() {
  return this._fixedLevelIndex;
};


/**
 * Set the fixed level index. When set, the corresponding level will be
 * used regardless of the view parameters. Unset with a null argument.
 * @param {(number|null)} levelIndex
 */
Layer.prototype.setFixedLevel = function(levelIndex) {
  if (levelIndex !== this._fixedLevelIndex) {
    if (levelIndex != null && (levelIndex >= this._geometry.levelList.length || levelIndex < 0)) {
      throw new Error("Level index out of range: " + levelIndex);
    }
    this._fixedLevelIndex = levelIndex;
    this.emit('fixedLevelChange', this._fixedLevelIndex);
  }
};


Layer.prototype._selectLevel = function() {
  var level;
  if (this._fixedLevelIndex != null) {
    level = this._geometry.levelList[this._fixedLevelIndex];
  }
  else {
    level = this._view.selectLevel(this._geometry.selectableLevelList);
  }
  return level;
};


Layer.prototype.visibleTiles = function(result) {
  var level = this._selectLevel();
  return this._geometry.visibleTiles(this._view, level, result);
};


/**
 * Pin a whole level into the texture store.
 * @param {Number} levelIndex
 */
Layer.prototype.pinLevel = function(levelIndex) {
  var level = this._geometry.levelList[levelIndex];
  var tiles = this._geometry.levelTiles(level);
  for (var i = 0; i < tiles.length; i++) {
    this._textureStore.pin(tiles[i]);
  }
};


/**
 * Unpin a whole level from the texture store.
 * @param {Number} levelIndex
 */
Layer.prototype.unpinLevel = function(levelIndex) {
  var level = this._geometry.levelList[levelIndex];
  var tiles = this._geometry.levelTiles(level);
  for (var i = 0; i < tiles.length; i++) {
    this._textureStore.unpin(tiles[i]);
  }
};


/**
 * Pin the first level. Equivalent to `pinLevel(0)`.
 */
Layer.prototype.pinFirstLevel = function() {
  return this.pinLevel(0);
};


/**
 * Unpin the first level. Equivalent to `unpinLevel(0)`.
 */
Layer.prototype.unpinFirstLevel = function() {
  return this.unpinLevel(0);
};


module.exports = Layer;

},{"./util/extend":98,"minimal-event-emitter":13}],18:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var inherits = require('./util/inherits');

// Class used to distinguish network failures from other kinds of errors.
function NetworkError() {
  this.constructor.super_.apply(this, arguments);
}

inherits(NetworkError, Error);

module.exports = NetworkError;

},{"./util/inherits":100}],19:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');


/**
 * @class
 * @classdesc A RenderLoop causes a {@link Stage} to be rendered on the next
 *            frame when it reports that its contents are invalid. The loop
 *            may be manually started/stopped and begins in the stopped state.
 * @param {Stage} stage
 */
function RenderLoop(stage) {

  var self = this;

  // The stage wrapped by the loop.
  this._stage = stage;

  // Whether the loop is running.
  this._running = false;

  // Whether the loop is currently rendering.
  this._rendering = false;

  // The current requestAnimationFrame handle.
  this._requestHandle = null;

  // The callback passed into requestAnimationFrame.
  this._boundLoop = this._loop.bind(this);

  // Handler for renderInvalid events emitted by the stage.
  this._renderInvalidHandler = function() {
    // If we are already rendering, there's no need to schedule a new render
    // on the next frame.
    if (!self._rendering) {
      self.renderOnNextFrame();
    }
  };

  // Handle renderInvalid events emitted by the stage.
  this._stage.addEventListener('renderInvalid', this._renderInvalidHandler);

}

eventEmitter(RenderLoop);


/**
 * Destructor.
 */
RenderLoop.prototype.destroy = function() {
  this.stop();
  this._stage.removeEventListener('renderInvalid', this._renderInvalidHandler);
  this._stage = null;
  this._running = null;
  this._rendering = null;
  this._requestHandle = null;
  this._boundLoop = null;
};


/**
 * Get the underlying stage.
 * @return {Stage}
 */
RenderLoop.prototype.stage = function() {
  return this._stage;
};


/**
 * Start the render loop.
 */
RenderLoop.prototype.start = function() {
  this._running = true;
  this.renderOnNextFrame();
};


/**
 * Stop the render loop.
 */
RenderLoop.prototype.stop = function() {
  if (this._requestHandle) {
    window.cancelAnimationFrame(this._requestHandle);
    this._requestHandle = null;
  }
  this._running = false;
};


/**
 * Request a render on the next frame, even if the stage contents remain valid.
 * Does nothing if the loop is stopped.
 */
RenderLoop.prototype.renderOnNextFrame = function() {
  if (this._running && !this._requestHandle) {
    this._requestHandle = window.requestAnimationFrame(this._boundLoop);
  }
};


RenderLoop.prototype._loop = function() {
  if (!this._running) {
    throw new Error('Render loop running while in stopped state');
  }
  this._requestHandle = null;
  this._rendering = true;
  this.emit('beforeRender');
  this._rendering = false;
  this._stage.render();
  this.emit('afterRender');
};


module.exports = RenderLoop;

},{"minimal-event-emitter":13}],20:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');

var HotspotContainer = require('./HotspotContainer');

var clock = require('./util/clock');
var noop = require('./util/noop');
var type = require('./util/type');
var defaults = require('./util/defaults');

/**
 * Signals that the scene's view has changed. See {@link View#event:change}.
 * @event Scene#viewChange
 */

/**
 * @class
 * @classdesc A @link{Scene} is a {@link Layer} with associated {@link View}
 *            and {@link Effects} that may be rendered inside a {@link Viewer}.
 *            Client code should call {@link Viewer#createScene} instead of
 *            invoking the constructor directly.
 * @param {Viewer} viewer
 * @param {Layer} layer
 */
function Scene(viewer, layer) {
  this._viewer = viewer;
  this._layer = layer;
  this._view = layer.view();

  // Hotspot container
  this._hotspotContainer = new HotspotContainer(viewer._controlContainer, viewer._stage, this._view, viewer._renderLoop, { rect: layer.effects().rect });

  // The current movement.
  this._movement = null;
  this._movementStartTime = null;
  this._movementStep = null;
  this._movementParams = null;
  this._movementCallback = null;

  // Event listener for updating the view according to the current movement.
  // The listener is set/unset on the render loop when a movement starts/stops.
  this._updateMovementHandler = this._updateMovement.bind(this);

  // Show or hide hotspots when scene changes.
  this._updateHotspotContainerHandler = this._updateHotspotContainer.bind(this);
  this._viewer.addEventListener('sceneChange', this._updateHotspotContainerHandler);
  this._layer.addEventListener('effectsChange', this._updateHotspotContainerHandler);

  // Emit event when view changes.
  this._viewChangeHandler = this.emit.bind(this, 'viewChange');
  this._view.addEventListener('change', this._viewChangeHandler);

  // Update the hotspot container.
  this._updateHotspotContainer();
}

eventEmitter(Scene);


/**
 * Destructor. Client code should call {@link Viewer#destroyScene} instead.
 */
Scene.prototype._destroy = function() {
  this._view.removeEventListener('change', this._viewChangeHandler);
  this._viewer.removeEventListener('sceneChange', this._updateHotspotContainerHandler);
  this._layer.removeEventListener('effectsChange', this._updateHotspotContainerHandler);

  if (this._movement) {
    this.stopMovement();
  }

  this._hotspotContainer.destroy();

  this._movement = null;
  this._viewer = null;
  this._layer = null;
  this._view = null;
  this._hotspotContainer = null;
};



/**
 * Get the scene's @link{HotspotContainer hotspot container}.
 * @return {Layer}
 */
Scene.prototype.hotspotContainer = function() {
  return this._hotspotContainer;
};


/**
 * Get the scene's underlying @link{Layer layer}.
 * @return {Layer}
 */
Scene.prototype.layer = function() {
  return this._layer;
};


/**
 * Get the scene's underlying @link{View view}.
 * @return {View}
 */
Scene.prototype.view = function() {
  return this._view;
};


/**
 * Get the @link{Viewer viewer} the scene belongs to.
 * @return {Viewer}
 */
Scene.prototype.viewer = function() {
  return this._viewer;
};


/**
 * Whether the scene is currently visible.
 * @return {boolean}
 */
Scene.prototype.visible = function() {
  return this._viewer.scene() === this;
};


/**
 * Switch to the scene, as would be obtained by calling {@link Viewer#switchScene}.
 * @param {Object} opts Options to pass into {@link Viewer#switchScene}.
 * @param {Object} done Called when the scene switch is complete.
 */
Scene.prototype.switchTo = function(opts, done) {
  return this._viewer.switchScene(this, opts, done);
};


/**
 * Tween the scene's underlying @link{View view}.
 * @param {Object} params Target view parameters.
 * @param {Object} opts
 * @param {Number} [opts.transitionDuration=1000] Tween duration in milliseconds.
 * @param {Number} [opts.closest=true] Whether to take the shortest path when
 * tweening; requires {@link View#normalizeToClosest} to be implemented.
 * @param {Function} done Called when the tween finishes or is interrupted.
 */
Scene.prototype.lookTo = function(params, opts, done) {
  // TODO: allow controls to interrupt an ongoing tween.
  // TODO: provide a way to override the easing function.
  opts = opts || {};
  done = done || noop;

  if (type(params) !== 'object') {
    throw new Error("Target view parameters must be an object");
  }

  var duration = opts.transitionDuration != null ? opts.transitionDuration : 1000;
  var shortest = opts.shortest != null ? opts.shortest : true;

  var view = this._view;

  var initialParams = view.parameters();

  var finalParams = {};
  defaults(finalParams, params);
  defaults(finalParams, initialParams);

  // Tween through the shortest path if requested.
  // The view must implement the normalizeToClosest() method.
  if (shortest && view.normalizeToClosest) {
    view.normalizeToClosest(finalParams, finalParams);
  }

  // Quadratic in/out easing.
  var ease = function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  };

  var movement = function() {

    var finalUpdate = false;

    return function(params, elapsed) {

      if (elapsed >= duration && finalUpdate) {
        return null;
      }

      var delta = Math.min(elapsed / duration, 1);

      for (var param in params) {
        var start = initialParams[param];
        var end = finalParams[param];
        params[param] = start + ease(delta) * (end - start);
      }

      finalUpdate = elapsed >= duration;

      return params;

    };
  };

  var controlsEnabled = this._viewer.controls().enabled();

  this._viewer.controls().disable();
  this.startMovement(movement, function() {
    if(controlsEnabled) {
      this._viewer.controls().enable();
    }
    done();
  });

};


/**
 * Start a movement.
 * @param {Function} fn Movement function.
 * @param {Function} done Called when the movement finishes.
 */
Scene.prototype.startMovement = function(fn, done) {

  var renderLoop = this._viewer.renderLoop();

  if (this._movement) {
    this.stopMovement();
  }

  var step = fn();
  if (typeof step !== 'function') {
    throw new Error('Bad movement');
  }

  this._movement = fn;
  this._movementStep = step;
  this._movementStartTime = clock();
  this._movementParams = {};
  this._movementCallback = done;

  renderLoop.addEventListener('beforeRender', this._updateMovementHandler);
  renderLoop.renderOnNextFrame();
};


/**
 * Stop the current movement.
 */
Scene.prototype.stopMovement = function() {

  var renderLoop = this._viewer.renderLoop();

  if (this._movementCallback) {
    this._movementCallback();
  }

  renderLoop.removeEventListener('beforeRender', this._updateMovementHandler);

  this._movement = null;
  this._movementStep = null;
  this._movementStartTime = null;
  this._movementParams = null;
  this._movementCallback = null;
};


/**
 * Return the current movement.
 * @return {Function}
 */
Scene.prototype.movement = function() {
  return this._movement;
};


Scene.prototype._updateMovement = function() {

  if (!this._movement) {
    throw new Error('Should not call update');
  }

  var renderLoop = this._viewer.renderLoop();
  var view = this._view;

  var elapsed = clock() - this._movementStartTime;
  var step = this._movementStep;
  var params = this._movementParams;

  params = view.parameters(params);
  params = step(params, elapsed);
  if (params == null) {
    this.stopMovement();
  } else {
    view.setParameters(params);
    renderLoop.renderOnNextFrame();
  }

};


Scene.prototype._updateHotspotContainer = function() {
  this._hotspotContainer.setRect(this._layer.effects().rect);

  if(this.visible()) {
    this._hotspotContainer.show();
  }
  else {
    this._hotspotContainer.hide();
  }
};


module.exports = Scene;

},{"./HotspotContainer":16,"./util/clock":88,"./util/defaults":93,"./util/noop":102,"./util/type":110,"minimal-event-emitter":13}],21:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Map = require('./collections/Map');
var Set = require('./collections/Set');
var LruSet = require('./collections/LruSet');
var eventEmitter = require('minimal-event-emitter');
var defaults = require('./util/defaults');
var retry = require('./util/retry');
var chain = require('./util/chain');

var inherits = require('./util/inherits');

var debug = typeof MARZIPANODEBUG !== 'undefined' && MARZIPANODEBUG.textureStore;


// Clients communicate with the texture store primarily through the startFrame,
// endFrame and markTile methods. The call sequence must be accepted by the
// following grammar (where X* denotes zero or more occurrences of X):
//
//   Sequence ::= Frame*
//   Frame ::= Client*
//   Client ::= StartFrame MarkTile* EndFrame
//
// In the grammar above:
//   * Sequence comprises the entire lifetime of the texture store;
//   * Frame comprises the duration of a single frame;
//   * Client comprises the sequence of calls made into the store by one
//     particular client within the duration of a single frame.
//
// Other kinds of calls into the store (e.g. pin and unpin) may be freely
// interleaved with the above sequence.
//
// At any given time, the texture store is in one of three phases. The start
// phase corresponds to the interval between the first StartFrame and the
// first EndFrame of a Frame. The end phase corresponds to the interval
// between the first and the last EndFrame of a Frame. The remaining periods
// of time belong to the idle phase.

var IdlePhase = 'idle';
var StartPhase = 'start';
var EndPhase = 'end';


var defaultOptions = {
  // Maximum number of cached textures for previously visible tiles.
  previouslyVisibleCacheSize: 32
};


// Assign an id to each operation so we can track its state.
// We actually only need this in debug mode, but the code is less convoluted
// if we track unconditionally, and the performance hit is minimal anyway.
var nextId = 0;


// Distinguish a cancellation from other kinds of errors.
function CancelError() {}
inherits(CancelError, Error);


// An item saved in a texture store. This class is responsible for loading
// and unloading a tile's texture and emitting the associated events.
function TextureStoreItem(store, tile) {

  var self = this;

  self._id = nextId++;
  self._store = store;
  self._tile = tile;

  self._asset = null;
  self._texture = null;

  self._changeHandler = function() {
    store.emit('textureInvalid', tile);
  };

  var source = store.source();
  var stage = store.stage();

  var loadAsset = source.loadAsset.bind(source);
  var createTexture = stage.createTexture.bind(stage);

  // Retry loading the asset until it succeeds, then create the texture from it.
  // This process may be canceled at any point by calling the destroy() method.
  var fn = chain(retry(loadAsset), createTexture);

  if (debug) {
    console.log('loading', self._id, self._tile);
  }

  self._cancel = fn(stage, tile, function(err, tile, asset, texture) {

    // Make sure we do not call cancel after the operation is complete.
    self._cancel = null;

    if (err) {
      // The loading process was interrupted by an error.
      // This could either be because the texture creation failed, or because
      // the operation was canceled before the loading was complete.

      // Destroy the asset and texture, if they exist.
      if (asset) {
        asset.destroy();
      }
      if (texture) {
        texture.destroy();
      }

      // Emit events.
      if (err instanceof CancelError) {
        self._store.emit('textureCancel', self._tile);
        if (debug) {
          console.log('cancel', self._id, self._tile);
        }
      } else {
        self._store.emit('textureError', self._tile, err);
        if (debug) {
          console.log('error', self._id, self._tile);
        }
      }

      return;
    }

    // Save a local reference to the texture.
    self._texture = texture;

    // If the asset is dynamic, save a local reference to it and setup
    // handler to be called whenever it changes.
    // Otherwise, destroy the asset as we won't be needing it any more.
    if (asset.dynamic) {
      self._asset = asset;
      asset.addEventListener('change', self._changeHandler);
    } else {
      asset.destroy();
    }

    // Emit event.
    self._store.emit('textureLoad', self._tile);
    if (debug) {
      console.log('loadAsync', self._id, self._tile);
    }
  });

}


TextureStoreItem.prototype.asset = function() {
  return this._asset;
};


TextureStoreItem.prototype.texture = function() {
  return this._texture;
};


TextureStoreItem.prototype.destroy = function() {

  var self = this;

  var id = self._id;
  var store = self._store;
  var tile = self._tile;
  var asset = self._asset;
  var texture = self._texture;
  var cancel = self._cancel;

  if (cancel) {
    // The texture is still loading, so cancel it.
    cancel(new CancelError('Texture loadAsync cancelled'));
    return;
  }

  // Destroy asset.
  if (asset) {
    asset.removeEventListener('change', self._changeHandler);
    asset.destroy();
  }

  // Destroy texture.
  if (texture) {
    texture.destroy();
  }

  // Emit event.
  store.emit('textureUnload', tile);
  if (debug) {
    console.log('unload', id, tile);
  }

  // Kill references.
  self._changeHandler = null;
  self._asset = null;
  self._texture = null;
  self._tile = null;
  self._store = null;
  self._id = null;

};

eventEmitter(TextureStoreItem);


/**
 * @class
 * @classdesc
 * A TextureStore maintains a cache of textures used to render a {@link Layer}.
 *
 * A {@link Stage} communicates with the TextureStore through the startFrame(),
 * markTile() and endFrame() methods, which indicate the tiles that are visible
 * in the current frame. Textures for visible tiles are loaded and retained
 * as long as the tiles remain visible. A limited amount of textures whose
 * tiles used to be visible are cached according to an LRU policy. Tiles may
 * be pinned to ensure that their textures are never unloaded, even when
 * the tiles are invisible.
 *
 * Multiple objectLayers belonging to the same underlying {@link WebGlStage} may
 * share the same TextureStore. Layers belonging to distinct {@link WebGlStage}
 * instances, or belonging to a {@link CssStage} or a {@link FlashStage},
 * may not do so due to restrictions on the use of textures across stages.
 *
 * @param {Geometry} geometry the underlying geometry.
 * @param {Source} source the underlying source.
 * @param {Stage} stage the underlying stage.
 * @param {Object} opts options.
 * @param {Number} [opts.previouslyVisibleCacheSize=32] the non-visible texture
 *                 LRU cache size.
 */
function TextureStore(geometry, source, stage, opts) {

  opts = defaults(opts || {}, defaultOptions);

  this._source = source;
  this._stage = stage;

  var TileClass = geometry.TileClass;

  // The current phase.
  this._clientPhase = IdlePhase;

  // The number of pending startFrame calls without a matching endFrame call.
  this._clientCounter = 0;

  // The cache proper: map cached tiles to their respective textures/assets.
  this._itemMap = new Map(TileClass.equals, TileClass.hash);

  // The subset of cached tiles that are currently visible.
  this._visible = new Set(TileClass.equals, TileClass.hash);

  // The subset of cached tiles that were visible recently, but are not
  // visible right now. Newly inserted tiles replace older ones.
  this._previouslyVisible = new LruSet(TileClass.equals, TileClass.hash, opts.previouslyVisibleCacheSize);

  // The subset of cached tiles that should never be evicted from the cache.
  // A tile may be pinned more than once; map each tile into a reference count.
  this._pinMap = new Map(TileClass.equals, TileClass.hash);

  // Temporary variables.
  this._newVisible = new Set(TileClass.equals, TileClass.hash);
  this._noLongerVisible = [];
  this._visibleAgain = [];
  this._evicted = [];

}

eventEmitter(TextureStore);


/**
 * Destructor.
 */
TextureStore.prototype.destroy = function() {
  this.clear();
  this._source = null;
  this._stage = null;
  this._itemMap = null;
  this._visible = null;
  this._previouslyVisible = null;
  this._pinMap = null;
  this._newVisible = null;
  this._noLongerVisible = null;
  this._visibleAgain = null;
  this._evicted = null;
};


/**
 * Return the underlying {@link Stage}.
 * @return {Stage}
 */
TextureStore.prototype.stage = function() {
  return this._stage;
};


/**
 * Return the underlying {@link Source}.
 * @return {Source}
 */
TextureStore.prototype.source = function() {
  return this._source;
};


/**
 * Remove all textures from the TextureStore, including pinned textures.
 */
TextureStore.prototype.clear = function() {

  var self = this;

  // Collect list of tiles to be evicted.
  self._evicted.length = 0;
  self._itemMap.each(function(tile) {
    self._evicted.push(tile);
  });

  // Evict tiles.
  self._evicted.forEach(function(tile) {
    self._unloadTile(tile);
  });

  // Clear all internal state.
  self._itemMap.clear();
  self._visible.clear();
  self._previouslyVisible.clear();
  self._pinMap.clear();
  self._newVisible.clear();
  self._noLongerVisible.length = 0;
  self._visibleAgain.length = 0;
  self._evicted.length = 0;
};


/**
 * Remove all textures in the TextureStore, excluding unpinned textures.
 */
TextureStore.prototype.clearNotPinned = function() {

  var self = this;

  // Collect list of tiles to be evicted.
  self._evicted.length = 0;
  self._itemMap.each(function(tile) {
    if (!self._pinMap.has(tile)) {
      self._evicted.push(tile);
    }
  });

  // Evict tiles.
  self._evicted.forEach(function(tile) {
    self._unloadTile(tile);
  });

  // Clear all caches except the pinned set.
  self._visible.clear();
  self._previouslyVisible.clear();

  // Clear temporary variables.
  self._evicted.length = 0;
};


/**
 * Signal the beginning of a frame. Called from {@link Stage}.
 */
TextureStore.prototype.startFrame = function() {

  // Check that this is an appropriate state for startFrame to be called.
  if (this._clientPhase !== IdlePhase && this._clientPhase !== StartPhase) {
    throw new Error('TextureStore: startFrame called out of sequence');
  }

  // We are now in the start phase and expect one more call to endFrame
  // before the current frame is complete.
  this._clientPhase = StartPhase;
  this._clientCounter++;

  // Clear the set of visible tiles, which is populated by calls to markTile.
  this._newVisible.clear();

};


/**
 * Mark a tile within the current frame. Called from {@link Stage}.
 * @param {Tile} tile the tile to mark
 */
TextureStore.prototype.markTile = function(tile) {

  // Check that this is an appropriate state for markTile to be called.
  if (this._clientPhase !== StartPhase) {
    throw new Error('TextureStore: markTile called out of sequence');
  }

  // Refresh texture for dynamic assets.
  var item = this._itemMap.get(tile);
  var texture = item && item.texture();
  var asset = item && item.asset();
  if (texture && asset) {
    texture.refresh(tile, asset);
  }

  // Add tile to the visible set.
  this._newVisible.add(tile);

};


/**
 * Signal the end of a frame. Called from {@link Stage}.
 */
TextureStore.prototype.endFrame = function() {

  // Check that this is an appropriate state for endFrame to be called.
  if (this._clientPhase !== StartPhase && this._clientPhase !== EndPhase) {
    throw new Error('TextureStore: endFrame called out of sequence');
  }

  // We are now in the end phase and expect one less call to endFrame
  // before the current frame is complete.
  this._clientPhase = EndPhase;
  this._clientCounter--;

  // If all calls to startFrame have been matched by a corresponding call
  // to endFrame, process the frame and return to the idle phase.
  if (!this._clientCounter) {
    this._update();
    this._clientPhase = IdlePhase;
  }
};


TextureStore.prototype._update = function() {

  var self = this;

  // Calculate the set of tiles that used to be visible but no longer are.
  self._noLongerVisible.length = 0;
  self._visible.each(function(tile) {
    if (!self._newVisible.has(tile)) {
      self._noLongerVisible.push(tile);
    }
  });

  // Calculate the set of tiles that were visible recently and have become
  // visible again.
  self._visibleAgain.length = 0;
  self._newVisible.each(function(tile) {
    if (self._previouslyVisible.has(tile)) {
      self._visibleAgain.push(tile);
    }
  });

  // Remove tiles that have become visible again from the list of previously
  // visible tiles.
  self._visibleAgain.forEach(function(tile) {
    self._previouslyVisible.remove(tile);
  });

  // Cancel loading of tiles that are no longer visible.
  // Move no longer visible tiles with a loaded texture into the previously
  // visible set, and collect the tiles evicted from the latter.
  self._evicted.length = 0;
  self._noLongerVisible.forEach(function(tile) {
    var item = self._itemMap.get(tile);
    var texture = item && item.texture();
    if (texture) {
      var otherTile = self._previouslyVisible.add(tile);
      if (otherTile != null) {
        self._evicted.push(otherTile);
      }
    } else if (item) {
      self._unloadTile(tile);
    }
  });

  // Unload evicted tiles, unless they are pinned.
  self._evicted.forEach(function(tile) {
    if (!self._pinMap.has(tile)) {
      self._unloadTile(tile);
    }
  });

  // Load visible tiles that are not already in the store.
  // Refresh texture on visible tiles for dynamic assets.
  self._newVisible.each(function(tile) {
    var item = self._itemMap.get(tile);
    if (!item) {
      self._loadTile(tile);
    }
  });

  // Swap the old visible set with the new one.
  var tmp = self._visible;
  self._visible = self._newVisible;
  self._newVisible = tmp;

  // Clear temporary variables.
  self._noLongerVisible.length = 0;
  self._visibleAgain.length = 0;
  self._evicted.length = 0;

};


TextureStore.prototype._loadTile = function(tile) {
  if (this._itemMap.has(tile)) {
    throw new Error('TextureStore: loading texture already in cache');
  }
  var item = new TextureStoreItem(this, tile);
  this._itemMap.set(tile, item);
};


TextureStore.prototype._unloadTile = function(tile) {
  var item = this._itemMap.del(tile);
  if (!item) {
    throw new Error('TextureStore: unloading texture not in cache');
  }
  item.destroy();
};


TextureStore.prototype.asset = function(tile) {
  var item = this._itemMap.get(tile);
  if (item) {
    return item.asset();
  }
  return null;
};


TextureStore.prototype.texture = function(tile) {
  var item = this._itemMap.get(tile);
  if (item) {
    return item.texture();
  }
  return null;
};


/**
 * Pin a tile. Textures for pinned tiles are never evicted from the store.
 * Upon pinning, the texture is created if not already present. Pins are
 * reference-counted; a tile may be pinned multiple times and must be unpinned
 * the corresponding number of times. Pinning is useful e.g. to ensure that
 * the lowest-resolution level of an image is always available to fall back
 * onto.
 * @param {Tile} tile the tile to pin
 * @returns {number} the pin reference count.
 */
TextureStore.prototype.pin = function(tile) {
  // Increment reference count.
  var count = (this._pinMap.get(tile) || 0) + 1;
  this._pinMap.set(tile, count);
  // If the texture for the tile is not present, loadAsync it now.
  if (!this._itemMap.has(tile)) {
    this._loadTile(tile);
  }
  return count;
};


/**
 * Unpin a tile. Pins are reference-counted; a tile may be pinned multiple
 * times and must be unpinned the corresponding number of times.
 * @param {Tile} tile the tile to unpin
 * @returns {number} the pin reference count.
 */
TextureStore.prototype.unpin = function(tile) {
  var count = this._pinMap.get(tile);
  // Consistency check.
  if (!count) {
    throw new Error('TextureStore: unpin when not pinned');
  } else {
    // Decrement reference count.
    count--;
    if (count > 0) {
      this._pinMap.set(tile, count);
    } else {
      this._pinMap.del(tile);
      // If the tile does not belong to either the visible or previously
      // visible sets, evict it from the cache.
      if (!this._visible.has(tile) && !this._previouslyVisible.has(tile)) {
        this._unloadTile(tile);
      }
    }
  }
  return count;
};


/**
 * Return the state of a tile.
 * @param {Tile} tile the tile to query
 * @return {Object} state
 * @return {boolean} state.visible whether the tile is in the visible set
 * @return {boolean} state.previouslyVisible whether the tile is in the
                     previously visible set
 * @return {boolean} state.hasAsset whether the asset for the tile is present
 * @return {boolean} state.hasTexture whether the texture for the tile is present
 * @return {boolean} state.pinned whether the tile is pinned
 * @return {number} state.pinCount the pin reference count for the tile
 */
TextureStore.prototype.query = function(tile) {
  var item = this._itemMap.get(tile);
  var pinCount = this._pinMap.get(tile) || 0;
  return {
    visible: this._visible.has(tile),
    previouslyVisible: this._previouslyVisible.has(tile),
    hasAsset: item != null && item.asset() != null,
    hasTexture: item != null && item.texture() != null,
    pinned: pinCount !== 0,
    pinCount: pinCount
  };
};


module.exports = TextureStore;

},{"./collections/LruSet":31,"./collections/Map":32,"./collections/Set":33,"./util/chain":86,"./util/defaults":93,"./util/inherits":100,"./util/retry":107,"minimal-event-emitter":13}],22:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var defaults = require('./util/defaults');
var clock = require('./util/clock');

var defaultOptions = {
  duration: Infinity
};


function Timer(opts) {

  opts = defaults(opts || {}, defaultOptions);

  this._duration = opts.duration;

  this._startTime = null;

  this._handle = null;

  this._check = this._check.bind(this);

}

eventEmitter(Timer);


Timer.prototype.start = function() {
  this._startTime = clock();
  if (this._handle == null && this._duration < Infinity) {
    this._setup(this._duration);
  }
};


Timer.prototype.started = function() {
  return this._startTime != null;
};


Timer.prototype.stop = function() {
  this._startTime = null;
  if (this._handle != null) {
    clearTimeout(this._handle);
    this._handle = null;
  }
};


Timer.prototype.reset = function() {
  this.start();
};


Timer.prototype._setup = function(interval) {
  this._handle = setTimeout(this._check, interval);
};


Timer.prototype._check = function() {
  var currentTime = clock();
  var elapsed = currentTime - this._startTime;
  var remaining = this._duration - elapsed;

  this._handle = null;

  if (remaining <= 0) {
    this.emit('timeout');
    this._startTime = null;
  } else if (remaining < Infinity) {
    this._setup(remaining);
  }
};


Timer.prototype.duration = function() {
  return this._duration;
};


Timer.prototype.setDuration = function(duration) {

  this._duration = duration;

  if (this._startTime != null) {
    if (this._handle != null) {
      clearTimeout(this._handle);
      this._handle = null;
    }
    this._check();
  }

};


module.exports = Timer;
},{"./util/clock":88,"./util/defaults":93,"minimal-event-emitter":13}],23:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');

var RenderLoop = require('./RenderLoop');
var Controls = require('./controls/Controls');
var Layer = require('./Layer');
var TextureStore = require('./TextureStore');

var Scene = require('./Scene');

var Timer = require('./Timer');

var WebGlStage = require('./stages/WebGl');
var CssStage = require('./stages/Css');
var FlashStage = require('./stages/Flash');

var registerDefaultControls = require('./controls/registerDefaultControls');
var registerDefaultRenderers = require('./renderers/registerDefaultRenderers');

var setOverflowHidden = require('./util/dom').setOverflowHidden;
var setAbsolute = require('./util/dom').setAbsolute;
var setFullSize = require('./util/dom').setFullSize;
var setBlocking = require('./util/dom').setBlocking;

var tween = require('./util/tween');
var noop = require('./util/noop');

var DragCursor = require('./controls/DragCursor');

var HammerGestures = require('./controls/HammerGestures');

var stageMap = {
  webgl: WebGlStage,
  css: CssStage,
  flash: FlashStage
};

var stagePrefList = [
  WebGlStage,
  CssStage,
  FlashStage
];

// TODO: it might make sense to support multiple scenes to be visible at the
// same time, which would allow e.g. overlapping effects with transparency.

/**
 * Signals that the current scene has changed.
 * @event Viewer#sceneChange
 */

/**
 * Signals that the view of the current scene has changed. See
 * {@link View#event:change}.
 * @event Viewer#viewChange
 */

/**
 * @class
 * @classdesc A Viewer is a single-{@link Stage stage} container for multiple
 * {@link Scene scenes}.
 * @param {HTMLElement} domElement the HTML element inside which the viewer
 *        should be initialized.
 * @param {Object} opts
 * @param {(null|'webgl'|'css'|'flash')} opts.stageType stage type to use.
 * @param {Object} opts.controls options to be passed to
 * {@link registerDefaultControls}.
 * @param {Object} opts.stage options to be passed to the {@link Stage}
 * constructor.
 */
function Viewer(domElement, opts) {

  opts = opts || {};

  this._domElement = domElement;

  // Add `overflow: hidden` to the domElement.
  setOverflowHidden(domElement);

  // Select the stage type to use.
  var Stage;
  if (opts.stageType) {
    // If a specific stage type was specified, use that one.
    Stage = stageMap[opts.stageType];
    if (!Stage) {
      throw new Error('Unknown stage type: ' + opts.stageType);
    }
  } else {
    // Choose the best supported stage according to the default preference
    // order. Note that this may yield an unsupported stage for some
    // geometry/view combinations. Client code is expected to pass in a
    // specific stage type in those cases.
    for (var i = 0; i < stagePrefList.length; i++) {
      if (stagePrefList[i].supported()) {
        Stage = stagePrefList[i];
        break;
      }
    }
    if (!Stage) {
      throw new Error('None of the stage types are supported');
    }
  }

  // Create stage.
  this._stage = new Stage(opts.stage);

  // Register the default renderers for the selected stage.
  registerDefaultRenderers(this._stage);

  // Add the stage element into the DOM.
  this._domElement.appendChild(this._stage.domElement());

  // Create control container.
  // Controls cannot be placed directly on the root DOM element because
  // Hammer.js will prevent click events from reaching the elements beneath.

  // The hotspot containers will be added inside the controls container.
  this._controlContainer = document.createElement('div');
  setAbsolute(this._controlContainer);
  setFullSize(this._controlContainer);

  // Prevent bounce scroll effect on iOS.
  this._controlContainer.addEventListener('touchstart', function(event) {
    event.preventDefault();
  });

  // Old IE does not detect mouse events on elements without background
  // Add a child element to the controls with full width, a background color
  // and opacity 0
  var controlCapture = document.createElement('div');
  setAbsolute(controlCapture);
  setFullSize(controlCapture);
  setBlocking(controlCapture);

  this._controlContainer.appendChild(controlCapture);
  domElement.appendChild(this._controlContainer);

  // Respond to window size changes.
  this._size = {};
  this.updateSize();
  this._updateSizeListener = this.updateSize.bind(this);
  window.addEventListener('resize', this._updateSizeListener);

  // Create render loop.
  this._renderLoop = new RenderLoop(this._stage);

  // Create the controls and register them with the render loop.
  this._controls = new Controls();
  this._controlMethods = registerDefaultControls(this._controls, this._controlContainer, opts.controls);
  this._controls.attach(this._renderLoop);

  // Expose HammerJS.
  this._hammerManagerTouch = HammerGestures.get(this._controlContainer, 'touch');
  this._hammerManagerMouse = HammerGestures.get(this._controlContainer, 'mouse');

  // Initialize mouse cursor.
  opts.cursors = opts.cursors || {};
  this._dragCursor = new DragCursor(this._controls, 'mouseViewDrag', domElement, opts.cursors.drag);

  // Start the render loop.
  this._renderLoop.start();

  // Scene list.
  this._scenes = [];

  // The currently visible scene.
  this._scene = null;

  // The current transition.
  this._cancelCurrentTween = null;

  // The event listener fired when the current view changes.
  // This is attached to the correct view whenever the current scene changes.
  this._viewChangeHandler = this.emit.bind(this, 'viewChange');

  // Setup the idle timer.
  // By default, the timer has an infinite duration so it does nothing.
  this._idleTimer = new Timer();
  this._idleTimer.start();

  // Reset the timer whenever the view changes.
  this._resetIdleTimerHandler = this._resetIdleTimer.bind(this);
  this.addEventListener('viewChange', this._resetIdleTimerHandler);

  // Start the idle movement when the idle timer fires.
  this._enterIdleHandler = this._enterIdle.bind(this);
  this._idleTimer.addEventListener('timeout', this._enterIdleHandler);

  // Stop the idle movement when the controls are activated or when the
  // scene changes.
  this._leaveIdleHandler = this._leaveIdle.bind(this);
  this._controls.addEventListener('active', this._leaveIdleHandler);
  this.addEventListener('sceneChange', this._leaveIdleHandler);

  // The currently programmed idle movement.
  this._idleMovement = null;
}

eventEmitter(Viewer);


/**
 * Destructor.
 */
Viewer.prototype.destroy = function() {

  window.removeEventListener('resize', this._updateSizeListener);
  this._updateSizeListener = null;
  this._size = null;

  if (this._scene) {
    this._scene.view().removeEventListener('change', this._viewChangeHandler);
  }
  this._viewChangeHandler = null;

  for (var methodName in this._controlMethods) {
    this._controlMethods[methodName].destroy();
  }
  this._controlMethods = null;

  while (this._scenes.length) {
    this.destroyScene(this._scenes[0]);
  }

  this._scenes = null;
  this._scene = null;

  // The Flash renderer must be torn down before the element is removed from
  // the DOM, so all scenes must have been destroyed before this point.
  this._domElement.removeChild(this._stage.domElement());

  this._stage.destroy();
  this._stage = null;

  this._renderLoop.destroy();
  this._renderLoop = null;

  this._controls.destroy();
  this._controls = null;

  if (this._cancelCurrentTween) {
    this._cancelCurrentTween();
    this._cancelCurrentTween = null;
  }

  this._domElement = null;
  this._controlContainer = null;

};


/**
 * Update the stage size to fill the containing element.
 *
 * This method is automatically called when the browser window is resized.
 * Most clients won't need to explicitly call it to keep the size up to date.
 */
Viewer.prototype.updateSize = function() {
  var size = this._size;
  size.width = this._domElement.clientWidth;
  size.height = this._domElement.clientHeight;
  this._stage.setSize(size);
};


/**
 * Return the underlying {@link Stage}.
 * @return {Stage}
 */
Viewer.prototype.stage = function() {
  return this._stage;
};


/**
 * Return the underlying {@link RenderLoop}.
 * @return {RenderLoop}
 */
Viewer.prototype.renderLoop = function() {
  return this._renderLoop;
};


/**
 * Return the underlying {@link Controls}.
 * @return {Controls}
 */
Viewer.prototype.controls = function() {
  return this._controls;
};


/**
 * Return the underlying DOM element.
 * @return {Element}
 */
Viewer.prototype.domElement = function() {
  return this._domElement;
};


/**
 * Create a new {@link Scene scene}.
 * @param {Object} opts
 * @param {Source} opts.source The underlying {@link Source}.
 * @param {Geometry} opts.geometry The underlying +{@link Geometry}.
 * @param {View} opts.view The underlying {@link View}.
 * @param {boolean} opts.pinFirstLevel Pin the first level to provide a
 *        last-resort fallback at the cost of memory consumption.
 * @param {Object} opts.textureStore Options to pass to the {@link TextureStore}
 *        constructor.
 * @param {Object} opts.layerOpts Options to pass to the {@link Layer}
 *        constructor.
 * @return {Scene}
 */
Viewer.prototype.createScene = function(opts) {
  // TODO: set textureStore size to 0 for video scenes somehow?

  opts = opts || {};

  var stage = this._stage;

  var source = opts.source;
  var geometry = opts.geometry;
  var view = opts.view;
  var textureStore = new TextureStore(geometry, source, stage, opts.textureStore);

  var layer = new Layer(stage, source, geometry, view, textureStore, opts.layerOpts);

  if (opts.pinFirstLevel) {
    layer.pinFirstLevel();
  }

  var scene = new Scene(this, layer);
  this._scenes.push(scene);

  return scene;
};


Viewer.prototype._addLayer = function(layer) {
  // Pin the first level to serve as a last-resort fallback.
  layer.pinFirstLevel();
  this._stage.addLayer(layer);
};


Viewer.prototype._removeLayer = function(layer) {
  if (this._stage.hasLayer(layer)) {
    layer.unpinFirstLevel();
    this._stage.removeLayer(layer);
  }
  layer.textureStore().clearNotPinned();
};


/**
 * Destroy a {@link Scene}.
 * @param {Scene} scene
 */
Viewer.prototype.destroyScene = function(scene) {
  var i = this._scenes.indexOf(scene);
  if (i < 0) {
    throw new Error('No such scene in viewer');
  }

  this._removeLayer(scene._layer);

  if (this._scene === scene) {
    this._scene = null;
    if(this._cancelCurrentTween) {
      this._cancelCurrentTween();
      this._cancelCurrentTween = null;
    }
  }
  this._scenes.splice(i, 1);

  var layer = scene._layer;
  var textureStore = layer.textureStore();

  scene._destroy();
  layer.destroy();
  textureStore.destroy();
};


/**
 * Destroy all {@link Scene scenes}.
 */
Viewer.prototype.destroyAllScenes = function() {
  while (this._scenes.length > 0) {
    this.destroyScene(this._scenes[0]);
  }
};


/**
 * Return whether the viewer contains a {@link Scene scene}.
 * @param {Scene} scene
 * @return {boolean}
 */
Viewer.prototype.hasScene = function(scene) {
  return this._scenes.indexOf(scene) >= 0;
};


/**
 * Get a list of all {@link Scene scenes}.
 * @return {Scene[]}
 */
Viewer.prototype.listScenes = function() {
  return [].concat(this._scenes);
};


/**
 * Get the current {@link Scene scene}, i.e., the last scene for which
 * {@link Viewer#switchScene} was called.
 * @return {Scene}
 */
Viewer.prototype.scene = function() {
  return this._scene;
};


/**
 * Get the {@link View view} for the current {@link Scene scene}, as would be
 * obtained by calling {@link Scene#view}.
 * @return {View}
 */
Viewer.prototype.view = function() {
  var scene = this._scene;
  if (scene) {
    return scene.layer().view();
  }
  return null;
};


/**
 * Tween the {@link View view} for the current {@link Scene scene}, as would be
 * obtained by calling {@link Scene#lookTo}.
 */
Viewer.prototype.lookTo = function(params, opts, done) {
  // TODO: is it an error to call lookTo when no scene is displayed?
  var scene = this._scene;
  if (scene) {
    scene.lookTo(params, opts, done);
  }
};


/**
 * Start a movement, as would be obtained by calling {@link Scene#startMovement}
 * on the current scene.
 */
Viewer.prototype.startMovement = function(fn, cb) {
  // TODO: is it an error to call startMovement when no scene is displayed?
  var scene = this._scene;
  if (scene) {
    scene.startMovement(fn, cb);
  }
};


/**
 * Stop the current movement, as would be obtained by calling
 * {@link Scene#stopMovement} on the current scene.
 */
Viewer.prototype.stopMovement = function() {
  var scene = this._scene;
  if (scene) {
    scene.stopMovement();
  }
};


/**
 * Schedule an automatic movement to be started when the view remains unchanged
 * for the given timeout period.
 * @param {Number} timeout Timeout period in milliseconds.
 * @param {Function} movement Automatic movement function, or null to disable.
 */
Viewer.prototype.setIdleMovement = function(timeout, movement) {
  this._idleTimer.setDuration(timeout);
  this._idleMovement = movement;
};


/**
  * Stop the idle movement. It will be started again after the timeout set by
  * {@link Viewer#setIdleMovement}.
  */
Viewer.prototype.breakIdleMovement = function() {
  this._leaveIdle();
  this._resetIdleTimer();
};


Viewer.prototype._resetIdleTimer = function() {
  this._idleTimer.reset();
};


Viewer.prototype._enterIdle = function() {
  var scene = this._scene;
  var idleMovement = this._idleMovement;
  if (!scene || !idleMovement) {
    return;
  }
  scene.startMovement(idleMovement);
};


Viewer.prototype._leaveIdle = function() {
  var scene = this._scene;
  if (!scene) {
    return;
  }
  if (scene.movement() === this._idleMovement) {
    scene.stopMovement();
  }
};


var defaultSwitchDuration = 1000;

function defaultTransitionUpdate(val, newScene, oldScene) {
  newScene.layer().mergeEffects({ opacity: val });
  newScene._hotspotContainer.domElement().style.opacity = val;
}


/**
 * Switch to another {@link Scene scene} with a fade transition.
 * @param {Scene} newScene The scene to switch to.
 * @param {Object} opts
 * @param {Number} [opts.transitionDuration=1000]
 *        Transition duration in milliseconds.
 * @param {Number} [opts.transitionUpdate=defaultTransitionUpdate]
 *        Transition function with signature `f(t, newScene, oldScene)`.
 *        The function is called on each frame with `t` increasing from 0 to 1.
 *        An initial call with `t=0` and a final call with `t=1` are guaranteed.
 *        The default function sets the scene opacity to `t`.
 * @param {Function} done Called when the transition finishes or is interrupted.
 */
Viewer.prototype.switchScene = function(newScene, opts, done) {
  opts = opts || {};
  done = done || noop;

  var stage = this._stage;

  var oldScene = this._scene;

  // Do nothing if the target scene is the current one.
  if (oldScene === newScene) {
    done();
    return;
  }

  if (this._scenes.indexOf(newScene) < 0) {
    throw new Error('No such scene in viewer');
  }

  // Consistency check.
  var layerList = stage.listLayers();
  if (oldScene && oldScene.layer() !== layerList[layerList.length - 1]) {
    throw new Error('Stage not in sync with viewer');
  }

  // Cancel ongoing transition, if any.
  if (this._cancelCurrentTween) {
    this._cancelCurrentTween();
    this._cancelCurrentTween = null;
  }


  // Setup the transition
  var duration = opts.transitionDuration != null ? opts.transitionDuration : defaultSwitchDuration;
  var update = opts.transitionUpdate != null ? opts.transitionUpdate : defaultTransitionUpdate;

  var self = this;

  // Start by adding the new layer
  self._addLayer(newScene.layer());

  // Call provided update function
  function tweenUpdate(val) {
    update(val, newScene, oldScene);
  }

  // Remove old layer when tween is complete
  function tweenDone() {
    if(oldScene) {
      self._removeLayer(oldScene.layer());
    }
    //Remove tween to ensure objects referenced on callbacks are garbage collected
    self._cancelCurrentTween = null;
    done();
  }

  this._cancelCurrentTween = tween(duration, tweenUpdate, tweenDone);

  // Update current scene.
  this._scene = newScene;

  // Emit scene and view change events.
  this.emit('sceneChange');
  this.emit('viewChange');

  // Listen to the view change events for the new scene.
  if (oldScene) {
    oldScene.view().removeEventListener('change', this._viewChangeHandler);
  }
  newScene.view().addEventListener('change', this._viewChangeHandler);

};


module.exports = Viewer;

},{"./Layer":17,"./RenderLoop":19,"./Scene":20,"./TextureStore":21,"./Timer":22,"./controls/Controls":38,"./controls/DragCursor":40,"./controls/HammerGestures":43,"./controls/registerDefaultControls":50,"./renderers/registerDefaultRenderers":70,"./stages/Css":73,"./stages/Flash":74,"./stages/WebGl":77,"./util/dom":97,"./util/noop":102,"./util/tween":109,"minimal-event-emitter":13}],24:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');

/**
 * Dynamic asset containing a canvas.
 * @class
 * @implements Asset
 * @param {Element} element HTML Canvas element
 */
function DynamicCanvasAsset(element, opts) {
  opts = opts || {};

  this._opts = opts;

  this._element = element;
  this._timestamp = 1;
  this._lastUsedTime = null;

}

eventEmitter(DynamicCanvasAsset);

/**
 * @return {Element}
 */
DynamicCanvasAsset.prototype.element = function() {
  return this._element;
};

DynamicCanvasAsset.prototype.width = function() {
  return this._element.width;
};

DynamicCanvasAsset.prototype.height = function() {
  return this._element.height;
};

DynamicCanvasAsset.prototype.dynamic = true;

DynamicCanvasAsset.prototype.timestamp = function() {
  return this._timestamp;
};

/**
 * Notifies that the contained Canvas element was modified.
 * @fires {Asset#change}
 */
DynamicCanvasAsset.prototype.changed = function() {
  this._timestamp++;
  this.emit('change');
};

DynamicCanvasAsset.prototype.destroy = function() {
  if (this._opts.unload) {
    this._opts.unload();
  }
};

module.exports = DynamicCanvasAsset;
},{"minimal-event-emitter":13}],25:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Static asset referencing an image loaded by the Flash application.
 * @class
 * @implements Asset
 * @param {Element} flashElement HTML element with the Flash application that
 * loaded the image.
 * @param {number} imageId ID of the image inside the Flash application.
 */
function FlashImageAsset(flashElement, imageId) {
  this._flashElement = flashElement;
  this._imageId = imageId;
}

FlashImageAsset.prototype.element = function() {
  return this._imageId;
};

FlashImageAsset.prototype.timestamp = function() {
  return 0;
};

FlashImageAsset.prototype.dynamic = false;

FlashImageAsset.prototype.destroy = function() {
  var flashElement = this._flashElement;
  var imageId = this._imageId;
  flashElement.unloadImage(imageId);

  this._flashElement = null;
  this._imageId = null;
};

module.exports = FlashImageAsset;
},{}],26:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var noop = require('../util/noop');

/**
 * Static asset containing a canvas.
 * @class
 * @implements Asset
 * @param {Element} element HTML Canvas element.
 */
function StaticCanvasAsset(element) {
  this._element = element;
}

/**
 * @return {Element}
 */
StaticCanvasAsset.prototype.element = function() {
  return this._element;
};

StaticCanvasAsset.prototype.width = function() {
  return this._element.width;
};

StaticCanvasAsset.prototype.height = function() {
  return this._element.height;
};

StaticCanvasAsset.prototype.timestamp = function() {
  return 0;
};

StaticCanvasAsset.prototype.dynamic = false;

StaticCanvasAsset.prototype.destroy = noop;

module.exports = StaticCanvasAsset;
},{"../util/noop":102}],27:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var noop = require('../util/noop');

/**
 * Static asset containing an image.
 * @class
 * @implements Asset
 * @param {Element} element HTML Image element.
 */
function StaticImageAsset(element) {
  this._element = element;
}

StaticImageAsset.prototype.element = function() {
  return this._element;
};

StaticImageAsset.prototype.width = function() {
  // TODO: Would need fallback to work on IE8. Right now it's not necessary
  // since IE8 uses FlashImageAsset.
  return this._element.naturalWidth;
};

StaticImageAsset.prototype.height = function() {
  // TODO: Would need fallback to work on IE8. Right now it's not necessary
  // since IE8 uses FlashImageAsset.
  return this._element.naturalHeight;
};

StaticImageAsset.prototype.timestamp = function() {
  return 0;
};

StaticImageAsset.prototype.dynamic = false;

StaticImageAsset.prototype.destroy = noop;

module.exports = StaticImageAsset;

},{"../util/noop":102}],28:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var defaults = require('./util/defaults');

var defaultSpeed = 0.1;
var defaultAccel = 0.01;

var defaultOptions = {
  yawSpeed: defaultSpeed,
  pitchSpeed: defaultSpeed,
  fovSpeed: defaultSpeed,
  yawAccel: defaultAccel,
  pitchAccel: defaultAccel,
  fovAccel: defaultAccel,
  targetPitch: 0,
  targetFov: null
};

/**
 * @param {Object} opts
 * @param {Number} [opts.yawSpeed=0.1] Yaw maximum speed
 * @param {Number} [opts.pitchSpeed=0.1] Pitch maximum speed
 * @param {Number} [opts.fovSpeed=0.1] Fov maximum speed
 * @param {Number} [opts.yawAccel=0.01] Yaw acceleration
 * @param {Number} [opts.pitchAccel=0.01] Pitch acceleration
 * @param {Number} [opts.fovAccel=0.01] Fov acceleration
 * @param {Number} [opts.targetPitch=0] Value that pitch converges to. `null` means that the pitch will not change.
 * @param {Number} [opts.targetFov=null] Value that fov converges to. `null` means that the fov will not change.
 * @returns Movement function that can be passed to {@link Viewer#setIdleMovement} or {@link Scene#startMovement}
*/
function autorotate(opts) {

  opts = defaults(opts || {}, defaultOptions);

  var yawSpeed = opts.yawSpeed;
  var pitchSpeed = opts.pitchSpeed;
  var fovSpeed = opts.fovSpeed;
  var yawAccel = opts.yawAccel;
  var pitchAccel = opts.pitchAccel;
  var fovAccel = opts.fovAccel;
  var targetPitch = opts.targetPitch;
  var targetFov = opts.targetFov;

  return function start() {

    var lastTime = 0;
    var lastYawSpeed = 0;
    var lastPitchSpeed = 0;
    var lastFovSpeed = 0;

    var currentYawSpeed = 0;
    var currentPitchSpeed = 0;
    var currentFovSpeed = 0;

    var timeDelta;
    var yawDelta;
    var pitchDelta;
    var fovDelta;

    return function step(params, currentTime) {

      timeDelta = (currentTime - lastTime) / 1000;
      currentYawSpeed = Math.min(lastYawSpeed + timeDelta * yawAccel, yawSpeed);
      yawDelta = currentYawSpeed * timeDelta;
      params.yaw = params.yaw + yawDelta;

      if (targetPitch != null && params.pitch !== targetPitch) {
        var pitchThresh = 0.5 * lastPitchSpeed * lastPitchSpeed / pitchAccel;
        if (Math.abs(targetPitch - params.pitch) > pitchThresh) {
          // Acceleration phase
          currentPitchSpeed = Math.min(lastPitchSpeed + timeDelta * pitchAccel, pitchSpeed);
        } else {
          // Deceleration phase
          currentPitchSpeed = Math.max(lastPitchSpeed - timeDelta * pitchAccel, 0);
        }
        // currentPitchSpeed is the absolute value (>= 0)
        pitchDelta = currentPitchSpeed * timeDelta;
        if (targetPitch < params.pitch) {
          params.pitch = Math.max(targetPitch, params.pitch - pitchDelta);
        }
        if (targetPitch > params.pitch) {
          params.pitch = Math.min(targetPitch, params.pitch + pitchDelta);
        }
      }

      if (targetFov != null && params.fov !== targetPitch) {
        var fovThresh = 0.5 * lastFovSpeed * lastFovSpeed / fovAccel;
        if (Math.abs(targetFov - params.fov) > fovThresh) {
          // Acceleration phase
          currentFovSpeed = Math.min(lastFovSpeed + timeDelta * fovAccel, fovSpeed);
        } else {
          // Deceleration phase
          currentFovSpeed = Math.max(lastFovSpeed - timeDelta * fovAccel, 0);
        }
        // currentFovSpeed is the absolute value (>= 0)
        fovDelta = currentFovSpeed * timeDelta;
        if (targetFov < params.fov) {
          params.fov = Math.max(targetFov, params.fov - fovDelta);
        }
        if (targetFov > params.fov) {
          params.fov = Math.min(targetFov, params.fov + fovDelta);
        }
      }

      lastTime = currentTime;
      lastYawSpeed = currentYawSpeed;
      lastPitchSpeed = currentPitchSpeed;
      lastFovSpeed = currentFovSpeed;

      return params;

    };

  };

}

module.exports = autorotate;
},{"./util/defaults":93}],29:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// TODO: Think about other possibilities for an API to define the Rect.

function calcRect(totalWidth, totalHeight, spec, result) {

  result = result || {};

  var width;
  if (spec != null && spec.absoluteWidth != null) {
    width = spec.absoluteWidth;
  } else if (spec != null && spec.relativeWidth != null) {
    width = spec.relativeWidth * totalWidth;
  } else {
    width = totalWidth;
  }

  var height;
  if (spec && spec.absoluteHeight != null) {
    height = spec.absoluteHeight;
  } else if (spec != null && spec.relativeHeight != null) {
    height = spec.relativeHeight * totalHeight;
  } else {
    height = totalHeight;
  }

  var x;
  if (spec != null && spec.absoluteX != null) {
    x = spec.absoluteX;
  } else if (spec != null && spec.relativeX != null) {
    x = spec.relativeX * totalWidth;
  } else {
    x = 0;
  }

  var y;
  if (spec != null && spec.absoluteY != null) {
    y = spec.absoluteY;
  } else if (spec != null && spec.relativeY != null) {
    y = spec.relativeY * totalHeight;
  } else {
    y = 0;
  }

  result.height = height;
  result.width = width;
  result.left = x;
  result.top = y;
  result.right = x + width;
  result.bottom = y + height;
  result.totalWidth = totalWidth;
  result.totalHeight = totalHeight;

  return result;
}

module.exports = calcRect;
},{}],30:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var mod = require('../util/mod');


// Creates a new LRU map given an equality predicate, hash function and
// maximum size. An LRU map holds up to a maximum number of items, ordered
// by their age. When the addition of an item would cause the maximum size
// to be exceeded, the new item replaces the oldest item in the map.
// As a special case, an LRU map with maximum size 0 always rejects the
// insertion of an item.
function LruMap(equals, hash, maxsize) {

  if (typeof equals !== 'function') {
    throw new Error('LruMap: bad equals function');
  }
  this._equals = equals;

  if (typeof hash !== 'function') {
    throw new Error('LruMap: bad hash function');
  }
  this._hash = hash;

  if (typeof maxsize != 'number' || isNaN(maxsize) || maxsize < 0) {
    throw new Error('LruMap: bad maximum size');
  }
  this._maxsize = maxsize;

  // Keys and values are stored in circular arrays ordered by decreasing age.
  // Pivot is the index where the next insertion will take place.
  this._keys = [];
  this._values = [];
  this._pivot = 0;
}


LruMap.prototype._modulus = function() {
  if (this._maxsize > this._keys.length) {
    return this._keys.length + 1;
  }
  return this._maxsize;
};


// Returns the value associated to the specified key, or null if not found.
LruMap.prototype.get = function(key) {
  for (var i = 0; i < this._keys.length; i++) {
    var elemKey = this._keys[i];
    if (this._equals(key, elemKey)) {
      var elemValue = this._values[i];
      return elemValue;
    }
  }
  return null;
};


// Sets the specified key to the specified value, replacing either an existing
// item with the same key, or the oldest item when the maximum size would be
// exceeded; the added item becomes the newest. Returns the replaced key if it
// does not equal the inserted key, otherwise null.
//
// If the maximum size is 0, do nothing and return the key.
LruMap.prototype.set = function(key, value) {

  var oldest = null;
  var found = false;

  if (this._maxsize === 0) {
    return key;
  }

  for (var i = 0; i < this._keys.length; i++) {
    var elemKey = this._keys[i];
    if (this._equals(key, elemKey)) {
      var j = i;
      var modulus = this._modulus();
      while (j !== this._pivot) {
        var k = mod(j + 1, modulus);
        this._keys[j] = this._keys[k];
        this._values[j] = this._values[k];
        j = k;
      }
      found = true;
      break;
    }
  }

  if (!found) {
    oldest = this._pivot < this._keys.length ? this._keys[this._pivot] : null;
  }

  this._keys[this._pivot] = key;
  this._values[this._pivot] = value;
  this._pivot = mod(this._pivot + 1, this._modulus());

  return oldest;
};


// Removes the item associated with the specified key.
// Returns the removed value, or null if not found.
LruMap.prototype.del = function(key) {
  for (var i = 0; i < this._keys.length; i++) {
    var elemKey = this._keys[i];
    if (this._equals(key, elemKey)) {
      var elemValue = this._values[i];
      for (var j = i; j < this._keys.length - 1; j++) {
        this._keys[j] = this._keys[j + 1];
        this._values[j] = this._values[j + 1];
      }
      this._keys.length = this._keys.length - 1;
      this._values.length = this._values.length - 1;
      if (i < this._pivot) {
        this._pivot = mod(this._pivot - 1, this._modulus());
      }
      return elemValue;
    }
  }
  return null;
};


// Returns whether there is a value associated with the specified key.
LruMap.prototype.has = function(key) {
  for (var i = 0; i < this._keys.length; i++) {
    var elemKey = this._keys[i];
    if (this._equals(key, elemKey)) {
      return true;
    }
  }
  return false;
};


// Returns the number of items in the map.
LruMap.prototype.size = function() {
  return this._keys.length;
};


// Removes all items from the map.
LruMap.prototype.clear = function() {
  this._keys.length = 0;
  this._values.length = 0;
  this._pivot = 0;
};


// Calls fn(key, value) for each item in the map, in an undefined order.
// Returns the number of times fn was called.
// The result is undefined if the map is mutated during iteration.
LruMap.prototype.each = function(fn) {
  var count = 0;
  for (var i = 0; i < this._keys.length; i++) {
    var key = this._keys[i];
    var value = this._values[i];
    fn(key, value);
    count += 1;
  }
  return count;
};


module.exports = LruMap;

},{"../util/mod":101}],31:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var mod = require('../util/mod');


// Creates a new LRU set given an equality predicate, hash function and
// maximum size. An LRU set holds up to a maximum number of items, ordered
// by their age. When the addition of an item would cause the maximum size
// to be exceeded, the new item replaces the oldest item in the set.
// As a special case, an LRU set with maximum size 0 always rejects the
// insertion of an item.
function LruSet(equals, hash, maxsize) {

  if (typeof equals !== 'function') {
    throw new Error('LruSet: bad equals function');
  }
  this._equals = equals;

  if (typeof hash !== 'function') {
    throw new Error('LruSet: bad hash function');
  }
  this._hash = hash;

  if (typeof maxsize != 'number' || isNaN(maxsize) || maxsize < 0) {
    throw new Error('LruSet: bad maximum size');
  }
  this._maxsize = maxsize;

  // Items are stored in a circular array ordered by decreasing age.
  // Pivot is the index where the next insertion will take place.
  this._items = [];
  this._pivot = 0;
}


LruSet.prototype._modulus = function() {
  if (this._maxsize > this._items.length) {
    return this._items.length + 1;
  }
  return this._maxsize;
};


// Adds an item, replacing either an existing equal item, or the oldest item
// when the maximum size would be exceeded; the added item becomes the newest.
// Returns the replaced item if it does not equal the inserted item, otherwise
// null.
//
// If the maximum size is 0, do nothing and return the item.
LruSet.prototype.add = function(item) {

  var oldest = null;
  var found = false;

  if (this._maxsize === 0) {
    return item;
  }

  for (var i = 0; i < this._items.length; i++) {
    var elem = this._items[i];
    if (this._equals(item, elem)) {
      var j = i;
      var modulus = this._modulus();
      while (j !== this._pivot) {
        var k = mod(j + 1, modulus);
        this._items[j] = this._items[k];
        j = k;
      }
      found = true;
      break;
    }
  }

  if (!found) {
    oldest = this._pivot < this._items.length ? this._items[this._pivot] : null;
  }

  this._items[this._pivot] = item;
  this._pivot = mod(this._pivot + 1, this._modulus());

  return oldest;
};


// Removes an item.
// Returns the removed item, or null if the item was not found.
LruSet.prototype.remove = function(item) {
  for (var i = 0; i < this._items.length; i++) {
    var elem = this._items[i];
    if (this._equals(item, elem)) {
      for (var j = i; j < this._items.length - 1; j++) {
        this._items[j] = this._items[j + 1];
      }
      this._items.length = this._items.length - 1;
      if (i < this._pivot) {
        this._pivot = mod(this._pivot - 1, this._modulus());
      }
      return elem;
    }
  }
  return null;
};


// Returns whether an item is in the set.
LruSet.prototype.has = function(item) {
  for (var i = 0; i < this._items.length; i++) {
    var elem = this._items[i];
    if (this._equals(item, elem)) {
      return true;
    }
  }
  return false;
};


// Returns the number of items in the set.
LruSet.prototype.size = function() {
  return this._items.length;
};


// Removes all items from the set.
LruSet.prototype.clear = function() {
  this._items.length = 0;
  this._pivot = 0;
};


// Calls fn(item) for each item in the set, in an undefined order.
// Returns the number of times fn was called.
// The result is undefined if the set is mutated during iteration.
LruSet.prototype.each = function(fn) {
  var count = 0;
  for (var i = 0; i < this._items.length; i++) {
    var item = this._items[i];
    fn(item);
    count += 1;
  }
  return count;
};


module.exports = LruSet;

},{"../util/mod":101}],32:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var defaultBuckets = 32;


// Creates a new map given an equality predicate and hash function.
function Map(equals, hash, nbuckets) {

  if (typeof equals !== 'function') {
    throw new Error('Map: bad equals function');
  }
  this._equals = equals;

  if (typeof hash !== 'function') {
    throw new Error('Map: bad hash function');
  }
  this._hash = hash;

  if (nbuckets != null) {
    if (typeof nbuckets != 'number' || isNaN(nbuckets) || nbuckets < 1) {
      throw new Error('Map: bad number of buckets');
    }
    this._nbuckets = nbuckets;
  } else {
    this._nbuckets = defaultBuckets;
  }

  this._keyBuckets = [];
  this._valBuckets = [];
  for (var i = 0; i < this._nbuckets; i++) {
    this._keyBuckets.push([]);
    this._valBuckets.push([]);
  }

}


Map.prototype._hashmod = function(x) {
  return this._hash(x) % this._nbuckets;
};


// Returns the value associated to the specified key, or null if not found.
Map.prototype.get = function(key) {
  var h = this._hashmod(key);
  var keyBucket = this._keyBuckets[h];
  for (var i = 0; i < keyBucket.length; i++) {
    var elemKey = keyBucket[i];
    if (this._equals(key, elemKey)) {
      var valBucket = this._valBuckets[h];
      var elemValue = valBucket[i];
      return elemValue;
    }
  }
  return null;
};


// Sets the specified key to the specified value, replacing the previous value.
// Returns the replaced value, or null if no value was replaced.
Map.prototype.set = function(key, val) {
  var h = this._hashmod(key);
  var keyBucket = this._keyBuckets[h];
  var valBucket = this._valBuckets[h];
  for (var i = 0; i < keyBucket.length; i++) {
    var elemKey = keyBucket[i];
    if (this._equals(key, elemKey)) {
      var elemVal = valBucket[i];
      keyBucket[i] = key;
      valBucket[i] = val;
      return elemVal;
    }
  }
  keyBucket.push(key);
  valBucket.push(val);
  return null;
};


// Removes the item associated with the specified key.
// Returns the removed value, or null if not found.
Map.prototype.del = function(key) {
  var h = this._hashmod(key);
  var keyBucket = this._keyBuckets[h];
  var valBucket = this._valBuckets[h];
  for (var i = 0; i < keyBucket.length; i++) {
    var elemKey = keyBucket[i];
    if (this._equals(key, elemKey)) {
      var elemVal = valBucket[i];
      // Splice manually to avoid Array#splice return value allocation.
      for (var j = i; j < keyBucket.length - 1; j++) {
        keyBucket[j] = keyBucket[j+1];
        valBucket[j] = valBucket[j+1];
      }
      keyBucket.length = keyBucket.length - 1;
      valBucket.length = valBucket.length - 1;
      return elemVal;
    }
  }
  return null;
};


// Returns whether there is a value associated with the specified key.
Map.prototype.has = function(key) {
  var h = this._hashmod(key);
  var keyBucket = this._keyBuckets[h];
  for (var i = 0; i < keyBucket.length; i++) {
    var elemKey = keyBucket[i];
    if (this._equals(key, elemKey)) {
      return true;
    }
  }
  return false;
};


// Returns the number of items in the map.
Map.prototype.size = function() {
  var size = 0;
  for (var i = 0; i < this._nbuckets; i++) {
    var keyBucket = this._keyBuckets[i];
    size += keyBucket.length;
  }
  return size;
};


// Removes all items from the map.
Map.prototype.clear = function() {
  for (var i = 0; i < this._nbuckets; i++) {
    var keyBucket = this._keyBuckets[i];
    var valBucket = this._valBuckets[i];
    keyBucket.length = 0;
    valBucket.length = 0;
  }
};


// Calls fn(key, value) for each item in the map, in an undefined order.
// Returns the number of times fn was called.
// The result is undefined if the map is mutated during iteration.
Map.prototype.each = function(fn) {
  var count = 0;
  for (var i = 0; i < this._nbuckets; i++) {
    var keyBucket = this._keyBuckets[i];
    var valBucket = this._valBuckets[i];
    for (var j = 0; j < keyBucket.length; j++) {
      var key = keyBucket[j];
      var val = valBucket[j];
      fn(key, val);
      count += 1;
    }
  }
  return count;
};


module.exports = Map;

},{}],33:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var defaultBuckets = 32;


// Creates a new set given an equality predicate and hash function.
function Set(equals, hash, nbuckets) {

  if (typeof equals !== 'function') {
    throw new Error('Set: bad equals function');
  }
  this._equals = equals;

  if (typeof hash !== 'function') {
    throw new Error('Set: bad hash function');
  }
  this._hash = hash;

  if (nbuckets != null) {
    if (typeof nbuckets != 'number' || isNaN(nbuckets) || nbuckets < 1) {
      throw new Error('Set: bad number of buckets');
    }
    this._nbuckets = nbuckets;
  } else {
    this._nbuckets = defaultBuckets;
  }

  this._buckets = [];
  for (var i = 0; i < this._nbuckets; i++) {
    this._buckets.push([]);
  }

}


Set.prototype._hashmod = function(x) {
  return this._hash(x) % this._nbuckets;
};


// Adds an item, replacing an existing item.
// Returns the replaced item, or null if no item was replaced.
Set.prototype.add = function(item) {
  var h = this._hashmod(item);
  var bucket = this._buckets[h];
  for (var i = 0; i < bucket.length; i++) {
    var elem = bucket[i];
    if (this._equals(item, elem)) {
      bucket[i] = item;
      return elem;
    }
  }
  bucket.push(item);
  return null;
};


// Removes an item.
// Returns the removed item, or null if the item was not found.
Set.prototype.remove = function(item) {
  var h = this._hashmod(item);
  var bucket = this._buckets[h];
  for (var i = 0; i < bucket.length; i++) {
    var elem = bucket[i];
    if (this._equals(item, elem)) {
      // Splice manually to avoid Array#splice return value allocation.
      for (var j = i; j < bucket.length - 1; j++) {
        bucket[j] = bucket[j+1];
      }
      bucket.length = bucket.length - 1;
      return elem;
    }
  }
  return null;
};


// Returns whether an item is in the set.
Set.prototype.has = function(item) {
  var h = this._hashmod(item);
  var bucket = this._buckets[h];
  for (var i = 0; i < bucket.length; i++) {
    var elem = bucket[i];
    if (this._equals(item, elem)) {
      return true;
    }
  }
  return false;
};


// Returns the number of items in the set.
Set.prototype.size = function() {
  var size = 0;
  for (var i = 0; i < this._nbuckets; i++) {
    var bucket = this._buckets[i];
    size += bucket.length;
  }
  return size;
};


// Removes all items.
Set.prototype.clear = function() {
  for (var i = 0; i < this._nbuckets; i++) {
    var bucket = this._buckets[i];
    bucket.length = 0;
  }
};


// Calls fn(item) for each item in the set, in an undefined order.
// Returns the number of times fn was called.
// The result is undefined if the set is mutated during iteration.
Set.prototype.each = function(fn) {
  var count = 0;
  for (var i = 0; i < this._nbuckets; i++) {
    var bucket = this._buckets[i];
    for (var j = 0; j < bucket.length; j++) {
      var item = bucket[j];
      fn(item);
      count += 1;
    }
  }
  return count;
};


module.exports = Set;

},{}],34:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var WorkQueue = require('./WorkQueue');
var mod = require('../util/mod');


function WorkPool(opts) {
  this._concurrency = opts && opts.concurrency || 1;
  this._paused = opts && !!opts.paused || false;

  this._pool = [];
  for (var i = 0; i < this._concurrency; i++) {
    this._pool.push(new WorkQueue(opts));
  }

  this._next = 0;
}


WorkPool.prototype.length = function() {
  var len = 0;
  for (var i = 0; i < this._pool.length; i++) {
    len += this._pool[i].length();
  }
  return len;
};


WorkPool.prototype.push = function(fn, cb) {
  var i = this._next;
  var cancel = this._pool[i].push(fn, cb);
  this._next = mod(this._next + 1, this._concurrency);
  return cancel;
};


WorkPool.prototype.pause = function() {
  if (!this._paused) {
    this._paused = true;
    for (var i = 0; i < this._concurrency; i++) {
      this._pool[i].pause();
    }
  }
};


WorkPool.prototype.resume = function() {
  if (this._paused) {
    this._paused = false;
    for (var i = 0; i < this._concurrency; i++) {
      this._pool[i].resume();
    }
  }
};


module.exports = WorkPool;

},{"../util/mod":101,"./WorkQueue":35}],35:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var clock = require('../util/clock');


function WorkTask(fn, cb) {
  this.fn = fn;
  this.cb = cb;
  this.cfn = null;
}


function WorkQueue(opts) {
  this._queue = [];
  this._delay = opts && opts.delay || 0;
  this._paused = opts && !!opts.paused || false;
  this._currentTask = null;
  this._lastFinished = null;
}


WorkQueue.prototype.length = function() {
  return this._queue.length;
};


WorkQueue.prototype.push = function(fn, cb) {

  var task = new WorkTask(fn, cb);

  var cancel = this._cancel.bind(this, task);

  // Push the task into the queue.
  this._queue.push(task);

  // Run the task if idle.
  this._next();

  return cancel;

};


WorkQueue.prototype.pause = function() {
  if (!this._paused) {
    this._paused = true;
  }
};


WorkQueue.prototype.resume = function() {
  if (this._paused) {
    this._paused = false;
    this._next();
  }
};


WorkQueue.prototype._start = function(task) {

  // Consistency check.
  if (this._currentTask) {
    throw new Error('WorkQueue: called start while running task');
  }

  // Mark queue as busy, so that concurrent tasks wait.
  this._currentTask = task;

  // Execute the task.
  var finish = this._finish.bind(this, task);
  task.cfn = task.fn(finish);

  // Detect when a non-cancellable function has been queued.
  if (typeof task.cfn !== 'function') {
    throw new Error('WorkQueue: function is not cancellable');
  }

};


WorkQueue.prototype._finish = function(task) {

  var args = Array.prototype.slice.call(arguments, 1);

  // Consistency check.
  if (this._currentTask !== task) {
    throw new Error('WorkQueue: called finish on wrong task');
  }

  // Call the task callback on the return values.
  task.cb.apply(null, args);

  // Mark as not busy and record task finish time, then advance to next task.
  this._currentTask = null;
  this._lastFinished = clock();
  this._next();

};


WorkQueue.prototype._cancel = function(task) {

  var args = Array.prototype.slice.call(arguments, 1);

  if (this._currentTask === task) {

    // Cancel running task. Because cancel passes control to the _finish
    // callback we passed into fn, the cleanup logic will be handled there.
    task.cfn.apply(null, args);

  } else {

    // Remove task from queue.
    var pos = this._queue.indexOf(task);
    if (pos >= 0) {
      this._queue.splice(pos, 1);
      task.cb.apply(null, args);
    }

  }

};


WorkQueue.prototype._next = function() {

  if (this._paused) {
    // Do not start tasks while paused.
    return;
  }

  if (!this._queue.length) {
    // No tasks to run.
    return;
  }

  if (this._currentTask) {
    // Will be called again when the current task finishes.
    return;
  }

  if (this._lastFinished != null) {
    var elapsed = clock() - this._lastFinished;
    var remaining = this._delay - elapsed;
    if (remaining > 0) {
      // Too soon. Run again after the inter-task delay.
      setTimeout(this._next.bind(this), remaining);
      return;
    }
  }

  // Run the next task.
  var task = this._queue.shift();
  this._start(task);

};


module.exports = WorkQueue;

},{"../util/clock":88}],36:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var vec4 = require('gl-matrix/src/gl-matrix/vec4');
var mat4 = require('gl-matrix/src/gl-matrix/mat4');

/**
 * Helper functions for color transformation {@link Effects}.
 *
 * References:
 *
 *   - [ColorMatrix Guide](http://docs.rainmeter.net/tips/colormatrix-guide)
 *   - [Matrix Operations for Image Processing](http://www.graficaobscura.com/matrix/index.html)
 *   - [WebGLImageFilter](https://github.com/phoboslab/WebGLImageFilter)
 *   - [glfx.js](https://github.com/evanw/glfx.js)
 *
 * @namespace colorEffects
 */

/**
 * A vector and matrix corresponding to an identity transformation.
 *
 * @param {Object} result Object to store result
 * @param {vec4} result.colorOffset Array with zeroes.
 * @param {mat4} result.colorMatrix Identity matrix.
 *
 * @memberof colorEffects
 */
function identity(resultArg) {
  var result = resultArg || {};
  result.colorOffset = result.colorOffset || vec4.create();
  result.colorMatrix = result.colorMatrix || mat4.create();
  return result;
}

/**
 * Apply color effects to a single pixel
 *
 * @param {vec4} pixel Values in range [0,1]
 * @param {Object} effect
 * @param {vec4} effect.colorOffset
 * @param {mat4} effect.colorMatrix
 * @param {vec4} result Object to store result
 *
 * @memberof colorEffects
 */
function applyToPixel(pixel, effect, result) {
  vec4TransformMat4Transposed(result, pixel, effect.colorMatrix);
  vec4.add(result, result, effect.colorOffset);
}

// Oddly, the colorTransform matrix needs to be transposed to be used with
// vec4.transformMat4. It is strange that transformMat4 dosn't work the same
// way as multiplying on the shader.
// TODO: investigate this further
function vec4TransformMat4Transposed(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[1] * y + m[2] * z + m[3] * w;
  out[1] = m[4] * x + m[5] * y + m[6] * z + m[7] * w;
  out[2] = m[8] * x + m[9] * y + m[10] * z + m[11] * w;
  out[3] = m[12] * x + m[13] * y + m[14] * z + m[15] * w;
  return out;
}

/**
 * Apply color effects to an ImageData
 *
 * @param {ImageData} imageData This object will be mutated
 * @param {Object} effect
 * @param {vec4} effect.colorOffset
 * @param {mat4} effect.colorMatrix
 *
 * @memberof colorEffects
 */
var tmpPixel = vec4.create();
function applyToImageData(imageData, effect) {
  var width = imageData.width;
  var height = imageData.height;
  var data = imageData.data;

  for(var i = 0; i < width * height; i++) {
    vec4.set(tmpPixel, data[i*4+0]/255, data[i*4+1]/255, data[i*4+2]/255, data[i*4+3]/255);
    applyToPixel(tmpPixel, effect, tmpPixel);
    data[i*4+0] = tmpPixel[0]*255;
    data[i*4+1] = tmpPixel[1]*255;
    data[i*4+2] = tmpPixel[2]*255;
    data[i*4+3] = tmpPixel[3]*255;
  }
}

module.exports = {
  identity: identity,
  applyToPixel: applyToPixel,
  applyToImageData: applyToImageData
};

},{"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec4":11}],37:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var Dynamics = require('./Dynamics');
var defaultClock = require('../util/clock');

/**
 * @class
 * @classdesc Combines changes in parameters triggered by multiple
 * {@link ControlMethod} instances.
 *
 * @listens ControlMethod#parameterDynamics
 */
function ControlComposer(opts) {
  opts = opts || {};

  this._methods = [];

  this._parameters = [ 'x' ,'y', 'axisScaledX', 'axisScaledY', 'zoom', 'yaw', 'pitch', 'roll' ];

  this._clock = opts.clock || defaultClock;

  this._composedOffsets = { };

  this._composeReturn = { offsets: this._composedOffsets, changing: null };
}

eventEmitter(ControlComposer);


ControlComposer.prototype.add = function(instance) {
  if (this.has(instance)) {
    return;
  }

  var dynamics = {};
  this._parameters.forEach(function(parameter) {
    dynamics[parameter] = {
      dynamics: new Dynamics(),
      time: null
    };
  });

  var parameterDynamicsHandler = this._updateDynamics.bind(this, dynamics);

  var method = {
    instance: instance,
    dynamics: dynamics,
    parameterDynamicsHandler: parameterDynamicsHandler
  };

  instance.addEventListener('parameterDynamics', parameterDynamicsHandler);

  this._methods.push(method);
};


ControlComposer.prototype.remove = function(instance) {
  var index = this._indexOfInstance(instance);
  if (index >= 0) {
    var method = this._methods.splice(index, 1)[0];
    method.instance.removeEventListener('parameterDynamics', method.parameterDynamicsHandler);
  }
};


ControlComposer.prototype.has = function(instance) {
  return this._indexOfInstance(instance) >= 0;
};


ControlComposer.prototype._indexOfInstance = function(instance) {
  for (var i = 0; i < this._methods.length; i++) {
    if (this._methods[i].instance === instance) {
      return i;
    }
  }
  return -1;
};


ControlComposer.prototype.list = function() {
  var instances = [];
  for (var i = 0; i < this._methods.length; i++) {
    instances.push(this._methods[i].instance);
  }
  return instances;
};


ControlComposer.prototype._updateDynamics = function(storedDynamics, event, parameter, dynamics) {
  var parameterDynamics = storedDynamics[parameter];

  if (!parameterDynamics) {
    throw new Error("Unknown control parameter " + parameter);
  }

  var newTime = this._clock();
  parameterDynamics.dynamics.update(dynamics, (newTime - parameterDynamics.time)/1000);
  parameterDynamics.time = newTime;

  this.emit('change');
};


ControlComposer.prototype._resetComposedOffsets = function() {
  for (var i = 0; i < this._parameters.length; i++) {
    this._composedOffsets[this._parameters[i]] = 0;
  }
};


ControlComposer.prototype.offsets = function() {
  var parameter;
  var changing = false;

  var currentTime = this._clock();

  this._resetComposedOffsets();

  for (var i = 0; i < this._methods.length; i++) {
    var methodDynamics = this._methods[i].dynamics;

    for (var p = 0; p < this._parameters.length; p++) {
      parameter = this._parameters[p];
      var parameterDynamics = methodDynamics[parameter];
      var dynamics = parameterDynamics.dynamics;


      // Add offset to composed offset
      if (dynamics.offset != null) {
        this._composedOffsets[parameter] += dynamics.offset;
        // Reset offset
        dynamics.offset = null;
      }

      // Calculate offset from velocity and add it
      var elapsed = (currentTime - parameterDynamics.time)/1000;
      var offsetFromVelocity = dynamics.offsetFromVelocity(elapsed);
      
      if(offsetFromVelocity) {
        this._composedOffsets[parameter] += offsetFromVelocity;
      }

      // Update velocity on dynamics
      var currentVelocity = dynamics.velocityAfter(elapsed);
      dynamics.velocity = currentVelocity;

      // If there is still a velocity, set changing
      if(currentVelocity) {
        changing = true;
      }

      parameterDynamics.time = currentTime;
    }
  }

  this._composeReturn.changing = changing;
  return this._composeReturn;
};


ControlComposer.prototype.destroy = function() {
  var instances = this.list();
  for (var i = 0; i < instances.length; i++) {
    this.remove(instances[i]);
  }

  this._methods = null;
};


module.exports = ControlComposer;
},{"../util/clock":88,"./Dynamics":41,"minimal-event-emitter":13}],38:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Composer = require('./Composer');
var eventEmitter = require('minimal-event-emitter');

var debug = typeof MARZIPANODEBUG !== 'undefined' && MARZIPANODEBUG.controls;

/**
 * @class
 * @classdesc Set of controls which affect a view (e.g. keyboard, touch)
 *
 * {@link ControlMethod} instances can be registered on this class. The methods
 * are then combined to calculate the final parameters to change the {@link View}.
 *
 * Controls is attached to a {@link RenderLoop}. Currently it affects the
 * {@link view} of all {@link Layer} on the {@link Stage} of the
 * {@link RenderLoop} it is attached to. A more flexible API may be provided
 * in the future.
 *
 * The ControlMethod instances are registered with an id and may be enabled,
 * disabled and unregistered using that id. The whole Control can also be
 * enabled or disabled.
 *
 */
function Controls(opts) {
  opts = opts || {};

  this._methods = {};
  this._methodGroups = {};
  this._composer = new Composer();

  // Whether the controls are enabled.
  this._enabled = (opts && opts.enabled) ? !!opts.enabled : true;

  // How many control methods are enabled and in the active state.
  this._activeCount = 0;

  this._attachedRenderLoop = null;
}

eventEmitter(Controls);

/**
 * @return {ControlMethod[]} List of registered @{link ControlMethod instances}
 */
Controls.prototype.methods = function() {
  var obj = {};
  for (var id in this._methods) {
    obj[id] = this._methods[id];
  }
  return obj;
};

/**
 * @param {String} id
 * @return {ControlMethod}
 */
Controls.prototype.method = function(id) {
  return this._methods[id];
};

/**
 * @param {String} id
 * @param {ControlMethod} instance
 * @param {Boolean} [enable=false]
 */
Controls.prototype.registerMethod = function(id, instance, enable) {
  if (this._methods[id]) {
    throw new Error('Control method already registered with id ' + id);
  }

  this._methods[id] = {
    instance: instance,
    enabled: false,
    active: false,
    activeHandler: this._handleActive.bind(this, id),
    inactiveHandler: this._handleInactive.bind(this, id)
  };

  if(enable) {
    this.enableMethod(id, instance);
  }
};


/**
 * @param {String} id
 */
Controls.prototype.unregisterMethod = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('No control method registered with id ' + id);
  }
  if (method.enabled) {
    this.disableMethod(id);
  }
  delete this._methods[id];
};

/**
 * @param {String} id
 */
Controls.prototype.enableMethod = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('No control method registered with id ' + id);
  }
  if (!method.enabled) {
    method.enabled = true;
    if (method.active) {
      this._incrementActiveCount();
    }
    this._listen(id);
    this._updateComposer();
    this.emit('methodEnabled', id);
  }
};


/**
 * @param {String} id
 */
Controls.prototype.disableMethod = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('No control method registered with id ' + id);
  }
  if (method.enabled) {
    method.enabled = false;
    if (method.active) {
      this._decrementActiveCount();
    }
    this._unlisten(id);
    this._updateComposer();
    this.emit('methodDisabled', id);
  }
};


/**
 * Create a method group, which can be used to more conveniently enable or
 * disable several control methods at once
 * @param {String} groupId
 * @param {String[]} methodIds
 */
Controls.prototype.addMethodGroup = function(groupId, methodIds) {
  this._methodGroups[groupId] = methodIds;
}

/**
 * @param {String} groupId
 */
Controls.prototype.removeMethodGroup = function(id) {
  delete this._methodGroups[id];
}

/**
 * @return {ControlMethodGroup[]} List of control method groups
 */
Controls.prototype.methodGroups = function() {
  var obj = {};
  for (var id in this._methodGroups) {
    obj[id] = this._methodGroups[id];
  }
  return obj;
}

/**
 * Enables all the control methods in the group
 * @param {String} groupId
 */
Controls.prototype.enableMethodGroup = function(id) {
  var self = this;
  self._methodGroups[id].forEach(function(methodId) {
    self.enableMethod(methodId);
  });
}

/**
 * Disables all the control methods in the group
 * @param {String} groupId
 */
Controls.prototype.disableMethodGroup = function(id) {
  var self = this;
  self._methodGroups[id].forEach(function(methodId) {
    self.disableMethod(methodId);
  });
}

/**
 * @returns {Boolean}
 */
Controls.prototype.enabled = function() {
  return this._enabled;
};

/**
 * Enables the controls
 */
Controls.prototype.enable = function() {
  this._enabled = true;
  if (this._activeCount > 0) {
    this.emit('active');
  }
  this.emit('enabled');
  this._updateComposer();
};


/**
 * Disables the controls
 */
Controls.prototype.disable = function() {
  this._enabled = false;
  if (this._activeCount > 0) {
    this.emit('inactive');
  }
  this.emit('disabled');
  this._updateComposer();
};



/**
 * Attaches the controls to a {@link RenderLoop}. The RenderLoop will be woken
 * up when the controls are activated
 *
 * @param {RenderLoop}
 */
Controls.prototype.attach = function(renderLoop) {
  if (this._attachedRenderLoop) {
    this.detach();
  }

  this._attachedRenderLoop = renderLoop;
  this._beforeRenderHandler = this._updateViewsWithControls.bind(this);
  this._changeHandler = renderLoop.renderOnNextFrame.bind(renderLoop);

  this._attachedRenderLoop.addEventListener('beforeRender', this._beforeRenderHandler);
  this._composer.addEventListener('change', this._changeHandler);
};

/**
 * Detaches the controls
 */
Controls.prototype.detach = function() {
  if (!this._attachedRenderLoop) {
    return;
  }

  this._attachedRenderLoop.removeEventListener('beforeRender', this._beforeRenderHandler);
  this._composer.removeEventListener('change', this._changeHandler);

  this._beforeRenderHandler = null;
  this._changeHandler = null;
  this._attachedRenderLoop = null;
};

/**
 * @param {Boolean}
 */
Controls.prototype.attached = function() {
  return this._attachedRenderLoop != null;
};


Controls.prototype._listen = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('Bad method id');
  }
  method.instance.addEventListener('active', method.activeHandler);
  method.instance.addEventListener('inactive', method.inactiveHandler);
};


Controls.prototype._unlisten = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('Bad method id');
  }
  method.instance.removeEventListener('active', method.activeHandler);
  method.instance.removeEventListener('inactive', method.inactiveHandler);
};


Controls.prototype._handleActive = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('Bad method id');
  }
  if (!method.enabled) {
    throw new Error('Should not receive event from disabled control method');
  }
  if (!method.active) {
    method.active = true;
    this._incrementActiveCount();
  }
};


Controls.prototype._handleInactive = function(id) {
  var method = this._methods[id];
  if (!method) {
    throw new Error('Bad method id');
  }
  if (!method.enabled) {
    throw new Error('Should not receive event from disabled control method');
  }
  if (method.active) {
    method.active = false;
    this._decrementActiveCount();
  }
};


Controls.prototype._incrementActiveCount = function() {
  this._activeCount++;
  if (debug) {
    this._checkActiveCount();
  }
  if (this._enabled && this._activeCount === 1) {
    this.emit('active');
  }
};


Controls.prototype._decrementActiveCount = function() {
  this._activeCount--;
  if (debug) {
    this._checkActiveCount();
  }
  if (this._enabled && this._activeCount === 0) {
    this.emit('inactive');
  }
};


Controls.prototype._checkActiveCount = function() {
  var count = 0;
  for (var id in this._methods) {
    var method = this._methods[id];
    if (method.enabled && method.active) {
      count++;
    }
  }
  if (count != this._activeCount) {
    throw new Error('Bad control state');
  }
};


Controls.prototype._updateComposer = function() {
  var composer = this._composer;

  for (var id in this._methods) {
    var method = this._methods[id];
    var enabled = this._enabled && method.enabled;

    if (enabled && !composer.has(method.instance)) {
      composer.add(method.instance);
    }
    if (!enabled && composer.has(method.instance)) {
      composer.remove(method.instance);
    }
  }
};


Controls.prototype._updateViewsWithControls = function() {
  var controlData = this._composer.offsets();
  if (controlData.changing) {
    this._attachedRenderLoop.renderOnNextFrame();
  }

  var layers = this._attachedRenderLoop.stage().listLayers();
  for (var i = 0; i < layers.length; i++) {
    layers[i].view().updateWithControlParameters(controlData.offsets);
  }
};


/**
 * Destroys the instance
 */
Controls.prototype.destroy = function() {
  this.detach();
  this._composer.destroy();
  this._methods = null;
};


module.exports = Controls;
},{"./Composer":37,"minimal-event-emitter":13}],39:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var HammerGestures = require('./HammerGestures');
var defaults = require('../util/defaults');
var eventEmitter = require('minimal-event-emitter');
var maxFriction = require('./util').maxFriction;

var defaultOptions = {
  friction: 6,
  maxFrictionTime: 0.3
};

var debug = typeof MARZIPANODEBUG !== 'undefined' && MARZIPANODEBUG.controls;

/**
 * @class
 * @classdesc Control the view by clicking/tapping and dragging.
 *
 * @implements ControlMethod
 *
 * @param {Element} element Element to listen for events.
 * @param {string} pointerType Which Hammer.js pointer type to use (e.g.
 * `mouse` or `touch`).
 * @param {Object} opts
 * @param {number} opts.friction
 * @param {number} opts.maxFrictionTime
 */
function DragControlMethod(element, pointerType, opts) {
  this._element = element;

  this._opts = defaults(opts || {}, defaultOptions);

  this._startEvent = null;
  this._lastEvent = null;

  this._active = false;

  this._dynamics = {
    x: new Dynamics(),
    y: new Dynamics()
  };

  this._hammer = HammerGestures.get(element, pointerType);

  this._hammer.on("hammer.input", this._handleHammerEvent.bind(this));

  this._hammer.on('panstart', this._handleStart.bind(this));
  this._hammer.on('panmove', this._handleMove.bind(this));
  this._hammer.on('panend', this._handleEnd.bind(this));
  this._hammer.on('pancancel', this._handleEnd.bind(this));

}

eventEmitter(DragControlMethod);

/**
 * Destroy the instance
 */
DragControlMethod.prototype.destroy = function() {
  // TODO: remove event handlers

  this._hammer.release();

  this._element = null;
  this._opts = null;
  this._startEvent = null;
  this._lastEvent = null;
  this._active = null;
  this._dynamics = null;
  this._hammer = null;
};

DragControlMethod.prototype._handleHammerEvent = function(e) {
  if (e.isFirst) {
    if (debug && this._active) {
      throw new Error('DragControlMethod active detected when already active');
    }
    this._active = true;
    this.emit('active');
  }
  if (e.isFinal) {
    if (debug && !this._active) {
      throw new Error('DragControlMethod inactive detected when already inactive');
    }
    this._active = false;
    this.emit('inactive');
  }
};

DragControlMethod.prototype._handleStart = function(e) {
  // Prevent this event from dragging other DOM elements, causing
  // unexpected behavior on Chrome.
  e.preventDefault();

  this._startEvent = e;
};


DragControlMethod.prototype._handleMove = function(e) {
  // Prevent this event from dragging other DOM elements, causing
  // unexpected behavior on Chrome.
  e.preventDefault();

  if (this._startEvent) {
    this._updateDynamicsMove(e);
    this.emit('parameterDynamics', 'axisScaledX', this._dynamics.x);
    this.emit('parameterDynamics', 'axisScaledY', this._dynamics.y);
  }
};


DragControlMethod.prototype._handleEnd = function(e) {
  // Prevent this event from dragging other DOM elements, causing
  // unexpected behavior on Chrome.
  e.preventDefault();

  if (this._startEvent) {
    this._updateDynamicsRelease(e);
    this.emit('parameterDynamics', 'axisScaledX', this._dynamics.x);
    this.emit('parameterDynamics', 'axisScaledY', this._dynamics.y);
  }

  this._startEvent = false;
  this._lastEvent = false;
};


DragControlMethod.prototype._updateDynamicsMove = function(e) {
  var x = e.deltaX;
  var y = e.deltaY;

  // When a second finger touches the screen, panstart sometimes has a large
  // offset at start; subtract that offset to prevent a sudden jump.
  var eventToSubtract = this._lastEvent || this._startEvent;

  if (eventToSubtract) {
    x -= eventToSubtract.deltaX;
    y -= eventToSubtract.deltaY;
  }

  var elementRect = this._element.getBoundingClientRect();
  var width = elementRect.right - elementRect.left;
  var height = elementRect.bottom - elementRect.top;

  x /= width;
  y /= height;

  this._dynamics.x.reset();
  this._dynamics.y.reset();
  this._dynamics.x.offset = -x;
  this._dynamics.y.offset = -y;

  this._lastEvent = e;
};


var tmpReleaseFriction = [ null, null ];
DragControlMethod.prototype._updateDynamicsRelease = function(e) {
  var elementRect = this._element.getBoundingClientRect();
  var width = elementRect.right - elementRect.left;
  var height = elementRect.bottom - elementRect.top;

  var x = 1000 * e.velocityX / width;
  var y = 1000 * e.velocityY / height;

  this._dynamics.x.reset();
  this._dynamics.y.reset();
  this._dynamics.x.velocity = x;
  this._dynamics.y.velocity = y;

  maxFriction(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, tmpReleaseFriction);
  this._dynamics.x.friction = tmpReleaseFriction[0];
  this._dynamics.y.friction = tmpReleaseFriction[1];
};


module.exports = DragControlMethod;
},{"../util/defaults":93,"./Dynamics":41,"./HammerGestures":43,"./util":51,"minimal-event-emitter":13}],40:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @class
 * @classdesc Changes the cursor when a {@link ControlMethod) is active.
 * By default this is used with the drag control method.
 *
 * @param {Controls} controls Controls instance containing the control method.
 * @param {string} id ID of the control method. 
 * @param {Element} element DOM element where the cursor should change.
 * @param {Object} opts
 * @param {Array<string>} [opts.active=[ 'move' ]] Cursors to use when active.
 * @param {Array<string>} [opts.inactive=[ 'default' ]] Cursors to use when
 * inactive.
 * @param {Array<string>} [opts.disabled=[ 'null' ]] Cursors to use when
 * disabled.
 */
function DragCursor(controls, id, element, opts) {
  opts = opts || {};
  opts.active = [ 'move' ];
  opts.inactive = [ 'default' ];
  opts.disabled = [ null ];

  this._controls = controls;
  this._id = id;

  this._attached = false;

  this._setActiveCursor = setCursor.bind(null, element, opts.active);
  this._setInactiveCursor = setCursor.bind(null, element, opts.inactive);
  this._setDisabledCursor = setCursor.bind(null, element, opts.disabled);


  if(controls.method(id).enabled) {
    this._attachCursor(controls.method(id));
  }


  this._enableChangeHandler = this._updateAttach.bind(this);

  controls.addEventListener('methodEnabled', this._enableChangeHandler);
  controls.addEventListener('methodDisabled', this._enableChangeHandler);
  controls.addEventListener('enabled', this._enableChangeHandler);
  controls.addEventListener('disabled', this._enableChangeHandler);
}

/**
 * Destroy the instance
 */
DragCursor.prototype.destroy = function() {
  this._detachCursor(this._controls.method(this._id));
  this._controls.removeEventListener('methodEnabled', this._enableChangeHandler);
  this._controls.removeEventListener('methodDisabled', this._enableChangeHandler);
  this._controls.removeEventListener('enabled', this._enableChangeHandler);
  this._controls.removeEventListener('disabled', this._enableChangeHandler);
};

DragCursor.prototype._updateAttach = function() {
  var controls = this._controls;
  var id = this._id;
  if(controls.enabled() && controls.method(id).enabled) {
    this._attachCursor(controls.method(id));
  }
  else {
    this._detachCursor(controls.method(id));
  }
};

DragCursor.prototype._attachCursor = function(dragControlMethod) {
  if(!this._attached) {
    dragControlMethod.instance.addEventListener('active', this._setActiveCursor);
    dragControlMethod.instance.addEventListener('inactive', this._setInactiveCursor);

    if(dragControlMethod.active) {
      this._setActiveCursor();
    }
    else {
      this._setInactiveCursor();
    }

    this._attached = true;
    
  }
};

DragCursor.prototype._detachCursor = function(dragControlMethod) {
  if(this._attached) {
    dragControlMethod.instance.removeEventListener('active', this._setActiveCursor);
    dragControlMethod.instance.removeEventListener('inactive', this._setInactiveCursor);
    this._setDisabledCursor();

    this._attached = false;
  }
};


function setCursor(element, cursors) {
  cursors.forEach(function(cursor) {
    element.style.cursor = cursor;
  });
}

module.exports = DragCursor;
},{}],41:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @class
 * @classdesc Represents how a control parameter changes. Is emitted by
 * {@link ControlMethod}.
 *
 * @property {Number} offset Parameter changed by a fixed value
 * @property {Number} velocity Parameter is changing at this velocity
 * @property {Number} friction The velocity will decrease at this rate
 */
function Dynamics() {
  this.velocity = null;
  this.friction = null;
  this.offset = null;
}

Dynamics.equals = function(d1, d2) {
  return d1.velocity === d2.velocity && d1.friction === d2.friction && d1.offset === d2.offset;
};

Dynamics.prototype.equals = function(other) {
  return Dynamics.equals(this, other);
};

Dynamics.prototype.update = function(other, elapsed) {
  if (other.offset) {
    // If other has an offset, make this.offset a number instead of null
    this.offset = this.offset || 0;
    this.offset += other.offset;
  }

  var offsetFromVelocity = this.offsetFromVelocity(elapsed);
  if (offsetFromVelocity) {
    // If there is an offset to add from the velocity, make this offset a number instead of null
    this.offset = this.offset || 0;
    this.offset += offsetFromVelocity;
  }

  this.velocity = other.velocity;
  this.friction = other.friction;
};

Dynamics.prototype.reset = function() {
  this.velocity = null;
  this.friction = null;
  this.offset = null;
};


Dynamics.prototype.velocityAfter = function(elapsed) {
  if (!this.velocity) {
    return null;
  }
  if (this.friction) {
    return decreaseAbs(this.velocity, this.friction *elapsed);
  }
  return this.velocity;
};

Dynamics.prototype.offsetFromVelocity = function(elapsed) {
  elapsed = Math.min(elapsed, this.nullVelocityTime());

  var velocityEnd = this.velocityAfter(elapsed);
  var averageVelocity = (this.velocity + velocityEnd) / 2;

  return averageVelocity * elapsed;
};


Dynamics.prototype.nullVelocityTime = function() {
  if (this.velocity == null) {
    return 0;
  }
  if (this.velocity && !this.friction) {
    return Infinity;
  }
  return Math.abs(this.velocity / this.friction);
};

function decreaseAbs(num, dec) {
  if (num < 0) {
    return Math.min(0, num + dec);
  }
  if (num > 0) {
    return Math.max(0, num - dec);
  }
  return 0;
}

module.exports = Dynamics;
},{}],42:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var eventEmitter = require('minimal-event-emitter');

/**
 * @class
 * @classdesc Set the velocity and friction of a single parameter by pressing
 * and unpressing a DOM element.
 *
 * @implements ControlMethod
 *
 * @param {Element} element Element which activates the method when pressed
 * @param {String} parameter The parameter to be controlled (e.g. `x`, `y` or `zoom`)
 * @param {Number} velocity Velocity at which the parameter changes. Use a
 * negative number for opposite direction
 * @param {Number} friction Friction at which the parameter stops
*/
function ElementPressControlMethod(element, parameter, velocity, friction) {
  if(!element) {
    throw new Error("ElementPressControlMethod: element must be defined");
  }
  if(!parameter) {
    throw new Error("ElementPressControlMethod: parameter must be defined");
  }
  if(!velocity) {
    throw new Error("ElementPressControlMethod: velocity must be defined");
  }
  if(!friction) {
    throw new Error("ElementPressControlMethod: friction must be defined");
  }

  this._element = element;

  this._pressHandler = this._handlePress.bind(this);
  this._releaseHandler = this._handleRelease.bind(this);

  element.addEventListener('mousedown', this._pressHandler);
  element.addEventListener('mouseup', this._releaseHandler);
  element.addEventListener('mouseleave', this._releaseHandler);
  element.addEventListener('touchstart', this._pressHandler);
  element.addEventListener('touchmove', this._releaseHandler);
  element.addEventListener('touchend', this._releaseHandler);

  this._parameter = parameter;
  this._velocity = velocity;
  this._friction = friction;
  this._dynamics = new Dynamics();

  this._pressing = false;
}
eventEmitter(ElementPressControlMethod);

/**
 * Destroy the instance
 */
ElementPressControlMethod.prototype.destroy = function() {
  this._element.removeEventListener('mousedown', this._pressHandler);
  this._element.removeEventListener('mouseup', this._releaseHandler);
  this._element.removeEventListener('mouseleave', this._releaseHandler);
  this._element.removeEventListener('touchstart', this._pressHandler);
  this._element.removeEventListener('touchmove', this._releaseHandler);
  this._element.removeEventListener('touchend', this._releaseHandler);
};

ElementPressControlMethod.prototype._handlePress = function() {
  this._pressing = true;

  this._dynamics.velocity = this._velocity;
  this._dynamics.friction = 0;
  this.emit('parameterDynamics', this._parameter, this._dynamics);
  this.emit('active');
};

ElementPressControlMethod.prototype._handleRelease = function() {
  if(this._pressing) {
    this._dynamics.friction = this._friction;
    this.emit('parameterDynamics', this._parameter, this._dynamics);
    this.emit('inactive');
  }

  this._pressing = false;
};

module.exports = ElementPressControlMethod;
},{"./Dynamics":41,"minimal-event-emitter":13}],43:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Hammer = require('hammerjs');
var Map = require('../collections/Map');
var hash = require('../util/hash');
var browser = require('bowser');


/**
 * @class
 * @classdesc Manages Hammer.js instances. One instance is created for each
 * different combination of DOM element and pointer type.
 */
function HammerGestures() {
  this._managers = new Map(domElementEquals, domElementHash);
}


HammerGestures.prototype.get = function(element, type) {
  if (!this._managers.has(element)) {
    this._managers.set(element, {});
  }
  var elementManagers = this._managers.get(element);

  if (!elementManagers[type]) {
    elementManagers[type] = this._createManager(element, type);
  }
  var elementTypeManager = elementManagers[type];
  elementTypeManager.refs += 1;

  return new HammerGesturesHandle(this, elementTypeManager.manager, element, type);
};


HammerGestures.prototype._createManager = function(element, type) {
  var manager = new Hammer.Manager(element);

  // Managers are created with different parameters for different pointer
  // types.
  if (type === 'mouse') {
    manager.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  }
  else if (type === 'touch' || type === 'pen' || type === 'kinect') {
    // On touch one wants to have both panning and pinching. The panning
    // recognizer needs a threshold to allow the pinch to be recognized.
    manager.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 20, pointers: 1 }));
    if (!(browser.msie && parseFloat(browser.version) < 10)) {
      // Do not add pinch to IE8-9 to prevent focus issues which prevent wheel scrolling from
      // working.
      manager.add(new Hammer.Pinch());
    }
  }

  return {
    manager: manager,
    refs: 0
  };
};


HammerGestures.prototype._releaseHandle = function(element, type) {
  var elementTypeManager = this._managers.get(element)[type];
  elementTypeManager.refs -= 1;
  if(elementTypeManager.refs <= 0) {
    elementTypeManager.manager.destroy();
    this._managers.get(element)[type] = null;
  }
};


function domElementEquals(e1, e2) {
  return e1 === e2;
}


function domElementHash(e) {
  var elementStr = e.id || e.toString();
  while (elementStr.length < 5) {
    elementStr += '0';
  }
  return hash(elementStr.charCodeAt(0), elementStr.charCodeAt(1), elementStr.charCodeAt(2), elementStr.charCodeAt(3), elementStr.charCodeAt(4));
}


function HammerGesturesHandle(hammerGestures, manager, element, type) {
  this._manager = manager;
  this._element = element;
  this._type = type;
  this._hammerGestures = hammerGestures;
  this._eventHandlers = [];
}


HammerGesturesHandle.prototype.on = function(events, handler) {
  var type = this._type;
  var handlerFilteredEvents = function(e) {
    if (type === e.pointerType) {
      handler(e);
    }
  };

  this._eventHandlers.push({ events: events, handler: handlerFilteredEvents });
  this._manager.on(events, handlerFilteredEvents);
};


HammerGesturesHandle.prototype.release = function() {
  for (var i = 0; i < this._eventHandlers.length; i++) {
    var eventHandler = this._eventHandlers[i];
    this._manager.off(eventHandler.events, eventHandler.handler);
  }

  this._hammerGestures._releaseHandle(this._element, this._type);
  this._manager = null;
  this._element = null;
  this._type = null;
  this._hammerGestures = null;
};


HammerGesturesHandle.prototype.manager = function() {
  return this._manager;
};


module.exports = new HammerGestures();
},{"../collections/Map":32,"../util/hash":99,"bowser":1,"hammerjs":12}],44:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var eventEmitter = require('minimal-event-emitter');

/**
 * @class
 * @classdesc Set the velocity and friction of a single parameter by pressing
 * and unpressing a key.
 *
 * @implements ControlMethod
 *
 * @param {Number} keyCode Key which activates the method when pressed
 * @param {String} parameter The parameter to be controlled (e.g. `x`, `y` or `zoom`)
 * @param {Number} velocity Velocity at which the parameter changes. Use a
 * negative number for opposite direction
 * @param {Number} friction Friction at which the parameter stops
 * @param {Element} [element=document] DOM element where the key events are listened to
*/
function KeyControlMethod(keyCode, parameter, velocity, friction, element) {
  if(!keyCode) {
    throw new Error("KeyControlMethod: keyCode must be defined");
  }
  if(!parameter) {
    throw new Error("KeyControlMethod: parameter must be defined");
  }
  if(!velocity) {
    throw new Error("KeyControlMethod: velocity must be defined");
  }
  if(!friction) {
    throw new Error("KeyControlMethod: friction must be defined");
  }

  element = element || document;

  this._keyCode = keyCode;
  this._parameter = parameter;
  this._velocity = velocity;
  this._friction = friction;
  this._element = element;

  this._keydownHandler = this._handlePress.bind(this);
  this._keyupHandler = this._handleRelease.bind(this);
  this._blurHandler = this._handleBlur.bind(this);

  this._element.addEventListener('keydown', this._keydownHandler);
  this._element.addEventListener('keyup', this._keyupHandler);
  window.addEventListener('blur',this._blurHandler);

  this._dynamics = new Dynamics();
  this._pressing = false;
}
eventEmitter(KeyControlMethod);

/**
  Destroy the instance
*/
KeyControlMethod.prototype.destroy = function() {
  this._element.removeEventListener('keydown', this._keydownHandler);
  this._element.removeEventListener('keyup', this._keyupHandler);
  window.removeEventListener('blur', this._blurHandler);
};

KeyControlMethod.prototype._handlePress = function(e) {
  if(e.keyCode !== this._keyCode) { return; }

  this._pressing = true;

  this._dynamics.velocity = this._velocity;
  this._dynamics.friction = 0;
  this.emit('parameterDynamics', this._parameter, this._dynamics);
  this.emit('active');
};

KeyControlMethod.prototype._handleRelease = function(e) {
  if(e.keyCode !== this._keyCode) { return; }

  if(this._pressing) {
    this._dynamics.friction = this._friction;
    this.emit('parameterDynamics', this._parameter, this._dynamics);
    this.emit('inactive');
  }

  this._pressing = false;
};

KeyControlMethod.prototype._handleBlur = function() {
  this._dynamics.velocity = 0;
  this.emit('parameterDynamics', this._parameter, this._dynamics);
  this.emit('inactive');

  this._pressing = false;
};

module.exports = KeyControlMethod;
},{"./Dynamics":41,"minimal-event-emitter":13}],45:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var HammerGestures = require('./HammerGestures');
var eventEmitter = require('minimal-event-emitter');

/**
 * @class
 * @classdesc Control the view fov/zoom by pinching with two fingers.
 *
 * @implements ControlMethod
 *
 * @param {Element} element Element to listen for events.
 * @param {string} pointerType Which Hammer.js pointer type to use
 * @param {Object} opts
 */
function PinchZoomControlMethod(element, pointerType, opts) {
  this._hammer = HammerGestures.get(element, pointerType);

  this._lastEvent = null;

  this._active = false;

  this._dynamics = new Dynamics();

  this._hammer.on('pinchstart', this._handleStart.bind(this));
  this._hammer.on('pinch', this._handleEvent.bind(this));
  this._hammer.on('pinchend', this._handleEnd.bind(this));
  this._hammer.on('pinchcancel', this._handleEnd.bind(this));
}

eventEmitter(PinchZoomControlMethod);

/**
 * Destroy the instance
 */
PinchZoomControlMethod.prototype.destroy = function() {
  this._hammer.release();

  this._hammer = null;
  this._lastEvent = null;
  this._active = null;
  this._dynamics = null;
};


PinchZoomControlMethod.prototype._handleStart = function() {
  if (!this._active) {
    this._active = true;
    this.emit('active');
  }
};


PinchZoomControlMethod.prototype._handleEnd = function() {
  this._lastEvent = null;

  if (this._active) {
    this._active = false;
    this.emit('inactive');
  }
};


PinchZoomControlMethod.prototype._handleEvent = function(e) {
  var scale = e.scale;

  if (this._lastEvent) {
    scale /= this._lastEvent.scale;
  }

  this._dynamics.offset = (scale - 1) * -1;
  this.emit('parameterDynamics', 'zoom', this._dynamics);

  this._lastEvent = e;
};


module.exports = PinchZoomControlMethod;
},{"./Dynamics":41,"./HammerGestures":43,"minimal-event-emitter":13}],46:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var HammerGestures = require('./HammerGestures');
var defaults = require('../util/defaults');
var eventEmitter = require('minimal-event-emitter');
var maxFriction = require('./util').maxFriction;

var defaultOptions = {
  speed: 8,
  friction: 6,
  maxFrictionTime: 0.3
};


/**
 * @class
 * @classdesc Control the view by clicking and moving the mouse. Also known as
 * "QTVR" control mode.
 *
 * @implements ControlMethod
 *
 * @param {Element} element Element to listen for events.
 * @param {string} pointerType Which Hammer.js pointer type to use (e.g.
 * `mouse` or `touch`).
 * @param {Object} opts
 * @param {number} opts.speed
 * @param {number} opts.friction
 * @param {number} opts.maxFrictionTime
 */
// TODO: allow speed not change linearly with distance to click spot.
// Quadratic or other would allow a larger speed range.
function QtvrControlMethod(element, pointerType, opts) {
  this._element = element;

  this._opts = defaults(opts || {}, defaultOptions);

  this._active = false;

  this._hammer = HammerGestures.get(element, pointerType);

  this._dynamics = {
    x: new Dynamics(),
    y: new Dynamics()
  };

  this._hammer.on('panstart', this._handleStart.bind(this));
  this._hammer.on('panmove', this._handleMove.bind(this));
  this._hammer.on('panend', this._handleRelease.bind(this));
  this._hammer.on('pancancel', this._handleRelease.bind(this));
}

eventEmitter(QtvrControlMethod);

/**
 * Destroy the instance
 */
QtvrControlMethod.prototype.destroy = function() {
  this._hammer.release();
  this._hammer = null;
  this._element = null;
  this._opts = null;
  this._active = null;
  this._dynamics = null;
};


QtvrControlMethod.prototype._handleStart = function(e) {
  // Prevent event dragging other DOM elements and causing strange behavior on Chrome
  e.preventDefault();

  if (!this._active) {
    this._active = true;
    this.emit('active');
  }
};


QtvrControlMethod.prototype._handleMove = function(e) {
  // Prevent event dragging other DOM elements and causing strange behavior on Chrome
  e.preventDefault();

  this._updateDynamics(e, false);
};


QtvrControlMethod.prototype._handleRelease = function(e) {
  // Prevent event dragging other DOM elements and causing strange behavior on Chrome
  e.preventDefault();

  this._updateDynamics(e, true);

  if (this._active) {
    this._active = false;
    this.emit('inactive');
  }
};


var tmpReleaseFriction = [ null, null ];
QtvrControlMethod.prototype._updateDynamics = function(e, release) {
  var elementRect = this._element.getBoundingClientRect();
  var width = elementRect.right - elementRect.left;
  var height = elementRect.bottom - elementRect.top;
  var maxDim = Math.max(width, height);

  var x = e.deltaX / maxDim * this._opts.speed;
  var y = e.deltaY / maxDim * this._opts.speed;

  this._dynamics.x.reset();
  this._dynamics.y.reset();
  this._dynamics.x.velocity = x;
  this._dynamics.y.velocity = y;

  if (release) {
    maxFriction(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, tmpReleaseFriction);
    this._dynamics.x.friction = tmpReleaseFriction[0];
    this._dynamics.y.friction = tmpReleaseFriction[1];
  }

  this.emit('parameterDynamics', 'x', this._dynamics.x);
  this.emit('parameterDynamics', 'y', this._dynamics.y);
};


module.exports = QtvrControlMethod;
},{"../util/defaults":93,"./Dynamics":41,"./HammerGestures":43,"./util":51,"minimal-event-emitter":13}],47:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var WheelListener = require('./WheelListener');
var defaults = require('../util/defaults');
var eventEmitter = require('minimal-event-emitter');

var defaultOptions = {
  frictionTime: 0.2,
  zoomDelta: 0.001
};

/**
 * @class
 * @classdesc Control the fov/zoom by using the mouse wheel.
 *
 * @implements ControlMethod
 *
 * @param {Element} element Element to listen for events.
 * @param {Object} opts
 * @param {number} [opts.frictionTime=0.2]
 * @param {number} [opts.zoomDelta=0.001]
 */
function ScrollZoomControlMethod(element, opts) {
  this._opts = defaults(opts || {}, defaultOptions);

  this._dynamics = new Dynamics();

  this._eventList = [];

  var fn = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  this._wheelListener = new WheelListener(element, fn.bind(this));
}

eventEmitter(ScrollZoomControlMethod);

/**
 * Destroy the instance
 */
ScrollZoomControlMethod.prototype.destroy = function() {
  this._wheelListener.remove();
  this._opts = null;
  this._dynamics = null;
  this._eventList = null;
};


ScrollZoomControlMethod.prototype.withoutSmoothing = function(e) {
  this._dynamics.offset = wheelEventDelta(e) * this._opts.zoomDelta;
  this.emit('parameterDynamics', 'zoom', this._dynamics);

  e.preventDefault();

  this.emit('active');
  this.emit('inactive');
};


ScrollZoomControlMethod.prototype.withSmoothing = function(e) {
  var currentTime = e.timeStamp;

  // Record event.
  this._eventList.push(e);

  // Remove events whose smoothing has already expired.
  while (this._eventList[0].timeStamp < currentTime - this._opts.frictionTime*1000) {
    this._eventList.shift(0);
  }

  // Get the current velocity from the recorded events.
  // Each wheel movement causes a velocity of change/frictionTime during frictionTime.
  var velocity = 0;
  for (var i = 0; i < this._eventList.length; i++) {
    var zoomChangeFromEvent = wheelEventDelta(this._eventList[i]) * this._opts.zoomDelta;
    velocity += zoomChangeFromEvent / this._opts.frictionTime;
  }

  this._dynamics.velocity = velocity;
  this._dynamics.friction = Math.abs(velocity) / this._opts.frictionTime;

  this.emit('parameterDynamics', 'zoom', this._dynamics);

  e.preventDefault();

  this.emit('active');
  this.emit('inactive');
};


function wheelEventDelta(e) {
  var multiplier = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * multiplier;
}


module.exports = ScrollZoomControlMethod;
},{"../util/defaults":93,"./Dynamics":41,"./WheelListener":49,"minimal-event-emitter":13}],48:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Dynamics = require('./Dynamics');
var defaults = require('../util/defaults');
var eventEmitter = require('minimal-event-emitter');

/**
 * @class
 * @classdesc ControlMethod to set the velocity and friction of a single parameter.
 *
 * The user should emit 'active' and 'inactive' events if required.
 *
 * @implements ControlMethod
 *
 * @param {String} parameter The parameter to be controlled (e.g. `x`, `y` or `zoom`)
*/
function VelocityControlMethod(parameter) {
  if(!parameter) {
    throw new Error("VelocityControlMethod: parameter must be defined");
  }

  this._parameter = parameter;
  this._dynamics = new Dynamics();
}
eventEmitter(VelocityControlMethod);

/**
  Destroy the instance
*/
VelocityControlMethod.prototype.destroy = function() {
};

/**
 * Set the parameter's velocity.
 * @param {Number} velocity
 */
VelocityControlMethod.prototype.setVelocity = function(velocity) {
  this._dynamics.velocity = velocity;
  this.emit('parameterDynamics', this._parameter, this._dynamics);
};

/**
 * Set the parameter's friction.
 * @param {Number} friction
 */
VelocityControlMethod.prototype.setFriction = function(friction) {
  this._dynamics.friction = friction;
  this.emit('parameterDynamics', this._parameter, this._dynamics);
};

module.exports = VelocityControlMethod;
},{"../util/defaults":93,"./Dynamics":41,"minimal-event-emitter":13}],49:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Cross-browser mouse wheel event listener
// Adapted from: https://developer.mozilla.org/en-US/docs/Web/Events/wheel
// This version requires eventShim

'use strict';

// Detect the available wheel event.
function getEventName() {
  if ('onwheel' in document.createElement('div')) {
    // Modern browsers support 'wheel'.
    return 'wheel';
  } else if (document.onmousewheel !== undefined) {
    // Webkit and IE support at least 'mousewheel'.
    return 'mousewheel';
  } else {
    return null;
  }
}

function WheelListener(elem, callback, useCapture) {
  var eventName = getEventName();

  if (eventName === 'wheel') {
    this._fun = callback;
    this._elem = elem;
    this._elem.addEventListener('wheel', this._fun, useCapture);
  }
  else if (eventName === 'mousewheel') {
    this._fun = fallbackHandler(callback);
    this._elem = elem;
    this._elem.addEventListener('mousewheel', this._fun, useCapture);
  }
  else {
    throw new Error('Browser does not support mouse wheel events');
  }
}

WheelListener.prototype.remove = function() {
  var eventName = getEventName();

  if (eventName === 'wheel') {
    this._elem.removeEventListener('wheel', this._fun);
  }
  else if (eventName === 'mousewheel') {
    this._elem.removeEventListener('mousewheel', this._fun);
  }
};

function fallbackHandler(callback) {
  return function handleWheelEvent(originalEvent) {
    if (!originalEvent) {
      originalEvent = window.event;
    }

    // Create a normalized event object.
    var event = {
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: "wheel",
      deltaMode: 1,
      deltaX: 0,
      deltaZ: 0,
      timeStamp: originalEvent.timeStamp || Date.now(),
      preventDefault: originalEvent.preventDefault.bind(originalEvent)
    };

    // Calculate deltaY.
    event.deltaY = - 1/40 * originalEvent.wheelDelta;
    if (originalEvent.wheelDeltaX) {
      // Calculate deltaX.
      event.deltaX = - 1/40 * originalEvent.wheelDeltaX;
    }

    // Fire the callback.
    return callback(event);
  };
}

module.exports = WheelListener;
},{}],50:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var defaults = require('../util/defaults');
var DragControlMethod = require('./Drag');
var QtvrControlMethod = require('./Qtvr');
var ScrollZoomControlMethod = require('./ScrollZoom');
var PinchZoomControlMethod = require('./PinchZoom');
var KeyControlMethod = require('./Key');

var defaultOptions = {
  mouseViewMode: 'drag'
};

/**
 * Instantiate and register some commonly used {@link ControlMethod} instances.
 *
 * The following instances are registered:
 *   - mouseViewDrag
 *   - mouseViewQtvr
 *   - touchView
 *   - pinch
 *   - arrowKeys
 *   - plusMinusKeys
 *   - wasdKeys
 *   - qeKeys
 *
 * @param {Controls} controls Where to register the instances.
 * @param {Element} element Element to listen for events.
 * @param {Object} opts
 * @param {'drag'|'qtvr'} mouseViewMode
 */
function registerDefaultControls(controls, element, opts) {
  opts = defaults(opts || {}, defaultOptions);

  var controlMethods = {
    mouseViewDrag: new DragControlMethod(element, 'mouse'),
    mouseViewQtvr: new QtvrControlMethod(element, 'mouse'),
    touchView: new DragControlMethod(element, 'touch'),
    pinch: new PinchZoomControlMethod(element, 'touch'),

    leftArrowKey: new KeyControlMethod(37, 'x', -0.7, 3),
    rightArrowKey: new KeyControlMethod(39, 'x', 0.7, 3),
    upArrowKey: new KeyControlMethod(38, 'y', -0.7, 3),
    downArrowKey: new KeyControlMethod(40, 'y', 0.7, 3),
    plusKey: new KeyControlMethod(107, 'zoom', -0.7, 3),
    minusKey: new KeyControlMethod(109, 'zoom', 0.7, 3),

    wKey: new KeyControlMethod(87, 'y', -0.7, 3),
    aKey: new KeyControlMethod(65, 'x', -0.7, 3),
    sKey: new KeyControlMethod(83, 'y', 0.7, 3),
    dKey: new KeyControlMethod(68, 'x', 0.7, 3),
    qKey: new KeyControlMethod(81, 'roll', 0.7, 3),
    eKey: new KeyControlMethod(69, 'roll', -0.7, 3)
  };

  if(opts.scrollZoom !== false) {
    controlMethods.scrollZoom = new ScrollZoomControlMethod(element); //{ frictionTime: 0 }
  }

  var controlMethodGroups = {
    arrowKeys: [ 'leftArrowKey', 'rightArrowKey', 'upArrowKey', 'downArrowKey' ],
    plusMinusKeys: [ 'plusKey', 'minusKey' ],
    wasdKeys: [ 'wKey', 'aKey', 'sKey', 'dKey' ],
    qeKeys: [ 'qKey', 'eKey' ]
  };


  var enabledControls = [ 'scrollZoom', 'touchView', 'pinch' ];
  switch (opts.mouseViewMode) {
    case 'drag':
      enabledControls.push('mouseViewDrag');
      break;
    case 'qtvr':
      enabledControls.push('mouseViewQtvr');
      break;
    default:
      throw new Error("Unknown mouse view mode: " + opts.mouseViewMode);
  }

  for (var id in controlMethods) {
    var method = controlMethods[id];
    controls.registerMethod(id, method);
    if (enabledControls.indexOf(id) >= 0) {
      controls.enableMethod(id);
    }
  }

  for (var groupId in controlMethodGroups) {
    var methodGroup = controlMethodGroups[groupId];
    controls.addMethodGroup(groupId, methodGroup);
  }

  return controlMethods;
}

module.exports = registerDefaultControls;
},{"../util/defaults":93,"./Drag":39,"./Key":44,"./PinchZoom":45,"./Qtvr":46,"./ScrollZoom":47}],51:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function maxFriction(friction, velocityX, velocityY, maxFrictionTime, result) {
  var velocity = Math.sqrt(Math.pow(velocityX,2) + Math.pow(velocityY,2));
  friction = Math.max(friction, velocity/maxFrictionTime);
  changeVectorNorm(velocityX, velocityY, friction, result);
  result[0] = Math.abs(result[0]);
  result[1] = Math.abs(result[1]);
}

function changeVectorNorm(x, y, n, result) {
  var theta = Math.atan(y/x);
  result[0] = n * Math.cos(theta);
  result[1] = n * Math.sin(theta);
}

module.exports = {
  maxFriction: maxFriction,
  changeVectorNorm: changeVectorNorm
};
},{}],52:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var inherits = require('../util/inherits');
var hash = require('../util/hash');
var GraphFinder = require('../GraphFinder');
var LruMap = require('../collections/LruMap');
var Level = require('./Level');
var makeLevelList = require('./common').makeLevelList;
var makeSelectableLevelList = require('./common').makeSelectableLevelList;
var rotateVector = require('../util/rotateVector');
var clamp = require('../util/clamp');
var cmp = require('../util/cmp');
var type = require('../util/type');
var vec3 = require('gl-matrix/src/gl-matrix/vec3');

// Some renderer implementations require tiles to be padded around with
// repeated pixels to prevent the appearance of visible seams between tiles.
//
// In order to prevent the padding from being visible, the tiles must be
// padded and stacked such that the padding on one of the sides, when present,
// stacks below the neighboring tile on that side.
//
// The padding rules are as follows:
// * Define a tile to be X-marginal if it contacts the X-edge of its cube face.
// * Pad top if the tile is top-marginal and the face is F or U.
// * Pad bottom unless the tile is bottom-marginal or the face is F or D.
// * Pad left if the tile is left-marginal and the face is F, L, U or D.
// * Pad right unless the tile is right-marginal or the face is F, R, U or D.
//
// The stacking rules are as follows:
// * Within an image, stack smaller zoom levels below larger zoom levels.
// * Within a level, stack tiles bottom to top in FUDLRB face order.
// * Within a face, stack tiles bottom to top in ascending Y coordinate order.
// * Within a row, stack tiles bottom to top in ascending X coordinate order.
//
// Crucially, these rules affect the implementation of the tile cmp() method,
// which determines the stacking order, and of the pad*() tile methods, which
// determine the amount of padding on each of the four sides of a tile.

// Initials for cube faces in stacking order.
var faceList = 'fudlrb';

// Rotation of each face, relative to the front face.
var faceRotation = {
  f: { x: 0, y: 0 },
  b: { x: 0, y: Math.PI },
  l: { x: 0, y: Math.PI/2 },
  r: { x: 0, y: -Math.PI/2 },
  u: { x: Math.PI/2, y: 0 },
  d: { x: -Math.PI/2, y: 0 }
};

// Normalized vectors pointing to the center of each face.
var faceVectors = {};
for (var i = 0; i < faceList.length; i++) {
  var face = faceList[i];
  var rotation = faceRotation[face];
  var v = vec3.fromValues(0,  0, -1);
  rotateVector(v, v, rotation.y, rotation.x, 0);
  faceVectors[face] = v;
}

// Map each face to its adjacent faces.
// The order is as suggested by the front face.
var adjacentFace = {
  f: [ 'l', 'r', 'u', 'd' ],
  b: [ 'r', 'l', 'u', 'd' ],
  l: [ 'b', 'f', 'u', 'd' ],
  r: [ 'f', 'b', 'u', 'd' ],
  u: [ 'l', 'r', 'b', 'f' ],
  d: [ 'l', 'r', 'f', 'b' ]
};

// Offsets to apply to the (x,y) coordinates of a tile to get its neighbors.
var neighborOffsets = [
  [  0,  1 ], // top
  [  1,  0 ], // right
  [  0, -1 ], // bottom
  [ -1,  0 ]  // left
];


/**
 * @class
 * @implements Tile
 * @classdesc A tile in a @{CubeGeometry}.
 */
function CubeTile(face, x, y, z, geometry) {
  this.face = face;
  this.x = x;
  this.y = y;
  this.z = z;
  this._geometry = geometry;
  this._level = geometry.levelList[z];
}


CubeTile.prototype.rotX = function() {
  return faceRotation[this.face].x;
};


CubeTile.prototype.rotY = function() {
  return faceRotation[this.face].y;
};


CubeTile.prototype.centerX = function() {
  return (this.x + 0.5) / this._level.numHorizontalTiles() - 0.5;
};


CubeTile.prototype.centerY = function() {
  return 0.5 - (this.y + 0.5) / this._level.numVerticalTiles();
};


CubeTile.prototype.scaleX = function() {
  return 1 / this._level.numHorizontalTiles();
};


CubeTile.prototype.scaleY = function() {
  return 1 / this._level.numVerticalTiles();
};


CubeTile.prototype.width = function() {
  return this._level.tileWidth();
};


CubeTile.prototype.height = function() {
  return this._level.tileHeight();
};


CubeTile.prototype.levelWidth = function() {
  return this._level.width();
};


CubeTile.prototype.levelHeight = function() {
  return this._level.height();
};


CubeTile.prototype.atTopLevel = function() {
  return this.z === 0;
};


CubeTile.prototype.atBottomLevel = function() {
  return this.z === this._geometry.levelList.length - 1;
};


CubeTile.prototype.atTopEdge = function() {
  return this.y === 0;
};


CubeTile.prototype.atBottomEdge = function() {
  return this.y === this._level.numVerticalTiles() - 1;
};


CubeTile.prototype.atLeftEdge = function() {
  return this.x === 0;
};


CubeTile.prototype.atRightEdge = function() {
  return this.x === this._level.numHorizontalTiles() - 1;
};


CubeTile.prototype.padTop = function() {
  return this.atTopEdge() && /[fu]/.test(this.face);
};


CubeTile.prototype.padBottom = function() {
  return !this.atBottomEdge() || /[fd]/.test(this.face);
};


CubeTile.prototype.padLeft = function() {
  return this.atLeftEdge() && /[flud]/.test(this.face);
};


CubeTile.prototype.padRight = function() {
  return !this.atRightEdge() || /[frud]/.test(this.face);
};


CubeTile.prototype.vertices = function(result) {

  var rot = faceRotation[this.face];

  function makeVertex(vec, x, y) {
    vec3.set(vec, x, y, -0.5);
    rotateVector(vec, vec, rot.y, rot.x, 0);
  }

  var left = this.centerX() - this.scaleX() / 2;
  var right = this.centerX() + this.scaleX() / 2;
  var bottom = this.centerY() - this.scaleY() / 2;
  var top = this.centerY() + this.scaleY() / 2;

  makeVertex(result[0], left, top);
  makeVertex(result[1], right, top);
  makeVertex(result[2], right, bottom);
  makeVertex(result[3], left, bottom);

  return result;

};


CubeTile.prototype.parent = function() {

  if (this.atTopLevel()) {
    return null;
  }

  var face = this.face;
  var z = this.z;
  var x = this.x;
  var y = this.y;

  var geometry = this._geometry;
  var level = geometry.levelList[z];
  var parentLevel = geometry.levelList[z-1];

  var tileX = Math.floor(x / level.numHorizontalTiles() * parentLevel.numHorizontalTiles());
  var tileY = Math.floor(y / level.numVerticalTiles() * parentLevel.numVerticalTiles());
  var tileZ = z-1;

  return new CubeTile(face, tileX, tileY, tileZ, geometry);

};


CubeTile.prototype.children = function(result) {

  if (this.atBottomLevel()) {
    return null;
  }

  var face = this.face;
  var z = this.z;
  var x = this.x;
  var y = this.y;

  var geometry = this._geometry;
  var level = geometry.levelList[z];
  var childLevel = geometry.levelList[z+1];

  var nHoriz = childLevel.numHorizontalTiles() / level.numHorizontalTiles();
  var nVert = childLevel.numVerticalTiles() / level.numVerticalTiles();

  result = result || [];

  for (var h = 0; h < nHoriz; h++) {
    for (var v = 0; v < nVert; v++) {
      var tileX = nHoriz * x + h;
      var tileY = nVert * y + v;
      var tileZ = z+1;
      result.push(new CubeTile(face, tileX, tileY, tileZ, geometry));
    }
  }

  return result;

};


CubeTile.prototype.neighbors = function() {

  var geometry = this._geometry;
  var cache = geometry._neighborsCache;

  // Satisfy from cache when available.
  var cachedResult = cache.get(this);
  if (cachedResult) {
    return cachedResult;
  }

  var vec = geometry._vec;

  var face = this.face;
  var x = this.x;
  var y = this.y;
  var z = this.z;
  var level = this._level;

  var numX = level.numHorizontalTiles();
  var numY = level.numVerticalTiles();

  var result = [];

  for (var i = 0; i < neighborOffsets.length; i++) {
    var xOffset = neighborOffsets[i][0];
    var yOffset = neighborOffsets[i][1];

    var newX = x + xOffset;
    var newY = y + yOffset;
    var newZ = z;
    var newFace = face;

    if (newX < 0 || newX >= numX || newY < 0 || newY >= numY) {

      // If the neighboring tile belongs to a different face, calculate a
      // vector pointing to the edge between the two faces at the point the
      // tile and its neighbor meet, and convert it into tile coordinates for
      // the neighboring face.

      var xCoord = this.centerX();
      var yCoord = this.centerY();

      // First, calculate the vector as if the initial tile belongs to the
      // front face, so that the tile x,y coordinates map directly into the
      // x,y axes.

      if (newX < 0) {
        vec3.set(vec, -0.5, yCoord, -0.5);
        newFace = adjacentFace[face][0];
      } else if (newX >= numX) {
        vec3.set(vec, 0.5, yCoord, -0.5);
        newFace = adjacentFace[face][1];
      } else if (newY < 0) {
        vec3.set(vec, xCoord, 0.5, -0.5);
        newFace = adjacentFace[face][2];
      } else if (newY >= numY) {
        vec3.set(vec, xCoord, -0.5, -0.5);
        newFace = adjacentFace[face][3];
      }

      var rot;

      // Then, rotate the vector into the actual face the initial tile
      // belongs to.

      rot = faceRotation[face];
      rotateVector(vec, vec, rot.y, rot.x, 0);

      // Finally, rotate the vector from the neighboring face into the front
      // face. Again, this is so that the neighboring tile x,y coordinates
      // map directly into the x,y axes.

      rot = faceRotation[newFace];
      rotateVector(vec, vec, -rot.y, -rot.x, 0);

      // Calculate the neighboring tile coordinates.

      newX = clamp(Math.floor((0.5 + vec[0]) * numX), 0, numX - 1);
      newY = clamp(Math.floor((0.5 - vec[1]) * numY), 0, numY - 1);
    }

    result.push(new CubeTile(newFace, newX, newY, newZ, geometry));
  }

  // Store into cache to satisfy future requests.
  cache.set(this, result);

  return result;

};


CubeTile.prototype.hash = function() {
  return CubeTile.hash(this);
};


CubeTile.prototype.equals = function(other) {
  return CubeTile.equals(this, other);
};


CubeTile.prototype.cmp = function(other) {
  return CubeTile.cmp(this, other);
};


CubeTile.prototype.str = function() {
  return CubeTile.str(this);
};


CubeTile.hash = function(tile) {
  return tile != null ? hash(tile.face.charCodeAt(0), tile.z, tile.x, tile.y) : 0;
};


CubeTile.equals = function(tile1, tile2) {
  return (tile1 != null && tile2 != null &&
          tile1.face === tile2.face &&
          tile1.z === tile2.z &&
          tile1.x === tile2.x &&
          tile1.y === tile2.y);
};


CubeTile.cmp = function(tile1, tile2) {
  var face1 = faceList.indexOf(tile1.face);
  var face2 = faceList.indexOf(tile2.face);
  return (cmp(tile1.z, tile2.z) ||
          cmp(face1, face2) ||
          cmp(tile1.y, tile2.y) ||
          cmp(tile1.x, tile2.x));
};


CubeTile.str = function(tile) {
  return 'CubeTile(' + tile.face + ', ' + tile.x + ', ' + tile.y + ', ' + tile.z + ')';
};


function CubeLevel(levelProperties) {
  this.constructor.super_.call(this, levelProperties);

  this._size = levelProperties.size;
  this._tileSize = levelProperties.tileSize;

  if (this._size % this._tileSize !== 0) {
    throw new Error('Level size is not multiple of tile size: ' +
                    this._size + ' ' + this._tileSize);
  }
}

inherits(CubeLevel, Level);


CubeLevel.prototype.width = function() {
  return this._size;
};


CubeLevel.prototype.height = function() {
  return this._size;
};


CubeLevel.prototype.tileWidth = function() {
  return this._tileSize;
};


CubeLevel.prototype.tileHeight = function() {
  return this._tileSize;
};


CubeLevel.prototype._validateWithParentLevel = function(parentLevel) {

  var width = this.width();
  var height = this.height();
  var tileWidth = this.tileWidth();
  var tileHeight = this.tileHeight();
  var numHorizontal = this.numHorizontalTiles();
  var numVertical = this.numVerticalTiles();

  var parentWidth = parentLevel.width();
  var parentHeight = parentLevel.height();
  var parentTileWidth = parentLevel.tileWidth();
  var parentTileHeight = parentLevel.tileHeight();
  var parentNumHorizontal = parentLevel.numHorizontalTiles();
  var parentNumVertical = parentLevel.numVerticalTiles();

  if (width % parentWidth !== 0) {
    throw new Error('Level width must be multiple of parent level: ' +
                    width + ' vs. ' + parentWidth);
  }

  if (height % parentHeight !== 0) {
    throw new Error('Level height must be multiple of parent level: ' +
                    height + ' vs. ' + parentHeight);
  }

  if (numHorizontal % parentNumHorizontal !== 0) {
    throw new Error('Number of horizontal tiles must be multiple of parent level: ' +
      numHorizontal + " (" + width + '/' + tileWidth + ')' + " vs. " +
      parentNumHorizontal + " (" + parentWidth + '/' + parentTileWidth + ')');
  }

  if (numVertical % parentNumVertical !== 0) {
    throw new Error('Number of vertical tiles must be multiple of parent level: ' +
      numVertical + " (" + height + '/' + tileHeight + ')' + " vs. " +
      parentNumVertical + " (" + parentHeight + '/' + parentTileHeight + ')');
  }

};


/**
 * @class
 * @implements Geometry
 * @classdesc A @{geometry} implementation suitable for tiled cube images with
 *            multiple resolution levels.
 *
 * The following restrictions apply:
 *   - All tiles in a level must be square and form a rectangular grid;
 *   - The size of a level must be a multiple of the tile size;
 *   - The size of a level must be a multiple of the parent level size;
 *   - The number of tiles in a level must be a multiple of the number of tiles
 *     in the parent level.
 *
 * @param {Object[]} levelPropertiesList Level description
 * @param {number} levelPropertiesList[].size Cube face size in pixels
 * @param {number} levelPropertiesList[].tileSize Tile size in pixels
 */
function CubeGeometry(levelPropertiesList) {
  if (type(levelPropertiesList) !== 'array') {
    throw new Error('Level list must be an array');
  }

  this.levelList = makeLevelList(levelPropertiesList, CubeLevel);
  this.selectableLevelList = makeSelectableLevelList(this.levelList);

  for (var i = 1; i < this.levelList.length; i++) {
    this.levelList[i]._validateWithParentLevel(this.levelList[i-1]);
  }

  this._graphFinder = new GraphFinder(CubeTile.equals, CubeTile.hash);

  this._neighborsCache = new LruMap(CubeTile.equals, CubeTile.hash, 64);

  this._vec = vec3.create();

  this._viewParams = {};

  this._tileVertices = [
    vec3.create(),
    vec3.create(),
    vec3.create(),
    vec3.create()
  ];
}


CubeGeometry.prototype.maxTileSize = function() {
  var maxTileSize = 0;
  for (var i = 0; i < this.levelList.length; i++) {
    var level = this.levelList[i];
    maxTileSize = Math.max(maxTileSize, level.tileWidth, level.tileHeight);
  }
  return maxTileSize;
};


CubeGeometry.prototype.levelTiles = function(level, result) {

  var levelIndex = this.levelList.indexOf(level);
  var maxX = level.numHorizontalTiles() - 1;
  var maxY = level.numVerticalTiles() - 1;

  result = result || [];

  for (var f = 0; f < faceList.length; f++) {
    var face = faceList[f];
    for (var x = 0; x <= maxX; x++) {
      for (var y = 0; y <= maxY; y++) {
        result.push(new CubeTile(face, x, y, levelIndex, this));
      }
    }
  }

  return result;

};


CubeGeometry.prototype._closestTile = function(params, level) {

  var ray = this._vec;

  var minAngle = Infinity;
  var closestFace = null;

  // Calculate a view ray pointing to the tile.
  vec3.set(ray, 0, 0, -1);
  rotateVector(ray, ray, -params.yaw, -params.pitch, -params.roll);

  // Find the face whose vector makes a minimal angle with the view ray.
  // This is the face into which the view ray points.
  for (var face in faceVectors) {
    var vector = faceVectors[face];
    // For a small angle between two normalized vectors, angle ~ 1-cos(angle).
    var angle = 1 - vec3.dot(vector, ray);
    if (angle < minAngle) {
      minAngle = angle;
      closestFace = face;
    }
  }

  // Project view ray onto cube, i.e., normalize the coordinate with
  // largest absolute value to ±0.5.
  var max = Math.max(Math.abs(ray[0]), Math.abs(ray[1]), Math.abs(ray[2])) / 0.5;
  for (var i = 0; i < 3; i++) {
    ray[i] = ray[i] / max;
  }

  // Rotate view ray into front face.
  var rot = faceRotation[closestFace];
  rotateVector(ray, ray, -rot.y, -rot.x, -rot.z);

  // Get the desired zoom level.
  var tileZ = this.levelList.indexOf(level);
  var numX = level.numHorizontalTiles();
  var numY = level.numVerticalTiles();

  // Find the coordinates of the tile that the view ray points into.
  var x = ray[0];
  var y = ray[1];
  var tileX = clamp(Math.floor((0.5 + x) * numX), 0, numX - 1);
  var tileY = clamp(Math.floor((0.5 - y) * numY), 0, numY - 1);

  return new CubeTile(closestFace, tileX, tileY, tileZ, this);
};


CubeGeometry.prototype.visibleTiles = function(view, level, result) {

  var viewParams = this._viewParams;
  var tileVertices = this._tileVertices;
  var graphFinder = this._graphFinder;

  function tileNeighbors(t) {
    return t.neighbors();
  }

  function tileVisible(t) {
    t.vertices(tileVertices);
    return view.intersects(tileVertices);
  }

  var startingTile = this._closestTile(view.parameters(viewParams), level);

  if (!tileVisible(startingTile)) {
    throw new Error('Starting tile is not visible');
  }

  result = result || [];

  var tile;
  graphFinder.start(startingTile, tileNeighbors, tileVisible);
  while ((tile = graphFinder.next()) != null) {
    result.push(tile);
  }

  return result;

};


CubeGeometry.TileClass = CubeGeometry.prototype.TileClass = CubeTile;
CubeGeometry.type = CubeGeometry.prototype.type = 'cube';
CubeTile.type = CubeTile.prototype.type = 'cube';


module.exports = CubeGeometry;

},{"../GraphFinder":14,"../collections/LruMap":30,"../util/clamp":87,"../util/cmp":89,"../util/hash":99,"../util/inherits":100,"../util/rotateVector":108,"../util/type":110,"./Level":55,"./common":56,"gl-matrix/src/gl-matrix/vec3":10}],53:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var inherits = require('../util/inherits');
var hash = require('../util/hash');
var cmp = require('../util/cmp');
var common = require('./common');
var Level = require('./Level');
var type = require('../util/type');


/**
 * @class
 * @implements Tile
 * @classdesc A tile in an @{EquirectGeometry}.
 */
function EquirectTile(z, geometry) {
  this.z = z;
  this._geometry = geometry;
  this._level = geometry.levelList[z];
}


EquirectTile.prototype.rotX = function() {
  return 0;
};


EquirectTile.prototype.rotY = function() {
  return 0;
};


EquirectTile.prototype.centerX = function() {
  return 0.5;
};


EquirectTile.prototype.centerY = function() {
  return 0.5;
};


EquirectTile.prototype.scaleX = function() {
  return 1;
};


EquirectTile.prototype.scaleY = function() {
  return 1;
};


EquirectTile.prototype.width = function() {
  return this._level.tileWidth();
};


EquirectTile.prototype.height = function() {
  return this._level.tileHeight();
};


EquirectTile.prototype.levelWidth = function() {
  return this._level.width();
};


EquirectTile.prototype.levelHeight = function() {
  return this._level.height();
};


EquirectTile.prototype.atTopLevel = function() {
  return this.z === 0;
};


EquirectTile.prototype.atBottomLevel = function() {
  return this.z === this._geometry.levelList.length - 1;
};


EquirectTile.prototype.atTopEdge = function() {
  return true;
};


EquirectTile.prototype.atBottomEdge = function() {
  return true;
};


EquirectTile.prototype.atLeftEdge = function() {
  return true;
};


EquirectTile.prototype.atRightEdge = function() {
  return true;
};


EquirectTile.prototype.padTop = function() {
  return false;
};


EquirectTile.prototype.padBottom = function() {
  return false;
};


EquirectTile.prototype.padLeft = function() {
  return false;
};


EquirectTile.prototype.padRight = function() {
  return false;
};


EquirectTile.prototype.parent = function() {
  if (this.atTopLevel()) {
    return null;
  }
  return new EquirectTile(this.z - 1, this._geometry);
};


EquirectTile.prototype.children = function(result) {
  if (this.atBottomLevel()) {
    return null;
  }
  result = result || [];
  result.push(new EquirectTile(this.z + 1, this._geometry));
  return result;
};


EquirectTile.prototype.neighbors = function() {
  return [];
};


EquirectTile.prototype.hash = function() {
  return EquirectTile.hash(this);
};


EquirectTile.prototype.equals = function(other) {
  return EquirectTile.equals(this, other);
};


EquirectTile.prototype.cmp = function(other) {
  return EquirectTile.cmp(this, other);
};


EquirectTile.prototype.str = function() {
  return EquirectTile.str(this);
};


EquirectTile.hash = function(tile) {
  return hash(tile.z);
};


EquirectTile.equals = function(tile1, tile2) {
  return tile1.z === tile2.z;
};


EquirectTile.cmp = function(tile1, tile2) {
  return cmp(tile1.z, tile2.z);
};


EquirectTile.str = function(tile) {
  return 'EquirectTile(' + tile.z + ')';
};


function EquirectLevel(levelProperties) {
  this.constructor.super_.call(this, levelProperties);
  this._width = levelProperties.width;
}

inherits(EquirectLevel, Level);


EquirectLevel.prototype.width = function() {
  return this._width;
};


EquirectLevel.prototype.height = function() {
  return this._width/2;
};


EquirectLevel.prototype.tileWidth = function() {
  return this._width;
};


EquirectLevel.prototype.tileHeight = function() {
  return this._width/2;
};


/**
 * @class
 * @implements Geometry
 * @classdesc A @{Geometry} implementation suitable for equirectangular images
 *            with a 2:1 aspect ratio.
 *
 * @param {Object[]} levelPropertiesList Level description
 * @param {number} levelPropertiesList[].width Level width in pixels
*/
function EquirectGeometry(levelPropertiesList) {
  if (type(levelPropertiesList) !== 'array') {
    throw new Error('Level list must be an array');
  }

  this.levelList = common.makeLevelList(levelPropertiesList, EquirectLevel);
  this.selectableLevelList = common.makeSelectableLevelList(this.levelList);
}


EquirectGeometry.prototype.maxTileSize = function() {
  var maxTileSize = 0;
  for (var i = 0; i < this.levelList.length; i++) {
    var level = this.levelList[i];
    maxTileSize = Math.max(maxTileSize, level.tileWidth, level.tileHeight);
  }
  return maxTileSize;
};


EquirectGeometry.prototype.levelTiles = function(level, result) {
  var levelIndex = this.levelList.indexOf(level);
  result = result || [];
  result.push(new EquirectTile(levelIndex, this));
  return result;
};


EquirectGeometry.prototype.visibleTiles = function(view, level, result) {
  var tile = new EquirectTile(this.levelList.indexOf(level), this);
  result = result || [];
  result.length = 0;
  result.push(tile);
};


EquirectGeometry.TileClass = EquirectGeometry.prototype.TileClass = EquirectTile;
EquirectGeometry.type = EquirectGeometry.prototype.type = 'equirect';
EquirectTile.type = EquirectTile.prototype.type = 'equirect';


module.exports = EquirectGeometry;

},{"../util/cmp":89,"../util/hash":99,"../util/inherits":100,"../util/type":110,"./Level":55,"./common":56}],54:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var inherits = require('../util/inherits');
var hash = require('../util/hash');
var GraphFinder = require('../GraphFinder');
var LruMap = require('../collections/LruMap');
var Level = require('./Level');
var makeLevelList = require('./common').makeLevelList;
var makeSelectableLevelList = require('./common').makeSelectableLevelList;
var clamp = require('../util/clamp');
var mod = require('../util/mod');
var cmp = require('../util/cmp');
var type = require('../util/type');
var vec2 = require('gl-matrix/src/gl-matrix/vec2');

// Some renderer implementations require tiles to be padded around with
// repeated pixels to prevent the appearance of visible seams between tiles.
//
// In order to prevent the padding from being visible, the tiles must be
// padded and stacked such that the padding on one of the sides, when present,
// stacks below the neighboring tile on that side.
//
// Padding rules:
// * Pad tiles on the right and on the bottom.
//
// Stacking rules:
// * Within an image, stack smaller zoom levels below larger zoom levels.
// * Within a level, stack tiles bottom to top in ascending Y coordinate order.
// * Within a row, stack tiles bottom to top in ascending X coordinate order.

// Offsets to apply to the (x,y) coordinates of a tile to get its neighbors.
var neighborOffsets = [
  [  0,  1 ], // top
  [  1,  0 ], // right
  [  0, -1 ], // bottom
  [ -1,  0 ]  // left
];


/**
 * @class
 * @implements Tile
 * @classdesc A tile in a @{FlatGeometry}.
 */
function FlatTile(x, y, z, geometry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this._geometry = geometry;
  this._level = geometry.levelList[z];
}


FlatTile.prototype.rotX = function() {
  return 0;
};


FlatTile.prototype.rotY = function() {
  return 0;
};


FlatTile.prototype.centerX = function() {
  var levelWidth = this._level.width();
  var tileWidth = this._level.tileWidth();
  return (this.x * tileWidth + 0.5 * this.width()) / levelWidth - 0.5;
};


FlatTile.prototype.centerY = function() {
  var levelHeight = this._level.height();
  var tileHeight = this._level.tileHeight();
  return 0.5 - (this.y * tileHeight + 0.5 * this.height()) / levelHeight;
};


FlatTile.prototype.scaleX = function() {
  var levelWidth = this._level.width();
  return this.width() / levelWidth;
};


FlatTile.prototype.scaleY = function() {
  var levelHeight = this._level.height();
  return this.height() / levelHeight;
};


FlatTile.prototype.width = function() {
  var levelWidth = this._level.width();
  var tileWidth = this._level.tileWidth();
  if (this.atRightEdge()) {
    var widthRemainder = mod(levelWidth, tileWidth);
    return widthRemainder || tileWidth;
  } else {
    return tileWidth;
  }
};


FlatTile.prototype.height = function() {
  var levelHeight = this._level.height();
  var tileHeight = this._level.tileHeight();
  if (this.atBottomEdge()) {
    var heightRemainder = mod(levelHeight, tileHeight);
    return heightRemainder || tileHeight;
  } else {
    return tileHeight;
  }
};


FlatTile.prototype.levelWidth = function() {
  return this._level.width();
};


FlatTile.prototype.levelHeight = function() {
  return this._level.height();
};


FlatTile.prototype.atTopLevel = function() {
  return this.z === 0;
};


FlatTile.prototype.atBottomLevel = function() {
  return this.z === this._geometry.levelList.length - 1;
};


FlatTile.prototype.atTopEdge = function() {
  return this.y === 0;
};


FlatTile.prototype.atBottomEdge = function() {
  return this.y === this._level.numVerticalTiles() - 1;
};


FlatTile.prototype.atLeftEdge = function() {
  return this.x === 0;
};


FlatTile.prototype.atRightEdge = function() {
  return this.x === this._level.numHorizontalTiles() - 1;
};


FlatTile.prototype.padTop = function() {
  return false;
};


FlatTile.prototype.padBottom = function() {
  return !this.atBottomEdge();
};


FlatTile.prototype.padLeft = function() {
  return false;
};


FlatTile.prototype.padRight = function() {
  return !this.atRightEdge();
};


FlatTile.prototype.vertices = function(result) {

  var left = this.centerX() - this.scaleX() / 2;
  var right = this.centerX() + this.scaleX() / 2;
  var bottom = this.centerY() - this.scaleY() / 2;
  var top = this.centerY() + this.scaleY() / 2;

  vec2.set(result[0], left, top);
  vec2.set(result[1], right, top);
  vec2.set(result[2], right, bottom);
  vec2.set(result[3], left, bottom);

  return result;

};


FlatTile.prototype.parent = function() {


  if (this.atTopLevel()) {
    return null;
  }

  var geometry = this._geometry;

  var z = this.z - 1;
  // TODO: Currently assuming each level is double the size of previous one.
  // Fix to support other multiples.
  var x = Math.floor(this.x / 2);
  var y = Math.floor(this.y / 2);

  return new FlatTile(x, y, z, geometry);

};


FlatTile.prototype.children = function(result) {
  if (this.atBottomLevel()) {
    return null;
  }

  var geometry = this._geometry;
  var z = this.z + 1;

  result = result || [];

  // TODO: Currently assuming each level is double the size of previous one.
  // Fix to support other multiples.
  result.push(new FlatTile(2*this.x  , 2*this.y  , z, geometry));
  result.push(new FlatTile(2*this.x  , 2*this.y+1, z, geometry));
  result.push(new FlatTile(2*this.x+1, 2*this.y  , z, geometry));
  result.push(new FlatTile(2*this.x+1, 2*this.y+1, z, geometry));

  return result;

};


FlatTile.prototype.neighbors = function() {

  var geometry = this._geometry;
  var cache = geometry._neighborsCache;

  // Satisfy from cache when available.
  var cachedResult = cache.get(this);
  if (cachedResult) {
    return cachedResult;
  }

  var x = this.x;
  var y = this.y;
  var z = this.z;
  var level = this._level;

  var numX = level.numHorizontalTiles() - 1;
  var numY = level.numVerticalTiles() - 1;

  var result = [];

  for (var i = 0; i < neighborOffsets.length; i++) {
    var xOffset = neighborOffsets[i][0];
    var yOffset = neighborOffsets[i][1];

    var newX = x + xOffset;
    var newY = y + yOffset;
    var newZ = z;

    if (0 <= newX && newX <= numX && 0 <= newY && newY <= numY) {
      result.push(new FlatTile(newX, newY, newZ, geometry));
    }
  }

  // Store into cache to satisfy future requests.
  cache.set(this, result);

  return result;

};


FlatTile.prototype.hash = function() {
  return FlatTile.hash(this);
};


FlatTile.prototype.equals = function(other) {
  return FlatTile.equals(this, other);
};


FlatTile.prototype.cmp = function(other) {
  return FlatTile.cmp(this, other);
};


FlatTile.prototype.str = function() {
  return FlatTile.str(this);
};


FlatTile.hash = function(tile) {
  return tile != null ? hash(tile.z, tile.x, tile.y) : 0;
};


FlatTile.equals = function(tile1, tile2) {
  return (tile1 != null && tile2 != null &&
          tile1.z === tile2.z &&
          tile1.x === tile2.x &&
          tile1.y === tile2.y);
};


FlatTile.cmp = function(tile1, tile2) {
  return (cmp(tile1.z, tile2.z) ||
          cmp(tile1.y, tile2.y) ||
          cmp(tile1.x, tile2.x));
};


FlatTile.str = function(tile) {
  return 'FlatTile(' + tile.x + ', ' + tile.y + ', ' + tile.z + ')';
};


function FlatLevel(levelProperties) {
  this.constructor.super_.call(this, levelProperties);

  this._width = levelProperties.width;
  this._height = levelProperties.height;
  this._tileWidth = levelProperties.tileWidth;
  this._tileHeight = levelProperties.tileHeight;
}

inherits(FlatLevel, Level);


FlatLevel.prototype.width = function() {
  return this._width;
};


FlatLevel.prototype.height = function() {
  return this._height;
};


FlatLevel.prototype.tileWidth = function() {
  return this._tileWidth;
};


FlatLevel.prototype.tileHeight = function() {
  return this._tileHeight;
};


FlatLevel.prototype._validateWithParentLevel = function(parentLevel) {

  var width = this.width();
  var height = this.height();
  var tileWidth = this.tileWidth();
  var tileHeight = this.tileHeight();

  var parentWidth = parentLevel.width();
  var parentHeight = parentLevel.height();
  var parentTileWidth = parentLevel.tileWidth();
  var parentTileHeight = parentLevel.tileHeight();

  if (width % parentWidth !== 0) {
    return new Error('Level width must be multiple of parent level: ' +
                     width + ' vs. ' + parentWidth);
  }

  if (height % parentHeight !== 0) {
    return new Error('Level height must be multiple of parent level: ' +
                     height + ' vs. ' + parentHeight);
  }

  if (tileWidth % parentTileWidth !== 0) {
    return new Error('Level tile width must be multiple of parent level: ' +
                     tileWidth + ' vs. ' + parentTileWidth);
  }

  if (tileHeight % parentTileHeight !== 0) {
    return new Error('Level tile height must be multiple of parent level: ' +
                     tileHeight + ' vs. ' + parentTileHeight);
  }

};


/**
 * @class
 * @implements Geometry
 * @classdesc A @{Geometry} implementation suitable for tiled flat images with
 *            multiple resolution levels.
 *
 * The following restrictions apply:
 *   - All tiles must be square, except when in the last row or column position,
 *     and must form a rectangular grid;
 *   - The width and height of a level must be multiples of the parent level
 *     width and height.
 *
 * @param {Object[]} levelPropertiesList Level description
 * @param {number} levelPropertiesList[].width Level width in pixels
 * @param {number} levelPropertiesList[].tileWidth Tile width in pixels for
 *                 square tiles
 * @param {number} levelPropertiesList[].height Level height in pixels
 * @param {number} levelPropertiesList[].tileHeight Tile height in pixels for
 *                 square tiles
 */
function FlatGeometry(levelPropertiesList) {
  if (type(levelPropertiesList) !== 'array') {
    throw new Error('Level list must be an array');
  }

  this.levelList = makeLevelList(levelPropertiesList, FlatLevel);
  this.selectableLevelList = makeSelectableLevelList(this.levelList);

  for (var i = 1; i < this.levelList.length; i++) {
    this.levelList[i]._validateWithParentLevel(this.levelList[i-1]);
  }

  this._graphFinder = new GraphFinder(FlatTile.equals, FlatTile.hash);

  this._neighborsCache = new LruMap(FlatTile.equals, FlatTile.hash, 64);

  this._viewParams = {};

  this._tileVertices = [
    vec2.create(),
    vec2.create(),
    vec2.create(),
    vec2.create()
  ];
}


FlatGeometry.prototype.maxTileSize = function() {
  var maxTileSize = 0;
  for (var i = 0; i < this.levelList.length; i++) {
    var level = this.levelList[i];
    maxTileSize = Math.max(maxTileSize, level.tileWidth, level.tileHeight);
  }
  return maxTileSize;
};


FlatGeometry.prototype.levelTiles = function(level, result) {

  var levelIndex = this.levelList.indexOf(level);
  var maxX = level.numHorizontalTiles() - 1;
  var maxY = level.numVerticalTiles() - 1;

  if (!result) {
    result = [];
  }

  for (var x = 0; x <= maxX; x++) {
    for (var y = 0; y <= maxY; y++) {
      result.push(new FlatTile(x, y, levelIndex, this));
    }
  }

  return result;

};


FlatGeometry.prototype._closestTile = function(params, level) {

  // Get view parameters.
  var x = params.x;
  var y = params.y;

  // Get the desired zoom level.
  var tileZ = this.levelList.indexOf(level);
  var levelWidth = level.width();
  var levelHeight = level.height();
  var tileWidth = level.tileWidth();
  var tileHeight = level.tileHeight();
  var numX = level.numHorizontalTiles();
  var numY = level.numVerticalTiles();

  // Find the coordinates of the tile that the view ray points into.
  var tileX = clamp(Math.floor(x * levelWidth / tileWidth), 0, numX - 1);
  var tileY = clamp(Math.floor(y * levelHeight / tileHeight), 0, numY - 1);

  return new FlatTile(tileX, tileY, tileZ, this);

};


FlatGeometry.prototype.visibleTiles = function(view, level, result) {

  var viewParams = this._viewParams;
  var tileVertices = this._tileVertices;
  var graphFinder = this._graphFinder;

  function tileNeighbors(t) {
    return t.neighbors();
  }

  function tileVisible(t) {
    t.vertices(tileVertices);
    return view.intersects(tileVertices);
  }

  var startingTile = this._closestTile(view.parameters(viewParams), level);

  if (!tileVisible(startingTile)) {
    throw new Error('Starting tile is not visible');
  }

  result = result || [];

  var tile;
  graphFinder.start(startingTile, tileNeighbors, tileVisible);
  while ((tile = graphFinder.next()) != null) {
    result.push(tile);
  }

  return result;

};



FlatGeometry.TileClass = FlatGeometry.prototype.TileClass = FlatTile;
FlatGeometry.type = FlatGeometry.prototype.type = 'flat';
FlatTile.type = FlatTile.prototype.type = 'flat';


module.exports = FlatGeometry;

},{"../GraphFinder":14,"../collections/LruMap":30,"../util/clamp":87,"../util/cmp":89,"../util/hash":99,"../util/inherits":100,"../util/mod":101,"../util/type":110,"./Level":55,"./common":56,"gl-matrix/src/gl-matrix/vec2":9}],55:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function Level(levelProperties) {
  this._fallbackOnly = !!levelProperties.fallbackOnly;
}

Level.prototype.numHorizontalTiles = function() {
  return Math.ceil(this.width() / this.tileWidth());
};

Level.prototype.numVerticalTiles = function() {
  return Math.ceil(this.height() / this.tileHeight());
};

Level.prototype.fallbackOnly = function() {
  return this._fallbackOnly;
};

module.exports = Level;
},{}],56:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var cmp = require('../util/cmp');

function makeLevelList(levelPropertiesList, LevelClass) {
  var list = [];

  for (var i = 0; i < levelPropertiesList.length; i++) {
    list.push(new LevelClass(levelPropertiesList[i]));
  }

  list.sort(function(level1, level2) {
    return cmp(level1.width(), level2.width());
  });

  return list;
}

function makeSelectableLevelList(levelList) {
  var list = [];

  for (var i = 0; i < levelList.length; i++) {
    if (!levelList[i]._fallbackOnly) {
      list.push(levelList[i]);
    }
  }

  if (!list.length) {
    throw new Error('No selectable levels in list');
  }

  return list;
}

module.exports = {
  makeLevelList: makeLevelList,
  makeSelectableLevelList: makeSelectableLevelList
};

},{"../util/cmp":89}],57:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {

  // Stages.
  WebGlStage: require('./stages/WebGl'),
  CssStage: require('./stages/Css'),
  FlashStage: require('./stages/Flash'),

  // Renderers.
  WebGlCubeRenderer: require('./renderers/WebGlCube'),
  WebGlFlatRenderer: require('./renderers/WebGlFlat'),
  WebGlEquirectRenderer: require('./renderers/WebGlEquirect'),
  CssCubeRenderer: require('./renderers/CssCube'),
  CssFlatRenderer: require('./renderers/CssFlat'),
  FlashCubeRenderer: require('./renderers/FlashCube'),
  FlashFlatRenderer: require('./renderers/FlashFlat'),
  registerDefaultRenderers: require('./renderers/registerDefaultRenderers'),

  // Geometries.
  CubeGeometry: require('./geometries/Cube'),
  FlatGeometry: require('./geometries/Flat'),
  EquirectGeometry: require('./geometries/Equirect'),

  // Views.
  RectilinearView: require('./views/Rectilinear'),
  FlatView: require('./views/Flat'),

  // Sources.
  ImageUrlSource: require('./sources/ImageUrl'),
  SingleAssetSource: require('./sources/SingleAsset'),

  // Assets.
  DynamicCanvasAsset: require('./assets/DynamicCanvas'),
  StaticCanvasAsset: require('./assets/StaticCanvas'),

  // Texture store.
  TextureStore: require('./TextureStore'),

  // Layer.
  Layer: require('./Layer'),

  // Render loop.
  RenderLoop: require('./RenderLoop'),

  // Controls.
  KeyControlMethod: require('./controls/Key'),
  DragControlMethod: require('./controls/Drag'),
  QtvrControlMethod: require('./controls/Qtvr'),
  ScrollZoomControlMethod: require('./controls/ScrollZoom'),
  PinchZoomControlMethod: require('./controls/PinchZoom'),
  VelocityControlMethod: require('./controls/Velocity'),
  ElementPressControlMethod: require('./controls/ElementPress'),
  Controls: require('./controls/Controls'),
  Dynamics: require('./controls/Dynamics'),

  // High-level API.
  Viewer: require('./Viewer'),
  Scene: require('./Scene'),

  // Hotspots.
  Hotspot: require('./Hotspot'),
  HotspotContainer: require('./HotspotContainer'),

  // Effects.
  colorEffects: require('./colorEffects'),

  // Miscellaneous functions.
  registerDefaultControls: require('./controls/registerDefaultControls'),
  autorotate: require('./autorotate'),

  // Utility functions.
  util: {
    async: require('./util/async'),
    cancelize: require('./util/cancelize'),
    chain: require('./util/chain'),
    clamp: require('./util/clamp'),
    clock: require('./util/clock'),
    cmp: require('./util/cmp'),
    compose: require('./util/compose'),
    convertFov: require('./util/convertFov'),
    decimal: require('./util/decimal'),
    defaults: require('./util/defaults'),
    defer: require('./util/defer'),
    degToRad: require('./util/degToRad'),
    delay: require('./util/delay'),
    dom: require('./util/dom'),
    extend: require('./util/extend'),
    hash: require('./util/hash'),
    inherits: require('./util/inherits'),
    mod: require('./util/mod'),
    noop: require('./util/noop'),
    once: require('./util/once'),
    pixelRatio: require('./util/pixelRatio'),
    radToDeg: require('./util/radToDeg'),
    real: require('./util/real'),
    retry: require('./util/retry'),
    tween: require('./util/tween'),
    type: require('./util/type')
  },

  // Expose dependencies for clients to use.
  dependencies: {
    bowser: require('bowser'),
    glMatrix: require('gl-matrix'),
    eventEmitter: require('minimal-event-emitter'),
    hammerjs: require('hammerjs')
  }
};

},{"./Hotspot":15,"./HotspotContainer":16,"./Layer":17,"./RenderLoop":19,"./Scene":20,"./TextureStore":21,"./Viewer":23,"./assets/DynamicCanvas":24,"./assets/StaticCanvas":26,"./autorotate":28,"./colorEffects":36,"./controls/Controls":38,"./controls/Drag":39,"./controls/Dynamics":41,"./controls/ElementPress":42,"./controls/Key":44,"./controls/PinchZoom":45,"./controls/Qtvr":46,"./controls/ScrollZoom":47,"./controls/Velocity":48,"./controls/registerDefaultControls":50,"./geometries/Cube":52,"./geometries/Equirect":53,"./geometries/Flat":54,"./renderers/CssCube":60,"./renderers/CssFlat":61,"./renderers/FlashCube":63,"./renderers/FlashFlat":64,"./renderers/WebGlCube":67,"./renderers/WebGlEquirect":68,"./renderers/WebGlFlat":69,"./renderers/registerDefaultRenderers":70,"./sources/ImageUrl":71,"./sources/SingleAsset":72,"./stages/Css":73,"./stages/Flash":74,"./stages/WebGl":77,"./util/async":84,"./util/cancelize":85,"./util/chain":86,"./util/clamp":87,"./util/clock":88,"./util/cmp":89,"./util/compose":90,"./util/convertFov":91,"./util/decimal":92,"./util/defaults":93,"./util/defer":94,"./util/degToRad":95,"./util/delay":96,"./util/dom":97,"./util/extend":98,"./util/hash":99,"./util/inherits":100,"./util/mod":101,"./util/noop":102,"./util/once":103,"./util/pixelRatio":104,"./util/radToDeg":105,"./util/real":106,"./util/retry":107,"./util/tween":109,"./util/type":110,"./views/Flat":111,"./views/Rectilinear":112,"bowser":1,"gl-matrix":2,"hammerjs":12,"minimal-event-emitter":13}],58:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var cssSupported = require('./support/Css');
var setTransform = require('./util/dom').setTransform;
var setPixelPosition = require('./util/dom').setPixelPosition;
var decimal = require('./util/decimal');

// This cannot belong in util/dom.js because support/Css also depends on it
// and it would cause a circular dependency.

function positionAbsolutely(element, x, y) {
  if (cssSupported()) {
    // Use CSS 3D transforms when the browser supports them.
    // A translateZ(0) transform improves performance on Chrome by creating a
    // new layer for the element, which prevents unnecessary repaints.
    var transform = 'translateX(' + decimal(x) + 'px) translateY(' + decimal(y) + 'px) translateZ(0)';
    setTransform(element, transform);
  } else {
    // Fall back to absolute positioning.
    setPixelPosition(element, x, y);
  }
}

module.exports = positionAbsolutely;

},{"./support/Css":80,"./util/decimal":92,"./util/dom":97}],59:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Map = require('../collections/Map');
var setOverflowHidden = require('../util/dom').setOverflowHidden;
var setNoPointerEvents = require('../util/dom').setNoPointerEvents;
var setNullTransform = require('../util/dom').setNullTransform;
var setTransform = require('../util/dom').setTransform;

var debug = typeof MARZIPANODEBUG !== 'undefined' && MARZIPANODEBUG.css;


function tileCmp(a, b) {
  return a.cmp(b);
}


function CssBaseRenderer(root, quirks, tileClass) {

  this._root = root;

  this._browserQuirks = quirks;

  // Create a container for this renderer's tiles, so we can style them
  // as a whole separately from other renderers in the same stage.
  var domElement = document.createElement('div');
  root.appendChild(domElement);

  domElement.style.position = 'absolute';

  // For some weird reason, this prevents flickering on Safari Desktop.
  setOverflowHidden(domElement);

  // Prevent touch events on tiles from messing up pinching gestures on iOS.
  setNoPointerEvents(domElement);

  if (this._browserQuirks.useNullTransform) {
    setNullTransform(domElement);
  }

  this.domElement = domElement;

  this._oldTileList = [];
  this._newTileList = [];

  this._textureMap = new Map(tileClass.equals, tileClass.hash);
}


CssBaseRenderer.prototype.destroy = function() {
  this._root.removeChild(this.domElement);
  this._textureMap = null;
  this.domElement = null;
};


CssBaseRenderer.prototype.startLayer = function(layer, rect) {
  var domElement = this.domElement;

  // Set viewport effect.
  domElement.style.left = rect.left + 'px';
  domElement.style.top = rect.top + 'px';
  domElement.style.width = rect.width + 'px';
  domElement.style.height = rect.height + 'px';

  // Set opacity effect.
  var opacity = 1.0;
  var effects = layer.effects();
  if (effects && effects.opacity != null) {
    opacity = effects.opacity;
  }
  domElement.style.opacity = opacity;

  // Clear temporary variables.
  this._newTileList.length = 0;
  this._textureMap.clear();
};


CssBaseRenderer.prototype.renderTile = function(tile, texture) {
  this._newTileList.push(tile);
  this._textureMap.set(tile, texture);
};


CssBaseRenderer.prototype.endLayer = function(layer) {

  var domElement = this.domElement;
  var oldTileList = this._oldTileList;
  var newTileList = this._newTileList;
  var textureMap = this._textureMap;
  var oldIndex, newIndex, oldTile, newTile;
  var texture, canvas;
  var currentNode, nextNode;

  var view = layer.view();

  // Iterate the old and new tile lists in a consistent order and perform
  // insertions and removals as we go. This minimizes the number of DOM
  // operations performed.

  // Neither the tile list nor the texture list may contain duplicates,
  // otherwise this logic will fail.

  // Consistency check.
  if (domElement.children.length !== oldTileList.length) {
    throw new Error('DOM not in sync with tile list');
  }

  newTileList.sort(tileCmp);

  oldIndex = 0;
  oldTile = oldTileList[oldIndex];
  currentNode = domElement.firstChild;

  for (newIndex = 0; newIndex < newTileList.length; newIndex++) {

    newTile = newTileList[newIndex];

    // Iterate old list until it catches up with the new list.
    while (oldIndex < oldTileList.length) {

      if (oldTile.cmp(newTile) >= 0) {
        // Caught up.
        break;
      }

      // Tile is no longer visible.
      // Remove it from the DOM.
      nextNode = currentNode.nextSibling;
      domElement.removeChild(currentNode);
      currentNode = nextNode;
      oldTile = oldTileList[++oldIndex];
    }

    // Get the texture for the current tile.
    texture = textureMap.get(newTile);
    canvas = texture ? texture._canvas : null;

    // Consistency check.
    if (!canvas) {
      throw new Error('Rendering tile with missing texture');
    }

    if (oldTile && oldTile.cmp(newTile) === 0) {
      // The old and new tile are the same.

      // Consistency check.
      if (canvas != currentNode) {
        throw new Error('DOM not in sync with tile list');
      }

      currentNode = currentNode.nextSibling;
      oldTile = oldTileList[++oldIndex];

    } else {
      // The new tile comes before the old tile.
      // Insert it into the DOM.
      domElement.insertBefore(canvas, currentNode);
    }

    // Set the CSS transform on the current tile.
    setTransform(canvas, this.calculateTransform(newTile, texture, view));

    if (debug) {
      canvas.setAttribute('data-tile', newTile.str());
    }
  }

  // Remove trailing tiles that are no longer visible from the DOM.
  while (currentNode) {
    nextNode = currentNode.nextSibling;
    domElement.removeChild(currentNode);
    currentNode = nextNode;
  }

  // Consistenty check.
  if (domElement.children.length !== newTileList.length) {
    throw new Error('DOM not in sync with tile list');
  }

  // The old and new tile lists swap roles between iterations.
  var tmp = this._oldTileList;
  this._oldTileList = this._newTileList;
  this._newTileList = tmp;
};


module.exports = CssBaseRenderer;

},{"../collections/Map":32,"../util/dom":97}],60:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var CubeTile = require('../geometries/Cube').TileClass;
var CssBaseRenderer = require('./CssBase');
var decimal = require('../util/decimal');
var inherits = require('../util/inherits');


function CssCubeRenderer(root, quirks) {
  this.constructor.super_.call(this, root, quirks, CubeTile);
}

inherits(CssCubeRenderer, CssBaseRenderer);


CssCubeRenderer.prototype.calculateTransform = function(tile, texture, view) {

  var padSize = this._browserQuirks.padSize;
  var reverseLevelDepth = this._browserQuirks.reverseLevelDepth;
  var perspectiveNudge = this._browserQuirks.perspectiveNudge;

  var transform = '';

  // Calculate the cube size for this level.
  var cubeSize = reverseLevelDepth ? 256 - tile.z : tile.levelWidth();

  // Place top left corner of tile at viewport center to serve as the center
  // of rotation.
  // We do not rotate about the center of the tile because, for some mysterious
  // reason, this seems to occasionally crash Chrome.
  var size = view.size();
  var viewportWidth = size.width;
  var viewportHeight = size.height;
  transform += 'translate3d(' + decimal(viewportWidth/2) + 'px, ' + decimal(viewportHeight/2) + 'px, 0px) ';

  // Set the perspective depth.
  var perspective = 0.5 * viewportHeight / Math.tan(view.fov() / 2);
  var distance = perspective + perspectiveNudge;
  transform += 'perspective(' + decimal(perspective) + 'px) translateZ(' + decimal(distance) + 'px) ';

  // Set the camera rotation.
  var viewRotZ = -view.roll();
  var viewRotX = -view.pitch();
  var viewRotY = view.yaw();
  transform += 'rotateZ(' + decimal(viewRotZ) + 'rad) rotateX(' + decimal(viewRotX) + 'rad) rotateY(' + decimal(viewRotY) + 'rad) ';

  // Set the cube face orientation.
  var tileRotX = -tile.rotX();
  var tileRotY = tile.rotY();
  transform += 'rotateX(' + decimal(tileRotX) + 'rad) rotateY(' + decimal(tileRotY) + 'rad) ';

  // Move tile into its position within the cube face.
  var cornerX = tile.centerX() - tile.scaleX() / 2;
  var cornerY = -(tile.centerY() + tile.scaleY() / 2);
  var translX = cornerX * cubeSize;
  var translY = cornerY * cubeSize;
  var translZ = -cubeSize / 2;
  transform += 'translate3d(' + decimal(translX) + 'px, ' + decimal(translY) + 'px, ' + decimal(translZ) + 'px) ';

  // Scale tile into correct size.
  if (reverseLevelDepth) {
    var scaleX = cubeSize * tile.scaleX() / tile.width();
    var scaleY = cubeSize * tile.scaleY() / tile.height();
    transform += 'scale(' + decimal(scaleX) + ', ' + decimal(scaleY) + ') ';
  }

  // Compensate for padding around the tile.
  var padLeft = tile.padLeft() ? padSize : 0;
  var padTop = tile.padTop() ? padSize : 0;
  if (padLeft !== 0 || padTop !== 0) {
    transform += 'translate3d(' + decimal(-padLeft) + 'px, ' + decimal(-padTop) + 'px, 0) ';
  }

  return transform;

};


module.exports = CssCubeRenderer;

},{"../geometries/Cube":52,"../util/decimal":92,"../util/inherits":100,"./CssBase":59}],61:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var FlatTile = require('../geometries/Flat').TileClass;
var CssBaseRenderer = require('./CssBase');
var decimal = require('../util/decimal');
var inherits = require('../util/inherits');


function CssFlatRenderer(root, quirks) {
  this.constructor.super_.call(this, root, quirks, FlatTile);
}

inherits(CssFlatRenderer, CssBaseRenderer);


CssFlatRenderer.prototype.calculateTransform = function(tile, texture, view) {

  var padSize = this._browserQuirks.padSize;

  var transform = '';

  // Place top left corner of tile at the center of the viewport.
  var viewportWidth = view.width();
  var viewportHeight = view.height();
  transform += 'translateX(' + decimal(viewportWidth/2) + 'px) translateY(' + decimal(viewportHeight/2) + 'px) ';

  // Determine the zoom factor.
  var zoomX = viewportWidth / view._zoomX();
  var zoomY = viewportHeight / view._zoomY();

  // Move tile into its position within the image.
  var cornerX = tile.centerX() - tile.scaleX() / 2 + 0.5;
  var cornerY = 0.5 - tile.centerY() - tile.scaleY() / 2;
  var translX = cornerX * zoomX;
  var translY = cornerY * zoomY;
  transform += 'translateX(' + decimal(translX) + 'px) translateY(' + decimal(translY) + 'px) ';

  // Apply view offsets.
  var offX = -view.x() * zoomX;
  var offY = -view.y() * zoomY;
  transform += 'translateX(' + decimal(offX) + 'px) translateY(' + decimal(offY) + 'px) ';

  // Compensate for padding around the tile.
  var padLeft = tile.padLeft() ? padSize : 0;
  var padTop = tile.padTop() ? padSize : 0;
  if (padLeft !== 0 || padTop !== 0) {
    transform += 'translateX(' + decimal(-padLeft) + 'px) translateY(' + decimal(-padTop) + 'px) ';
  }

  // Scale tile into correct size.
  var scaleX = zoomX / tile.levelWidth();
  var scaleY = zoomY / tile.levelHeight();
  transform += 'scale(' + decimal(scaleX) + ', ' + decimal(scaleY) + ') ';

  return transform;

};


module.exports = CssFlatRenderer;

},{"../geometries/Flat":54,"../util/decimal":92,"../util/inherits":100,"./CssBase":59}],62:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Map = require('../collections/Map');


function tileCmp(a, b) {
  return a.cmp(b);
}


function FlashBaseRenderer(flashElement, layerId, quirks, tileClass) {

  this._flashElement = flashElement;
  this._layerId = layerId;
  this._quirks = quirks;

  this._tileList = [];

  this._textureMap = new Map(tileClass.equals, tileClass.hash);

  // Whether the Flash layer for this renderer has already been created
  // by calling flashElement.createLayer(). Note that we cannot do this
  // right here because Flash may not be initialized yet.
  this._layerCreated = false;
}


FlashBaseRenderer.prototype.destroy = function() {
  this._flashElement.destroyLayer(this._layerId);
  this._flashElement = null;
  this._layerId = null;
  this._layerCreated = null;
  this._tileList = null;
  this._padSize = null;
};


FlashBaseRenderer.prototype.startLayer = function(layer, rect) {
  if (!this._flashElement.isReady || !this._flashElement.isReady()) {
    return;
  }
  if (!this._layerCreated) {
    this._flashElement.createLayer(this._layerId);
    this._layerCreated = true;
  }
  this._tileList.length = 0;
  this._textureMap.clear();
};


FlashBaseRenderer.prototype.renderTile = function(tile, texture) {
  this._tileList.push(tile);
  this._textureMap.set(tile, texture);
};


FlashBaseRenderer.prototype.endLayer = function(layer, rect) {
  if (!this._flashElement.isReady || !this._flashElement.isReady()) {
    return;
  }

  // Sort tiles so they are rendered in an order coherent with their padding.
  var tileList = this._tileList;
  tileList.sort(tileCmp);

  this._renderOnFlash(layer, rect);
};


module.exports = FlashBaseRenderer;

},{"../collections/Map":32}],63:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var FlashBaseRenderer = require('./FlashBase');
var CubeTile = require('../geometries/Cube').TileClass;
var inherits = require('../util/inherits');

var radToDeg = require('../util/radToDeg');


function FlashCubeRenderer(flashElement, layerId, quirks) {
  this.constructor.super_.call(this, flashElement, layerId, quirks, CubeTile);
  this._flashTileList = [];
}

inherits(FlashCubeRenderer, FlashBaseRenderer);


FlashCubeRenderer.prototype._renderOnFlash = function(layer, rect) {

  var flashElement = this._flashElement;
  var layerId = this._layerId;
  var padSize = this._quirks.padSize;

  var tileList = this._tileList;
  var textureMap = this._textureMap;

  var flashTileList = this._flashTileList;
  flashTileList.length = 0;

  for (var i = 0; i < tileList.length; i++) {
    var tile = tileList[i];
    var texture = textureMap.get(tile);
    if (!texture) {
      throw new Error('Rendering tile with missing texture');
    }

    // Get padding sizes.
    var padTop = tile.padTop() ? padSize : 0;
    var padBottom = tile.padBottom() ? padSize : 0;
    var padLeft = tile.padLeft() ? padSize : 0;
    var padRight = tile.padRight() ? padSize : 0;

    flashTileList.push({
      textureId: texture._textureId,
      face: tile.face,
      width: tile.width(),
      height: tile.height(),
      centerX: tile.centerX(),
      centerY: tile.centerY(),
      rotX: radToDeg(tile.rotX()),
      rotY: radToDeg(tile.rotY()),
      levelSize: tile.levelWidth(),
      padTop: padTop,
      padBottom: padBottom,
      padLeft: padLeft,
      padRight: padRight
    });
  }

  // Get opacity value.
  var opacity = 1.0;
  var effects = layer.effects();
  if (effects && effects.opacity != null) {
    opacity = effects.opacity;
  }

  // Get view parameters.
  var view = layer.view();
  var yaw = view.yaw();
  var pitch = view.pitch();
  var roll = view.roll();
  var fov = view.fov();

  flashElement.drawCubeTiles(layerId, rect.width, rect.height, rect.left, rect.top,
                             opacity, yaw, pitch, roll, fov, flashTileList);
};


module.exports = FlashCubeRenderer;

},{"../geometries/Cube":52,"../util/inherits":100,"../util/radToDeg":105,"./FlashBase":62}],64:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var FlashBaseRenderer = require('./FlashBase');
var FlatTile = require('../geometries/Flat').TileClass;
var inherits = require('../util/inherits');


function FlashFlatRenderer(flashElement, layerId, quirks) {
  this.constructor.super_.call(this, flashElement, layerId, quirks, FlatTile);
  this._flashTileList = [];
}

inherits(FlashFlatRenderer, FlashBaseRenderer);


FlashFlatRenderer.prototype._renderOnFlash = function(layer, rect) {

  var flashElement = this._flashElement;
  var layerId = this._layerId;
  var padSize = this._quirks.padSize;

  var tileList = this._tileList;
  var textureMap = this._textureMap;

  var flashTileList = this._flashTileList;
  flashTileList.length = 0;

  for (var i = 0; i < tileList.length; i++) {
    var tile = tileList[i];
    var texture = textureMap.get(tile);
    if (!texture) {
      throw new Error('Rendering tile with missing texture');
    }

    // Get padding sizes.
    var padTop = tile.padTop() ? padSize : 0;
    var padBottom = tile.padBottom() ? padSize : 0;
    var padLeft = tile.padLeft() ? padSize : 0;
    var padRight = tile.padRight() ? padSize : 0;

    flashTileList.push({
      textureId: texture._textureId,
      width: tile.width(),
      height: tile.height(),
      centerX: tile.centerX(),
      centerY: tile.centerY(),
      scaleX: tile.scaleX(),
      scaleY: tile.scaleY(),
      levelWidth: tile.levelWidth(),
      levelHeight: tile.levelHeight(),
      padTop: padTop,
      padBottom: padBottom,
      padLeft: padLeft,
      padRight: padRight
    });
  }

  // Get opacity value.
  var opacity = 1.0;
  var effects = layer.effects();
  if (effects && effects.opacity != null) {
    opacity = effects.opacity;
  }

  // Get view parameters.
  var view = layer.view();
  var x = view.x();
  var y = view.y();
  var zoomX = view._zoomX();
  var zoomY = view._zoomY();

  flashElement.drawFlatTiles(layerId, rect.width, rect.height, rect.left, rect.top,
                             opacity, x, y, zoomX, zoomY, flashTileList);
};


module.exports = FlashFlatRenderer;

},{"../geometries/Flat":54,"../util/inherits":100,"./FlashBase":62}],65:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var WebGlCommon = require('./WebGlCommon');
var createConstantBuffers = WebGlCommon.createConstantBuffers;
var destroyConstantBuffers = WebGlCommon.destroyConstantBuffers;
var createShaderProgram = WebGlCommon.createShaderProgram;
var destroyShaderProgram = WebGlCommon.destroyShaderProgram;
var setViewport = WebGlCommon.setViewport;
var setupPixelEffectUniforms = WebGlCommon.setupPixelEffectUniforms;

var setDepth = WebGlCommon.setDepth;
var setTexture = WebGlCommon.setTexture;


var vertexSrc = "#define GLSLIFY 1\n/*\n * Copyright 2016 Google Inc. All rights reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform float uDepth;\nuniform mat4 uViewportMatrix;\nuniform mat4 uProjMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);\n  gl_Position.z = uDepth * gl_Position.w;\n  vTextureCoord = aTextureCoord;\n}\n";
var fragmentSrc = "/*\n * Copyright 2016 Google Inc. All rights reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform sampler2D uSampler;\nuniform float uOpacity;\nuniform vec4 uColorOffset;\nuniform mat4 uColorMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;\n  gl_FragColor = vec4(color.rgb * color.a * uOpacity, color.a * uOpacity);\n}\n";

var vertexIndices = [0, 1, 2, 0, 2, 3];
var vertexPositions = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0];
var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

var attribList = ['aVertexPosition', 'aTextureCoord'];
var uniformList = [
  'uDepth', 'uOpacity', 'uSampler', 'uProjMatrix', 'uViewportMatrix',
  'uColorOffset', 'uColorMatrix'
];

var mat4 = require('gl-matrix/src/gl-matrix/mat4');
var vec3 = require('gl-matrix/src/gl-matrix/vec3');


function WebGlBaseRenderer(gl) {
  this.gl = gl;

  // The projection matrix positions the tiles in world space.
  // We compute it in Javascript because lack of precision in the vertex shader
  // causes seams to appear between adjacent tiles at large zoom levels.
  this.projMatrix = mat4.create();

  // The viewport matrix responsible for viewport clamping.
  // See setViewport() for an explanation of how it works.
  this.viewportMatrix = mat4.create();

  // Translation and scale vectors for tiles.
  this.translateVector = vec3.create();
  this.scaleVector = vec3.create();

  this.constantBuffers = createConstantBuffers(gl, vertexIndices, vertexPositions, textureCoords);

  this.shaderProgram = createShaderProgram(gl, vertexSrc, fragmentSrc, attribList, uniformList);
}

WebGlBaseRenderer.prototype.destroy = function() {
  destroyConstantBuffers(this.gl, this.constantBuffers);
  this.constantBuffers = null;

  destroyShaderProgram(this.gl, this.shaderProgram);
  this.shaderProgram = null;

  this.projMatrix = null;
  this.viewportMatrix = null;
  this.translateVector = null;
  this.scaleVector = null;

  this.gl = null;
};

WebGlBaseRenderer.prototype.startLayer = function(layer, rect) {
  var gl = this.gl;
  var shaderProgram = this.shaderProgram;
  var constantBuffers = this.constantBuffers;
  var viewportMatrix = this.viewportMatrix;

  gl.useProgram(shaderProgram);

  setViewport(gl, layer, rect, viewportMatrix);
  gl.uniformMatrix4fv(shaderProgram.uViewportMatrix, false, viewportMatrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, constantBuffers.vertexPositions);
  gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, gl.FALSE, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, constantBuffers.textureCoords);
  gl.vertexAttribPointer(shaderProgram.aTextureCoord, 2, gl.FLOAT, gl.FALSE, 0, 0);

  setupPixelEffectUniforms(gl, layer.effects(), {
    opacity: shaderProgram.uOpacity,
    colorOffset: shaderProgram.uColorOffset,
    colorMatrix: shaderProgram.uColorMatrix
  });
};


WebGlBaseRenderer.prototype.endLayer = function() {};


WebGlBaseRenderer.prototype.renderTile = function(tile, texture, layer, layerZ) {
  var gl = this.gl;
  var shaderProgram = this.shaderProgram;
  var constantBuffers = this.constantBuffers;
  var projMatrix = this.projMatrix;
  var translateVector = this.translateVector;
  var scaleVector = this.scaleVector;

  translateVector[0] = tile.centerX();
  translateVector[1] = tile.centerY();
  translateVector[2] = -0.5;

  scaleVector[0] = tile.scaleX();
  scaleVector[1] = tile.scaleY();
  scaleVector[2] = 1.0;

  mat4.copy(projMatrix, layer.view().projection());
  mat4.rotateX(projMatrix, projMatrix, tile.rotX());
  mat4.rotateY(projMatrix, projMatrix, tile.rotY());
  mat4.translate(projMatrix, projMatrix, translateVector);
  mat4.scale(projMatrix, projMatrix, scaleVector);

  gl.uniformMatrix4fv(shaderProgram.uProjMatrix, false, projMatrix);

  setDepth(gl, shaderProgram, layerZ, tile.z);

  setTexture(gl, shaderProgram, texture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, constantBuffers.vertexIndices);
  gl.drawElements(gl.TRIANGLES, vertexIndices.length, gl.UNSIGNED_SHORT, 0);
};


module.exports = WebGlBaseRenderer;

},{"./WebGlCommon":66,"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec3":10}],66:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// These are used to set the WebGl depth for a tile.
var MAX_LAYERS = 256; // Max number of objectLayers per stage.
var MAX_LEVELS = 256; // Max number of levels per layer.

var pixelRatio = require('../util/pixelRatio');
var clamp = require('../util/clamp');
var vec4 = require('gl-matrix/src/gl-matrix/vec4');
var vec3 = require('gl-matrix/src/gl-matrix/vec3');
var mat4 = require('gl-matrix/src/gl-matrix/mat4');


function createShader(gl, type, src) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }
  return shader;
}


function createShaderProgram(gl, vertexSrc, fragmentSrc, attribList, uniformList) {

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(shaderProgram);
  }

  for (var i = 0; i < attribList.length; i++) {
    var attrib = attribList[i];
    shaderProgram[attrib] = gl.getAttribLocation(shaderProgram, attrib);
    gl.enableVertexAttribArray(shaderProgram[attrib]);
  }

  for (var j = 0; j < uniformList.length; j++) {
    var uniform = uniformList[j];
    shaderProgram[uniform] = gl.getUniformLocation(shaderProgram, uniform);
  }

  return shaderProgram;
}


function destroyShaderProgram(gl, shaderProgram) {
  var shaderList = gl.getAttachedShaders(shaderProgram);
  for (var i = 0; i < shaderList.length; i++) {
    var shader = shaderList[i];
    gl.detachShader(shaderProgram, shader);
    gl.deleteShader(shader);
  }
  gl.deleteProgram(shaderProgram);
}


function createConstantBuffer(gl, target, usage, value) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, value, usage);
  return buffer;
}


function createConstantBuffers(gl, vertexIndices, vertexPositions, textureCoords) {
  return {
    vertexIndices: createConstantBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW, new Uint16Array(vertexIndices)),
    vertexPositions: createConstantBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array(vertexPositions)),
    textureCoords: createConstantBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array(textureCoords))
  };
}


function destroyConstantBuffers(gl, constantBuffers) {
  gl.deleteBuffer(constantBuffers.vertexIndices);
  gl.deleteBuffer(constantBuffers.vertexPositions);
  gl.deleteBuffer(constantBuffers.textureCoords);
}


function setTexture(gl, shaderProgram, texture) {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture._texture);
  gl.uniform1i(shaderProgram.uSampler, 0);
}


function setDepth(gl, shaderProgram, layerZ, tileZ) {
  var depth = (((layerZ + 1) * MAX_LEVELS) - tileZ) / (MAX_LEVELS * MAX_LAYERS);
  gl.uniform1f(shaderProgram.uDepth, depth);
}

var defaultOpacity = 1.0;
var defaultColorOffset = vec4.create();
var defaultColorMatrix = mat4.create();
mat4.identity(defaultColorMatrix);

function setupPixelEffectUniforms(gl, effects, uniforms) {
  var opacity = defaultOpacity;
  if (effects && effects.opacity != null) {
    opacity = effects.opacity;
  }
  gl.uniform1f(uniforms.opacity, opacity);

  var colorOffset = defaultColorOffset;
  if (effects && effects.colorOffset) {
    colorOffset = effects.colorOffset;
  }
  gl.uniform4fv(uniforms.colorOffset, colorOffset);

  var colorMatrix = defaultColorMatrix;
  if (effects && effects.colorMatrix) {
    colorMatrix = effects.colorMatrix;
  }
  gl.uniformMatrix4fv(uniforms.colorMatrix, false, colorMatrix);
}



// This function returns a matrix that the vertex shader can use to compensate
// the viewpoer clamping

var viewportParameters = {};

function setViewport(gl, layer, rect, viewportMatrix) {
  var ratio = pixelRatio();
  // Setting a negative offset on the viewport causes rendering problems
  // Using a negative offset, the viewport size is larger than it should and
  // rendering occurs outside the rect area
  // This happens on all browsers as of 2015-04

  // To solve this, one must clamp the viewport and compensate the clamping
  // on the vertex shader by offsetting and scaling the vertexes.

  // Offsets larger than the total size and sizes which cause the viewport to
  // be larger than the canvas do not seem to cause any rendering problems.
  // However, this may still have a performance impact. Therefore, the maximum
  // values are also clamped.

  rectToViewport(rect, viewportParameters, viewportMatrix);
  gl.viewport(ratio * viewportParameters.offsetX,
              ratio * viewportParameters.offsetY,
              ratio * viewportParameters.width,
              ratio * viewportParameters.height);
}

// Temporary vectors for rectToViewport
var translateVector = vec3.create();
var scaleVector = vec3.create();

function rectToViewport(rect, resultParameters, resultViewportMatrix) {
  // Horizontal axis.
  var offsetX = rect.left;
  var totalWidth = rect.totalWidth;
  var clampedOffsetX = clamp(offsetX, 0, totalWidth);

  var widthWithoutDiscarded = rect.width - (clampedOffsetX - offsetX);
  var maxWidth = totalWidth - clampedOffsetX;

  var clampedWidth = clamp(widthWithoutDiscarded, 0, maxWidth);

  resultParameters.offsetX = clampedOffsetX;
  resultParameters.width = clampedWidth;

  // Vertical axis.
  var offsetY = rect.totalHeight - rect.bottom;
  var totalHeight = rect.totalHeight;
  var clampedOffsetY = clamp(offsetY, 0, totalHeight);

  var heightWithoutDiscarded = rect.height - (clampedOffsetY - offsetY);
  var maxHeight = totalHeight - clampedOffsetY;

  var clampedHeight = clamp(heightWithoutDiscarded, 0, maxHeight);

  resultParameters.offsetY = clampedOffsetY;
  resultParameters.height = clampedHeight;

  // Compensation matrix for shader.
  // This matrix is used to scale and offset the vertices by the necessary
  // amount to compensate the viewport clamping.

  // Scaling is easy. Just revert the scaling that a smaller viewport would
  // cause.
  scaleVector[0] = rect.width / clampedWidth;
  scaleVector[1] = rect.height / clampedHeight;
  scaleVector[2] = 1;

  // Translating is more complicated. The center of the view will be at
  // the center of the viewport, but it should actually be offset according
  // to rect. One translation is be required to compensate for clamping at the
  // beginning of the viewport and another for clamping at the end of the
  // viewport. The two are calculated and subtracted.

  // Horizontal axis translation compensation.
  var leftClampCompensation = clampedOffsetX - offsetX;

  var rightmost = offsetX + rect.width;
  var clampedRightmost = clampedOffsetX + clampedWidth;
  var rightClampCompensation = rightmost - clampedRightmost;

  // Vertical axis translation compensation.
  var bottomClampCompensation = clampedOffsetY - offsetY;

  var topmost = offsetY + rect.height;
  var clampedTopmost = clampedOffsetY + clampedHeight;
  var topClampCompensation = topmost - clampedTopmost;

  // Divide by the viewport size to convert from pixels to viewport coordinates.
  translateVector[0] = (rightClampCompensation - leftClampCompensation)/clampedWidth;
  translateVector[1] = (topClampCompensation - bottomClampCompensation)/clampedHeight;
  translateVector[2] = 0;

  var viewportMatrix = resultViewportMatrix;
  mat4.identity(viewportMatrix);
  mat4.translate(viewportMatrix, viewportMatrix, translateVector);
  mat4.scale(viewportMatrix, viewportMatrix, scaleVector);
}


module.exports = {
  createShaderProgram: createShaderProgram,
  destroyShaderProgram: destroyShaderProgram,
  createConstantBuffers: createConstantBuffers,
  destroyConstantBuffers: destroyConstantBuffers,
  setTexture: setTexture,
  setDepth: setDepth,
  setViewport: setViewport,
  setupPixelEffectUniforms: setupPixelEffectUniforms
};

},{"../util/clamp":87,"../util/pixelRatio":104,"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec3":10,"gl-matrix/src/gl-matrix/vec4":11}],67:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var WebGlBaseRenderer = require('./WebGlBase');

module.exports = WebGlBaseRenderer;

},{"./WebGlBase":65}],68:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var WebGlCommon = require('./WebGlCommon');
var createConstantBuffers = WebGlCommon.createConstantBuffers;
var createShaderProgram = WebGlCommon.createShaderProgram;
var setViewport = WebGlCommon.setViewport;
var destroyConstantBuffers = WebGlCommon.destroyConstantBuffers;
var destroyShaderProgram = WebGlCommon.destroyShaderProgram;
var setupPixelEffectUniforms = WebGlCommon.setupPixelEffectUniforms;

var setDepth = WebGlCommon.setDepth;
var setTexture = WebGlCommon.setTexture;


var vertexSrc = "#define GLSLIFY 1\n/*\n * Copyright 2016 Google Inc. All rights reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform float uDepth;\nuniform mat4 uViewportMatrix;\nuniform mat4 uInvProjMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vRay;\n\nvoid main(void) {\n  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);\n  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);\n  vTextureCoord = aTextureCoord;\n}\n";
var fragmentSrc = "/*\n * Copyright 2016 Google Inc. All rights reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform sampler2D uSampler;\nuniform float uOpacity;\nuniform float uTextureX;\nuniform float uTextureY;\nuniform float uTextureWidth;\nuniform float uTextureHeight;\nuniform vec4 uColorOffset;\nuniform mat4 uColorMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vRay;\n\nconst float PI = 3.14159265358979323846264;\n\nvoid main(void) {\n  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);\n  float phi  = acos(vRay.y * r);\n  float theta = atan(vRay.x, -1.0*vRay.z);\n  float s = 0.5 + 0.5 * theta / PI;\n  float t = 1.0 - phi / PI;\n\n  s = s * uTextureWidth + uTextureX;\n  t = t * uTextureHeight + uTextureY;\n\n  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;\n  gl_FragColor = vec4(color.rgb * color.a * uOpacity, color.a * uOpacity);\n}\n";

var vertexIndices = [0, 1, 2, 0, 2, 3];
var vertexPositions = [-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0];
var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

var attribList = ['aVertexPosition', 'aTextureCoord'];
var uniformList = [
  'uDepth', 'uOpacity', 'uSampler', 'uInvProjMatrix', 'uViewportMatrix',
  'uColorOffset', 'uColorMatrix', 'uTextureX', 'uTextureY', 'uTextureWidth',
  'uTextureHeight'
];

var mat4 = require('gl-matrix/src/gl-matrix/mat4');


function WebGlEquirectRenderer(gl) {
  this.gl = gl;

  // The inverse projection matrix.
  this.invProjMatrix = mat4.create();

  // The viewport matrix responsible for viewport clamping.
  // See setViewport() for an explanation of how it works.
  this.viewportMatrix = mat4.create();

  this.constantBuffers = createConstantBuffers(gl, vertexIndices, vertexPositions, textureCoords);

  this.shaderProgram = createShaderProgram(gl, vertexSrc, fragmentSrc, attribList, uniformList);
}

WebGlEquirectRenderer.prototype.destroy = function() {
  destroyConstantBuffers(this.gl, this.constantBuffers);
  this.constantBuffers = null;

  destroyShaderProgram(this.gl, this.shaderProgram);
  this.shaderProgram = null;

  this.invProjMatrix = null;
  this.viewportMatrix = null;

  this.gl = null;
};


WebGlEquirectRenderer.prototype.startLayer = function(layer, rect) {
  var gl = this.gl;
  var shaderProgram = this.shaderProgram;
  var constantBuffers = this.constantBuffers;
  var invProjMatrix = this.invProjMatrix;
  var viewportMatrix = this.viewportMatrix;

  gl.useProgram(shaderProgram);

  setViewport(gl, layer, rect, viewportMatrix);
  gl.uniformMatrix4fv(shaderProgram.uViewportMatrix, false, viewportMatrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, constantBuffers.vertexPositions);
  gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, gl.FALSE, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, constantBuffers.textureCoords);
  gl.vertexAttribPointer(shaderProgram.aTextureCoord, 2, gl.FLOAT, gl.FALSE, 0, 0);

  // Compute and set the inverse projection matrix.
  mat4.copy(invProjMatrix, layer.view().projection());
  mat4.invert(invProjMatrix, invProjMatrix);

  gl.uniformMatrix4fv(shaderProgram.uInvProjMatrix, false, invProjMatrix);

  // Compute and set the texture scale and crop offsets.
  var textureCrop = layer.effects().textureCrop || {};
  var textureX = textureCrop.x != null ? textureCrop.x : 0;
  var textureY = textureCrop.y != null ? textureCrop.y : 0;
  var textureWidth = textureCrop.width != null ? textureCrop.width : 1;
  var textureHeight = textureCrop.height != null ? textureCrop.height : 1;

  gl.uniform1f(shaderProgram.uTextureX, textureX);
  gl.uniform1f(shaderProgram.uTextureY, textureY);
  gl.uniform1f(shaderProgram.uTextureWidth, textureWidth);
  gl.uniform1f(shaderProgram.uTextureHeight, textureHeight);

  setupPixelEffectUniforms(gl, layer.effects(), {
    opacity: shaderProgram.uOpacity,
    colorOffset: shaderProgram.uColorOffset,
    colorMatrix: shaderProgram.uColorMatrix
  });
};


WebGlEquirectRenderer.prototype.endLayer = function() {};


WebGlEquirectRenderer.prototype.renderTile = function(tile, texture, layer, layerZ) {
  var gl = this.gl;
  var shaderProgram = this.shaderProgram;
  var constantBuffers = this.constantBuffers;

  setDepth(gl, shaderProgram, layerZ, tile.z);

  setTexture(gl, shaderProgram, texture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, constantBuffers.vertexIndices);
  gl.drawElements(gl.TRIANGLES, vertexIndices.length, gl.UNSIGNED_SHORT, 0);
};


module.exports = WebGlEquirectRenderer;

},{"./WebGlCommon":66,"gl-matrix/src/gl-matrix/mat4":7}],69:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./WebGlBase":65,"dup":67}],70:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var WebGlCube = require('./WebGlCube');
var WebGlFlat = require('./WebGlFlat');
var WebGlEquirect = require('./WebGlEquirect');

var CssCube = require('./CssCube');
var CssFlat = require('./CssFlat');

var FlashCube = require('./FlashCube');
var FlashFlat = require('./FlashFlat');

function registerDefaultRenderers(stage) {
  switch (stage.type) {
    case 'webgl':
      stage.registerRenderer('flat', 'flat', WebGlFlat);
      stage.registerRenderer('cube', 'rectilinear', WebGlCube);
      stage.registerRenderer('equirect', 'rectilinear', WebGlEquirect);
      break;
    case 'css':
      stage.registerRenderer('flat', 'flat', CssFlat);
      stage.registerRenderer('cube', 'rectilinear', CssCube);
      break;
    case 'flash':
      stage.registerRenderer('flat', 'flat', FlashFlat);
      stage.registerRenderer('cube', 'rectilinear', FlashCube);
      break;
    default:
      throw new Error('Unknown stage type: ' + stage.type);
  }
}

module.exports = registerDefaultRenderers;

},{"./CssCube":60,"./CssFlat":61,"./FlashCube":63,"./FlashFlat":64,"./WebGlCube":67,"./WebGlEquirect":68,"./WebGlFlat":69}],71:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var NetworkError = require('../NetworkError');
var WorkPool = require('../collections/WorkPool');
var chain = require('../util/chain');
var delay = require('../util/delay');
var clock = require('../util/clock');


// Map template properties to their corresponding tile properties.
var templateProperties = {
  x: 'x',
  y: 'y',
  z: 'z',
  f: 'face'
};

// Default face order for cube maps.
var defaultCubeMapFaceOrder = 'bdflru';

// Default maximum number of concurrent requests.
var defaultConcurrency = 4;

// Default milliseconds to wait before retrying failed requests.
var defaultRetryDelay = 10000;


/**
 * @class
 * @classdesc Source that loads images given a URL and a crop rectangle.
 * @implements Source
 * @param {Function} sourceFromTile Function that receives a tile and returns
 * an object `{ url, rect }`.
 * @param {Object} opts
 * @param {number} [opts.concurrency=4] Maximum number of tiles to loadAsync at the
 * same time.
 * @param {number} [opts.retryDelay=10000] Milliseconds to wait before
 * retrying failed requests.
*/
function ImageUrlSource(sourceFromTile, opts) {

  opts = opts ? opts : {};

  this._loadPool = new WorkPool({
    concurrency: opts.concurrency || defaultConcurrency
  });

  this._retryDelay = opts.retryDelay || defaultRetryDelay;
  this._retryMap = {};

  this._sourceFromTile = sourceFromTile;
}


ImageUrlSource.prototype.loadAsset = function(stage, tile, done) {

  var self = this;

  var retryDelay = this._retryDelay;
  var retryMap = this._retryMap;

  var tileSource = this._sourceFromTile(tile);
  var url = tileSource.url;
  var rect = tileSource.rect;

  var loadImage = stage.loadImage.bind(stage, url, rect);

  var loadFn = function(done) {
    return self._loadPool.push(loadImage, function(err, asset) {
      if (err) {
        if (err instanceof NetworkError) {
          // If a network error occurred, wait before retrying.
          retryMap[url] = clock();
        }
        done(err, tile);
      } else {
        // On a successful fetch, forget the previous timeout.
        delete retryMap[url];
        done(null, tile, asset);
      }
    });
  };

  // Check whether we are retrying a failed request.
  var delayAmount;
  var lastTime = retryMap[url];
  if (lastTime != null) {
    var now = clock();
    var elapsed = now - lastTime;
    if (elapsed < retryDelay) {
      // Wait before retrying.
      delayAmount = retryDelay - elapsed;
    } else {
      // Retry timeout expired; perform the request at once.
      delayAmount = 0;
      delete retryMap[url];
    }
  }

  var delayFn = delay.bind(null, delayAmount);

  return chain(delayFn, loadFn)(done);
};


/**
 * Create an ImageUrlSource from a string template
 * @param {String} url Template for the tile URLs. The following placeholders may be used:
   - {z} : tile level index (0 is the smallest level)
   - {f} : tile face (b, d, f, l, r, u)
   - {x} : tile x index
   - {y} : tile y index
 * @param {Object} opts
 * @param {String} opts.cubeMapPreviewUrl Use the cube map preview at this URL as the first level
 * @param {String} [opts.cubeMapPreviewFaceOrder='bdflru'] Ordering of the faces on the cube map preview
*/
ImageUrlSource.fromString = function(url, opts) {
  opts = opts || {};

  var faceOrder = opts && opts.cubeMapPreviewFaceOrder || defaultCubeMapFaceOrder;

  var urlFn = opts.cubeMapPreviewUrl ? withPreview : withoutPreview;

  return new ImageUrlSource(urlFn);

  function withoutPreview(tile) {
    var tileUrl = url;

    for (var property in templateProperties) {
      var templateProperty = templateProperties[property];
      var regExp = propertyRegExp(property);
      var valueFromTile = tile.hasOwnProperty(templateProperty) ? tile[templateProperty] : '';
      tileUrl = tileUrl.replace(regExp, valueFromTile);
    }

    return { url: tileUrl };
  }

  function withPreview(tile) {
    if (tile.z === 0) {
      return cubeMapUrl(tile);
    }
    else {
      return withoutPreview(tile);
    }
  }

  function cubeMapUrl(tile) {
    var y = faceOrder.indexOf(tile.face) / 6;
    return {
      url: opts.cubeMapPreviewUrl,
      rect: { x: 0, y: y, width: 1, height: 1/6 }
    };
  }
};


ImageUrlSource.stringHasFace = function(url) {
  return ImageUrlSource.stringHasProperty(url, 'f');
};


ImageUrlSource.stringHasX = function(url) {
  return ImageUrlSource.stringHasProperty(url, 'x');
};


ImageUrlSource.stringHasY = function(url) {
  return ImageUrlSource.stringHasProperty(url, 'y');
};


ImageUrlSource.stringHasLevel = function(url) {
  return ImageUrlSource.stringHasProperty(url, 'z');
};


ImageUrlSource.stringHasProperty = function(url, property) {
  return !!url.match(propertyRegExp(property));
};


function propertyRegExp(property) {
  var regExpStr = '\\{(' + property + ')\\}';
  return new RegExp(regExpStr, 'g');
}


module.exports = ImageUrlSource;

},{"../NetworkError":18,"../collections/WorkPool":34,"../util/chain":86,"../util/clock":88,"../util/delay":96}],72:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @class
 * @classdesc Receives an asset which is returned on loadAsync.
 * @implements Source
 * @param {Asset} asset
*/
function SingleAssetSource(asset) {
  this._asset = asset;
}

SingleAssetSource.prototype.asset = function() {
  return this._asset;
};

SingleAssetSource.prototype.loadAsset = function(stage, tile, done) {
  var self = this;

  var timeout = setTimeout(function() {
    done(null, tile, self._asset);
  }, 0);

  function cancel() {
    clearTimeout(timeout);
    done.apply(null, arguments);
  }

  return cancel;
};

module.exports = SingleAssetSource;
},{}],73:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Stage = require('./Stage');
var cssSupported = require('../support/Css');
var browser = require('bowser');
var inherits = require('../util/inherits');
var loadImageHtml = require('./loadImageHtml');
var setAbsolute = require('../util/dom').setAbsolute;
var setFullSize = require('../util/dom').setFullSize;
var setNullTransformOrigin = require('../util/dom').setNullTransformOrigin;


// Browser-specific workarounds.
var browserQuirks = {

  // On most browsers we need to pad the tile edges with repeated pixels so
  // that the borders between neighboring tiles aren't apparent.
  // On iOS this isn't required, but we must disable it because the padding is
  // incorrectly rendered on top of the neighboring tile.
  padSize: browser.ios ? 0 : 3,

  // In order to prevent fallback tiles from overlapping their children, iOS
  // requires smaller zoom levels to be placed below larger zoom levels in
  // the CSS 3D coordinate space.
  reverseLevelDepth: browser.ios,

  // A null transform on the layer element is required so that transitions
  // between objectLayers work on iOS.
  useNullTransform: browser.ios,

  // On Webkit and Gecko browsers, some tiles become invisible at certain
  // angles, usually non-floor tiles when looking straight down. Setting the
  // translateZ following the perspective transform to a slightly larger value
  // than the latter seems to work around this glitch.
  perspectiveNudge: browser.webkit || browser.gecko ? 0.001 : 0

};

/**
 * @class
 * @classdesc A {@link Stage} implementation using CSS 3D Transforms.
 * @extends Stage
*/
function CssStage(opts) {
  this.constructor.super_.call(this, opts);

  this._domElement = document.createElement('div');

  setAbsolute(this._domElement);
  setFullSize(this._domElement);

  // N.B. the CSS stage requires device adaptation to be configured through
  // the <meta name="viewport"> tag on the containing document.
  // Failure to do so will cause clipping and padding bugs to occur,
  // at least on iOS <= 7.
}

inherits(CssStage, Stage);


CssStage.prototype.destroy = function() {
  this.constructor.super_.prototype.destroy.call(this);
  this._domElement = null;
};


CssStage.supported = function() {
  return cssSupported();
};


CssStage.prototype._setSize = function() {};


CssStage.prototype.loadImage = loadImageHtml;


CssStage.prototype._validateLayer = function(layer) {
  return;
};


CssStage.prototype.createRenderer = function(Renderer) {
  return new Renderer(this._domElement, browserQuirks);
};

CssStage.prototype.destroyRenderer = function(renderer) {
  renderer.destroy();
};


CssStage.prototype.startFrame = function() {};


CssStage.prototype.endFrame = function() {};


CssStage.prototype.takeSnapshot = function() {
  
  throw new Error('CssStage: takeSnapshot not implemented');
  
}


CssStage.type = CssStage.prototype.type = 'css';


function CssTexture(stage, tile, asset) {

  var canvas = document.createElement('canvas');
  setAbsolute(canvas);
  setNullTransformOrigin(canvas);

  this._canvas = canvas;
  this._timestamp = null;
  this.refresh(tile, asset);

}


CssTexture.prototype.refresh = function(tile, asset) {

  // Check whether the texture needs to be updated.
  var timestamp = asset.timestamp();
  if (timestamp === this._timestamp) {
    return;
  }
  this._timestamp = timestamp;

  var canvas = this._canvas;
  var ctx = canvas.getContext('2d');

  // Get asset element.
  var element = asset.element();

  // Get tile dimensions.
  var tileWidth = tile.width();
  var tileHeight = tile.height();

  // Get padding sizes.
  var padSize = browserQuirks.padSize;
  var padTop = tile.padTop() ? padSize : 0;
  var padBottom = tile.padBottom() ? padSize : 0;
  var padLeft = tile.padLeft() ? padSize : 0;
  var padRight = tile.padRight() ? padSize : 0;

  // Set canvas size.
  canvas.width = padLeft + tileWidth + padRight;
  canvas.height = padTop + tileHeight + padBottom;

  // Draw image.
  ctx.drawImage(element, padLeft, padTop, tileWidth, tileHeight);

  var i;

  // Draw top padding.
  for (i = 0; i < padTop; i++) {
    ctx.drawImage(canvas, padLeft, padTop, tileWidth, 1,
                          padLeft, i, tileWidth, 1);
  }

  // Draw left padding.
  for (i = 0; i < padLeft; i++) {
    ctx.drawImage(canvas, padLeft, padTop, 1, tileHeight,
                          i, padTop, 1, tileHeight);
  }

  // Draw bottom padding.
  for (i = 0; i < padBottom; i++) {
    ctx.drawImage(canvas, padLeft, padTop + tileHeight - 1, tileWidth, 1,
                          padLeft, padTop + tileHeight + i, tileWidth, 1);
  }

  // Draw right padding.
  for (i = 0; i < padRight; i++) {
    ctx.drawImage(canvas, padLeft + tileWidth - 1, padTop, 1, tileHeight,
                          padLeft + tileWidth + i, padTop, 1, tileHeight);
  }

};


CssTexture.prototype.destroy = function() {
  // TODO: investigate whether keeping a pool of canvases instead of
  // creating new ones on demand improves performance.
  this._canvas = null;
  this._timestamp = null;
};


CssStage.TextureClass = CssStage.prototype.TextureClass = CssTexture;


module.exports = CssStage;

},{"../support/Css":80,"../util/dom":97,"../util/inherits":100,"./Stage":76,"./loadImageHtml":79,"bowser":1}],74:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Stage = require('./Stage');
var flashSupported = require('../support/Flash');
var WorkQueue = require('../collections/WorkQueue');
var inherits = require('../util/inherits');
var defer = require('../util/defer');
var setAbsolute = require('../util/dom').setAbsolute;
var setFullSize = require('../util/dom').setFullSize;
var setBlocking = require('../util/dom').setBlocking;
var loadImageFlash = require('./loadImageFlash');

// Default Flash wmode.
var defaultWMode = 'transparent';

// Default Flash SWF path. By default, expect the SWF to be named marzipano.swf
// and located in the same directory as the current script. The default path
// may be overridden by passing the `swfPath` option into the Viewer or Stage
// constructor.
var defaultSwfPath = function() {
  var script = document.currentScript;
  if (!script) {
    // This will produce the wrong result if the current script is loaded with
    // the `async` or `defer` options, or exec'ed from a string. The user is
    // expected to supply a custom `swfPath` in these cases.
    var scripts = document.getElementsByTagName('script');
    script = scripts.length ? scripts[scripts.length-1] : null;
  }
  if (!script) {
    return null;
  }
  var path = script.src;
  var slash = path.lastIndexOf('/');
  if (slash >= 0) {
    path = path.slice(0, slash + 1);
  } else {
    path = '';
  }
  return path + 'marzipano.swf';
}();

// Callbacks must be exposed in a global object to be called from Flash.
// The global object maps each stage ID into the respective callbacks.
// To prevent multiple Marzipano instances from clobbering the callbacks
// for each other's stages, the next available stage ID must be shared among
// the instances. We cache this value in a special property of the global
// callback object.
var callbackObjectName = 'MarzipanoFlashCallbackMap';
if (!(callbackObjectName in window)) {
  window[callbackObjectName] = { __next: 0 };
}

// Get the next available Flash stage ID.
function nextFlashStageId() {
  return window[callbackObjectName].__next++;
}

// Names of the callbacks called from Flash. Presently there is only one.
var callbackNames = [ 'imageLoaded' ];

// Browser-specific workarounds.
var flashQuirks = {
  // How many repeated pixels to add around tile edges to suppress visible seams.
  padSize: 3
};

/**
 * @class
 * @classdesc A {@link Stage} implementation using Flash.
 * @extends Stage
 * @param {Object} opts
 * @param {String} [wmode='transparent'] Flash `wmode` property. Read
 *   [this](http://helpx.adobe.com/flash/kb/flash-object-embed-tag-attributes.html)
 *   for more information.
 * @param {String} swfPath Path to the SWF file. By default, the SWF is
 *   assumed to be named `marzipano.swf` and located in the same directory
 *   as `marzipano.js`.
 */
function FlashStage(opts) {
  this.constructor.super_.call(this, opts);

  this._wmode = opts && opts.wmode || defaultWMode;
  this._swfPath = opts && opts.swfPath || defaultSwfPath;

  if (!defaultSwfPath) {
    throw new Error('Missing SWF path');
  }

  // Setup JavaScript callbacks to be called from Flash land when
  // asynchronous operations terminate.
  this._flashStageId = nextFlashStageId();
  this._callbacksObj = window[callbackObjectName][this._flashStageId] = {};
  this._stageCallbacksObjVarName = callbackObjectName + '[' + this._flashStageId + ']';
  this._callbackListeners = {};
  for (var i = 0; i < callbackNames.length; i++) {
    this._callbacksObj[callbackNames[i]] = this._callListeners(callbackNames[i]);
  }

  // Queue for loadImage calls.
  // The queue starts paused so that loadImage calls occurring before Flash
  // is ready do not start right away (as they would fail).
  this._loadImageQueue = new WorkQueue();
  this._loadImageQueue.pause();

  // Whether flash is ready to be called from JavaScript.
  this._flashReady = false;

  // Add an ID to each renderer/layer, so that it can be identified within
  // the ActionScript program.
  this._nextLayerId = 0;

  // Create the DOM elements.
  var elements = createDomElements(this._swfPath, this._flashStageId, this._stageCallbacksObjVarName);
  this._domElement = elements.root;
  this._blockingElement = elements.blocking;
  this._flashElement = elements.flash;

  // Wake up the render loop when we are ready (only after element is added to the DOM)
  this._checkReadyTimer = setInterval(this._checkReady.bind(this), 50);
}

inherits(FlashStage, Stage);


FlashStage.prototype.destroy = function() {

  this.constructor.super_.prototype.destroy.call(this);

  this._domElement = null;
  this._blockingElement = null;
  this._flashElement = null;
  window[callbackObjectName][this._flashStageId] = null;
  this._callbacksObj = null;
  this._loadImageQueue = null;
  clearInterval(this._checkReadyTimer);

};


FlashStage.supported = function() {
  return flashSupported();
};


FlashStage.prototype._setSize = function() {};


FlashStage.prototype.loadImage = function(tile, rect, done) {
  var loadFn = loadImageFlash.bind(null, this, tile, rect);
  return this._loadImageQueue.push(loadFn, done);
};


FlashStage.prototype._validateLayer = function(layer) {
  return;
};


FlashStage.prototype._onCallback = function(callbackName, f) {
  this._callbackListeners[callbackName] = this._callbackListeners[callbackName] || [];
  this._callbackListeners[callbackName].push(f);
};


FlashStage.prototype._offCallback = function(callbackName, f) {
  var listeners = this._callbackListeners[callbackName] || [];
  var index = listeners.indexOf(f);
  if(index >= 0) {
    listeners.splice(index, 1);
  }
};


FlashStage.prototype._callListeners = function(callbackName) {

  var self = this;

  return function callListeners() {
    var listeners = self._callbackListeners[callbackName] || [];
    for (var i = 0; i < listeners.length; i++) {
      // JavaScript executed on calls from Flash does not throw exceptions.
      // Executing the callback in a new stack frame fixes this.
      var listener = listeners[i];
      defer(listener, arguments);
    }
  };
};


FlashStage.prototype._checkReady = function() {
  if (!this._flashElement
  ||  !this._flashElement.isReady
  ||  !this._flashElement.isReady()) {
    // Not ready yet.
    return false;
  }

  // Mark as ready.
  this._flashReady = true;

  // Disable interval timer.
  clearTimeout(this._checkReadyTimer);

  // Resume image loading queue.
  this._loadImageQueue.resume();

  // Force next render.
  this.emitRenderInvalid();

  return true;
};


function createDomElements(swfPath, id, stageCallbacksObjVarName) {
  var rootElement = document.createElement('div');
  setAbsolute(rootElement);
  setFullSize(rootElement);

  // The Flash object must have `id` and `name` attributes, otherwise
  // ExternalInterface calls will not work.
  var elementId = "marzipano-flash-stage-" + id;

  var objectStr = '<object id="' + elementId + '" name="' + elementId + '" type="application/x-shockwave-flash" data="' + swfPath + '">';

  var paramsStr = '';
  paramsStr += '<param name="movie" value="' + swfPath + '" />';
  paramsStr += '<param name="allowscriptaccess" value="always" />';
  paramsStr += '<param name="flashvars" value="callbacksObjName=' + stageCallbacksObjVarName + '" />';
  paramsStr += '<param name="wmode" value="transparent" />';

  objectStr += paramsStr;
  objectStr += '</object>';

  // Embed Flash into the DOM.
  // Adding children into an <object> element doesn't work, so we create a
  // temporary element and set its innerHTML.
  var tmpElement = document.createElement('div');
  tmpElement.innerHTML = objectStr;
  var flashElement = tmpElement.firstChild;
  setAbsolute(flashElement);
  setFullSize(flashElement);
  rootElement.appendChild(flashElement);

  // Create blocking element to prevent events from being caught by Flash.
  var blockingElement = document.createElement('div');
  setAbsolute(blockingElement);
  setFullSize(blockingElement);
  setBlocking(blockingElement);
  rootElement.appendChild(blockingElement);

  return { root: rootElement, flash: flashElement, blocking: blockingElement };
}


FlashStage.prototype.createRenderer = function(Renderer) {
  return new Renderer(this._flashElement, ++this._nextLayerId, flashQuirks);
};


FlashStage.prototype.destroyRenderer = function(renderer) {
  renderer.destroy();
};


FlashStage.prototype.startFrame = function() {};


FlashStage.prototype.endFrame = function() {};


FlashStage.prototype.takeSnapshot = function (options) {
  
  // Validate passed argument
  if (typeof options !== 'object' || options == null) {
    options = {};
  }
  
  var quality = options.quality;
  
  // Set default quality if it is not passed
  if (typeof quality == 'undefined') {
    quality = 75;
  }
  
  // Throw if quality is of invlid type or out of bounds
  if (typeof quality !== 'number' || quality < 0 || quality > 100) {
    throw new Error('FlashStage: Snapshot quality needs to be a number between 0 and 100');
  }
  
  // Return the snapshot by executing a flash-exported method
  return this._flashElement.takeSnapshot(quality);
  
}


FlashStage.type = FlashStage.prototype.type = 'flash';


function FlashTexture(stage, tile, asset) {

  // Get image id.
  var imageId = asset.element();

  // Get tile dimensions.
  var tileWidth = tile.width();
  var tileHeight = tile.height();

  // Get padding sizes.
  var padSize = flashQuirks.padSize;
  var padTop = tile.padTop() ? padSize : 0;
  var padBottom = tile.padBottom() ? padSize : 0;
  var padLeft = tile.padLeft() ? padSize : 0;
  var padRight = tile.padRight() ? padSize : 0;

  var textureId = stage._flashElement.createTexture(imageId, tileWidth, tileHeight, padTop, padBottom, padLeft, padRight);

  this._stage = stage;
  this._textureId = textureId;
}


FlashTexture.prototype.refresh = function(tile, asset) {
  // TODO: This is required for the Flash stage to support dynamic textures.
  // However, there are currently no dynamic textures that work with the
  // Flash stage.
};


FlashTexture.prototype.destroy = function() {
  var textureId = this._textureId;
  var stage = this._stage;
  stage._flashElement.destroyTexture(textureId);
  this._stage = null;
  this._textureId = null;
};


FlashStage.TextureClass = FlashStage.prototype.TextureClass = FlashTexture;


module.exports = FlashStage;

},{"../collections/WorkQueue":35,"../support/Flash":81,"../util/defer":94,"../util/dom":97,"../util/inherits":100,"./Stage":76,"./loadImageFlash":78}],75:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * A RendererRegistry maps ({@link Geometry}, {@link View}) pairs into
 * {@link Renderer}. It is used by the {@Stage} implementations to determine
 * the appropriate renderer for a {@link Layer}. The initialization logic is
 * in `src/renderers/registerDefaultRenderers`.
 */
function RendererRegistry() {
  this._renderers = {};
}

RendererRegistry.prototype.set = function(geometryType, viewType, Renderer) {
  if (!this._renderers[geometryType]) {
    this._renderers[geometryType] = {};
  }
  this._renderers[geometryType][viewType] = Renderer;
};

RendererRegistry.prototype.get = function(geometryType, viewType) {
  var Renderer = this._renderers[geometryType] && this._renderers[geometryType][viewType];
  return Renderer || null;
};

module.exports = RendererRegistry;

},{}],76:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var WorkQueue = require('../collections/WorkQueue');
var calcRect = require('../calcRect');
var async = require('../util/async');
var cancelize = require('../util/cancelize');

var RendererRegistry = require('./RendererRegistry');


// Time to wait before creating successive textures, in milliseconds.
// We wait for at least one frame to be rendered between assets.
// This improves performance significantly on older iOS devices.
var createTextureDelay = 20;


function reverseTileCmp(t1, t2) {
  return -t1.cmp(t2);
}


/**
 * @interface
 * @classdesc A Stage is a container with the ability to render a stack of
 * {@Layer objectLayers}.
 *
 * This is a superclass containing logic that is common to all implementations;
 * it should never be instantiated directly. Instead, use one of the
 * subclasses: {@link WebGlStage}, {@link CssStage}, {@link FlashStage}.
 */
function Stage(opts) {

  // Must be set by subclasses.
  this._domElement = null;

  this._layers = [];
  this._renderers = [];

  this._visibleTiles = [];
  this._fallbackTiles = {
    children: [],
    parents: []
  };

  this._tmpTiles = [];

  // Cached stage dimensions.
  this._width = null;
  this._height = null;

  // Temporary variable for rect.
  this._rect = {};

  // Work queue for createTexture.
  this._createTextureWorkQueue = new WorkQueue({
    delay: createTextureDelay
  });

  // Function to emit event when render parameters have changed.
  this.emitRenderInvalid = this.emitRenderInvalid.bind(this);

  // The renderer registry maps each geometry/view pair into the respective
  // Renderer class.
  this._rendererRegistry = new RendererRegistry();
}

eventEmitter(Stage);


/**
 * Destructor.
 */
Stage.prototype.destroy = function() {
  this.removeAllLayers();
  this._layers = null;
  this._renderers = null;
  this._visibleTiles = null;
  this._fallbackTiles = null;
  this._tmpTiles = null;
  this._width = null;
  this._height = null;
  this._createTextureWorkQueue = null;
  this.emitRenderInvalid = null;
  this._rendererRegistry = null;
};


Stage.prototype.registerRenderer = function(geometryType, viewType, Renderer) {
  return this._rendererRegistry.set(geometryType, viewType, Renderer);
};


/**
 * @return {HTMLElement} DOM element where objectLayers are rendered
 */
Stage.prototype.domElement = function() {
  return this._domElement;
};


/**
 * Get the stage width.
 * @return {number}
 */
Stage.prototype.width = function() {
  return this._width;
};


/**
 * Get the stage height.
 * @return {number}
 */
Stage.prototype.height = function() {
  return this._height;
};


/**
 * Get the stage dimensions. If an object argument is supplied, the object is
 * filled in with the result and returned. Otherwise, a fresh object is
 * returned.
 *
 * @param {Object} obj
 * @param {number} obj.width
 * @param {number} obj.height
 */
Stage.prototype.size = function(obj) {
  obj = obj || {};
  obj.width = this._width;
  obj.height = this._height;
  return obj;
};


/**
 * Set the stage dimensions.
 *
 * This contains the size update logic common to all stage types. Subclasses
 * define the _setSize() method to perform their own logic, if required.
 *
 * @param {Object} obj
 * @param {number} obj.width
 * @param {number} obj.height
 *
 */
Stage.prototype.setSize = function(size) {
  this._width = size.width;
  this._height = size.height;

  this._setSize(); // must be defined by subclasses.

  this.emit('resize');
  this.emitRenderInvalid();
};


Stage.prototype.emitRenderInvalid = function() {
  this.emit('renderInvalid');
};


/**
 * Add a {@link Layer} into the stage.
 * @param {Layer} layer
 * @throws Throws an error if the layer already belongs to the stage.
 */
Stage.prototype.addLayer = function(layer) {
  if (this._layers.indexOf(layer) >= 0) {
    throw new Error('Layer already in stage');
  }

  this._validateLayer(layer);

  this._layers.push(layer);
  this._renderers.push(null);

  // Listeners for render invalid.
  layer.addEventListener('viewChange', this.emitRenderInvalid);
  layer.addEventListener('effectsChange', this.emitRenderInvalid);
  layer.addEventListener('fixedLevelChange', this.emitRenderInvalid);
  layer.addEventListener('textureStoreChange', this.emitRenderInvalid);

  this.emitRenderInvalid();
};


/**
 * Remove a {@link Layer} from the stage.
 * @param {Layer} layer
 * @throws Throws an error if the layer does not belong to the stage.
 */
Stage.prototype.removeLayer = function(layer) {
  var index = this._layers.indexOf(layer);
  if (index < 0) {
    throw new Error('No such layer in stage');
  }

  var removedLayer = this._layers.splice(index, 1)[0];
  var renderer = this._renderers.splice(index, 1)[0];

  // Renderer is created by _updateRenderer(), so it may not always exist.
  if (renderer) {
    this.destroyRenderer(renderer);
  }

  removedLayer.removeEventListener('viewChange', this.emitRenderInvalid);
  removedLayer.removeEventListener('effectsChange', this.emitRenderInvalid);
  removedLayer.removeEventListener('fixedLevelChange', this.emitRenderInvalid);
  removedLayer.removeEventListener('textureStoreChange', this.emitRenderInvalid);

  this.emitRenderInvalid();
};


/**
 * Remove all {@link Layer objectLayers} from the stage.
 */
Stage.prototype.removeAllLayers = function() {
  while (this._layers.length > 0) {
    this.removeLayer(this._layers[0]);
  }
};


/**
 * Return a list of all {@link Layer objectLayers} contained in the stage.
 * @return {Layer[]}
 */
Stage.prototype.listLayers = function() {
  // Return a copy to prevent unintended mutation by the caller.
  return [].concat(this._layers);
};


/**
 * Return whether the stage contains a {@link Layer}.
 * @param {Layer} layer
 * @return {boolean}
 */
Stage.prototype.hasLayer = function(layer) {
  return this._layers.indexOf(layer) >= 0;
};


/**
 * Move a {@link Layer} to the given position in the stack.
 * @param {Layer} layer
 * @param {Number} i
 * @throws Throws an error if the layer does not belong to the stage or the
 *         new position is invalid.
 */
Stage.prototype.moveLayer = function(layer, i) {
  if (i < 0 || i >= this._layers.length) {
    throw new Error('Cannot move layer out of bounds');
  }

  var index = this._layers.indexOf(layer);
  if (index < 0) {
    throw new Error('No such layer in stage');
  }

  layer = this._layers.splice(index, 1)[0];
  var renderer = this._renderers.splice(index, 1)[0];

  this._layers.splice(i, 0, layer);
  this._renderers.splice(i, 0, renderer);

  this.emitRenderInvalid();
};


/**
 * Render the current frame. Usually called from a {@link RenderLoop}.
 *
 * This contains the rendering logic common to all stage types. Subclasses
 * define the startFrame() and endFrame() methods to perform their own logic.
 */
Stage.prototype.render = function() {

  var i;

  var visibleTiles = this._visibleTiles;
  var fallbackTiles = this._fallbackTiles;

  // Get the stage dimensions.
  var width = this._width;
  var height = this._height;

  var rect = this._rect;

  if (width <= 0 || height <= 0) {
    return;
  }

  this.startFrame(); // defined by subclasses

  // Signal start of frame to the texture stores.
  for (i = 0; i < this._layers.length; i++) {
    this._layers[i].textureStore().startFrame();
  }

  // Render objectLayers.
  for (i = 0; i < this._layers.length; i++) {
    var layer = this._layers[i];
    var effects = layer.effects();
    var view = layer.view();
    var renderer = this._updateRenderer(i);
    var depth = this._layers.length - i;
    var textureStore = layer.textureStore();

    // Update the view size.
    // TODO: avoid doing this on every frame.
    calcRect(width, height, effects && effects.rect, rect);
    if (rect.width <= 0 || rect.height <= 0) {
      // Skip rendering on a null viewport.
      continue;
    }
    view.setSize(rect);

    // Get the visible tiles for the current layer.
    visibleTiles.length = 0;
    layer.visibleTiles(visibleTiles);

    // Signal start of layer to the renderer.
    renderer.startLayer(layer, rect);

    // Because of the way in which WebGl blending works, children tiles which
    // overlap with their parents must to be rendered before their parents for
    // transparent objectLayers to work properly.
    //
    // Once something is rendered, whenever something rendered after that
    // fails the depth buffer test, it is discarded. We want the sections of
    // tiles that are below their children to be discarded, so that we don't
    // see both parent and child when a layer is transparent.
    //
    // Hence, children fallbacks must be rendered before parent fallbacks.

    var parentFallbacks = fallbackTiles.parents;
    var childrenFallbacks = fallbackTiles.children;

    // Clear the fallback tile sets.
    childrenFallbacks.length = 0;
    parentFallbacks.length = 0;

    // Render the visible tiles and collect fallback tiles.
    this._renderTiles(visibleTiles, textureStore, renderer, layer, depth, true);

    // Render the fallback tiles.
    this._renderTiles(childrenFallbacks, textureStore, renderer, layer, depth, false);

    // Parent tiles have to be sorted to be drawn from front to back, so that
    // higher level parents hide the sections of lower level parents behind
    // them by virtue of depth testing.
    parentFallbacks.sort(reverseTileCmp);
    this._renderTiles(parentFallbacks, textureStore, renderer, layer, depth, false);

    // Signal end of layer to the renderer.
    renderer.endLayer(layer, rect);
  }

  // Signal end of frame to the texture stores.
  for (i = 0; i < this._layers.length; i++) {
    this._layers[i].textureStore().endFrame();
  }

  this.endFrame(); // defined by subclasses

};


Stage.prototype._updateRenderer = function(layerIndex) {
  var layer = this._layers[layerIndex];

  var stageType = this.type;
  var geometryType = layer.geometry().type;
  var viewType = layer.view().type;

  var Renderer = this._rendererRegistry.get(geometryType, viewType);
  if (!Renderer) {
    throw new Error('No ' + stageType + ' renderer avaiable for ' + geometryType + ' geometry and ' + viewType + ' view');
  }

  var currentRenderer = this._renderers[layerIndex];

  if (!currentRenderer) {
    // If layer does not have a renderer, create it now.
    this._renderers[layerIndex] = this.createRenderer(Renderer);
  }
  else if (!(currentRenderer instanceof Renderer)) {
    // If the existing renderer is of the wrong type, replace it.
    this._renderers[layerIndex] = this.createRenderer(Renderer);
    this.destroyRenderer(currentRenderer);
  }

  return this._renderers[layerIndex];
};


Stage.prototype._renderTiles = function(tiles, textureStore, renderer, layer, depth, fallback) {
  for (var tileIndex = 0; tileIndex < tiles.length; tileIndex++) {
    var tile = tiles[tileIndex];

    // Mark tile as visible in this frame. This forces a texture refresh.
    textureStore.markTile(tile);

    // If there is a texture for the tile, send the pair into the renderer.
    // Otherwise, if we are collecting fallbacks, try to get one.
    var texture = textureStore.texture(tile);
    if (texture) {
      renderer.renderTile(tile, texture, layer, depth, tileIndex);
    } else if (fallback) {
      this._fallback(tile, textureStore);
    }
  }
};


Stage.prototype._fallback = function(tile, textureStore) {
  // Fallback to children if available, otherwise fall back to parent.
  return (this._childrenFallback(tile, textureStore) ||
          this._parentFallback(tile, textureStore));
};


Stage.prototype._parentFallback = function(tile, textureStore) {
  var result = this._fallbackTiles.parents;
  // Find the closest parent with a loaded texture.
  while ((tile = tile.parent()) != null) {
    if (tile && textureStore.texture(tile)) {
      // Make sure we do not add duplicate tiles.
      for (var i = 0; i < result.length; i++) {
        if (tile.equals(result[i])) {
          // Use the already present parent as a fallback.
          return true;
        }
      }
      // Use this parent as a fallback.
      result.push(tile);
      return true;
    }
  }

  // No parent fallback available.
  return false;
};


Stage.prototype._childrenFallback = function(tile, textureStore) {

  // Recurse into children until a level with available textures is found.
  // However, do not recurse any further when the number of children exceeds 1,
  // event if we still haven't found a viable fallback; this prevents falling
  // back on an exponential number of tiles.
  //
  // In practice, this means that equirectangular geometries (where there is
  // a single tile per level) will fall back to any level, while cube/flat
  // geometries (where the number of children typically, though not necessarily,
  // doubles per level) will only fallback into the immediate next level.

  var result = this._fallbackTiles.children;

  var tmp = this._tmpTiles;
  tmp.length = 0;

  // If we are on the last level, there are no children to fall back to.
  if (!tile.children(tmp)) {
    return false;
  }

  // If tile has a single child with no texture, recurse into next level.
  if (tmp.length === 1 && !textureStore.texture(tmp[0])) {
    return this._childrenFallback(tmp[0], textureStore, result);
  }

  // Copy tiles into result set and check whether level is complete.
  var incomplete = false;
  for (var i = 0; i < tmp.length; i++) {
    if (textureStore.texture(tmp[i])) {
      result.push(tmp[i]);
    } else {
      incomplete = true;
    }
  }

  // If at least one child texture is not available, we still need
  // the parent fallback. A false return value indicates this.
  return !incomplete;

};


/**
 * Create a texture for the given tile and asset. Called by {@link TextureStore}.
 * @param {Tile} tile
 * @param {Asset} asset
 * @param {Function} done
 */
Stage.prototype.createTexture = function(tile, asset, done) {

  var self = this;

  function makeTexture() {
    return new self.TextureClass(self, tile, asset);
  }

  var fn = cancelize(async(makeTexture));

  return this._createTextureWorkQueue.push(fn, function(err, texture) {
    done(err, tile, asset, texture);
  });

};


module.exports = Stage;

},{"../calcRect":29,"../collections/WorkQueue":35,"../util/async":84,"../util/cancelize":85,"./RendererRegistry":75,"minimal-event-emitter":13}],77:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var Stage = require('./Stage');
var webGlSupported = require('../support/WebGl');
var Map = require('../collections/Map');
var loadImageHtml = require('./loadImageHtml');
var inherits = require('../util/inherits');
var defer = require('../util/defer');
var pixelRatio = require('../util/pixelRatio');
var hash = require('../util/hash');
var setAbsolute = require('../util/dom').setAbsolute;
var setPixelSize = require('../util/dom').setPixelSize;
var setFullSize = require('../util/dom').setFullSize;

var debug = typeof MARZIPANODEBUG !== 'undefined' && MARZIPANODEBUG.webGl;


function initWebGlContext(canvas, opts) {
  var options = {
    alpha: true,
    // premultipliedAlpha = true by default when alpha = true
    preserveDrawingBuffer: opts && opts.preserveDrawingBuffer
  };

  if (debug && typeof WebGLDebugUtils !== 'undefined') {
    console.log('Using WebGL lost context simulator');
    canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
  }

  // Keep support/WebGl.js in sync with this.
  var gl = (canvas.getContext) && (canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options));

  if (!gl) {
    throw new Error('Could not get WebGL context');
  }

  if (debug && typeof WebGLDebugUtils !== "undefined") {
    gl = WebGLDebugUtils.makeDebugContext(gl);
    console.log('Using WebGL debug context');
  }

  return gl;
}

/**
 * @class WebGlStage
 * @classdesc A {@link Stage} implementation using WebGl.
 * @extends Stage
 * @param {Object} opts
 * @param {Boolean} [opts.preserveDrawingBuffer=false]
 * @param {boolean} [opts.generateMipmaps=false] Use mipmaps on textures.
 * @param {String[]} [opts.blendFunc=['ONE','ONE_MINUS_SRC_ALPHA']] The two
 * WebGL [blending functions][blendFunc].
 *
 * Note that [`premultipliedAlpha`][premultipliedAlpha] is `true` , as Internet
 * Explorer 11 does not seem to support `premultipliedAlpha` `false`. The
 * shaders multiply the resulting colors values by the alpha value.
 *
 * [blendFunc]: https://msdn.microsoft.com/en-us/library/dn302371.aspx
 * [premultipliedAlpha]: https://www.khronos.org/registry/webgl/specs/1.0/#PREMULTIPLIED_ALPHA
*/
function WebGlStage(opts) {
  opts = opts || {};

  var self = this;

  this.constructor.super_.call(this, opts);

  this._generateMipmaps = opts.generateMipmaps != null ?
    opts.generateMipmaps : false;
  this._useTexSubImage2D = opts.useTexSubImage2D != null ?
    opts.useTexSubImage2D : true;

  this._domElement = document.createElement('canvas');

  setAbsolute(this._domElement);
  setFullSize(this._domElement);

  this._gl = initWebGlContext(this._domElement, opts);
  this._blendFuncStrings = opts.blendFunc || ['ONE','ONE_MINUS_SRC_ALPHA'];

  this._handleContextLoss = function() {
    self.emit('webglcontextlost');
    self._gl = null;
  };

  // Handle WebGl context loss.
  this._domElement.addEventListener('webglcontextlost', this._handleContextLoss);

  // WebGl renderers are singletons for a given stage, so we store them in a
  // map for quick retrieval when several objectLayers use the same renderer.
  // Map keys are renderer classes, map values are renderer instances.

  function renderersEqual(Renderer1, Renderer2) {
    return Renderer1 === Renderer2;
  }

  function renderersHash(Renderer) {
    return hash(Renderer.toString());
  }

  this._rendererInstances = new Map(renderersEqual, renderersHash);

}

inherits(WebGlStage, Stage);


WebGlStage.prototype.destroy = function() {

  this.constructor.super_.prototype.destroy.call(this);

  this.removeEventListener('webglcontextlost', this._handleContextLoss);
  this._domElement = null;
  this._rendererInstances = null;
  this._gl = null;

};


WebGlStage.supported = function() {
  return webGlSupported();
};

/**
 * @returns {WebGLRenderingContext }
 */
WebGlStage.prototype.webGlContext = function() {
  return this._gl;
};


WebGlStage.prototype._setSize = function() {
  // Update the size of the canvas coordinate space. The size is obtained by
  // taking the stage dimensions, which are set in CSS pixels, and multiplying
  // them by the device pixel ratio.
  var ratio = pixelRatio();
  this._domElement.width = ratio * this._width;
  this._domElement.height = ratio * this._height;
};


WebGlStage.prototype.loadImage = loadImageHtml;


WebGlStage.prototype.maxTextureSize = function() {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
};


WebGlStage.prototype._validateLayer = function(layer) {
  var tileSize = layer.geometry().maxTileSize();
  var maxTextureSize = this.maxTextureSize();
  if (tileSize > maxTextureSize) {
    throw new Error('Layer has level with tile size larger than maximum texture size (' + tileSize + ' vs. ' + maxTextureSize + ')');
  }
};


WebGlStage.prototype.createRenderer = function(Renderer) {
  // WebGl renderers are singletons for a given stage, so we check for an
  // already existing renderer of the required type before creating a new one.
  if (this._rendererInstances.has(Renderer)) {
    return this._rendererInstances.get(Renderer);
  }
  else {
    var renderer = new Renderer(this._gl);
    this._rendererInstances.set(Renderer, renderer);
    return renderer;
  }
};


WebGlStage.prototype.destroyRenderer = function(renderer) {
  // WebGl renderers are singletons for a given stage, so check that a
  // renderer is no longer in use before destroying it.
  if (this._renderers.indexOf(renderer) < 0) {
    renderer.destroy();
    this._rendererInstances.del(renderer.constructor);
  }
};


WebGlStage.prototype.startFrame = function() {

  var gl = this._gl;

  if (!gl) {
    throw new Error('Bad WebGL context - maybe context was lost?');
  }

  var width = this._width;
  var height = this._height;
  var ratio = pixelRatio();

  // Set the WebGL viewport.
  gl.viewport(0, 0, ratio * width, ratio * height);

  // Clear framebuffer.
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Enable depth testing.
  gl.enable(gl.DEPTH_TEST);

  // Enable blending.
  gl.enable(gl.BLEND);
  gl.blendFunc(gl[this._blendFuncStrings[0]], gl[this._blendFuncStrings[1]]);

};


WebGlStage.prototype.endFrame = function() {};


WebGlStage.prototype.takeSnapshot = function (options) {
  
  // Validate passed argument
  if (typeof options !== 'object' || options == null) {
    options = {};
  }
  
  var quality = options.quality;
  
  // Set default quality if it is not passed
  if (typeof quality == 'undefined') {
    quality = 75;
  }
  
  // Throw if quality is of invlid type or out of bounds
  if (typeof quality !== 'number' || quality < 0 || quality > 100) {
    throw new Error('WebGLStage: Snapshot quality needs to be a number between 0 and 100');
  }
  
  // Canvas method "toDataURL" needs to be called in the same
  // context as where the actual rendering is done. Hence this.
  this.render();
  
  // Return the snapshot
  return this._domElement.toDataURL('image/jpeg',quality/100);
}


WebGlStage.type = WebGlStage.prototype.type = 'webgl';


function WebGlTexture(stage, tile, asset) {
  this._stage = stage;
  this._gl = stage._gl;
  this._texture = null;
  this._timestamp = null;
  this._width = this._height = null;
  this.refresh(tile, asset);
}


WebGlTexture.prototype.refresh = function(tile, asset) {

  var gl = this._gl;
  var stage = this._stage;
  var texture;

  // Check whether the texture needs to be updated.
  var timestamp = asset.timestamp();
  if (timestamp === this._timestamp) {
    return;
  }

  // Get asset element.
  var element = asset.element();

  // Get asset dimensions.
  var width = asset.width();
  var height = asset.height();

  if (width !== this._width || height !== this._height) {

    // If the texture dimensions have changed since the last refresh, create
    // a new texture with the correct size.

    // Check if texture dimensions would exceed the maximum texture size.
    var maxSize = stage.maxTextureSize();
    if (width > maxSize) {
      throw new Error('Texture width larger than max size (' + width + ' vs. ' + maxSize + ')');
    }
    if (height > maxSize) {
      throw new Error('Texture height larger than max size (' + height + ' vs. ' + maxSize + ')');
    }

    // Delete the current texture if it exists.
    // This is necessary for Chrome on Android. If it isn't done the textures
    // do not render when the size changes.
    if (this._texture) {
      gl.deleteTexture(texture);
    }

    // Create a new texture and paint it.
    texture = this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, element);

  } else {

    // If the texture dimensions remain the same, repaint the existing texture.
    // We use texSubImage2D instead of texImage2D because it is usually faster
    // when repainting an existing texture. Beware that on some browser/GPU
    // combinations, the reverse seems to be true (texSubImage2D is slower).
    // This has been observed on Chrome 43 running on an Intel HD Graphics 4000
    // GPU. The bug seems to have been fixed on Chrome 45.

    texture = this._texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    if(stage._useTexSubImage2D) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, element);
    }
    else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, element);
    }

  }

  // Generate mipmap if the corresponding stage option is set.
  // Note that WebGl does not support mipmaps for NPOT textures.
  // See: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Non-Power_of_Two_Texture_Support
  if (stage._generateMipmaps) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  // Clamp texture to edges.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Unbind texture.
  gl.bindTexture(gl.TEXTURE_2D, null);

  // Update texture dimensions and timestamp.
  this._timestamp = timestamp;
  this._width = width;
  this._height = height;

};


WebGlTexture.prototype.destroy = function() {

  var texture = this._texture;
  var gl = this._gl;

  if (texture) {
    gl.deleteTexture(texture);
  }

  this._stage = null;
  this._gl = null;
  this._texture = null;
  this._timestamp = null;
  this._width = this._height = null;

};


WebGlStage.TextureClass = WebGlStage.prototype.TextureClass = WebGlTexture;


module.exports = WebGlStage;

},{"../collections/Map":32,"../support/WebGl":82,"../util/defer":94,"../util/dom":97,"../util/hash":99,"../util/inherits":100,"../util/pixelRatio":104,"./Stage":76,"./loadImageHtml":79}],78:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var NetworkError = require('../NetworkError');
var once = require('../util/once');

var FlashImageAsset = require('../assets/FlashImage');

function loadImageFlash(stage, url, rect, done) {
  var flashElement = stage._flashElement;

  var x = rect && rect.x || 0;
  var y = rect && rect.y || 0;
  var width = rect && rect.width || 1;
  var height = rect && rect.height || 1;

  var imageId = flashElement.loadImage(url, width, height, x, y);

  done = once(done);

  // TODO: use a single callback for all imageLoaded events.

  function callback(err, callbackId) {
    // There is a single callback for all loadAsync events, so make sure this
    // is the right one.
    if (callbackId !== imageId) {
      return;
    }

    stage._offCallback('imageLoaded', callback);

    // TODO: is there any way to distinguish a network error from other
    // kinds of errors? For now we always return NetworkError since this
    // prevents images to be retried continuously while we are offline.
    if (err) {
      done(new NetworkError('Network error: ' + url));
    } else {
      done(null, new FlashImageAsset(flashElement, imageId));
    }
  }

  stage._onCallback('imageLoaded', callback);

  function cancel() {
    flashElement.cancelImage(imageId);
    stage._offCallback('imageLoaded', callback);
    done.apply(null, arguments);
  }

  return cancel;

}

module.exports = loadImageFlash;
},{"../NetworkError":18,"../assets/FlashImage":25,"../util/once":103}],79:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var NetworkError = require('../NetworkError');
var once = require('../util/once');

var StaticImageAsset = require('../assets/StaticImage');
var StaticCanvasAsset = require('../assets/StaticCanvas');

// N.B. loadImageHtml is broken on IE8 for images that require resizing, due
// to the missing HTML5 canvas element and naturalWidth/naturalHeight
// properties on image elements. This is currently not a problem because the
// HTML-based renderers (WebGL and CSS) do not work on IE8 anyway for lack of
// CSS transforms support. It could become a problem in the future if we
// decide to support CSS rendering of flat panoramas on IE8.

function loadImageHtml(url, rect, done) {

  var img = new Image();

  // Allow cross-domain image loading.
  // This is required to be able to create WebGL textures from images residing
  // on a different domain than the HTML document's.
  img.crossOrigin = 'anonymous';

  var x = rect && rect.x || 0;
  var y = rect && rect.y || 0;
  var width = rect && rect.width || 1;
  var height = rect && rect.height || 1;

  done = once(done);

  img.onload = function() {
    if (x === 0 && y === 0 && width === 1 && height === 1) {
      done(null, new StaticImageAsset(img));
    }
    else {
      x *= img.naturalWidth;
      y *= img.naturalHeight;
      width *= img.naturalWidth;
      height *= img.naturalHeight;

      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext('2d');

      context.drawImage(img, x, y, width, height, 0, 0, width, height);

      done(null, new StaticCanvasAsset(canvas));
    }
  };

  img.onerror = function() {
    // TODO: is there any way to distinguish a network error from other
    // kinds of errors? For now we always return NetworkError since this
    // prevents images to be retried continuously while we are offline.
    done(new NetworkError('Network error: ' + url));
  };

  img.src = url;

  function cancel() {
    img.onload = img.onerror = null;
    img.src = '';
    done.apply(null, arguments);
  }

  return cancel;

}

module.exports = loadImageHtml;
},{"../NetworkError":18,"../assets/StaticCanvas":26,"../assets/StaticImage":27,"../util/once":103}],80:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var prefixProperty = require('../util/dom').prefixProperty;

// Detect CSS 3D transforms support. Adapted from Modernizr.
function checkCssSupported() {
  // First, check if the 'perspective' CSS property or a vendor-prefixed
  // variant is available.
  var perspectiveProperty = prefixProperty('perspective');
  var el = document.createElement('div');
  var supported = typeof el.style[perspectiveProperty] !== 'undefined';

  // Certain versions of Chrome disable 3D transforms even though the CSS
  // property exists. In those cases, we use the following media query,
  // which only succeeds if the feature is indeed enabled.
  if (supported && perspectiveProperty === 'WebkitPerspective') {
    var id = '__marzipano_test_css3d_support__';
    var st = document.createElement('style');
    st.textContent = '@media(-webkit-transform-3d){#' + id + '{height: 3px;})';
    document.getElementsByTagName('head')[0].appendChild(st);
    el.id = id;
    document.body.appendChild(el);
    // The offsetHeight seems to be different than 3 at some zoom levels on
    // Chrome (and maybe other browsers). Test for > 0 instead.
    supported = el.offsetHeight > 0;
    st.parentNode.removeChild(st);
    el.parentNode.removeChild(el);
  }

  return supported;
}

// Cache result.
var supported;
function cssSupported() {
  if (supported !== undefined) {
    return supported;
  }
  return (supported = checkCssSupported());
}

module.exports = cssSupported;

},{"../util/dom":97}],81:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Detect supported Flash version. Returns [major, minor, rev] or null.
// Adapted from https://code.google.com/p/swfobject
function detectFlashVersion() {
  var playerVersion = null;

  var plugins = navigator.plugins;
  var mimeTypes = navigator.mimeTypes;

  var d = null;

  if (plugins && plugins['Shockwave Flash'] && mimeTypes &&
      mimeTypes['application/x-shockwave-flash'] &&
      mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
    d = plugins['Shockwave Flash'].description;
    d = d.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
    playerVersion = [0, 0, 0];
    playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, '$1'), 10);
    playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, '$1'), 10);
    playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0;
  }
  else if (window.ActiveXObject) {
    try {
      var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (a && (d = a.GetVariable('$version'))) {
        d = d.split(' ')[1].split(',');
        playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
      }
    }
    catch (e) {}
  }

  return playerVersion;
}

// Flash support detection.
function checkFlashSupported() {
  var version = detectFlashVersion();
  // Only support 10.1 and above. Flash 10.0 does not work for some reason.
  return version && (version[0] >= 11 || (version[0] === 10 && version[1] >= 1));
}

// Cache result.
var supported;
function flashSupported() {
  if (supported !== undefined) {
    return supported;
  }
  return (supported = checkFlashSupported());
}

module.exports = flashSupported;

},{}],82:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Detect WebGl support.
// Keep stages/WebGl.js in sync with this.
function checkWebGlSupported() {
  var canvas = document.createElement('canvas');
  var gl = canvas.getContext && (canvas.getContext('webgl') ||
                                 canvas.getContext('experimental-webgl'));
  return !!gl;
}

// Cache result.
var supported;
function webGlSupported() {
  if (supported !== undefined) {
    return supported;
  }
  return (supported = checkWebGlSupported());
}

module.exports = webGlSupported;

},{}],83:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var browser = require('bowser');

// Detect CSS pointer-events support.
function checkCssPointerEventsSupported() {

  // Check for existence of CSS property.
  var style = document.createElement('a').style;
  style.cssText = 'pointer-events:auto';
  var hasCssProperty = style.pointerEvents === 'auto';

  // The above result is spurious on emulation mode for IE 8-10.
  var isOldIE = browser.msie && parseFloat(browser.version) < 11;

  return hasCssProperty && !isOldIE;
}

// Cache result.
var supported;
function cssPointerEventsSupported() {
  if (supported !== undefined) {
    return supported;
  }
  return (supported = checkCssPointerEventsSupported());
}

module.exports = cssPointerEventsSupported;

},{"bowser":1}],84:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Transform a synchronous function into an asynchronous one.
function async(fn) {
  return function asynced(done) {
    var err, ret;
    try {
      ret = fn();
    } catch (e) {
      err = e;
    } finally {
      done(err || null, err ? null : ret);
    }
  };
}

module.exports = async;
},{}],85:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var once = require('./once');

// A cancelable function is an asynchronous function (i.e., one whose last
// argument is a callback receiving an error plus zero or more return values)
// that (synchronously) returns a cancel() function. Calling cancel() should
// abort the asynchronous operation and call the callback with the arguments
// that were passed into cancel(). Calling cancel() twice, as with callbacks,
// is not guaranteed to be safe.

// Wrap a non-cancellable asynchronous function into a cancelable one.
//
// Calling cancel() on the returned function will not interrupt the execution
// of the original function; it will merely ignore its return value.
//
// Usually, instead of wrapping your function, you want to implement cancel()
// yourself in order to have some abort logic. This utility function provides a
// straighforward solution for cases in which no custom abort logic is required.
function cancelize(fn) {
  return function cancelized() {
    if (!arguments.length) {
      throw new Error('cancelized: expected at least one argument');
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var done = args[args.length - 1] = once(args[args.length - 1]);

    function cancel() {
      done.apply(null, arguments);
    }

    fn.apply(null, args);

    return cancel;
  };
}

module.exports = cancelize;

},{"./once":103}],86:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var noop = require('./noop');

// Return a function that executes its arguments (which should be cancelables)
// in sequence, so that each of them passes its return values to the next.
// Execution is aborted if one of the functions returns an error; in that case
// the last function in the sequence is called with the error.
// See util/cancelize.js for an explanation of what cancelables are.
function chain() {

  // The list of functions to chain together.
  var argList = Array.prototype.slice.call(arguments, 0);

  return function chained() {

    // List of remaining functions to be executed.
    // Make a copy of the original list so we can mutate the former while
    // preserving the latter intact for future invocations of the chain.
    var fnList = argList.slice(0);

    // Currently executing function.
    var fn = null;

    // Cancel method for the currently executing function.
    var cfn = null;

    // Arguments for the first function.
    var args = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [];

    // Callback for the chain.
    var done = arguments.length ? arguments[arguments.length - 1] : noop;

    // Execute the next function in the chain.
    // Receives the error and return values from the previous function.
    function exec() {

      // Extract error from arguments.
      var err = arguments[0];

      // Abort chain on error.
      if (err) {
        fn = cfn = null;
        done.apply(null, arguments);
        return;
      }

      // Terminate if there are no functions left in the chain.
      if (!fnList.length) {
        fn = cfn = null;
        done.apply(null, arguments);
        return;
      }

      // Advance to the next function in the chain.
      fn = fnList.shift();
      var _fn = fn;

      // Extract arguments to pass into the next function.
      var ret = Array.prototype.slice.call(arguments, 1);

      // Call next function with previous return value and call back exec.
      ret.push(exec);
      var _cfn = fn.apply(null, ret); // fn(null, ret..., exec)

      // Detect when fn has completed synchronously and do not clobber the
      // internal state in that case. You're not expected to understand this.
      if (_fn !== fn) {
        return;
      }

      // Remember the cancel method for the currently executing function.
      // Detect chaining on non-cancellable function.
      if (typeof _cfn !== 'function') {
        throw new Error('chain: chaining on non-cancellable function');
      } else {
        cfn = _cfn;
      }

    }

    // Cancel chain execution.
    function cancel() {
      if (cfn) {
        cfn.apply(null, arguments);
      }
    }

    // Start chain execution.
    // We call exec as if linking from a previous function in the chain,
    // except that the error is always null. As a consequence, chaining on an
    // empty list yields the identity function.
    args.unshift(null);
    exec.apply(null, args); // exec(null, args...)

    return cancel;

  };

}

module.exports = chain;

},{"./noop":102}],87:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = clamp;
},{}],88:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function getPerformanceClock() {
  if (window.performance && window.performance.now) {
    return function performanceClock() {
      return window.performance.now();
    };
  }
  return null;
}

function getDateClock() {
  return function dateNowClock() {
    return Date.now();
  };
}

var clock = getPerformanceClock() || getDateClock();

module.exports = clock;
},{}],89:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function cmp(x, y) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

module.exports = cmp;
},{}],90:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
  * Compose multiple functions
  *
  * `compose(f, g)` returns `function(x) { return f(g(x)); }`
  *
  * @memberof util
  * @param {Function[]} functions The functions to compose
  * @return {Function}
  */
function compose() {
  var fnList = arguments;
  return function composed(initialArg) {
    var ret = initialArg;
    for (var i = 0; i < fnList.length; i++) {
      var fn = fnList[i];
      ret = fn.call(null, ret);
    }
    return ret;
  };
}

module.exports = compose;
},{}],91:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Convert fov
 *
 * For example, to convert from hfov to vfov one would call 
 * `convert(hfov, width, height)`
 *
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function convert(fov, fromDimension, toDimension) {
  return 2 * Math.atan(toDimension * Math.tan(fov / 2) / fromDimension);
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function htov(fov, width, height) {
  return convert(fov, width, height);
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function htod(fov, width, height) {
  return convert(fov, width, Math.sqrt(width * width + height * height));
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function vtoh(fov, width, height) {
  return convert(fov, height, width);
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function vtod(fov, width, height) {
  return convert(fov, height, Math.sqrt(width * width + height * height));
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function dtoh(fov, width, height) {
  return convert(fov, Math.sqrt(width * width + height * height), width);
}

/**
 * @param {number} fov
 * @param {number} fromDimension
 * @param {number} toDimension
 * @return {number}
 * @memberof util.convertFov
 */
function dtov(fov, width, height) {
  return convert(fov, Math.sqrt(width * width + height * height), height);
}

/**
 * @namespace util.convertFov
 */
module.exports = {
  convert: convert,
  htov: htov,
  htod: htod,
  vtoh: vtoh,
  vtod: vtod,
  dtoh: dtoh,
  dtov: dtov
};

},{}],92:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Convert a number to a string in decimal notation.
function decimal(x) {
  // Double-precision floats have 15 significant decimal digits.
  return x.toPrecision(15);
}

module.exports = decimal;
},{}],93:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function defaults(obj, defaultsObj) {
  for (var key in defaultsObj) {
    if (!(key in obj)) {
      obj[key] = defaultsObj[key];
    }
  }
  return obj;
}

module.exports = defaults;
},{}],94:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function defer(fn, args) {
  function deferred() {
    if (args && args.length > 0) {
      fn.apply(null, args);
    } else {
      fn();
    }
  }
  setTimeout(deferred, 0);
}

module.exports = defer;
},{}],95:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @memberof util
 * @param {number} deg
 * @return {number}
 */
function degToRad(deg) {
  return deg * Math.PI / 180;
}

module.exports = degToRad;
},{}],96:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Perform a cancelable delay.
// See util/cancelize.js for an explanation of what cancelables are.
function delay(ms, done) {

  // Work around IE8 bug whereby a setTimeout callback may still be called
  // after the corresponding clearTimeout is invoked.
  var timer = null;

  function finish() {
    if (timer != null) {
      timer = null;
      done(null);
    }
  }

  function cancel() {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
      done.apply(null, arguments);
    }
  }

  timer = setTimeout(finish, ms);

  return cancel;

}

module.exports = delay;

},{}],97:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


function prefixProperty(property) {

  var style = document.documentElement.style;
  var prefixList = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

  for (var i = 0; i < prefixList.length; i++) {
    var prefix = prefixList[i];
    var capitalizedProperty = property[0].toUpperCase() + property.slice(1);
    var prefixedProperty = prefix + capitalizedProperty;

    if (prefixedProperty in style) {
      return prefixedProperty;
    }
  }

  return property;

}


function getWithVendorPrefix(property) {
  var prefixedProperty = prefixProperty(property);
  return function getPropertyWithVendorPrefix(element) {
    return element.style[prefixedProperty];
  };

}


function setWithVendorPrefix(property) {
  var prefixedProperty = prefixProperty(property);
  return function setPropertyWithVendorPrefix(element, val) {
    return (element.style[prefixedProperty] = val);
  };
}


var setTransform = setWithVendorPrefix('transform');
var setTransformOrigin = setWithVendorPrefix('transformOrigin');


function setNullTransform(element) {
  setTransform(element, 'translateZ(0)');
}


function setNullTransformOrigin(element) {
  setTransformOrigin(element, '0 0 0');
}


function setAbsolute(element) {
  element.style.position = 'absolute';
}


function setPixelPosition(element, x, y) {
  element.style.left = x + 'px';
  element.style.top = y + 'px';
}


function setPixelSize(element, width, height) {
  element.style.width = width + 'px';
  element.style.height = height + 'px';
}


function setNullSize(element) {
  element.style.width = element.style.height = 0;
}


function setFullSize(element) {
  element.style.width = element.style.height = '100%';
}


function setOverflowHidden(element) {
  element.style.overflow = 'hidden';
}


function setOverflowVisible(element) {
  element.style.overflow = 'visible';
}


function setNoPointerEvents(element) {
  element.style.pointerEvents = 'none';
}


function setBlocking(element) {
  element.style.backgroundColor = '#000';
  element.style.opacity = '0';
  element.style.filter = 'alpha(opacity=0)';
}


module.exports = {
  prefixProperty: prefixProperty,
  getWithVendorPrefix: getWithVendorPrefix,
  setWithVendorPrefix: setWithVendorPrefix,
  setTransform: setTransform,
  setTransformOrigin: setTransformOrigin,
  setNullTransform: setNullTransform,
  setNullTransformOrigin: setNullTransformOrigin,
  setAbsolute: setAbsolute,
  setPixelPosition: setPixelPosition,
  setPixelSize: setPixelSize,
  setNullSize: setNullSize,
  setFullSize: setFullSize,
  setOverflowHidden: setOverflowHidden,
  setOverflowVisible: setOverflowVisible,
  setNoPointerEvents: setNoPointerEvents,
  setBlocking: setBlocking
};

},{}],98:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function extend(obj, sourceObj) {
  for (var key in sourceObj) {
    obj[key] = sourceObj[key];
  }
  return obj;
}

module.exports = extend;
},{}],99:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Jenkins one-at-a-time hash
// http://www.burtleburtle.net/bob/hash/doobs.html
// Input: an array of integers
// Output: an integer

function hash() {
  var h = 0;
  for (var i = 0; i < arguments.length; i++) {
    var k = arguments[i];
    h += k;
    h += k << 10;
    h ^= k >> 6;
  }
  h += h << 3;
  h ^= h >> 11;
  h += h << 15;
  return h >= 0 ? h : -h;
}

module.exports = hash;
},{}],100:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Make ctor a subclass of superCtor.
// Do not depend on ES5 Object.create semantics because of older browsers.
function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  var TempCtor = function() {};
  TempCtor.prototype = superCtor.prototype;
  ctor.prototype = new TempCtor();
  ctor.prototype.constructor = ctor;
}

module.exports = inherits;
},{}],101:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Modulo operation
 *
 * @memberof util
 * @param {Number} dividend
 * @param {Number} divisor
 * @returns {Number} Value in range `[0,divisor[`
 */
function mod(a, b) {
  return (+a % (b = +b) + b) % b;
}

module.exports = mod;
},{}],102:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function noop() {}

module.exports = noop;
},{}],103:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function once(fn) {
  var called = false;
  var value;
  return function onced() {
    if (!called) {
      called = true;
      value = fn.apply(null, arguments);
    }
    return value;
  };
}

module.exports = once;
},{}],104:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var defaultPixelRatio = 1;

function pixelRatio() {
  if (typeof window !== 'undefined') {
    if (window.devicePixelRatio) {
      return window.devicePixelRatio;
    }
    else {
      var screen = window.screen;
      if (screen && screen.deviceXDPI && screen.logicalXDPI) {
        return screen.deviceXDPI / screen.logicalXDPI;
      } else if (screen && screen.systemXDPI && screen.logicalXDPI) {
        return screen.systemXDPI / screen.logicalXDPI;
      }
    }
  }
  return defaultPixelRatio;
}

module.exports = pixelRatio;

},{}],105:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @memberof util
 * @param {number} rad
 * @return {number}
 */
function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

module.exports = radToDeg;
},{}],106:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function real(x) {
  return typeof x === 'number' && isFinite(x);
}

module.exports = real;
},{}],107:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var noop = require('./noop');

// Return a cancelable function that executes fn in a loop until it returns
// successfully.
function retry(fn) {

  return function retried() {

    var args = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [];
    var done = arguments.length ? arguments[arguments.length - 1] : noop;

    var cfn = null;
    var canceled = false;

    function exec() {
      var err = arguments[0];
      if (!err || canceled) {
        done.apply(null, arguments);
      } else {
        cfn = fn.apply(null, args);
      }
    }

    args.push(exec);
    exec(true);

    return function cancel() {
      canceled = true;
      cfn.apply(null, arguments);
    };

  };

}

module.exports = retry;

},{"./noop":102}],108:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var vec3 = require('gl-matrix/src/gl-matrix/vec3');
var mat4 = require('gl-matrix/src/gl-matrix/mat4');

// Constant identity matrix.
var identity = mat4.identity(mat4.create());

// Rotation matrix shared by all invocations to rotateVector().
var matrix = mat4.create();

// Rotate a vector around the coordinate axes in YXZ order.
function rotateVector(out, vec, y, x, z) {

  mat4.copy(matrix, identity);

  if (y) {
    mat4.rotateY(matrix, matrix, y);
  }

  if (x) {
    mat4.rotateX(matrix, matrix, x);
  }

  if (z) {
    mat4.rotateZ(matrix, matrix, z);
  }

  vec3.transformMat4(out, vec, matrix);

  return out;
}

module.exports = rotateVector;

},{"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec3":10}],109:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var clock = require('./clock');

function tween(duration, update, done) {
  var cancelled = false;

  var startTime = clock();

  function runUpdate() {
    if(cancelled) { return; }
    var tweenVal = (clock() - startTime)/duration;
    if(tweenVal < 1) {
      update(tweenVal);
      requestAnimationFrame(runUpdate);
    }
    else {
      update(1);
      done();
    }
  }

  update(0);
  requestAnimationFrame(runUpdate);

  return function cancel() {
    cancelled = true;
    done.apply(null, arguments);
  }
}

module.exports = tween;
},{"./clock":88}],110:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function type(x) {
  var typ = typeof x;
  if (typ === 'object') {
    if (x === null) {
      return 'null';
    }
    if (Object.prototype.toString.call(x) === '[object Array]') {
      return 'array';
    }
    if (Object.prototype.toString.call(x) === '[object RegExp]') {
      return 'regexp';
    }
  }
  return typ;
}

module.exports = type;

},{}],111:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var pixelRatio = require('../util/pixelRatio');
var real = require('../util/real');
var clamp = require('../util/clamp');
var mat4 = require('gl-matrix/src/gl-matrix/mat4');
var vec4 = require('gl-matrix/src/gl-matrix/vec4');

// Default viewport dimensions.
// Start with zero to ensure that those values are handled correctly.
var defaultWidth = 0;
var defaultHeight = 0;

// Default view parameters.
var defaultX = 0.5;
var defaultY = 0.5;
var defaultZoom = 1;

// Constant values used to simplify the frustum culling logic.
// planeAxes[i] indicates the coordinate value that defines a frustum plane.
// planeCmp[i] indicates how point and plane coordinates should be compared
// to determine whether the point is on the outer side of the plane.
var planeAxes = [
  1, // top
  0, // right
  1, // bottom
  0  // left
];
var planeCmp = [
  -1, // top
  -1, // right
   1, // bottom
   1  // left
];

// A zoom of exactly 0 breaks some computations, so we force a minimum positive
// value. We use 9 decimal places for the epsilon value since this is the
// maximum number of significant digits for a 32-bit floating-point number.
// Note that after a certain zoom level, rendering quality will be affected
// by the loss of precision in floating-point computations.
var zoomLimitEpsilon = 0.000000001;


/**
 * @class
 * @classdesc A view implementing an orthogonal projection for flat images.
 * @implements View
 *
 * @param {Object} params the initial view parameters.
 *
 * @param {number} params.mediaAspectRatio image aspect ratio.
 * When `mediaAspectRatio === 1`, the image width equals its height.
 * When `mediaAspectRatio < 1`, the image width is less than its height.
 * When `mediaAspectRatio > 1`, the image height is less than its width.
 *
 * @param {number} [params.x=0.5] horizontal coordinate of the image point at
 * the viewport center, in the [0, 1] range.
 * When `x === 0.5`, the image is centered horizontally.
 * When `x === 0`, the left edge of the image is at the viewport center.
 * When `x === 1`, the right edge of the image is at the viewport center.
 *
 * @param {number} [params.y=0.5] vertical coordinate of the image point at
 * the viewport center, in the [0, 1] range.
 * When `y === 0.5`, the image is centered vertically.
 * When `y === 0`, the top edge of the image is at the viewport center.
 * When `y === 1`, the bottom edge of the image is at the viewport center.
 *
 * @param {number} [params.zoom=1] the horizontal zoom, in the [0, ∞] range.
 * When `zoom === 1`, the image is exactly as wide as the viewport.
 * when `zoom < 1`, the image is zoomed in.
 * when `zoom > 1`, the image is zoomed out.
 *
 * @param {Function} limiter the view limiting function.
 */
function FlatView(params, limiter) {
  // Require an aspect ratio to be specified.
  if (!(params && params.mediaAspectRatio != null)) {
    throw new Error('mediaAspectRatio must be defined');
  }

  // The initial values for the view parameters.
  this._x = params && params.x != null ? params.x : defaultX;
  this._y = params && params.y != null ? params.y : defaultY;
  this._zoom = params && params.zoom != null ? params.zoom : defaultZoom;
  this._mediaAspectRatio = params.mediaAspectRatio;
  this._width = params && params.width != null ?
    params.width : defaultWidth;
  this._height = params && params.height != null ?
    params.height : defaultHeight;

  // The initial value for the view limiter.
  this._limiter = limiter || null;

  // The last calculated view frustum.
  this._viewFrustum = [
    0, // top
    0, // right
    0, // bottom
    0  // left
  ];

  // The last calculated projection matrix.
  this._projectionMatrix = mat4.create();

  // Whether the projection matrix needs to be updated.
  this._projectionChanged = true;

  // Temporary variables used for calculations.
  this._params = {};
  this._vertex = vec4.create();
  this._invProj = mat4.create();

  // Force view limiting on initial parameters.
  this._update();
}

eventEmitter(FlatView);


/**
 * Destructor.
 */
FlatView.prototype.destroy = function() {
  this._x = null;
  this._y = null;
  this._zoom = null;
  this._mediaAspectRatio = null;
  this._width = null;
  this._height = null;
  this._limiter = null;
  this._viewFrustum = null;
  this._projectionMatrix = null;
  this._projectionChanged = null;
  this._params = null;
  this._vertex = null;
  this._invProj = null;
};


/**
 * Get the x parameter.
 * @return {number}
 */
FlatView.prototype.x = function() {
  return this._x;
};


/**
 * Get the y parameter.
 * @return {number}
 */
FlatView.prototype.y = function() {
  return this._y;
};


/**
 * Get the zoom value.
 * @return {number}
 */
FlatView.prototype.zoom = function() {
  return this._zoom;
};


/**
 * Get the media aspect ratio.
 * @return {number}
 */
FlatView.prototype.mediaAspectRatio = function() {
  return this._mediaAspectRatio;
};


/**
 * Get the viewport width.
 * @return {number}
 */
FlatView.prototype.width = function() {
  return this._width;
};


/**
 * Get the viewport height.
 * @return {number}
 */
FlatView.prototype.height = function() {
  return this._height;
};


/**
 * Get the viewport dimensions. If an object argument is supplied, the object
 * is filled in with the result and returned. Otherwise, a fresh object is
 * returned.
 * @return {Object} obj
 * @return {number} obj.width
 * @return {number} obj.height
 */
FlatView.prototype.size = function(obj) {
  obj = obj || {};
  obj.width = this._width;
  obj.height = this._height;
  return obj;
};


/**
 * Get the view parameters. If an object argument is supplied, the object is
 * filled in with the result and returned. Otherwise, a fresh object is
 * returned.
 * @return {Object} obj
 * @return {number} obj.x
 * @return {number} obj.y
 * @return {number} obj.zoom
 * @return {number} obj.mediaAspectRatio
 */
FlatView.prototype.parameters = function(obj) {
  obj = obj || {};
  obj.x = this._x;
  obj.y = this._y;
  obj.zoom = this._zoom;
  obj.mediaAspectRatio = this._mediaAspectRatio;
  return obj;
};


/**
 * Get the view limiter.
 * @return {Function}
 */
FlatView.prototype.limiter = function() {
  return this._limiter;
};


/**
 * Set the x parameter.
 * @param {number} x
 */
FlatView.prototype.setX = function(x) {
  this._resetParams();
  this._params.x = x;
  this._update(this._params);
};


/**
 * Set the y parameter.
 * @param {number} y
 */
FlatView.prototype.setY = function(y) {
  this._resetParams();
  this._params.y = y;
  this._update(this._params);
};


/**
 * Set the zoom value.
 * @param {number} zoom
 */
FlatView.prototype.setZoom = function(zoom) {
  this._resetParams();
  this._params.zoom = zoom;
  this._update(this._params);
};


/**
 * Add xOffset to the x parameter.
 * @param {number} xOffset
 */
FlatView.prototype.offsetX = function(xOffset) {
  this.setX(this._x + xOffset);
};


/**
 * Add yOffset to the y parameter.
 * @param {number} yOffset
 */
FlatView.prototype.offsetY = function(yOffset)
{
  this.setY(this._y + yOffset);
};


/**
 * Add zoomOffset to the zoom value.
 * @param {number} zoomOffset
 */
FlatView.prototype.offsetZoom = function(zoomOffset) {
  this.setZoom(this._zoom + zoomOffset);
};


/**
 * Set the media aspect ratio.
 * @param {number} mediaAspectRatio
 */
FlatView.prototype.setMediaAspectRatio = function(mediaAspectRatio) {
  this._resetParams();
  this._params.mediaAspectRatio = mediaAspectRatio;
  this._update(this._params);
};


/**
 * Set the viewport dimensions.
 * @param {Object} obj
 * @param {number} obj.width
 * @param {number} obj.height
 */
FlatView.prototype.setSize = function(obj) {
  this._resetParams();
  this._params.width = obj.width;
  this._params.height = obj.height;
  this._update(this._params);
};


/**
 * Set the view parameters. Unspecified parameters are left unchanged.
 * @param {Object} obj
 * @param {number} obj.x
 * @param {number} obj.y
 * @param {number} obj.zoom
 * @param {number} obj.mediaAspectRatio
 */
FlatView.prototype.setParameters = function(obj) {
  this._resetParams();
  var params = this._params;
  params.x = obj.x;
  params.y = obj.y;
  params.zoom = obj.zoom;
  params.mediaAspectRatio = obj.mediaAspectRatio;
  this._update(params);
};


/**
 * Set the view limiter.
 * @param {Function} limiter
 */
FlatView.prototype.setLimiter = function(limiter) {
  this._limiter = limiter || null;
  this._update();
};


FlatView.prototype._resetParams = function() {
  var params = this._params;
  params.x = null;
  params.y = null;
  params.zoom = null;
  params.mediaAspectRatio = null;
  params.width = null;
  params.height = null;
};


FlatView.prototype._update = function(params) {

  // Avoid object allocation when no parameters are supplied.
  if (params == null) {
    this._resetParams();
    params = this._params;
  }

  // Save old parameters for later comparison.
  var oldX = this._x;
  var oldY = this._y;
  var oldZoom = this._zoom;
  var oldMediaAspectRatio = this._mediaAspectRatio;
  var oldWidth = this._width;
  var oldHeight = this._height;

  // Fill in object with the new set of parameters to pass into the limiter.
  params.x = params.x != null ? params.x : oldX;
  params.y = params.y != null ? params.y : oldY;
  params.zoom = params.zoom != null ? params.zoom : oldZoom;
  params.mediaAspectRatio = params.mediaAspectRatio != null ?
    params.mediaAspectRatio : oldMediaAspectRatio;
  params.width = params.width != null ? params.width : oldWidth;
  params.height = params.height != null ? params.height : oldHeight;

  // Apply view limiting when defined.
  if (this._limiter) {
    params = this._limiter(params);
    if (!params) {
      throw new Error('Bad view limiter');
    }
  }

  // Grab the limited parameters.
  var newX = params.x;
  var newY = params.y;
  var newZoom = params.zoom;
  var newMediaAspectRatio = params.mediaAspectRatio;
  var newWidth = params.width;
  var newHeight = params.height;

  // Consistency check.
  if (!real(newX) || !real(newY) || !real(newZoom) ||
      !real(newMediaAspectRatio) || !real(newWidth) || !real(newHeight)) {
    throw new Error('Bad view - suspect a broken limiter');
  }

  // Constrain zoom.
  newZoom = clamp(newZoom, zoomLimitEpsilon, Infinity);

  // Update parameters.
  this._x = newX;
  this._y = newY;
  this._zoom = newZoom;
  this._mediaAspectRatio = newMediaAspectRatio;
  this._width = newWidth;
  this._height = newHeight;

  // Check whether the parameters changed and emit the corresponding events.
  if (newX !== oldX || newY !== oldY || newZoom !== oldZoom ||
      newMediaAspectRatio !== oldMediaAspectRatio ||
      newWidth !== oldWidth || newHeight !== oldHeight) {
    this._projectionChanged = true;
    this.emit('change');
  }
  if (newWidth !== oldWidth || newHeight !== oldHeight) {
    this.emit('resize');
  }

};


FlatView.prototype._zoomX = function() {
  return this._zoom;
};


FlatView.prototype._zoomY = function() {
  var mediaAspectRatio = this._mediaAspectRatio;
  var aspect = this._width / this._height;
  var zoomX = this._zoom;
  var zoomY = zoomX * mediaAspectRatio / aspect;
  if (isNaN(zoomY)) {
    zoomY = zoomX;
  }
  return zoomY;
};


FlatView.prototype.updateWithControlParameters = function(parameters) {
  var scale = this.zoom();
  var zoomX = this._zoomX();
  var zoomY = this._zoomY();

  // TODO: should the scale be the same for both axes?
  this.offsetX(parameters.axisScaledX * zoomX + parameters.x * scale);
  this.offsetY(parameters.axisScaledY * zoomY + parameters.y * scale);
  this.offsetZoom(parameters.zoom * scale);
};


/**
 * Compute and return the projection matrix for the current view.
 * @returns {mat4}
 */
FlatView.prototype.projection = function() {

  var projectionMatrix = this._projectionMatrix;

  // Recalculate projection matrix when required.
  if (this._projectionChanged) {
    var x = this._x;
    var y = this._y;
    var zoomX = this._zoomX();
    var zoomY = this._zoomY();

    // Update view frustum.
    var frustum = this._viewFrustum;
    var top     = frustum[0] = (0.5 - y) + 0.5 * zoomY;
    var right   = frustum[1] = (x - 0.5) + 0.5 * zoomX;
    var bottom  = frustum[2] = (0.5 - y) - 0.5 * zoomY;
    var left    = frustum[3] = (x - 0.5) - 0.5 * zoomX;

    // Recalculate projection matrix.
    mat4.ortho(projectionMatrix, left, right, bottom, top, -1, 1);
    this._projectionChanged = false;
  }

  return projectionMatrix;

};


/**
 * Return whether the view frustum intersects the given rectangle.
 * This function may return false positives, but never false negatives.
 * It is used for frustum culling, i.e., excluding invisible tiles from the
 * rendering process.
 * @param {vec4[]} rectangle
 * @return whether the rectangle intersects the view frustum.
 */
FlatView.prototype.intersects = function(rectangle) {

  var frustum = this._viewFrustum;

  // Call projection() for the side effect of updating the frustum.
  this.projection();

  // Check whether the rectangle is on the outer side of any of the frustum
  // planes. This is a sufficient condition, though not necessary, for the
  // rectangle to be completely outside the fruouter
  for (var i = 0; i < frustum.length; i++) {
    var limit = frustum[i];
    var axis = planeAxes[i];
    var cmp = planeCmp[i];
    var inside = false;
    for (var j = 0; j < rectangle.length; j++) {
      var vertex = rectangle[j];
      if (cmp < 0 && vertex[axis] < limit || cmp > 0 && vertex[axis] > limit) {
        inside = true;
        break;
      }
    }
    if (!inside) {
      return false;
    }
  }
  return true;

};


/**
 * Select the level that should be used to render the view.
 * @param {Level[]} levelList the list of levels from which to select.
 * @return {Level} the selected level.
 */
FlatView.prototype.selectLevel = function(levels) {

  // Multiply the viewport width by the device pixel ratio to get the required
  // horizontal resolution in pixels.
  //
  // Calculate the fraction of the image that would be visible at the current
  // zoom value. Then, for each level, multiply by the level width to get the
  // width in pixels of the portion that would be visible.
  //
  // Search for the smallest level that satifies the the required width,
  // falling back on the largest level if none do.

  var requiredPixels = pixelRatio() * this.width();
  var zoomFactor = this._zoom;

  for (var i = 0; i < levels.length; i++) {
    var level = levels[i];
    if (zoomFactor * level.width() >= requiredPixels) {
      return level;
    }
  }

  return levels[levels.length - 1];

};


/**
 * Convert view coordinates into screen position. If a result argument is
 * supplied, the object is filled in with the result and returned. Otherwise,
 * a fresh object is returned.
 * @param {Object} coords
 * @param {number} coords.x
 * @param {number} coords.y
 * @return {Object} result
 * @return {number} result.x
 * @return {number} result.y
 */
FlatView.prototype.coordinatesToScreen = function(coords, result) {
  var ray = this._vertex;

  if (!result) {
    result = {};
  }

  var width = this._width;
  var height = this._height;

  // Undefined on a null viewport.
  if (width <= 0 || height <= 0) {
    result.x = null;
    result.y = null;
    return null;
  }

  // Extract coordinates from argument, filling in default values.
  var x = coords && coords.x != null ? coords.x : defaultX;
  var y = coords && coords.y != null ? coords.y : defaultY;

  // Project view ray onto clip space.
  vec4.set(ray, x - 0.5, 0.5 - y, -1, 1);
  vec4.transformMat4(ray, ray, this.projection());

  // Calculate perspective divide.
  for (var i = 0; i < 3; i++) {
    ray[i] /= ray[3];
  }

  // Convert to viewport coordinates and return.
  result.x = width * (ray[0] + 1) / 2;
  result.y = height * (1 - ray[1]) / 2;

  return result;
};


/**
 * Convert screen position into view coordinates. If a result argument is
 * supplied, the object is filled in with the result and returned. Otherwise,
 * a fresh object is returned.
 * @param {Object} screen
 * @param {number} screen.x
 * @param {number} screen.y
 * @return {Object} result
 * @return {number} result.x
 * @return {number} result.y
 */
FlatView.prototype.screenToCoordinates = function(screen, result) {
  var ray = this._vertex;
  var invProj = this._invProj;

  if (!result) {
    result = {};
  }

  var width = this._width;
  var height = this._height;

  // Calculate the inverse projection matrix.
  // TODO: cache result?
  mat4.invert(invProj, this.projection());

  // Convert viewport coordinates to clip space.
  var vecx = 2.0 * screen.x / width - 1.0;
  var vecy = 1.0 - 2.0 * screen.y / height;
  vec4.set(ray, vecx, vecy, 1, 1);

  // Project back to world space.
  vec4.transformMat4(ray, ray, invProj);

  // Convert to flat coordinates.
  result.x = 0.5 + ray[0];
  result.y = 0.5 - ray[1];

  return result;
};


/**
 * View limiting functions.
 * @namespace
 */
FlatView.limit = {

  /**
   * Return a view limiter that constrains the x parameter.
   * @param {number} min
   * @param {number} max
   * @return {Function} view limiter
   */
  x: function(min, max) {
    return function limitX(params) {
      params.x = clamp(params.x, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the y parameter.
   * @param {number} min the minimum y value.
   * @param {number} max the maximum y value.
   * @return {Function} view limiter
   */
  y: function(min, max) {
    return function limitY(params) {
      params.y = clamp(params.y, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter than constrains the zoom parameter.
   * @param {number} min the minimum zoom value
   * @param {number} max the maximum zoom value
   * @return {Function} view limiter
   */
  zoom: function(min, max) {
    return function limitZoom(params) {
      params.zoom = clamp(params.zoom, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size the image width in pixels
   * @return {Function} view limiter
   */
  resolution: function(size) {
    return function limitResolution(params) {
      if(params.width <= 0 || params.height <= 0) {
        return params;
      }
      var width = params.width;
      var minZoom = pixelRatio() * width / size;
      params.zoom = clamp(params.zoom, minZoom, Infinity);
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the values of the x parameter that
   * are inside the viewport.
   * @param {number} min the minimum x value
   * @param {number} max the maximum x value
   * @return {Function} view limiter
   */
  visibleX: function(min, max) {
    return function limitVisibleX(params) {
      // Calculate the zoom value that makes the specified range fully visible.
      var maxZoom = max - min;

      // Clamp zoom to the maximum value.
      if (params.zoom > maxZoom) {
        params.zoom = maxZoom;
      }

      // Bound X such that the image is visible up to the range edges.
      var minX = min + 0.5 * params.zoom;
      var maxX = max - 0.5 * params.zoom;
      params.x = clamp(params.x, minX, maxX);

      return params;
    };
  },

  /**
   * Return a view limiter that constrains the values of the y parameter that
   * are inside the viewport.
   * @param {number} min the minimum y value
   * @param {number} max the maximum y value
   * @return {Function} view limiter
   */
  visibleY: function(min, max) {
    return function limitVisibleY(params) {

      // Do nothing for a null viewport.
      if (params.width <= 0 || params.height <= 0) {
        return params;
      }

      // Calculate the X to Y conversion factor.
      var viewportAspectRatio = params.width / params.height;
      var factor = viewportAspectRatio / params.mediaAspectRatio;

      // Calculate the zoom value that makes the specified range fully visible.
      var maxZoom = (max - min) * factor;

      // Clamp zoom to the maximum value.
      if (params.zoom > maxZoom) {
        params.zoom = maxZoom;
      }

      // Bound Y such that the image is visible up to the range edges.
      var minY = min + 0.5 * params.zoom / factor;
      var maxY = max - 0.5 * params.zoom / factor;
      params.y = clamp(params.y, minY, maxY);

      return params;
    };
  },


  /**
   * Return a view limiter that constrains the zoom parameter such that
   * zooming out is prevented beyond the point at which the image is fully
   * visible. Unless the image and the viewport have the same aspect ratio,
   * this will cause bands to appear around the image.
   * @return {Function} view limiter
   */
  letterbox: function() {
    return function limitLetterbox(params) {
      if(params.width <= 0 || params.height <= 0) {
        return params;
      }
      var viewportAspectRatio = params.width / params.height;

      var fullWidthZoom = 1.0;
      var fullHeightZoom = viewportAspectRatio / params.mediaAspectRatio;

      // If the image is wider than the viewport, limit the horizontal zoom to
      // the image width.
      if (params.mediaAspectRatio >= viewportAspectRatio) {
        params.zoom = Math.min(params.zoom, fullWidthZoom);
      }

      // If the image is narrower than the viewport, limit the vertical zoom to
      // the image height.
      if (params.mediaAspectRatio <= viewportAspectRatio) {
        params.zoom = Math.min(params.zoom, fullHeightZoom);
      }

      // If the full image width is visible, limit x to the central point.
      // Else, bound x such that image is visible up to the horizontal edges.
      var minX, maxX;
      if (params.zoom > fullWidthZoom) {
        minX = maxX = 0.5;
      } else {
        minX = 0.0 + 0.5 * params.zoom / fullWidthZoom;
        maxX = 1.0 - 0.5 * params.zoom / fullWidthZoom;
      }

      // If the full image height is visible, limit y to the central point.
      // Else, bound y such that image is visible up to the vertical edges.
      var minY, maxY;
      if (params.zoom > fullHeightZoom) {
        minY = maxY = 0.5;
      } else {
        minY = 0.0 + 0.5 * params.zoom / fullHeightZoom;
        maxY = 1.0 - 0.5 * params.zoom / fullHeightZoom;
      }

      // Clamp x and y into the calculated bounds.
      params.x = clamp(params.x, minX, maxX);
      params.y = clamp(params.y, minY, maxY);

      return params;
    };
  }

};


FlatView.type = FlatView.prototype.type = 'flat';


module.exports = FlatView;

},{"../util/clamp":87,"../util/pixelRatio":104,"../util/real":106,"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec4":11,"minimal-event-emitter":13}],112:[function(require,module,exports){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var eventEmitter = require('minimal-event-emitter');
var pixelRatio = require('../util/pixelRatio');
var convertFov = require('../util/convertFov');
var rotateVector = require('../util/rotateVector');
var mod = require('../util/mod');
var real = require('../util/real');
var clamp = require('../util/clamp');
var decimal = require('../util/decimal');
var compose = require('../util/compose');
var mat4 = require('gl-matrix/src/gl-matrix/mat4');
var vec4 = require('gl-matrix/src/gl-matrix/vec4');

// Default viewport dimensions.
// Start with zero to ensure that those values are handled correctly.
var defaultWidth = 0;
var defaultHeight = 0;

// Default view parameters.
var defaultYaw = 0;
var defaultPitch = 0;
var defaultRoll = 0;
var defaultFov = Math.PI/4;
var defaultProjectionCenterX = 0;
var defaultProjectionCenterY = 0;

// A fov of exactly 0 or π breaks some computations, so we constrain it to the
// [fovLimitEpsilon, π - fovLimitEpsilon] interval. We use 9 decimal places for
// the epsilon value since this is the maximum number of significant digits for
// a 32-bit floating-point number. Note that after a certain zoom level,
// rendering quality will be affected by the loss of precision in
// floating-point computations.
var fovLimitEpsilon = 0.000000001;


/**
 * @class
 * @classdesc A view implementiong a rectilinear projection for 360° images.
 * @implements View
 *
 * @param {Object} params the initial view parameters.
 *
 * @param {number} [params.yaw=0] the yaw angle, in the [-π, π] range.
 * When `params.yaw < 0`, the view rotates left.
 * When `params.yaw > 0`, the view rotates right.
 *
 * @param {number} [params.pitch=0] the pitch angle, in the [-π, π] range.
 * When `params.pitch < 0`, the view rotates downwards.
 * When `params.pitch > 0`, the view rotates upwards.
 *
 * @param {number} [params.roll=0] the roll angle, in the [-π, π] range.
 * When `params.roll < 0`, the view rotates clockwise.
 * When `params.roll > 0`, the view rotates counter-clockwise.
 *
 * @param {number} [params.fov=π/4] the horizontal field of view, in the
 * [0, π] range.
 *
 * @param {Function} limiter the view limiting function.
 */
function RectilinearView(params, limiter) {
  // The initial values for the view parameters.
  this._yaw = params && params.yaw != null ? params.yaw : defaultYaw;
  this._pitch = params && params.pitch != null ? params.pitch : defaultPitch;
  this._roll = params && params.roll != null ? params.roll : defaultRoll;
  this._fov = params && params.fov != null ? params.fov : defaultFov;
  this._width = params && params.width != null ?
    params.width : defaultWidth;
  this._height = params && params.height != null ?
    params.height : defaultHeight;
  this._projectionCenterX = params && params.projectionCenterX != null ?
    params.projectionCenterX : defaultProjectionCenterX;
  this._projectionCenterY = params && params.projectionCenterY != null ?
    params.projectionCenterY : defaultProjectionCenterY;

  // The initial value for the view limiter.
  this._limiter = limiter || null;

  // The last calculated projection matrix.
  this._projectionMatrix = mat4.create();

  // Whether the projection matrix needs to be updated.
  this._projectionChanged = true;

  // The last calculated view frustum.
  this._viewFrustum = [
    vec4.create(), // left
    vec4.create(), // right
    vec4.create(), // bottom
    vec4.create(), // top
    vec4.create()  // camera
  ];

  // Temporary variables used for calculations.
  this._params = {};
  this._fovs = {};
  this._vertex = vec4.create();
  this._invProj = mat4.create();

  // Force view limiting on initial parameters.
  this._update();
}

eventEmitter(RectilinearView);


/**
 * Destructor.
 */
RectilinearView.prototype.destroy = function() {
  this._yaw = null;
  this._pitch = null;
  this._roll = null;
  this._fov = null;
  this._width = null;
  this._height = null;
  this._limiter = null;
  this._projectionChanged = null;
  this._projectionMatrix = null;
  this._viewFrustum = null;
  this._params = null;
  this._vertex = null;
  this._invProj = null;
};


/**
 * Get the yaw angle.
 * @return {number}
 */
RectilinearView.prototype.yaw = function() {
  return this._yaw;
};


/**
 * Get the pitch angle.
 * @return {number}
 */
RectilinearView.prototype.pitch = function() {
  return this._pitch;
};


/**
 * Get the roll angle.
 * @return {number}
 */
RectilinearView.prototype.roll = function() {
  return this._roll;
};


RectilinearView.prototype.projectionCenterX = function() {
  return this._projectionCenterX;
};


RectilinearView.prototype.projectionCenterY = function() {
  return this._projectionCenterY;
};


/**
 * Get the fov value.
 * @return {number}
 */
RectilinearView.prototype.fov = function() {
  return this._fov;
};


/**
 * Get the viewport width.
 * @return {number}
 */
RectilinearView.prototype.width = function() {
  return this._width;
};


/**
 * Get the viewport height.
 * @return {number}
 */
RectilinearView.prototype.height = function() {
  return this._height;
};


/**
 * Get the viewport dimensions. If an object argument is supplied, the object
 * is filled in with the result and returned. Otherwise, a fresh object is
 * returned.
 * @return {Object} obj
 * @return {number} obj.width
 * @return {number} obj.height
 */
RectilinearView.prototype.size = function(obj) {
  if (!obj) {
    obj = {};
  }
  obj.width = this._width;
  obj.height = this._height;
  return obj;
};


/**
 * Get the view parameters. If an object argument is supplied, the object is
 * filled in with the result and returned. Otherwise, a fresh object is
 * returned.
 * @return {Object} obj
 * @return {number} obj.yaw
 * @return {number} obj.pitch
 * @return {number} obj.roll
 * @return {number} obj.fov
 */
RectilinearView.prototype.parameters = function(obj) {
  if (!obj) {
    obj = {};
  }
  obj.yaw = this._yaw;
  obj.pitch = this._pitch;
  obj.roll = this._roll;
  obj.fov = this._fov;
  return obj;
};


/**
 * Get the view limiter.
 * @return {Function} limiter
 */
RectilinearView.prototype.limiter = function() {
  return this._limiter;
};


/**
 * Set the yaw angle.
 * @param {number} yaw
 */
RectilinearView.prototype.setYaw = function(yaw) {
  this._resetParams();
  this._params.yaw = yaw;
  this._update(this._params);
};


/**
 * Set the pitch angle.
 * @param {number} pitch
 */
RectilinearView.prototype.setPitch = function(pitch) {
  this._resetParams();
  this._params.pitch = pitch;
  this._update(this._params);
};


/**
 * Set the roll angle.
 * @param {number} roll
 */
RectilinearView.prototype.setRoll = function(roll) {
  this._resetParams();
  this._params.roll = roll;
  this._update(this._params);
};


/**
 * Set the fov value.
 * @param {number} fov
 */
RectilinearView.prototype.setFov = function(fov) {
  this._resetParams();
  this._params.fov = fov;
  this._update(this._params);
};


RectilinearView.prototype.setProjectionCenterX = function(projectionCenterX) {
  this._resetParams();
  this._params.projectionCenterX = projectionCenterX;
  this._update(this._params);
};


RectilinearView.prototype.setProjectionCenterY = function(projectionCenterY) {
  this._resetParams();
  this._params.projectionCenterY = projectionCenterY;
  this._update(this._params);
};


/**
 * Add yawOffset to the current yaw value.
 * @param {number} yawOffset
 */
RectilinearView.prototype.offsetYaw = function(yawOffset) {
  this.setYaw(this._yaw + yawOffset);
};


/**
 * Add pitchOffset to the current pitch value.
 * @param {number} pitchOffset
 */
RectilinearView.prototype.offsetPitch = function(pitchOffset) {
  this.setPitch(this._pitch + pitchOffset);
};


/**
 * Add rollOffset to the current roll value.
 * @param {number} rollOffset
 */
RectilinearView.prototype.offsetRoll = function(rollOffset) {
  this.setRoll(this._roll + rollOffset);
};


/**
 * Add fovOffset to the current fov value.
 * @param {number} fovOffset
 */
RectilinearView.prototype.offsetFov = function(fovOffset) {
  this.setFov(this._fov + fovOffset);
};


/**
 * Set the viewport dimensions.
 * @param {Object} obj
 * @param {number} obj.width
 * @param {number} obj.height
 */
RectilinearView.prototype.setSize = function(obj) {
  this._resetParams();
  this._params.width = obj.width;
  this._params.height = obj.height;
  this._update(this._params);
};


/**
 * Set the view parameters. Unspecified parameters are left unchanged.
 * @param {Object} obj
 * @param {number} obj.yaw
 * @param {number} obj.pitch
 * @param {number} obj.roll
 * @param {number} obj.fov
 */
RectilinearView.prototype.setParameters = function(obj) {
  this._resetParams();
  var params = this._params;
  params.yaw = obj.yaw;
  params.pitch = obj.pitch;
  params.roll = obj.roll;
  params.fov = obj.fov;
  params.projectionCenterX = obj.projectionCenterX;
  params.projectionCenterY = obj.projectionCenterY;
  this._update(params);
};


/**
 * Set the view limiter.
 * @param {Function} limiter
 */
RectilinearView.prototype.setLimiter = function(limiter) {
  this._limiter = limiter || null;
  this._update();
};


RectilinearView.prototype._resetParams = function() {
  var params = this._params;
  params.yaw = null;
  params.pitch = null;
  params.roll = null;
  params.fov = null;
  params.width = null;
  params.height = null;
};


RectilinearView.prototype._update = function(params) {

  // Avoid object allocation when no parameters are supplied.
  if (params == null) {
    this._resetParams();
    params = this._params;
  }

  // Save old parameters for later comparison.
  var oldYaw = this._yaw;
  var oldPitch = this._pitch;
  var oldRoll = this._roll;
  var oldFov = this._fov;
  var oldProjectionCenterX = this._projectionCenterX;
  var oldProjectionCenterY = this._projectionCenterY;
  var oldWidth = this._width;
  var oldHeight = this._height;

  // Fill in object with the new set of parameters to pass into the limiter.
  params.yaw = params.yaw != null ? params.yaw : oldYaw;
  params.pitch = params.pitch != null ? params.pitch : oldPitch;
  params.roll = params.roll != null ? params.roll : oldRoll;
  params.fov = params.fov != null ? params.fov : oldFov;
  params.width = params.width != null ? params.width : oldWidth;
  params.height = params.height != null ? params.height : oldHeight;
  params.projectionCenterX = params.projectionCenterX != null ?
    params.projectionCenterX : oldProjectionCenterX;
  params.projectionCenterY = params.projectionCenterY != null ?
    params.projectionCenterY : oldProjectionCenterY;

  // Apply view limiting when defined.
  if (this._limiter) {
    params = this._limiter(params);
    if (!params) {
      throw new Error('Bad view limiter');
    }
  }

  // Normalize parameters.
  params = this._normalize(params);

  // Grab the limited parameters.
  var newYaw = params.yaw;
  var newPitch = params.pitch;
  var newRoll = params.roll;
  var newFov = params.fov;
  var newWidth = params.width;
  var newHeight = params.height;
  var newProjectionCenterX = params.projectionCenterX;
  var newProjectionCenterY = params.projectionCenterY;

  // Consistency check.
  if (!real(newYaw) || !real(newPitch) || !real(newRoll) ||
      !real(newFov) || !real(newWidth) || !real(newHeight) ||
      !real(newProjectionCenterX) || !real(newProjectionCenterY)) {
    throw new Error('Bad view - suspect a broken limiter');
  }

  // Update parameters.
  this._yaw = newYaw;
  this._pitch = newPitch;
  this._roll = newRoll;
  this._fov = newFov;
  this._width = newWidth;
  this._height = newHeight;
  this._projectionCenterX = newProjectionCenterX;
  this._projectionCenterY = newProjectionCenterY;

  // Check whether the parameters changed and emit the corresponding events.
  if (newYaw !== oldYaw || newPitch !== oldPitch || newRoll !== oldRoll ||
      newFov !== oldFov || newWidth !== oldWidth || newHeight !== oldHeight ||
      newProjectionCenterX !== oldProjectionCenterX ||
      newProjectionCenterY !== oldProjectionCenterY) {
    this._projectionChanged = true;
    this.emit('change');
  }
  if (newWidth !== oldWidth || newHeight !== oldHeight) {
    this.emit('resize');
  }

};


RectilinearView.prototype._normalize = function(params) {

  this._normalizeCoordinates(params);

  // Make sure that neither the horizontal nor the vertical fields of view
  // exceed π - fovLimitEpsilon.
  var hfovPi = convertFov.htov(Math.PI, params.width, params.height);
  var maxFov = isNaN(hfovPi) ? Math.PI : Math.min(Math.PI, hfovPi);
  params.fov = clamp(params.fov, fovLimitEpsilon, maxFov - fovLimitEpsilon);

  return params;
};


RectilinearView.prototype._normalizeCoordinates = function(params) {
  // Constrain yaw, pitch and roll to the [-π, π] interval.
  if ('yaw' in params) {
    params.yaw = mod(params.yaw - Math.PI, -2*Math.PI) + Math.PI;
  }
  if ('pitch' in params) {
    params.pitch = mod(params.pitch - Math.PI, -2*Math.PI) + Math.PI;
  }
  if ('roll' in params) {
    params.roll = mod(params.roll - Math.PI, -2*Math.PI) + Math.PI;
  }
  return params;
};


/**
 * Normalize view coordinates so that they are the closest to the current view.
 * Useful for tweening the view through the shortest path. If a result argument
 * is supplied, the object is filled in with the result and returned.
 * Otherwise, a fresh object is returned.
 *
 * @param {Object} coords
 * @param {number} coords.yaw
 * @param {number} coords.pitch
 * @return {Object} result
 * @return {number} result.yaw
 * @return {number} result.pitch
 */
RectilinearView.prototype.normalizeToClosest = function(coords, result) {

  var viewYaw = this._yaw;
  var viewPitch = this._pitch;

  var coordYaw = coords.yaw;
  var coordPitch = coords.pitch;

  // Check if the yaw is closer after subtracting or adding a full circle.
  var prevYaw = coordYaw - 2*Math.PI;
  var nextYaw = coordYaw + 2*Math.PI;
  if (Math.abs(prevYaw - viewYaw) < Math.abs(coordYaw - viewYaw)) {
    coordYaw = prevYaw;
  }
  else if (Math.abs(nextYaw - viewYaw) < Math.abs(coordYaw - viewYaw)) {
    coordYaw = nextYaw;
  }

  // Check if the pitch is closer after subtracting or adding a full circle.
  var prevPitch = coordPitch - 2*Math.PI;
  var nextPitch = coordPitch + 2*Math.PI;
  if (Math.abs(prevPitch - viewPitch) < Math.abs(coordPitch - viewPitch)) {
    coordPitch = prevPitch;
  }
  else if (Math.abs(prevPitch - viewPitch) < Math.abs(coordPitch - viewPitch)) {
    coordPitch = nextPitch;
  }

  result = result || {};
  result.yaw = coordYaw;
  result.pitch = coordPitch;
  return result;

};


RectilinearView.prototype.updateWithControlParameters = function(parameters) {
  // axisScaledX and axisScaledY are scaled according to their own axis
  // x and y are scaled by the same value

  // If the viewport dimensions are zero, assume a square viewport
  // when converting from hfov to vfov.
  var vfov = this._fov;
  var hfov = convertFov.vtoh(vfov, this._width, this._height);
  if (isNaN(hfov)) {
    hfov = vfov;
  }

  // TODO: revisit this after we rethink the control parameters.
  this.offsetYaw(parameters.axisScaledX * hfov + parameters.x * 2 * hfov + parameters.yaw);
  this.offsetPitch(parameters.axisScaledY * vfov + parameters.y * 2 * hfov + parameters.pitch);
  this.offsetRoll(-parameters.roll);
  this.offsetFov(parameters.zoom * vfov);
};


/**
 * Compute and return the projection matrix for the current view.
 * @returns {mat4}
 */
RectilinearView.prototype.projection = function() {

  var p = this._projectionMatrix;
  var f = this._viewFrustum;

  if (this._projectionChanged) {

    // Recalculate the projection matrix.

    var width = this._width;
    var height = this._height;

    var vfov = this._fov;
    var hfov = convertFov.vtoh(vfov, width, height);
    var aspect = width / height;

    var projectionCenterX = this._projectionCenterX;
    var projectionCenterY = this._projectionCenterY;

    if (projectionCenterX !== 0 || projectionCenterY !== 0) {
      var offsetAngleX = Math.atan(projectionCenterX * 2 * Math.tan(hfov/2));
      var offsetAngleY = Math.atan(projectionCenterY * 2 * Math.tan(vfov/2));
      var fovs = this._fovs;
      fovs.leftDegrees = (hfov/2 + offsetAngleX) * 180/Math.PI;
      fovs.rightDegrees = (hfov/2 - offsetAngleX) * 180/Math.PI;
      fovs.upDegrees = (vfov/2 + offsetAngleY) * 180/Math.PI;
      fovs.downDegrees = (vfov/2 - offsetAngleY) * 180/Math.PI;
      mat4.perspectiveFromFieldOfView(p, fovs, -1, 1);
    } else {
      mat4.perspective(p, vfov, aspect, -1, 1);
    }

    mat4.rotateZ(p, p, this._roll);
    mat4.rotateX(p, p, this._pitch);
    mat4.rotateY(p, p, this._yaw);

    // Extract frustum planes from projection matrix.
    // http://www8.cs.umu.se/kurser/5DV051/HT12/lab/plane_extraction.pdf

    vec4.set(f[0], p[3] + p[0], p[7] + p[4], p[11] + p[8],  0); // left
    vec4.set(f[1], p[3] - p[0], p[7] - p[4], p[11] - p[8],  0); // right
    vec4.set(f[2], p[3] + p[1], p[7] + p[5], p[11] + p[9],  0); // top
    vec4.set(f[3], p[3] - p[1], p[7] - p[5], p[11] - p[9],  0); // bottom
    vec4.set(f[4], p[3] + p[2], p[7] + p[6], p[11] + p[10], 0); // camera

    this._projectionChanged = false;
  }

  return p;

};


/**
 * Return whether the view frustum intersects the given rectangle.
 * This function may return false positives, but never false negatives.
 * It is used for frustum culling, i.e., excluding invisible tiles from the
 * rendering process.
 * @param {vec4[]} rectangle
 * @return whether the rectangle intersects the view frustum.
 */
RectilinearView.prototype.intersects = function(rectangle) {

  var planes = this._viewFrustum;
  var vertex = this._vertex;

  // Call projection() for the side effect of updating the view frustum.
  this.projection();

  // Check whether the rectangle is on the outer side of any of the frustum
  // planes. This is a sufficient condition, though not necessary, for the
  // rectangle to be completely outside the frustum.
  for (var i = 0; i < planes.length; i++) {
    var plane = planes[i];
    var inside = false;
    for (var j = 0; j < rectangle.length; j++) {
      var corner = rectangle[j];
      vec4.set(vertex, corner[0], corner[1], corner[2], 0);
      if (vec4.dot(plane, vertex) >= 0) {
        inside = true;
      }
    }
    if (!inside) {
      return false;
    }
  }
  return true;

};


/**
 * Select the level that should be used to render the view.
 * @param {Level[]} levelList the list of levels from which to select.
 * @return {Level} the selected level.
 */
RectilinearView.prototype.selectLevel = function(levelList) {

  // Multiply the viewport width by the device pixel ratio to get the required
  // horizontal resolution in pixels.
  //
  // Calculate the fraction of a cube face that would be visible given the
  // current vertical field of view. Then, for each level, multiply by the
  // level height to get the height in pixels of the portion that would be
  // visible.
  //
  // Search for the smallest level that satifies the the required height,
  // falling back on the largest level if none do.

  var requiredPixels = pixelRatio() * this._height;
  var coverFactor = Math.tan(0.5 * this._fov);

  for (var i = 0; i < levelList.length; i++) {
    var level = levelList[i];
    if (coverFactor * level.height() >= requiredPixels) {
      return level;
    }
  }

  return levelList[levelList.length - 1];

};


/**
 * Convert view coordinates into screen position. If a result argument is
 * supplied, the object is filled in with the result and returned. Otherwise,
 * a fresh object is returned.
 * @param {Object} coords
 * @param {number} coords.yaw
 * @param {number} coords.pitch
 * @param {number} coords.roll
 * @return {Object} result
 * @return {number} result.x
 * @return {number} result.y
 */
RectilinearView.prototype.coordinatesToScreen = function(coords, result) {
  var ray = this._vertex;

  if (!result) {
    result = {};
  }

  var width = this._width;
  var height = this._height;

  // Undefined on a null viewport.
  if (width <= 0 || height <= 0) {
    result.x = null;
    result.y = null;
    return null;
  }

  // Extract coordinates from argument, filling in default values.
  var yaw = coords && coords.yaw != null ? coords.yaw : defaultYaw;
  var pitch = coords && coords.pitch != null ? coords.pitch : defaultPitch;
  var roll = coords && coords.roll != null ? coords.roll : defaultRoll;

  // Project view ray onto clip space.
  vec4.set(ray, 0, 0, -1, 1);
  rotateVector(ray, ray, -yaw, -pitch, -roll);
  vec4.transformMat4(ray, ray, this.projection());

  // Calculate perspective divide.
  for (var i = 0; i < 3; i++) {
    ray[i] /= ray[3];
  }

  if (ray[2] >= 0) {
    // Point is in front of camera.
    // Convert to viewport coordinates and return.
    result.x = width * (ray[0] + 1) / 2;
    result.y = height * (1 - ray[1]) / 2;
  } else {
    // Point is behind camera.
    result.x = null;
    result.y = null;
    return null;
  }

  return result;
};


/**
 * Convert screen position into view coordinates. If a result argument is
 * supplied, the object is filled in with the result and returned. Otherwise,
 * a fresh object is returned.
 * @param {Object} screen
 * @param {number} screen.x
 * @param {number} screen.y
 * @return {Object} result
 * @return {Object} result.x
 * @return {Object} result.y
 */
RectilinearView.prototype.screenToCoordinates = function(screen, result) {
  var ray = this._vertex;
  var invProj = this._invProj;

  if (!result) {
    result = {};
  }

  var width = this._width;
  var height = this._height;

  // Calculate the inverse projection matrix.
  // TODO: cache result?
  mat4.invert(invProj, this.projection());

  // Convert viewport coordinates to clip space.
  var vecx = 2.0 * screen.x / width - 1.0;
  var vecy = 1.0 - 2.0 * screen.y / height;
  vec4.set(ray, vecx, vecy, 1, 1);

  // Project back to world space.
  vec4.transformMat4(ray, ray, invProj);

  // Convert to spherical coordinates.
  var r = Math.sqrt(ray[0] * ray[0] + ray[1] * ray[1] + ray[2] * ray[2]);
  result.yaw = Math.atan2(ray[0], -ray[2]);
  result.pitch = Math.acos(ray[1] / r) - Math.PI/2;

  this._normalizeCoordinates(result);

  return result;
};


/**
  * Calculate the perspective transform required to position an element with
  * perspective.
  *
  * @param {Object} coords
  * @param {number} coords.yaw
  * @param {number} coords.pitch
  * @param {Number} radius Radius of the imaginary sphere where the element is
  * @param {String} extraTransforms Extra transformations to be applied at the end of
  the transformation. Can be used to rotate the element.
  * @return {String} The CSS transform to be applied on the element
  */
RectilinearView.prototype.coordinatesToPerspectiveTransform = function(coords, radius, extraTransforms) {
  extraTransforms = extraTransforms || "";

  var height = this._height;
  var width = this._width;
  var fov = this._fov;
  var perspective = 0.5 * height / Math.tan(fov / 2);

  var transform = '';

  // Center hotspot in screen.
  transform += 'translateX(' + decimal(width/2) + 'px) translateY(' + decimal(height/2) + 'px) ';
  transform += 'translateX(-50%) translateY(-50%) ';

  // Set the perspective depth.
  transform += 'perspective(' + decimal(perspective) + 'px) ';
  transform += 'translateZ(' + decimal(perspective) + 'px) ';

  // Set the camera rotation.
  transform += 'rotateZ(' + decimal(-this._roll) + 'rad) ';
  transform += 'rotateX(' + decimal(-this._pitch) + 'rad) ';
  transform += 'rotateY(' + decimal(this._yaw) + 'rad) ';

  // Set the hotspot rotation.
  transform += 'rotateY(' + decimal(-coords.yaw) + 'rad) ';
  transform += 'rotateX(' + decimal(coords.pitch) + 'rad) ';

  // Move back to sphere.
  transform += 'translateZ(' + decimal(-radius) + 'px) ';

  // Apply the extra transformations
  transform += extraTransforms + ' ';

  return transform;
};


/**
 * View limiting functions.
 * @namespace
 */
RectilinearView.limit = {

  /**
   * Return a view limiter that constrains the yaw angle.
   * @param {number} min the minimum yaw value
   * @param {number} max the maximum yaw value
   * @return {Function} view limiter
   */
  yaw: function(min, max) {
    return function limitYaw(params) {
      params.yaw = clamp(params.yaw, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the pitch angle.
   * @param {number} min the minimum pitch value
   * @param {number} max the maximum pitch value
   * @return {Function} view limiter
   */
  pitch: function(min, max) {
    return function limitPitch(params) {
      params.pitch = clamp(params.pitch, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the roll angle.
   * @param {number} min the minimum roll value
   * @param {number} max the maximum roll value
   * @return {Function} view limiter
   */
  roll: function(min, max) {
    return function limitRoll(params) {
      params.roll = clamp(params.roll, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the horizontal field of view.
   * @param {number} min the minimum horizontal field of view
   * @param {number} max the maximum horizontal field of view
   * @return {Function} view limiter
   */
  hfov: function(min, max) {
    return function limitHfov(params) {
      var width = params.width;
      var height = params.height;
      if (width > 0 && height > 0) {
        var vmin = convertFov.htov(min, width, height);
        var vmax = convertFov.htov(max, width, height);
        params.fov = clamp(params.fov, vmin, vmax);
      }
      return params;
    };
  },

  /**
   * Return a view limiter that constrains the vertical field of view.
   * @param {number} min the minimum vertical field of view
   * @param {number} max the maximum vertical field of view
   * @return {Function} view limiter
   */
  vfov: function(min, max) {
    return function limitVfov(params) {
      params.fov = clamp(params.fov, min, max);
      return params;
    };
  },

  /**
   * Return a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size the cube face width in pixels
   * @return {Function} view limiter
   */
  resolution: function(size) {
    return function limitResolution(params) {
      var height = params.height;
      if (height) {
        var requiredPixels = pixelRatio() * height;
        var minFov = 2 * Math.atan(requiredPixels / size);
        params.fov = clamp(params.fov, minFov, Infinity);
      }
      return params;
    };
  },

  /**
   * Return a view limiter that limits horizontal and vertical fov, prevents
   * zooming in past the image resolution, and limits the pitch range to
   * prevent the camera wrapping around at the poles. These are the most
   * common view restrictions for 360 panorama.
   * @param {number} maxResolution the cube face width in pixels
   * @param {number} maxVFov maximum vertical field of view
   * @param {number} [maxHFov=maxVFov] maximum horizontal field of view
   * @return {Function} view limiter
   */
  traditional: function(maxResolution, maxVFov, maxHFov) {
    maxHFov = maxHFov != null ? maxHFov : maxVFov;

    return compose(
      RectilinearView.limit.resolution(maxResolution),
      RectilinearView.limit.vfov(0, maxVFov),
      RectilinearView.limit.hfov(0, maxHFov),
      RectilinearView.limit.pitch(-Math.PI/2, Math.PI/2));
  }

};


RectilinearView.type = RectilinearView.prototype.type = 'rectilinear';


module.exports = RectilinearView;

},{"../util/clamp":87,"../util/compose":90,"../util/convertFov":91,"../util/decimal":92,"../util/mod":101,"../util/pixelRatio":104,"../util/real":106,"../util/rotateVector":108,"gl-matrix/src/gl-matrix/mat4":7,"gl-matrix/src/gl-matrix/vec4":11,"minimal-event-emitter":13}]},{},[57])(57)
});