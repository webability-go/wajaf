
/*
    canvasManager.js, WAJAF, the WebAbility(r) Javascript Application Framework
    Contains the Manager singleton to manage animation and sprites
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

WA.Managers.canvas = new function()
{
  var self = this;

  var counter = 1;   // for idless canvases
  this.canvaslist = {};

  // script is {}
  // autostart: true/false
  // loop: true/false
  // chain: [] of {}:
  //    type: 'move', 'wait'
  //    metrics: xinit, xend, yinit, yend, winit, wend, hinit, hend, tinit, tend   => x,y: position, w,h: size, t: transparency,
  //             rinit, rend, ginit, gend, binit, bend, brinit, brend, bginit, bgend, bbinit, bbend   => red, green, blue & background
  //    time: time to do it in ms
  //    calculate: function to call instead of using position, size and transparency. will get back a metrics object
  // the sprite will be destroyed at the end of script except if loop = on
  this.createCanvas = createCanvas;
  function createCanvas(id, domNode, callback)
  {
    if (!id)
      id = 'sprite'+(counter++);
    if (self.canvaslist[id])
      return self.canvaslist[id];

    var c = new WA.Managers.canvas.Canvas(id, domNode, callback);
    self.canvaslist[id] = c;
    return c;
  }

  this.destroyCanvas = destroyCanvas;
  function destroyCanvas(id)
  {
    if (self.canvaslist[id])
    {
      self.canvaslist[id].destroy();
      delete self.canvaslist[id];
    }
  }

  // flush
  function destroy()
  {
    for (var i in self.canvaslist)
    {
      self.canvaslist[i].destroy();
      delete self.canvaslist[i];
    }
    delete self.canvaslist;
    self = null;
  }

  WA.Managers.event.registerFlush(destroy);
}();

// individual sprites to anim
WA.Managers.canvas.Canvas = function(id, domNode, callback)
{
  var self = this;
  this.id = id;
  this.callback = callback;
  this.domNode = WA.toDOM(domNode);
  if (this.domNode == null)
    return;
  this.context = this.domNode.getContext("2d");

  this.destroy = destroy;
  function destroy()
  {
    // we set the node to its original position

    self.callback = null;
    self.domNode = null;
    self = null;
  }

  return this;
}

/*
WA.Managers.anim.Animator = function(id, domNode, image, positions, animations, sounds, callback)
{
  var self = this;
  this.sound = !!WA.Managers.sound;

  this.domNode = WA.toDOM(domNode);
  if (this.domNode == null)
    return;

  this.id = id;
  this.image = image;
  this.positions = positions;
  this.animations = animations;
  this.sounds = sounds;
  this.callback = callback;

  // take the 1rst anim as the default one
  for (var i in animations)
  {
    this.defanim = i;
    break;
  }
  if (this.sound)
  {
    for (var i in sounds)
    {
      WA.Managers.sound.addSound('animator_'+id+'_'+i, sounds[i]);
    }
  }

  this.anim = this.defanim;
  this.frame = 0;
  this.factor = 1;
  this.timer = null;
  this.starttime = null;

  function setImage()
  {
    self.domNode.style.backgroundPosition = -self.positions[self.animations[self.anim][self.frame].f].x + 'px ' +
                                            -self.positions[self.animations[self.anim][self.frame].f].y + 'px';
    self.domNode.style.width = self.positions[self.animations[self.anim][self.frame].f].w + 'px';
    self.domNode.style.height = self.positions[self.animations[self.anim][self.frame].f].h + 'px';
    if (self.animations[self.anim][self.frame].m && self.sound)
    {
      WA.Managers.sound.startSound('animator_'+self.id+'_'+self.animations[self.anim][self.frame].m);
    }
    if (self.callback)
      self.callback(self.id, 'frame', self.anim, self.frame);
  }

  // set the default animation
  // If it is the current one, we switch it also
  this.setdefault = setdefault;
  function setdefault(id)
  {
    if (self.defanim == self.anim)
    {
      self.anim = id;
      self.frame = 0;
      self.factor = 1;
      setImage();
    }
    self.defanim = id;
    self.defframe = 0;
  }

  // main default animation
  this.start = start;
  function start()
  {
    self.starttime = new Date().getTime();
    self.frame = 0;
    self.factor = 1;
    if (self.timer) // previous start
    {
      clearTimeout(self.timer);
      self.timer = null;
    }
    setImage();
    _anim();
  }

  // start a special special animation
  // entry = id of the sub animation
  // loop = 1, 2, ...
  // synchro = true: when the main finish the loop, start this one, false: start immediatly
  this.startanim = startanim;
  function startanim(entry, factor, loop, synchro)
  {
    self.starttime = new Date().getTime();
    if (self.timer) // previous start
    {
      clearTimeout(self.timer);
      self.timer = null;
    }
    self.anim = entry;
    self.frame = 0;
    self.factor = factor;
    setImage();
    _anim();
  }

  // stop of the special animation, back to the main default one
  // restart = true: start main at beginning, false = main follow where it was
  this.stopanim = stopanim;
  function stopanim(restart)
  {
    self.starttime = new Date().getTime();
    if (self.timer) // previous start
    {
      clearTimeout(self.timer);
      self.timer = null;
    }
    self.anim = self.defanim;
    self.frame = 0;
    self.factor = 1;
    setImage();
    _anim();
  }

  this.stop = stop;
  function stop()
  {
    if (self.timer) // previous start
    {
      clearTimeout(self.timer);
      self.timer = null;
    }
  }

  function _anim()
  {
    if (self.timer)
    {
      clearTimeout(self.timer);
      self.timer = null;
    }

    var time = new Date().getTime();
    var diff = time - self.starttime;

    if (diff > self.animations[self.anim][self.frame].t / self.factor)
    {
      self.starttime += self.animations[self.anim][self.frame].t / self.factor;
      // change the frame
      if (++self.frame >= self.animations[self.anim].length)
        self.frame = 0;
      // paint the frame
      setImage();
    }

    self.timer = setTimeout(_anim, 10);
  }

  this.destroy = destroy;
  function destroy()
  {
    // we set the node to its original position

    if (self.timer)
      clearTimeout(self.timer);
    self.timer = null;
    self.starttime = null;
    self.pointer = 0;
    self.id = null;
    self.callback = null;
    self.script = null;
    self.domNode = null;
    self = null;
  }

  // prepare the domNode
  this.domNode.style.backgroundImage = 'url('+this.image+')';
  this.domNode.style.backgroundRepeat = 'no-repeat';
  start();
}
*/
