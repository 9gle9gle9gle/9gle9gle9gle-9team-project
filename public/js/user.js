async function logout() {
  const response = fetch(`http://localhost:3000/api/logout`, {
    method: 'POST',
  });

  const result = (await response).json();

  if (response.ok) {
    console.log(result.message);
    alert(result.message);

    window.location.href = 'http://localhost:3000';
  } else {
    console.log(result.message);
    alert(result.message);
  }
}

async function deleteUser() {
  const response = await fetch(`http://localhost:3000/api/signout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ deletedAt: new Date() }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log(result.message);
    alert(result.message);

    window.location.href = 'http://localhost:3000';
  } else {
    console.log(result.message);
    alert(result.message);
  }
}
