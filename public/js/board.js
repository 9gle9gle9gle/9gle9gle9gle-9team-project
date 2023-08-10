document.addEventListener('DOMContentLoaded', () => {
  viewABoard();
});

async function viewABoard() {
  const boardId = 1;
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
      <div class="title1"><p>${column.columnName}</p>
      <button class="deleteColumnButton" onclick="deleteColumn(${column.columnId})">삭제</button></div>
      <div class="cardone">
        <div class="cardCreate">
          <input type="hidden" value="1" id="boardId">
          <input type="hidden" value="1" id="columnId">
          <div class="card">
            <input type="text" id="cardName${column.columnId}" />
            <button type="button" onclick="openModal(${boardId}, ${column.columnId})">생성</button>
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="close" onclick="closeModal1()">&times;</span>
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
        cardColor = 'goldenrod';
      } else if (item.cardColor == 2) {
        cardColor = 'lemonchiffon';
      } else if (item.cardColor == 3) {
        cardColor = 'green';
      } else if (item.cardColor == 4) {
        cardColor = 'lightcyan';
      } else if (item.cardColor == 5) {
        cardColor = 'thistle';
      }
      return `<div style="background: ${cardColor}" onclick="openCardModal('${item.cardName}', '${item.cardContent}', '${item.endAt}')">
              <h2>${item.cardName}</h2>
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
        boardId: '1',
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
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  // 생성 버튼에 boardId와 columnId 전달
  const createButton = modal.querySelector('button');
  createButton.setAttribute('onclick', `makeCard(${boardId}, ${columnId})`);
}

function openCardModal(cardName, cardContent, endAt) {
  const modal = document.querySelector('.cardModal');
  const modalContent = modal.querySelector('.cardmodal-content');

  modalContent.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>
    <h2>${cardName}</h2>
    <p>마감 날짜: ${endAt}</p>
    <div class = "cardcontent"><p>${cardContent}</p></div>
    <div class="commentSection">
      <div class="comments">
        <!-- 댓글이 여기에 동적으로 추가될 것입니다 -->
      </div>
      <textarea id="commentTextarea" placeholder="댓글을 입력하세요"></textarea>
      <button onclick="addComment()">입력</button>
    </div>
  `;

  modal.style.display = 'block';
}

// 댓글 기능

function addComment() {
  const commentTextarea = document.getElementById('commentTextarea');
  const comment = commentTextarea.value;

  if (comment.trim() !== '') {
    const commentsSection = document.querySelector('.comments');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.textContent = comment;
    commentsSection.appendChild(commentElement);

    commentTextarea.value = ''; // 댓글 입력창 비우기
  }
}

// 모달 창 닫기
function closeModal1() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}
function closeModal() {
  const modal = document.querySelector('.cardModal');
  modal.style.display = 'none';
}
