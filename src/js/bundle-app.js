const bundleApp = {
    handlers: function () { },
    init: function () {
        this.handlers();

        let currentStep = 0;

        const sectionId = document.querySelector('#product-bundle').closest('[data-section]').dataset.section;

        const productBundle = document.querySelector('#product-bundle');
        const productBundleBlocker = productBundle.querySelector('#product-bundle-blocker');

        const btnPrev = document.querySelectorAll('.js-bundle-prev');
        const btnNext = document.querySelectorAll('.js-bundle-next');

        const currentStepNumber = document.querySelector('[data-currentstep]');

        const addCart = document.querySelector('#product-bundle [data-addcart]');

        // bundle json
        const bundleData = JSON.parse(document.querySelector('#bundleJson').innerHTML);
        console.log(bundleData);
        if (bundleData.steps.length > 0) {
            document.querySelector('[data-totalstep]').innerHTML = bundleData.steps.length;
        }

        function fadeBlockerIn() {
            productBundleBlocker.classList.add('!opacity-100', '!visible');
        }

        function fadeBlockerOut() {
            productBundleBlocker.classList.remove('!opacity-100', '!visible');
        }

        async function fetchStep(url) {
            await fetch(`${url}`)
                .then((response) => response.text())
                .then((responseText) => {
                    const html = new DOMParser().parseFromString(responseText, 'text/html');

                    const mobOptions = html.querySelector('[data-moboptions]').innerHTML;
                    const productGallery = html.querySelector('#media-gallery').innerHTML;

                    document.querySelector('[data-moboptions]').innerHTML = mobOptions;
                    document.querySelector('#media-gallery').innerHTML = productGallery;

                    if (
                        document.querySelector('product-info[data-variantid]') &&
                        html.querySelector('product-info[data-variantid]')
                    ) {
                        document.querySelector('product-info[data-variantid]').dataset.variantid =
                            html.querySelector('product-info[data-variantid]').dataset.variantid;
                    }

                    updateGaleries();

                });
        }

        function updateGaleries() {
            // update galleries
            let activeMedia = document.querySelectorAll('#media-gallery > div:not(.hidden)');
            let galleryMob = document.querySelector('#media-gallery-mob');
            let galleryThumbs = document.querySelector('#media-gallery-thumbs');
            if (activeMedia && galleryMob) {
                galleryMob.querySelector('.splide__list').innerHTML = '';
                galleryThumbs.querySelector('.splide__list').innerHTML = '';
                activeMedia.forEach(function (el) {
                    let li = document.createElement('li');
                    li.classList.add('splide__slide', '!translate-x-0');
                    li.appendChild(el.cloneNode(true));
                    li.querySelector('img').classList.remove('loaded');
                    galleryMob.querySelector('.splide__list').appendChild(li.cloneNode(true));

                    li.querySelector('img').classList.remove('image-magnify-hover', 'cursor-zoom-in');
                    galleryThumbs.querySelector('.splide__list').appendChild(li.cloneNode(true));
                });

                // refresh slider
                const splidegalrefresh = new Event('splidegalrefresh');
                window.dispatchEvent(splidegalrefresh);

                // refresh zooms
                const initzoomer = new Event('initzoomer');
                window.dispatchEvent(initzoomer);
            }
        }

        function prevStep() {
            currentStep--;
        }

        function nextStep() {
            currentStep++;
        }

        function setStep() {
            if (currentStepNumber) {
                currentStepNumber.innerHTML = currentStep;
            }

            if (currentStep == 0) {
                document.querySelector('#product-title').innerHTML = bundleData.bundleData.bundleTitle;
            } else if (currentStep > 0) {
                document.querySelector('#product-title').innerHTML = bundleData.steps[currentStep - 1].stepTitle;
            }

            document.querySelector('#product-bundle').dataset.step = currentStep;

            updateStepsValues();
            buildBunleReview();
        }

        function showReview() {
            setTimeout(function () {
                if (currentStepNumber) {
                    currentStepNumber.innerHTML = currentStep;
                }
                document.querySelector('#product-title').innerHTML = bundleData.bundleData.bundleTitle;
                document.querySelector('#product-bundle').dataset.step = currentStep;
                document.querySelector('#product-bundle').classList.add('last-step');

                let images = [];
                if (bundleData.steps.length > 0) {
                    bundleData.steps.forEach(function (step, i) {
                        const varId = step.variantId;
                        const variantData = bundleData.variants.find((variant) => variant.id === varId);

                        if (variantData.featured_image) {
                            images.push(variantData.featured_image);
                        }
                    });
                }

                let mediaGal = document.querySelector('#media-gallery');

                if (mediaGal && images.length) {
                    mediaGal.innerHTML = '';
                    let mediaGalHtml = '';
                    images.forEach(function (img) {
                        let div = document.createElement('div');
                        mediaGalHtml += `<div class="flex"><figure class="w-full relative z-0"><img class="min-h-full object-cover" loading="lazy" src="${img}&width=672" alt="${bundleData.bundleData.bundleTitle}" /></figure></div>`;
                    });
                    mediaGal.innerHTML = mediaGalHtml;

                    updateGaleries();
                }

                fadeBlockerOut();
            }, 500);
        }

        function getProductUrl() {
            if (currentStep == 0) {
                return `/products/${bundleData.bundleData.mainHandle}?section_id=${sectionId}`;
            }
            const { handle, variantId } = bundleData.steps[currentStep - 1];
            return `/products/${handle}?variant=${variantId}&section_id=${sectionId}`;
        }

        if (btnPrev.length) {
            btnPrev.forEach(function (el) {
                el.addEventListener('click', async function () {
                    fadeBlockerIn();
                    prevStep();
                    await fetchStep(getProductUrl());
                    setStep();
                    fadeBlockerOut();
                });
            });
        }

        if (btnNext.length) {
            btnNext.forEach(function (el) {
                el.addEventListener('click', async function () {
                    fadeBlockerIn();
                    nextStep();

                    if (currentStep > bundleData.steps.length) {
                        showReview();
                        return;
                    }

                    await fetchStep(getProductUrl());
                    setStep();
                    fadeBlockerOut();
                });
            });
        }

        async function goToStep(step) {
            fadeBlockerIn();
            currentStep = step;
            await fetchStep(getProductUrl());
            // remove last-step class
            document.querySelector('#product-bundle').classList.remove('last-step');
            setStep();
            fadeBlockerOut();
        }

        function updateStepsValues() {
            if (currentStep > 0) {
                if (document.querySelector('[data-variantid]')) {
                    bundleData.steps[currentStep - 1].variantId = parseInt(
                        document.querySelector('[data-variantid]').dataset.variantid
                    );
                }

                // find variant by ID from bundleData.variants and return object
                const variantData = bundleData.variants.find(
                    (variant) => variant.id === bundleData.steps[currentStep - 1].variantId
                );
            }
        }



        function buildBunleReview() {
            const bundleReview = document.querySelector('#bundle-review');
            const bundleReviewList = document.querySelector('#bundle-review > ul');

            let totalPrice = 0;
            let totalCompare = 0;

            let bundleHtml = '';

            if (bundleData.steps.length > 0) {
                bundleData.steps.forEach(function (step, i) {
                    const varId = step.variantId;
                    const variantData = bundleData.variants.find((variant) => variant.id === varId);

                    // update price and compare price
                    if (variantData.price) {
                        totalPrice += variantData.price;
                    }
                    if (variantData.compare_at_price) {
                        totalCompare += variantData.compare_at_price;
                    }

                    let optionsHtml = '';
                    if (variantData.options && variantData.options.length) {
                        variantData.options.forEach(function (option) {
                            optionsHtml += `<p>${option}</p>`;
                        });
                    }

                    let imgHtml = '';
                    if (variantData.featured_image) {
                        imgHtml = `<div loading="lazy" class="w-[100px] h-[100px]"><img class="w-full h-full bg-cover" src="${variantData.featured_image}&width=200&height=200&crop=center" alt="${variantData.product_title}" /></div>`;
                    }

                    bundleHtml += `
                    <li class="flex justify-between gap-5">
                    <div class="">
                        <h3 class="font-semibold lg:d-h5 mb-3">${i + 1}. ${variantData.product_title}</h3>
                        <div>${optionsHtml}</div>
                        <button class="underline mt-3" data-changestep="${i + 1}">Change</button>
                    </div>
                    ${imgHtml}
                    </li>
                    `;

                });


                updateBundlePrice(totalPrice, totalCompare);

                bundleReviewList.innerHTML = bundleHtml;

                if (bundleReviewList.querySelectorAll('[data-changestep]').length) {
                    bundleReviewList.querySelectorAll('[data-changestep]').forEach(function (changestep) {
                        changestep.addEventListener('click', function () {
                            let step = changestep.dataset.changestep;
                            goToStep(step);
                        });
                    });
                }
            }
        }



        function updateBundlePrice(totalPrice, totalCompare) {
            const bundlePrice = document.querySelectorAll('#product-bundle [data-bundlepricehtml]');

            let bundlePriceHtml = '';
            let bundleSavingsHtml = '';

            let totalPercentOff = 0;

            // get percent off from original price/compare price
            if (totalCompare > totalPrice) {
                totalPercentOff = (((totalPrice * 100) / totalCompare) * 100) / 100;
                totalPercentOff = totalPercentOff.toFixed(2);
                totalPercentOff = 100 - totalPercentOff;

                totalPercentOff = Math.round(totalPercentOff * 100) / 100;
            }

            // apply bundle discount
            if (bundleData.bundleData.bundleDiscount > 0) {
                let diff = (totalPrice * bundleData.bundleData.bundleDiscount) / 100;
                totalPrice = totalPrice - diff;
                totalPrice = Math.round(totalPrice);
            }

            let totalPriceFormatted = Shopify.formatMoney(totalPrice, window.money_format);
            let totalCompareFormatted = Shopify.formatMoney(totalCompare, window.money_format);

            if (totalCompare > totalPrice) {
                bundlePriceHtml = `<span class="flex gap-x-2 font-semibold ">
            <span class="line-through opacity-60">
              ${totalCompareFormatted}
            </span>
            <span>${totalPriceFormatted}</span>
            </span>`;
            } else {
                bundlePriceHtml = `<span class="font-semibold">${totalPriceFormatted}</span>`;
            }

            if (totalPercentOff > 0) {
                bundleSavingsHtml = `Bundle Savings + ${totalPercentOff}% Off`;
            } else {
                bundleSavingsHtml = `Bundle Savings`;
            }

            if (bundlePrice.length) {
                bundlePrice.forEach(function (el) {
                    el.querySelector('.bundleprice').innerHTML = bundlePriceHtml;
                    el.querySelector('.bundlesavings').innerHTML = bundleSavingsHtml;
                });
            }
        }

        async function addBundleCart() {
            let formData = {
                items: [],
            };

            addCart.disabled = true;
            addCart.textContent = 'Adding...';

            if (bundleData.steps.length > 0) {
                bundleData.steps.forEach(function (step) {
                    let item = {
                        id: step.variantId,
                        quantity: parseInt(step.quantity),
                    };
                    formData.items.push(item);
                });

                let add = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                // update cart-drawer. fetch, then parse html
                const cartDrawer = document.querySelector('cart-drawer');
                let cartcontent = await fetch(window.location, {})
                    .then((response) => response.text())
                    .then((responseText) => {
                        const html = new DOMParser().parseFromString(responseText, 'text/html');
                        cartDrawer.innerHTML = html.querySelector('cart-drawer').innerHTML;
                        document.querySelector('cart-drawer').open();
                        App.overflowFloatedStyle();

                        resetBundle();
                    });
            }
        }

        addCart.addEventListener('click', function () {
            addBundleCart();
        });

        async function resetBundle() {
            fadeBlockerIn();
            addCart.disabled = true;
            addCart.textContent = 'Added';
            currentStep = 0;
            await fetchStep(getProductUrl());
            document.querySelector('#product-bundle').classList.remove('last-step');
            addCart.disabled = false;
            addCart.textContent = 'Add to Basket';
            setStep();
            fadeBlockerOut();
        }

        window.addEventListener('variantchange', function () {
            updateStepsValues();
            buildBunleReview();
        });

        updateStepsValues();
        //buildBunleReview();
        fadeBlockerOut();

    },
};

document.addEventListener('DOMContentLoaded', function () {
    bundleApp.init();
});