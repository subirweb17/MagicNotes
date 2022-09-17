console.log("welcome to Magic Notes");
showNotes();

// if user add a NoTE, added to the local storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title:addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})
//fUNCTION TO SHOW ELEMENTS FROM LOCAL STORAGE
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          <button id="${index}"onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
        </div>
      </div>
               `

    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to Show! Use "Add Note" section. `
    }
}

//function to delete a note
function deleteNote(index) {
    console.log('I am deleting', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();
}

search =document.getElementById('searchTxt')
search.addEventListener("input", function(){

    inputval= search.value.toLowerCase();
    console.log('Input event fired!', inputval)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText
        if(cardTxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
   

})
