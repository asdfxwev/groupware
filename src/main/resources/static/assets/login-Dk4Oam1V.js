import"./modulepreload-polyfill-B5Qt9EMX.js";const d=document.getElementById("app");d.innerHTML=`
  <div style="max-width:400px; margin:100px auto; padding:2rem; border:1px solid #ddd; border-radius:8px;">
    <h2>로그인</h2>
    <form id="login-form">
      <div style="margin-bottom:1rem;">
        <label>아이디<br/>
          <input id="username" type="text" style="width:100%; padding:0.5rem; margin-top:0.25rem;" />
        </label>
      </div>
      <div style="margin-bottom:1rem;">
        <label>비밀번호<br/>
          <input id="password" type="password" style="width:100%; padding:0.5rem; margin-top:0.25rem;" />
        </label>
      </div>
      <button type="submit" style="width:100%; padding:0.75rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">
        로그인
      </button>
      <p id="error-msg" style="color:red; margin-top:0.5rem;"></p>
    </form>
    <p style="text-align:center; margin-top:1rem;">
      계정이 없으신가요? <a href="/signup.html">회원가입</a>
    </p>
  </div>
`;new URLSearchParams(window.location.search).get("error")&&(document.getElementById("error-msg").textContent="아이디 또는 비밀번호가 올바르지 않습니다.");document.getElementById("login-form").addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("username").value,n=document.getElementById("password").value,e=document.getElementById("error-msg");try{const t=await fetch("/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({username:o,password:n})});t.ok||t.redirected?window.location.href="/board.html":e.textContent="아이디 또는 비밀번호가 올바르지 않습니다."}catch{e.textContent="서버 연결에 실패했습니다."}});
