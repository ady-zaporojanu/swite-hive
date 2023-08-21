$(document).ready(function() {
    var rotationAngles = [-45, 45, 135, 225];

    // Attach click event to each featured item
    $('.featured-item').click(function() {
        var index = $(this).index();
        var rotationValue = rotationAngles[index];
        
        $('.hero-banner svg').css('pointer-events', 'none');

        // Use easing for a smoother animation
        $('.hero-banner svg').stop().animate({ rotation: rotationValue }, {
            step: function(now, fx) {
                $(this).css('transform', 'rotate(' + now + 'deg)');
                $('.news').removeClass('newsOut').addClass('newsIn');
                $('.title').removeClass('fadeOut').addClass('fadeIn');
                $('.description').removeClass('fadeOut').addClass('fadeIn');
            },
            duration: 800, // Animation duration (in milliseconds)
            easing: 'easeInOutCubic', // Easing function from jQuery Easing
            complete: function() {
                $('.hero-banner svg').css('pointer-events', 'auto'); // Re-enable clicks after animation
                $('.news').removeClass('newsIn').addClass('newsOut');
                $('.title').removeClass('fadeIn').addClass('fadeOut');
                $('.description').removeClass('fadeIn').addClass('fadeOut');
            }

            
        });

        $('.featured-item').removeClass('active');
        $(this).addClass('active');

        // Load JSON data from the file
        $.getJSON('./data/products.json', function(jsonData) {
            var selectedItem = '';
            switch(index) {
                case 0:
                    selectedItem = 'mango_honey';
                    break;
                case 1:
                    selectedItem = 'orange_honey';
                    break;
                case 2:
                    selectedItem = 'strawberry_honey';
                    break;
                case 3:
                    selectedItem = 'blackberry_honey';
                    break;
                default:
                    break;
            }

            if (selectedItem !== '') {
                var selectedData = jsonData[selectedItem];
                $('.news').text('New!');
                $('.title').text(selectedData.title);
                $('.description').text(selectedData.description);
                $('.fruit-background').attr('src', selectedData.background_image);
                $('body').css('background-color', selectedData.background_color);

                // Change the fill color of the SVG circle
                var svgCircle = document.getElementById('wheel-svg').querySelector('circle');
                if (svgCircle) {
                    svgCircle.style.transition = 'fill 0.8s ease-in-out';
                    setTimeout(function() {
                        svgCircle.style.fill = selectedData.color;
                    }, 400); // 8000 milisecunde (8 secunde)
                }
            }
        });
    });
});
