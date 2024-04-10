
/*
    floatingContainer.js, WAJAF, the WebAbility(r) Javascript Application Framework
    Contains container to control moveable zones
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

/* The floating Container is a division-nav-sized that lock windows in it with a overflow: hidden */
/* The floating Container have a list of windows accesible to switch windows  on the left */

WA.Containers.floatingContainer = function(domNodeFather, domID, code, listener)
{
  var self = this;

  WA.Containers.floatingContainer.sourceconstructor.call(this, domNodeFather, domID, code, 'div', { classname: 'float' }, listener);

  this.classes = WA.getClasses(code.attributes,
    {
      classname: 'float',
      classnameheader: 'float-header', classnameheadercontent: 'float-header-content',
      classnamebody: 'float-body', classnamebodycontent: 'float-body-content',
      classnameclose: 'buttonmenudisconnect',
    });

  this.haslistener = (code.attributes.haslistener === 'yes');
  this.params = code.attributes.params ? '&' + code.attributes.params : '';
  this.hasdd = !!WA.Managers.dd;
  this.zones = {};
  this.zoneactive = this.code.attributes.startzone ? this.code.attributes.startzone : null;

  this.domNode.style.display = 'none';
  this.domNodeContainer = document.createElement('div');
  this.domNodeContainer.id = "domNodeContainer";
  this.domNodeContainer.style.display = 'none';
  this.domNodeContainer.style.position = 'absolute';
  this.domNodeContainer.style.left = '0px';
  this.domNodeContainer.style.right = '0px';
  this.domNodeContainer.style.top = '0px';
  this.domNodeContainer.style.bottom = '0px';
  this.domNodeContainer.style.backgroundColor = 'transparent';
  this.domNodeContainer.style.zIndex = '10';
  document.body.appendChild(this.domNodeContainer);

  this.domNodeModal = document.createElement('div');
  this.domNodeModal.id = "domNodeModal";
  this.domNodeModal.style.position = 'absolute';
  this.domNodeModal.style.left = '0px';
  this.domNodeModal.style.right = '0px';
  this.domNodeModal.style.top = '0px';
  this.domNodeModal.style.bottom = '0px';
  this.domNodeModal.style.backgroundColor = 'black';
  this.domNodeModal.style.opacity = '0.6';
  this.domNodeModal.style.zIndex = '11';
  this.domNodeContainer.appendChild(this.domNodeModal);

  //this.domNodeModal.onclick = hide;

  start();
  //this.addEvent('start', start);
  this.addEvent('stop', stop);
  
  this.newZone = newZone;
  function newZone(id, title, classname, style, application, closeable, shortcut, params) {
    var code = {};
    code.tag = 'zone';
    code.attributes = { id: id, title: title, classname: classname, style: style, closeable: closeable, shortcut: shortcut, application: application, params: params };
    self.app.createTree(self, code);
  }

  // id is unique id, code are all needed parameters
  this.createZone = createZone;
  function createZone(id, code, notify) {
    var ldomID = WA.parseID(id, self.xdomID);
    if (!ldomID)
      throw 'Error: the zone id is not valid in floatingContainer.createZone: id=' + domID;
    // check the zone does not exists YET !
    if (self.zones[ldomID[2]])
      throw 'Error: the zone already exists in floatingContainer.createZone: id=' + ldomID[2];

    // 1. call event precreate, can we create ?
    if (!self.callEvent('precreate', { id: ldomID[2] }))
      return null;

    var z = new WA.Containers.floatingContainer.floatingZone(self, ldomID[3], code, notify);
    self.zones[ldomID[2]] = z;
    z.start();

    if (!self.zoneactive) {
      self.zoneactive = ldomID[2];
      z.show();
    }

    self.callEvent('postcreate', { id: ldomID[2] });
    if (self.state == 5) {
      z.propagate('start');
    }
    return z;
  }

  this.showZone = showZone;
  function showZone(id) {
    var ldomID = WA.parseID(id, self.xdomID);
    if (!ldomID)
      throw 'Error: the zone id is not valid in floatingContainer.showZone: id=' + id;
    // check the zone does not exists YET !
    if (!self.zones[ldomID[2]])
      throw 'Error: the zone does not exists in floatingContainer.showZone: id=' + ldomID[2];
    var result = true;
    result &= self.callEvent('preshow', ldomID[2]);
    if (self.zoneactive && ldomID[2] !== self.zoneactive)
      result &= self.callEvent('prehide', self.zones[self.zoneactive].xdomID[2]);
    if (!result)
      return;

    // first hide actual
    if (self.zoneactive && ldomID[2] !== self.zoneactive) {
      self.zones[self.zoneactive].hide();
      self.callEvent('posthide', self.zones[self.zoneactive].xdomID[2]);
      self.zoneactive = null;
    }

    // then show the specified zone
    self.zones[ldomID[2]].show();
    self.zoneactive = ldomID[2];
    self.callEvent('postshow', ldomID[2]);
    self.zones[ldomID[2]].propagate('focus');
    if (self.state == 5) {
      self.propagate('resize');
    }
  }

  this.activateZone = activateZone;
  function activateZone(id) {
    self.showZone(id);
  }

  this.destroyZone = destroyZone;
  function destroyZone(id) {
    var ldomID = WA.parseID(id, self.xdomID);
    if (!ldomID)
      throw 'Error: the zone id is not valid in floatingContainer.destroyone: id=' + id;
    // check the zone does not exists YET !
    if (!self.zones[ldomID[2]])
      throw 'Error: the zone does not exists in floatingContainer.destroyZone: id=' + ldomID[2];

    // 2. call event predestroy
    if (!self.callEvent('predestroy', { id: ldomID[2] }))
      return;

    var available = null;
    if (ldomID[2] == self.zoneactive) {
      var next = false;
      // take next available
      for (var i in self.zones) {
        if (i == self.zoneactive && available == null) {
          next = true;
          continue;
        }
        if (i == self.zoneactive)
          break;
        available = i;
        if (next)
          break;
      }
    }

    self.app.destroyTree(ldomID[2]);
    delete self.zones[ldomID[2]];

    if (ldomID[2] == self.zoneactive) {
      self.zoneactive = null;
      if (available)
        self.activateZone(available);
    }

    self.callEvent('postdestroy', { id: ldomID[2] });
    self.propagate('resize');
  }

  
  this.start = start;
  function start() {
    if (self.hasdd){
      console.log("floatingcontainer REGISTRANDO GROUPO", self.domNode, self.domNodeContainer);
      WA.Managers.dd.registerGroup(self.domNode, 'caller', true, self.domNode, null);
    }
  }

  function stop() {
    if (self.hasdd)
      WA.Managers.dd.unregisterGroup(self.domID);
  }
  
  this.destroy = destroy;
  function destroy(fast) {
    self.zones = null;
    self.domNodeContainer = null;
    WA.Containers.floatingContainer.source.destroy.call(self, fast);
    self = null;
  }

  // ===========================================================
  // PRIVATE FUNCTIONS

  /*
  // Put each division on original place
  this.restart = restart;
  function restart()
  {
    for (var i=0, l=self.floatings.length; i < l; i++)
    {
      self.floatings[i].restart();
    }
  }
*/
  this.show = show;
  function show() {
    self.domNodeContainer.style.display = 'block';
    self.resize();
  }

  this.hide = hide;
  function hide() {
    self.domNodeContainer.style.display = 'none';
  }
/*
  // put division on a new position by program
  this.setPosition = setPosition;
  function setPosition(id, left, top)
  {
    for (var i=0, l=self.floatings.length; i < l; i++)
    {
      if (self.floatings[i].getID() == id)
      {
        self.floatings[i].setPosition(left, top);
      }
    }
  }
  */
/*

  this.getWidth = getWidth;
  function getWidth()
  {
    return self.width;
  }

  this.getHeight = getHeight;
  function getHeight()
  {
    return self.height;
  }

  this.selectormouseover = selectormouseover;
  function selectormouseover(id)
  {
    // we create the list of windows
    //  -> [ onclick item of window => window set focus, then close the list ]

    // we attach the list to the container

    // we listen the list: on mouse out ==> close it


  }
*/
}

// Add basic container code
WA.extend(WA.Containers.floatingContainer, WA.Managers.wa4gl._container);

WA.Containers.floatingContainer.floatingZone = function (maincontainer, domID, code, notify) {
  var self = this;
  WA.Containers.floatingContainer.floatingZone.sourceconstructor.call(this, maincontainer, domID, code, 'div', { classname: 'zone' }, notify);
  maincontainer.domNodeContainer.appendChild(this.domNode);
  //self.container = WA.toDOM("main|single|workarea");

  this.left = parseInt(code.attributes.left, 10);
  this.top = parseInt(code.attributes.top, 10);
  this.width = parseInt(code.attributes.width, 10);
  this.height = parseInt(code.attributes.height, 10);

  this.domNode.style.position = "absolute";
  this.domNode.style.top = this.top + 'px';
  this.domNode.style.left = this.left + 'px';
  this.domNode.style.width = this.width + 'px';
  this.domNode.style.height = this.height + 'px';
  this.domNode.style.border = "1px solid #99bbe8";
  this.domNode.style.backgroundColor = "white";
  this.domNode.style.zIndex = '12';

  //if(this.domNode.id == 'control|single|clientsearchcontainer')
    addHead(code);

  function addHead(code)
  {
    // header division
    self.domNodeHeader = WA.createDomNode('div', domID+'_header', self.father.classes.classnameheader);
    self.domNode.insertAdjacentElement('afterbegin', self.domNodeHeader);
    self.domNodeHeader.style.backgroundColor = "#f5f6f7";
    self.domNodeHeader.style.border = "1px solid #99bbe8";
    self.domNodeHeader.style.top = '0px';
    self.domNodeHeader.style.left = '0px';
    self.domNodeHeader.style.width = code.attributes.width - 4 + 'px';
    self.domNodeHeader.style.height = '20px';

    var nodeClose = WA.createDomNode('div', domID+'_header_close', self.father.classes.classnameclose);
    nodeClose.style.width = '16px';
    nodeClose.style.height = '16px';
    nodeClose.style.position = 'absolute';
    nodeClose.style.right = '10px';
    nodeClose.style.top = '2px';
    self.domNodeHeader.appendChild(nodeClose);
    nodeClose.onclick = self.father.hide;

    setTimeout(()=>{
      self.domNode.lastChild.style.top = '20px';
    },400)
  }

  var top = 0;
  var bottom = 0;
  var left = 0;
  var right = 0;
  var xCursor = 0;
  var yCursor = 0;

  this.move = move;
  function move(order, id1, lineid, zone, metrics)
  {
    switch (order) {
      case 'start':
        var n = WA.toDOM(self.domNodeHeader.id);
        n.getAttribute('class');
        if(/dragged/.exec(n.getAttribute('class')) == null)
          self.domNodeHeader.className += ' dragged';
        self.domNode.style.position = 'absolute';
        self.domNode.style.left = metrics.dragdocumentleft + 'px';
        self.domNode.style.top = metrics.dragdocumenttop + 'px';
        self.domNode.style.width = metrics.mainwidth + 'px';
        self.domNode.style.height = metrics.mainheight + 'px';

        top = WA.browser.getNodeDocumentTop(self.domNode);
        bottom = WA.browser.getNodeDocumentTop(self.domNode) + WA.browser.getNodeHeight(self.domNode);
        left = WA.browser.getNodeDocumentLeft(self.domNode);
        right = WA.browser.getNodeDocumentLeft(self.domNode) + WA.browser.getNodeWidth(self.domNode);
        break;
      case 'drag':
        var l = dragPos(metrics.xmouse, metrics.ymouse);
        left += l.l;
        top += l.r;
        self.domNode.style.left = left + l.l + 'px';
        self.domNode.style.top = top + l.r + 'px';
        break;
      case 'drop':
        top = 0;
        bottom = 0;
        left = 0;
        right = 0;
        xCursor = 0;
        yCursor = 0;
        break;
      }
  }


  function dragPos(x, y)
  {
    var l = xCursor == 0 ? 1 : x - xCursor;
    var r = yCursor == 0 ? 1 : y - yCursor;

    if(x < xCursor)
      l = l * 2 - l;

    if(y < yCursor)
      r = r * 2 - r;

    xCursor = x;
    yCursor = y;

    return {l,r};
  }


  this.start = start;
  function start()
  {
    if (self.father.hasdd) {
      console.log('floatingContainer REGISTEROBJECT')
      //self.father.domNodeContainer, self.domNode, self.domNode
      WA.Managers.dd.registerObject(maincontainer.domNode, self.domNodeHeader, self.domNode, move);
    }
  }

  /*
  this.resize = resize;
  function resize() {
    console.log("RESIZING ZONE", self.domID, "visible=", self.visible, "running=", self.father.visible, "state=", self.state);
    // cannot resize if not visible or not running
    if (!self.visible || !self.father.visible)
      return;
    self.domNode.style.height = self.height + 'px';

    // cannot resize if not visible or not running
    if (self.state != 5)
      return;
    // ask for an inner resize
    self.callEvent('pleaseresize');
  }
  */

/*

  this.startdrag = startdrag;
  function startdrag(e) {
    if (!self.isok)
      return false;
    focus(e);
    self.statusdd = true;
    self.clickx = WA.browser.getCursorX(e);
    self.clicky = WA.browser.getCursorY(e);
    self.originleft = parseInt(WA.toDOM(self.uid).style.left);
    self.origintop = parseInt(WA.toDOM(self.uid).style.top);

    // we create a division to drag on top
    var container = document.createElement('div');
    container.id = self.uid + '_drag';
    // take the size of the screen with a minimum size (NS calculates bad the real size for 2 pixels!)
    container.style.visibility = 'visible';
    container.style.position = 'absolute';
    container.style.width = (self.fC.width - (WA.browser.isNS() ? 2 : 0)) + 'px';
    container.style.height = (self.fC.height - (WA.browser.isNS() ? 2 : 0)) + 'px';
    container.style.left = '0px';
    container.style.top = '0px';
    container.style.border = '2px Solid #FF0000';
    container.style.backgroundColor = '#EEEE00';
    container.style.opacity = 0.2;
    container.style.filter = "alpha(opacity: 20)";
    container.style.cursor = 'pointer';
    container.style.overflow = 'hidden';
    container.style.zIndex = WA.browser.getNextZIndex();
    container.onmousemove = move;
    container.onmouseup = stopdrag;
    self.dragcontainer = container;
    document.body.appendChild(container);
    WA.toDOM(self.uid + '_drag').focus();

    return true;
  }

  this.stopdrag = stopdrag;
  function stopdrag(e) {
    if (!self.isok)
      return false;

    // we destroy the drag division
    self.dragcontainer.onmousemove = null;
    self.dragcontainer.onmouseup = null;
    document.body.removeChild(WA.toDOM(self.uid + '_drag'));
    self.dragcontainer = null;

    self.originleft = parseInt(WA.toDOM(self.uid).style.left);
    self.origintop = parseInt(WA.toDOM(self.uid).style.top);
    self.statusdd = false;
    if (self.feedback)
      self.feedback(self);

    return true;
  }

  this.move = move;
  function move(e) {
    if (!self.isok)
      return false;
    if (self.statusdd) {
      WA.toDOM(self.uid).style.left = self.originleft + (WA.browser.getCursorX(e) - self.clickx) + 'px';
      WA.toDOM(self.uid).style.top = self.origintop + (WA.browser.getCursorY(e) - self.clicky) + 'px';
      return true;
    }
    return false;
  }
*/
/*
  this.restart = restart;
  function restart() {
    if (!self.isok)
      return false;
    WA.toDOM(self.uid).style.left = self.systemleft + 'px';
    WA.toDOM(self.uid).style.top = self.systemtop + 'px';
    self.originleft = parseInt(WA.toDOM(self.uid).style.left);
    self.origintop = parseInt(WA.toDOM(self.uid).style.top);
    if (self.feedback)
      self.feedback(self);
  }

  this.focus = focus;
  function focus(e) {
    if (!self.isok)
      return false;
    WA.toDOM(self.uid).style.zIndex = WA.browser.getNextZIndex();
  }

  this.setPosition = setPosition;
  function setPosition(left, top) {
    if (!self.isok)
      return false;
    WA.toDOM(self.uid).style.left = left + 'px';
    WA.toDOM(self.uid).style.top = top + 'px';
  }
*/

}

// Add basic zone code
WA.extend(WA.Containers.floatingContainer.floatingZone, WA.Managers.wa4gl._zone);
