
/*
    core.js, WAJAF, the WebAbility(r) Javascript Application Framework
    Contains multi purpose functions, browser and WA objects
    (c) 2008-2010 Philippe Thomassigny

    This file is part of WAJAF

    WAJAF is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WAJAF is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WAJAF.  If not, see <http://www.gnu.org/licenses/>.
*/

// --------------------------------------------------------------------------------------------------------
// WA is the main WAJAF Object that will contain anything else (except for the native JS object prototypes)
// --------------------------------------------------------------------------------------------------------
var WA = { version: '0.1.1',
           running: false };

// Main WAJAF Object definition

// --------------------------------------------------------------------------------------------------------
// ZIndex main index sequence
// --------------------------------------------------------------------------------------------------------
WA.zIndex = 1;
WA.getNextZIndex = function()
{
  return WA.zIndex++;
}

// --------------------------------------------------------------------------------------------------------
// == is* functions
// --------------------------------------------------------------------------------------------------------
WA.isDefined = function(val)
{
  return val !== undefined;
}

WA.sizeof = function(obj, strict)
{
  var c = 0;
  for (var i in obj)
    if (!WA.isFunction(obj[i]) && ((obj.hasOwnProperty(i) && strict) || !strict) ) c++;  // we count anything except functions
  return c;
}

WA.isEmpty = function(val, blank)
{
  return val === undefined || val === null || (WA.isArray(val) && !val.length) || (WA.isObject(val) && WA.sizeof(val) == 0) || (!blank ? val === '' : false);
}

WA.isBool = function(val)
{
  return typeof val === 'boolean';
}

WA.isNumber = function(val)
{
  return typeof val === 'number' && isFinite(val);
}

WA.isString = function(val)
{
  return typeof val === 'string' || Object.prototype.toString.apply(val) === '[object String]';
}

WA.isArray = function(val)
{
  return Object.prototype.toString.apply(val) === '[object Array]';
}

WA.isObject = function(val)
{
  return typeof val == 'object';
}

WA.isFunction = function(val)
{
  return Object.prototype.toString.apply(val) === '[object Function]';
}

WA.isDate = function(val)
{
  return Object.prototype.toString.apply(val) === '[object Date]';
}

WA.isDOM = function(o)
{
  // be carefull: window is NOT a Node !
  return (o === window || (typeof Node === 'object' ? o instanceof Node : o !== null && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string' ));
}

// --------------------------------------------------------------------------------------------------------
// Objects & Nodes functions
// --------------------------------------------------------------------------------------------------------
WA.extend = function(collector, source)
{
  var f = function() {};
  f.prototype = source.prototype;
  collector.prototype = new f();
  collector.prototype.constructor = collector;
  collector.sourceconstructor = source;
  collector.source = source.prototype;
  return collector;
}

WA.clone = function(obj, fast)
{
  // do better and faster pls if fast
  if (fast)
    return JSON.parse(JSON.stringify(obj));

  if (obj == undefined)
    return undefined;
  if (obj == null)
    return null;
  var cloned;
  if (WA.isArray(obj))
  {
    cloned = [];
    for (var i = 0, l = obj.length; i < l; i++)
    {
      cloned.push(WA.clone(obj[i]));
    }
  }
  else if (WA.isObject(obj))
  {
    cloned = {};
    for (var i in obj)
    {
      if (!obj.hasOwnProperty(i))
        continue;
      if (WA.isObject(obj[i]))
        cloned[i] = WA.clone(obj[i]);
      else
        cloned[i] = obj[i];
    }
  }
  else
    cloned = obj;
  return cloned;
}

// Will create a dom Node of specified type, and apply classname if defined
WA.createDomNode = function(type, id, classname)
{
  var domnode = document.createElement(type);
  if (id)
    domnode.id = id;
  if (classname !== null && classname != undefined)
    domnode.className = classname;
  return domnode;
}

WA.getDomNode = function(domID)
{
  if (arguments.length > 1)
  {
    var elements = [];
    for (var i = 0, l = arguments.length; i < l; i++)
      elements.push(WA.toDOM(arguments[i]));
    return elements;
  }
  if (WA.isString(domID))
    return document.getElementById(domID);
  return null;
}

WA.toDOM = function(n)
{
  if (WA.isDOM(n))
    return n;
  else if (WA.isString(n))
    return WA.getDomNode(n);
  return null;
}

// Main GET and operation object
WA.get = function(n)
{
  var self = this;
  var _nodes = [];
  // if multi is a string => search for NODE ID, or NODE CLASS or NODE ?
  if (WA.isString(n))
  {
    switch(n[0])
    {
      case '#': _nodes = [WA.getDomNode(n.substr(1))]; break;
      case '.':
        if (document.getElementsByClassName)
          _nodes = document.getElementsByClassName(n.substr(1));
        else
        {
          theclass = new RegExp('\\b'+n.substr(1)+'\\b');
          allnodes = this.getElementsByTagName('*');
          for (var i = 0, l = allnodes.length; i < l; i++)
            if (theclass.test(allnodes[i].className)) _nodes.push(allnodes[i]);
        }
        break;
      case '!': _nodes = Array.prototype.slice.call(document.getElementsByName(n.substr(1))); break;
      // anything else (start with a letter ?)
      default: _nodes = Array.prototype.slice.call(document.getElementsByTagName(n)); break;
    }
  }
  else if (WA.isDOM(n))
    _nodes = [n];

  // fast access to the first
  this.node = function () { return _nodes[0]; }

  // fast access to the nodes
  this.nodes = function() { return _nodes; }

  // content of the nodes
  this.text = function(t)
  {
    t = t.replace(/\&/g,"&amp;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    for (var i = 0, l = _nodes.length; i < l; i++) _nodes[i].innerHTML = t; return self;
  }
  this.html = function(t) { for (var i = 0, l = _nodes.length; i < l; i++) _nodes[i].innerHTML = t; return self; }
  this.append = function(t) { for (var i = 0, l = _nodes.length; i < l; i++) _nodes[i].innerHTML += t; return self; }

  // generic css
  this.css = function(p, v)
  {
    if (v === undefined)
      return _nodes[0]?_nodes[0].style[p]:undefined;
    for (var i = 0, l = _nodes.length; i < l; i++)
      _nodes[i].style[p] = v;
    return self;
  }

  // some most common CSS
  this.CSSwidth = function(v) { return self.css('width', v); }
  this.CSSheight = function(v) { return self.css('height', v); }
  this.CSSleft = function(v) { return self.css('left', v); }
  this.CSStop = function(v) { return self.css('top', v); }
  this.CSSmargin = function(v) { return self.css('margin', v); }
  this.CSSpadding = function(v) { return self.css('padding', v); }
  this.CSSborder = function(v) { return self.css('border', v); }
  this.CSScolor = function(v) { return self.css('color', v); }
  this.CSSbgcolor = function(v) { return self.css('backgroundColor', v); }
  this.CSSbg = function(v) { return self.css('background', v); }
  this.CSSfont = function(v) { return self.css('font', v); }
  this.CSSdisplay = function(v) { return self.css('display', v); }
  this.CSSopacity = function(v) { self.css('opacity', v/100); return self.css('filter', 'alpha(opacity: '+v+')'); }

  // some metrics
  this.width = function(v) { if (v === undefined) return _nodes[0]?WA.browser.getNodeWidth(_nodes[0]):null; else return self.css('width', WA.isNumber(v)?v+'px':v); }
  this.height = function(v) { if (v === undefined) return _nodes[0]?WA.browser.getNodeHeight(_nodes[0]):null; else return self.css('height', WA.isNumber(v)?v+'px':v); }
  this.left = function(v, n) { if (v === undefined) return _nodes[0]?(n===undefined?WA.browser.getNodeDocumentLeft(_nodes[0]):WA.browser.getNodeNodeLeft(_nodes[0], n)):null; else return self.css('left', WA.isNumber(v)?v+'px':v); }
  this.top = function(v, n) { if (v === undefined) return _nodes[0]?(n===undefined?WA.browser.getNodeDocumentTop(_nodes[0]):WA.browser.getNodeNodeTop(_nodes[0], n)):null; else return self.css('top', WA.isNumber(v)?v+'px':v); }

  // generic animation
  this.anim = function(s, f) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.createSprite(_nodes[i], s, f); return self; }

  // some basic animations
  this.fadeIn = function(s, f) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.fadeIn(_nodes[i], s, f); return self; }
  this.fadeOut = function(s, f) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.fadeOut(_nodes[i], s, f); return self; }
  this.openV = function(s, f, h) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.openV(_nodes[i], s, h, f); return self; }
  this.closeV = function(s, f, h) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.closeV(_nodes[i], s, h, f); return self; }
  this.openH = function(s, f, w) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.openH(_nodes[i], s, w, f); return self; }
  this.closeH = function(s, f, w) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.closeH(_nodes[i], s, w, f); return self; }
  this.open = function(s, f, w, h) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.open(_nodes[i], s, w, h, f); return self; }
  this.close = function(s, f, w, h) { if (!WA.Managers.anim) return null; for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.anim.close(_nodes[i], s, w, h, f); return self; }
  this.move = function(s, x, y, f, l, t) { if (!WA.Managers.anim) return null; for (var i = 0, lx = _nodes.length; i < lx; i++) WA.Managers.anim.move(_nodes[i], s, l, t, x, y, f); return self; }

  // generic event binder
  this.on = function(e, f) { for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.event.on(e, _nodes[i], f, true); return self; }
  this.off = function(e, f) { for (var i = 0, l = _nodes.length; i < l; i++) WA.Managers.event.off(e, _nodes[i], f, true); return self; }

  // some most common events
  this.click = function(f) { return self.on('click', f); }
  this.dblclick = function(f) { return self.on('dblclick', f); }
  this.mouseover = function(f) { return self.on('mouseover', f); }
  this.mouseout = function(f) { return self.on('mouseout', f); }
  this.mousemove = function(f) { return self.on('mousemove', f); }
  this.mousedown = function(f) { return self.on('mousedown', f); }
  this.mouseup = function(f) { return self.on('mouseup', f); }
  this.keydown = function(f) { return self.on('keydown', f); }
  this.keyup = function(f) { return self.on('keyup', f); }

  return this;
}

WA.i18n = function() {}
WA.i18n.defaulti18n = {
  'json.error': 'The JSON code has been parsed with error, it cannot be built.\n',
  'json.unknown': 'The JSON core do not know what to do with this unknown type: '
};
WA.i18n.i18n = {};

WA.i18n.setEntry = function(id, message)
{
  WA.i18n.defaulti18n[id] = message;
}

WA.i18n.loadMessages = function(messages)
{
  for (var i in messages)
  {
    if (!WA.isString(messages[i]))     // we are only interested by strings
      continue;
    WA.i18n.i18n[i] = messages[i];
  }
}

WA.i18n.getMessage  = function(id)
{
  return WA.i18n.i18n[id] || WA.i18n.defaulti18n[id] || id;
}

// DEBUG tool
// WA.debug is a singleton
// @message: string
// @level: integer
WA.debug = function() {}

WA.debug.console = null;
// level 1 is ALWAYS shown (error, break execution etc)
// max level to show: 1 = error, 2 = managers, 3 = wa4gl, 4 = user, by default: user
WA.debug.level = 4;

WA.debug.log = function(message, level)
{
  if (level != 1 && level < WA.debug.level)
    return;
  if (WA.debug.console && WA.debug.console.write)
    WA.debug.console.write(message+'<br />');
  else if (WA.debug.console)
    WA.debug.console.innerHTML += message+'<br />';
  else if (console && console.log)
    console.log(message);
  else if (window.console && window.console.firebug)
    window.console.log(message);
}

// json
WA.JSON = function() {}

WA.JSON.decode = function(json, execerror)
{
  var code = null;
  try
  {
    // 1. We parse the json code
    code = JSON.parse(json);
  }
  catch (e)
  {
    throw e;
  }
  if (code.debug)
  {
    WA.debug.log(code.system, 1);
    code = code.code;
  }
  if (execerror && code.error && !code.login)
  {
    WA.debug.log(code.message, 1);
    code = null;
  }
  return code;
}

WA.JSON.encode = function(data)
{
  try {
    return JSON.stringify(data);
  } catch (e) {
    if (WA.JSON.withalert)
      alert(WA.i18n.getMessage('json.unknown') + typeof data);
  }
  return '';
}

// empty function for listeners assignement (IE bug mainly that does not accept null)
WA.nothing = function() {};

WA.Managers = {};

WA.start = function()
{
  WA.running = true;
}

WA.start();
