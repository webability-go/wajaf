
/*
    textfieldElement.js, WAJAF, the WebAbility(r) Javascript Application Framework
    Contains element to control a simple text field
    (c) 2008-2012 Philippe Thomassigny

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

WA.Elements.searchabletextfieldElement = function(fatherNode, domID, code, listener)
{
  var self = this;
  WA.Elements.searchabletextfieldElement.sourceconstructor.call(this, fatherNode, domID, code, 'div', { classname:'textfield' }, listener);

  this.id = this.code.attributes.id; // name of field, to use to send to the server

  // by default the field is part of the record, used by container
  this.formtype = 'field';
  this.record = (this.code.attributes.record&&this.code.attributes.record=='no'?false:true);
  this.editable = true;  // it's a text field, so yes

  this.status = 0; // 0 = neutral, 1 = ok, 2 = error, 3 = r/o, 4 = disabled
  this.edition = false;
  this.focus = false;

  this.mode = 0;
  // Behaviour on modes
  this.isvisible = [];
  this.info = [];
  this.disabled = [];
  this.readonly = [];
  this.notnull = [];
  this.help = [];
  for (var i = 1; i < 5; i++)
  {
    this.isvisible[i] = (this.code.attributes.visible?this.code.attributes.visible.indexOf(''+i)!=-1:true);
    this.info[i] = (this.code.attributes.info?this.code.attributes.info.indexOf(''+i)!=-1:false);
    this.disabled[i] = (this.code.attributes.disabled?this.code.attributes.disabled.indexOf(''+i)!=-1:false);
    this.readonly[i] = (this.code.attributes.readonly?this.code.attributes.readonly.indexOf(''+i)!=-1:false);
    this.notnull[i] = (this.code.attributes.notnull?this.code.attributes.notnull.indexOf(''+i)!=-1:false);
    this.help[i] = (this.code.attributes.helpmode?this.code.attributes.helpmode.indexOf(''+i)!=-1:false);
  }

  // validity checks
  // type can be: text, password, integer, float, email
  this.texttype = (this.code.attributes.texttype?this.code.attributes.texttype:'text');
  this.format = (this.code.attributes.format?new RegExp(this.code.attributes.format):null);
  this.min = (this.code.attributes.min?this.code.attributes.min:'');
  this.max = (this.code.attributes.max?this.code.attributes.max:'');
  this.minlength = (this.code.attributes.minlength?this.code.attributes.minlength:'');
  this.maxlength = (this.code.attributes.maxlength?this.code.attributes.maxlength:'');
  this.size = (this.code.attributes.size?this.code.attributes.size:'');
  this.minwords = (this.code.attributes.minwords?this.code.attributes.minwords:null);
  this.maxwords = (this.code.attributes.maxwords?this.code.attributes.maxwords:null);
  this.auto = (this.code.attributes.auto&&this.code.attributes.auto=='yes'?true:false);
  // defaultvalue is the default for insert mode (code from the code, set below)
  // value is the value set in this mode by setValues, if we want to undo changes
  this.defaultvalue = this.value = '';
  this.automessage = '';

  // errors on checks
  this.errorexternal = false;  // true when set manually an error
  this.errors = {};
  this.errormessages = {};
  this.firstview = true; // set to false when the field has been touched/modified. Used to know if we put the errors

  if (code.children)
  {
    for (var i = 0, l = code.children.length; i < l; i++)
    {
      switch (code.children[i].tag)
      {
        case 'defaultvalue': this.defaultvalue = code.children[i].data?code.children[i].data:''; break;
        case 'helpdescription': this.helpmessage = code.children[i].data; break;
        case 'statusnotnull': this.errormessages.statusnotnull = code.children[i].data; this.errors.statusnotnull = false; break;
        case 'statusbadformat': this.errormessages.statusbadformat = code.children[i].data; this.errors.statusbadformat = false; break;
        case 'statustooshort': this.errormessages.statustooshort = code.children[i].data; this.errors.statustooshort = false; break;
        case 'statustoolong': this.errormessages.statustoolong = code.children[i].data; this.errors.statustoolong = false; break;
        case 'statustoofewwords': this.errormessages.statustoofewwords = code.children[i].data; this.errors.statustoofewwords = false; break;
        case 'statustoomanywords': this.errormessages.statustoomanywords = code.children[i].data; this.errors.statustoomanywords = false; break;
        case 'statustoolow': this.errormessages.statustoolow = code.children[i].data; this.errors.statustoolow = false; break;
        case 'statustoohigh': this.errormessages.statustoohigh = code.children[i].data; this.errors.statustoohigh = false; break;
        case 'statuscheck': this.errormessages.statuscheck = code.children[i].data; this.errors.statuscheck = false; break;
        case 'automessage': this.automessage = code.children[i].data; break;
      }
    }
  }
  // NODES
  this.domNodeLabel = WA.createDomNode('label', domID+'_label', this.classes.classname + 'label');
  this.father.domNode.insertBefore(this.domNodeLabel, this.domNode);
  if (self.code.data)
    this.domNodeLabel.innerHTML = self.code.data;

  this.domNodeValue = WA.createDomNode('div', domID+'_value', 'value');
  this.domNode.appendChild(this.domNodeValue);

  this.domNodeSearch = WA.createDomNode('input', domID + '_search', 'field');
  this.domNodeSearch.type = this.texttype == 'masked' ? 'password' : 'text';
  this.domNodeSearch.autocomplete = "off";
  if (this.maxlength)
    this.domNodeSearch.maxLength = this.maxlength;
  if (this.size)
    this.domNodeSearch.style.width = this.size + 'px';
  this.domNode.appendChild(this.domNodeSearch);

  this.domNodeList = WA.createDomNode('div', domID + '_list', 'list');
  this.domNodeList.style = "width: " + this.size + "px;";
  this.domNode.appendChild(this.domNodeList);

  this.domNodeField = WA.createDomNode('input', domID+'_field', 'selected');
  this.domNodeField.type = 'text';
  this.domNodeField.name = this.id;
  this.domNodeField.readOnly = true;
  this.domNode.appendChild(this.domNodeField);

  this.domNodeCount = WA.createDomNode('span', domID+'_count', 'count');
  this.domNode.appendChild(this.domNodeCount);

  this.domNodeHelp = WA.createDomNode('p', domID+'_help', 'help');
  this.domNode.appendChild(this.domNodeHelp);
  if (self.helpmessage)
    this.domNodeHelp.innerHTML = self.helpmessage;

  this.domNodeError = WA.createDomNode('p', domID+'_error', 'error');
  this.domNode.appendChild(this.domNodeError);
  this.domNodeResult = WA.createDomNode('div', domID + '_result', 'result');
  this.domNode.appendChild(this.domNodeResult);

  // responsive design based on container available size, is '', ' medium' or ' tiny'
  // Not activated for now
  this.sizemode = '';

  // we link with the group. first father is the zone, second father is the group
  // *********************************************
  // NOTE: THIS IS WRONG; THERE MAY BE MORE CONTAINERS INTO THE ZONES ETC
  // THE GROUP SHOULD BE SEARCH BY ID INTO THE 4GL TREE
  this.group = null;
  if (this.father.father.code.attributes.type == "groupContainer")
  {
    this.group = this.father.father;
    this.group.registerField(this);
  }
  else
  {
    if (this.defaultvalue)
      this.domNodeField.value = this.defaultvalue;
  }

  // If we control some other fields
  this.synchronizer = null;
  this.synchronizeelements = [];

  this.addEvent('resize', resize);
  this.addEvent('start', start);
  this.addEvent('stop', stop);

  function resize()
  {
    WA.Elements.searchabletextfieldElement.source.resize.call(self);
    // size mode for responsive design, not activated for now
/*
    var RW = WA.browser.getNodeOuterWidth(self.father.domNode);
    var W1 = WA.browser.getNodeOuterWidth(self.domNodeField); // should be always fixed by CSS or code. We consider fields as fixed size always
    if (RW > W1*2 + 180 && self.sizemode != '')
      self.sizemode = '';
    else if (RW > W1 + 180 && self.sizemode != ' medium')
      self.sizemode = ' medium';
    else if (self.sizemode != ' tiny')
      self.sizemode = ' tiny';
    checkClass();
*/
  }

  this.registerSynchronize = registerSynchronize;
  function registerSynchronize(element)
  {
    self.synchronizeelements.push(element);
  }

  this.unregisterSynchronize = unregisterSynchronize;
  function unregisterSynchronize(element)
  {
    for (var i=0, l=self.synchronizeelements.length; i < l; i++)
    {
      if (self.synchronizeelements[i] == element)
      {
        self.synchronizeelements.splice(i, 1);
        break;
      }
    }
    return;
  }

  this.checkStatus = checkStatus;
  function checkStatus()
  {
    for (var i in self.errors)
      self.errors[i] = false;

    if (self.mode == 0 || !self.edition)
    {
      self.status = 0;
      self.domNodeError.innerHTML = '';
      self.domNodeCount.innerHTML = '';
      return;
    }

    //  default = ok, status = 1 (ok), 2 (editing), 3 (error), 4 (r/o), 5 (disabled)
    if (self.synchronizer)
    {
      // we rebuild synchronizer
      self.synchronizer.checkStatus();
      self.status = self.synchronizer.status;
      return;
    }

    // we check anything based on the attributes of the field
    if (self.disabled[self.mode])
    {
      self.status = 4;
      return;
    }
    if (self.readonly[self.mode])
    {
      self.status = 3;
      return;
    }
    if (self.domNodeField.disabled == true)
      self.domNodeField.disabled == false;
    if (self.domNodeField.readOnly == true)
      self.domNodeField.readOnly == false;
    var value = self.domNodeField.value;
    if (self.value != undefined && value == self.value && self.mode != 1)
    {
      self.status = 0;
      self.domNodeError.innerHTML = '';
      self.domNodeCount.innerHTML = '';
      return;
    }
    if (self.mode == 1 && self.auto)
    {
      self.status = 0;
      return;
    }

    self.status = 1;
    if (self.notnull[self.mode] && value == '')
    {
      self.status = 2;
      self.errors.statusnotnull = true;
    }

    if (self.format && value.match(self.format) == null)
    {
      self.status = 2;
      self.errors.statusbadformat = true;
    }
    if (self.texttype == "integer")
    {
      nv = parseInt(value, 10)
      min = parseInt(self.min, 10)
      max = parseInt(self.max, 10)
      if (min != max && nv < min)
      {
        self.status = 2;
        self.errors.statustoolow = true;
      }
      if (min != max && nv > max)
      {
        self.status = 2;
        self.errors.statustoohigh = true;
      }
    }
    if (self.texttype == "float")
    {
      nv = parseFloat(value)
      min = parseFloat(self.min)
      max = parseFloat(self.max)
      if (min != max && nv < min)
      {
        self.status = 2;
        self.errors.statustoolow = true;
      }
      if (min != max && nv > max)
      {
        self.status = 2;
        self.errors.statustoohigh = true;
      }
    }
    if (self.texttype == "text" || self.texttype == "masked")
    {
      if (self.minlength && value.length < self.minlength)
      {
        self.status = 2;
        self.errors.statustooshort = true;
      }
      if (self.maxlength && value.length > self.maxlength)
      {
        self.status = 2;
        self.errors.statustoolong = true;
      }
      var text = value;
      text = text.replace(/[\n\t\r]+/g, " ");
      text = text.replace(/^[ ]+/, "");
      text = text.replace(/[ ]+$/, "");
      text = text.replace(/[ ]+/g, " ");
      var numpalabras = (text.length > 0 ? text.split(" ").length : 0);
      if (self.maxwords || self.minwords)
      {
        if (numpalabras < self.minwords)
        {
          self.status = 2;
          self.errors.statustoofewwords = true;
        }
        if (numpalabras > self.maxwords)
        {
          self.status = 2;
          self.errors.statustoomanywords = true;
        }
      }
      self.domNodeCount.innerHTML = numpalabras + '/' + value.length;
    }
    if (self.errorexternal)
      self.status = 2;
    // user own checks
    if (self.code[0] != undefined && self.code[0].tag != undefined && self.code[0].tag == 'check')
      eval(self.code[0].data);
  }

  this.checkClass = checkClass;
  function checkClass()
  {
    var extras = '';
    switch (self.status)
    {
      case 4: extras += ' disabled'; self.domNodeField.disabled = true; break;
      case 3: extras += ' readonly'; self.domNodeField.readOnly = true; break;
      case 2: extras += ' error'; if (self.group) self.father.setStatus(self.focus?1:(self.firstview?0:3)); break;
      case 1: extras += ' ok'; if (self.group) self.father.setStatus(self.focus?1:(self.firstview?0:2)); break;
      default: if (self.group) self.father.setStatus(self.focus?1:0); break;
    }
    if (self.focus)
      extras += ' edition';
    self.domNodeLabel.className = self.classes.classname + 'label' + extras + self.sizemode;
    self.domNode.className = self.classes.classname + extras + self.sizemode;
  }

  this.checkChildren = checkChildren;
  function checkChildren(onlylocal)
  {
    if (!onlylocal)
    {
      for (var i=0, l=self.synchronizeelements.length; i < l; i++)
      {
        self.synchronizeelements[i].status = self.status;
        self.synchronizeelements[i].checkClass();
        self.synchronizeelements[i].checkChildren();
      }
    }
  }

  this.checkAll = checkAll;
  function checkAll(notifygroup)
  {
    self.checkStatus();
    self.checkClass();
    self.checkChildren(false);

    if (!self.firstview)
    {
      if (!self.errorexternal)
      {
        var text = '';
        for (var i in self.errors)
        {
          if (self.errors[i])
            text += self.errormessages[i] + '<br />';
        }
        self.domNodeError.innerHTML = text;
      }
    }
    else
      self.domNodeError.innerHTML = '';
    if (self.group && notifygroup)
    {
      self.group.pleaseCheck();
    }
  }

  this.setError = setError;
  function setError(values)
  {
    self.domNodeError.innerHTML = values;
    self.errorexternal = true;
    checkAll();
  }

  this.setMode = setMode;
  function setMode(mode, keep)
  {
    self.mode = mode;

    // Set all the data based on the mode
    if (!self.isvisible[mode])
    {
      if (self.group)
        self.father.hide();
      return;
    }
    if (self.group)
      self.father.show();

    if (keep)
      self.domNodeValue.innerHTML = self.domNodeField.value;
    if (mode == 1 && self.auto)
    {
      self.domNodeValue.style.display = '';
      self.domNodeField.style.display = 'none';
    }
    else
    {
      self.domNodeValue.style.display = (self.info[mode]?'':'none');
      self.domNodeField.style.display = (self.info[mode]?'none':'');
    }

    self.domNodeHelp.style.display = (self.help[mode]?'':'none');
    self.domNodeCount.style.display = (self.info[mode]?'none':'');
    self.domNodeError.style.display = (self.info[mode]?'none':'');
    self.edition = !self.info[mode];
    if (mode == 1)
    {
      reset();
    }
    else
      checkAll();
  }

  function filllist(list) {
    self.domNodeList.innerHTML = "";
    for (var i in list) {
      var item = WA.createDomNode('div', self.id + '_list_' + i, 'item');
      item.innerHTML = i + " / " + list[i];
      item.value = list[i];
      item.key = i;
      item.onclick = function() {
        console.log("CLICK", this.key);
        self.domNodeSearch.value = this.value;
        self.domNodeField.value = this.key;
        self.domNodeList.style.display = 'none';
        self.haslist = false;
        self.showlist = false;
        checkAll(true); // check and notify group
        search();
      }
      item.onmouseover = function () {
        this.className = 'item selected';
        self.itemover = true;
      }
      item.onmouseout = function () {
        this.className = 'item';
        self.itemover = false;
      }
      self.domNodeList.appendChild(item);
    }
    self.haslist = true;
    self.showlist = true;
    self.domNodeList.style.display = 'block';
  }

  function getResponse(request) {

    var code = WA.JSON.decode(request.responseText);
    if (code.status != 1)
    {
      self.status = 2;
      self.errors.statusnotnull = true;
    }
    else
      self.status = 1;
    self.checkClass();
    
    self.domNodeField.value = code.key;
    self.domNodeResult.innerHTML = code.message;

    if (code.list && !code.key) {
      // Fill in the list
      filllist(code.list);
    } else {
      self.haslist = false;
      self.showlist = false;
      self.domNodeList.style.display = 'none';
      if (code.value)
        self.domNodeSearch.value = code.value;
    }

    checkAll(true);
  }

  this.sendServer = sendServer;
  function sendServer(order, code, response) {
    // send information to server based on mode
    if (!response) response = getResponse;
    var request = WA.Managers.ajax.createRequest(WA.Managers.wa4gl.url + WA.Managers.wa4gl.prelib + self.app.applicationID + WA.Managers.wa4gl.premethod + self.id + WA.Managers.wa4gl.preformat + WA.Managers.wa4gl.format, 'POST', 'Order=' + order + (self.params ? '&' + self.params : ''), response, false);
    if (request) {
      for (var i in code) {
        request.addParameter(i, code[i]);
      }
      request.send();
    }
  }

  this.reset = reset;
  function reset()
  {
    if (!self.edition)
      return;
    if (self.mode == 1)
    {
      self.value = self.domNodeField.value = self.domNodeSearch.value = self.defaultvalue;
      self.domNodeValue.innerHTML = self.auto?self.automessage:self.defaultvalue;
    }
    else if (self.mode == 2 || self.mode == 3)
    {
      self.domNodeValue.innerHTML = self.domNodeField.value = self.domNodeSearch.value = self.value;
    }
    checkAll();
  }

  this.search = search;
  function search()
  {
    // if ENTER, send
    self.sendServer('search', { id: self.code.attributes.id, key: self.domNodeField.value, q: self.domNodeSearch.value });
  }

  function onkeyup(e)
  {
    console.log("KEY UP", e, self.id);
    self.firstview = false;
    self.errorexternal = false;
    if ((self.value == undefined || self.value == null || self.value == '') && self.domNodeSearch.value == '')
      self.firstview = true;
    else if (self.value != undefined && self.value != null && self.domNodeSearch.value == self.value)
      self.firstview = true;
    setTimeout( function() { checkAll(true); }, 0); // check and notify group
    setTimeout( function() { self.callEvent('keyup'); }, 0); // call event key up
    self.domNodeField.value = "";
    search();
  }

  function onblur(e)
  {
    self.focus = false;
    setTimeout(function() {
        if (self.haslist && !self.itemover) {
          self.domNodeList.style.display = 'none';
          self.showlist = false;
        }
    }, 1);
    if (!self.haslist)
    {
      checkAll(true); // check and notify group
      self.callEvent('blur');
      search();
    }
}

  function onfocus(e)
  {
    self.focus = true;
    if (self.haslist) {
      console.log("FOCUS")
      self.domNodeList.style.display = 'block';
      self.showlist = true;
    }
    checkAll(true); // check and notify group
    if (self.group)
      self.father.setStatus(1);
    self.callEvent('focus');
  }

  function start()
  {
    console.log("START", self.id, self.domNodeSearch);

    WA.Managers.event.on('keyup', self.domNodeSearch, onkeyup, true);
    WA.Managers.event.on('focus', self.domNodeSearch, onfocus, true);
    WA.Managers.event.on('blur', self.domNodeSearch, onblur, true);

    // If we are controled by another field
    if (self.code.attributes.synchronizer)
    {
      self.synchronizer = WA.$N(self.code.attributes.synchronizer);
      if (self.synchronizer)
        self.synchronizer.registerSynchronize(self);
    }
    // we do not check, there is still no value. the setMode will do the job
  }

  this.getValues = getValues;
  function getValues()
  {
    return self.domNodeField.value;
  }

  this.setValues = setValues;
  function setValues(values)
  {
    if (self.group)
    {
      self.firstview = true;
      self.value = self.domNodeField.value = self.domNodeSearch.value = values;
      if (values != undefined && values != null)
        self.domNodeValue.innerHTML = values;
      else
        reset();
      checkAll();
    }
    else
    {
      self.domNodeField.value = values;
      self.domNodeSearch.value = values;
    }
  }

  this.stop = stop;
  function stop()
  {
    if (self.group)
      self.group.unregisterField(self);
    WA.Managers.event.off('keyup', self.domNodeSearch, onkeyup, true);
    WA.Managers.event.off('focus', self.domNodeSearch, onfocus, true);
    WA.Managers.event.off('blur', self.domNodeSearch, onblur, true);
  }

  this.destroy = destroy;
  function destroy(fast)
  {
    WA.Elements.searchabletextfieldElement.source.destroy.call(self, fast);

    self.synchronizer = null;
    self.synchronizeelements = [];
    self.group = null;
    self.domNodeError = null;
    self.domNodeHelp = null;
    self.domNodeValue = null;
    self.domNodeSearch = null;
    self.domNodeCount = null;
    self.domNodeField = null;
    self.domNodeLabel = null;
    self.errormessages = null;
    self.errors = null;
    self.isvisible = null;
    self.info = null;
    self.disabled = null;
    self.readonly = null;
    self.notnull = null;
    self.help = null;
    self = null;
  }
}

// Add basic element code
WA.extend(WA.Elements.searchabletextfieldElement, WA.Managers.wa4gl._element);
