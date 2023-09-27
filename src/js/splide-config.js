
SplideConfig = {
    initSplides: function () {
        const splides = document.querySelectorAll('.splide:not(.splide-custom)');

        if (splides.length) {

            splides.forEach(function (splide) {

                var splideItem = new Splide(splide, {
                    classes: {
                        // Add classes for pagination.
                        pagination: 'splide__pagination text-[0px] !static !mt-10 flex-wrap gap-y-2', // container
                        page: 'splide__pagination__page !bg-transparent !h-auto !w-auto !py-2 after:!h-[2px] after:!w-[40px] !m-0 !mx-[6px] !rounded-none after:!bg-blue-1 after:block !opacity-50 [&.is-active]:!opacity-100', // each button
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

                    if (document.querySelector('#colour-picker-mobile')) {
                        document.querySelector('#colour-picker-mobile').classList.remove('!-translate-y-full', '!opacity-100', '!visible');
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


        // product gallery

        if (document.querySelector('#media-gallery-mob')) {
            var main = new Splide('#media-gallery-mob', {
                type: 'slide',
                pagination: false,
                arrows: true,
                cover: true,
            });

            main.on('move', function () {
                if (document.querySelector('#colour-picker-mobile')) {
                    document.querySelector('#colour-picker-mobile').classList.remove('!-translate-y-full', '!opacity-100', '!visible');
                }
            });
        }

        if (document.querySelector('#media-gallery-thumbs')) {
            var thumbnails = new Splide('#media-gallery-thumbs', {
                rewind: true,
                fixedWidth: 61,
                fixedHeight: 61,
                isNavigation: true,
                gap: 10,
                focus: 'center',
                pagination: false,
                cover: true,
                arrows: false,
                dragMinThreshold: {
                    mouse: 4,
                    touch: 10,
                },
                breakpoints: {
                    640: {
                        fixedWidth: 61,
                        fixedHeight: 61,
                    },
                },
            });
        }

        if (document.querySelector('#media-gallery-mob')) {
            main.sync(thumbnails);
            main.mount();
        }

        if (document.querySelector('#media-gallery-thumbs')) {
            thumbnails.mount();
        }

        window.addEventListener('splidegalrefresh', function () {

            main.on('refresh', function () {
                const lazyimg = new Event('lazyimg');
                window.dispatchEvent(lazyimg);

            });

            main.refresh();
            thumbnails.refresh();
        });



    }
}


document.addEventListener('DOMContentLoaded', function () {
    SplideConfig.initSplides();
});


document.addEventListener('shopify:section:load', function (event) {
    SplideConfig.initSplides();
});