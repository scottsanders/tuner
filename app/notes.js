const Notes = function(tuner) {
  this.tuner = tuner
  this.$noteDisplay = document.querySelector('.note-display')
  this.$leds = document.querySelectorAll('.note-leds .led')
}

Notes.prototype.update = function(note) {
  if(typeof patterns[note.name] !== 'undefined')
    this.renderPattern(patterns[note.name])
  this.$noteDisplay.innerHTML = note.name
  
}

Notes.prototype.renderPattern = function(leds) {
  this.$leds.forEach((element, index) => {
    if(leds[index] == 1)
      element.classList.add("on")
    else
      element.classList.remove("on")
  });
}