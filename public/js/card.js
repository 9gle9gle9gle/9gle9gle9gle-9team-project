showACard();
async function showACard() {
  const cardId = 22;
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
  const tempHtml = `<div style = "border : 2px solid ${cardColor}">
                        <h2>${result.message.cardName}</h2>
                        <div>${result.message.cardContent}</div>
                        <div>${result.message.endAt.slice(0, 10)}</div>
                        <div>${leftalert}</div>
                    </div>`;

  const card = document.querySelector('#card');
  card.innerHTML = tempHtml;
}
