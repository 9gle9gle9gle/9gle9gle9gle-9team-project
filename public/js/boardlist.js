document.addEventListener('DOMContentLoaded', () => {
  boardlist();
});

async function boardlist() {
  const response = await fetch(`http://localhost:3000/api/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });

  const result = await response.json();
  const tempHtml = result.getBoards
    .map(board => {
      let boardColor;
      if (board.boardColor == 0) {
        boardColor = 'red';
      } else if (board.boardColor == 1) {
        boardColor = 'orange';
      } else if (board.boardColor == 2) {
        boardColor = 'yellow';
      } else if (board.boardColor == 3) {
        boardColor = 'green';
      } else if (board.boardColor == 4) {
        boardColor = 'blue';
      } else if (board.boardColor == 5) {
        boardColor = 'purple';
      }

      return `<div style = "border : 2px solid ${boardColor}" onclick= "moveToBoard(${board.boardId})">${board.boardName}</div>
      <button onclick = "openmodal()">수정</button>
      <div id = "modalcontent" display="block">
      <label>보드 제목</label>
      <input id = "boardName${board.boardId}">
      <label>보드 색상</label>
      <input id = "boardColor${board.boardId}">
      <label>보드 내용</label>
      <input id = "boardContent${board.boardId}">
      </div>
      <button onclick="deleteBoard(${board.boardId})">삭제</button>`;
    })
    .join('');

  const boardlist = document.querySelector('#boardlist');
  boardlist.innerHTML = tempHtml;
  console.log(result.message);
}

function moveToBoard(boardId) {
  sessionStorage.setItem('boardId', boardId);
  location.href = 'board.html';
}

async function editBoard(boardId) {
  const boardName = document.querySelector(`#boardName${boardId}`);
  const boardColor = document.querySelector(`#boardColor${boardId}`);
  const boardContent = document.querySelector(`#boardContent${boardId}`);
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ boardName, boardColor, boardContent }),
  });

  const result = await response.json();
}

async function deleteBoard(boardId) {}
