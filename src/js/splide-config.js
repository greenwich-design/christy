
SplideConfig = {
    initSplides: function () {
        const splides = document.querySelectorAll('.splide');

        if (splides.length) {

            splides.forEach(function (splide) {

                var splideItem = new Splide(splide, {
                    classes: {
                        // Add classes for pagination.
                        pagination: 'splide__pagination text-[0px] !static !mt-10', // container
                        page: 'splide__pagination__page !h-[2px] !w-[40px] !m-0 !mx-[6px] !rounded-none [&.is-active]:!bg-blue-1', // each button
                        arrow: 'splide__arrow',
                    }
                });


                splideItem.on('move', function () {
                    const videos = splide.querySelectorAll('video');
                    if (videos) {
                        videos.forEach(function (video) {
                            video.pause();
                        });
                    }
                });

                splideItem.on('active', function (slide) {
                    var video = slide.slide.querySelector('video');
                    if (video) {
                        if (video) {
                            video.play();
                        }
                    }
                });

                // custom pagination
                const pagination = splide.querySelectorAll('.splide-pag > *');
                if (pagination.length) {

                    pagination.forEach(function (pagItem, index) {
                        pagItem.addEventListener('click', function (e) {
                            e.preventDefault();
                            splideItem.go(index);
                        });
                    });

                    splideItem.on('moved', function (i) {
                        pagination.forEach(function (pagItem, index) {
                            pagItem.classList.remove('active', 'font-semibold', 'underline');
                        });
                        pagination[i].classList.add('active', 'font-semibold', 'underline');
                    });
                }

                var barWrap = splide.querySelector('.slider-progress');
                var bar = splide.querySelector('.slider-progress-bar');

                if (bar) {
                    // Updates the bar width whenever the carousel moves:
                    splideItem.on('mounted move', function () {
                        var end = splideItem.Components.Controller.getEnd() + 1;
                        var rate = Math.min((splideItem.index + 1) / end, 1);
                        bar.style.width = String(100 * rate) + '%';

                    });

                    splideItem.on('mounted', function () {
                        let items = splideItem.Components.Controller.getEnd() + 1;

                        // for items length, add a span element to the bar
                        for (let i = 0; i < items; i++) {
                            let span = document.createElement('span');
                            span.classList.add('h-[2px]', '!w-[40px]', '!m-0', '!mx-[6px]', 'bg-blue-1/20');
                            barWrap.appendChild(span);
                        }
                    });


                }


                splideItem.mount();

                window.addEventListener('spliderefresh', function () {
                    splideItem.refresh();
                });

            });
        }

        function pad(num, size) {
            num = num.toString();
            while (num.length < size) num = "0" + num;
            return num;
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    SplideConfig.initSplides();
});


document.addEventListener('shopify:section:load', function (event) {
    SplideConfig.initSplides();
});