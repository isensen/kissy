/**
 * @ignore
 * @fileOverview drag extension for position
 * @author yiminghe@gmail.com
 */
KISSY.add("component/uibase/drag", function (S) {

    /**
     * @class KISSY.Component.UIBase.Drag
     * Drag extension class. Make element draggable.
     */
    function Drag() {
    }

    Drag.ATTRS = {
        /**
         * Whether current element is draggable and draggable config.
         * @cfg {Boolean|Object} draggable
         *
         * for example:
         *      @example
         *      {
         *          proxy:{
         *              // see {@link KISSY.DD.Proxy}
         *          },
         *          scroll:{
         *              // see {@link KISSY.DD.Scroll}
         *          },
         *          constrain:{
         *              // see {@link KISSY.DD.Constrain}
         *          },
         *      }
         */
        /**
         * @ignore
         */
        draggable: {
            setter: function (v) {
                if (v === true) {
                    return {};
                }
            },
            value: {}
        }
    };

    Drag.prototype = {

        _uiSetDraggable: function (dragCfg) {
            var self = this,
                handlers,
                DD = S.require("dd"),
                Draggable,
                p,
                d = self.__drag,
                __constrain = self.__constrain,
                el = self.get("el");

            if (dragCfg && !d && DD) {

                Draggable = DD.Draggable;

                d = self.__drag = new Draggable({
                    node: el,
                    move: 1
                });

                if (dragCfg.proxy) {
                    dragCfg.proxy.moveOnEnd = true;

                    p = self.__proxy = new DD.Proxy(dragCfg.proxy);
                    p.attachDrag(d);
                }

                __constrain = self.__constrain = new DD.Constrain().attachDrag(d);

                d.on("dragend", function () {
                    var proxyOffset;
                    proxyOffset = el.offset();
                    self.set("x", proxyOffset.left);
                    self.set("y", proxyOffset.top);
                    // 存在代理时
                    if (p) {
                        el.css("visibility", "visible");
                    }
                });

                if (dragCfg.scroll) {
                    var s = self.__scroll = new DD.Scroll(dragCfg.scroll);
                    s.attachDrag(d);
                }

            }

            if (d) {
                d.set("disabled", !dragCfg);
            }

            if (dragCfg && d) {
                handlers = dragCfg.handlers;
                if ("constrain" in dragCfg) {
                    __constrain.set("constrain", dragCfg.constrain);
                } else {
                    __constrain.set("constrain", false);
                }
                if (handlers && handlers.length > 0) {
                    d.set("handlers", handlers);
                }
            }
        },

        __destructor: function () {
            var self = this,
                p = self.__proxy,
                s = self.__scroll,
                __constrain = self.__constrain,
                d = self.__drag;
            s && s.destroy();
            p && p.destroy();
            __constrain && __constrain.destroy();
            d && d.destroy();
        }

    };

    return Drag;

});