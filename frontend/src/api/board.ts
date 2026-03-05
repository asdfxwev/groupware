export interface BoardResponse {
  id: number
  title: string
  content: string
  writer: string
  viewCount: number
  createdAt: string
  updatedAt: string | null
}

export interface BoardPage {
  content: BoardResponse[]
  totalPages: number
  totalElements: number
  number: number
}

export interface BoardRequest {
  title: string
  content: string
  writer: string
}

const BASE = '/board'

export async function createBoard(data: BoardRequest): Promise<BoardResponse> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('게시글 작성 실패')
  return res.json()
}

export async function fetchBoard(id: number): Promise<BoardResponse> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error('게시글 조회 실패')
  return res.json()
}

export async function fetchBoards(page = 0, size = 10): Promise<BoardPage> {
  const res = await fetch(`${BASE}?page=${page}&size=${size}`)
  if (!res.ok) throw new Error('게시글 목록 조회 실패')
  return res.json()
}

export async function updateBoard(id: number, data: BoardRequest): Promise<BoardResponse> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('게시글 수정 실패')
  return res.json()
}

export async function deleteBoard(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('게시글 삭제 실패')
}
