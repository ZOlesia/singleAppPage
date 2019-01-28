
$(document).ready(function(){
    $.getJSON("api/todos")
    .then(displayTodos);

    $('#todoInput').keypress(function(event){
        if(event.which === 13){
            createTodo();
        }
    })

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e){ //add event listener to a ul(class list), but particullary to the span (when only the span is clicked not the whole ul)
        e.stopPropagation(); //will not consider li click events/ will stop bubbling up events
        removeTodo($(this).parent()); //this.parent - this is how to get the specific one todo that we clicked 
    })
});


function displayTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+ todo.name +'<span>X</span></li>');
    newTodo.data('id', todo._id); //will save each todo ids to the jquery memory, so that we can trigger todos (delete spicific one, update specific one)
    newTodo.data('completed', todo.completed);
    if(todo.completed) newTodo.addClass("done");
    $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('api/todos', {name: userInput})
    .then(function(newTodo){
        if($('#todoInput').val() !== ""){
            var userInput = $('#todoInput').val("");
            addTodo(newTodo);
        }
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId = todo.data('id'); 
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + clickedId
    })
    .then(function(data){
        todo.remove(); //will remove entire li
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var clicked = todo.data('id');
    var isDone = !todo.data('completed');
    $.ajax({
        method: 'PUT',
        url: 'api/todos/' + clicked,
        data: {completed: isDone}
    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
}