export interface CommentResponse {
  id: number
  writer: string
  content: string
  createdAt: string
}

const base = (boardId: number) => `/board/${boardId}/comments`

export async function fetchComments(boardId: number): Promise<CommentResponse[]> {
  const res = await fetch(base(boardId))
  if (!res.ok) throw new Error('댓글 조회 실패')
  return res.json()
}

export async function createComment(boardId: number, content: string): Promise<CommentResponse> {
  const res = await fetch(base(boardId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('댓글 작성 실패')
  return res.json()
}

export async function deleteComment(boardId: number, commentId: number): Promise<void> {
  const res = await fetch(`${base(boardId)}/${commentId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('댓글 삭제 실패')
}
