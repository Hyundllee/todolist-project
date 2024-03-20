(() => {
    const todoSearchElem = document.querySelector('.todoSearch');
    const todoListElem = document.querySelector('.todoList'); 
    const completeAllBtn = document.querySelector('.Allbtn'); 

    let todos = []; 
    let id = 0; 

    let setTodos = (newTodos) => {
        todos = newTodos;
    }
    

    const appendTodos = (Text) => {
        const newId = id++;
        const newTodos = [...todos , {id : newId , isCompleted: false, content: Text}]; 
        setTodos(newTodos);
        checkIsAllCompleted();
        setLeftItems();
        paintTodos();
    }

    const deleteTodo = (todoId) => {
        const newTodos = todos.filter(todo => todo.id !== todoId); 
        setTodos(newTodos);
        setLeftItems();
        paintTodos(); 
    }

    const complete = (todoId) => {
        const newTodos = todos.map(todo =>  todo.id === todoId ? {...todo , isCompleted: !todo.isCompleted} : todo )
        // id 가 일치하면 map함수의 todo 객체를 불러모아 id가 일치한 객체 안의 isCompleted : isCompleted를 반전시킴 
        setTodos(newTodos);
        setLeftItems();
        checkIsAllCompleted();
        paintTodos(); 
        console.log('hi');
    } 


    const updateTodo = (text, todoId) => {
        const newTodos = todos.map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
        setTodos(newTodos);
        paintTodos();
    }


    const editTodo = (e , todoId) =>  {
        const todoElem = e.target;
        const todoItemElem = todoElem.parentNode;

        const inputElem = document.createElement('input');
        const inputText = e.target.innerText;
        inputElem.value = inputText;
        inputElem.classList.add('edit-input');
    
        inputElem.addEventListener('keypress', (e)=>{

            if(e.key === 'Enter') {
                updateTodo(e.target.value, todoId); // todo 수정
                document.body.removeEventListener('click', onClickBody );
            }
        });


        const onClickBody = (e) => {
            if (e.target !== inputElem) {
                todoItemElem.removeChild(inputElem);
                document.body.removeEventListener('click', onClickBody); 

            }
        }

        document.body.addEventListener('click', onClickBody);
        todoItemElem.appendChild(inputElem);
    }

    //전체완료 함수
    let isAllCompleted = false;

    const getCompletedTodos = () => {
        return todos.filter(todo => todo.isCompleted === true );
    }

    const setIsAllCompleted = (bool) => { isAllCompleted = bool};

    const complateAll = () => {
        completeAllBtn.classList.add('checked'); 
        const newTodos = todos.map(todo => ({...todo, isCompleted: true })); 
        setTodos(newTodos); 
    }

    const incompleteAll = () => {
        completeAllBtn.classList.remove('checked'); 
        const newTodos = todos.map(todo => ({...todo, isCompleted: false })); 
        setTodos(newTodos); 
    }
    
    const checkIsAllCompleted = () => {
        if (todos.length === getCompletedTodos().length) {
            setIsAllCompleted(true); 
            completeAllBtn.classList.add('checked');
        } else {
            setIsAllCompleted(false); 
            completeAllBtn.classList.remove('checked');
        }
    }


    const onAllcomplete = () => {
        if (!todos.length) return;
        if (isAllCompleted) incompleteAll();
        else complateAll();
        setIsAllCompleted(!isAllCompleted); 
        paintTodos(); 
        setLeftItems();
    }


    //남은 할 일 개수 표시 
    const leftItemsElem = document.querySelector('.itemsCount'); 

    const getActiveTodos = () => {
        return todos.filter(todo => todo.isCompleted === false);
    }

    const setLeftItems = () => {
        const leftTodos = getActiveTodos() 
        leftItemsElem.innerHTML = `${leftTodos.length} items left`
    }


    const paintTodos = () => {
        todoListElem.innerHTML = ''; 
        const allTodos = todos;
        console.log(allTodos); 

        allTodos.forEach(todo => {
            const todoItem = document.createElement('li'); 
            todoItem.classList.add('todoItem'); 

            const checkBtn = document.createElement('button'); 
            checkBtn.classList.add('checkBtn');
            checkBtn.addEventListener('click', () => complete(todo.id));

            const todoElem = document.createElement('div'); 
            todoElem.classList.add('todo');
            todoElem.innerText = todo.content;
            todoElem.addEventListener('dblclick', (event) => editTodo(event , todo.id) ) 

            const delBtn = document.createElement('button'); 
            delBtn.classList.add('delBtn');
            delBtn.addEventListener('click', () => deleteTodo(todo.id));
            delBtn.innerText = 'X'; 

            if (todo.isCompleted) {
                todoItem.classList.add('checked'); 
            }

            todoItem.appendChild(checkBtn);
            todoItem.appendChild(todoElem);
            todoItem.appendChild(delBtn);


            todoListElem.appendChild(todoItem);


        });

    }



    const init = () => {
        todoSearchElem.addEventListener('keypress', (e) => {
            if ( e.key === 'Enter') {
                appendTodos(e.target.value); todoSearchElem.value = '';             
            }
        });
        console.log('hi');
    }

    completeAllBtn.addEventListener('click', onAllcomplete);

    init(); 



})();