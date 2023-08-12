document.addEventListener('DOMContentLoaded', () => {
  viewABoard();
});
const boardId = sessionStorage.getItem('boardId');
async function viewABoard() {
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}/columns`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );

  const result = await response.json();
  const tempHtml = result.columns
    .map(column => {
      showCards(boardId, column.columnId);
      return `<div class="cardBox">
      <div class = columnheader>
      <p>${column.columnName}</p>
      <button class="deleteColumnButton" onclick="deleteColumn(${column.columnId})">&times;</button>
      <div class ="columnheaderBtn">
      <button onclick="columnDown(${column.columnId},${boardId})">◀</button>
      <button onclick="columnUp(${column.columnId},${boardId})">▶</button>
      </div>
      </div>
      
      <div class="cardone">
        <div class="cardCreate">
          <div class="card">
          <div class = "inputcard">
            <input type="text" id="cardName${column.columnId}" />
            <button type="button" onclick="openModal(${boardId}, ${column.columnId})">생성</button></div>
            <div id="myModal${column.columnId}" class="modal">
              <div class="modal-content">
                <span class="close" onclick="closeModal1(${column.columnId})">&times;</span>
                <select id="cardColor${column.columnId}">
                  <option selected>-- 카드 색상 --</option>
                  <option value="0">red</option>
                  <option value="1">orange</option>
                  <option value="2">yellow</option>
                  <option value="3">green</option>
                  <option value="4">blue</option>
                  <option value="5">purple</option>
                </select>
              <input type="date" id="endAt${column.columnId}" />
                
                <textarea type="text" class ="cardContent" id="cardContent${column.columnId}" placeholder="내용을 입력해주세요"/></textarea>
                <button type="button" class = "createBTN" onclick="makeCard(${boardId}, ${column.columnId})">카드 생성</button>
                </div>
            </div>
          </div>
        </div>
        <div class="cardslist" id="cardslist${column.columnId}"></div>
      </div>
    </div>`;
    })
    .join('');
  const addTodoListDiv = document.querySelector('#addTodoListDiv');
  addTodoListDiv.innerHTML = tempHtml;
  return;
}

async function makeCard(boardId, columnId) {
  const cardName = document.querySelector(`#cardName${columnId}`).value;
  const cardContent = document.querySelector(`#cardContent${columnId}`).value;
  const cardColor = document.querySelector(`#cardColor${columnId}`).value;
  const endAt = document.querySelector(`#endAt${columnId}`).value;
  const response = await fetch(`http://localhost:3000/api/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({
      boardId,
      endAt,
      columnId,
      cardName,
      cardColor,
      cardContent,
    }),
  });

  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}

async function showCards(boardId, columnId) {
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}?columnId=${columnId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();

  const tempHtml = result.showCards
    .map(item => {
      let cardColor;
      if (item.cardColor == 0) {
        cardColor = 'tomato';
      } else if (item.cardColor == 1) {
        cardColor = 'orange';
      } else if (item.cardColor == 2) {
        cardColor = 'gold';
      } else if (item.cardColor == 3) {
        cardColor = 'mediumseagreen';
      } else if (item.cardColor == 4) {
        cardColor = 'skyblue';
      } else if (item.cardColor == 5) {
        cardColor = 'mediumpurple';
      }
      return `<div class = "cardbox" style="background: ${cardColor}">
              <h2 onclick="openCardModal('${item.cardId}','${item.boardId}')">${item.cardName}</h2>
             <div class = "cardboxBtn"> 
              <button onclick="cardUp(${item.cardId})">▲</button>
              <button onclick="cardDown(${item.cardId})">▼</button>
              </div>
            </div>`;
    })
    .join('');

  const target = document.querySelector(`#cardslist${columnId}`);
  target.innerHTML = tempHtml;
  console.log(result.message);
  return;
}

async function createColumn() {
  try {
    const columnName = document.querySelector('#createColumn').value;
    const response = await fetch('http://localhost:3000/api/columns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        boardId,
        columnName,
      }),
    });
    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }
    const data = await response.json();
    console.log('컬럼이 생성되었습니다.', data.column);
    location.reload();
  } catch (error) {
    console.error('컬럼 생성 중 오류 발생:', error);
  }
}
/////////////////////////////////////
// 모달 창 열기
function openModal(boardId, columnId) {
  const modal = document.getElementById(`myModal${columnId}`);
  modal.style.display = 'block';

  // 생성 버튼에 boardId와 columnId 전달
  const createButton = modal.querySelector('button');
  createButton.setAttribute('onclick', `makeCard(${boardId}, ${columnId})`);
}

function openCardModal(cardId, boardId) {
  const modal = document.querySelector('.cardModal');
  showACard(cardId);
  showComments(cardId, boardId);
  modal.style.display = 'block';
}

// 모달 창 닫기
function closeModal1(columnId) {
  const modal = document.getElementById(`myModal${columnId}`);
  modal.style.display = 'none';
}

function closeModal2() {
  const modal = document.querySelector('.cardModal');
  modal.style.display = 'none';
}

async function columnUp(columnId, boardId) {
  const response = await fetch(
    `http://localhost:3000/api/columns/${columnId}/up`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        boardId,
      }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return;
}

async function columnDown(columnId, boardId) {
  const response = await fetch(
    `http://localhost:3000/api/columns/${columnId}/down`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        boardId,
      }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return;
}

async function cardUp(cardId) {
  const response = await fetch(`http://localhost:3000/api/cards/${cardId}/up`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return;
}

async function cardDown(cardId) {
  const response = await fetch(
    `http://localhost:3000/api/cards/${cardId}/down`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return;
}

async function deleteColumn(columnId) {
  const response = await fetch(
    `http://localhost:3000/api/columns/${columnId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        deletedAt: new Date(),
        boardId,
      }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return;
}
