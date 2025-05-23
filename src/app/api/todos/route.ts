import { createClient } from '@/libs/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = await createClient(); // 서버 클라이언트 사용

  try {
    const { data, error } = await supabase
      .from('todo')
      .select('*')
      .order('priority', { ascending: true }) // priority 먼저 정렬
      .order('order', { ascending: true }); // 그 다음 order로 정렬

    if (error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json(
        { error: 'Failed to fetch todos', details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('Unexpected error in GET /api/todos:', e);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

// POST, PUT, DELETE 핸들러도 필요에 따라 추가할 수 있습니다.
// 예시:
// export async function POST(request: Request) {
//   // ... 데이터 생성 로직 ...
// }
