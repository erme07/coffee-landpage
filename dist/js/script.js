const $slider = Array.from(document.querySelector(".slider-box").children);
const $navBar = document.querySelector(".navbar");
const $navBarButton = document.getElementById("navButton");
const $navMenu = document.querySelector(".navbar__overlay");
const $swipeArea = document.querySelector('.slider-box');

let startX = 0;
let endX = 0;
let posicionY = 0;
let position = 0;
let slideActive = 1;
let menushow = false;

const moveSlides = (pos, slideAct) => {
  $slider.forEach((e, i) => {
    e.style.translate = `${pos}%`;
    if (slideAct == i + 1)
      e.classList.add("active");
    else
      e.classList.remove("active");
  });
}
const nextSlide = () => {
  if (slideActive != $slider.length) {
    position -= 100;
    slideActive++;
    moveSlides(position, slideActive);
  }
}
const prevSlide=() => {
  if (slideActive != 1) {
    position += 100;
    slideActive--;
    moveSlides(position, slideActive);
  }
}
const handleSwipe = () => {
  const deltaX = endX - startX;
  if (deltaX > 50) {
    prevSlide();
  } else if (deltaX < -50) {
    nextSlide()
  }
}

document.addEventListener("click", (e) => {
  
  if (e.target.id == "right") {
    nextSlide();
  }
  if (e.target.id == "left") {
    prevSlide();
  }
  if (e.target.id == "navButton") {
    $navBar.classList.toggle("menuShow");
    $navBarButton.classList.toggle("active");
    menushow = !menushow;
  }
});


document.addEventListener('scroll', () => {
  if (posicionY > scrollY) { //subiendo
    $navBar.style.position = "fixed";
    $navBar.style.top = `0px`;
  }
  else if(!menushow){  //bajando
    if (posicionY > 80) {
      $navBar.style.top = "-80px"
    } else {
      $navBar.style.top = `-${posicionY}px`
    }
  } 
  posicionY = scrollY;
})

$swipeArea.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
$swipeArea.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});
$swipeArea.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  $swipeArea.classList.add("grabbing");
});
$swipeArea.addEventListener('mouseup', (e) => {
  endX = e.clientX;
  $swipeArea.classList.remove("grabbing");
  handleSwipe();
});

