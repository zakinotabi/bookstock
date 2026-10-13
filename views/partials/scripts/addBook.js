// add event

const addModal = document.getElementById('addModal');
const addForm = addModal.querySelector('form');

document.getElementById('openNewModalBtn').addEventListener('click', () => {
  addForm.reset();
  addModal.showModal();
});

document.getElementById('closeAddBtn').addEventListener('click', () => {
  addModal.close();
});
