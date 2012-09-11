/*
 * expandHeight - jQuery plugin
 * Add a read more button when text exceeds a certain height
 * Version 0.1
 *
 * Copyright (c) 2012 Hendrik Lammers
 * http://www.hendriklammers.com
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 */

;(function ($, window, undefined) {

    // Create the defaults once
    var pluginName = 'expandHeight',
        document = window.document,
        defaults = {
            moreLabel: 'Lees verder',
            lessLabel: 'Sluit',
            lineHeight: 24,
            maxLines: 6,
            easing: 'swing'
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        this.maxHeight = this.options.maxLines * this.options.lineHeight;

        if (this.element.height() > this.maxHeight) {
            // Add initial height to data and set new height
            // Remove 1 line-height to make up for expand button
            this.element.data('height', this.element.height()).css({
                height: this.maxHeight - this.options.lineHeight,
                'overflow': 'hidden'
            });
            // Add expand button
            // this.element.after(new ExpandButton(this.element));
            this.createButton();
        }
    };

    Plugin.prototype.createButton = function () {

        var self = this;

        // Expand link
        var moreLink = $('<a>', {
            href: '#',
            text: this.options.moreLabel,
            class: 'more'
        }).on('click', function (event) {
            event.preventDefault();
            console.log($(this).parent());

            // Switch links
            $(this).hide();
            lessLink.show();

            // // Animate div to initial height set in data attribute
            self.element.animate({
                height: self.element.data('height')
            }, {
                duration: 250,
                queue: false,
                easing: 'swing'
            });
        });

        // Collapse link, will be hidden by default
        var lessLink = $('<a>', {
            href: '#',
            text: this.options.lessLabel,
            class: 'less'
        }).on('click', function (event) {
            event.preventDefault();
            console.log(self.options.maxHeight - self.options.lineHeight);

            // // Switch links
            $(this).hide();
            moreLink.show();

            // // Animate div to initial height set in data attribute
            self.element.animate({
                height: self.options.maxHeight - self.options.lineHeight
            }, {
                duration: 300,
                queue: false,
                easing: 'swing'
            });
        }).hide();

        var button = $('<div>', {
            class: 'expand-button'
        }).append(moreLink).append(lessLink);

        this.element.after(button);
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery, window));