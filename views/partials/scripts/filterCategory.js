// filter category event

document.getElementById('category-select').addEventListener('change', async (e) => {
  const categoryId = e.target.value;
  const response = await fetch(`/books/category/filter/${categoryId}`);
  const html = await response.text();
  document.getElementById('books-table').innerHTML = html;
});
