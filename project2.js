const readline = require("readline");

function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

Task.prototype.markAsDone = function () {
  this.completed = true;
};

Task.prototype.print = function () {
  const status = this.completed ? "✓" : "X";
  console.log(
    `[${status}] ${this.description} (Due: ${this.dueDate}, Priority: ${this.priority})`
  );
};

const tasks = [];

function printTasks() {
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("Tasks:");
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. `);
      task.print();
    });
  }
}

function addTask() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter task description: ", (description) => {
    rl.question("Enter due date: ", (dueDate) => {
      rl.question("Enter priority: ", (priority) => {
        const task = new Task(description, dueDate, priority);
        tasks.push(task);
        console.log("Task added successfully.");
        rl.close();
        printTasks();
        showMenu();
      });
    });
  });
}

function markTaskAsDone() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printTasks();
  rl.question("Enter the number of the task to mark as done: ", (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks[taskIndex].markAsDone();
      console.log("Task marked as done.");
    } else {
      console.log("Invalid task number.");
    }
    rl.close();
    printTasks();
    showMenu();
  });
}

function deleteTask() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printTasks();
  rl.question("Enter the number of the task to delete: ", (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks.splice(taskIndex, 1);
      console.log("Task deleted successfully.");
    } else {
      console.log("Invalid task number.");
    }
    rl.close();
    printTasks();
    showMenu();
  });
}

function filterCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  console.log("Completed Tasks:");
  if (completedTasks.length === 0) {
    console.log("No completed tasks found.");
  }
  completedTasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.description} (Due: ${task.dueDate}, Priority: ${
        task.priority
      })`
    );
  });
}

function filterIncompletedTasks() {
  const incompletedTasks = tasks.filter((task) => !task.completed);
  console.log("Incompleted Tasks:");
  if (incompletedTasks.length === 0) {
    console.log("No incompleted tasks found.");
  }
  incompletedTasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.description} (Due: ${task.dueDate}, Priority: ${
        task.priority
      })`
    );
  });
}

function sortTasksByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  console.log("Tasks sorted by due date:");
  printTasks();
}

function sortTasksByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
  console.log("Tasks sorted by priority:");
  printTasks();
}

function clearAllTasks() {
  tasks.length = 0;
  console.log("All tasks cleared.");
}

function showMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("***************************");
  console.log("Welcome to JS TODO-APP");
  console.log("***************************");
  console.log("1. Add a new task");
  console.log("2. List all tasks");
  console.log("3. List completed tasks");
  console.log("4. Mark the task as done.");
  console.log("5. Delete a task.");
  console.log("6. Sort tasks by due date.");
  console.log("7. Sort tasks by priority.");
  console.log("8. Clear all tasks.");
  console.log("9. Exit.");
  console.log("b1. List incompleted tasks");
  console.log("***************************");

  rl.question("What's your choice: ", (choice) => {
    switch (choice) {
      case "1":
        rl.close();
        addTask();
        break;
      case "2":
        rl.close();
        printTasks();
        showMenu();
        break;
      case "3":
        rl.close();
        filterCompletedTasks();
        showMenu();
        break;
      case "4":
        rl.close();
        markTaskAsDone();
        break;
      case "5":
        rl.close();
        deleteTask();
        break;
      case "6":
        rl.close();
        sortTasksByDueDate();
        showMenu();
        break;
      case "7":
        rl.close();
        sortTasksByPriority();
        showMenu();

        break;
      case "8":
        rl.close();
        clearAllTasks();
        showMenu();
        break;
      case "9":
        rl.close();
        break;
      case "b1":
        rl.close();
        filterIncompletedTasks();
        showMenu();
        break;
      default:
        console.log("Invalid choice.");
        rl.close();
        showMenu();
        break;
    }
  });
}

showMenu();
