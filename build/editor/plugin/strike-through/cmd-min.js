/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Sep 24 15:22
*/
KISSY.add("editor/plugin/strike-through/cmd",function(d,a,b){var c=new a.Style({element:"del",overrides:[{element:"span",attributes:{style:"text-decoration: line-through;"}},{element:"s"},{element:"strike"}]});return{init:function(a){b.addButtonCmd(a,"strikeThrough",c)}}},{requires:["editor","../font/cmd"]});
