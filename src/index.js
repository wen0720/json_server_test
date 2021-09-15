import {
  createApp, ref, computed, onMounted,
} from 'vue/dist/vue.esm-bundler';
import axios from 'axios';

// setUp 在 data, computed, methods 之前

// eslint-disable-next-line no-unused-vars
const app = createApp({
  setup(props) {
    const defaultItem = { text: '' };
    const todoList = ref([]);
    const newTodoText = ref('');
    const todoListLength = computed(() => todoList.value.length);
    const getUserTodos = () => axios.get('/api/todos').then((res) => {
      const { data } = res.data;
      todoList.value = data;
    });
    const postNewTodo = (data) => axios.post('/api/todos', data);
    const putTodo = (data) => axios.put(`/api/todos/${data.id}`, data);
    const deleteTodo = (id) => axios.delete(`/api/todos/${id}`);

    const saveTodoItem = (todoText, todoIdx) => {
      if (todoText === '') {
        return;
      }
      if (todoIdx === -1) {
        // 新增
        postNewTodo({ text: todoText }).then(() => {
          newTodoText.value = '';
          getUserTodos();
        });
      } else {
        putTodo({ text: todoText, id: todoIdx }).then(() => {
          getUserTodos();
        });
      }
    };
    const deleteTodoItem = (todoIdx) => {
      deleteTodo(todoIdx).then(() => {
        getUserTodos();
      });
    };

    onMounted(getUserTodos);

    return {
      newTodoText,
      todoList,
      todoListLength,
      saveTodoItem,
      deleteTodoItem,
      getUserTodos,
    };
  },
}).mount('#app');
