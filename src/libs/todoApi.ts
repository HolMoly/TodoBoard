import { Todo } from '@/types/todo';

const API_BASE_URL = '/api'; // API 기본 URL (필요에 따라 환경변수로 관리 가능)

/**
 * 모든 할 일 목록을 API로부터 가져옵니다.
 */
export async function fetchAllTodosFromApi(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);

    if (!response.ok) {
      // 서버에서 보낸 에러 메시지가 있다면 사용, 없다면 일반 메시지
      const errorData = await response.json().catch(() => null); // 에러 응답이 JSON이 아닐 수도 있음
      const errorMessage =
        errorData?.details ||
        errorData?.error ||
        `API call failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // 날짜 필드를 Date 객체로 변환 (선택 사항, 필요에 따라 수행)
    return data.map((todo: any) => ({
      ...todo,
      // createdAt: new Date(todo.createdAt),
      // updatedAt: new Date(todo.updatedAt),
      // dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
    }));
  } catch (error) {
    console.error('Error in fetchAllTodosFromApi:', error);
    // 여기서 에러를 다시 throw하여 호출하는 쪽(예: Store)에서 처리할 수 있도록 함
    // 또는 앱의 에러 처리 정책에 따라 다르게 처리 (예: 기본값 반환, 특정 에러 객체 반환)
    throw error;
  }
}

// 다른 API 호출 함수들 (예: createTodo, updateTodo, deleteTodo)도 여기에 추가할 수 있습니다.
