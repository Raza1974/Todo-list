#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];

async function createTodo() {
    let ans = await inquirer.prompt({
        type: "list",
        message: "Select an operation",
        name: "select",
        choices: ["Add", "Update", "View", "Delete"],
    });

    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            type: "input",
            message: "Add items to the list",
            name: "todo",
        });
        todos.push(addTodo.todo);
        console.log("Todo added:", addTodo.todo);
    } else if (ans.select === "Update") {
        let updateTodo = await inquirer.prompt({
            type: "list",
            message: "Choose item to update",
            name: "todo",
            choices: todos,
        });
        let newTodo = await inquirer.prompt({
            type: "input",
            message: "Enter the updated item",
            name: "todo",
        });
        todos = todos.map(item => (item === updateTodo.todo ? newTodo.todo : item));
        console.log("Todo updated:", updateTodo.todo, "->", newTodo.todo);
    }

    createTodo(); // Call the function to start the process again
}

createTodo(); // Initial call to start the process
