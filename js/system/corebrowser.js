
WA.browser = function()
{
  var agent = navigator.userAgent.toUpperCase();
  WA.browser.isCompat = (document.compatMode == 'CSS1Compat');
  WA.browser.isOpera = agent.indexOf('OPERA') > -1;
  WA.browser.isChrome = agent.indexOf('CHROME') > -1;
  WA.browser.isFirefox = agent.indexOf('FIREFOX') > -1;
  WA.browser.isFirebug = (WA.isDefined(window.console) && WA.isDefined(window.console.firebug));
  WA.browser.isSafari = !WA.browser.isChrome && agent.indexOf('SAFARI') > -1;
  WA.browser.isSafari2 = WA.browser.isSafari && agent.indexOf('APPLEWEBKIT/4') > -1;
  WA.browser.isSafari3 = WA.browser.isSafari && agent.indexOf('VERSION/3') > -1;
  WA.browser.isSafari4 = WA.browser.isSafari && agent.indexOf('VERSION/4') > -1;
  WA.browser.isMSIE = !WA.browser.isOpera && agent.indexOf('MSIE') > -1;
  WA.browser.isMSIE7 = WA.browser.isMSIE && agent.indexOf('MSIE 7') > -1;
  WA.browser.isMSIE8 = WA.browser.isMSIE && agent.indexOf('MSIE 8') > -1;
  WA.browser.isMSIE9 = WA.browser.isMSIE && agent.indexOf('MSIE 9') > -1;
  WA.browser.isMSIE6 = WA.browser.isMSIE && !WA.browser.isMSIE7 && !WA.browser.isMSIE8 && !WA.browser.isMSIE9;
  WA.browser.isWebKit = agent.indexOf('WEBKIT') > -1;
  WA.browser.isGecko = !WA.browser.isWebKit && agent.indexOf('GECKO') > -1;
  WA.browser.isGecko2 = WA.browser.isGecko && agent.indexOf('RV:1.8') > -1;
  WA.browser.isGecko3 = WA.browser.isGecko && agent.indexOf('RV:1.9') > -1;
  WA.browser.isLinux = agent.indexOf('LINUX') > -1;
  WA.browser.isWindows = !!agent.match(/WINDOWS|WIN32/);
  WA.browser.isMac = !!agent.match(/MACINTOSH|MAC OS X/);
  WA.browser.isAir = agent.indexOf('ADOBEAIR') > -1;
  WA.browser.isDom = document.getElementById && document.childNodes && document.createElement;
  WA.browser.isBoxModel = WA.browser.isMSIE && !WA.browser.isCompat;
  WA.browser.isSecure = (window.location.href.toUpperCase().indexOf('HTTPS') == 0);
  // DO WE NEED isFlash and isJava ?

  WA.browser.normalizedMouseButton = WA.browser.isMSIE ? {1:0, 2:2, 4:1} : (WA.browser.isSafari2 ? {1:0, 2:1, 3:2} : {0:0, 1:1, 2:2});

  // remove css image flicker
  if (WA.browser.isMSIE6)
    try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
}

// ===================================
  // METRICS FUNCTIONS

  // get the size of the document. The document is the full usable html area
WA.browser.getDocumentWidth = function()
{
  if (WA.browser.isMSIE6)
    return document.body.scrollWidth;
  return document.documentElement.scrollWidth;
}

WA.browser.getDocumentHeight = function()
{
  if (WA.browser.isMSIE6)
    return document.body.scrollHeight;
  return document.documentElement.scrollHeight;
}

  // get the size of the window. The window is the browser visible area
WA.browser.getWindowWidth = function()
{
  if (!WA.browser.isMSIE)
    return window.innerWidth;

  if (document.documentElement && document.documentElement.clientWidth)
    return document.documentElement.clientWidth;

  if (document.body && document.body.clientWidth)
    return document.body.clientWidth;

  return 0;
}

WA.browser.getWindowHeight = function()
{
  if (!WA.browser.isMSIE)
    return window.innerHeight;

  if( document.documentElement && document.documentElement.clientHeight)
    return document.documentElement.clientHeight;

  if( document.body && document.body.clientHeight)
    return document.body.clientHeight;

  return 0;
}

  // get the size of the OS/screen
WA.browser.getScreenWidth = function()
{
  return screen.width;
}

WA.browser.getScreenHeight = function()
{
  return screen.height;
}

  // get the scroll of the window if the document is bigger than the window
WA.browser.getScrollLeft = function()
{
  if (WA.browser.isDom) // && (WA.browser.isMSIE7Sup || !WA.browser.isMSIE))
    return document.documentElement.scrollLeft;

  // ie6 and before
  if (document.body && document.body.scrollLeft)
    return document.body.scrollLeft;

  // others without dom
  if (typeof window.pageXOffset == 'number')
    return window.pageXOffset;

  return 0;
}

WA.browser.getScrollTop = function()
{
  // others without dom
  if (typeof window.pageYOffset == 'number')
    return window.pageYOffset;

  if (typeof window.scrollY == 'number')
    return window.scrollY;

  // should be supported by all browsers
  if (document.body && document.body.scrollTop)
    return document.body.scrollTop;

  // ie6 and before use BAD the documentelement on dom!
  if (WA.browser.isDom) // && (WA.browser.isMSIE7 || !WA.browser.isMSIE))
    return document.body.scrollTop;

  // ie6 and before


  return 0;
}

// get the maximum scroll available
WA.browser.getScrollWidth = function()
{
  return WA.browser.getDocumentWidth();
}

WA.browser.getScrollHeight = function()
{
  return WA.browser.getDocumentHeight();
}

  // get the left of a DOM element into the document
WA.browser.getNodeDocumentLeft = function(node)
{
  var l = node.offsetLeft;
  if (node.offsetParent != null)
    l += WA.browser.getNodeDocumentLeft(node.offsetParent) + WA.browser.getNodeBorderLeftWidth(node.offsetParent) + WA.browser.getNodeMarginLeftWidth(node.offsetParent);
  return l;
}

  // get the top of a DOM element into the document
WA.browser.getNodeDocumentTop = function(node)
{
  var t = node.offsetTop;
  if (node.offsetParent != null)
    t += WA.browser.getNodeDocumentTop(node.offsetParent) + WA.browser.getNodeBorderTopHeight(node.offsetParent) + WA.browser.getNodeMarginTopHeight(node.offsetParent);
  return t;
}

  // get the left of a DOM element into the referenced node. If referenced node is NOT into the fathers, then it will give the left in the document
WA.browser.getNodeNodeLeft = function(node, refnode)
{
  if (!node)
    return null;
  var l = node.offsetLeft;
  if (node.offsetParent != null && node.offsetParent != refnode)
    l += WA.browser.getNodeBorderLeftWidth(node.offsetParent) + WA.browser.getNodeNodeLeft(node.offsetParent, refnode);
  return l;
}

  // get the top of a DOM element into the referenced node. If referenced node is NOT into the fathers, then it will give the top in the document
WA.browser.getNodeNodeTop = function(node, refnode)
{
  if (!node)
    return null;
  var t = node.offsetTop;
  if (node.offsetParent != null && node.offsetParent != refnode)
    t += WA.browser.getNodeBorderTopHeight(node.offsetParent) + WA.browser.getNodeNodeTop(node.offsetParent, refnode);
  return t;
}

  // get the scroll of the node if the content is bigger than the node
WA.browser.getNodeScrollLeft = function(node)
{
  if (WA.browser.isDom) // && (WA.browser.isMSIE7 || !WA.browser.isMSIE))
    return node.scrollLeft;

  // others without dom
  if (typeof node.pageXOffset == 'number')
    return node.pageXOffset;

  return 0;
}

WA.browser.getNodeScrollTop = function(node)
{
  if (WA.browser.isDom) // && (WA.browser.isMSIE7 || !WA.browser.isMSIE))
    return node.scrollTop;

  // others without dom
  if (typeof node.pageYOffset == 'number')
    return node.pageYOffset;

  return 0;
}

WA.browser.getNodeTotalScrollTop = function(node)
{
  var t = WA.browser.getNodeScrollTop(node);
  if (node.offsetParent != null)
    t += WA.browser.getNodeTotalScrollTop(node.offsetParent);
  return t;
}

// get the maximum scroll available
WA.browser.getNodeScrollWidth = function(node)
{
  return WA.browser.getDocumentWidth();
}

WA.browser.getNodeScrollHeight = function(node)
{
  return WA.browser.getDocumentHeight();
}

/*
  About size and functions to get sizes:

     | margin | border | padding | content | padding | border | margin |
     |-------- extrawidth -------|- width -|
     |- externalwidth -|-------- innerwidth ---------|
              |----------------- offsetwidth -----------------|
     |--------------------------- outerwidth --------------------------|

  The external is the sum of left and right external
  The extra is the sum of left and right extra

  Same applies with height
*/

WA.browser.getNodeMarginLeftWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.marginLeft, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('margin-left')) || 0;
}

WA.browser.getNodeMarginRightWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.marginRight, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('margin-right')) || 0;
}

WA.browser.getNodeMarginWidth = function(node)
{
  return WA.browser.getNodeMarginLeftWidth(node) + WA.browser.getNodeMarginRightWidth(node);
}

WA.browser.getNodeMarginTopHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.marginTop, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('margin-top')) || 0;
}

WA.browser.getNodeMarginBottomHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.marginBottom, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('margin-bottom')) || 0;
}

WA.browser.getNodeMarginHeight = function(node)
{
  return WA.browser.getNodeMarginTopHeight(node) + WA.browser.getNodeMarginBottomHeight(node);
}

WA.browser.getNodeBorderLeftWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.borderLeftWidth, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('border-left-width')) || 0;
}

WA.browser.getNodeBorderRightWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.borderRightWidth, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('border-right-width')) || 0;
}

WA.browser.getNodeBorderWidth = function(node)
{
  return WA.browser.getNodeBorderLeftWidth(node) + WA.browser.getNodeBorderRightWidth(node);
}

WA.browser.getNodeBorderTopHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.borderTopWidth, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('border-top-width')) || 0;
}

WA.browser.getNodeBorderBottomHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.borderBottomWidth, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('border-bottom-width')) || 0;
}

WA.browser.getNodeBorderHeight = function(node)
{
  return WA.browser.getNodeBorderTopHeight(node) + WA.browser.getNodeBorderBottomHeight(node);
}

WA.browser.getNodePaddingLeftWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.paddingLeft, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('padding-left')) || 0;
}

WA.browser.getNodePaddingRightWidth = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.paddingRight, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('padding-right')) || 0;
}

WA.browser.getNodePaddingWidth = function(node)
{
  return WA.browser.getNodePaddingLeftWidth(node) + WA.browser.getNodePaddingRightWidth(node);
}

WA.browser.getNodePaddingTopHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.paddingTop, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('padding-top')) || 0;
}

WA.browser.getNodePaddingBottomHeight = function(node)
{
  return WA.browser.isMSIE?parseInt(node.currentStyle.paddingBottom, 10) || 0:parseInt(window.getComputedStyle(node, null).getPropertyValue('padding-bottom')) || 0;
}

WA.browser.getNodePaddingHeight = function(node)
{
  return WA.browser.getNodePaddingTopHeight(node) + WA.browser.getNodePaddingBottomHeight(node);
}

WA.browser.getNodeExternalLeftWidth = function(node)
{
  return WA.browser.getNodeMarginLeftWidth(node) + WA.browser.getNodeBorderLeftWidth(node);
}

WA.browser.getNodeExternalRightWidth = function(node)
{
  return WA.browser.getNodeMarginRightWidth(node) + WA.browser.getNodeBorderRightWidth(node);
}

WA.browser.getNodeExternalWidth = function(node)
{
  return WA.browser.getNodeExternalLeftWidth(node) + WA.browser.getNodeExternalRightWidth(node);
}

WA.browser.getNodeExternalTopHeight = function(node)
{
  return WA.browser.getNodeMarginTopHeight(node) + WA.browser.getNodeBorderTopHeight(node);
}

WA.browser.getNodeExternalBottomHeight = function(node)
{
  return WA.browser.getNodeMarginBottomHeight(node) + WA.browser.getNodeBorderBottomHeight(node);
}

WA.browser.getNodeExternalHeight = function(node)
{
  return WA.browser.getNodeExternalTopHeight(node) + WA.browser.getNodeExternalBottomHeight(node);
}

WA.browser.getNodeExtraLeftWidth = function(node)
{
  return WA.browser.getNodeMarginLeftWidth(node) + WA.browser.getNodeBorderLeftWidth(node) + WA.browser.getNodePaddingLeftWidth(node);
}

WA.browser.getNodeExtraRightWidth = function(node)
{
  return WA.browser.getNodeMarginRightWidth(node) + WA.browser.getNodeBorderRightWidth(node) + WA.browser.getNodePaddingRightWidth(node);
}

WA.browser.getNodeExtraWidth = function(node)
{
  return WA.browser.getNodeExtraLeftWidth(node) + WA.browser.getNodeExtraRightWidth(node);
}

WA.browser.getNodeExtraTopHeight = function(node)
{
  return WA.browser.getNodeMarginTopHeight(node) + WA.browser.getNodeBorderTopHeight(node) + WA.browser.getNodePaddingTopHeight(node);
}

WA.browser.getNodeExtraBottomHeight = function(node)
{
  return WA.browser.getNodeMarginBottomHeight(node) + WA.browser.getNodeBorderBottomHeight(node) + WA.browser.getNodePaddingBottomHeight(node);
}

WA.browser.getNodeExtraHeight = function(node)
{
  return WA.browser.getNodeExtraTopHeight(node) + WA.browser.getNodeExtraBottomHeight(node);
}

  // get the real size of a DOM element
WA.browser.getNodeWidth = function(node)
{
  return WA.browser.getNodeOffsetWidth(node) - WA.browser.getNodePaddingWidth(node) - WA.browser.getNodeBorderWidth(node);
}

WA.browser.getNodeHeight = function(node)
{
  return WA.browser.getNodeOffsetHeight(node) - WA.browser.getNodePaddingHeight(node) - WA.browser.getNodeBorderHeight(node);
}

WA.browser.getNodeInnerWidth = function(node)
{
  return WA.browser.getNodeOffsetWidth(node) - WA.browser.getNodeBorderWidth(node);
}

WA.browser.getNodeInnerHeight = function(node)
{
  return WA.browser.getNodeOffsetHeight(node) - WA.browser.getNodeBorderHeight(node);
}

WA.browser.getNodeOffsetWidth = function(node)
{
  return parseInt(node.offsetWidth, 10) || 0;
}

WA.browser.getNodeOffsetHeight = function(node)
{
  return parseInt(node.offsetHeight, 10) || 0;
}

WA.browser.getNodeOuterWidth = function(node)
{
  return WA.browser.getNodeOffsetWidth(node) + WA.browser.getNodeMarginWidth(node);
}

WA.browser.getNodeOuterHeight = function(node)
{
  return WA.browser.getNodeOffsetHeight(node) + WA.browser.getNodeMarginHeight(node);
}

// ===================================
// MOUSE FUNCTIONS

/*
  The mouse is not standard on all navigators.
  ie and safari does not map same clicks keys (left, center, right), we need corresponding table

  NOTE Than both mouse and keyboard events are mixed in the same event
*/

  // getCursorNode will return the DOM node in which the event happened
WA.browser.getCursorNode = function(e)
{
  var ev = e || window.event;
  if (ev.target) return ev.target;
  if (ev.srcElement) return ev.srcElement;
  return null;
}

  // returns the absolute position of the event in the document
WA.browser.getCursorDocumentX = function(e)
{
  var ev = e || window.event;
  return ev.pageX - (document.documentElement.clientLeft || 0);  // MSIE 7 has a weird 2 pixels offset for mouse coords !
}

  // returns the absolute position of the event in the document
WA.browser.getCursorDocumentY = function(e)
{
  var ev = e || window.event;
  return ev.pageY - (document.documentElement.clientTop || 0);  // MSIE 7 has a weird 2 pixels offset for mouse coords !
}

  // returns the absolute position of the event in the document
WA.browser.getTouchDocumentX = function(e)
{
  var ev = e || window.event;
  var touchobj = event.changedTouches[0];
  return touchobj.pageX;
}

  // returns the absolute position of the event in the document
WA.browser.getTouchDocumentY = function(e)
{
  var ev = e || window.event;
  var touchobj = event.changedTouches[0];
  return touchobj.pageY;
}

  // returns the absolute position of the event in the browserwindow
WA.browser.getCursorWindowX = function(e)
{
  var ev = e || window.event;
  return ev.clientX - (document.documentElement.clientLeft || 0);  // MSIE 7 has a weird 2 pixels offset for mouse coords !;
}

  // returns the absolute position of the event in the browserwindow
WA.browser.getCursorWindowY = function(e)
{
  var ev = e || window.event;
  return ev.clientY - (document.documentElement.clientLeft || 0);  // MSIE 7 has a weird 2 pixels offset for mouse coords !;
}

  // returns the absolute position of the event in the container based on the OFFSET metrix (i.e. with border included)
  // IF the function does not work on FIREFOX: DO NOT MODIFY the code,
  //     but add a position: relative to the container !
  // (note: FF and Safari, gets natural origin with border, IE and opera, without border :S)
WA.browser.getCursorOffsetX = function(e)
{
  var offset = 0;
  if (WA.browser.isMSIE || WA.browser.isOpera)
    offset = WA.browser.getNodeBorderLeftWidth(WA.browser.getCursorNode(e));

  var ev = e || window.event;
  if(typeof(ev.layerX) == 'number')
    return ev.layerX + offset;
  if(typeof(ev.offsetX) == 'number')
    return ev.offsetX + offset;
  return 0;
}

// returns the absolute position of the event in the container based on the OFFSET metrix (i.e. with border included)
// IF the function does not work on FIREFOX: DO NOT MODIFY the code,
//     but add a position: relative to the container !
WA.browser.getCursorOffsetY = function(e)
{
  var offset = 0;
  if (WA.browser.isMSIE || WA.browser.isOpera)
    offset = WA.browser.getNodeBorderTopHeight(WA.browser.getCursorNode(e));

  var ev = e || window.event;
  if(typeof(ev.layerY) == 'number')
    return ev.layerY + offset;
  if(typeof(ev.offsetY) == 'number')
    return ev.offsetY + offset;
  return 0;
}

// returns the absolute position of the event in the container based on the INNER metrix (i.e. without border included)
// IF the function does not work on FIREFOX: DO NOT MODIFY the code,
//     but add a position: relative to the container !
WA.browser.getCursorInnerX = function(e)
{
  var offset = 0;
  if (!WA.browser.isMSIE && !WA.browser.isOpera)
    offset = WA.browser.getNodeBorderLeftWidth(WA.browser.getCursorNode(e));

  var ev = e || window.event;
  if(typeof(ev.layerX) == 'number')
    return ev.layerX - offset;
  if(typeof(ev.offsetX) == 'number')
    return ev.offsetX - offset;
  return 0;
}

// returns the absolute position of the event in the container based on the INNER metrix (i.e. without border included)
// IF the function does not work on FIREFOX: DO NOT MODIFY the code,
//     but add a position: relative to the container !
WA.browser.getCursorInnerY = function(e)
{
  var offset = 0;
  if (!WA.browser.isMSIE && !WA.browser.isOpera)
    offset = WA.browser.getNodeBorderTopHeight(WA.browser.getCursorNode(e));

  var ev = e || window.event;
  if(typeof(ev.layerY) == 'number')
    return ev.layerY - offset;
  if(typeof(ev.offsetY) == 'number')
    return ev.offsetY - offset;
  return 0;
}

// click functions
WA.browser.getButtonClick = function(e)
{
  var ev = e || window.event;
  if (ev.type != 'click' && ev.type != 'dblclick')
    return false;
  var button = ev.button ? WA.browser.normalizedMouseButton[ev.button] : (ev.which ? ev.which-1 : 0);
  return button;
}

// click functions
WA.browser.getButtonPressed = function(e)
{
  var ev = e || window.event;
  if (ev.type != 'mousedown' && ev.type != 'mouseup')
    return false;
  var button = ev.button ? WA.browser.normalizedMouseButton[ev.button] : (ev.which ? ev.which-1 : false);
  return button;
}

WA.browser.getWheel = function(e)
{
  var ev = e || window.event;
  if (ev.type != 'DOMMouseScroll' && ev.type != 'mousewheel')
    return false;
  var delta = 0;
  if(ev.wheelDelta)
  {
    delta = ev.wheelDelta / 120;
  }
  else if (ev.detail)
  {
    delta = -ev.detail / 3;
  }
  return delta;
}

WA.browser.cancelEvent = function(e)
{
  var ev = e || window.event;
  if (!ev)
    return false;
  if (ev.stopPropagation)
    ev.stopPropagation();
  if (ev.preventDefault)
    ev.preventDefault();
  if (ev.stopEvent)
    ev.stopEvent();
  if (WA.browser.isMSIE) window.event.keyCode = 0;
  ev.cancel = true;
  ev.cancelBubble = true;
  ev.returnValue = false;
  return false;
}

// ===================================
// KEYBOARD FUNCTIONS

/*
  The keyboard is not standard on all navigators.
  known properties: shift, control, alt, keycode, charcode, navigation key
  navigation keys are: arrows, page up/down, insert, home, end, enter, tab escape

  NOTE Than both mouse and keyboard events are mixed in the same event
*/

// key functions
WA.browser.getKey = function(e)
{
  var ev = e || window.event;
  if (ev.type != 'keydown' && ev.type != 'keyup')
    return false;
  return ev.keyCode || ev.which;
}

WA.browser.getChar = function(e)
{
  var ev = e || window.event;
  if (ev.type != 'keypress')
    return false;
  return String.fromCharCode(ev.charCode ? ev.charCode : ev.keyCode);
}

WA.browser.ifShift = function(e)
{
  var ev = e || window.event;
  return ev.shiftKey;
}

WA.browser.ifCtrl = function(e)
{
  var ev = e || window.event;
  return ev.ctrlKey || ev.metaKey;
}

WA.browser.ifAlt = function(e)
{
  var ev = e || window.event;
  return ev.altKey;
}

  // any shift, control, alt
WA.browser.ifModifier = function(e)
{
  var ev = e || window.event;
  return (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) ? true : false;
}

  // any navigation keys: arrows, page up/down, home/end, escape, enter, tab
WA.browser.ifNavigation = function(e)
{
  var c = WA.browser.getKey(e);
  return ((c >= 33 && c <= 40) || c == 9 || c == 13 || c == 27) ? true : false;
}

  // f1 to f12
WA.browser.ifFunction = function(e)
{
  var c = WA.browser.getKey(e);
  return (c >= 112 && c <= 123) ? true : false;
}

// ===================================
// SELECTION FUNCTIONS

// select something in the document
WA.browser.getSelectionRange = function(node, selectionStart, selectionEnd)
{
  if (node.setSelectionRange)
  {
    node.focus();
    node.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (node.createTextRange)
  {
    var range = node.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

// ===================================
// FILL FUNCTIONS

// fill an innerHTML
WA.browser.setInnerHTML = function(node, content)
{
  if (WA.browser.isGecko)
  {
    var rng = document.createRange();
    rng.setStartBefore(node);
    var htmlFrag = rng.createContextualFragment(content);
    while (node.hasChildNodes())
      node.removeChild(node.lastChild);
    node.appendChild(htmlFrag);
  }
  else
  {
    node.innerHTML = content;
  }
}

WA.browser();
