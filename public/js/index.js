document.addEventListener('DOMContentLoaded', () => {
  iflogin();
});

function iflogin() {
  console.log('함수 통과');
  const authorization = sessionStorage.getItem('Authorization');
  const signupButton = document.querySelector('#signupButton');
  const loginButton = document.querySelector('#loginButton');
  const logoutButton = document.querySelector('#logoutButton');
  const maintitle = document.querySelector('.maintitle');
  if (authorization) {
    console.log('if문 통과');
    signupButton.style.display = 'none';
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    maintitle.innerHTML = `
      <h1>9글9글9글 방문을 환영합니다.</h1>
      <button onclick="location.href='boardlist.html'">보드 생성 하러가기</button>
    `;
  }
}
