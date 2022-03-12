function mainGui() {
    //objects/data to be accessed in sketch
    let main = {
        sound: null,
        fileName: null,
        notAudio: false,
        isPlaying: false,
        isLoaded: false,
        micOn: false,
        slider: createSlider(0, 1, 0.5, 0.01), //slider has to be accessed because the values changes in draw()
        drawText: function () {
            push()
            fill(0)
            textSize(20)
            text(`MAIN CONTROLS`, midGuiX, fourFiveGuiY - 15)
            pop()
        },
    }
    //input, drag & drop on canvas
    canvas.drop(function (file) {
        if (file.type !== "audio") {  //to see if file input is an audio file
            main.notAudio = true
            main.sound.stop()
        } else {
            main.notAudio = false
            if (main.isPlaying) { //allows user to input a different audio file & stopping current audio file
                main.sound.stop()
                main.isPlaying = false
                main.sound = loadSound(file, function () {
                    console.log('main sound successfully loaded')
                    main.isLoaded = true
                    main.fileName = file.name
                })//error and whileLoading callbacks not working???
            } else {
                main.sound = loadSound(file, function () {
                    console.log('main sound successfully loaded')
                    main.isLoaded = true
                    main.fileName = file.name
                })//error and whileLoading callbacks not working???
            }
        }
    })

    //play button
    let playButt = createButton('PLAY')
    playButt.mousePressed(function () {
        if (!main.isPlaying && !main.notAudio) {
            main.sound.play()
            main.isPlaying = true
        }
    })

    //pause button
    let pauseButt = createButton('PAUSE')
    pauseButt.mousePressed(function () {
        main.sound.pause()
        main.isPlaying = false
    })

    //stop button
    let stopButt = createButton('STOP')
    stopButt.mousePressed(function () {
        main.sound.stop()
        main.isPlaying = false
    })

    //record button
    let recordButt = createButton('REC')
    recordButt.mousePressed(function () {
        soundFile = new p5.SoundFile()
        main.sound.connect(recorder)
        recorder.record(soundFile)
        recordButt.hide()
        endRecord.show()
    })

    //end record button
    let endRecord = createButton('END')
    endRecord.hide()
    endRecord.mousePressed(function () {
        recorder.stop()
        saveSound(soundFile, 'recording')
        recordButt.show()
        endRecord.hide()
    })

    playButt.position(guiX, fourFiveGuiY)
    playButt.size((guixSize / 4), 50)

    pauseButt.position(guiX + ((windowWidth - guiX) / 4), fourFiveGuiY)
    pauseButt.size((guixSize / 4), 50)

    stopButt.position(guiX + (((windowWidth - guiX) / 4) * 2), fourFiveGuiY)
    stopButt.size((guixSize / 4), 50)

    recordButt.position(guiX + (((windowWidth - guiX) / 4) * 3), fourFiveGuiY)
    recordButt.size((guixSize / 4), 50)

    let endCol = color(255, 0, 0, 50)
    endRecord.position(guiX + (((windowWidth - guiX) / 4) * 3), fourFiveGuiY)
    endRecord.size((guixSize / 4), 50)
    endRecord.style('background-color', endCol)

    main.slider.position(guiX, fourFiveGuiY + 60)
    main.slider.size(guixSize)

    return main
}