/**
 * @param {string} selector
 * @constructor
 */
const Meter = function(selector) {
  this.$root = document.querySelector(selector)
  this.$pointer = this.$root.querySelector('.meter-pointer')
  this.$leds = document.querySelectorAll('.scale-leds .leds')
  this.init()
}

Meter.prototype.init = function() {
  for (var i = 0; i <= 10; i += 1) {
    const $scale = document.createElement('div')
    $scale.className = 'meter-scale'
    $scale.style.transform = 'rotate(' + (i * 9 - 45) + 'deg)'
    if (i % 5 === 0) {
      $scale.classList.add('meter-scale-strong')
    }
    this.$root.appendChild($scale)
  }
}

/**
 * @param {number} deg
 */
Meter.prototype.update = function(cents, deg) {
  let col = (cents+50)/4;
  let remainder = col - Math.floor(col);
  
  if(col >= 11.5 && col <= 13.5){
    document.querySelector('.note-leds').classList.remove('red')
    document.querySelector('.note-leds').classList.add('green')
  } else {
    document.querySelector('.note-leds').classList.remove('green')
    document.querySelector('.note-leds').classList.add('red')
  }

  this.$leds.forEach((element, index) => {
    element.classList.remove("on", "on-25", "on-75", "on-50")
  })
  this.$leds.forEach((element, index) => {
    if(index == 0 || index == this.$leds.length-1)
      return;

    if(index == Math.round(col)){
      if(remainder == .5){
        this.$leds[index].classList.add("on")
      }else if(remainder == .75){
        this.$leds[index].classList.add("on")
        this.$leds[index+1].classList.add("on-25")
      }else if(remainder == 0){
        if(col >= 13){
          this.$leds[index].classList.add("on-75")
          this.$leds[index+1].classList.add("on-25")
        } else {
          this.$leds[index].classList.add("on-25")
          this.$leds[index+1].classList.add("on-75")
        }
      } else if(remainder == .25){
        this.$leds[index].classList.add("on")
        this.$leds[index-1].classList.add("on-25")
      } 
    }
  })
  this.$pointer.style.transform = 'rotate(' + deg + 'deg)'
}