export type TaskListAction =
| { type: 'ADD', text: string }
| { type: 'TOGGLE', id: number }
| { type: 'DELETE', id: number };
