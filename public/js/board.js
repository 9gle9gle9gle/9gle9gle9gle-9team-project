async function viewABoard() {
  const boardId = 1;
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });

  const result = await response.json();
  console.log(result.message);
  return alert(result.message);
}
