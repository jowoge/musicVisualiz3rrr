function soundEffect(num, x, y, kc) {
  //objects/data to be accessed in sketch
  let se = {
    sound: null,
    slider: createSlider(0, 2, 1, 0.01),
    drawText: function () {
      push()
      fill(0)
      textSize(20)
      text(`SOUND EFFECT ${num}`, midGuiX, y + 15)
      pop()
    },
    setSliderVal: function () {
      if (se.sound) {
        se.sound.setVolume(se.slider.value())
      }
    },
    keyPlay: function () { //for keyPressed
      if (keyCode == kc) {
        se.sound.play()
      }
    }
  }

  //file input
  let soundIn = createFileInput(function (file) {
    se.sound = loadSound(file, function () {
      console.log(`sound effect ${num} successfully loaded`)
    })//error and whileLoading callbacks not working???
  })

  //play button
  let playButt = createButton(`CLICK HERE OR PRESS ${num}`)
  playButt.mousePressed(function () {
    se.sound.play()
  })

  soundIn.position(x, y + 25)
  playButt.position(x, y + 50)
  playButt.size(guixSize, 20)
  se.slider.position(x, y + 75)
  se.slider.size(guixSize, 20)

  return se
}