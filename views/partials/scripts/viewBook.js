const viewModal = document.getElementById('viewModal');

document.addEventListener('click', (e) => {
  const button = e.target.closest('.viewBtn');
  if (!button) return;

  const d = button.dataset;
  document.getElementById('viewTitle').textContent = d.title;
  document.getElementById('viewAuthor').textContent = d.author;
  document.getElementById('viewCategory').textContent = d.category;
  document.getElementById('viewPrice').textContent = d.price;
  document.getElementById('viewStock').textContent = d.stock;

  viewModal.showModal();
});

document.getElementById('closeViewBtn').addEventListener('click', () => {
  viewModal.close();
});
