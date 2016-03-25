var form = document.getElementById('downlaodData');
var option = document.getElementById('option');
var input = document.getElementById('query');
var loading = document.getElementById('black');

form.addEventListener('submit', (e) => {
  loading.classList.remove('hidden');
  e.preventDefault();
  fetch('./download', {
    method: 'POST',
    body: JSON.stringify({
      url: option.value,
      query: input.value,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((data) => data.json())
  .then(json => {
    loading.classList.add('hidden');
    alert(json);
  });
});
