// Add modal

const addModal = document.getElementById('addModal');
const addInput = document.getElementById('addCategoryInput');

document.getElementById('openNewModalBtn').addEventListener('click', () => {
  addInput.value = '';
  addModal.showModal();
});

document.getElementById('closeAddBtn').addEventListener('click', () => {
  addModal.close();
});
