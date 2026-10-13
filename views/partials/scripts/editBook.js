const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editIdInput = document.getElementById('editBookId');
const editTitleInput = document.getElementById('editTitleInput');
const editAuthorInput = document.getElementById('editAuthorInput');
const editCategorySelect = document.getElementById('editCategorySelect');
const editPriceInput = document.getElementById('editPriceInput');
const editStockInput = document.getElementById('editStockInput');

// edit event

document.querySelectorAll('.editBtn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const d = e.currentTarget.dataset;
    editIdInput.value = d.id;
    editTitleInput.value = d.title;
    editAuthorInput.value = d.author;
    editCategorySelect.value = d.categoryId;
    editPriceInput.value = d.price;
    editStockInput.value = d.stock;
    editModal.showModal();
  });
});

document.getElementById('closeEditBtn').addEventListener('click', () => {
  editModal.close();
});
