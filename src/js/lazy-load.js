// LAZY LOAD images with fallback
// Lazy Load images.  Make sure image as data-src, data-srcset present, and loading="lazy". Remove src attribute

function lazyLoadImages() {

    if ('IntersectionObserver' in window) {

        const images = document.querySelectorAll('img[data-src][loading="lazy"]:not(.loaded)');

        // add spinners
        images.forEach(img => {
            let spinner = img.parentNode.querySelector('.loading-overlay__spinner');
            if (spinner) {
                spinner.classList.remove('hidden');
            }
        });

        // observer loading
        /*
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;

                    let spinner = image.parentNode.querySelector('.loading-overlay__spinner');

                    image.src = image.dataset.src;
                    if (image.dataset.srcset) {
                        image.srcset = image.dataset.srcset;
                    }

                    image.onload = () => {
                        if (image.classList.contains('opacity-0')) {
                            image.classList.remove('opacity-0');
                        }

                        if (spinner) {
                            spinner.classList.add('hidden');
                        }
                    }

                    imageObserver.unobserve(image);

                    image.classList.add('loaded');
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
        */

        const loadImg = (image) => {

            let spinner = image.parentNode.querySelector('.loading-overlay__spinner');

            image.src = image.dataset.src;
            if (image.dataset.srcset) {
                image.srcset = image.dataset.srcset;
            }

            image.onload = () => {



                if (image.classList.contains('opacity-0')) {
                    image.classList.remove('opacity-0');
                }



                if (spinner) {
                    spinner.classList.add('hidden');
                }
            }


            image.classList.add('loaded');
        }

        images.forEach(image => loadImg(image));

    } else {

        if ('loading' in HTMLImageElement.prototype) {
            let images = document.querySelectorAll('img[data-src][loading="lazy"]:not(.loaded)');
            images.forEach(img => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        } else {
            // Dynamically import the LazySizes library
            let script = document.createElement('script');
            script.src =
                'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

    }
}

function supportsHEVCAlpha() {
    const navigator = window.navigator;
    const ua = navigator.userAgent.toLowerCase()
    const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo)
    const isSafari = ((ua.indexOf('safari') != -1) && (!(ua.indexOf('chrome') != -1) && (ua.indexOf('version/') != -1)))
    return isSafari && hasMediaCapabilities
}

function lazyLoadVideos() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (video) {
                if (video.isIntersecting) {



                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            if (supportsHEVCAlpha() && videoSource.dataset.srcmov) {
                                videoSource.src = videoSource.dataset.srcmov;
                            } else {
                                videoSource.src = videoSource.dataset.src;
                            }
                        }
                    }

                    video.target.load();

                    video.target.addEventListener('timeupdate', (event) => {
                        setTimeout(function () {
                            video.target.classList.remove("lazy", "opacity-0");
                        }, 500);
                    });

                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
}

// safari doesn't load srcset images after ajax
function resetSrcset() {
    let ee = document.querySelectorAll('[loading="eager"]:not(.loaded)');
    if (ee.length) {
        ee.forEach((e) => {
            let srcset = e.srcset;
            e.srcset = '';
            e.srcset = srcset;
            e.classList.add('loaded');
        })
    }
}

function lazyLoadIframes() {
    const iframes = document.querySelectorAll('iframe[data-src]:not(.loaded)');
    if (iframes.length) {
        iframes.forEach(iframe => {
            iframe.src = iframe.dataset.src;
            iframe.classList.add('loaded');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    lazyLoadVideos();
});

document.addEventListener('shopify:section:load', function (event) {
    lazyLoadImages();
    lazyLoadVideos();
});

window.addEventListener('lazyimg', () => {
    lazyLoadImages();

});

window.addEventListener('load', () => {
    lazyLoadIframes();
});