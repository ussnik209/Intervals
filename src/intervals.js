
const MAIN_NOTES = "C-D-EF-G-A-B"
const NOTES = [['C', 'B#'], ['C#', 'Db'], 'D', ['D#', 'Eb'], ['E', 'Fb'],
 ['F', 'E#'], ['F#', 'Gb'], 'G', ['G#', 'Ab'], 'A', ['A#', 'Bb'], ['B', 'Cb']]
const SEMITONES_IN_INTERVALS = {
    m2: 1,
    M2: 2,
    m3: 3,
    M3: 4,
    P4: 5,
    P5: 7,
    m6: 8,
    M6: 9,
    m7: 10,
    M7: 11,
    P8: 12,
}

function intervalConstruction(arr) {
    let intervalName = arr[0]  
    let degree = +arr[0][1]
    let direction = arr[2]
    let firstNote = arr[1]

    secondNote = findBaseSecondNote(degree, firstNote[0], direction)

    semitones = findSemitones(firstNote, secondNote, direction)
    
    let difference = SEMITONES_IN_INTERVALS[intervalName] - semitones 
    if(direction == 'dsc') {
        difference *= -1;
    }

    switch (difference) {
        case 0: 
            break
        case -2: 
            secondNote += 'bb'
            break
        case -1:
            secondNote += 'bb'
            break
        case 1:
            secondNote += '#'
            break
        case 2:
            secondNote += '##'
            break
    }

    return secondNote;
}

function findBaseSecondNote(degree, baseFirstNote, direction) {
    let mainNotes = MAIN_NOTES.split('-').join('').split('')
    if(direction == 'dsc') {
        mainNotes.reverse()
    }
    let indexFirstNote = mainNotes.findIndex(item => item == baseFirstNote)
    let indexSecondNote = indexFirstNote + degree - 1

    if(indexSecondNote >= mainNotes.length) {
        indexSecondNote -= mainNotes.length
    }
    return mainNotes[indexSecondNote]
}

function findSemitones(firstNote, secondNote, direction) {
    let notes = NOTES.slice()
    if(direction == 'dsc') {
        notes.reverse()
    }

    let indexFirstNote = notes.findIndex(item => item.includes(firstNote))
    let indexSecondNote = notes.findIndex(item => item.includes(secondNote))

    let semitones = indexSecondNote > indexFirstNote ? indexSecondNote - indexFirstNote :
                NOTES.length - indexFirstNote + indexSecondNote

    return semitones
}

function intervalIdentification(arr) {
    let firstNote = arr[0]
    let secondNote = arr[1]
    let direction = arr[2]

    firstNote = firstNote.length <= 2 ? firstNote:
                normalizeNote(firstNote) 
    secondNote = secondNote.length <= 2 ? secondNote:
                 normalizeNote(secondNote)

    semitones = findSemitones(firstNote, secondNote, direction)


    return getKeyByValue(SEMITONES_IN_INTERVALS, semitones)
}

function normalizeNote(note) {
    let indexNote = NOTES.findIndex(item => item.includes(note.slice(0, 2)))
    return note.slice(-1) == 'b' ?
           NOTES[indexNote - 1][0] :
           NOTES[indexNote + 1][0]
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }



    let findNoteButton = document.getElementById('findNoteButton')
    
    findNoteButton.addEventListener('click', function() {
        let intervalNote = document.getElementById('intervalNote')
        let intervalName = document.getElementById('intervalName').value
        let firstNote = document.getElementById('firstNoteConstruct').value
        let direction = document.getElementById('directionConstruct').value

        intervalNote.innerHTML = intervalConstruction([intervalName,
                                                       firstNote,
                                                       direction])
    })
    
    let findIntervalButton = document.getElementById('findIntervalButton')

    findIntervalButton.addEventListener('click', function() {
        let intervalNameOutput = document.getElementById('intervalNameOutput')
        let firstNoteIdentification = document.getElementById('firstNoteIdentification').value
        let secondNoteIdentification = document.getElementById('secondNoteIdentification').value
        let directionIdentification = document.getElementById('directionIdentification').value

        intervalNameOutput.innerHTML = intervalIdentification([firstNoteIdentification,
                                                               secondNoteIdentification,
                                                               directionIdentification])
    })

