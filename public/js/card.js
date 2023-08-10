async function showACard() {
  const cardId = 3;
  const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });

  const result = await response.json();
  let cardColor;
  if (result.message.cardColor == 0) {
    cardColor = 'red';
  } else if (result.message.cardColor == 1) {
    cardColor = 'orange';
  } else if (result.message.cardColor == 2) {
    cardColor = 'yellow';
  } else if (result.message.cardColor == 3) {
    cardColor = 'green';
  } else if (result.message.cardColor == 4) {
    cardColor = 'blue';
  } else if (result.message.cardColor == 5) {
    cardColor = 'purple';
  }
  const today = new Date();
  const endDate = new Date(result.message.endAt);
  const leftDate = Math.floor((endDate.getTime() - today.getTime()) / 86400000);
  let leftalert;
  if (leftDate > 0) {
    leftalert = `마감일까지 ${leftDate}일 남았습니다.`;
  } else {
    leftalert = '마감일이 지났습니다.';
  }
  const realcardColor = result.message.cardColor;
  const cardName = result.message.cardName;
  const cardContent = result.message.cardContent;
  const boardId = result.message.boardId;
  console.log(typeof cardId);
  const tempHtml = `<div style = "border : 2px solid ${cardColor}">
                        <div id = "cardcontainer">
                            <h2>${result.message.cardName}</h2>
                            <div>${result.message.cardContent}</div>
                            <div>${endDate.toString().substring(0, 10)}</div>
                            <div>${leftalert}</div>
                        </div>
                        <button onclick = 'loadCardEditor(${cardId},"${cardName}","${cardContent}",${realcardColor})'>수정</button>
                        <button onclick = "deleteCard(${cardId})">삭제</button>
                        <div id = "commentCreator">
                            <input type = "textarea" id = "commentcontent${cardId}"> 
                            <button onclick="makeComment(${cardId},${boardId})">작성</button>
                        </div>
                        <div id = "commentlist"></div>
                    </div>`;

  const card = document.querySelector('#card');
  card.innerHTML = tempHtml;
}

async function loadCardEditor(cardId, cardName, cardContent, cardColor) {
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
  const tempHtml = `<div style = "border : 2px solid ${cardColor}">
                        <input type = "text" id ="editcardName${cardId}" value = "${cardName}"></input>
                        <input type = "textarea" id ="editcardContent${cardId}" value="${cardContent}"></input>
                        <input type = "date" id ="editendAt${cardId}"></input>
                        <select id = "editcardColor${cardId}">
                            <option selected>-- 선택해 주세요 --</option>
                            <option value="0">red</option>
                            <option value="1">orange</option>
                            <option value="2">yellow</option>
                            <option value="3">green</option>
                            <option value="4">blue</option>
                            <option value="5">purple</option>
                        </select>
                        <button onclick="editCard(${cardId})">수정 완료</button>
                    </div>`;

  const cardcontainer = document.querySelector('#cardcontainer');
  cardcontainer.innerHTML = tempHtml;
}

async function editCard(cardId) {
  const cardName = document.querySelector(`#editcardName${cardId}`).value;
  const cardContent = document.querySelector(`#editcardContent${cardId}`).value;
  const endAt = document.querySelector(`#editendAt${cardId}`).value;
  const cardColor = document.querySelector(`#editcardColor${cardId}`).value;

  const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ cardName, cardColor, cardContent, endAt }),
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

async function showComments() {
  const cardId = 3;
  const boardId = 1;
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
  console.log(result);
  const tempHtml = result.message
    .map(comment => {
      return `<div>
                  <div>${comment.content}</div>   
                  <button onclick="loadCommentEditor('${comment.content}',${comment.commentId},${cardId})">수정</button>
                  <button onclick="deleteComment(${comment.commentId},${cardId})">삭제</button>
              </div>`;
    })
    .join('');

  const commentlist = document.querySelector('#commentlist');
  commentlist.innerHTML = tempHtml;
}

async function loadCommentEditor(content, commentId, cardId) {
  const tempHtml = `<div>
    <input type = "textarea" id = "editcomment${commentId}" value = "${content}"></input>   
    <button onclick="editComment(${commentId},${cardId})">수정 완료</button>
  </div>`;

  const commentCreator = document.querySelector('#commentCreator');
  commentCreator.innerHTML = tempHtml;
}

async function makeComment(cardId, boardId) {
  console.log('함수 진입');
  const content = document.querySelector(`#commentcontent${cardId}`).value;
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
  location.reload();
  return alert(result.message);
}

async function editComment(commentId, cardId) {
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
  location.reload();
  return alert(result.message);
}

async function deleteComment(commentId, cardId) {
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
  location.reload();
  return alert(result.message);
}
