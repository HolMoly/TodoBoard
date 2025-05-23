import { Todo, PriorityType } from '@/types/todo';
import TodoList from './TodoList';

interface TodoQuadrantProps {
  title: string; // 페이지에서 한글 제목을 받음
  todos: Todo[]; // 페이지에서 필터링된 할 일 목록을 받음
  priority: PriorityType; // 현재 사분면의 우선순위
  className?: string;
}

export default function TodoQuadrant({
  title,
  todos,
  priority,
  className = '',
}: TodoQuadrantProps) {
  // 더 이상 목업 데이터나 자체적인 API 호출 로직이 필요 없음
  // 모든 데이터는 props를 통해 TodoPage로부터 전달받음

  return (
    <div className={`border-2 rounded-lg p-6 min-h-[400px] ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {/* 
          TodoList에는 이제 category 대신 priority를 전달하거나, 
          TodoList 내부에서 priority를 기반으로 추가적인 로직을 처리할 수 있습니다.
          여기서는 TodoList가 받은 todos를 그대로 표시한다고 가정합니다.
          만약 TodoList에서 priority에 따른 특별한 처리가 필요하다면 해당 prop을 추가합니다.
        */}
      <TodoList todos={todos} />
    </div>
  );
}
