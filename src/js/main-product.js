document.addEventListener('DOMContentLoaded', function () {
    const windowHeight = window.innerHeight;
    const el = document.querySelector('#product-page');
    const productPanel = document.querySelector('#product-panel');
    const gallery = document.querySelector('#product-mobile-gallery');
    const productInfoHandle = document.querySelector('#product-info-handle');
    const productWrap = document.querySelector('#product-wrap');
    const productInfoWrap = document.querySelector('#product-info-wrap');
    const mobOptions = document.querySelector('[data-moboptions]');
    let mobOptionsHeight = 0;


    // colour picker
    const toggleColours = document.querySelector('[data-togglecolours]');
    const colourPickerMobile = document.querySelector('#colour-picker-mobile');
    let colourPickerMobileHeight = 0;

    el.classList.remove('max-md:opacity-0');

    if (mobOptions) {
        mobOptionsHeight = mobOptions.offsetHeight;
    }

    if (colourPickerMobile) {
        colourPickerMobileHeight = colourPickerMobile.offsetHeight;
    }

    let optionsOpen = false;
    function initProd() {
        // add init class
        el.classList.add('init');

        setTimeout(function () {
            el.classList.add('[&.init]:max-md:transition-[transform,background]', 'max-md:!duration-500');
        }, 2);
    }

    initProd();

    // on initial load, get product panel height, and set it as a css variable

    function checkWhetherCanDrawer() {
        /*
        if (productPanel.offsetHeight + productInfoHandle.offsetHeight - mobOptionsHeight > window.innerHeight / 2) {
            productWrap.classList.add('no-drawer');
        } else {
            productWrap.classList.remove('no-drawer');
        }*/

        if ((productPanel.offsetHeight + productInfoHandle.offsetHeight + colourPickerMobileHeight) > (window.innerHeight - (document.querySelector('.header-bar').offsetHeight * 1.5))) {
            if (!productWrap.classList.contains('no-drawer')) {
                productWrap.classList.add('no-drawer');
                productWrap.scrollTop = 0;
            }
        } else {
            if (productWrap.classList.contains('no-drawer')) {
                productWrap.classList.remove('no-drawer');
                productWrap.scrollTop = 0;
            }
        }
    }




    function setPanelHeight() {
        checkWhetherCanDrawer();

        if (productWrap.classList.contains('no-drawer')) {
            document.documentElement.style.setProperty('--product-panel', '0px');
        } else {
            let panelHeight = productPanel.offsetHeight + productInfoHandle.offsetHeight;
            if (panelHeight > el.offsetHeight) {
                panelHeight = el.offsetHeight;
                if (el.dataset.pos == 'bottom' || el.dataset.pos == '') {
                    setTimeout(function () {
                        setTop();
                    }, 501);
                }
            }
            document.documentElement.style.setProperty('--product-panel', panelHeight + 'px');
        }
    }

    setPanelHeight();

    function openOptionsMob() {
        let mobOptions = document.querySelector('[data-moboptions]');
        mobOptions.style.height = 'auto';
        mobOptions.dataset.moboptions = 'true';

        setPanelHeight();
        optionsOpen = true;
        mobOptionsHeight = mobOptions.offsetHeight;
        productInfoWrap.classList.add('max-md:!overflow-auto');
    }

    function closeOptionsMob() {
        let mobOptions = document.querySelector('[data-moboptions]');
        //mobOptions.style.height = '0px';
        //mobOptions.dataset.moboptions = 'false';

        setPanelHeight();
        optionsOpen = false;
        mobOptionsHeight = mobOptions.offsetHeight;
    }

    let setBottom;
    let setTop;

    if (el && gallery) {
        let moving = false;
        let firstClick = '';
        let startVal = '';
        let startVal2 = '';
        let targetVal = '';
        let notLocked = true;
        let initialClick = '';
        let direction = '';

        function getFirstClick(event) {
            if (event.clientY) {
                initialClick = event.clientY;
            } else if (event.changedTouches) {
                initialClick = event.changedTouches[0].clientY;
            }
        }

        setTop = function setTop() {
            if (colourPickerMobile) {
                colourPickerMobile.classList.remove('!-translate-y-full');
                colourPickerMobile.classList.remove('!opacity-100');
                colourPickerMobile.classList.remove('!visible');
            }

            setTimeout(function () {
                el.style.transform = 'translateY(-100%)';
                productInfoWrap.classList.add('max-md:!overflow-auto');

                const splideRefresh = new Event('spliderefresh');
                window.dispatchEvent(splideRefresh);
            }, 100);

            notLocked = false;

            //el.classList.add('max-md:z-50');

            el.dataset.pos = 'top';
        }

        setBottom = function () {
            //el.classList.remove('max-md:z-50');
            setTimeout(function () {
                el.style.transform = 'translateY(calc(-0% - var(--product-panel)))';
                productInfoWrap.classList.remove('max-md:!overflow-auto');
            }, 100);

            notLocked = false;

            const closeOptionsEvent = new Event('closeoptions');
            window.dispatchEvent(closeOptionsEvent);

            setTimeout(function () {
                productInfoWrap.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });

                notLocked = true;

                el.dataset.pos = 'bottom';
            }, 501);
        }

        function pickup(event) {
            startVal = '';
            startVal2 = '';
            targetVal = '';

            // if we hit the handle, then always make the panel notlocked
            if (event.target == productInfoHandle) {
                notLocked = true;
            }

            // if the click is on the el, then set start values
            if (notLocked && (event.target.closest('#product-page') || event.target == el)) {
                var style = window.getComputedStyle(document.querySelector('#product-page'));
                var matrix = new DOMMatrixReadOnly(style.transform);

                if (event.clientY) {
                    firstClick = event.clientY;
                    startVal = event.clientY;

                    startVal = startVal - matrix.m42;
                    startVal2 = event.clientY - startVal;
                } else {
                    firstClick = event.changedTouches[0].clientY;
                    startVal = event.changedTouches[0].clientY;

                    startVal = startVal - matrix.m42;
                    startVal2 = event.changedTouches[0].clientY - startVal;
                }

                moving = true;
            }

            // if we dont hit the product page wrap at all, then setBottom
            if (!event.target.closest('#product-page')) {
                //setBottom();
            }
        }

        window.addEventListener('mousedown', pickup);
        window.addEventListener('touchstart', pickup);

        function move(event) {
            // if pickup event has set moving as true, and notLocked is true, then move

            // set direction
            if (event.clientY) {
                if (initialClick > event.clientY) {
                    direction = 'down';
                } else {
                    direction = 'up';
                }
            } else if (event.changedTouches) {
                if (initialClick > event.changedTouches[0].clientY) {
                    direction = 'down';
                } else {
                    direction = 'up';
                }
            }

            if (!notLocked && direction == 'up' && productInfoWrap.scrollTop == 0) {
                notLocked = true;

                // if mobile, trigger pickup event
                if (event.changedTouches) {
                    pickup(event);
                }
            }

            if (moving && notLocked) {
                // on move, only allow background color to change
                el.classList.add('max-md:!transition-colors');
                productInfoWrap.classList.remove('max-md:!overflow-auto');

                if (event.clientY) {
                    // mousemove

                    targetVal = event.clientY - startVal;

                    // make sure panel doesn't go past bottom of page
                    if (
                        parseInt(targetVal) * -1 >=
                        productPanel.offsetHeight + productInfoHandle.offsetHeight
                    ) {
                        if (parseInt(targetVal) * -1 <= el.offsetHeight) {
                            el.style.transform = 'translateY(' + targetVal + 'px)';
                        }
                    }
                } else {
                    // touchmove - assuming a single touchpoint
                    targetVal = event.changedTouches[0].clientY - startVal;

                    // make sure panel doesn't go past bottom of page
                    if (
                        parseInt(targetVal) * -1 >=
                        productPanel.offsetHeight + productInfoHandle.offsetHeight
                    ) {
                        if (parseInt(targetVal) * -1 <= el.offsetHeight) {
                            el.style.transform = 'translateY(' + targetVal + 'px)';
                        }
                    }
                }
            }
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move);

        function drop(event) {
            // click/touch has ended. Set moving to false
            moving = false;

            // on drop, remove only allow background color to change
            el.classList.remove('max-md:!transition-colors');

            // if targetVal's position is more than 50px of startVal2, close
            if (notLocked) {
                let setPos = false;

                if (targetVal && startVal2) {
                    if (targetVal < startVal2 - 50) {
                        el.dataset.pos = 'top';
                        setPos = true;
                    }

                    if (targetVal > startVal2 + 50) {
                        el.dataset.pos = 'bottom';
                        setPos = true;
                    }

                    if (el.dataset.pos === 'top' && setPos) {
                        setTop();
                    } else {
                        setBottom();
                    }
                }
            }
        }

        window.addEventListener('mouseup', drop);
        window.addEventListener('touchend', drop);

        window.addEventListener('mousedown', getFirstClick);
        window.addEventListener('touchstart', getFirstClick);

        function galleryScrollEnd(e) {
            if (gallery && !gallery.classList.contains('is-changing')) {
                let scrollEnd = gallery.scrollHeight - gallery.offsetHeight - 1;
                let currentScroll = gallery.scrollTop;
                if (currentScroll >= scrollEnd) {
                    // scroll hit
                    notLocked = false;
                    setTop();
                }
            }
        }

        gallery.addEventListener('scroll', galleryScrollEnd);

        window.addEventListener('resize', function () {
            setPanelHeight();
            galleryScrollEnd();
            setBottom();
        });

        window.addEventListener('panelheight', function () {
            setPanelHeight();
        });

        window.addEventListener('openoptions', function () {
            openOptionsMob();
        });

        window.addEventListener('closeoptions', function () {
            closeOptionsMob();
        });
    }

    // mobile option switcher
    const mobOpNavBtns = document.querySelectorAll('#option-nav-mob > a');
    const opFieldsets = document.querySelectorAll('variant-radios fieldset');

    if (mobOpNavBtns.length && opFieldsets) {
        mobOpNavBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let href = btn.getAttribute('href');

                mobOpNavBtns.forEach(function (mobOpNavBtn) {
                    mobOpNavBtn.classList.remove('selected-tab');
                });

                btn.classList.add('selected-tab');

                opFieldsets.forEach(function (fs) {
                    fs.classList.add('max-md:hidden');
                });

                let thisFs = document.querySelector(href);
                if (thisFs) {
                    thisFs.classList.remove('max-md:hidden');
                }

                setPanelHeight();
            });
        });
    }



    if (colourPickerMobile) {
        document.querySelector('#product-wrap').addEventListener('click', function () {
            colourPickerMobile.classList.remove('!-translate-y-full', '!opacity-100', '!visible');
        });

        document.querySelector('#product-mobile-gallery').addEventListener('touchmove', function () {
            colourPickerMobile.classList.remove('!-translate-y-full', '!opacity-100', '!visible');
        });

        colourPickerMobile.addEventListener('click', function (e) {
            e.stopPropagation();
        });



        colourPickerMobile.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', function () {
                gallery.classList.add('is-changing');
                setTimeout(function () {
                    colourPickerMobile.classList.add('!-translate-y-full', '!opacity-100', '!visible');
                }, 1);

                setTimeout(function () {
                    gallery.classList.remove('is-changing');
                }, 501);
            });
        });

        if (toggleColours) {
            toggleColours.addEventListener('click', function (e) {
                e.stopPropagation();

                colourPickerMobile.classList.toggle('!-translate-y-full');
                colourPickerMobile.classList.toggle('!opacity-100');
                colourPickerMobile.classList.toggle('!visible');

                if (!productWrap.classList.contains('no-drawer')) {

                    setBottom();
                } else {

                    if (colourPickerMobile) {
                        let coloursTop = document.querySelector('#colour-picker-mobile').getBoundingClientRect().top + document.querySelector('#product-wrap').scrollTop;
                        let currentScroll = document.querySelector('#product-wrap').scrollTop + document.querySelector('.header-bar').offsetHeight;

                        if (currentScroll > coloursTop) {
                            document.querySelector('#product-wrap').scrollTo({
                                top: coloursTop - document.querySelector('.header-bar').offsetHeight,
                                left: 0,
                                behavior: "smooth",
                            });
                        }
                    }
                }

            });
        }
    }

    // on click mobile variant buttons
    const variantButtons = document.querySelectorAll('button.variant-button');
    if (variantButtons.length) {
        variantButtons.forEach((btn) => {
            btn.addEventListener('click', function () {
                let forId = btn.dataset.for;
                document.querySelector('#' + forId).click();
            });
        });
    }

    function isIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf('MSIE ');
        const trident = ua.indexOf('Trident/');

        return msie > 0 || trident > 0;
    }

    if (!isIE()) return;
    const hiddenInput = document.querySelector('#{{ product_form_id }} input[name="id"]');
    const noScriptInputWrapper = document.createElement('div');
    const variantSwitcher =
        document.querySelector('variant-radios[data-section="{{ section.id }}"]') ||
        document.querySelector('variant-selects[data-section="{{ section.id }}"]');
    noScriptInputWrapper.innerHTML = document.querySelector(
        '.product-form__noscript-wrapper-{{ section.id }}'
    ).textContent;
    variantSwitcher.outerHTML = noScriptInputWrapper.outerHTML;

    document.querySelector('#Variants-{{ section.id }}').addEventListener('change', function (event) {
        hiddenInput.value = event.currentTarget.value;
    });
});