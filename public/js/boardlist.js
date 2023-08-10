document.addEventListener('DOMContentLoaded', () => {
  boardlist();
  showACard();
  showComments();
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

      return `<div style = "border : 2px solid ${boardColor}" onclick= "moveToBoard(${board.boardId})">${board.boardName}</div>`;
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
