var slideShow = document.querySelector('.slide-show');
var iframes = Array.from(document.querySelectorAll('iframe'));
var width = slideShow.parentNode.clientWidth;
var sliderWidth = iframes.length * width;
slideShow.setAttribute('style', `width:${sliderWidth}px`);
iframes.forEach((iframe) => {
  iframe.setAttribute('style', `width:${width}px`);
});
var count = 0;
setInterval(() => {
  count = count % iframes.length;
  count++;
  slideShow.setAttribute('style', `left:-${width * count}px;width:${sliderWidth}px;`);
}, 2500);
