const app = document.getElementById('app')!

app.innerHTML = `
  <div style="max-width:400px; margin:100px auto; padding:2rem; border:1px solid #ddd; border-radius:8px;">
    <h2>회원가입</h2>
    <form id="signup-form">
      <div style="margin-bottom:1rem;">
        <label>아이디<br/>
          <input id="userId" type="text" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
        </label>
      </div>
      <div style="margin-bottom:1rem;">
        <label>이름<br/>
          <input id="name" type="text" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
        </label>
      </div>
      <div style="margin-bottom:1rem;">
        <label>비밀번호<br/>
          <input id="password" type="password" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
        </label>
      </div>
      <div style="margin-bottom:1.5rem;">
        <label>비밀번호 확인<br/>
          <input id="passwordConfirm" type="password" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
        </label>
      </div>
      <button type="submit" style="width:100%; padding:0.75rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">
        가입하기
      </button>
      <p id="error-msg" style="color:red; margin-top:0.5rem;"></p>
    </form>
    <p style="text-align:center; margin-top:1rem;">
      이미 계정이 있으신가요? <a href="/login.html">로그인</a>
    </p>
  </div>
`

document.getElementById('signup-form')!.addEventListener('submit', async (e) => {
  e.preventDefault()
  const userId = (document.getElementById('userId') as HTMLInputElement).value.trim()
  const name = (document.getElementById('name') as HTMLInputElement).value.trim()
  const password = (document.getElementById('password') as HTMLInputElement).value
  const passwordConfirm = (document.getElementById('passwordConfirm') as HTMLInputElement).value
  const errorMsg = document.getElementById('error-msg')!

  if (!userId || !name || !password) {
    errorMsg.textContent = '모든 항목을 입력해주세요.'
    return
  }
  if (password !== passwordConfirm) {
    errorMsg.textContent = '비밀번호가 일치하지 않습니다.'
    return
  }

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name, password }),
    })

    if (res.ok) {
      alert('회원가입이 완료됐습니다.')
      window.location.href = '/login.html'
    } else {
      const data = await res.json()
      errorMsg.textContent = data.message ?? '회원가입에 실패했습니다.'
    }
  } catch {
    errorMsg.textContent = '서버 연결에 실패했습니다.'
  }
})
