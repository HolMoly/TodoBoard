import { create } from 'zustand';
import { Todo, PriorityType } from '@/types/todo';
import { fetchAllTodosFromApi } from '@/libs/todoApi'; // API 호출 함수 임포트

// 스토어 상태의 타입 정의
interface TodoState {
  todos: Todo[]; // 전체 할 일 목록
  isLoading: boolean; // 데이터 로딩 중 상태
  error: Error | null; // 에러 상태

  // 상태를 변경하는 액션 함수들의 타입 정의
  fetchAllTodos: () => Promise<void>; // 모든 할 일을 가져오는 액션
  // 여기에 나중에 필요한 다른 액션들을 추가할 수 있습니다.
  // 예: addTodo, updateTodo, deleteTodo 등

  // 특정 조건에 맞는 할 일들을 선택하는 셀렉터 함수들의 타입 정의 (선택 사항)
  // getTodosByPriority: (priority: PriorityType) => Todo[];
}

// Zustand 스토어 생성
export const useTodoStore = create<TodoState>((set, get) => ({
  // 초기 상태 값
  todos: [],
  isLoading: false,
  error: null,

  // 액션 함수 구현
  fetchAllTodos: async () => {
    set({ isLoading: true, error: null }); // 로딩 시작, 이전 에러 초기화
    try {
      const fetchedTodos = await fetchAllTodosFromApi(); // API 호출
      set({ todos: fetchedTodos, isLoading: false }); // 성공: 데이터 저장, 로딩 종료
    } catch (err) {
      // 실패: 에러 저장, 로딩 종료
      set({
        error: err instanceof Error ? err : new Error('Failed to fetch todos'),
        isLoading: false,
      });
      console.error('Error fetching todos in store:', err);
    }
  },

  // 예시: Priority별로 필터링하는 셀렉터 (필요하다면 사용)
  // getTodosByPriority: (priority: PriorityType) => {
  //   return get().todos.filter(todo => todo.priority === priority);
  // },
}));

// 스토어 사용 예시 (컴포넌트 내부에서):
// const todos = useTodoStore(state => state.todos);
// const isLoading = useTodoStore(state => state.isLoading);
// const fetchAllTodos = useTodoStore(state => state.fetchAllTodos);
// useEffect(() => {
//   fetchAllTodos();
// }, [fetchAllTodos]);
