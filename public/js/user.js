// 로그아웃
async function logout() {
  const response = await fetch(`http://localhost:3000/api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);

  if (response.ok) {
    console.log(result.message);
    alert(result.message);

    window.location.href = 'http://localhost:3000';
  } else {
    console.log(result.message);
    alert(result.message);
  }
}

// 회원 탈퇴
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
