/// <reference path="./typings/bundle.d.ts" />

var yo = require('yo-yo');

class Todo{
    constructor(public name: string, public completed: boolean){}
}

class MyState{
    numbers: Todo[] = [];
    todoInput: string = "";
}

var state: MyState = new MyState();

state.numbers.push(new Todo("Test1", true));
state.numbers.push(new Todo("Test2", true));
state.numbers.push(new Todo("Test3", true));
state.numbers.push(new Todo("Test4", true));
state.numbers.push(new Todo("Test5", false));

function itemView(item: Todo, onClickItem: any, clickRemove: MouseEventHandler){
    var styles = item.completed ? "completed todoitem" : "todoitem";
    return yo`<div class=${styles} onclick=${onClickItem}>
        <div class="todoitem__label">${item.name}</div>
    <button onclick=${clickRemove}>del</button></div>`;
}

interface MouseEventHandler{
    (e: MouseEvent): void;
}

function listView(state: MyState, handlers: any) {
    var itemsView = state.numbers.map(function(item, idx){
        var clickRemove:MouseEventHandler = function(e: MouseEvent){
            e.stopPropagation();
            handlers.onRemoveItem(idx);
        }
        var onClickItem = function(){
            handlers.onCompleted(idx);
        }
        return itemView(item, onClickItem, clickRemove);
    })
    return yo`
    <div>
        <p>Todo</p>
        <div class="todolist">
            ${itemsView}
        </div>
        <form onsubmit=${handlers.onSubmit}>
        <input onkeyup=${handlers.onTextInput} value=${state.todoInput} />
        </form>
        <button onclick=${handlers.onAddItem} disabled=${state.todoInput.length === 0}>Add TODO</button>
    </div>
  `
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
}

var handlers = {
    onSubmit: function(e: Event){
        e.preventDefault();
        if(state.todoInput.length > 0){
            handlers.onAddItem();
        }
    },
    onAddItem: function(){
        var todo = new Todo(state.todoInput, false);
        state.numbers.push(todo);
        state.todoInput = "";
        update();
    },
    onRemoveItem: function(idx: number){
        state.numbers.splice(idx, 1);
        update();
    },
    onTextInput: function(e: HTMLElementEvent<HTMLInputElement>){
        state.todoInput = e.target.value;
        update();
    },
    onCompleted: function(idx: number){
        state.numbers[idx].completed = !state.numbers[idx].completed;
        update();
    }
}
var el = listView(state, handlers)

function update() {
    var newList = listView(state, handlers)
    yo.update(el, newList)
}

document.body.querySelector("main").appendChild(el)