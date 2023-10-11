// create a container and set the full-size image as its background
function createOverlay(image) {
  const overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', `${image.src}`);
  overlay = document.createElement('div');
  prepareOverlay(overlay, overlayImage);

  image.style.opacity = '50%';
  toggleLoadingSpinner(image);

  overlayImage.onload = () => {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = '100%';
  };

  return overlay;
}

function prepareOverlay(container, image) {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');
  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = 'var(--gradient-background)';
}

function toggleLoadingSpinner(image) {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading-overlay__spinner`);
  loadingSpinner.classList.toggle('hidden');
}

function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}

function magnify(image, zoomRatio) {
  const overlay = createOverlay(image);
  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
}

function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll('.image-magnify-hover');
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}

enableZoomOnHover(2);



function zoomMove(image, event) {
  let img = document.querySelector('.zoomer__img');
  let imgImg = document.querySelector('.zoomer__img img');
  console.log(imgImg.offsetWidth);
  window.addEventListener('dragstart', function (e) {
    console.log(e)
    let posLeft;
    let posTop;
    let leftOffset = window.innerWidth / 2;
    let topOffset = window.innerHeight / 2;

    let offset2 = (1875 - window.innerWidth) / 2;
    posLeft = (e.clientX - leftOffset);
    posTop = (e.clientY - topOffset);

    if (e.clientX > leftOffset) {
      //posLeft = (posLeft + (offset2)) * -1;
    } else {
      //posLeft = (posLeft + (offset2)) * -1;
    }


    posLeft = posLeft * -1;
    posTop = posTop * -1;
    img.querySelector(':scope > div').style.transform = 'translate(' + posLeft + 'px, ' + posTop + 'px)';
  });
}

function initZoomer() {
  let zoomer = document.querySelector('.product__gallery #zoomer');
  let zoomerImg = document.querySelector('.product__gallery #zoomer .zoomer__img');
  let zoomerClose = document.querySelector('.product__gallery #zoomer button.close');
  let imgs = document.querySelectorAll('.product__gallery #media-gallery .click-zoom,.product__gallery #media-gallery-mob .click-zoom');

  zoomerClose.addEventListener('click', function () {
    zoomer.classList.remove('active');
    document.querySelector('html').classList.remove('overflow-hidden');
  });

  if (imgs.length) {
    imgs.forEach(function (img) {
      img.classList.add('cursor-zoom-in')
      img.addEventListener('click', function () {
        let imgClone = img.cloneNode();
        imgClone.classList.remove('cursor-zoom-in');
        zoomerImg.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('w-full', 'h-full');
        div.appendChild(imgClone);
        zoomerImg.appendChild(div);
        zoomer.classList.add('active');
        document.querySelector('html').classList.add('overflow-hidden');

        //zoomerImg.onmousemove = (event) => zoomMove(imgClone, event);
      });
    });
  }
}
initZoomer();

window.addEventListener('initzoomer', initZoomer);
