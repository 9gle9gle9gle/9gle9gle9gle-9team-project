const boardId = sessionStorage.getItem('inviteboardId');
async function invite() {
  const email = document.querySelector('#email').value;
  const response = await fetch(`http://localhost:3000/api/accesses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ boardId, email }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}
