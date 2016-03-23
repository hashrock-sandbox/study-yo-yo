var yo = require('yo-yo')

var state = {
    numbers: [
        {name: "Test", completed: true},
        {name: "Test", completed: false},
        {name: "Test", completed: false}
    ],
    todoInput: ""
}

function itemView(item, onClickItem, clickRemove){
    var styles = item.completed ? "completed todoitem" : "todoitem";
    return yo`<div class=${styles} onclick=${onClickItem}>
        <div class="todoitem__label">${item.name}</div>
    <button onclick=${clickRemove}>del</button></div>`;
}

function listView(state, handlers) {
    var itemsView = state.numbers.map(function(item, idx){
        var clickRemove = function(e){
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

var handlers = {
    onSubmit: function(e){
        e.preventDefault();
        if(state.todoInput.length > 0){
            handlers.onAddItem();
        }
    },
    onAddItem: function(){
        state.numbers.push({
            name: state.todoInput,
            completed: false
        })
        state.todoInput = "";
        update();
    },
    onRemoveItem: function(idx){
        state.numbers.splice(idx, 1);
        update();
    },
    onTextInput: function(e){
        state.todoInput = e.target.value;
        update();
    },
    onCompleted: function(idx){
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