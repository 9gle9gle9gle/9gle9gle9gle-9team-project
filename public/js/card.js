async function showACard(cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  const response2 = await fetch(
    `http://localhost:3000/api/boards/${boardId}/cards/${cardId}/workers`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );

  const result = await response.json();
  const result2 = await response2.json();
  let workers = result2.message
    .map(worker => {
      return `
      <div class = "innerworkerlist">
    <p>${worker.User.nickname}</p>
    <p>${worker.User.email}</p>
    <p>${worker.User.sentence}</p>
  </div>`;
    })
    .join('');
  const today = new Date();
  const endDate = new Date(result.message.endAt);
  const showEndDate = result.message.endAt;
  const leftDate = Math.floor((endDate.getTime() - today.getTime()) / 86400000);
  let leftalert;
  if (leftDate > 0) {
    leftalert = `/ 마감(${leftDate})일 전`;
  } else {
    leftalert = '마감일이 지났습니다.';
  }
  const realcardColor = result.message.cardColor;
  const cardName = result.message.cardName;
  const cardContent = result.message.cardContent;
  const inputboardId = result.message.boardId;
  const tempHtml = `
  <div class = "innerCard">
  <span class="close" onclick="closeModal2()">&times;</span>
   <div class = "innercardtext"> <h2>${result.message.cardName}</h2></div>
    <div class = "innerCardButtons">
    <button onclick = 'loadCardEditor(${cardId},"${cardName}","${cardContent}",${realcardColor}, "${showEndDate}")'>수정</button>
    <button onclick = "deleteCard(${cardId})">삭제</button>
    </div>
    <div class = "endAt">
      <div class = "endDate">마감 일 ${showEndDate.substr(0, 10)}
        <div class = "leftalert">${leftalert}</div></div>
    <div class = "cardcontent"><p>${result.message.cardContent}</p>
    </br> </br>
    <label> [ 작업자 명단 ] </label>
    </br>
    </br>
    <div class ="workerlist">
    ${workers}</div>
    </br>
    </br>
    <button id = "addWorkerBtn" onclick = "addWorker(${cardId})">나도 참여하기</button>
    </br>
    </br>
    </div>
    </div>
    <div class="commentSection">
      <div class="comments">
      </div>
      <textarea class = "commentcontent${cardId}" id="commentTextarea" placeholder="댓글을 입력하세요"></textarea>
      <button onclick="makeComment(${cardId})">작성</button>
    </div>
    </div>`;

  const card = document.querySelector('.cardmodal-content');
  card.innerHTML = tempHtml;
}

async function loadCardEditor(cardId, cardName, cardContent, cardColor, endAt) {
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
  const options = result.columns
    .map(column => {
      return `
    <option value="${column.columnId}">${column.columnName}</option>
  `;
    })
    .join('');

  console.log('loadCardEditor실행');
  if (cardColor == 0) {
    cardColor = 'red';
  } else if (cardColor == 1) {
    cardColor = 'orange';
  } else if (cardColor == 2) {
    cardColor = 'yellow';
  } else if (cardColor == 3) {
    cardColor = 'green';
  } else if (cardColor == 4) {
    cardColor = 'blue';
  } else if (cardColor == 5) {
    cardColor = 'purple';
  }
  const tempHtml = `
  <label>카드 제목</label></br>
  <input type = "text" id ="editcardName${cardId}" value = "${cardName}"></input>
  </br>
  </br>
  <label>카드 내용</label></br>
  <input type = "textarea" id ="editcardContent${cardId}" value="${cardContent}"></input>
  </br>
  </br>
  <label>카드 색상</label></br>
    <select id = "editcardColor${cardId}">
      <option selected>-- 선택해 주세요 --</option>
      <option value="0">red</option>
      <option value="1">orange</option>
      <option value="2">yellow</option>
      <option value="3">green</option>
      <option value="4">blue</option>
      <option value="5">purple</option>
    </select>
    </br>
  </br>
  <label>컬럼 선택</label></br>
    <select id = "editCoulumnId${cardId}">
      <option selected>-- 선택해 주세요 --</option>
      ${options}
    </select>
    </br>
    </br>
    <label>마감 날짜</label>
    <input type = "date" id ="editendAt${cardId}" value="${endAt.substr(
      0,
      10,
    )}"></input>
    <button class = "btn-save" onclick="editCard(${cardId})">수정 완료</button>`;

  const cardcontainer = document.querySelector('.innerCard');
  cardcontainer.innerHTML = tempHtml;
}

async function editCard(cardId) {
  const cardName = document.querySelector(`#editcardName${cardId}`).value;
  const cardContent = document.querySelector(`#editcardContent${cardId}`).value;
  const endAt = document.querySelector(`#editendAt${cardId}`).value;
  const cardColor = document.querySelector(`#editcardColor${cardId}`).value;
  const columnId = document.querySelector(`#editCoulumnId${cardId}`).value;

  const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ cardName, cardColor, cardContent, endAt, columnId }),
  });
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}

async function deleteCard(cardId) {
  const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
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

async function showComments(cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}/cards/${cardId}/comments`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );

  const result = await response.json();
  const tempHtml = result.message
    .map(comment => {
      return `<div class = "comment${comment.commentId}" id="commentbox">
                <div class = "commentcontent">
                  ${comment.content} 
                </div>
                  <div class = "commentBtns">
                  <button class = "commentBtn" onclick=" loadCommentEditor('${comment.content}',${comment.commentId},${cardId})">수정</button>
                  <button class = "commentBtn" onclick=" deleteComment(${comment.commentId},${cardId})">삭제</button>
                  </div>
              </div>`;
    })
    .join('');

  const commentlist = document.querySelector('.comments');
  commentlist.innerHTML = tempHtml;
}

async function loadCommentEditor(content, commentId, cardId, boardId) {
  const tempHtml = `<div>
    <input type = "textarea" class = "commentEditInput" id = "editcomment${commentId}" value = "${content}"></input>   
    <button class = "commentBtn" onclick="editComment(${commentId},${cardId},${boardId})">완료</button>
  </div>`;

  const commentcontent = document.querySelector(`.comment${commentId}`);
  commentcontent.innerHTML = tempHtml;
}

async function makeComment(cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const content = document.querySelector(`.commentcontent${cardId}`).value;
  const response = await fetch(
    `http://localhost:3000/api/cards/${cardId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        content,
        boardId,
      }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  showComments(cardId);
}

async function editComment(commentId, cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const content = document.querySelector(`#editcomment${commentId}`).value;

  const response = await fetch(
    `http://localhost:3000/api/cards/${cardId}/comments/${commentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ content }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  showComments(cardId);
  return alert(result.message);
}

async function deleteComment(commentId, cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const response = await fetch(
    `http://localhost:3000/api/cards/${cardId}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ deletedAt: new Date() }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  showComments(cardId);
  return alert(result.message);
}

async function addWorker(cardId) {
  const boardId = sessionStorage.getItem('boardId');
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}/cards/${cardId}/workers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}
