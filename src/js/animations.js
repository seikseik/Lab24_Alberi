import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


const hr = gsap.utils.toArray("[animate]");
hr.forEach((el, i) => {
  gsap.set(el, {transformOrigin:"left"})
  const anim = gsap.fromTo(el, {scaleX: 0}, {duration: 1.4, scaleX: 1, ease: "circ.out"});
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

let scrolltop = document.querySelector(".arrow-stiky-scrolltop");
scrolltop.addEventListener("click", function(){
  gsap.to(window, {duration: 2, scrollTo: 0});
})
