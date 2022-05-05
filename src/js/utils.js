const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector) => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};
export {preloadImages};

// Preload images esempio
// preloadImages('.deco__img, .panel__img').then(() => {
//     // Remove loader (loading class)
//     document.body.classList.remove('loading');
//     // show content
//     showContent();
// });
