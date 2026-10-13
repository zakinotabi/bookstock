// Edit modal
const editModal = document.getElementById('editModal');
const currentCategory = document.getElementById('editCategoryId');
const editNameInput = document.getElementById('editCategoryInput');

document.querySelectorAll('.editBtn').forEach((button) => {
  button.addEventListener('click', (e) => {
    editNameInput.value = e.currentTarget.dataset.category;
    currentCategory.value = e.currentTarget.dataset.category;
    editModal.showModal();
  });
});

document.getElementById('closeEditBtn').addEventListener('click', () => {
  editModal.close();
});
