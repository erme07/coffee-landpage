const $slider = Array.from(document.querySelector(".slider-box").children);
const $navBar = document.querySelector(".navbar");
let navBarHeight = $navBar.offsetHeight;
let posicionY = 0;
let position = 0;
let slideActive = 1;

const moveSlides = (pos, slideAct) => {
  $slider.forEach((e, i) => {
    e.style.translate = `${pos}%`;
    if (slideAct == i + 1)
      e.classList.add("active");
    else
      e.classList.remove("active");
  });
}

document.addEventListener("click", (e) => {
  
  if (e.target.id == "right") {
    if (slideActive != $slider.length) {
      position -= 100;
      slideActive++;
      moveSlides(position,slideActive);
    }
  }
  if (e.target.id == "left") {
    if (slideActive != 1) {
      position += 100;
      slideActive--;
      moveSlides(position,slideActive);
    }
  }
  
});

document.addEventListener('scroll', () => {
  if (posicionY > scrollY) { //subiendo
    if (scrollY > navBarHeight)
      $navBar.classList.add('navbar--show');
    else if (scrollY === 0)
      $navBar.classList.remove('navbar--show');
  }
  else //bajando
    $navBar.classList.remove('navbar--show');
  posicionY = scrollY;
})

