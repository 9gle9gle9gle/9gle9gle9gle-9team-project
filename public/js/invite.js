document.addEventListener('DOMContentLoaded', () => {
  invitelist();
});

async function invite() {
  const boardId = sessionStorage.getItem('inviteboardId');
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
async function invitelist() {
  const boardId = sessionStorage.getItem('inviteboardId');
  const response = await fetch(
    `http://localhost:3000/api/accesses?boardId=${boardId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );

  const result = await response.json();
  console.log(result.message);
  console.log(result.showAccess);
  const tempHtml = result.showAccess
    .map(access => {
      console.log(access);
      return `    <div class = "invitebox">
                    <div class = "innerinvite">${access.User.nickname}</div>
                    <div class = "innerinvite">${access.User.email}</div>
                    <div class = "innerinvite">${access.User.sentence}</div>
                    <button onclick="uninvite(${access.userId},${access.boardId})">삭제</button>
                </div>`;
    })
    .join('');
  const target = document.querySelector('.invitelist');
  target.innerHTML = tempHtml;

  return;
}

async function uninvite(userId, boardId) {
  const response = await fetch(`http://localhost:3000/api/accesses`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ boardId, userId }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}
