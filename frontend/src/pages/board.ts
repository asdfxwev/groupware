import { fetchBoards, deleteBoard, updateBoard, createBoard } from '../api/board'
import { fetchMe } from '../api/user'

const app = document.getElementById('app')!

let currentPage = 0
let showForm = false
let currentUser = { userId: '', name: '' }

async function init() {
  try {
    currentUser = await fetchMe()
  } catch {
    window.location.href = '/login.html'
    return
  }
  render()
}

async function render() {
  const data = await fetchBoards(currentPage)

  app.innerHTML = `
    <div style="max-width:800px; margin:2rem auto; padding:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:#f8f8f8; border-radius:8px;">
        <span style="font-weight:bold;">Groupware</span>
        <div style="display:flex; align-items:center; gap:1rem;">
          <span style="color:#555;">${currentUser.name} 님</span>
          <button id="logout-btn" style="padding:0.4rem 0.9rem; background:white; border:1px solid #ccc; border-radius:4px; cursor:pointer;">로그아웃</button>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2 style="margin:0;">게시판</h2>
        <button id="toggle-form-btn" style="padding:0.5rem 1rem; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">
          ${showForm ? '취소' : '글 작성'}
        </button>
      </div>

      <div id="write-form" style="display:${showForm ? 'block' : 'none'}; border:1px solid #ddd; border-radius:8px; padding:1.5rem; margin-top:1rem; margin-bottom:1.5rem; background:#fafafa;">
        <h3 style="margin-top:0;">새 게시글 작성</h3>
        <div style="margin-bottom:0.75rem;">
          <label>작성자<br/>
            <input id="form-writer" type="text" value="${currentUser.name}" readonly
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
  `

  // 로그아웃
  document.getElementById('logout-btn')!.addEventListener('click', async () => {
    await fetch('/logout', { method: 'POST' })
    window.location.href = '/login.html'
  })

  // 글 작성 폼 토글
  document.getElementById('toggle-form-btn')!.addEventListener('click', () => {
    showForm = !showForm
    render()
  })

  // 글 등록
  document.getElementById('submit-btn')?.addEventListener('click', async () => {
    const writer = currentUser.name
    const title = (document.getElementById('form-title') as HTMLInputElement).value.trim()
    const content = (document.getElementById('form-content') as HTMLTextAreaElement).value.trim()
    const errorEl = document.getElementById('form-error')!

    if (!title || !content) {
      errorEl.textContent = '제목과 내용을 입력해주세요.'
      return
    }

    try {
      await createBoard({ writer, title, content })
      showForm = false
      currentPage = 0
      render()
    } catch {
      errorEl.textContent = '게시글 등록에 실패했습니다.'
    }
  })

  // 목록 렌더링
  const tbody = document.getElementById('board-body')!
  data.content.forEach((board) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${board.id}</td>
      <td style="padding:0.75rem; border:1px solid #ddd;">
        <a href="/detail.html?id=${board.id}" style="color:#4f46e5; text-decoration:none;">${board.title}</a>
      </td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${board.writer}</td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">${board.createdAt}</td>
      <td style="padding:0.75rem; border:1px solid #ddd; text-align:center;">
        <button class="edit-btn" data-id="${board.id}" style="margin-right:0.5rem;">수정</button>
        <button class="delete-btn" data-id="${board.id}" style="color:red;">삭제</button>
      </td>
    `
    tbody.appendChild(tr)
  })

  // 삭제
  tbody.querySelectorAll<HTMLButtonElement>('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      await deleteBoard(Number(btn.dataset.id))
      render()
    })
  })

  // 수정
  tbody.querySelectorAll<HTMLButtonElement>('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id)
      const row = btn.closest('tr')!
      const titleCell = row.cells[1]
      const oldTitle = titleCell.querySelector('a')?.textContent ?? ''

      titleCell.innerHTML = `<input class="edit-title" value="${oldTitle}" style="width:100%;" />`
      btn.textContent = '저장'
      btn.onclick = async () => {
        const newTitle = (row.querySelector('.edit-title') as HTMLInputElement).value
        await updateBoard(id, { title: newTitle, content: '', writer: currentUser.name })
        render()
      }
    })
  })

  // 페이지네이션
  const pagination = document.getElementById('pagination')!
  for (let i = 0; i < data.totalPages; i++) {
    const pageBtn = document.createElement('button')
    pageBtn.textContent = String(i + 1)
    pageBtn.style.margin = '0 0.25rem'
    if (i === currentPage) pageBtn.style.fontWeight = 'bold'
    pageBtn.addEventListener('click', () => {
      currentPage = i
      render()
    })
    pagination.appendChild(pageBtn)
  }
}

init()
