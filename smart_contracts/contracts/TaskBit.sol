// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskBit {
    struct Todo {
        uint256 id;
        string name;
        bool complete;
    }

    constructor() {
        addTodo("Hi! Welcome to TaskBit. Developed by Sdmrf");
    }

    mapping(uint256 => Todo) public todos;
    uint256 public todoCount;

    event TodoAdded(uint256 id, string name, bool complete);
    event TodoToggled(uint256 id, bool complete);
    event TodoDeleted(uint256 id);

    function addTodo(string memory _name) public {
        todoCount++;
        todos[todoCount] = Todo(todoCount, _name, false);
        emit TodoAdded(todoCount, _name, false);
    }

    function toggleComplete(uint256 _id) public {
        Todo storage todo = todos[_id];
        todo.complete = !todo.complete;
        emit TodoToggled(_id, todo.complete);
    }

    function deleteTodo(uint256 _id) public {
        delete todos[_id];
        emit TodoDeleted(_id);
    }

    function getTodoCount() public view returns (uint256) {
        return todoCount;
    }
}
