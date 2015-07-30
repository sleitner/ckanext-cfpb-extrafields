"use strict";

ckan.module('create_edit_resource', function ($, _) {
    return {
        initialize: function () {
            $.proxyAll(this, /_on/);
            this.el.on('click', this._onClick);
        },
        _onClick: function(event) {
            this.sandbox.client.getTemplate(this.options.html,
                                            this.options,
                                            this._onReceiveSnippet);
        },
        _onReceiveSnippet: function(html) {
            window.location.href = html
        },
    }
});