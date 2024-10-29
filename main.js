const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 0,
  intervalId;

const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++imageIndex), 3000);
};

autoSlide();

const slideImage = () => {
  if (imageIndex >= images.length) {
    imageIndex = 0; 
  } else if (imageIndex < 0) {
    imageIndex = images.length - 1; 
  }

  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
  
  updateDots();
};

const updateClick = (e) => {
  clearInterval(intervalId);
  
  if (e.target.id === "next") {
    imageIndex += 1; 
  } else {
    imageIndex -= 1; 
  }
  
  slideImage();
  autoSlide(); 
};

const updateDots = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === imageIndex);
  });
};


buttons.forEach((button) => button.addEventListener("click", updateClick));


const createDots = () => {
  const dotsContainer = document.querySelector(".dots-container");
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      clearInterval(intervalId); 
      imageIndex = index; 
      slideImage(); 
      autoSlide(); 
    });
    dotsContainer.appendChild(dot);
  });
};

createDots(); 

wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);
