function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng($('#map').attr('data-lat'), $('#map').attr('data-lng')),
          zoom: 13,
           zoomControl: true,
           scrollwheel: false,
           mapTypeControl: false,
           streetViewControl: false,
  		   zoomControlOptions: {
           style: google.maps.ZoomControlStyle.SMALL
  		   },
          panControl: false,
    	  scaleControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
         var geolocpoint = new google.maps.LatLng($('#map').attr('data-lat'), $('#map').attr('data-lng'));
          map.setCenter(geolocpoint );

var citymap = {
 
     center: {lat: parseFloat($('#map').attr('data-lat')), lng: parseFloat($('#map').attr('data-lng')) }
 
};

    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: '#11848E',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#7FDDC4',
      fillOpacity: 0.35,
      map: map,
      center: citymap['center'],
      radius: 1000
    });

      }
      google.maps.event.addDomListener(window, 'load', initialize);

      //------------rooms slider--------------//

      // jQuery-ad-gallery.js

$(function() {
    var galleries = $('.ad-gallery').adGallery({
      height: 400, 
      effect : 'fade',
     // captions : 'Gallery Caption'
    });
  });

      (function($) {

    $.fn.adGallery = function(options) {

        var defaults = {
            loader_image: 'loader.gif',
            start_at_index: 0,
            update_window_hash: true,
            description_wrapper: false,
            thumb_opacity: 0.7,
            animate_first_image: false,
            animation_speed: 400,
            width: false,
            height: false,
            display_next_and_prev: true,
            display_back_and_forward: true,
            scroll_jump: 0, // If 0, it jumps the width of the container
           // captions : 'Default Caption',
            slideshow: {
                enable: true,
                autostart: false,
                speed: 5000,
                start_label: 'Start',
                stop_label: 'Stop',
                stop_on_scroll: true,
                countdown_prefix: '(',
                countdown_sufix: ')',
                onStart: false,
                onStop: false
            },
            effect: 'slide-hori', // or 'slide-vert', 'fade', or 'resize', 'none'
            enable_keyboard_move: true,
            cycle: true,
            hooks: {
                displayDescription: false
            },
            callbacks: {
                init: false,
                afterImageVisible: false,
                beforeImageVisible: false
            }
        };
        var settings = $.extend(false, defaults, options);
        if (options && options.slideshow) {
            settings.slideshow = $.extend(false, defaults.slideshow, options.slideshow);
        }
        ;
        if (!settings.slideshow.enable) {
            settings.slideshow.autostart = false;
        }
        ;

        $('.ad-thumbs').css('top', '0px');
        setTimeout(function() {
            $('.ad-thumbs').css('top', '90px');
        }, 4000);
        $('.ad-nav').hover(function() {
            $('.ad-thumbs').css('top', '0px');
        }, 
        function() {
            $('.ad-thumbs').css('top', '90px');
        });
        var galleries = [];
        $(this).each(function() {
            var gallery = new AdGallery(this, settings);
            galleries[galleries.length] = gallery;
        });
        // Sorry, breaking the jQuery chain because the gallery instances
        // are returned so you can fiddle with them
        return galleries;
    };

    function VerticalSlideAnimation(img_container, direction, desc) {
        var current_top = parseInt(img_container.css('top'), 10);
        if (direction == 'left') {
            var old_image_top = '-' + this.image_wrapper_height + 'px';
            img_container.css('top', this.image_wrapper_height + 'px');
        } else {
            var old_image_top = this.image_wrapper_height + 'px';
            img_container.css('top', '-' + this.image_wrapper_height + 'px');
        }
        ;
        if (desc) {
            desc.css('bottom', '-' + desc[0].offsetHeight + 'px');
            desc.animate({
                bottom: 0
            }, this.settings.animation_speed * 2);
        }
        ;
        if (this.current_description) {
            this.current_description.animate({
                bottom: '-' + this.current_description[0].offsetHeight + 'px'
            }, this.settings.animation_speed * 2);
        }
        ;
        return {
            old_image: {
                top: old_image_top
            },
            new_image: {
                top: current_top
            }
        };
    }
    ;

    function HorizontalSlideAnimation(img_container, direction, desc) {
        var current_left = parseInt(img_container.css('left'), 10);
        if (direction == 'left') {
            var old_image_left = '-' + this.image_wrapper_width + 'px';
            img_container.css('left', this.image_wrapper_width + 'px');
        } else {
            var old_image_left = this.image_wrapper_width + 'px';
            img_container.css('left', '-' + this.image_wrapper_width + 'px');
        }
        ;
        if (desc) {
            desc.css('bottom', '-' + desc[0].offsetHeight + 'px');
            desc.animate({
                bottom: 0
            }, this.settings.animation_speed * 2);
        }
        ;
        if (this.current_description) {
            this.current_description.animate({
                bottom: '-' + this.current_description[0].offsetHeight + 'px'
            }, this.settings.animation_speed * 2);
        }
        ;
        return {
            old_image: {
                left: old_image_left
            },
            new_image: {
                left: current_left
            }
        };
    }
    ;

    function ResizeAnimation(img_container, direction, desc) {
        var image_width = img_container.width();
        var image_height = img_container.height();
        var current_left = parseInt(img_container.css('left'), 10);
        var current_top = parseInt(img_container.css('top'), 10);
        img_container.css({
            width: 0,
            height: 0,
            top: this.image_wrapper_height / 2,
            left: this.image_wrapper_width / 2
        });
        return {
            old_image: {
                width: 0,
                height: 0,
                top: this.image_wrapper_height / 2,
                left: this.image_wrapper_width / 2
            },
            new_image: {
                width: image_width,
                height: image_height,
                top: current_top,
                left: current_left
            }
        };
    }
    ;

    function FadeAnimation(img_container, direction, desc) {
        img_container.css('opacity', 0);
        return {
            old_image: {
                opacity: 0
            },
            new_image: {
                opacity: 1
            }
        };
    }
    ;

    // Sort of a hack, will clean this up... eventually
    function NoneAnimation(img_container, direction, desc) {
        img_container.css('opacity', 0);
        return {
            old_image: {
                opacity: 0
            },
            new_image: {
                opacity: 1
            },
            speed: 0
        };
    }
    ;

    function AdGallery(wrapper, settings) {
        this.init(wrapper, settings);
    }
    ;
    AdGallery.prototype = {
        // Elements
        wrapper: false,
        image_wrapper: false,
        gallery_info: false,
        nav: false,
        loader: false,
        preloads: false,
        thumbs_wrapper: false,
        thumbs_wrapper_width: 0,
        scroll_back: false,
        scroll_forward: false,
        next_link: false,
        prev_link: false,

        slideshow: false,
        image_wrapper_width: 0,
        image_wrapper_height: 0,
        current_index: -1,
        current_image: false,
        current_description: false,
        nav_display_width: 0,
        settings: false,
        images: false,
        in_transition: false,
        animations: false,
        init: function(wrapper, settings) {
            var context = this;
            this.wrapper = $(wrapper);
            this.settings = settings;
            this.setupElements();
            this.setupAnimations();
            if (this.settings.width) {
                this.image_wrapper_width = this.settings.width;
                this.image_wrapper.width(this.settings.width);
                this.wrapper.width(this.settings.width);
            } else {
                this.image_wrapper_width = this.image_wrapper.width();
            }
            ;
            if (this.settings.height) {
                this.image_wrapper_height = this.settings.height;
                this.image_wrapper.height(this.settings.height);
            } else {
                this.image_wrapper_height = this.image_wrapper.height();
            }
            ;
            this.nav_display_width = this.nav.width();
            this.current_index = -1;
            this.current_image = false;
            this.current_description = false;
            this.in_transition = false;
            this.findImages();
            if (this.settings.display_next_and_prev) {
                this.initNextAndPrev();
            }
            ;
            // The slideshow needs a callback to trigger the next image to be shown
            // but we don't want to give it access to the whole gallery instance
            var nextimage_callback = function(callback) {
                return context.nextImage(callback);
            };
            this.slideshow = new AdGallerySlideshow(nextimage_callback, this.settings.slideshow);
            this.controls.append(this.slideshow.create());
            if (this.settings.slideshow.enable) {
                this.slideshow.enable();
            } else {
                this.slideshow.disable();
            }
            ;
            if (this.settings.display_back_and_forward) {
                this.initBackAndForward();
            }
            ;
            if (this.settings.enable_keyboard_move) {
                this.initKeyEvents();
            }
            ;
            this.initHashChange();
            var start_at = parseInt(this.settings.start_at_index, 10);
            if (typeof this.getIndexFromHash() != "undefined") {
                start_at = this.getIndexFromHash();
            }
            ;
            this.loading(true);
            this.showImage(start_at, function() {
                // We don't want to start the slideshow before the image has been
                // displayed
                if (context.settings.slideshow.autostart) {
                    context.preloadImage(start_at + 1);
                    context.slideshow.start();
                }
                ;
            }
            );
            this.fireCallback(this.settings.callbacks.init);
        },
        setupAnimations: function() {
            this.animations = {
                'slide-vert': VerticalSlideAnimation,
                'slide-hori': HorizontalSlideAnimation,
                'resize': ResizeAnimation,
                'fade': FadeAnimation,
                'none': NoneAnimation
            };
        },
        setupElements: function() {
            this.controls = this.wrapper.find('.ad-controls');
            this.gallery_info = $('<p class="ad-info"></p>');
            // this.gallery_caption = $('<p class="ad-caption"> : '+this.settings.captions+'</p>');
            this.controls.append(this.gallery_info);
            // this.controls.append(this.gallery_caption);
            this.image_wrapper = this.wrapper.find('.ad-image-wrapper');
            this.image_wrapper.empty();
            this.nav = this.wrapper.find('.ad-nav');
            this.thumbs_wrapper = this.nav.find('.ad-thumbs');
            this.preloads = $('<div class="ad-preloads"></div>');
            this.loader = $('<img class="ad-loader" src="../../images/' + this.settings.loader_image + '">');
            this.image_wrapper.append(this.loader);
            this.loader.hide();
            $(document.body).append(this.preloads);
        },
        loading: function(bool) {
            if (bool) {
                this.loader.show();
            } else {
                this.loader.hide();
            }
            ;
        },
        addAnimation: function(name, fn) {
            if ($.isFunction(fn)) {
                this.animations[name] = fn;
            }
            ;
        },
        findImages: function() {
            var context = this;
            this.images = [];
            var thumbs_loaded = 0;
            var thumbs = this.thumbs_wrapper.find('a');
            var thumb_count = thumbs.length;
            if (this.settings.thumb_opacity < 1) {
                thumbs.find('img').css('opacity', this.settings.thumb_opacity);
            }
            ;
            thumbs.each(function(i) {
                var link = $(this);
                link.data("ad-i", i);
                var image_src = link.attr('href');
                var thumb = link.find('img');
                context.whenImageLoaded(thumb[0], function() {
                    var width = thumb[0].parentNode.parentNode.offsetWidth;
                    if (thumb[0].width == 0) {
                        // If the browser tells us that the image is loaded, but the width
                        // is still 0 for some reason, we default to 100px width.
                        // It's not very nice, but it's better than 0.
                        width = 100;
                    }
                    ;
                    context.thumbs_wrapper_width += width;
                    thumbs_loaded++;
                });
                context._initLink(link);
                context.images[i] = context._createImageData(link, image_src);
            }
            );
            // Wait until all thumbs are loaded, and then set the width of the ul
            var inter = setInterval(function() {
                if (thumb_count == thumbs_loaded) {
                    context._setThumbListWidth(context.thumbs_wrapper_width);
                    clearInterval(inter);
                }
                ;
            },
                100
            );
        },
        _setThumbListWidth: function(wrapper_width) {
            wrapper_width -= 100;
            var list = this.nav.find('.ad-thumb-list');
            list.css('width', wrapper_width + 'px');
            var i = 1;
            var last_height = list.height();
            while (i < 201) {
                list.css('width', (wrapper_width + i) + 'px');
                if (last_height != list.height()) {
                    break;
                }
                ;
                last_height = list.height();
                i++;
            }
            ;
            if (list.width() < this.nav.width()) {
                list.width(this.nav.width());
            }
            ;
        },
        _initLink: function(link) {
            var context = this;
            link.click(function() {
                if(context.current_index != link.data("ad-i")){
                    $(".ad-controls p.ad-caption").remove();
                }
                context.showImage(link.data("ad-i"));
                context.slideshow.stop();
                return false;
            }
            ).hover(function() {
                if (!$(this).is('.ad-active') && context.settings.thumb_opacity < 1) {
                    $(this).find('img').fadeTo(300, 1);
                }
                ;
                context.preloadImage(link.data("ad-i"));
            }, function() {
                    if (!$(this).is('.ad-active') && context.settings.thumb_opacity < 1) {
                        $(this).find('img').fadeTo(300, context.settings.thumb_opacity);
                    }
                    ;
                }
            );
        },
        _createImageData: function(thumb_link, image_src) {
            var link = false;
            var thumb_img = thumb_link.find("img");
            if (thumb_img.data('ad-link')) {
                link = thumb_link.data('ad-link');
            } else if (thumb_img.attr('longdesc') && thumb_img.attr('longdesc').length) {
                link = thumb_img.attr('longdesc');
            }
            ;
            var desc = false;
            if (thumb_img.data('ad-desc')) {
                desc = thumb_img.data('ad-desc');
            } else if (thumb_img.attr('alt') && thumb_img.attr('alt').length) {
                desc = thumb_img.attr('alt');
            }
            ;
            var title = false;
            if (thumb_img.data('ad-title')) {
                title = thumb_img.data('ad-title');
            } else if (thumb_img.attr('title') && thumb_img.attr('title').length) {
                title = thumb_img.attr('title');
            }
            ;
            var capt = false;
            if (thumb_img.attr('data-caption')) {
                capt = thumb_img.attr('data-caption');
            }
            return {
                thumb_link: thumb_link,
                image: image_src,
                error: false,
                preloaded: false,
                desc: desc,
                title: title,
                size: false,
                captions:capt,
                link: link
            };
        },
        initKeyEvents: function() {
            var context = this;
            $(document).keydown(function(e) {
                if (e.keyCode == 39) {
                    // right arrow
                    context.nextImage();
                    context.slideshow.stop();
                } else if (e.keyCode == 37) {
                    // left arrow
                    context.prevImage();
                    context.slideshow.stop();
                }
                ;
            }
            );
        },
        getIndexFromHash: function() {
            if (window.location.hash && window.location.hash.indexOf('#ad-image-') === 0) {
                var id = window.location.hash.replace(/^#ad-image-/g, '');
                var thumb = this.thumbs_wrapper.find("#" + id);
                if (thumb.length) {
                    return this.thumbs_wrapper.find("a").index(thumb);
                } else if (!isNaN(parseInt(id, 10))) {
                    return parseInt(id, 10);
                }
                ;
            }
            ;
            return undefined;
        },
        removeImage: function(index) {
            if (index < 0 || index >= this.images.length) {
                throw "Cannot remove image for index " + index;
            }
            ;
            var image = this.images[index];
            this.images.splice(index, 1);
            var thumb_link = image.thumb_link;
            var thumb_width = thumb_link[0].parentNode.offsetWidth;
            this.thumbs_wrapper_width -= thumb_width;
            thumb_link.remove();
            this._setThumbListWidth(this.thumbs_wrapper_width);
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length);
            this.thumbs_wrapper.find('a').each(function(i) {
                $(this).data("ad-i", i);
            }
            );
            if (index == this.current_index && this.images.length != 0) {
                this.showImage(0);
            }
            ;
        },
        removeAllImages: function() {
            for (var i = this.images.length - 1; i >= 0; i--) {
                this.removeImage(i);
            }
            ;
        },
        addImage: function(thumb_url, image_url, image_id, title, description) {
            image_id = image_id || "";
            title = title || "";
            description = description || "";
            var li = $('<li><a href="' + image_url + '" id="' + image_id + '">' +
            '<img src="' + thumb_url + '" title="' + title + '" alt="' + description + '">' +
            '</a></li>');
            var context = this;
            this.thumbs_wrapper.find("ul").append(li);

            var link = li.find("a");
            var thumb = link.find("img");
            thumb.css('opacity', this.settings.thumb_opacity);

            this.whenImageLoaded(thumb[0], function() {
                var thumb_width = thumb[0].parentNode.parentNode.offsetWidth;
                if (thumb[0].width == 0) {
                    // If the browser tells us that the image is loaded, but the width
                    // is still 0 for some reason, we default to 100px width.
                    // It's not very nice, but it's better than 0.
                    thumb_width = 100;
                }
                ;

                context.thumbs_wrapper_width += thumb_width;
                context._setThumbListWidth(context.thumbs_wrapper_width);
            });
            var i = this.images.length;
            link.data("ad-i", i);
            this._initLink(link);
            this.images[i] = context._createImageData(link, image_url);
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length);
        },
        initHashChange: function() {
            var context = this;
            if ("onhashchange" in window) {
                $(window).bind("hashchange", function() {
                    var index = context.getIndexFromHash();
                    if (typeof index != "undefined" && index != context.current_index) {
                        context.showImage(index);
                    }
                    ;
                });
            } else {
                var current_hash = window.location.hash;
                setInterval(function() {
                    if (window.location.hash != current_hash) {
                        current_hash = window.location.hash;
                        var index = context.getIndexFromHash();
                        if (typeof index != "undefined" && index != context.current_index) {
                            context.showImage(index);
                        }
                        ;
                    }
                    ;
                }, 200);
            }
            ;
        },
        initNextAndPrev: function() {
            this.next_link = $('<div class="ad-next"><div class="ad-next-image icon-chevron-right icon  icon-size-4 text-contrast"></div></div>');
            this.prev_link = $('<div class="ad-prev"><div class="ad-prev-image icon-chevron-left icon  icon-size-4 text-contrast"></div></div>');
            this.image_wrapper.append(this.next_link);
            this.image_wrapper.append(this.prev_link);
            var context = this;
            this.prev_link.add(this.next_link).mouseover(function(e) {
                // IE 6 hides the wrapper div, so we have to set it's width
                $(this).css('height', context.image_wrapper_height);
                // $(this).find('div').show();
            }
            ).mouseout(function(e) {
                // $(this).find('div').hide();
            }
            ).click(function() {
                if ($(this).is('.ad-next')) {
                    // alert("hai");
                    $('.ad-caption').hide();
                    context.nextImage();
                    context.slideshow.stop();
                } else {
                     // alert("test");
                     $('.ad-caption').hide();
                    context.prevImage();
                    context.slideshow.stop();
                }
                ;
            }
            ).find('div').css('opacity', 1.0);
        },
        initBackAndForward: function() {
            var context = this;
            this.scroll_forward = $('<div class="ad-forward"></div>');
            this.scroll_back = $('<div class="ad-back"></div>');
            this.nav.append(this.scroll_forward);
            this.nav.prepend(this.scroll_back);
            var has_scrolled = 0;
            var thumbs_scroll_interval = false;
            $(this.scroll_back).add(this.scroll_forward).click(function() {
                // We don't want to jump the whole width, since an image
                // might be cut at the edge
                var width = context.nav_display_width - 50;
                if (context.settings.scroll_jump > 0) {
                    var width = context.settings.scroll_jump;
                }
                ;
                if ($(this).is('.ad-forward')) {
                    var left = context.thumbs_wrapper.scrollLeft() + width;
                } else {
                    var left = context.thumbs_wrapper.scrollLeft() - width;
                }
                ;
                if (context.settings.slideshow.stop_on_scroll) {
                    context.slideshow.stop();
                }
                ;
                context.thumbs_wrapper.animate({
                    scrollLeft: left + 'px'
                });
                return false;
            }
            ).css('opacity', 0.6).hover(function() {
                var direction = 'left';
                if ($(this).is('.ad-forward')) {
                    direction = 'right';
                }
                ;
                thumbs_scroll_interval = setInterval(function() {
                    has_scrolled++;
                    // Don't want to stop the slideshow just because we scrolled a pixel or two
                    if (has_scrolled > 30 && context.settings.slideshow.stop_on_scroll) {
                        context.slideshow.stop();
                    }
                    ;
                    var left = context.thumbs_wrapper.scrollLeft() + 1;
                    if (direction == 'left') {
                        left = context.thumbs_wrapper.scrollLeft() - 1;
                    }
                    ;
                    context.thumbs_wrapper.scrollLeft(left);
                },
                    10
                );
                $(this).css('opacity', 1);
            }, function() {
                    has_scrolled = 0;
                    clearInterval(thumbs_scroll_interval);
                    $(this).css('opacity', 0.6);
                }
            );
        },
        _afterShow: function() {
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length);
            if (!this.settings.cycle) {
                // Needed for IE
                this.prev_link.show().css('height', this.image_wrapper_height);
                this.next_link.show().css('height', this.image_wrapper_height);
                if (this.current_index == (this.images.length - 1)) {
                    this.next_link.hide();
                }
                ;
                if (this.current_index == 0) {
                    this.prev_link.hide();
                }
                ;
            }
            ;
            if (this.settings.update_window_hash) {
                var thumb_link = this.images[this.current_index].thumb_link;
                if (thumb_link.attr("id")) {
                    window.location.hash = "#ad-image-" + thumb_link.attr("id");
                } else {
                    window.location.hash = "#ad-image-" + this.current_index;
                }
                ;
            }
            ;
            this.fireCallback(this.settings.callbacks.afterImageVisible);
        },
        /**
         * Checks if the image is small enough to fit inside the container
         * If it's not, shrink it proportionally
         */
        _getContainedImageSize: function(image_width, image_height) {
            if (image_height > this.image_wrapper_height) {
                var ratio = image_width / image_height;
                image_height = this.image_wrapper_height;
                image_width = this.image_wrapper_height * ratio;
            }
            ;
            if (image_height < this.image_wrapper_height) {
                var ratio = image_width / image_height;
                image_height = 400;
                image_width = this.image_wrapper_height * ratio;
            }
            ;
            if (image_width > this.image_wrapper_width) {
                var ratio = image_height / image_width;
                image_width = this.image_wrapper_width;
                image_height = this.image_wrapper_width * ratio;
            }
            ;
            return {
                width: image_width,
                height: image_height
            };
        },
        /**
         * If the image dimensions are smaller than the wrapper, we position
         * it in the middle anyway
         */
        _centerImage: function(img_container, image_width, image_height) {
            img_container.css('top', '0px');
            if (image_height < this.image_wrapper_height) {
                var dif = this.image_wrapper_height - image_height;
                img_container.css('top', (dif / 2) + 'px');
            }
            ;
            img_container.css('left', '0px');
            if (image_width < this.image_wrapper_width) {
                var dif = this.image_wrapper_width - image_width;
                img_container.css('left', (dif / 2) + 'px');
            }
            ;
        },
        _getDescription: function(image) {
            var desc = false;
            if (image.desc.length || image.title.length) {
                var title = '';
                if (image.title.length) {
                    title = '<strong class="ad-description-title">' + image.title + '</strong>';
                }
                ;
                var desc = '';
                if (image.desc.length) {
                    desc = '<span>' + image.desc + '</span>';
                }
                ;
                desc = $('<p class="ad-image-description">' + title + desc + '</p>');
            }
            ;
            return desc;
        },
        _getCaption: function(image) {
            var desc = false;
            if (image.desc.length || image.title.length) {
                var title = '';
                if (image.title.length) {
                    title = '<strong class="ad-caption"> : ' + image.title + '</strong>';
                }
                ;
                var desc = '';
                if (image.desc.length) {
                    desc = '<span>' + image.desc + '</span>';
                }
                ;
                desc = $('<p class="ad-caption">' + title + desc + '</p>');
            }
            ;
            return desc;
        },
        /**
         * @param function callback Gets fired when the image has loaded, is displaying
         *                          and it's animation has finished
         */
        showImage: function(index, callback) { 
            if (this.images[index] && !this.in_transition && index != this.current_index) {
                var context = this;
                var image = this.images[index];
                this.in_transition = true;

                if (!image.preloaded) { 
                    this.loading(true); 
                    this.preloadImage(index, function() {
                        context.loading(false);
                        context._showWhenLoaded(index, callback);

                    });
                } else {
                    this._showWhenLoaded(index, callback);
                }
                ;
            }
            ;
        },
        /**
         * @param function callback Gets fired when the image has loaded, is displaying
         *                          and it's animation has finished
         */
        _showWhenLoaded: function(index, callback) { 
            if (this.images[index]) {
                var context = this;
                var image = this.images[index];
                var img_container = $(document.createElement('div')).addClass('ad-image');
                var img_container = $(document.createElement('div')).addClass('ad-image');
                var img = $(new Image()).attr('src', image.image);
                if (image.link) {
                    var link = $('<a href="' + image.link + '" target="_blank"></a>');
                    link.append(img);
                    img_container.append(link);
                } else {
                    img_container.append(img);
                }
                ;
                this.image_wrapper.prepend(img_container);
                var size = this._getContainedImageSize(image.size.width, image.size.height);
                img.attr('width', size.width);
                img.attr('height', size.height);
                img_container.css({
                    width: size.width + 'px',
                    height: size.height + 'px'
                });
                this._centerImage(img_container, size.width, size.height);
                var desc = this._getDescription(image);
                var captions = this._getCaption(image);
                
                // var captions = $('<p class="ad-caption">test</p>');
                
                if (desc) {
                    if (!this.settings.description_wrapper && !this.settings.hooks.displayDescription) {
                        // img_container.append(desc);
                        $(".ad-controls").append(captions);
                        var width = size.width - parseInt(desc.css('padding-left'), 10) - parseInt(desc.css('padding-right'), 10);
                        desc.css('width', width + 'px');
                    } else if (this.settings.hooks.displayDescription) {
                        this.settings.hooks.displayDescription.call(this, image);
                    } else {
                        var wrapper = this.settings.description_wrapper;
                        wrapper.append(desc);
                    }
                    ;
                }
                ;
                this.highLightThumb(this.images[index].thumb_link);

                var direction = 'right';
                if (this.current_index < index) {
                    direction = 'left';
                }
                ;
                this.fireCallback(this.settings.callbacks.beforeImageVisible);
                if (this.current_image || this.settings.animate_first_image) {
                    var animation_speed = this.settings.animation_speed;
                    var easing = 'swing';
                    var animation = this.animations[this.settings.effect].call(this, img_container, direction, desc);
                    if (typeof animation.speed != 'undefined') {
                        animation_speed = animation.speed;
                    }
                    ;
                    if (typeof animation.easing != 'undefined') {
                        easing = animation.easing;
                    }
                    ;
                    if (this.current_image) {
                        var old_image = this.current_image;
                        var old_description = this.current_description;
                        old_image.animate(animation.old_image, animation_speed, easing, function() {
                            old_image.remove();
                            if (old_description) {
                                old_description.remove();
                            }
                        }
                        );
                    }
                    ;
                    img_container.animate(animation.new_image, animation_speed, easing, function() {
                        context.current_index = index;
                        context.current_image = img_container;
                        context.current_description = desc;
                        context.in_transition = false;
                        context._afterShow();
                        context.fireCallback(callback);
                    }
                    );
                } else {
                    this.current_index = index;
                    this.current_image = img_container;
                    context.current_description = desc;
                    this.in_transition = false;
                    context._afterShow();
                    this.fireCallback(callback);
                }
                ;
            }
            ;
        },
        nextIndex: function() {
            if (this.current_index == (this.images.length - 1)) {
                if (!this.settings.cycle) {
                    return false;
                }
                ;
                var next = 0;
            } else {
                var next = this.current_index + 1;
            }
            ;
            return next;
        },
        nextImage: function(callback) {
            var next = this.nextIndex();
            if (next === false) return false;
            this.preloadImage(next + 1);
            this.showImage(next, callback);
            return true;
        },
        prevIndex: function() {
            if (this.current_index == 0) {
                if (!this.settings.cycle) {
                    return false;
                }
                ;
                var prev = this.images.length - 1;
            } else {
                var prev = this.current_index - 1;
            }
            ;
            return prev;
        },
        prevImage: function(callback) {
            var prev = this.prevIndex();
            if (prev === false) return false;
            this.preloadImage(prev - 1);
            this.showImage(prev, callback);
            return true;
        },
        preloadAll: function() {
            var context = this;
            var i = 0;
            function preloadNext() {
                if (i < context.images.length) {
                    i++;
                    context.preloadImage(i, preloadNext);
                }
                ;
            }
            ;
            context.preloadImage(i, preloadNext);
        },
        preloadImage: function(index, callback) {
            if (this.images[index]) {
                var image = this.images[index];
                if (!this.images[index].preloaded) {
                    var img = $(new Image());
                    img.attr('src', image.image);
                    if (!this.isImageLoaded(img[0])) {
                        this.preloads.append(img);
                        var context = this;
                        img.load(function() {
                            image.preloaded = true;
                            image.size = {
                                width: this.width,
                                height: this.height
                            };
                            context.fireCallback(callback);
                        }
                        ).error(function() {
                            image.error = true;
                            image.preloaded = false;
                            image.size = false;
                        }
                        );
                    } else {
                        image.preloaded = true;
                        image.size = {
                            width: img[0].width,
                            height: img[0].height
                        };
                        this.fireCallback(callback);
                    }
                    ;
                } else {
                    this.fireCallback(callback);
                }
                ;
            }
            ;
        },
        whenImageLoaded: function(img, callback) {
            if (this.isImageLoaded(img)) {
                callback && callback();
            } else {
                $(img).load(callback);
            }
            ;
        },
        isImageLoaded: function(img) {
            if (typeof img.complete != 'undefined' && !img.complete) {
                return false;
            }
            ;
            if (typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0) {
                return false;
            }
            ;
            return true;
        },
        highLightThumb: function(thumb) {
            this.thumbs_wrapper.find('.ad-active').removeClass('ad-active');
            thumb.addClass('ad-active');
            if (this.settings.thumb_opacity < 1) {
                this.thumbs_wrapper.find('a:not(.ad-active) img').fadeTo(300, this.settings.thumb_opacity);
                thumb.find('img').fadeTo(300, 1);
            }
            ;
            var left = thumb[0].parentNode.offsetLeft;
            left -= (this.nav_display_width / 2) - (thumb[0].offsetWidth / 2);
            this.thumbs_wrapper.animate({
                scrollLeft: left + 'px'
            });
        },
        fireCallback: function(fn) {
            if ($.isFunction(fn)) {
                fn.call(this);
            }
            ;
        }
    };

    function AdGallerySlideshow(nextimage_callback, settings) {
        this.init(nextimage_callback, settings);
    }
    ;
    AdGallerySlideshow.prototype = {
        start_link: false,
        stop_link: false,
        countdown: false,
        controls: false,

        settings: false,
        nextimage_callback: false,
        enabled: false,
        running: false,
        countdown_interval: false,
        init: function(nextimage_callback, settings) {
            var context = this;
            this.nextimage_callback = nextimage_callback;
            this.settings = settings;
        },
        create: function() {
            this.start_link = $('<span class="ad-slideshow-start">' + this.settings.start_label + '</span>');
            this.stop_link = $('<span class="ad-slideshow-stop">' + this.settings.stop_label + '</span>');
            this.countdown = $('<span class="ad-slideshow-countdown"></span>');
            this.controls = $('<div class="ad-slideshow-controls"></div>');
            // this.controls.append(this.start_link).append(this.stop_link).append(this.countdown);
            this.photo_list = $('<span class="ad-slideshow-start">Show Photo List <i class="fa fa-caret-down"></i></span>');
            this.controls.append(this.photo_list);
            this.countdown.hide();

            var context = this;
            this.start_link.click(function() {
                context.start();
            }
            );
            this.stop_link.click(function() {
                context.stop();
            }
            );
            $(document).keydown(function(e) {
                if (e.keyCode == 83) {
                    // 's'
                    if (context.running) {
                        context.stop();
                    } else {
                        context.start();
                    }
                    ;
                }
                ;
            }
            );
            return this.controls;
        },
        disable: function() {
            this.enabled = false;
            this.stop();
            this.controls.hide();
        },
        enable: function() {
            this.enabled = true;
            this.controls.show();
        },
        toggle: function() {
            if (this.enabled) {
                this.disable();
            } else {
                this.enable();
            }
            ;
        },
        start: function() {
            if (this.running || !this.enabled) return false;
            var context = this;
            this.running = true;
            this.controls.addClass('ad-slideshow-running');
            this._next();
            this.fireCallback(this.settings.onStart);
            return true;
        },
        stop: function() {
            if (!this.running) return false;
            this.running = false;
            this.countdown.hide();
            this.controls.removeClass('ad-slideshow-running');
            clearInterval(this.countdown_interval);
            this.fireCallback(this.settings.onStop);
            return true;
        },
        _next: function() {
            var context = this;
            var pre = this.settings.countdown_prefix;
            var su = this.settings.countdown_sufix;
            clearInterval(context.countdown_interval);
            this.countdown.show().html(pre + (this.settings.speed / 1000) + su);
            var slide_timer = 0;
            this.countdown_interval = setInterval(function() {
                slide_timer += 1000;
                if (slide_timer >= context.settings.speed) {
                    var whenNextIsShown = function() {
                        // A check so the user hasn't stoped the slideshow during the
                        // animation
                        if (context.running) {
                            context._next();
                        }
                        ;
                        slide_timer = 0;
                    };
                    if (!context.nextimage_callback(whenNextIsShown)) {
                        context.stop();
                    }
                    ;
                    slide_timer = 0;
                }
                ;
                var sec = parseInt(context.countdown.text().replace(/[^0-9]/g, ''), 10);
                sec--;
                if (sec > 0) {
                    context.countdown.html(pre + sec + su);
                }
                ;
            },
                1000
            );
        },
        fireCallback: function(fn) {
            if ($.isFunction(fn)) {
                fn.call(this);
            }
            ;
        }
    };
})(jQuery);

//nivo-lightbox.min.js

(function(e, t, n, r) {
    function o(t, n) {
        this.el = t;
        this.$el = e(this.el);
        this.options = e.extend({}, s, n);
        this._defaults = s;
        this._name = i;
        this.init()
    }
    var i = "nivoLightbox",
        s = {
            effect: "fade",
            theme: "default",
            keyboardNav: true,
            clickOverlayToClose: true,
            onInit: function() {},
            beforeShowLightbox: function() {},
            afterShowLightbox: function(e) {},
            beforeHideLightbox: function() {},
            afterHideLightbox: function() {},
            onPrev: function(e) {},
            onNext: function(e) {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    o.prototype = {
        init: function() {
            var t = this;
            if (!e("html").hasClass("nivo-lightbox-notouch")) e("html").addClass("nivo-lightbox-notouch");
            if ("ontouchstart" in n) e("html").removeClass("nivo-lightbox-notouch");
            this.$el.on("click", function(e) {
                t.showLightbox(e)
            });
            if (this.options.keyboardNav) {
                e("body").off("keyup").on("keyup", function(n) {
                    var r = n.keyCode ? n.keyCode : n.which;
                    if (r == 27) t.destructLightbox();
                    if (r == 37) e(".nivo-lightbox-prev").trigger("click");
                    if (r == 39) e(".nivo-lightbox-next").trigger("click")
                })
            }
            this.options.onInit.call(this)
        },
        showLightbox: function(t) {
            var n = this,
                r = this.$el;
            var i = this.checkContent(r);
            if (!i) return;
            t.preventDefault();
            this.options.beforeShowLightbox.call(this);
            var s = this.constructLightbox();
            if (!s) return;
            var o = s.find(".nivo-lightbox-content");
            if (!o) return;
            e("body").addClass("nivo-lightbox-body-effect-" + this.options.effect);
            this.processContent(o, r);
            if (this.$el.attr("data-lightbox-gallery")) {
                var u = e('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                e(".nivo-lightbox-nav").show();
                e(".nivo-lightbox-prev").off("click").on("click", function(t) {
                    t.preventDefault();
                    var i = u.index(r);
                    r = u.eq(i - 1);
                    if (!e(r).length) r = u.last();
                    n.processContent(o, r);
                    n.options.onPrev.call(this, [r])
                });
                e(".nivo-lightbox-next").off("click").on("click", function(t) {
                    t.preventDefault();
                    var i = u.index(r);
                    r = u.eq(i + 1);
                    if (!e(r).length) r = u.first();
                    n.processContent(o, r);
                    n.options.onNext.call(this, [r])
                })
            }
            setTimeout(function() {
                s.addClass("nivo-lightbox-open");
                n.options.afterShowLightbox.call(this, [s])
            }, 1)
        },
        checkContent: function(e) {
            var t = this,
                n = e.attr("href"),
                r = n.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            if (n.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                return true
            } else if (r) {
                return true
            } else if (e.attr("data-lightbox-type") == "ajax") {
                return true
            } else if (n.substring(0, 1) == "#" && e.attr("data-lightbox-type") == "inline") {
                return true
            } else if (e.attr("data-lightbox-type") == "iframe") {
                return true
            }
            return false
        },
        processContent: function(n, r) {
            var i = this,
                s = r.attr("href"),
                o = s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            n.html("").addClass("nivo-lightbox-loading");
            if (this.isHidpi() && r.attr("data-lightbox-hidpi")) {
                s = r.attr("data-lightbox-hidpi")
            }
            if (s.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                var u = e("<img>", {
                    src: s
                });
                u.one("load", function() {
                    var r = e('<div class="nivo-lightbox-image" />');
                    r.append(u);
                    n.html(r).removeClass("nivo-lightbox-loading");
                    r.css({
                        "line-height": e(".nivo-lightbox-content").height() + "px",
                        height: e(".nivo-lightbox-content").height() + "px"
                    });
                    e(t).resize(function() {
                        r.css({
                            "line-height": e(".nivo-lightbox-content").height() + "px",
                            height: e(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function() {
                    if (this.complete) e(this).load()
                });
                u.error(function() {
                    var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(t).removeClass("nivo-lightbox-loading")
                })
            } else if (o) {
                var a = "",
                    f = "nivo-lightbox-video";
                if (o[1] == "youtube") {
                    a = "http://www.youtube.com/embed/" + o[4];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "youtu") {
                    a = "http://www.youtube.com/embed/" + o[3];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "vimeo") {
                    a = "http://player.vimeo.com/video/" + o[3];
                    f = "nivo-lightbox-vimeo"
                }
                if (a) {
                    var l = e("<iframe>", {
                        src: a,
                        "class": f,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    n.html(l);
                    l.load(function() {
                        n.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if (r.attr("data-lightbox-type") == "ajax") {
                e.ajax({
                    url: s,
                    cache: false,
                    success: function(r) {
                        var i = e('<div class="nivo-lightbox-ajax" />');
                        i.append(r);
                        n.html(i).removeClass("nivo-lightbox-loading");
                        if (i.outerHeight() < n.height()) {
                            i.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(i.outerHeight() / 2) + "px"
                            })
                        }
                        e(t).resize(function() {
                            if (i.outerHeight() < n.height()) {
                                i.css({
                                    position: "relative",
                                    top: "50%",
                                    "margin-top": -(i.outerHeight() / 2) + "px"
                                })
                            }
                        })
                    },
                    error: function() {
                        var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                        n.html(t).removeClass("nivo-lightbox-loading")
                    }
                })
            } else if (s.substring(0, 1) == "#" && r.attr("data-lightbox-type") == "inline") {
                if (e(s).length) {
                    var c = e('<div class="nivo-lightbox-inline" />');
                    c.append(e(s).clone().show());
                    n.html(c).removeClass("nivo-lightbox-loading");
                    if (c.outerHeight() < n.height()) {
                        c.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(c.outerHeight() / 2) + "px"
                        })
                    }
                    e(t).resize(function() {
                        if (c.outerHeight() < n.height()) {
                            c.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(c.outerHeight() / 2) + "px"
                            })
                        }
                    })
                } else {
                    var h = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(h).removeClass("nivo-lightbox-loading")
                }
            } else if (r.attr("data-lightbox-type") == "iframe") {
                var p = e("<iframe>", {
                    src: s,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                n.html(p);
                p.load(function() {
                    n.removeClass("nivo-lightbox-loading")
                })
            } else {
                return false
            } if (r.attr("title")) {
                var d = e("<span>", {
                    "class": "nivo-lightbox-title"
                });
                d.text(r.attr("title"));
                e(".nivo-lightbox-title-wrap").html(d)
            } else {
                e(".nivo-lightbox-title-wrap").html("")
            }
        },
        constructLightbox: function() {
            if (e(".nivo-lightbox-overlay").length) return e(".nivo-lightbox-overlay");
            var t = e("<div>", {
                "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
            });
            var n = e("<div>", {
                "class": "nivo-lightbox-wrap"
            });
            var r = e("<div>", {
                "class": "nivo-lightbox-content"
            });
            var i = e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var s = e('<a href="#" class="modal-close" data-behavior="modal-close" title="Close" style="font-size:65px;"></a>');
            var o = e("<div>", {
                "class": "nivo-lightbox-title-wrap"
            });           
            var u = 0;
            if (u) t.addClass("nivo-lightbox-ie");
            n.append(r);
            n.append(o);
            t.append(n);
            t.append(i);
            t.append(s);
            e("body").append(t);
            var a = this;
            if (a.options.clickOverlayToClose) {
                t.on("click", function(t) {
                    if (t.target === this || e(t.target).hasClass("nivo-lightbox-content") || e(t.target).hasClass("nivo-lightbox-image")) {
                        a.destructLightbox()
                    }
                })
            }
            s.on("click", function(e) {
                e.preventDefault();
                a.destructLightbox()
            });
            return t
        },
        destructLightbox: function() {
            var t = this;
            this.options.beforeHideLightbox.call(this);
            e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");
            e(".nivo-lightbox-nav").hide();
            e("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
            var n = 0;
            if (n) {
                e(".nivo-lightbox-overlay iframe").attr("src", " ");
                e(".nivo-lightbox-overlay iframe").remove()
            }
            e(".nivo-lightbox-prev").off("click");
            e(".nivo-lightbox-next").off("click");
            e(".nivo-lightbox-content").empty();
            this.options.afterHideLightbox.call(this)
        },
        isHidpi: function() {
            var e = "(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";
            if (t.devicePixelRatio > 1) return true;
            if (t.matchMedia && t.matchMedia(e).matches) return true;
            return false
        }
    };
    e.fn[i] = function(t) {
        return this.each(function() {
            if (!e.data(this, i)) {
                e.data(this, i, new o(this, t))
            }
        })
    }
})(jQuery, window, document)

// main.js

        $(window).load(function() { // makes sure the whole site is loaded
            $('#status').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('body').delay(350).css({'overflow':'visible'});
        })
    //]]>
    
  $('a.gallery').nivoLightbox({
    effect: 'fade',                             // The effect to use when showing the lightbox
    theme: 'default',                           // The lightbox theme to use
    keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
    clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
    onInit: function(){},                       // Callback when lightbox has loaded
    beforeShowLightbox: function(){},           // Callback before the lightbox is shown
    afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
    beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
    afterHideLightbox: function(){},            // Callback after the lightbox is hidden
    onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
    onNext: function(element){},                // Callback when the lightbox gallery goes to next item
    errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
});

      //--------- rooms slider ---------//
  app.controller('rooms_detail', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
// -------------rooms similar slisting ---------- // 
     $(function() {
  $('.slider1').bxSlider({
    slideWidth: 335,
    minSlides: 1,
    maxSlides: 3,
    slideMargin: 1,
     nextSelector: '#slider-next',
  prevSelector: '#slider-prev'
 
  });
});
$(document).ready(function(){
   $('.bx-prev').addClass('icon icon-chevron-left icon-gray icon-size-2 ');
   $('.bx-prev').text('');
    $('.bx-next').addClass('icon icon-chevron-right icon-gray icon-size-2 ');
   $('.bx-next').text('');
});
     

     // -------------rooms similar slisting ---------- // 
$(".expandable-trigger-more").click(function(){

$('.all_description').addClass('expanded');
});
$('.rooms_amenities_after').hide();
$(".amenities_trigger").click(function(){

$('.rooms_amenities_before').hide();
$('.rooms_amenities_after').show();

});

//-------------- date picker block ---------------- //

setTimeout(function(){ 
    var data = $scope.room_id;

    $http.post('rooms_calendar', { data:data }).then(function(response) 
    {
       $('#room_blocked_dates').val(response.data.not_avilable);

       $('#calendar_available_price').val(response.data.changed_price);

       $('#room_available_price').val(response.data.price);

         var array =  $('#room_blocked_dates').val();

         var price = $('#room_available_price').val();;

         var change_price = $('#calendar_available_price').val();

var changed_price = response.data.changed_price;
var tooltip_price = price;
var currency_symbol = response.data.currency_symbol;

$('#list_checkin').datepicker({
    minDate: 0,
    dateFormat:'dd-mm-yy',
    beforeShow: function(input, inst) {
        setTimeout(function() {
                inst.dpDiv.find('a.ui-state-highlight').removeClass('ui-state-highlight');
            }, 100);
    },
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        var now = new Date();
        now.setDate(now.getDate()-1);

        if(array.indexOf(string) == -1)
        {
            if(typeof changed_price[string] == 'undefined')
            {
                changed_price[string] = price;
                return [ array.indexOf(string) == -1, 'highlight', currency_symbol+changed_price[string] ];
            }
            else if(date > now) 
            {
                return [ array.indexOf(string) == -1, 'highlight', currency_symbol+changed_price[string] ];
            }
            else
            {
                return [ array.indexOf(string) == -1 ];    
            }
        }
        else
        {
            return [ array.indexOf(string) == -1 ];
        }
    },
     onSelect: function (date) 
    {
        var checkout = $('#list_checkin').datepicker('getDate');
        checkout.setDate(checkout.getDate() + 1);
        $('#list_checkout').datepicker('setDate', checkout);
        $('#list_checkout').datepicker('option', 'minDate', checkout);
        setTimeout(function(){
            $("#list_checkout").datepicker("show");
        },20);

         var checkin = $(this).val();
        var checkout = $("#list_checkout").val();
         var guest =  $("#number_of_guests").val();
         $('.js-book-it-status').addClass('loading');
         calculation(checkout,checkin,guest);
         $('.tooltip').hide();

         if(date != new Date())
         {
            $('.ui-datepicker-today').removeClass('ui-datepicker-today');
         }
    }
});

$(document).on('mouseenter', '.ui-datepicker-calendar .ui-state-hover', function(e){
    $('.highlight').tooltip({ container: 'body'});
});

jQuery('#list_checkout').datepicker({
    minDate: 1,
    dateFormat:'dd-mm-yy',
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        
        if(array.indexOf(string) == -1)
        {
            if(typeof changed_price[string] == 'undefined')
            {
                changed_price[string] = price;
            }
            return [ array.indexOf(string) == -1, 'highlight', currency_symbol+changed_price[string] ];
        }
        else
        {
            return [ array.indexOf(string) == -1 ];
        }
    },
    onSelect: function()
    {
        $('.tooltip').hide();
    },
    onClose: function () 
    {
        var checkin = $('#list_checkin').datepicker('getDate');
        var checkout = $('#list_checkout').datepicker('getDate');
        if (checkout <= checkin) 
        {
            var minDate = $('#list_checkout').datepicker('option', 'minDate');
            $('#list_checkout').datepicker('setDate', minDate);
        }

         var checkout = $(this).val();
        var checkin = $("#list_checkin").val();
        var guest =  $("#number_of_guests").val();
        
        if(checkin != '')
        {
            $('.js-book-it-status').addClass('loading');
          calculation(checkout,checkin,guest);  
        }
        
    
    }
});

if($('#url_checkin').val() != '' && $('#url_checkout').val() != '')
{
    $("#list_checkin").datepicker('setDate', new Date($('#url_checkin').val()));
    $("#list_checkout").datepicker('setDate', new Date($('#url_checkout').val()));
    $('#number_of_guests').val($('#url_guests').val());

    $("#message_checkin").datepicker('setDate', new Date($('#url_checkin').val()));
    $("#message_checkout").datepicker('setDate', new Date($('#url_checkout').val()));
    $('#message_guests').val($('#url_guests').val());

    var checkin = $('#list_checkin').val();
    var checkout = $('#list_checkout').val();
    var guest = $('#number_of_guests').val();

    calculation(checkout,checkin,guest);
}
    });     
}, 10);


//---- date picker block---- //
    $("#number_of_guests").change(function(){
        
        var guest = $(this).val();
        var checkin = $("#list_checkin").val();
        var checkout =  $("#list_checkout").val();
        
        if(checkin != '' && checkout !='' )
        {
            $('.js-book-it-status').addClass('loading');
            calculation(checkout,checkin,guest);
        }
});
//---- Rooms calculation---- //

$(".additional_price").hide();
$(".security_price").hide();
$(".cleaning_price").hide();
$(".js-subtotal-container").hide();
$("#book_it_disabled").hide();

function calculation(checkout,checkin,guest) {

    var room_id = $scope.room_id;
    $(".js-subtotal-container").show();
    $http.post('price_calculation', { checkin :checkin,checkout : checkout, guest_count : guest,   room_id : room_id }).then(function(response) 
     {

               if(response.data.status == "Not available")
       {
        $(".js-subtotal-container").hide();
        $("#book_it_disabled").show();
        $(".js-book-it-btn-container").hide();
       }
       else
       {
        $(".js-subtotal-container").show();
        $("#book_it_disabled").hide();
        $(".js-book-it-btn-container").show();
       }
       $('.js-book-it-status').removeClass('loading');
       $('#total_night_price').text(response.data.total_night_price);
       $('#service_fee').text(response.data.service_fee);
       $('#total').text(response.data.total);
       $('#total_night_count').text(response.data.total_nights);
       $('#rooms_price_amount').text(response.data.rooms_price);
       $('#rooms_price_amount_1').text(response.data.rooms_price);
       
       if(response.data.additional_guest)
       {
        $(".additional_price").show();
        $('#additional_guest').text(response.data.additional_guest);
       }
       else
       {
        $(".additional_price").hide();
       }
       

        if(response.data.security_fee)
       {
        $(".security_price").show();
        $('#security_fee').text(response.data.security_fee);
       }
       else
       {
        $(".security_price").hide();
       }
              if(response.data.cleaning_fee)
       {
        $(".cleaning_price").show();
        $('#cleaning_fee').text(response.data.cleaning_fee);
       }
       else
       {
        $(".cleaning_price").hide();
       }
     }); 
}

/*$('#contact-host-link, #host-profile-contact-btn').click(function()
{
    $('.contact-modal').removeClass('hide');
});*/

setTimeout(function() {

var data = $scope.room_id;
var room_id = data;

$http.post(APP_URL+'/rooms/rooms_calendar', { data:data }).then(function(response) {
  var changed_price = response.data.changed_price;
  var array =  response.data.not_avilable;

  $('#message_checkin').datepicker({
      minDate: 0,
      dateFormat:'dd-mm-yy',
      setDate: new Date($('#message_checkin').val()),
      beforeShowDay: function(date) {
        var date = jQuery.datepicker.formatDate('yy-mm-dd', date);
        if($.inArray(date, array) != -1)
          return [false];
        else
          return [true];
      },
      onSelect: function (date) {
        var checkout = $('#message_checkin').datepicker('getDate');
        checkout.setDate(checkout.getDate() + 1);
        $('#message_checkout').datepicker('setDate', checkout);
        $('#message_checkout').datepicker('option', 'minDate', checkout);
  
        setTimeout(function() {
            $("#message_checkout").datepicker("show");
        },20);
  
        var checkin = $(this).val();
        var checkout = $("#message_checkout").val();
        var guest =  $("#message_guests").val();
        calculation_message(checkout,checkin,guest,room_id);
           
        if(date != new Date()) {
           $('.ui-datepicker-today').removeClass('ui-datepicker-today');
        }
      }
  });

  jQuery('#message_checkout').datepicker({
    minDate: 1,
    dateFormat:'dd-mm-yy',
    setDate: new Date($('#message_checkout').val()),
    beforeShowDay: function(date) {
      var date = jQuery.datepicker.formatDate('yy-mm-dd', date);
      if($.inArray(date, array) != -1)
        return [false];
      else
        return [true];
    },
    onClose: function () {
        var checkin = $('#message_checkin').datepicker('getDate');
        var checkout = $('#message_checkout').datepicker('getDate');

        if (checkout <= checkin) {
            var minDate = $('#message_checkout').datepicker('option', 'minDate');
            $('#message_checkout').datepicker('setDate', minDate);
        }

        var checkout = $(this).val();
        var checkin  = $("#message_checkin").val();
        var guest    =  $("#message_guests").val();
        
        if(checkin != '') {
          calculation_message(checkout,checkin,guest,room_id);  
        }
    }
});

});

}, 10);

function calculation_message(checkout,checkin,guest,room_id) {
    $http.post(APP_URL+'/rooms/price_calculation', { checkin :checkin,checkout : checkout, guest_count : guest, room_id : room_id }).then(function(response) {
        if(response.data.status == 'Not available')
        {
            $('.contacted-before').removeClass('hide');
            $('.contacted-before').removeClass('error-block');
        }
        else
        {
            $('.contacted-before').addClass('hide');
            $('.contacted-before').addClass('error-block');
        }
    });
}

$(document).on('click', '.rich-toggle-unchecked,.rich-toggle-checked', function() {
    if(typeof USER_ID == 'object') {
      window.location.href = APP_URL+'/login';
      return false;
    }

    $('.wl-modal__modal').removeClass('hide');
    $('.wl-modal__col:nth-child(2)').addClass('hide');
    $('.row-margin-zero').append('<div id="wish-list-signup-container" style="overflow-y:auto;" class="col-lg-5 wl-modal__col-collapsible"> <div class="loading wl-modal__col"> </div> </div>');
    $http.get(APP_URL+"/wishlist_list?id="+$scope.room_id, {  }).then(function(response) 
    {
      $('#wish-list-signup-container').remove();
      $('.wl-modal__col:nth-child(2)').removeClass('hide');
      $scope.wishlist_list = response.data;
    });
});

$scope.wishlist_row_select = function(index) {

  $http.post(APP_URL+"/save_wishlist", { data: $scope.room_id, wishlist_id: $scope.wishlist_list[index].id, saved_id: $scope.wishlist_list[index].saved_id }).then(function(response) 
  {
    if(response.data == 'null')
      $scope.wishlist_list[index].saved_id = null;
    else
      $scope.wishlist_list[index].saved_id = response.data;
  });

  if($('#wishlist_row_'+index).hasClass('text-dark-gray'))
    $scope.wishlist_list[index].saved_id = null;
  else
    $scope.wishlist_list[index].saved_id = 1;
};

$(document).on('submit', '.wl-modal-footer__form', function(event) {
    event.preventDefault();
    $('.wl-modal__col:nth-child(2)').addClass('hide');
    $('.row-margin-zero').append('<div id="wish-list-signup-container" style="overflow-y:auto;" class="col-lg-5 wl-modal__col-collapsible"> <div class="loading wl-modal__col"> </div> </div>');
    $http.post(APP_URL+"/wishlist_create", { data: $('.wl-modal-footer__input').val(), id: $scope.room_id }).then(function(response) 
    {
      $('.wl-modal-footer__form').addClass('hide');
      $('#wish-list-signup-container').remove();
      $('.wl-modal__col:nth-child(2)').removeClass('hide');
      $scope.wishlist_list = response.data;
      event.preventDefault();
    });
    event.preventDefault();
});

$('.wl-modal__modal-close').click(function()
{
  var null_count = $filter('filter')($scope.wishlist_list, {saved_id : null});
  
  if(null_count.length == $scope.wishlist_list.length)
    $('#wishlist-button').prop('checked', false);
  else
    $('#wishlist-button').prop('checked', true);

  $('.wl-modal__modal').addClass('hide');
});

}]);

//  calendar triggered

$("#view-calendar").click(function(){
        $("#list_checkin").trigger("select");
        return false;
    });
    
       
    $(".js-book-it-btn-container").click(function(){
         var checkin = $("#list_checkin").val();
        var checkout =  $("#list_checkout").val();
if(checkin == '' && checkout =='')
{
        $("#list_checkin").trigger("select");
        return false;
        }
    });

//  calendar triggered

// header and bookit container fixed

$(document).ready(function(){
        // Check the initial Poistion of the Sticky Header
        var stickyHeaderTop = $('#pricing').offset().top;
        var map = $('#host-profile').offset().top;
        $(window).scroll(function(){

                if( $(window).scrollTop() > stickyHeaderTop &&  $(window).width() >1000) {

                    if($(window).scrollTop() > map)
                    {
                        // $("#pricing").removeClass("fixed");
                    $("#book_it").removeClass("fixed");
                    $("#book_it").addClass("bottom");
                    $("#book_it").css("top","1430px");
                    
                    }
                    else
                    {
                        $("#book_it").css("top","40px");
                        $("#book_it").removeClass("bottom");
                    $("#pricing").addClass("fixed");
                    $("#book_it").addClass("fixed");
                    }
                    $( ".subnav").attr( "aria-hidden", "false" );
                              
                } else {
                    $("#book_it").css("top","0px");
                    $("#pricing").removeClass("fixed");
                    $("#book_it").removeClass("fixed");
                    $( ".subnav").attr( "aria-hidden", "true" );
                }
        });
    
    $('[data-behavior="modal-close"]').click(function()
    {
        $('.contact-modal').addClass('hide');
        $('.contact-modal').attr('aria-hidden','true');
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('ul.subnav-list li a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if(currLink.attr("data-extra") != undefined){
                var refElementExtend = $(currLink.attr("data-extra")); 
                if (refElementExtend.position().top-80 <= scrollPos && refElementExtend.position().top + refElementExtend.height() > scrollPos) {
                    $('ul.subnav-list li a').attr("aria-selected", 'false');
                    currLink.attr("aria-selected", 'true');
                }
            }
            if (refElement.position().top-80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('ul.subnav-list li a').attr("aria-selected", 'false');
                currLink.attr("aria-selected", 'true');
            }
            else{
                //currLink.attr("aria-selected", 'false');
            }
        });
    }
    $(document).ready(function(){
        $(document).on("scroll", onScroll);
    });
  });

// header and bookit container fixed