import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);



//  menu
let menuBtn = document.querySelector(".menu-toggle");
let menu =  document.querySelector(".menu-full");
let menuItems = gsap.utils.toArray(".menu-item");
let body = document.querySelector("body");
menuBtn.onclick = function(){
    if(menuBtn.classList.contains("active")){
      let tl = gsap.timeline();
        tl.fromTo(menuItems,{autoAlpha: 1},{  duration: 0.2, autoAlpha: 0 ,stagger: -0.1, delay: 0.1});
        tl.fromTo(menu,{autoAlpha: 1},{  duration: 0.3, autoAlpha: 0, ease: "circ.out"});
        tl.set(menu, {visibility: "hidden"});
        body.style.overflowY = "scroll"
        menuBtn.classList.remove("active")
    }else{
      menu.visibility = "visible";
      gsap.fromTo(menu,{autoAlpha: 0},{  duration: 0.35, autoAlpha: 1,ease: "circ.out"});
      gsap.fromTo(menuItems,{autoAlpha: 0},{  duration: 1, autoAlpha: 1 ,stagger: 0.2, delay: 0.35});
      body.style.overflowY = "hidden"
      menuBtn.classList.add("active")
    }
  };


// menu
let h = document.querySelector(".hero").offsetHeight;
let arrow = document.querySelector(".scroll");
arrow.addEventListener("click", function(){
  gsap.to(window, {duration: 1, scrollTo: h});
});



// animation hero text
const heroTitle = document.querySelector(".animation-text-hero");

let tl = gsap.timeline(),
  mySplitText = new SplitText(heroTitle, {type:"words,chars", wordsClass: "split-line"
}),
chars = mySplitText.chars;
gsap.set(heroTitle, {perspective: 400});
tl.fromTo(chars, {autoAlpha: 0},
        {  duration: 1,
             autoAlpha: 1,
             delay: 0.1,
             ease: "ease",
             stagger: 0.055,
        },
        "+=0");



// animation quotes

const quotes = document.querySelectorAll(".animation-text");
  quotes.forEach((quote, i) => {
    let image = quote.querySelector("img")

      quote.split = new SplitText(quote, {
      type:"words,chars",
      wordsClass: "split-line"
    });

    gsap.set(quote, {perspective: 400});
    let tl = gsap.timeline({
      scrollTrigger :{
        trigger: quote,
        animation: tl,
      }
    })
    // tl.to(image,{ opacity: 1, ease: "ease", duration: 0.1});
    tl.fromTo(quote.split.words,
    {autoAlpha: 0},{  duration: 0.7, autoAlpha: 1,ease: "ease",stagger: 0.03});

  });


  const qc = gsap.utils.toArray(".quote-caption");
  // const qc = document.querySelectorAll(".quote-caption");
  qc.forEach((el, i) => {
    const anim = gsap.fromTo(el, {autoAlpha: 0},{  duration: 0.3, autoAlpha: 1,ease: "ease",delay: 1.5});
    ScrollTrigger.create({
      trigger: el,
      animation: anim,
      ease: "ease",
      toggleActions: 'play none none none',
      once: true,
    });
  });

  //
  // // // hr line animation
  const hr = gsap.utils.toArray(".hr");
  hr.forEach((el, i) => {
    gsap.set(el, {transformOrigin:"left"})
    const anim = gsap.fromTo(el, {scaleX: 0}, {duration: 1.4, scaleX: 1, delay: 1, ease: "circ.out"});
    ScrollTrigger.create({
      trigger: el,
      animation: anim,
      ease: "circ.out",
      toggleActions: 'play none none none',
      once: true,
    });
  });


  // // fade up
  const fadeUp = gsap.utils.toArray("[fade]");
  fadeUp.forEach((el, i) => {
    const anim = gsap.fromTo(el, {autoAlpha: 0, y:0}, {duration: 1.5, autoAlpha: 1});
    ScrollTrigger.create({
      trigger: el,
      animation: anim,
      toggleActions: 'play none none none',
      once: true,
    });
  });


  // slideshow
//   const swiper = new Swiper('.swiper', {
//   loop: true,
//   slidesPerView: 1,
//   draggable: true,
//   grabCursor: true,
//   spaceBetween: 0,
//   navigation: {
//     nextEl: '.swiper-button-next-custom',
//     prevEl: '.swiper-button-prev-custom',
//   },
//   on: {
//    slideChangeTransitionStart: function () {
//        let activeSlide = this.el.querySelector('div.swiper-slide-active');
//        let caption = activeSlide.querySelector('img').getAttribute("data-caption");
//        let slideCaption = this.el.parentElement.querySelector(".slide-captions");
//        if(slideCaption != null){
//          slideCaption.innerHTML = "<p class='current-title'> <span>SENZA CONFINI </span>" + caption + "</p>"
//        }
//    }
//  }
// });


  // zoom img
  const zoom = gsap.utils.toArray("[img-zoom]");
  zoom.forEach((el, i) => {
    const anim = gsap.fromTo(el, {autoAlpha: 0, scale: 1}, {autoAlpha: 1, scale: 1.05, duration: 2, delay: 0.2});
    ScrollTrigger.create({
      trigger: el,
      animation: anim,
      toggleActions: 'play none none none',
      once: true,
    });
  });
