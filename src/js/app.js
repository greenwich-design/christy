const { set } = require("lodash");

App = {
    animations: function () {
        // observe images, change depending on which info box is in view
        let options = {
            root: null,
            //rootMargin: '0px',
            rootMargin: "0px 0px -100px 0px",
            threshold: [0, 0.25, 0.50, 0.75, 1]
        };

        const animationItems = document.querySelectorAll('.animation');
        if (animationItems.length) {
            const animationItemsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {

                    var ratio = entry.target.dataset.intratio;

                    if (!ratio) {
                        ratio = 0.25;
                    }
                    if (entry.intersectionRatio > 0) {
                        entry.target.classList.add('animated');
                        animationItemsObserver.unobserve(entry.target);
                    }

                });
            }, options);

            animationItems.forEach(animationItem => animationItemsObserver.observe(animationItem));
        }

    },

    productShowcase: function () {
        const showcaseWraps = document.querySelectorAll('.showcase-wrap');
        if (showcaseWraps.length) {

            function showcaseInit() {
                showcaseWraps.forEach(function (showcaseWrap) {

                    function init() {
                        let wrapWidth = showcaseWrap.parentElement.offsetWidth;
                        let wrapHeight = showcaseWrap.parentElement.offsetHeight;

                        let articles = showcaseWrap.querySelectorAll('.card');
                        if (articles.length) {
                            articles.forEach(function (article) {
                                // reset positions
                                article.style.left = '';
                                article.style.right = '';
                                article.style.top = '';
                                article.style.bottom = '';
                                article.style.transform = '';

                                let parent = article.closest('.group');

                                let articleWidth = article.offsetWidth;
                                let articleHeight = article.offsetHeight;
                                let articleLeft = article.offsetLeft + parent.offsetLeft + parent.offsetWidth / 2;
                                let articleTop = article.offsetTop + article.closest('.group').offsetTop + parent.offsetHeight / 2;


                                let totalW = articleWidth + articleLeft;

                                // if articles width and left is more that wrap width, position right, else left

                                let translated = false;

                                if (totalW < wrapWidth && articleLeft > (article.offsetWidth / 2)) {
                                    article.style.left = '50%';
                                    article.style.transform = 'translateX(-50%)';
                                    translated = true;
                                } else if (totalW > wrapWidth) {
                                    article.style.right = '100%';
                                } else {
                                    article.style.left = '100%';
                                }

                                let totalH = articleHeight + articleTop;

                                if (totalH < wrapWidth && articleTop > (article.offsetHeight / 2) && !translated) {
                                    article.style.top = '50%';
                                    if (translated) {
                                        article.style.transform = 'translateX(-50%) translateY(-50%)';
                                    } else {
                                        article.style.transform = 'translateY(-50%)';
                                    }
                                } else if (totalH > wrapHeight) {
                                    article.style.bottom = '100%';
                                } else {
                                    article.style.top = '100%';
                                }

                            });
                        }
                    }

                    init();

                });
            }

            showcaseInit();

            window.addEventListener('resize', function () {
                showcaseInit();
            });
        }
    },

    headerNav: function () {

        const details = document.querySelectorAll("header-menu details");

        document.addEventListener('click', function () {
            details.forEach(function (el) {
                el.removeAttribute('open')
            });
        });

        details.forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.stopPropagation()
            });

            el.addEventListener('toggle', function (e) {
                if (el.hasAttribute('open')) {
                    setTimeout(function () {
                        el.querySelector(':scope > div').classList.add('transition-[opacity,transform]', '!opacity-100', '!translate-y-0');
                    }, 100);
                } else {
                    el.querySelector(':scope > div').classList.remove('transition-[opacity,transform]', '!opacity-100', '!translate-y-0');
                }
            });
        });


        // Add the onclick listeners.
        details.forEach((targetDetail) => {
            targetDetail.addEventListener("click", () => {
                // Close all the details that are not targetDetail.
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute("open");
                    }
                });
            });
        });
    },

    navMob: function () {
        const btns = document.querySelectorAll('[data-scrollerbtn]');

        if (btns.length) {
            btns.forEach(function (btn, i) {
                btn.addEventListener('click', function () {
                    let scrollAmt = i * -100;
                    const scroller = btn.closest('[data-scrollerpar]').querySelector('[data-scroller]');
                    const footer = btn.closest('[data-scrollerpar]').querySelector('.footer');
                    scroller.style.transform = 'translateX(' + scrollAmt + '%)';

                    btn.closest('[data-scrollerpar]').querySelectorAll('[data-scrollerbtn]').forEach((sbtn) => sbtn.classList.remove('selected-tab'));
                    btn.classList.add('selected-tab');

                    footer.classList.add('opacity-0');
                    setTimeout(function () {
                        scroller.querySelectorAll(':scope > li').forEach((li) => li.classList.remove('active'));
                        scroller.querySelector(':scope > li:nth-child(' + (i + 1) + ')').classList.add('active');

                        footer.classList.remove('opacity-0');
                    }, 500);
                });
            });
        }

        const navMob = document.querySelector('#NavMob');
        function navMobOpen() {
            navMob.classList.add('open');
        }

        function navMobClose() {
            navMob.classList.remove('open');
        }

        const openBtn = document.querySelector('[data-navmobopen]');
        openBtn.addEventListener('click', function () {
            if (navMob.classList.contains('open')) {
                navMobClose();
                document.querySelector('html').classList.remove('overflow-hidden');
            } else {
                navMobOpen();
                document.querySelector('html').classList.add('overflow-hidden');
            }
        });
    },

    navTrans: function () {

        let productMobileGallery = document.querySelector('#product-mobile-gallery');
        let productInfoWrap = document.querySelector('#product-info-wrap');
        let prevScroll = 0;

        let scrollUpStart = 0;
        let scrollDownStart = 0;
        let direction = '';

        let headerBar = document.querySelector('.header-bar');
        let headerBarHeight = headerBar.offsetHeight;
        let headerTransTimer = null;
        let headerTransTimer2 = null;
        let downSetted = false;
        let scrollTop = '';
        let prevScrollEl = '';

        handleScroll = function (e, type = 'default') {

            // close open drawers in header
            document.querySelectorAll('.header-bar [open]').forEach(function (el) {
                el.removeAttribute('open')
            });


            clearTimeout(headerTransTimer);
            clearTimeout(headerTransTimer2);

            if (e.target.scrollTop) {
                scrollTop = e.target.scrollTop;
            } else {
                scrollTop = window.scrollY;
            }

            let offsetHeight = headerBarHeight;
            if (type == 'gallery') {
                offsetHeight = 0;
            }

            if (prevScroll < scrollTop && offsetHeight < scrollTop) {
                headerBar.classList.add('duration-500', '!-translate-y-full');
            } else {
                headerBar.classList.remove('!-translate-y-full');
                headerTransTimer = setTimeout(function () {
                    headerBar.classList.remove('duration-500');
                }, 500);
            }

            // old scrolling method
            /*
            if (prevScroll < scrollTop) {

                if (scrollTop > 0 && !downSetted) {
                    headerBar.classList.remove('!translate-y-0', '!-translate-y-full', 'duration-500');
                    let pastHit = false;

                    if (direction != 'down') {
                        scrollDownStart = scrollTop;
                        direction = 'down';
                    }


                    let offsetPos;

                    if ((scrollTop - headerBarHeight) <= (scrollDownStart)) {
                        offsetPos = scrollDownStart - (scrollTop);
                        offsetPos = offsetPos / 0.7;
                        headerBar.style.transform = 'translateY(' + offsetPos + 'px)';
                    }

                    if ((scrollTop - ((headerBarHeight / 2) * 0.7)) >= (scrollDownStart)) {
                        pastHit = true;
                    } else {
                        pastHit = false;
                    }

                    headerTransTimer = setTimeout(function () {
                        headerBar.classList.add('duration-500');

                        headerTransTimer2 = setTimeout(function () {
                            if (pastHit) {
                                headerBar.classList.add('!-translate-y-full');
                                downSetted = true;
                            } else {
                                headerBar.classList.add('!translate-y-0');
                                scrollDownStart = scrollTop;
                                headerBar.style.transform = 'translateY(0px)';
                            }
                        }, 500);

                    }, 100);

                }

            } else {
                if (direction != 'up') {
                    scrollUpStart = scrollTop - headerBar.offsetHeight;
                    headerBar.style.transform = 'translateY(0px)';
                    headerBar.classList.remove('!-translate-y-full');
                    headerBar.classList.add('duration-500', '!translate-y-0');
                    direction = 'up';

                    downSetted = false;
                }

            }*/


            prevScroll = scrollTop;
        }

        window.addEventListener('scroll', handleScroll);
        if (productMobileGallery) {
            productMobileGallery.addEventListener('scroll', function (e) {
                handleScroll(e, 'gallery');
            });
        }
        if (productInfoWrap) {
            //productInfoWrap.addEventListener('scroll', handleScroll);
        }


    },

    accordion: function () {
        const accs = document.querySelectorAll('[data-acc]');
        if (accs.length) {
            accs.forEach(function (acc) {
                acc.addEventListener('click', function () {
                    acc.parentNode.classList.toggle('open');


                    if (acc.closest('.acc-parent')) {

                        if (!acc.closest('.acc-parent').classList.contains('open') && acc.dataset.acc == "once") {
                            acc.closest('.acc-parent').classList.toggle('open');
                        }

                        if (acc.closest('.acc-parent').querySelector('[data-accnext]')) {
                            let getTop = (acc.closest('.acc-parent').querySelector('[data-accnext]').getBoundingClientRect().top + window.scrollY) - document.querySelector('.header-bar').offsetHeight;

                            window.scrollTo({
                                top: getTop,
                                behavior: 'smooth'
                            });
                        }
                    }

                });
            });
        }
    },

    pageAnchor: function () {
        const pageAnchors = document.querySelectorAll('[data-pageanchor]');

        if (pageAnchors.length) {
            pageAnchors.forEach((anchor) => {
                let id = anchor.dataset.pageanchor;
                let target = document.getElementById(id)

                if (target) {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const headerBarHeight = document.querySelector('.header-bar').offsetHeight;
                        let elTop = target.getBoundingClientRect().top + window.scrollY - (headerBarHeight * 1.5);
                        window.scrollTo({
                            top: elTop,
                            behavior: 'smooth'
                        });

                    });
                }
            });
        }
    },

    sizeGuide: function () {
        const sizeGuideTo = document.querySelector('[data-sizeguideto]');
        const sizeGuideSection = document.querySelector('[data-sizeguide]');

        if (sizeGuideTo && sizeGuideSection) {

            sizeGuideTo.addEventListener('click', function (e) {
                e.preventDefault();

                const sizeGuideTo = document.querySelector('[data-sizeguideto]');
                const sizeGuideSection = document.querySelector('[data-sizeguide]');

                sizeGuideSection.classList.add('open');


                let elTop = sizeGuideSection.getBoundingClientRect().top + window.scrollY;

                let mediaGal = document.querySelector('.product__gallery');
                let prodWrap = document.querySelector('.product__info-wrapper');

                let headerHeight = document.querySelector('.header-bar').offsetHeight;
                let target = elTop - headerHeight;

                let offset = 0;
                if (mediaGal && prodWrap) {

                    if (mediaGal.offsetHeight > prodWrap.offsetHeight) {
                        let difference = mediaGal.offsetHeight - prodWrap.offsetHeight;

                        if (prodWrap.offsetTop < difference) {
                            offset = difference;
                        }
                    }
                }

                window.scrollTo({
                    top: target + offset,
                    behavior: 'smooth'
                });



            });

        }
    },

    productWrapper: function () {

    },

    goTop: function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    overflowFloatedStyle: function () {

        const overflowWraps = document.querySelectorAll('.js-overflow-styled');
        if (overflowWraps.length) {
            overflowWraps.forEach(function (overflowWrap) {
                const overflow = overflowWrap.querySelector('.js-overflow-wrap');
                if (overflow) {
                    const overflowFloated = overflowWrap.querySelector('.js-overflow-floated');
                    overflow.style.paddingBottom = overflowFloated.offsetHeight + 'px';

                    if (overflow.scrollHeight > overflow.offsetHeight) {
                        overflowWrap.classList.add('has-overflow');
                    } else {
                        overflowWrap.classList.remove('has-overflow');
                    }
                }

            });
        }


    },

    modals: function () {
        const modalTriggers = document.querySelectorAll('[data-modaltrigger]');
        const modalCloses = document.querySelectorAll('[data-modalclose]');
        const modals = document.querySelectorAll('[data-modal]');

        function closeModals() {
            document.querySelector('html').classList.remove('overflow-hidden');
            if (modals.length) {
                modals.forEach(function (modal) {
                    modal.classList.remove('active');
                });
            }
        }

        function closeModal(el) {
            if (modalCloses.length) {
                modalCloses.forEach(function (close) {
                    close.addEventListener('click', function () {
                        document.querySelector('html').classList.remove('overflow-hidden');
                        close.closest('.modal').classList.remove('active');
                    });
                });
            }
        }
        closeModal();


        if (modalTriggers.length) {
            modalTriggers.forEach(function (trigger) {
                let id = trigger.dataset.modaltrigger;
                let modal = document.querySelector('[data-modal="' + id + '"]');
                if (modal) {
                    trigger.addEventListener('click', function () {
                        closeModals();

                        document.querySelector('html').classList.add('overflow-hidden');
                        modal.classList.add('active');
                    });
                }

            });
        }
    },

    init: function () {
        App.animations();
        App.accordion();
        App.productShowcase();
        App.sizeGuide();
        App.productWrapper();
        App.overflowFloatedStyle();
        App.headerNav();
        App.navMob();
        App.navTrans();
        App.pageAnchor();
        App.modals();
    }
}


//document.addEventListener("DOMContentLoaded", function () {
App.init();
//});


document.addEventListener('shopify:section:load', function (event) {
    App.init();
});

window.addEventListener('resize', function () {
    App.overflowFloatedStyle();
});

window.addEventListener('load', function () {

    // refresh again to account for animations
    setTimeout(function () {
        App.productShowcase();
    }, 601);

});

