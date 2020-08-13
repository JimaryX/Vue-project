let raf = null;
function requestAnimationFrame(callback) {
    if (!raf) {
        raf = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                return setTimeout(callback, 16);
            }
        ).bind(window);
    }
    return raf(callback);
}

let caf = null;
function cancelAnimationFrame(id) {
    if (!caf) {
        caf = (
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function(id) {
                clearTimeout(id);
            }
        ).bind(window);
    }

    caf(id);
}

function createStyles(styleText) {
    var style = document.createElement("style");
    style.type = "text/css";

    if (style.styleSheet) {
        style.styleSheet.cssText = styleText;
    } else {
        style.appendChild(document.createTextNode(styleText));
    }
    (document.querySelector("head") || document.body).appendChild(style);
    return style;
}

function createElement(tagName, props = {}) {
    const elem = document.createElement(tagName);
    Object.keys(props).forEach(key => {
        elem[key] = props[key];
    });
    return elem;
}

function getComputedStyle(elem, prop, pseudo) {
    // for older versions of Firefox, `getComputedStyle` required
    // the second argument and may return `null` for some elements
    // when `display: none`
    const computedStyle = window.getComputedStyle(elem, pseudo || null) || {
        display: "none"
    };

    return computedStyle[prop];
}

function getRenderInfo(elem) {
    if (!document.documentElement.contains(elem)) {
        return {
            detached: true,
            rendered: false
        };
    }

    let current = elem;
    while (current !== document) {
        if (getComputedStyle(current, "display") === "none") {
            return {
                detached: false,
                rendered: false
            };
        }
        current = current.parentNode;
    }

    return {
        detached: false,
        rendered: true
    };
}

var css =
    '.resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}';

let total = 0;
let style = null;

function addListener(elem, callback) {
    if (!elem.__resize_mutation_handler__) {
        elem.__resize_mutation_handler__ = handleMutation.bind(elem);
    }

    const listeners = elem.__resize_listeners__;

    if (!listeners) {
        elem.__resize_listeners__ = [];
        if (window.ResizeObserver) {
            const { offsetWidth, offsetHeight } = elem;
            const ro = new ResizeObserver(() => {
                if (!elem.__resize_observer_triggered__) {
                    elem.__resize_observer_triggered__ = true;
                    if (
                        elem.offsetWidth === offsetWidth &&
                        elem.offsetHeight === offsetHeight
                    ) {
                        return;
                    }
                }
                runCallbacks(elem);
            });

            // initially display none won't trigger ResizeObserver callback
            const { detached, rendered } = getRenderInfo(elem);
            elem.__resize_observer_triggered__ =
                detached === false && rendered === false;
            elem.__resize_observer__ = ro;
            ro.observe(elem);
        } else if (elem.attachEvent && elem.addEventListener) {
            // targeting IE9/10
            elem.__resize_legacy_resize_handler__ = function handleLegacyResize() {
                runCallbacks(elem);
            };
            elem.attachEvent("onresize", elem.__resize_legacy_resize_handler__);
            document.addEventListener(
                "DOMSubtreeModified",
                elem.__resize_mutation_handler__
            );
        } else {
            if (!total) {
                style = createStyles(css);
            }
            initTriggers(elem);

            elem.__resize_rendered__ = getRenderInfo(elem).rendered;
            if (window.MutationObserver) {
                const mo = new MutationObserver(elem.__resize_mutation_handler__);
                mo.observe(document, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
                elem.__resize_mutation_observer__ = mo;
            }
        }
    }

    elem.__resize_listeners__.push(callback);
    total++;
}

function removeListener(elem, callback) {
    // targeting IE9/10
    if (elem.detachEvent && elem.removeEventListener) {
        elem.detachEvent("onresize", elem.__resize_legacy_resize_handler__);
        document.removeEventListener(
            "DOMSubtreeModified",
            elem.__resize_mutation_handler__
        );
        return;
    }

    const listeners = elem.__resize_listeners__;
    if (!listeners) {
        return;
    }
    listeners.splice(listeners.indexOf(callback), 1);

    if (!listeners.length) {
        if (elem.__resize_observer__) {
            elem.__resize_observer__.unobserve(elem);
            elem.__resize_observer__.disconnect();
            elem.__resize_observer__ = null;
        } else {
            if (elem.__resize_mutation_observer__) {
                elem.__resize_mutation_observer__.disconnect();
                elem.__resize_mutation_observer__ = null;
            }
            elem.removeEventListener("scroll", handleScroll);
            elem.removeChild(elem.__resize_triggers__.triggers);
            elem.__resize_triggers__ = null;
        }
        elem.__resize_listeners__ = null;
    }

    if (!--total && style) {
        style.parentNode.removeChild(style);
    }
}

function getUpdatedSize(elem) {
    const { width, height } = elem.__resize_last__;
    const { offsetWidth, offsetHeight } = elem;
    if (offsetWidth !== width || offsetHeight !== height) {
        return {
            width: offsetWidth,
            height: offsetHeight
        };
    }
    return null;
}

function handleMutation() {
    // `this` denotes the scrolling element
    const { rendered, detached } = getRenderInfo(this);
    if (rendered !== this.__resize_rendered__) {
        if (!detached && this.__resize_triggers__) {
            resetTriggers(this);
            this.addEventListener("scroll", handleScroll, true);
        }
        this.__resize_rendered__ = rendered;
        runCallbacks(this);
    }
}

function handleScroll() {
    // `this` denotes the scrolling element
    resetTriggers(this);
    if (this.__resize_raf__) {
        cancelAnimationFrame(this.__resize_raf__);
    }
    this.__resize_raf__ = requestAnimationFrame(() => {
        const updated = getUpdatedSize(this);
        if (updated) {
            this.__resize_last__ = updated;
            runCallbacks(this);
        }
    });
}

function runCallbacks(elem) {
    if (!elem || !elem.__resize_listeners__) {
        return;
    }
    elem.__resize_listeners__.forEach(callback => {
        callback.call(elem);
    });
}

function initTriggers(elem) {
    const position = getComputedStyle(elem, "position");
    if (!position || position === "static") {
        elem.style.position = "relative";
    }

    elem.__resize_old_position__ = position;
    elem.__resize_last__ = {};

    const triggers = createElement("div", {
        className: "resize-triggers"
    });
    const expand = createElement("div", {
        className: "resize-expand-trigger"
    });
    const expandChild = createElement("div");
    const contract = createElement("div", {
        className: "resize-contract-trigger"
    });
    expand.appendChild(expandChild);
    triggers.appendChild(expand);
    triggers.appendChild(contract);
    elem.appendChild(triggers);

    elem.__resize_triggers__ = {
        triggers,
        expand,
        expandChild,
        contract
    };

    resetTriggers(elem);
    elem.addEventListener("scroll", handleScroll, true);

    elem.__resize_last__ = {
        width: elem.offsetWidth,
        height: elem.offsetHeight
    };
}

function resetTriggers(elem) {
    const { expand, expandChild, contract } = elem.__resize_triggers__;

    // batch read
    const { scrollWidth: csw, scrollHeight: csh } = contract;
    const {
        offsetWidth: eow,
        offsetHeight: eoh,
        scrollWidth: esw,
        scrollHeight: esh
    } = expand;

    // batch write
    contract.scrollLeft = csw;
    contract.scrollTop = csh;
    expandChild.style.width = eow + 1 + "px";
    expandChild.style.height = eoh + 1 + "px";
    expand.scrollLeft = esw;
    expand.scrollTop = esh;
}

export { addListener, removeListener };
