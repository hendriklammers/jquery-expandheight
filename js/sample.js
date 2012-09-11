    KinderopvangMyrna.news = (function() {

        var moreLabel = 'Lees verder', lessLabel = 'Sluit', lineHeight = 24, maxHeight = 6 * lineHeight;

        function addExpand() {
            // Add expand functionality to news messages that exceed a certain height
            $('#news div.expand').each(function() {
                var self = $(this);
                if (self.height() > maxHeight) {
                    // Add initial height to data and set new height
                    // Remove 1 line-height to make up for expand button
                    self.data('height', self.height()).css({
                        height: maxHeight - lineHeight,
                        'overflow': 'hidden'
                    });
                    // Add expand button
                    self.after(new ExpandButton(self));
                }
            });

        }

        /*
         * Returns a container with an expand and collapse link.
         */
        function ExpandButton(elem) {
            // Expand link
            var moreLink = $('<a>', {
                href: '#',
                text: moreLabel,
                class: 'more'
            }).on('click', function(event) {
                event.preventDefault();

                // Switch links
                $(this).hide();
                lessLink.show();

                // Animate div to initial height set in data attribute
                elem.animate({
                    height: elem.data('height')
                }, {
                    duration: 250,
                    queue: false,
                    easing: 'easeOutSine'
                });
            });
            // Collapse link, will be hidden by default
            var lessLink = $('<a>', {
                href: '#',
                text: lessLabel,
                class: 'less'
            }).on('click', function(event) {
                event.preventDefault();

                // Switch links
                $(this).hide();
                moreLink.show();

                // Animate div to initial height set in data attribute
                elem.animate({
                    height: maxHeight - lineHeight
                }, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutSine'
                });
            }).hide();

            return $('<div>', {
                class: 'expand-button'
            }).append(moreLink).append(lessLink);
        }

        return {
            init: function() {
                addExpand();
            }

        };

    })();