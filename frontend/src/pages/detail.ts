import { fetchBoard, deleteBoard } from '../api/board'
import { fetchMe } from '../api/user'
import { fetchComments, createComment, deleteComment } from '../api/comment'

const app = document.getElementById('app')!
const id = Number(new URLSearchParams(window.location.search).get('id'))

if (!id) {
  app.innerHTML = '<p style="text-align:center; margin-top:2rem;">잘못된 접근입니다.</p>'
} else {
  load()
}

async function load() {
  try {
    const [board, me] = await Promise.all([fetchBoard(id), fetchMe()])

    app.innerHTML = `
      <div style="max-width:800px; margin:2rem auto; padding:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:#f8f8f8; border-radius:8px;">
          <a href="/board.html" style="color:#4f46e5; text-decoration:none;">← 목록으로</a>
          <div style="display:flex; align-items:center; gap:1rem;">
            <span style="color:#555;">${me.name} 님</span>
            <button id="logout-btn" style="padding:0.4rem 0.9rem; background:white; border:1px solid #ccc; border-radius:4px; cursor:pointer;">로그아웃</button>
          </div>
        </div>
        <h2 id="title-text" style="margin-bottom:0.5rem;">${board.title}</h2>
        <div style="color:#888; font-size:0.9rem; margin-bottom:1.5rem; display:flex; gap:1.5rem;">
          <span>작성자: ${board.writer}</span>
          <span>조회수: ${board.viewCount}</span>
          <span>작성일: ${board.createdAt}</span>
        </div>
        <hr style="margin-bottom:1.5rem;" />
        <div id="content-text" style="min-height:200px; line-height:1.7; white-space:pre-wrap;">${board.content}</div>
        <hr style="margin-top:2rem; margin-bottom:1rem;" />
        <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
          <button id="edit-btn" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">수정</button>
          <button id="delete-btn" style="padding:0.5rem 1rem; background:white; color:red; border:1px solid red; border-radius:4px; cursor:pointer;">삭제</button>
        </div>
        <div id="edit-form" style="display:none; margin-top:1rem;">

          <div style="margin-bottom:0.75rem;">
            <label>제목<br/>
              <input id="edit-title" type="text" value="${board.title}" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;" />
            </label>
          </div>
          <div style="margin-bottom:1rem;">
            <label>내용<br/>
              <textarea id="edit-content" rows="8" style="width:100%; padding:0.5rem; margin-top:0.25rem; box-sizing:border-box;">${board.content}</textarea>
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
    `

    // 로그아웃
    document.getElementById('logout-btn')!.addEventListener('click', async () => {
      await fetch('/logout', { method: 'POST' })
      window.location.href = '/login.html'
    })

    // 수정 버튼
    document.getElementById('edit-btn')!.addEventListener('click', () => {
      document.getElementById('edit-form')!.style.display = 'block'
      document.getElementById('edit-btn')!.style.display = 'none'
    })

    // 취소 버튼
    document.getElementById('cancel-btn')!.addEventListener('click', () => {
      document.getElementById('edit-form')!.style.display = 'none'
      document.getElementById('edit-btn')!.style.display = 'inline-block'
    })

    // 저장 버튼
    document.getElementById('save-btn')!.addEventListener('click', async () => {
      const title = (document.getElementById('edit-title') as HTMLInputElement).value.trim()
      const content = (document.getElementById('edit-content') as HTMLTextAreaElement).value.trim()
      if (!title) return alert('제목을 입력해주세요.')

      const res = await fetch(`/board/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, writer: board.writer }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        alert('수정에 실패했습니다.')
      }
    })

    // 삭제 버튼
    document.getElementById('delete-btn')!.addEventListener('click', async () => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      await deleteBoard(id)
      window.location.href = '/board.html'
    })

    // 댓글 로드
    async function loadComments() {
      const comments = await fetchComments(id)
      const list = document.getElementById('comment-list')!
      if (comments.length === 0) {
        list.innerHTML = '<p style="color:#aaa; font-size:0.9rem;">댓글이 없습니다.</p>'
        return
      }
      list.innerHTML = comments.map(c => `
        <div style="padding:0.75rem; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span style="font-weight:bold; font-size:0.9rem;">${c.writer}</span>
            <span style="color:#aaa; font-size:0.8rem; margin-left:0.5rem;">${c.createdAt}</span>
            <p style="margin:0.25rem 0 0; font-size:0.95rem;">${c.content}</p>
          </div>
          ${c.writer === me.name
            ? `<button class="comment-del-btn" data-id="${c.id}" style="color:red; background:none; border:none; cursor:pointer; font-size:0.85rem;">삭제</button>`
            : ''}
        </div>
      `).join('')

      list.querySelectorAll<HTMLButtonElement>('.comment-del-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('댓글을 삭제하시겠습니까?')) return
          await deleteComment(id, Number(btn.dataset.id))
          loadComments()
        })
      })
    }

    // 댓글 등록
    document.getElementById('comment-submit')!.addEventListener('click', async () => {
      const input = document.getElementById('comment-input') as HTMLInputElement
      const content = input.value.trim()
      if (!content) return
      await createComment(id, content)
      input.value = ''
      loadComments()
    })

    // 엔터키로 댓글 등록
    document.getElementById('comment-input')!.addEventListener('keydown', async (e) => {
      if (e.key !== 'Enter') return
      const input = e.target as HTMLInputElement
      const content = input.value.trim()
      if (!content) return
      await createComment(id, content)
      input.value = ''
      loadComments()
    })

    loadComments()

  } catch {
    app.innerHTML = '<p style="text-align:center; margin-top:2rem; color:red;">게시글을 불러오지 못했습니다.</p>'
  }
}
