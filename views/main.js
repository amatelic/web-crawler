var slideShow = document.querySelector('.slide-show');
var images = Array.from(document.querySelectorAll('img'));
var width = 1005;
var sliderWidth = images.length * width;
slideShow.setAttribute('style', `width:${sliderWidth}px`);
images.forEach((image) => {
  // image.setAttribute('style', `width:${950}px`);
});
var count = 0;
setInterval(() => {
  count = count % images.length;
  slideShow.setAttribute('style', `left:-${width * count}px;width:${sliderWidth}px;`);
  ++count;
}, 500);
