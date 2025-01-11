const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const output = document.getElementById('output');
const loadingMessage = document.getElementById('loadingMessage');

const noteTitle = document.getElementById('noteTitle');
const noteDescription = document.getElementById('noteDescription');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');

uploadButton.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  if (imageInput.files.length === 0) {
    output.value = 'Nie wybrano pliku.';
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  loadingMessage.classList.remove('hidden');
  output.value = '';

  reader.onload = () => {
    Tesseract.recognize(reader.result, 'eng', {
      logger: m => console.log(m)
    })
      .then(({ data: { text } }) => {
        output.value = text; // Wstawienie tekstu z OCR do pola
        noteDescription.value = text;
      })
      .catch((err) => {
        output.value = 'Błąd OCR: ' + err.message;
      })
      .finally(() => {
        loadingMessage.classList.add('hidden');
      });
  };

  reader.readAsDataURL(file);
});

addNoteButton.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const description = noteDescription.value.trim();

  if (!title || !description) {
    alert('Wprowadź tytuł i opis notatki.');
    return;
  }

  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');

  noteCard.innerHTML = `
    <div class="note-title">${title}</div>
    <div class="note-description">${description}</div>
  `;

  notesContainer.appendChild(noteCard);

  noteTitle.value = '';
  noteDescription.value = '';
});
