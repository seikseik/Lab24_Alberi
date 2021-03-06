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


const lines = gsap.utils.toArray(".animate");

ScrollTrigger.batch(lines, {
  onEnter: lines => {
    gsap.set(lines, {transformOrigin:"left"})
    gsap.fromTo(lines, {scaleX: 0}, {duration: 0.9, scaleX: 1, ease: "circ.out", stagger: 0.18, opacity: 1});
  },
  once: true
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
