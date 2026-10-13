// delete event

const deleteModal = document.getElementById('deleteModal');
const deleteIdInput = document.getElementById('deleteBookId');
const deleteTitleSpan = document.getElementById('deleteBookTitle');

document.querySelectorAll('.deleteBtn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const d = e.currentTarget.dataset;
    deleteIdInput.value = d.id;
    deleteTitleSpan.textContent = d.title;
    deleteModal.showModal();
  });
});

document.getElementById('closeDeleteBtn').addEventListener('click', () => {
  deleteModal.close();
});
