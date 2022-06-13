
// String prototypes
WA.String = {};
WA.String.sprintf = function()
{
  var args = arguments[1];
  return arguments[0].replace(/\{([A-Za-z0-9\-_\.]+)\}/g, function(p0, p1){ return args[p1]; });
}

WA.String.escape = function(value)
{
  var newstr = (value != undefined && value != null) ? value : this;
  return newstr.replace(/("|'|\\)/g, "\\$1");
}

WA.String.padding = function(size, pad, value)
{
  if (!pad) pad = ' ';
  var newstr = new String((value != undefined && value != null) ? value : this);
  while (newstr.length < size)
  {
    newstr = pad + newstr;
  }
  return newstr;
}

WA.String.trim = function(value)
{
  var newstr = (value != undefined && value != null) ? value : this;
  return newstr.replace(/^(\s|&nbsp;)*|(\s|&nbsp;)*$/g, '');
};

// Array prototypes
WA.Array = {};
WA.Array.indexOf = function(val, field)
{
  for (var i = 0, l = this.length; i < l; i++)
  {
    if ((field && this[i][field] == val) || (!field && this[i] == val))
      return i;
  }
  return false;
}

WA.Array.remove = function(o, field)
{
  var index = this.indexOf(o, field);
  if(index != -1)
  {
    this.splice(index, 1);
  }
  return this;
}

// Date basic functions
WA.Date = {};
WA.Date.setNames = function(days, shortdays, months, shortmonths)
{
  WA.Date.days = days;
  WA.Date.shortdays = shortdays;
  WA.Date.months = months;
  WA.Date.shortmonths = shortmonths;
}

// english by default
WA.Date.setNames(
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
);

WA.Date.basicdays = [31,28,31,30,31,30,31,31,30,31,30,31];

WA.Date.isDate = function(year, month, day)
{
  var numdays = WA.Date.basicdays[month-1];
  return day>0 && !!numdays && (day<=numdays || day==29 && year%4==0 && (year%100!=0 || year%400==0) );
}

WA.Date.isTime = function(hour, min, sec)
{
  return hour>=0 && hour<=23 && min>=0 && min<=59 && sec>=0 && sec<=59;
}

WA.Date.isValid = function(year, month, day, hour, min, sec, ms)
{
  hour = hour || 0;
  min = min || 0;
  sec = sec || 0;
  ms = ms || 0;
  // no need to apply(this) for isDate and isTime, they are static funcions
  return WA.Date.isDate(year, month, day) && WA.Date.isTime(hour, min, sec) && ms >= 0 && ms <= 999;
}

WA.Date.isLeapYear = function(d)
{
  var year = d.getFullYear();
  return (year%4==0 && (year%100!=0 || year%400==0));
}

WA.Date.getOrdinalSuffix = function()
{
  switch (this.getDate())
  {
    case 1: case 21: case 31: return 'st';
    case 2: case 22:          return 'nd';
    case 3: case 23:          return 'rd';
    default:                  return 'th';
  }
}

WA.Date.getMaxMonthDays = function(d)
{
  var numdays = WA.Date.basicdays[d.getMonth()];
  if (numdays == 28 && WA.Date.isLeapYear(d))
  {
    numdays++;
  }
  return numdays;
}

WA.Date.getDayOfYear = function()
{
  var day = this.getDate();
  for (var i = 0; i <= this.getMonth()-1; i++)
    day += WA.Date.basicdays[i] + (i==1&&WA.Date.isLeapYear(this)?1:0);
  return day;
}

// adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
WA.Date.getWeekOfYear = function()
{
  var ms1d = 86400000;
  var ms7d = 604800000;
  var DC3 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / ms1d;
  var AWN = Math.floor(DC3 / 7);
  var Wyr = (new Date(AWN * ms7d)).getUTCFullYear();
  return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
}

WA.Date.getGMTOffset = function(colon)
{
  return (this.getTimezoneOffset() > 0 ? '-' : '+')
      + String.padding(2, '0', Math.floor(Math.abs(this.getTimezoneOffset()) / 60))
      + (colon ? ':' : '')
      + String.padding(2, '0', Math.abs(this.getTimezoneOffset() % 60));
}

// by extJS
WA.Date.getTimezone = function()
{
  return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, '$1$2').replace(/[^A-Z]/g, '');
}

// original idea of structure/pattern by extJS
WA.Date.grabformats = {
  j: "this.getDate()",                                           // day of the month, no leading 0
  d: "WA.String.padding(2, '0', this.getDate())",                // day of the month, leading 0, no need to call()
  D: "WA.Date.shortdays[this.getDay()]",                         // short name of day
  l: "WA.Date.days[this.getDay()]",                              // full name of day

  w: "this.getDay()",                                            // day of the week, 0 = sunday
  N: "(this.getDay()==0?7:this.getDay())",                       // ISO day of the week, 1 = monday
  S: "WA.Date.getOrdinalSuffix.call(this)",                      // english day of the week suffix

  z: "WA.Date.getDayOfYear.call(this)",                          // day of the year, 0 to 365

  W: "WA.String.padding(2, '0', WA.Date.getWeekOfYear.call(this))",  // ISO week of the year, leading 0, no need to call()

  n: "(this.getMonth() + 1)",                                    // number of month, 1 to 12, no leading 0
  m: "WA.String.padding(2, '0', this.getMonth() + 1)",           // number of month, 01 to 12, leading 0, no need to call()
  M: "WA.Date.shortmonths[this.getMonth()]",                     // short name of month
  F: "WA.Date.months[this.getMonth()]",                          // full name of month
  t: "WA.Date.getMaxMonthDays.call(this)",                       // number of days into the month

  L: "(WA.Date.isLeapYear(this) ? 1 : 0)",
  o: "(this.getFullYear() + (WA.Date.getWeekOfYear.call(this) == 1 && this.getMonth() > 0 ? +1 : (WA.Date.getWeekOfYear.call(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
  Y: "this.getFullYear()",
  y: "('' + this.getFullYear()).substring(2, 4)",

  a: "(this.getHours() < 12 ? 'am' : 'pm')",
  A: "(this.getHours() < 12 ? 'AM' : 'PM')",
  g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
  G: "this.getHours()",
  h: "WA.String.padding(2, '0', (this.getHours() % 12) ? this.getHours() % 12 : 12)",
  H: "WA.String.padding(2, '0', this.getHours())",

  i: "WA.String.padding(2, '0', this.getMinutes())",
  s: "WA.String.padding(2, '0', this.getSeconds())",
  u: "WA.String.padding(3, '0', this.getMilliseconds())",

  O: "WA.String.getGMTOffset.call(this)",
  P: "WA.String.getGMTOffset.call(this, true)",
  T: "WA.String.getTimezone.call(this)",
  Z: "(this.getTimezoneOffset() * -60)",
  c: "this.getUTCFullYear() + '-' + WA.String.padding(2, '0', this.getUTCMonth() + 1) + '-' + WA.String.padding(2, '0', this.getUTCDate()) + 'T' + "
        + "WA.String.padding(2, '0', this.getUTCHours()) + ':' + WA.String.padding(2, '0', this.getUTCMinutes()) + ':' + "
        + "WA.String.padding(2, '0', this.getUTCSeconds()) + WA.Date.getGMTOffset.call(this, true)",
  U: "Math.round(this.getTime() / 1000)"
};

WA.Date.format = function(d, str)
{
  var code = [];
  for (var i = 0, l = str.length; i < l; i++)
  {
    var c = str.charAt(i);
    if (c == '\\')
    {
      i++;
      // no need to call String.escape with an apply since we pass the caracter as parameter
      code.push("'" + WA.String.escape(str.charAt(i)) + "'");
    }
    else
    {
      WA.Date.grabformats[c]!=undefined?code.push(WA.Date.grabformats[c]):code.push("'" + WA.String.escape(c) + "'");
    }
  }

  var f = new Function('return ' + code.join('+') + ';');
  return f.call(d);
}


// UTF-8 conversions, encoding
WA.UTF8 = function() {}

WA.UTF8.encode = function(value)
{
  if (WA.isObject(value))
  {
    var elements = {};
    for (var i in value)
    {
      if (!WA.isString(value[i]))   // we are only interested by strings
        continue;
      elements[i] = WA.UTF8.encode(value[i]);
    }
    return elements;
  }
  value = value.replace(/\r\n/g,'\n');
  var utf = '';
  for (var i = 0, l = value.length; i < l; i++)
  {
    var c = value.charCodeAt(i);
    if (c < 128)
    {
      utf += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048))
    {
      utf += String.fromCharCode((c >> 6) | 192);
      utf += String.fromCharCode((c & 63) | 128);
    }
    else
    {
      utf += String.fromCharCode((c >> 12) | 224);
      utf += String.fromCharCode(((c >> 6) & 63) | 128);
      utf += String.fromCharCode((c & 63) | 128);
    }
  }
  return utf;
}

// public method for utf8 decoding
WA.UTF8.decode = function(value)
{
  var str = '';
  var i = 0;
  var c1 = c2 = c3 = 0;
  while ( i < value.length )
  {
    c1 = value.charCodeAt(i);
    if (c1 < 128)
    {
      str += String.fromCharCode(c1);
      i++;
    }
    else if((c1 > 191) && (c1 < 224))
    {
      c2 = value.charCodeAt(i+1);
      str += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    }
    else
    {
      c2 = value.charCodeAt(i+1);
      c3 = value.charCodeAt(i+2);
      str += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return str;
}

WA.Entities = function() {}

// In the same order of HTML4 official reference
WA.Entities.entities = {'&#160;' : '&nbsp;', '&#161;' : '&iexcl;', '&#162;' : '&cent;', '&#163;' : '&pound;',
                        '&#164;' : '&curren;', '&#165;' : '&yen;', '&#166;' : '&brvbar;', '&#167;' : '&sect;',
                        '&#168;' : '&uml;', '&#169;' : '&copy;', '&#170;' : '&ordf;', '&#171;' : '&laquo;',
                        '&#172;' : '&not;', '&#173;' : '&shy;', '&#174;' : '&reg;', '&#175;' : '&macr;',
                        '&#176;' : '&deg;', '&#177;' : '&plusmn;', '&#178;' : '&sup2;', '&#179;' : '&sup3;',

                        '&#180;' : '&acute;', '&#181;' : '&micro;', '&#182;' : '&para;', '&#183;' : '&middot;',
                        '&#184;' : '&cedil;', '&#185;' : '&sup1;', '&#186;' : '&ordm;', '&#187;' : '&raquo;',
                        '&#188;' : '&frac14;', '&#189;' : '&frac12;', '&#190;' : '&frac34;', '&#191;' : '&iquest;',
                        '&#192;' : '&Agrave;', '&#193;' : '&Aacute;', '&#194;' : '&Acirc;', '&#195;' : '&Atilde;',
                        '&#196;' : '&Auml;', '&#197;' : '&Aring;', '&#198;' : '&AElig;', '&#199;' : '&Ccedil;',
                        '&#200;' : '&Egrave;', '&#201;' : '&Eacute;', '&#202;' : '&Ecirc;', '&#203;' : '&Euml;',
                        '&#204;' : '&Igrave;', '&#205;' : '&Iacute;', '&#206;' : '&Icirc;', '&#207;' : '&Iuml;',
                        '&#208;' : '&ETH;', '&#209;' : '&Ntilde;', '&#210;' : '&Ograve;', '&#211;' : '&Oacute;',
                        '&#212;' : '&Ocirc;', '&#213;' : '&Otilde;', '&#214;' : '&Ouml;', '&#215;' : '&times;',
                        '&#216;' : '&Oslash;', '&#217;' : '&Ugrave;', '&#218;' : '&Uacute;', '&#219;' : '&Ucirc;',
                        '&#220;' : '&Uuml;', '&#221;' : '&Yacute;', '&#222;' : '&THORN;', '&#223;' : '&szlig;',

                        '&#224;' : '&agrave;', '&#225;' : '&aacute;', '&#226;' : '&acirc;', '&#227;' : '&atilde;',
                        '&#228;' : '&auml;', '&#229;' : '&aring;', '&#230;' : '&aelig;', '&#231;' : '&ccedil;',
                        '&#232;' : '&egrave;', '&#233;' : '&eacute;', '&#234;' : '&ecirc;', '&#235;' : '&euml;',
                        '&#236;' : '&igrave;', '&#237;' : '&iacute;', '&#238;' : '&icirc;', '&#239;' : '&iuml;',
                        '&#240;' : '&eth;', '&#241;' : '&ntilde;', '&#242;' : '&ograve;', '&#243;' : '&oacute;',
                        '&#244;' : '&ocirc;', '&#245;' : '&otilde;', '&#246;' : '&ouml;', '&#247;' : '&divide;',
                        '&#248;' : '&oslash;', '&#249;' : '&ugrave;', '&#250;' : '&uacute;', '&#251;' : '&ucirc;',
                        '&#252;' : '&uuml;', '&#253;' : '&yacute;', '&#254;' : '&thorn;', '&#255;' : '&yuml;',

                        '&#402;' : '&fnof;',

                        '&#913;' : '&Alpha;', '&#914;' : '&Beta;', '&#915;' : '&Gamma;', '&#916;' : '&Delta;',
                        '&#917;' : '&Epsilon;', '&#918;' : '&Zeta;', '&#919;' : '&Eta;', '&#920;' : '&Theta;',
                        '&#921;' : '&Iota;', '&#922;' : '&Kappa;', '&#923;' : '&Lambda;', '&#924;' : '&Mu;',
                        '&#925;' : '&Nu;', '&#926;' : '&Xi;', '&#927;' : '&Omicron;', '&#928;' : '&Pi;',
                        '&#929;' : '&Rho;', '&#931;' : '&Sigma;', '&#932;' : '&Tau;',
                        '&#933;' : '&Upsilon;', '&#934;' : '&Phi;', '&#935;' : '&Chi;', '&#936;' : '&Psi;',
                        '&#937;' : '&Omega;',

                        '&#945;' : '&alpha;', '&#946;' : '&beta;', '&#947;' : '&gamma;', '&#948;' : '&delta;',
                        '&#949;' : '&epsilon;', '&#950;' : '&zeta;', '&#951;' : '&eta;', '&#952;' : '&theta;',
                        '&#953;' : '&iota;', '&#954;' : '&kappa;', '&#955;' : '&lambda;', '&#956;' : '&mu;',
                        '&#957;' : '&nu;', '&#958;' : '&xi;', '&#959;' : '&omicron;', '&#960;' : '&pi;',
                        '&#961;' : '&rho;', '&#962;' : '&sigmaf;', '&#963;' : '&sigma;', '&#964;' : '&tau;',
                        '&#965;' : '&upsilon;', '&#966;' : '&phi;', '&#967;' : '&chi;', '&#968;' : '&psi;',
                        '&#969;' : '&omega;', '&#977;' : '&thetasym;', '&#978;' : '&upsih;', '&#982;' : '&piv;',

                        '&#8226;' : '&bull;', '&#8230;' : '&hellip;', '&#8242;' : '&prime;', '&#8243;' : '&Prime;',
                        '&#8254;' : '&oline;', '&#8260;' : '&frasl;', '&#8472;' : '&weierp;', '&#8465;' : '&image;',
                        '&#8476;' : '&real;', '&#8482;' : '&trade;', '&#8501;' : '&alefsym;',

                        '&#8592;' : '&larr;', '&#8593;' : '&uarr;', '&#8594;' : '&rarr;', '&#8595;' : '&darr;',
                        '&#8596;' : '&harr;', '&#8629;' : '&crarr;', '&#8656;' : '&lArr;', '&#8657;' : '&uArr;',
                        '&#8658;' : '&rArr;', '&#8659;' : '&dArr;', '&#8660;' : '&hArr;',

                        '&#8704;' : '&forall;', '&#8706;' : '&part;', '&#8707;' : '&exist;', '&#8709;' : '&empty;',
                        '&#8711;' : '&nabla;', '&#8712;' : '&isin;', '&#8713;' : '&notin;', '&#8715;' : '&ni;',
                        '&#8719;' : '&prod;', '&#8721;' : '&sum;', '&#8722;' : '&minus;', '&#8727;' : '&lowast;',
                        '&#8730;' : '&radic;', '&#8733;' : '&prop;', '&#8734;' : '&infin;', '&#8736;' : '&ang;',
                        '&#8743;' : '&and;', '&#8744;' : '&or;', '&#8745;' : '&cap;', '&#8746;' : '&cup;',
                        '&#8747;' : '&int;', '&#8756;' : '&there4;', '&#8764;' : '&sim;', '&#8773;' : '&cong;',
                        '&#8776;' : '&asymp;', '&#8800;' : '&ne;', '&#8801;' : '&equiv;', '&#8804;' : '&le;',
                        '&#8805;' : '&ge;', '&#8834;' : '&sub;', '&#8835;' : '&sup;', '&#8836;' : '&nsub;',
                        '&#8838;' : '&sube;', '&#8839;' : '&supe;', '&#8853;' : '&oplus;', '&#8855;' : '&otimes;',
                        '&#8869;' : '&perp;', '&#8901;' : '&sdot;',

                        '&#8968;' : '&lceil;', '&#8969;' : '&rceil;', '&#8970;' : '&lfloor;', '&#8971;' : '&rfloor;',
                        '&#9001;' : '&lang;', '&#9002;' : '&rang;', '&#9674;' : '&loz;', '&#9824;' : '&spades;',
                        '&#9827;' : '&clubs;', '&#9829;' : '&hearts;', '&#9830;' : '&diams;',

                        '&#34;' : '&quot;', '&#38;' : '&amp;', '&#60;' : '&lt;', '&#61;' : '&gt;',
                        '&#338;' : '&OElig;', '&#339;' : '&oelig;', '&#352;' : '&Scaron;', '&#353;' : '&scaron;',
                        '&#376;' : '&Yuml;', '&#710;' : '&circ;', '&#732;' : '&tilde;',

                        '&#8194;' : '&ensp;', '&#8195;' : '&emsp;', '&#8201;' : '&thinsp;', '&#8204;' : '&zwnj;',
                        '&#8205;' : '&zwj;', '&#8206;' : '&lrm;', '&#8207;' : '&rlm;', '&#8211;' : '&ndash;',
                        '&#8212;' : '&mdash;', '&#8216;' : '&lsquo;', '&#8217;' : '&rsquo;', '&#8218;' : '&sbquo;',
                        '&#8220;' : '&ldquo;', '&#8221;' : '&rdquo;', '&#8222;' : '&bdquo;', '&#8224;' : '&dagger;',
                        '&#8225;' : '&Dagger;', '&#8240;' : '&permil;', '&#8249;' : '&lsaquo;', '&#8250;' : '&rsaquo;',
                        '&#8364;' : '&euro;'
}

WA.Entities.rentities = null;

WA.Entities.encode = function(str, numeric)
{
  if (WA.isEmpty(str))
    return str;
  var enc = '', c = '';
  for (var i=0, l=str.length; i<l; i++)
  {
    c = str.charAt(i);
    if (c < ' ' || c > '~' || c == '"' || c == '&' || c == '<' || c == '>')
    {
      c = '&#' + c.charCodeAt() + ';';
      if (!numeric && WA.Entities.entities[c])
        c = WA.Entities.entities[c];
    }
    enc += c;
  }
  return enc;
}

WA.Entities.decode = function(str)
{
  if (WA.isEmpty(str))
    return str;

  ent = str.match(/&#[a-zA-Z0-9]{1,8};/g);
  if (ent == null)
    return str;

  // get the reverse array for fast access
  if (WA.Entities.rentities == null)
  {
    for (var i in WA.Entities.entities)
    {
      WA.Entities.rentities[WA.Entities.entities[i]] = i;
    }
  }

  for(var c='', n=0, i=0, l=ent.length; i<l; i++)
  {
    c = ent[i];
    // get the numeric entity
    if (WA.Entities.rentities[c])
      c = WA.Entities.rentities[c];
    if (c.substring(0,2) != '&#')
      continue;
    n = Math.parseInt(c.substring(2, c.length-1), 10);
    if(n >= -32768 && n <= 65535)
    {
      str = str.replace(c, String.fromCharCode(n));
    }
  }

  return str;
}


// color transfer, function to instanciate
WA.RGB = function(color)
{
  var self = this; // for inner functions
  this.ok = false;

  if (color.charAt(0) == '#')
    color = color.substr(1,6);
  color = color.replace(/ /,'').toLowerCase();

  var htmlcolors =
  {
    black: '000000',
    silver: 'c0c0c0',
    gray: '808080',
    white: 'ffffff',
    maroon: '800000',
    red: 'ff0000',
    purple: '800080',
    fuchsia: 'ff00ff',
    green: '008000',
    lime: '00ff00',
    olive: '808000',
    yellow: 'ffff00',
    navy: '000080',
    blue: '0000ff',
    teal: '008080',
    aqua: '00ffff'
  };

  for (var name in htmlcolors)
  {
    if (WA.isString(htmlcolors[name]) && color == name)   // we are only interested by strings
    {
      this.name = color;
      color = htmlcolors[name];
    }
  }

  var rgb = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(color);
  if (rgb)
  {
    this.red = parseInt(rgb[1], 10);
    this.green = parseInt(rgb[2], 10);
    this.blue = parseInt(rgb[3], 10);
    this.ok = true;
  }
  else
  {
    rgb = /^(\w{2})(\w{2})(\w{2})$/.exec(color);
    if (rgb)
    {
      this.red = parseInt(rgb[1], 16);
      this.green = parseInt(rgb[2], 16);
      this.blue = parseInt(rgb[3], 16);
      this.ok = true;
    }
    else
    {
      rgb = /^(\w{1})(\w{1})(\w{1})$/.exec(color);
      if (rgb)
      {
        this.red = parseInt(rgb[1]+rgb[1], 16);
        this.green = parseInt(rgb[2]+rgb[2], 16);
        this.blue = parseInt(rgb[3]+rgb[3], 16);
        this.ok = true;
      }
    }
  }
  this.red = (this.red < 0 || isNaN(this.red)) ? 0 : ((this.red > 255) ? 255 : this.red);
  this.green = (this.green < 0 || isNaN(this.green)) ? 0 : ((this.green > 255) ? 255 : this.green);
  this.blue = (this.blue < 0 || isNaN(this.blue)) ? 0 : ((this.blue > 255) ? 255 : this.blue);

  this.toRGB = toRGB;
  function toRGB()
  {
    return 'rgb(' + self.red + ', ' + self.green + ', ' + self.blue + ')';
  }

  this.toHex = toHex;
  function toHex()
  {
    var red = self.red.toString(16);
    var green = self.green.toString(16);
    var blue = self.blue.toString(16);
    if (red.length == 1) red = '0' + red;
    if (green.length == 1) green = '0' + green;
    if (blue.length == 1) blue = '0' + blue;
    return '#' + red + green + blue;
  }
}


WA.render = function()
{}

WA.render.Integer = function(data, sep)
{
  if (!sep)
    return data;
  // we change the cast
  data = '' + data;
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(data))
	{
		data = data.replace(rgx, '$1' + sep + '$2');
	}
	return data;
}

WA.render.Fixed = function(data, fix, dec, sep)
{
  if (!WA.isNumber(fix)) fix=2;
  if (!dec) dex='.';
  if (!sep) sep = ',';
  data = data.toFixed(fix);
	data += '';
	x = data.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? dec + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
	{
		x1 = x1.replace(rgx, '$1' + sep + '$2');
	}
	return x1 + x2;
}

WA.render.Money = function(data, symbol, fix, dec, sep)
{
  return symbol + WA.render.Fixed(data, fix, dec, sep);
}
