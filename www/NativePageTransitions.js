cordova.define("com.telerik.plugins.nativepagetransitions.NativePageTransitions", function(require, exports, module) { function NativePageTransitions() {
}

NativePageTransitions.prototype.globalOptions = {
  duration: 400,
  iosdelay: 60,
  androiddelay: 70,
  winphonedelay: 200,
  slowdownfactor: 4,
  fixedPixelsTop: 0,    // currently for slide left/right only
  fixedPixelsBottom: 0  // currently for slide left/right only
};

function doCordovaCommand(commandName, options, onSuccess) {
  cordova.exec(onSuccess, onError, "NativePageTransitions", commandName, [options]);
}

// The error can only be one of a couple of messages which are all unrecoverable, so just log them.
function onError(msg) {
  console.warn("[NativePageTransitions]", msg);
}

NativePageTransitions.prototype.slide = function (options, onScreenshotComplete) {
  var opts = options || {};
  if (!this._validateHref(opts.href, onError)) return;

  opts.direction = opts.direction || "left";               
  opts.duration = opts.duration || this.globalOptions.duration;

  // The problem of "delay" on iOS is solved via onScreenshotComplete callback
  opts.androiddelay = opts.androiddelay || this.globalOptions.androiddelay;
  opts.winphonedelay = opts.winphonedelay || this.globalOptions.winphonedelay;

  // setting slowdownfactor > 1 makes the next page slide less pixels. Use 1 for side-by-side.
  opts.slowdownfactor = opts.slowdownfactor || this.globalOptions.slowdownfactor;
  
  // These options could reasonably be 0, but the default is 0 anyway
  opts.fixedPixelsTop = opts.fixedPixelsTop || this.globalOptions.fixedPixelsTop;
  opts.fixedPixelsBottom = opts.fixedPixelsBottom || this.globalOptions.fixedPixelsBottom;

  doCordovaCommand('prepareForAnimation', opts, function internalOnScreenshotCompleteHandler () {

    // From your onScreenshotComplete function, call animate() to finish:
    function animate(onAnimationComplete) {
      // animate() can also be passed a callback function:
      doCordovaCommand('slide', opts, onAnimationComplete);
    };

    onScreenshotComplete.call(onScreenshotComplete, animate);

  });
};

//NativePageTransitions.prototype.slide = function (options, onSuccess, onError) {
//  var opts = options || {};
//  if (!this._validateHref(opts.href, onError)) {
//    return;
//  }
//  opts.direction = opts.direction || "left";
//  if (opts.duration == undefined || opts.duration == "null") {
//    opts.duration = this.globalOptions.duration;
//  }
//  if (opts.androiddelay == undefined || opts.androiddelay == "null") {
//    opts.androiddelay = this.globalOptions.androiddelay;
//  }
//  if (opts.iosdelay == undefined || opts.iosdelay == "null") {
//    opts.iosdelay = this.globalOptions.iosdelay;
//  }
//  if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
//    opts.winphonedelay = this.globalOptions.winphonedelay;
//  }
//  if (opts.fixedPixelsTop == undefined || opts.fixedPixelsTop == "null") {
//    opts.fixedPixelsTop = this.globalOptions.fixedPixelsTop;
//  }
//  if (opts.fixedPixelsBottom == undefined || opts.fixedPixelsBottom == "null") {
//    opts.fixedPixelsBottom = this.globalOptions.fixedPixelsBottom;
//  }
//  // setting slowdownfactor > 1 makes the next page slide less pixels. Use 1 for side-by-side.
//  opts.slowdownfactor = opts.slowdownfactor || this.globalOptions.slowdownfactor;
//  cordova.exec(onSuccess, onError, "NativePageTransitions", "slide", [opts]);
//};

NativePageTransitions.prototype.drawer = function (options, onSuccess, onError) {
  var opts = options || {};
  if (!this._validateHref(opts.href, onError)) {
    return;
  }
  opts.origin = opts.origin || "left";
  opts.action = opts.action || "open";
  if (opts.duration == undefined || opts.duration == "null") {
    opts.duration = this.globalOptions.duration;
  }
  if (opts.androiddelay == undefined || opts.androiddelay == "null") {
    opts.androiddelay = this.globalOptions.androiddelay;
  }
  if (opts.iosdelay == undefined || opts.iosdelay == "null") {
    opts.iosdelay = this.globalOptions.iosdelay;
  }
  if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
    opts.winphonedelay = this.globalOptions.winphonedelay;
  }
  cordova.exec(onSuccess, onError, "NativePageTransitions", "drawer", [opts]);
};

NativePageTransitions.prototype.flip = function (options, onSuccess, onError) {
  var opts = options || {};
  if (!this._validateHref(opts.href, onError)) {
    return;
  }
  opts.direction = opts.direction || "right";
  if (opts.duration == undefined || opts.duration == "null") {
    opts.duration = this.globalOptions.duration;
  }
  if (opts.androiddelay == undefined || opts.androiddelay == "null") {
    opts.androiddelay = this.globalOptions.androiddelay;
  }
  if (opts.iosdelay == undefined || opts.iosdelay == "null") {
    opts.iosdelay = this.globalOptions.iosdelay;
  }
  if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
    opts.winphonedelay = this.globalOptions.winphonedelay;
  }
  cordova.exec(onSuccess, onError, "NativePageTransitions", "flip", [opts]);
};

NativePageTransitions.prototype.curl = function (options, onSuccess, onError) {
  var opts = options || {};
  if (!this._validateHref(opts.href, onError)) {
    return;
  }
  opts.direction = opts.direction || "up";
  if (opts.duration == undefined || opts.duration == "null") {
    opts.duration = this.globalOptions.duration;
  }
  if (opts.iosdelay == undefined || opts.iosdelay == "null") {
    opts.iosdelay = this.globalOptions.iosdelay;
  }
  cordova.exec(onSuccess, onError, "NativePageTransitions", "curl", [opts]);
};

NativePageTransitions.prototype.fade = function (options, onSuccess, onError) {
  var opts = options || {};
  if (!this._validateHref(opts.href, onError)) {
    return;
  }
  if (opts.duration == undefined || opts.duration == "null") {
    opts.duration = this.globalOptions.duration;
  }
  if (opts.androiddelay == undefined || opts.androiddelay == "null") {
    opts.androiddelay = this.globalOptions.androiddelay;
  }
  if (opts.iosdelay == undefined || opts.iosdelay == "null") {
    opts.iosdelay = this.globalOptions.iosdelay;
  }
  cordova.exec(onSuccess, onError, "NativePageTransitions", "fade", [opts]);
};

NativePageTransitions.prototype._validateHref = function (href, errCallback) {
  // if not contains www/ : dan zit je in een companion app..
  var hrf = window.location.href;
  var currentHref;
  if (hrf.indexOf('www/') == -1) {
    // console.log('Probably running inside a companion app, your app may crash if your html file is not in the root!');
    // hrf is something like file:///data/.../index.html
    currentHref = hrf.substr(hrf.lastIndexOf('/')+1);
  } else {
    currentHref = hrf.substr(hrf.indexOf('www/')+4);
  }
  // if no href was passed the transition should always kick in
  if (href) {
    // if only hash nav, do it in JS for Android
    // (I'm a little reluctant to depend on 'device' only for this: device.platform == "Android")
    if (href.indexOf('#') == 0 && navigator.userAgent.indexOf("Android") > -1) {
      // starts with a #, so check if the current one has a hash with the same value
      if (currentHref.indexOf('#') > -1) {
        var file = currentHref.substr(0, currentHref.indexOf('#'));
        if (hrf.indexOf('www/') == -1) {
          var to = hrf.substr(0, hrf.lastIndexOf('/')+1);
          window.location.href = to+file+href;
        } else {
          window.location.href = "/android_asset/www/"+file+ href;
        }
      } else {
        // the current page has no #, so simply attach the href to current url
        window.location = hrf += href;
      }
    }
  }
  if (currentHref == href) {
    if (errCallback) {
      errCallback("The passed href is the same as the current");
    } else {
      console.log("The passed href is the same as the current");
    }
    return false;
  }
  return true;
};

NativePageTransitions.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.nativepagetransitions = new NativePageTransitions();
  return window.plugins.nativepagetransitions;
};

cordova.addConstructor(NativePageTransitions.install);
});
