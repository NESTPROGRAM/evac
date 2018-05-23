/**
 * Created by xorgnz on 2017-04-02.
 */

class StyleSugar {
    static hide(element) {
        if (element.style.display)
            element.oldDisplay = element.style.display;

        element.style.display = "none";
    }

    //noinspection JSUnusedGlobalSymbols
    static show(element) {
        if (element.oldDisplay)
            element.style.display = element.oldDisplay;
        else
            element.style.display = "";
    }

    //noinspection JSUnusedGlobalSymbols
    static addClass(element, className) {
        if (!element instanceof HTMLElement)
            throw new Error("Can't add class to non-element");

        element.className = " " + element.className + " ";
        if (!element.className.includes(" " + className + " ")) {
            element.className += className;
            element.className = element.className.trim();
        }
    }

    //noinspection JSUnusedGlobalSymbols
    static clearClasses(element) {
        if (!element instanceof HTMLElement)
            throw new Error("Can't clear classes from non-element");

        element.className = "";
    }

    //noinspection JSUnusedGlobalSymbols
    static removeClass(element, className) {
        if (!element instanceof HTMLElement)
            throw new Error("Can't remove class from non-element");

        element.className = " " + element.className + " ";
        element.className = element.className.replace(" " + className, "");
        element.className = element.className.trim();
    }
}