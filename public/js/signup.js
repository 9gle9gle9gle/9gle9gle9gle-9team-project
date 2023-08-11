async function signup() {
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const confirm = document.querySelector('#confirm').value;
  const nickname = document.querySelector('#nickname').value;
  console.log(email);
  const response = await fetch(`http://localhost:3000/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, confirm, nickname }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log(result);
    console.log(result.message);
    alert(result.message);

    window.location.href = 'http://localhost:3000/login.html';
  } else {
    console.log(result);
    console.log(result.message);
    alert(result.message);
  }
}
