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

  console.log(result);
  console.log(result.message);
  return alert(result.message);
}
