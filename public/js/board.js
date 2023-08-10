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
  console.log(result);
  const tempHtml = result.columns
    .map(column => {
      return `<div>
                  <h2>${column.columnName}</h2>
                  <div class = "cardslist"></div>
                    <form id="formbox" action="/api/cards" method="POST" onsubmit="return false">
                      <input type="hidden value="1" name="boardId"></input>
                      <input type="hidden value="1" name="columnId"></input>

                      <label>카드 제목</label>
                        <input type="text" name="cardName"/>

                      <label>카드 색상</label>
                      <select name = "cardColor">
                        <option selected>-- 선택해 주세요 --</option>
                          <option value="0">red</option>
                          <option value="1">orange</option>
                          <option value="2">yellow</option>
                          <option value="3">green</option>
                          <option value="4">blue</option>
                          <option value="5">purple</option>
                      </select>

                      <label>마감 날짜</label>
                        <input type="date" name="endAt" />
                      
                      <button type ="submit">생성</button>
                    </form>
                <div>`;
    })
    .join('');
  const addTodoListDiv = document.querySelector('#addTodoListDiv');
  addTodoListDiv.innerHTML = tempHtml;
  return;
}
