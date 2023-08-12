async function editprofile() {
  const nickname = document.querySelector('#nickname').value;
  const sentence = document.querySelector('#sentence').value;
  const response = await fetch(`http://localhost:3000/api/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ nickname, sentence }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}

function openModal() {
  const modal = document.getElementById(`modal`);
  modal.style.display = 'block';
}
function closeModal() {
  const modal = document.getElementById(`modal`);
  modal.style.display = 'none';
}
