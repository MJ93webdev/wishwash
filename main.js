const carouselDots = Array.from(document.querySelectorAll(".carousel-dots .dot"));
const carouselArrowLeft = document.querySelector(".carousel-arrows .arrow--left");
const carouselArrowRight = document.querySelector(".carousel-arrows .arrow--right");
const carouselImages = Array.from(document.querySelectorAll(".carousel-img"));

let currentVisibleImg = 0;

carouselArrowRight.addEventListener("click",()=>{
    console.log("arrow right clicked!")
    if(currentVisibleImg < 3){
        currentVisibleImg ++;
    }else{
        currentVisibleImg = 0;
    }
    console.log(currentVisibleImg)
    carouselImages.forEach(img => img.setAttribute("data-visible" , false))
    carouselImages[currentVisibleImg].setAttribute("data-visible" , true)

    carouselDots.forEach(dot => dot.setAttribute("data-active", false));
    carouselDots[currentVisibleImg].setAttribute("data-active", true);
})

carouselArrowLeft.addEventListener("click",()=>{
    console.log("arrow left clicked!")
    if(currentVisibleImg > 0){
        currentVisibleImg --;
    }else{
        currentVisibleImg = 3;
    }
    console.log(currentVisibleImg)
    carouselImages.forEach(img => img.setAttribute("data-visible" , false))
    carouselImages[currentVisibleImg].setAttribute("data-visible" , true)

    carouselDots.forEach(dot => dot.setAttribute("data-active", false));
    carouselDots[currentVisibleImg].setAttribute("data-active", true);
})

carouselDots.forEach(dot => {
    dot.addEventListener("click", ()=>{
        currentVisibleImg = carouselDots.indexOf(dot);
        carouselImages.forEach(img => img.setAttribute("data-visible" , false))
        carouselImages[currentVisibleImg].setAttribute("data-visible" , true)
    
        carouselDots.forEach(dot => dot.setAttribute("data-active", false));
        carouselDots[currentVisibleImg].setAttribute("data-active", true);
    })
})


// ************============ NAVBAR ===============*****************

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".navbar");

navToggle.addEventListener("click",()=>{
    if(nav.getAttribute("data-visible")==="true"){
        nav.setAttribute("data-visible","false");
    }else{
        nav.setAttribute("data-visible","true");
    }
})

const navDropdown = nav.querySelector(".dropdown");
const navLastChild = navDropdown.lastElementChild;

navDropdown.addEventListener("click",()=>{

    if(navDropdown.getAttribute("data-visible") === "false"){
        navDropdown.setAttribute("data-visible","true");
    }
    else if(navDropdown.getAttribute("data-visible") === "true"){
        navDropdown.setAttribute("data-visible","fading-out");
        navDropdown.addEventListener("animationend",()=>{
            navDropdown.setAttribute("data-visible","false")
        },{once:true})
    }
})


// **********===========ANIMATIONS=============*************

// CTA
const CTA1 = document.querySelector(".CTA1");
const CTA1Img = document.querySelector(".CTA1-img");

window.addEventListener("scroll",()=>{
    let CTA1YOffset = CTA1.getBoundingClientRect().top;

    if(CTA1YOffset <= 100){
        CTA1.style.transform = `translateX(${CTA1YOffset - 100}px)`
        CTA1Img.style.transform = `translateX(${-CTA1YOffset + 100}px)`
    }
    if(CTA1YOffset > 100){
        CTA1.style.transform = `translateX(0px)`
        CTA1Img.style.transform = `translateX(0px)`
    }  
})

// counting animation

function animateCount(id, start, end, duration, decimals = 2) {
    const element = document.getElementById(id);
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = start + range * progress;
        element.textContent = currentValue.toFixed(decimals);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const counterTop = document.querySelector("#counter--more-than");

function onScroll() {
    if (window.scrollY >= counterTop.getBoundingClientRect().top - 100) {
      animateCount("counter--more-than", 0, 20000, 2000, 0);
      animateCount("counter--rating", 0, 9.5, 2000, 1);
      window.removeEventListener("scroll", onScroll); // ✅ remove listener
    }
  }
  
  window.addEventListener("scroll", onScroll);
  