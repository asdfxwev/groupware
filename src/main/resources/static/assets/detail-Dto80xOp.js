import"./modulepreload-polyfill-B5Qt9EMX.js";import{b as m,f as c,d as p}from"./user-Al2Opv9A.js";const s=e=>`/board/${e}/comments`;async function u(e){const o=await fetch(s(e));if(!o.ok)throw new Error("댓글 조회 실패");return o.json()}async function l(e,o){const i=await fetch(s(e),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})});if(!i.ok)throw new Error("댓글 작성 실패");return i.json()}async function y(e,o){if(!(await fetch(`${s(e)}/${o}`,{method:"DELETE"})).ok)throw new Error("댓글 삭제 실패")}const a=document.getElementById("app"),d=Number(new URLSearchParams(window.location.search).get("id"));d?b():a.innerHTML='<p style="text-align:center; margin-top:2rem;">잘못된 접근입니다.</p>';async function b(){try{const[e,o]=await Promise.all([m(d),c()]);a.innerHTML=`
      <div style="max-width:800px; margin:2rem auto; padding:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:#f8f8f8; border-radius:8px;">
          <a href="/board.html" style="color:#4f46e5; text-decoration:none;">← 목록으로</a>
          <div style="display:flex; align-items:center; gap:1rem;">
            <span style="color:#555;">${o.name} 님</span>
            <button id="logout-btn" style="padding:0.4rem 0.9rem; background:white; border:1px solid #ccc; border-radius:4px; cursor:pointer;">로그아웃</button>
          </div>
        </div>
        <h2 id="title-text" style="margin-bottom:0.5rem;">${e.title}</h2>
        <div style="color:#888; font-size:0.9rem; margin-bottom:1.5rem; display:flex; gap:1.5rem;">
          <span>작성자: ${e.writer}</span>
          <span>조회수: ${e.viewCount}</span>
          <span>작성일: ${e.createdAt}</span>
        </div>
        <hr style="margin-bottom:1.5rem;" />
        <div id="content-text" style="min-height:200px; line-height:1.7; white-space:pre-wrap;">${e.content}</div>
        <hr style="margin-top:2rem; margin-bottom:1rem;" />
        <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
          <button id="edit-btn" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">수정</button>
          <button id="delete-btn" style="padding:0.5rem 1rem; background:white; color:red; border:1px solid red; border-radius:4px; cursor:pointer;">삭제</button>
        </div>
        <div id="edit-form" style="display:none; margin-top:1rem;">

          <div style="margin-bottom:0.75rem;">
            <label>제목<br/>
              <input id="edit-title" type="text" value="${e.title}" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
            </label>
          </div>
          <div style="margin-bottom:1rem;">
            <label>내용<br/>
              <textarea id="edit-content" rows="8" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;">${e.content}</textarea>
            </label>
          </div>
          <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
            <button id="save-btn" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">저장</button>
            <button id="cancel-btn" style="padding:0.5rem 1rem; background:#eee; border:none; border-radius:4px; cursor:pointer;">취소</button>
          </div>
        </div>

        <div style="margin-top:2rem;">
          <h3>댓글</h3>
          <div id="comment-list" style="margin-bottom:1rem;"></div>
          <div style="display:flex; gap:0.5rem;">
            <input id="comment-input" type="text" placeholder="댓글을 입력하세요"
              style="flex:1; padding:0.5rem; border:1px solid #ddd; border-radius:4px;" />
            <button id="comment-submit" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">등록</button>
          </div>
        </div>
      </div>
    `,document.getElementById("logout-btn").addEventListener("click",async()=>{await fetch("/logout",{method:"POST"}),window.location.href="/login.html"}),document.getElementById("edit-btn").addEventListener("click",()=>{document.getElementById("edit-form").style.display="block",document.getElementById("edit-btn").style.display="none"}),document.getElementById("cancel-btn").addEventListener("click",()=>{document.getElementById("edit-form").style.display="none",document.getElementById("edit-btn").style.display="inline-block"}),document.getElementById("save-btn").addEventListener("click",async()=>{const n=document.getElementById("edit-title").value.trim(),r=document.getElementById("edit-content").value.trim();if(!n)return alert("제목을 입력해주세요.");(await fetch(`/board/${d}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,content:r,writer:e.writer})})).ok?window.location.reload():alert("수정에 실패했습니다.")}),document.getElementById("delete-btn").addEventListener("click",async()=>{confirm("정말 삭제하시겠습니까?")&&(await p(d),window.location.href="/board.html")});async function i(){const n=await u(d),r=document.getElementById("comment-list");if(n.length===0){r.innerHTML='<p style="color:#aaa; font-size:0.9rem;">댓글이 없습니다.</p>';return}r.innerHTML=n.map(t=>`
        <div style="padding:0.75rem; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span style="font-weight:bold; font-size:0.9rem;">${t.writer}</span>
            <span style="color:#aaa; font-size:0.8rem; margin-left:0.5rem;">${t.createdAt}</span>
            <p style="margin:0.25rem 0 0; font-size:0.95rem;">${t.content}</p>
          </div>
          ${t.writer===o.name?`<button class="comment-del-btn" data-id="${t.id}" style="color:red; background:none; border:none; cursor:pointer; font-size:0.85rem;">삭제</button>`:""}
        </div>
      `).join(""),r.querySelectorAll(".comment-del-btn").forEach(t=>{t.addEventListener("click",async()=>{confirm("댓글을 삭제하시겠습니까?")&&(await y(d,Number(t.dataset.id)),i())})})}document.getElementById("comment-submit").addEventListener("click",async()=>{const n=document.getElementById("comment-input"),r=n.value.trim();r&&(await l(d,r),n.value="",i())}),document.getElementById("comment-input").addEventListener("keydown",async n=>{if(n.key!=="Enter")return;const r=n.target,t=r.value.trim();t&&(await l(d,t),r.value="",i())}),i()}catch{a.innerHTML='<p style="text-align:center; margin-top:2rem; color:red;">게시글을 불러오지 못했습니다.</p>'}}
