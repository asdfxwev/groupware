import"./modulepreload-polyfill-B5Qt9EMX.js";import{f as g,a as b,c as y,d as u,u as f}from"./user-Al2Opv9A.js";const h=document.getElementById("app");let a=0,o=!1,i={userId:"",name:""};async function x(){try{i=await g()}catch{window.location.href="/login.html";return}d()}async function d(){const s=await b(a);h.innerHTML=`
    <div style="max-width:800px; margin:2rem auto; padding:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:#f8f8f8; border-radius:8px;">
        <span style="font-weight:bold;">Groupware</span>
        <div style="display:flex; align-items:center; gap:1rem;">
          <span style="color:#555;">${i.name} 님</span>
          <button id="logout-btn" style="padding:0.4rem 0.9rem; background:white; border:1px solid #ccc; border-radius:4px; cursor:pointer;">로그아웃</button>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2 style="margin:0;">게시판</h2>
        <button id="toggle-form-btn" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">
          ${o?"취소":"글 작성"}
        </button>
      </div>

      <div id="write-form" style="display:${o?"block":"none"}; border:1px solid #ddd; border-radius:8px; padding:1.5rem; margin-top:1rem; margin-bottom:1.5rem; background:#fafafa;">
        <h3 style="margin-top:0;">새 게시글 작성</h3>
        <div style="margin-bottom:0.75rem;">
          <label>작성자<br/>
            <input id="form-writer" type="text" value="${i.name}" readonly
              style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box; background:#eee; cursor:not-allowed;" />
          </label>
        </div>
        <div style="margin-bottom:0.75rem;">
          <label>제목<br/>
            <input id="form-title" type="text" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
          </label>
        </div>
        <div style="margin-bottom:1rem;">
          <label>내용<br/>
            <textarea id="form-content" rows="5" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;"></textarea>
          </label>
        </div>
        <button id="submit-btn" style="padding:0.5rem 1.5rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">등록</button>
        <p id="form-error" style="color:red; margin-top:0.5rem;"></p>
      </div>

      <table style="width:100%; border-collapse:collapse; margin-top:1rem;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:0.75rem; border:1px solid #ddd;">번호</th>
            <th style="padding:0.75rem; border:1px solid #ddd;">제목</th>
            <th style="padding:0.75rem; border:1px solid #ddd;">작성자</th>
            <th style="padding:0.75rem; border:1px solid #ddd;">작성일</th>
            <th style="padding:0.75rem; border:1px solid #ddd;">관리</th>
          </tr>
        </thead>
        <tbody id="board-body"></tbody>
      </table>
      <div id="pagination" style="margin-top:1rem; text-align:center;"></div>
    </div>
  `,document.getElementById("logout-btn").addEventListener("click",async()=>{await fetch("/logout",{method:"POST"}),window.location.href="/login.html"}),document.getElementById("toggle-form-btn").addEventListener("click",()=>{o=!o,d()}),document.getElementById("submit-btn")?.addEventListener("click",async()=>{const t=i.name,e=document.getElementById("form-title").value.trim(),r=document.getElementById("form-content").value.trim(),n=document.getElementById("form-error");if(!e||!r){n.textContent="제목과 내용을 입력해주세요.";return}try{await y({writer:t,title:e,content:r}),o=!1,a=0,d()}catch{n.textContent="게시글 등록에 실패했습니다."}});const l=document.getElementById("board-body");s.content.forEach(t=>{const e=document.createElement("tr");e.innerHTML=`
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${t.id}</td>
      <td style="padding:0.75rem; border:1px solid #ddd;">
        <a href="/detail.html?id=${t.id}" style="color:#4f46e5; text-decoration:none;">${t.title}</a>
      </td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${t.writer}</td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${t.createdAt}</td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">
        <button class="edit-btn" data-id="${t.id}" style="margin-right:0.5rem;">수정</button>
        <button class="delete-btn" data-id="${t.id}" style="color:red;">삭제</button>
      </td>
    `,l.appendChild(e)}),l.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",async()=>{confirm("정말 삭제하시겠습니까?")&&(await u(Number(t.dataset.id)),d())})}),l.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",()=>{const e=Number(t.dataset.id),r=t.closest("tr"),n=r.cells[1],m=n.querySelector("a")?.textContent??"";n.innerHTML=`<input class="edit-title" value="${m}" style="width:100%;" />`,t.textContent="저장",t.onclick=async()=>{const p=r.querySelector(".edit-title").value;await f(e,{title:p,content:"",writer:i.name}),d()}})});const c=document.getElementById("pagination");for(let t=0;t<s.totalPages;t++){const e=document.createElement("button");e.textContent=String(t+1),e.style.margin="0 0.25rem",t===a&&(e.style.fontWeight="bold"),e.addEventListener("click",()=>{a=t,d()}),c.appendChild(e)}}x();
