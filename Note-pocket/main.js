let notes = []
let counter = 0
let date = new Date().toLocaleString()

const noteForm = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')

let title = document.querySelector('#note-title')
let content = document.querySelector('#note-content')
let color = document.querySelector('#color')
let submit = document.querySelector('#btn-create-note')
let noteSearch = document.querySelector('#text-search');

noteForm.addEventListener('submit', createNote)
noteList.addEventListener('click', deleteNote)

noteForm.addEventListener("keyup", function(e) { // releasing the key
    if (e.keyCode === 13) { // Number 13 is the Enter key on the keyboard
      e.preventDefault() // Cancel the default action, if needed
      document.getElementById("btn-create-note").click();
    }
})

color.addEventListener('change', function(){
    color.style.backgroundColor = color.value
})

function createNote(e){

    const div = document.createElement('div')
    div.className = `note-list-notes ${counter}`

    const h1 = document.createElement('div')
    h1.className ='note-list-delete'
    h1.innerHTML = '<i class="fas fa-times"></i>'
    div.appendChild(h1)

    const h2 = document.createElement('div')
    h2.className = 'note-list-date'
    h2.appendChild(document.createTextNode(date))
    div.appendChild(h2)

    const h3 = document.createElement('div')
    h3.className = 'note-list-title'
    h3.appendChild(document.createTextNode(title.value))
    div.appendChild(h3)

    const h4 = document.createElement('div')
    h4.className = 'note-list-content'
    h4.appendChild(document.createTextNode(content.value))
    div.appendChild(h4)

    noteList.appendChild(div) 
    
    let choseColor = color.value
    div.style.backgroundColor = color.value

    notes.push({
        id: `id ${counter}`,
        title: title.value,
        content: content.value,
        color: choseColor,
        date: date
    })

    StoreNoteInLocalStorage(notes[counter])
    title.value = '' // always free space for the next note
    content.value = ''
    counter++
    e.preventDefault()  // doesn't interrupt the event

    function StoreNoteInLocalStorage(note){
        (localStorage.getItem('notes') === null) ? notes=[] : (notes=JSON.parse(localStorage.getItem('notes')))
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes))
    }
}

function deleteNote(e){
    e.target.parentElement.parentElement.remove()
    localStorage.clear()
}

noteSearch.addEventListener('input', function() {
    const val = this.value
    const elems = noteList.querySelectorAll('.note-list-notes')

    elems.forEach(function(el) { // checks if the text contains the searched phrase
        const text = el.querySelector('.note-list-content').innerText

        if (text.indexOf(val) !== -1) { 
            el.style.display = 'block'
        } else {
            el.style.display = 'none' // when the value is -1 the phrase doesn't exist
        }
    })
})

function scrollWin() {
    window.scrollBy(0, 670);
}