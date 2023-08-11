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

      return `<div style = "border : 2px solid ${boardColor}" >
      <p onclick= "moveToBoard(${board.boardId})">${board.boardName}</p>
      <button onclick = "openModal(${board.boardId})">수정</button>   
      <div class = "boardmodal${board.boardId}" id = "modal">   
      <div class = "modal-content">
      <div class = "closeboardmodal">
      <button class="close" onclick="closeModal(${board.boardId})">X</button>
      </div>
      <div>
      </br>
      <label>보드 제목</label>
      </br>
      <input id = "boardName${board.boardId}">
      </br>
      </br>
      <label>보드 색상</label>
      </br>
      <select id="boardColor${board.boardId}">
      <option selected>-- 카드 색상 --</option>
      <option value="0">red</option>
      <option value="1">orange</option>
      <option value="2">yellow</option>
      <option value="3">green</option>
      <option value="4">blue</option>
      <option value="5">purple</option>
    </select>
      </br>
      </br>
      <label>보드 내용</label>
      </br>
      <input id = "boardContent${board.boardId}">
      </br>
      </br>
      <button onclick ="editBoard(${board.boardId})">수정</button>
      </div>
      </div>
      </div>
      <button onclick="deleteBoard(${board.boardId})">삭제</button></div>`;
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
  const boardName = document.querySelector(`#boardName${boardId}`).value;
  const boardColor = document.querySelector(`#boardColor${boardId}`).value;
  const boardContent = document.querySelector(`#boardContent${boardId}`).value;
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ boardName, boardColor, boardContent }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}

function openModal(boardId) {
  const modalcontent = document.querySelector(`.boardmodal${boardId}`);
  modalcontent.style.display = 'block';
}

function closeModal(boardId) {
  const modalcontent = document.querySelector(`.boardmodal${boardId}`);
  modalcontent.style.display = 'none';
}

async function deleteBoard(boardId) {
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ deletedAt: new Date() }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}

async function createBoard() {
  const boardName = document.querySelector(`#boardName`).value;
  const boardColor = document.querySelector(`#boardColor`).value;
  const boardContent = document.querySelector(`#boardContent`).value;
  const response = await fetch(`http://localhost:3000/api/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ boardName, boardColor, boardContent }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}
function openModalmakeBoard() {
  const modalcontent = document.querySelector(`.makeboardmodal`);
  modalcontent.style.display = 'block';
}

function closeModalmakeBoard() {
  const modalcontent = document.querySelector(`.makeboardmodal`);
  modalcontent.style.display = 'none';
}
