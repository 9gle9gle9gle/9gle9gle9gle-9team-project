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
        boardColor = 'tomato';
      } else if (board.boardColor == 1) {
        boardColor = 'orange';
      } else if (board.boardColor == 2) {
        boardColor = 'gold';
      } else if (board.boardColor == 3) {
        boardColor = 'mediumseagreen';
      } else if (board.boardColor == 4) {
        boardColor = 'skyblue';
      } else if (board.boardColor == 5) {
        boardColor = 'mediumpurple';
      }

      return `<div class="boardBox" style = "background-color: ${boardColor}" >
      <p onclick= "moveToBoard(${board.boardId})"style = "font-size:30px">${board.boardName}</p>
      <p onclick= "moveToBoard(${board.boardId})" >${board.boardContent}</p>
      <button class= "updateBtn" onclick = "openModal(${board.boardId})" style = "background-color : ${boardColor}">수정</button>   
      <div class = "boardmodal${board.boardId}" id = "modal">   
      <div class = "modal-content">
     
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
      <span class="close" onclick="closeModal(${board.boardId})">&times;</span>
      </div>
      </div>
      </div>
      <button class= "deleteBtn" onclick="deleteBoard(${board.boardId})" style = "background-color : ${boardColor}">삭제</button>
      <button class= "inviteBtn" onclick="moveToInvite(${board.boardId})" style = "background-color : ${boardColor}">초대</button></div>
      `;
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

async function invite() {
  const response = await fetch(`http://localhost:3000/api/accesses`, {
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

function moveToInvite(boardId) {
  sessionStorage.setItem('inviteboardId', boardId);
  location.href = './invite.html';
}
