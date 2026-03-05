export interface MeResponse {
  userId: string
  name: string
}

export async function fetchMe(): Promise<MeResponse> {
  const res = await fetch('/api/me')
  if (!res.ok) throw new Error('유저 정보 조회 실패')
  return res.json()
}
