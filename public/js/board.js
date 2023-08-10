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
      return `<div class = "cardBox">
                  <h2>${column.columnName}</h2>
                  <div class = "cardslist" id ="cardslist${column.columnId}"></div>
                  <div class = "cardCreate">
                      <input type="hidden" value="1" id="boardId"></input>
                      <input type="hidden" value="1" id="columnId"></input>

                      <label>카드 제목</label>
                        <input type="text" id="cardName"/>

                      <label>카드 내용</label>
                        <input type="text" id="cardContent" />

                      <label>카드 색상</label>
                      <select id = "cardColor">
                        <option selected>-- 선택해 주세요 --</option>
                          <option value="0">red</option>
                          <option value="1">orange</option>
                          <option value="2">yellow</option>
                          <option value="3">green</option>
                          <option value="4">blue</option>
                          <option value="5">purple</option>
                      </select>

                      <label>마감 날짜</label>
                        <input type="date" id="endAt" />
                      
                      <button type ="button" onclick="makeCard()">생성</button>
                    </div>
                <div>`;
    })
    .join('');
  const addTodoListDiv = document.querySelector('#addTodoListDiv');
  addTodoListDiv.innerHTML = tempHtml;
  return;
}

async function makeCard() {
  const boardId = document.querySelector('#boardId').value;
  const columnId = document.querySelector('#columnId').value;
  const cardName = document.querySelector('#cardName').value;
  const cardContent = document.querySelector('#cardContent').value;
  const cardColor = document.querySelector('#cardColor').value;
  const endAt = document.querySelector('#endAt').value;
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
        cardColor = 'red';
      } else if (item.cardColor == 1) {
        cardColor = 'orange';
      } else if (item.cardColor == 2) {
        cardColor = 'yellow';
      } else if (item.cardColor == 3) {
        cardColor = 'green';
      } else if (item.cardColor == 4) {
        cardColor = 'blue';
      } else if (item.cardColor == 5) {
        cardColor = 'purple';
      }
      return `<div style = "border : 2px solid ${cardColor}" onclick="location.href='signup.html'" >
              <h2>${item.cardName}</h2>
            </div>`;
    })
    .join('');

  const target = document.querySelector(`#cardslist${columnId}`);
  target.innerHTML = tempHtml;

  console.log(result.message);
  return;
}
