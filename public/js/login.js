async function login() {
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  console.log(email);
  const response = await fetch(`http://localhost:3000/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  console.log(result.message);
  sessionStorage.setItem(
    'Authorization',
    response.headers.get('Authorization'),
  );
  sessionStorage.setItem('loginId', result.nickname);
  return alert(result.message);
}
