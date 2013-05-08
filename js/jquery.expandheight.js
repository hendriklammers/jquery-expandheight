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

// TODO: Use the CSS property text-overflow
// TODO: Add option to use an image or $ element as button
// TODO: Test in IE and mobile browsers
;(function ($, window, undefined) {

    var pluginName = 'expandHeight',
        document = window.document,
        defaults = {
            moreLabel: 'More',
            lessLabel: 'Less',
            lineHeight: 24,
            maxLines: 6,
            easing: 'swing',
            duration: 300
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        // Set lineHeight if user left lineHeight option to auto
        if (this.options.lineHeight === 'auto') {
            this.options.lineHeight = this.element.css('line-height');
        }
        this.maxHeight = this.options.maxLines * this.options.lineHeight;
        this.originalHeight = this.element.height();

        // Only continue when the text height is bigger than the maxHeight
        if (this.originalHeight > this.maxHeight) {
            // Add initial height to data and set new height
            // Remove 1 line-height to make up for expand button
            this.element.css({
                height: this.maxHeight - this.options.lineHeight,
                'overflow': 'hidden'
            });
            // Create the expand button
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

            // Switch links
            $(this).hide();
            lessLink.show();

            // // Animate div to expanded height
            self.element.animate({
                height: self.originalHeight
            }, {
                duration: self.options.duration,
                queue: false,
                easing: self.options.easing
            });
        });

        // Collapse link, will be hidden by default
        var lessLink = $('<a>', {
            href: '#',
            text: this.options.lessLabel,
            class: 'less'
        }).on('click', function (event) {
            event.preventDefault();

            // // Switch links
            $(this).hide();
            moreLink.show();

            // // Animate div to collapsed height
            self.element.animate({
                height: self.maxHeight - self.options.lineHeight
            }, {
                duration: self.options.duration,
                queue: false,
                easing: self.options.easing
            });
        }).hide();

        // Container holding the 2 links
        var button = $('<div>', {
            class: 'expand-button'
        }).append(moreLink).append(lessLink);

        // Add button below the text
        this.element.after(button);
    };

    $.fn.expandHeight = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_expandHeight')) {
                $.data(this, 'plugin_expandHeight', new Plugin(this, options));
            }
        });
    };

}(jQuery, window));