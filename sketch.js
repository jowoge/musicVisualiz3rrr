let main
let soundEffects = []
let canvas
let mic
let fft
let soundFile
let recorder
let guiX
let midGuiX
let guixSize
let fourFiveGuiY
let textRot = 0
let moveText = 0

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER)
  angleMode(DEGREES)
  noStroke()
  guiX = windowWidth / 4 * 3
  midGuiX = guiX + ((windowWidth - guiX) / 2)
  guixSize = windowWidth - guiX
  fourFiveGuiY = (windowHeight / 5) * 4

  //both audio & mic levels are linked, unable to use p5.Amplitude()
  //will be removing mic button so it will not interfere with visualiser
  //prerequisites microphone, speaker
  mic = new p5.AudioIn()
  fft = new p5.FFT()
  recorder = new p5.SoundRecorder()
  mic.start()
  recorder.setInput(mic)

  //main sound file distorted after playing sound effects multiple times
  //create gui & sound effects objects
  main = mainGui()
  for (let i = 0; i < 5; i++) {
    soundEffects.push(soundEffect(i + 1, guiX, i * 100, 49 + i))
  }
}

function draw() {
  background(0);
  fill(255)
  textSize(30)

  if (!main.isPlaying && !main.isLoaded && !main.notAudio) {
    text('please read README.txt before using\ndrag & drop an audio file :)', guiX / 2, height / 2)
  } else if (main.notAudio) {
    text('only audio files allowed', guiX / 2, height / 2)
  } else if (main.isLoaded && !main.isPlaying && !main.notAudio) {
    text(`dropped file:\n\n${main.fileName}\n\nor drag & drop a different audio file :)`, guiX / 2, height / 2)
  } else {
    main.sound.setVolume(main.slider.value())
    drawVisualizations()
    main.sound.onended(function () {
      main.isPlaying = false
    })
  }

  //gui
  rect(guiX, 0, width - guiX, height)
  main.drawText()
  for (let i = 0; i < soundEffects.length; i++) {
    soundEffects[i].setSliderVal()
    soundEffects[i].drawText()
  }
  fill(0)
  //display current time & duration of audio file
  if (main.isPlaying) {
    let minCurrent = Math.floor(main.sound.currentTime() / 60)
    let secCurrent = Math.floor(((main.sound.currentTime() / 60) - Math.floor(main.sound.currentTime() / 60)) * 60).toString().padStart(2, '0')
    let minTotal = Math.floor(main.sound.duration() / 60)
    let secTotal = Math.floor(((main.sound.duration() / 60) - Math.floor(main.sound.duration() / 60)) * 60).toString().padStart(2, '0')
    text(`${minCurrent}:${secCurrent}/${minTotal}:${secTotal}`, midGuiX, fourFiveGuiY + 105)
  }
}

function keyPressed() { //play sound effect based on key pressed
  for (let i = 0; i < soundEffects.length; i++) {
    soundEffects[i].keyPlay()
  }
}