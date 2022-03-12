function drawVisualizations() {
    //energy
    push()
    let bass = fft.getEnergy("bass")
    let lowMid = fft.getEnergy("lowMid")
    let mid = fft.getEnergy("mid")
    let highMid = fft.getEnergy("highMid")
    let treble = fft.getEnergy("treble")

    noStroke()
    translate(guiX / 2, height / 2)

    //bass
    push()
    let bassX = -(guiX / 6 * 2)
    fill(bass, 0, 0, bass)
    ellipse(bassX, 0, bass)
    pop()
    //bass text
    push()
    translate(bassX, 0)
    rotate(textRot)
    textSize(bass / 10)
    fill(255, 255, 255, bass)
    text('bass', 0, 0)
    pop()

    //lowMid
    push()
    let lowMidX = -(guiX / 6)
    fill(lowMid, lowMid, 0, lowMid)
    ellipse(lowMidX, 0, lowMid)
    pop()
    //lowMid text
    push()
    translate(lowMidX, 0)
    rotate(textRot)
    textSize(lowMid / 10)
    fill(255, 255, 255, lowMid)
    text('lowMid', 0, 0)
    pop()

    //mid
    push()
    fill(0, mid, 0, mid)
    ellipse(0, 0, mid)
    pop()
    //mid text
    push()
    translate(0, 0)
    rotate(textRot)
    textSize(mid / 10)
    fill(255, 255, 255, mid)
    text('mid', 0, 0)
    pop()

    //highMid
    push()
    let highMidX = guiX / 6
    fill(0, highMid, highMid, highMid)
    ellipse(highMidX, 0, highMid)
    pop()
    //highMid text
    push()
    translate(highMidX, 0)
    rotate(textRot)
    textSize(highMid / 10)
    fill(255, 255, 255, highMid)
    text('highMid', 0, 0)
    pop()

    //treble
    push()
    let trebleX = guiX / 6 * 2
    fill(0, 0, treble, treble)
    ellipse(trebleX, 0, treble)
    pop()
    //treble text
    push()
    translate(trebleX, 0)
    rotate(textRot)
    textSize(treble / 10)
    fill(255, 255, 255, treble)
    text('treble', 0, 0)
    pop()

    pop()

    //waveform
    push()
    let wArr = []
    let waveform = fft.waveform();
    wArr.push(waveform)
    moveText += 1
    translate(map(main.sound.currentTime(), 0, main.sound.duration(), 0, guiX), height / 2)
    rotate(270)
    noStroke()
    fill(255)
    textSize(10)
    for (var k = 0; k < 6; k++) {
        text('WAVEFORM', moveText + 200 * k - height, 0)
    }
    if (moveText > 200) {
        moveText = 0
    }
    pop()
    push()
    beginShape()
    translate(map(main.sound.currentTime(), 0, main.sound.duration(), 0, guiX), 0)
    for (var i = 0; i < wArr.length; i++) {
        for (var j = 0; j < wArr[i].length; j++) {
            noFill()
            stroke(255)
            vertex(wArr[i][j] * 100, j)
        }
    }
    endShape()
    pop()

    //frequency
    push()
    let frequency = fft.analyze()
    stroke(255, 255, 255, 170)
    for (var i = 0; i < frequency.length; i++) {
        var mappedWidth = map(i, 0, frequency.length, 0, guiX)
        var mappedHeight = map(frequency[i], 0, 255, 0, height)
        line(mappedWidth, height, mappedWidth, height - mappedHeight)
    }
    noStroke()
    textSize(50)
    fill(0, 0, 0, 50)
    text('FREQUENCY', guiX / 2, height - 100)
    pop()

    //amplitude
    push()
    let ampSize = mic.getLevel() * 200
    textRot += 1
    noStroke()
    fill(0)
    translate(map(main.sound.currentTime(), 0, main.sound.duration(), 0, guiX), height / 2)
    rotate(textRot)
    ellipseMode(RADIUS)
    ellipse(0, 0, ampSize)
    fill(255)
    textSize(ampSize / 4)
    text('AMPLITUDE', 0, 0)
    pop()
}