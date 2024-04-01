import * as readlineSync from 'readline-sync';

interface Todo {
  id: number;
  task: string;
  time: string;
}

class TodoList {
  todos: Todo[] = [];
  history: string[] = [];

  constructor() {}

  addTask() {
    const task = readlineSync.question("Enter task: ");
    const time = readlineSync.question("Enter time to perform the task: ");
    const id = this.todos.length + 1;
    const newTodo: Todo = { id, task, time };
    this.todos.push(newTodo);
    this.history.push(`Task "${task}" added at ${new Date().toLocaleString()}`);
    console.log(`Task "${task}" added successfully.`);
  }

  deleteTask(id: number) {
    const deletedTask = this.todos.find(todo => todo.id === id);
    if (deletedTask) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.history.push(`Task "${deletedTask.task}" deleted at ${new Date().toLocaleString()}`);
      console.log(`Task "${deletedTask.task}" deleted successfully.`);
    } else {
      console.log("Task not found.");
    }
  }

  displayTasks() {
    console.log("To-Do List:");
    if (this.todos.length === 0) {
      console.log("No tasks available.");
    } else {
      this.todos.forEach(todo => console.log(`[${todo.id}] ${todo.task} - Time: ${todo.time}`));
    }
  }

  displayHistory() {
    console.log("History:");
    this.history.forEach(entry => console.log(entry));
  }
}

const todoList = new TodoList();

function showMenu() {
  console.log("\n1. Add Task");
  console.log("2. Delete Task");
  console.log("3. Display Tasks");
  console.log("4. Display History");
  console.log("5. Exit");
}

function getUserInput() {
  return parseInt(readlineSync.question("Enter your choice: "));
}

while (true) {
  showMenu();
  const choice = getUserInput();

  switch (choice) {
    case 1:
      todoList.addTask();
      break;
    case 2:
      const taskId = parseInt(readlineSync.question("Enter task ID to delete: "));
      todoList.deleteTask(taskId);
      break;
    case 3:
      todoList.displayTasks();
      break;
    case 4:
      todoList.displayHistory();
      break;
    case 5:
      console.log("Exiting...");
      process.exit(0);
    default:
      console.log("Invalid choice. Please enter a number between 1 and 5.");
  }
}
