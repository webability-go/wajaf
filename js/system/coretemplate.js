
WA.templates = {};
WA.templatesstrings = {};
WA.codes = {};

WA.templater = function (strings, ...keys) {
    function searchdata(data, key) {
        if ((pos = key.indexOf(">")) != -1) {
            first = key.substr(0, pos);
            val = data[first];
            if (WA.isArray(val) || WA.isObject(val) || WA.isFunction(val))
                return searchdata(val, key.substr(pos + 1))
            return undefined;
        }
        if (data)
            return data[key];
        return null;
    }
    function searchdatapile(datapile, key) {
        if (!key)
            return '';
        for (var i = datapile.length - 1; i >= 0; i--) {
            var val = searchdata(datapile[i], key);
            if (val !== undefined)
                return val;
        }
        return '';
    }
    function loop(templates, datapile, data, template) {
        if (!templates)
            templates = WA.templates;
        if (!data || !WA.isArray(data) || data.length == 0) {
            if (templates[template + ".none"])
                return templates[template + ".none"](datapile, templates);
            return "<!-- Template " + template + ".none not found for loop -->";
        }
        txt = "";
        for (var i = 0; i < data.length; i++) {
            datapile.push(data[i]);
            if (templates[template + ".key." + i])
                txt += templates[template + ".key." + i](datapile, templates);
            else if (i == 0 && templates[template + ".first"])
                txt += templates[template + ".first"](datapile, templates);
            else if (i == data.length - 1 && templates[template + ".last"])
                txt += templates[template + ".last"](datapile, templates);
            else if (i % 2 == 0 && templates[template + ".even"])
                txt += templates[template + ".even"](datapile, templates);
            else if (templates[template])
                txt += templates[template](datapile, templates);
            else
                txt += "<!-- Template " + template + " not found for loop -->";
            datapile.pop();
        }
        return txt;
    }
    function cond(templates, field, template, datapile) {
        if (!templates)
            templates = WA.templates;

        val = searchdatapile(datapile, field);
        var pushed = false;
        if (val != null && (WA.isArray(val) || WA.isObject(val) || WA.isFunction(val))) {
            pushed = true;
            datapile.push(val);
        }
        if (!val && templates[template + ".none"])
            text = templates[template + ".none"](datapile, templates);
        else if (val && templates[template + "." + val])
            text = templates[template + "." + val](datapile, templates);
        else if (templates[template])
            text = templates[template](datapile, templates);
        else
            text = "<!-- Template " + template + " not found for cond -->";
        if (pushed)
            datapile.pop();

        return text;
    }
    function call(templates, template, data) {
        if (!templates)
            templates = WA.templates;
        if (templates[template])
            return templates[template](data, templates);
        return "<!-- Template " + template + " not found for call -->";
    }

    return function (data, templates) {
        let temp = strings.slice();
        let datapile = data
        if (!WA.isArray(data))
            datapile = [data];
        keys.forEach((key, i) => {
            if (Array.isArray(key)) {
                switch (key[0]) {
                    case "eval":
                        temp[i] = temp[i] + eval(key[1]);
                        break;
                    case "loop":
                        val = searchdatapile(datapile, key[1]);
                        if (!WA.isArray(val))
                            val = undefined;
                        temp[i] = temp[i] + loop(templates, datapile, val, key[2] ? key[2] : key[1]);
                        break;
                    case "cond":
                        temp[i] = temp[i] + cond(templates, key[1], key[2], datapile);
                        break;
                    case "call":
                        if (key[3]) {
                            template = key[3] + searchdatapile(datapile, key[2]);
                            temp[i] = temp[i] + call(templates, template, datapile);
                        }
                        else {
                            val = searchdatapile(datapile, key[2]);
                            var pushed = false;
                            if (WA.isArray(val) || WA.isObject(val) || WA.isFunction(val)) {
                                pushed = true;
                                datapile.push(val);
                            }
                            temp[i] = temp[i] + call(templates, key[1], datapile);
                            if (pushed)
                                datapile.pop();
                        }
                        break;
                    default:
                        temp[i] = temp[i] + "<!-- Parameter not recognized " + key[0] + " -->";
                }
            }
            else {
                temp[i] = temp[i] + searchdatapile(datapile, key);
            }
        });
        return temp.join('');
    }
};

WA.XTemplate = function (temps) {

    var templates = temps

    return function run(data) {
        return templates.main(data, templates);
    }
}
