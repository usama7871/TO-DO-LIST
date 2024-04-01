"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.history = [];
    }
    TodoList.prototype.addTask = function () {
        var task = readlineSync.question("Enter task: ");
        var time = readlineSync.question("Enter time to perform the task: ");
        var id = this.todos.length + 1;
        var newTodo = { id: id, task: task, time: time };
        this.todos.push(newTodo);
        this.history.push("Task \"".concat(task, "\" added at ").concat(new Date().toLocaleString()));
        console.log("Task \"".concat(task, "\" added successfully."));
    };
    TodoList.prototype.deleteTask = function (id) {
        var deletedTask = this.todos.find(function (todo) { return todo.id === id; });
        if (deletedTask) {
            this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
            this.history.push("Task \"".concat(deletedTask.task, "\" deleted at ").concat(new Date().toLocaleString()));
            console.log("Task \"".concat(deletedTask.task, "\" deleted successfully."));
        }
        else {
            console.log("Task not found.");
        }
    };
    TodoList.prototype.displayTasks = function () {
        console.log("To-Do List:");
        if (this.todos.length === 0) {
            console.log("No tasks available.");
        }
        else {
            this.todos.forEach(function (todo) { return console.log("[".concat(todo.id, "] ").concat(todo.task, " - Time: ").concat(todo.time)); });
        }
    };
    TodoList.prototype.displayHistory = function () {
        console.log("History:");
        this.history.forEach(function (entry) { return console.log(entry); });
    };
    return TodoList;
}());
var todoList = new TodoList();
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
    var choice = getUserInput();
    switch (choice) {
        case 1:
            todoList.addTask();
            break;
        case 2:
            var taskId = parseInt(readlineSync.question("Enter task ID to delete: "));
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
