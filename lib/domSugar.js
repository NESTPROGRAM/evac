class DOMSugar {

    static a(href, content, id, className, style, target, onclick) {
        // Create element
        let elem  = this._simpleElement("a", content, id, className, style);
        elem.href = href;

        // Set target, if provided
        if (typeof(target) === "string")
            elem.target = target;

        // Set onclick event, if provided
        if (typeof(onclick) === "function")
            elem.onclick = onclick;
        else if (typeof(onclick) === "string")
            elem.onclick = Function(onclick);

        return elem;
    };

    static br(clear) {
        let elem = document.createElement("br");

        if (typeof(clear) === "string")
            elem.clear = clear;

        return elem;
    };

    static button(content, id, className, style, onclick) {
        let elem = DOMSugar._simpleElement("button", content, id, className, style);

        if (typeof(onclick) === "function")
            elem.onclick = onclick;

        return elem;
    };

    static clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    static div(content, id, className, style, onclick) {
        let elem = DOMSugar._simpleElement("div", content, id, className, style);

        if (typeof(onclick) === "function")
            elem.onclick = onclick;

        return elem;
    };


    // DOMUtils.fieldset = function (className, id, text, label)
    // {
    //     var fieldset = document.createElement("fieldset");
    //
    //     if (text)
    //         fieldset.appendChild(document.createTextNode(text));
    //
    //     if (label)
    //     {
    //         var legend = document.createElement("legend");
    //         legend.appendChild(document.createTextNode(label));
    //         fieldset.appendChild(legend);
    //         fieldset.legend = legend;
    //     }
    //
    //     if (id)
    //         fieldset.id = id;
    //
    //     if (className)
    //         fieldset.className = className;
    //
    //     return fieldset;
    // };

    static h(level, content, id, className, style) {
        level = typeof(level) === "string" || typeof(level) === "number" ? level : 1;
        return DOMSugar._simpleElement("h" + level, content, id, className, style);
    };

    static img(src, id, className, style, attributes) {
        let elem = this._simpleElement("img", null, id, className, style);

        if (typeof(src) === "string")
            elem.src = src;

        for (let k in attributes) {
            //noinspection JSUnfilteredForInLoop
            elem.setAttribute(k, attributes[k]);
        }

        return elem;
    };

    static input(name, value, type, style, attributes)
    {
        let elem = document.createElement("input");
        elem.setAttribute("name", name);
        elem.setAttribute("value", value);
        elem.setAttribute("type", type);

        if (style != null)
            elem.setAttribute("style", style);

        for (let att in attributes)
            elem.setAttribute(att, attributes[att]);

        return elem;
    };

    static textarea(name, content, id, className, style) {
        let elem = this._simpleElement("textarea", content, id, className, style);
        elem.setAttribute("name", name);
        return elem;
    }


    // DOMUtils.input_range = function(name, value, min, max, step, style)
    // {
    //     var node = document.createElement("input");
    //     node.setAttribute("name", name);
    //     node.setAttribute("value", value);
    //     node.setAttribute("type", "range");
    //     node.setAttribute("min", min);
    //     node.setAttribute("max", max);
    //     node.setAttribute("step", step);
    //
    //     if (style != null)
    //         node.setAttribute("style", style);
    //
    //     return node;
    //
    // };

    //
    //
    //
    //
    // static input_radio = function (name, checked, id)
    // {
    //     var radio = document.createElement("input");
    //
    //     radio.type = "radio";
    //     radio.name = name;
    //     if (checked)
    //         radio.checked = true;
    //     if (id)
    //         radio.id = id;
    //
    //     return radio;
    // };

    // DOMUtils.label = function(text, _for)
    // {
    //     var label = document.createElement("label");
    //     label.innerHTML = text;
    //
    //     if (_for)
    //         label.htmlFor = _for;
    //
    //     return label;
    // };


    static p(content, id, className, style) {
        return DOMSugar._simpleElement("p", content, id, className, style);
    };

    // // Create an HTML select box:
    // // - name           - form name. Can be ""
    // // - objects        - list of objects to use in creating select
    // // - val_func       - Fn - extract value for select option from object
    // // - label_func     - Fn - extract label for select option from object
    // // - default_value  - default value. If null, use first in list
    // DOMUtils.select = function (name, objects, val_func, label_func, default_value)
    // {
    //     var select = document.createElement("select");
    //     select.name = name;
    //
    //     for (var i = 0 ; i < objects.length ; i ++)
    //     {
    //         var val = val_func(objects[i]);
    //         var label = label_func(objects[i]);
    //         var selected = false;
    //         if (default_value !== null && val == default_value)
    //             selected = true;
    //
    //         select.appendChild(DOMUtils.option(val, label, selected));
    //     }
    //
    //     return select;
    // };

    // DOMUtils.option = function (value, text, selected)
    // {
    //     var option = document.createElement("option");
    //
    //     option.value = value;
    //
    //     if (text)
    //         option.innerHTML = text;
    //     else
    //         option.innerHTML = "No label";
    //
    //     if (selected)
    //         option.selected = true;
    //
    //     return option;
    // };


    //noinspection JSUnusedGlobalSymbols
    static span(content, id, className, style) {
        return DOMSugar._simpleElement("span", content, id, className, style);
    };


    // static table = function (headers, className, headerClasses) {
    //     // Validate
    //     if (headerClasses && headers.length != headerClasses.length)
    //         throw ("DOMUtils.table - array lengths mismatch");
    //
    //     // Create table
    //     let table = document.createElement("table");
    //     if (className)
    //         $(table).addClass(className);
    //
    //     // Create headers
    //     let tr = document.createElement("tr");
    //     for (let i = 0; i < headers.length; i++) {
    //         // Create header cell
    //         let th = document.createElement("th");
    //         th.appendChild(document.createTextNode(headers[i]));
    //         tr.appendChild(th);
    //
    //         // Style header cell
    //         if (headerClasses)
    //             $(th).addClass(headerClasses[i]);
    //     }
    //     table.appendChild(tr);
    //
    //     return table;
    // };

    //noinspection JSUnusedGlobalSymbols
    static td(content, id, className, style, attributes) {
        let elem = DOMSugar._simpleElement("td", content, id, className, style);

        for (let k in attributes) {
            //noinspection JSUnfilteredForInLoop
            elem.setAttribute(k, attributes[k]);
        }

        return elem;
    };

    //noinspection JSUnusedGlobalSymbols
    static tr(content, id, className, style) {
        return DOMSugar._simpleElement("tr", content, id, className, style);
    };

    //noinspection JSUnusedGlobalSymbols
    static tr_populate(contents, ids, classNames, styles, attributes) {
        // Validate
        let len = contents.length;
        if (!Array.isArray(contents))
            throw "Validation failed - Contents array is not an array";
        if (ids && len !== ids.length)
            throw "Validation failed - expected " + len + " ids, got " + ids.length;
        if (classNames && len !== classNames.length)
            throw "Validation failed - expected " + len + " classNames, got " + classNames.length;
        if (styles && len !== styles.length)
            throw "Validation failed - expected " + len + " styles, got " + styles.length;
        if (attributes && len !== attributes.length)
            throw "Validation failed - expected " + len + " attribute sets, got " + attributes.length;

        // Create table cells from given contents
        let elem = document.createElement("tr");

        // Create table cells
        for (let i = 0; i < contents.length; i++) {
            let td = DOMSugar.td(
                contents[i],
                Array.isArray(ids) ? ids[i] : "",
                Array.isArray(classNames) ? classNames[i] : "",
                Array.isArray(styles) ? styles[i] : "",
                Array.isArray(attributes) ? attributes[i] : "");

            elem.appendChild(td);
        }

        return elem;
    };

    static _simpleElement(type, content, id, className, style) {
        let elem = document.createElement(type);

        if (typeof(content) === "string" || typeof(content) === "number")
            elem.innerHTML = content;
        else if (content !== null)
            elem.appendChild(content);

        if (typeof(id) === "string")
            elem.id = id;

        if (typeof(className) === "string")
            elem.className = className;

        if (typeof(style) === "string")
            elem.setAttribute("style", style);

        return elem;
    };
}