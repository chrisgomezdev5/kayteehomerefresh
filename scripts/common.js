(function ($) {
    $('.product-description-accordion').each(function(){
        var tabHeading = $('.product-description-accordion .panel .panel-heading');        
        tabHeading.on('click', function(){
            $(this).parents('.panel').siblings().find('.panel-collapse').slideUp();
        })
    })

    $('.bottom-scrollable-items').each(function() {
        $(this).find('.item-container').first().addClass('active');
    });

    //bottom-scrollable-items component next button 
    // Move all .item-container elements to the left by their width + 10px when .next-button is clicked
    $('.bottom-scrollable-items .next-button').on('click', function() {
        var $containers = $(this).parent().find('.item-container');
        if ($containers.length === 0) {return;}

        // Assume all .item-container elements are siblings inside a parent
        var $parent = $containers.parent();
        var parentWidth = $parent.width();
        var lastItem = $containers.last();
        var lastItemRight = lastItem.position().left + lastItem.outerWidth(true);

        // If the last item's right edge is within the parent, wrap to first item
        console.log('lastItemRight:', lastItemRight, 'parentWidth:', parentWidth);
        if (lastItemRight <= parentWidth + 150) {
            // Wrap to first item - reset all items to starting position
            $containers.each(function() {
                var $item = $(this);
                $item.css('position', 'relative');
                $item.css('left', '0px');
                
                // Toggle active class for mobile devices
                if ($(window).width() < 768) {
                    $item.removeClass('active');
                    if ($item.is($containers.first())) {
                        $item.addClass('active');
                    }
                }
                
                showBottomScrollableItem($item); 
            });
            return;
        }

        $containers.each(function() {
            var $item = $(this);
            var moveAmount = $item.outerWidth(true);
            var currentLeft = parseInt($item.css('left')) || 0;
            $item.css('position', 'relative');
            $item.css('left', ((currentLeft - moveAmount)) + 'px');
            
            // Toggle active class for mobile devices
            if ($(window).width() < 768) {
                var itemLeft = $item.position().left;
                var itemWidth = $item.outerWidth(true);
                var itemCenter = itemLeft + (itemWidth / 2);
                var parentCenter = parentWidth / 2;
                
                $item.removeClass('active');
                if (Math.abs(itemCenter - parentCenter) < (itemWidth / 2)) {
                    $item.addClass('active');
                }
            }
            
            showBottomScrollableItem($item);
        });
    });

    //bottom-scrollable-items component prev button
    // Move all .item-container elements to the right by their width + 10px when .prev-button is clicked
    $('.bottom-scrollable-items .prev-button').on('click', function() {
        var $containers = $(this).parent().find('.item-container');
        if ($containers.length === 0) {return;}

        // Assume all .item-container elements are siblings inside a parent
        //var $parent = $containers.parent();
        var firstItem = $containers.first();
        var firstItemLeft = firstItem.position().left;

        // If the first item's left edge is at or past the parent's left edge, wrap to last item
        if (firstItemLeft >= 0) {
            // Wrap to last item - calculate how far to move to show the last item
            var $parent = $containers.parent();
            var parentWidth = $parent.width();
            var totalWidth = 0;
            var offset = 0;
            
            let withOuterWidth = true;
            if ($(window).width() < 768) {
                withOuterWidth = false;
                offset = 0;
            }
                

            // Calculate total width of all items
            $containers.each(function() {
                totalWidth += ($(this).outerWidth(withOuterWidth) - offset);
            });
            
            // Move all items to show the last item(s)
            var moveAmount = totalWidth - parentWidth;
            //var moveAmount = totalWidth - 320;
            console.log('Wrapping to last item, moveAmount:', moveAmount);
            //$($containers[0]).css('left', '0px');
            //const itemContainerWidth = $($containers[0]).outerWidth(true);
            //for (var i = 1; i < $containers.length; i++) {
            //    const $item = $($containers[i-1]);
            //    $item.css('left', (-(itemContainerWidth * i)) + 'px');
            //}
            $containers.each(function() {
                var $item = $(this);
                $item.css('position', 'relative');
                if ($(window).width() < 768) {
                    $item.css('left', ((-moveAmount)) + 'px');
                } else {
                    $item.css('left', ((-moveAmount)) + 'px');
                }
                
                // Toggle active class for mobile devices
                if ($(window).width() < 768) {
                    $item.removeClass('active');
                    if ($item.is($containers.last())) {
                        $item.addClass('active');
                    }
                }
                
                showBottomScrollableItem($item);
            });
            return;
        }

        $containers.each(function() {
            console.log('Moving right');
            var $item = $(this);
            var moveAmount = $item.outerWidth(true);
            var currentLeft = parseInt($item.css('left')) || 0;
            $item.css('position', 'relative');
            $item.css('left', (currentLeft + moveAmount) + 'px');
            
            // Toggle active class for mobile devices
            if ($(window).width() < 768) {
                var $parent = $item.parent();
                var parentWidth = $parent.width();
                var itemLeft = $item.position().left;
                var itemWidth = $item.outerWidth(true);
                var itemCenter = itemLeft + (itemWidth / 2);
                var parentCenter = parentWidth / 2;
                
                $item.removeClass('active');
                if (Math.abs(itemCenter - parentCenter) < (itemWidth / 2)) {
                    $item.addClass('active');
                }
            }
            
            showBottomScrollableItem($item);
        });
    });

    function showBottomScrollableItem($item) {
        console.log($item);
        //let itemLeft = $item.position().left;
        //let itemWidth = $item.outerWidth(true);
        //let itemRight = itemLeft + itemWidth;
        //let parentWidth = 0;
        //parentWidth = $('.bottom-scrollable-items').width();
        //console.log('itemLeft:', itemLeft, 'itemRight:', itemRight, 'parentWidth:', parentWidth);
       
        // Check if item is fully visible within parent bounds
        //if (itemLeft >= 0 && ((itemRight + 20) <= parentWidth)) {
        //    $item.addClass('fully-visible');
        //}
        //else {
        //    $item.removeClass('fully-visible');
        //}

        return true;

    }

    $('#community .item-container').each(function() {
        showBottomScrollableItem($(this));
    });
 

    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });


    $('.volume-container').on('click', function() {
        var $audio = $('#wildbirds-audio');
        $(this).toggleClass('unmuted');
        if ($audio.length > 0) {
            
            $audio[0].muted = !$audio[0].muted;
            if ($audio[0].muted) {
                $audio[0].pause();
                $('.volume-off').removeClass('show');
                $('.volume-on').addClass('show');
            }
            else {
                $audio[0].play();
                $('.volume-on').removeClass('show');
                $('.volume-off').addClass('show');
            }

        }
    });

    $('.options-contains .option').on('click', function() {
        $(this).toggleClass('selected');
        
        // Toggle the checked property for each checkbox
        if ($(this).is('.options-contains .option:first')) {
            const $checkbox = $('.hs-form-checkbox:first input[type="checkbox"]');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
        }

        if ($(this).is('.options-contains .option:nth-child(2)')) {
            const $checkbox = $('.hs-form-checkbox:nth-child(2) input[type="checkbox"]');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
        }       
        
        if ($(this).is('.options-contains .option:nth-child(3)')) {
            const $checkbox = $('.hs-form-checkbox:nth-child(3) input[type="checkbox"]');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
        }
        
    });



    //video-icon-cta-hero **************
    $('.icon-cta-container .icon-cta').first().on('click', function() {
        const href = $(this).find('a').attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });

    $('.icon-cta-container .icon-cta').eq(1).on('click', function() {
        const href = $(this).find('a').attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });

    $('.icon-cta-container .icon-cta').eq(2).on('click', function() {
        const href = $(this).find('a').attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });



    $('.fixed-navigation a').first().on('click', function(event) {
        event.preventDefault();
        const href = $(this).attr('href');
        console.log('href:', href);
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });

    $('.fixed-navigation a').eq(1).on('click', function(event) {
        event.preventDefault();
        const href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });

    $('.fixed-navigation a').eq(2).on('click', function(event) {
        event.preventDefault();
        const href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top - 50
        }, 800, 'swing');
    });

    $(window).on('scroll', function() {
        var $videoHero = $('.video-icon-cta-hero');
        var $fixedNav = $('.fixed-navigation');
        
        if ($videoHero.length > 0) {
            var videoHeroBottom = $videoHero.offset().top + $videoHero.outerHeight() - 70;
            var scrollTop = $(window).scrollTop();
            
            if (scrollTop >= videoHeroBottom) {
                $fixedNav.addClass('show');
            } else {
                $fixedNav.removeClass('show');
            }
        }
    });

    //video-icon-cta-hero **************


    //right-carousel-banner component
    $('.right-carousel-banner .slide').first().addClass('active');

    $('.right-carousel-banner .carousel-button').on('click', function() {
        var slideIndex = $(this).data('slide');
        var $carouselContainer = $(this).closest('.right-carousel-banner');
        
        // Update active states for buttons
        $carouselContainer.find('.carousel-button').removeClass('active');
        $carouselContainer.find('.carousel-button').css('background', 'white');
        $(this).addClass('active');
        $(this).css('background', '#C01F3A');
        
        // Update active slide
        $carouselContainer.find('.slide').removeClass('active').css('opacity', '0');
        $carouselContainer.find('.slide[data-slide-index="' + slideIndex + '"]')
            .addClass('active')
            .css('opacity', '1');
    });


    //animal filter component

    // Function to populate animal items
    function populateAnimalItems(animalType) {
        var $container = $('.animal-filter');
        var $activeItems = $container.find('.animal-filter-items[data-animal="' + animalType + '"]');
        var data = animalData[animalType];
        var startIndex = animalcurrentIndex[animalType];
        
        // Get all 8 animal-filter-item containers
        var $items = $activeItems.find('.animal-filter-item');
        
        // Populate each of the 8 containers
        $items.each(function(index) {
            var dataIndex = (startIndex + index) % data.length;
            var itemData = data[dataIndex];
            
            $(this).find('.animal-filter-item-icon img').attr('src', itemData.image);
            $(this).find('.animal-filter-item-title').text(itemData.title);
        });
    }

    // Initialize on page load - populate the first selected animal type
    $(document).ready(function() {
        var $container = $('.animal-filter');
        var $selectedButton = $container.find('.filter-button.selected');
        if ($selectedButton.length === 0) {
            $selectedButton = $container.find('.filter-button').first().addClass('selected');
        }
        var animalType = $selectedButton.data('animal');
        
        // Hide all animal-filter-items except the selected one
        $container.find('.animal-filter-items').hide();
        $container.find('.animal-filter-items[data-animal="' + animalType + '"]').show();
        
        // Populate the visible items
        populateAnimalItems(animalType);
    });

    // Filter button click handler
    $('.animal-filter .filter-button').on('click', function() {
        var animalType = $(this).data('animal');
        var $container = $(this).closest('.animal-filter');
        
        // Toggle selected class on buttons
        $container.find('.filter-button').removeClass('selected');
        $(this).addClass('selected');
        
        // Hide all animal filter items
        $container.find('.animal-filter-items').hide();
        
        // Show only the matching animal type items
        var $activeItems = $container.find('.animal-filter-items[data-animal="' + animalType + '"]');
        $activeItems.show();
        
        // Reset index and populate
        animalcurrentIndex[animalType] = 0;
        populateAnimalItems(animalType);
    });

    // Left arrow - shift array left (items move right visually)
    $('.animal-filter .left-arrow').on('click', function() {
        var $container = $(this).closest('.animal-filter');
        var $selectedButton = $container.find('.filter-button.selected');
        var animalType = $selectedButton.data('animal');
        var data = animalData[animalType];
        
        // Move index left (wrapping around)
        animalcurrentIndex[animalType] = (animalcurrentIndex[animalType] - 1 + data.length) % data.length;
        
        // Repopulate items
        populateAnimalItems(animalType);
    });

    // Right arrow - shift array right (items move left visually)
    $('.animal-filter .right-arrow').on('click', function() {
        var $container = $(this).closest('.animal-filter');
        var $selectedButton = $container.find('.filter-button.selected');
        var animalType = $selectedButton.data('animal');
        var data = animalData[animalType];
        
        // Move index right (wrapping around)
        animalcurrentIndex[animalType] = (animalcurrentIndex[animalType] + 1) % data.length;
        
        // Repopulate items
        populateAnimalItems(animalType);
    });

})(jQuery);