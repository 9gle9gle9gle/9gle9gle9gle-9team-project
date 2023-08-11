document.addEventListener('DOMContentLoaded', () => {
  invitelist();
});

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
async function invitelist() {
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
  const tempHtml = result.showAccess
    .map(access => {
      console.log(access);
      return `    <div>
                    ${access.User.nickname}
                    ${access.User.email}
                    <button onclick="uninvite(${access.userId},${access.boardId})">초대 삭제</button>
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
