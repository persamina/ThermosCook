/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(e){CKEDITOR.config.jqueryOverrideVal="undefined"==typeof CKEDITOR.config.jqueryOverrideVal?!0:CKEDITOR.config.jqueryOverrideVal,"undefined"!=typeof e&&(e.extend(e.fn,{ckeditorGet:function(){var e=this.eq(0).data("ckeditorInstance");if(!e)throw"CKEditor is not initialized yet, use ckeditor() with a callback.";return e},ckeditor:function(t,n){if(!CKEDITOR.env.isCompatible)throw Error("The environment is incompatible.");if(!e.isFunction(t))var i=n,n=t,t=i;var o=[],n=n||{};this.each(function(){var i=e(this),r=i.data("ckeditorInstance"),a=i.data("_ckeditorInstanceLock"),s=this,l=new e.Deferred;o.push(l.promise()),r&&!a?(t&&t.apply(r,[this]),l.resolve()):a?r.once("instanceReady",function(){setTimeout(function(){r.element?(r.element.$==s&&t&&t.apply(r,[s]),l.resolve()):setTimeout(arguments.callee,100)},0)},null,null,9999):((n.autoUpdateElement||"undefined"==typeof n.autoUpdateElement&&CKEDITOR.config.autoUpdateElement)&&(n.autoUpdateElementJquery=!0),n.autoUpdateElement=!1,i.data("_ckeditorInstanceLock",!0),r=e(this).is("textarea")?CKEDITOR.replace(s,n):CKEDITOR.inline(s,n),i.data("ckeditorInstance",r),r.on("instanceReady",function(n){var o=n.editor;setTimeout(function(){if(o.element){if(n.removeListener(),o.on("dataReady",function(){i.trigger("dataReady.ckeditor",[o])}),o.on("setData",function(e){i.trigger("setData.ckeditor",[o,e.data])}),o.on("getData",function(e){i.trigger("getData.ckeditor",[o,e.data])},999),o.on("destroy",function(){i.trigger("destroy.ckeditor",[o])}),o.on("save",function(){return e(s.form).submit(),!1},null,null,20),o.config.autoUpdateElementJquery&&i.is("textarea")&&e(s.form).length){var r=function(){i.ckeditor(function(){o.updateElement()})};e(s.form).submit(r),e(s.form).bind("form-pre-serialize",r),i.bind("destroy.ckeditor",function(){e(s.form).unbind("submit",r),e(s.form).unbind("form-pre-serialize",r)})}o.on("destroy",function(){i.removeData("ckeditorInstance")}),i.removeData("_ckeditorInstanceLock"),i.trigger("instanceReady.ckeditor",[o]),t&&t.apply(o,[s]),l.resolve()}else setTimeout(arguments.callee,100)},0)},null,null,9999))});var r=new e.Deferred;return this.promise=r.promise(),e.when.apply(this,o).then(function(){r.resolve()}),this.editor=this.eq(0).data("ckeditorInstance"),this}}),CKEDITOR.config.jqueryOverrideVal&&(e.fn.val=CKEDITOR.tools.override(e.fn.val,function(t){return function(n){if(arguments.length){var i=this,o=[],r=this.each(function(){var i=e(this),r=i.data("ckeditorInstance");if(i.is("textarea")&&r){var a=new e.Deferred;return r.setData(n,function(){a.resolve()}),o.push(a.promise()),!0}return t.call(i,n)});if(o.length){var a=new e.Deferred;return e.when.apply(this,o).done(function(){a.resolveWith(i)}),a.promise()}return r}var r=e(this).eq(0),s=r.data("ckeditorInstance");return r.is("textarea")&&s?s.getData():t.call(r)}})))}(window.jQuery);