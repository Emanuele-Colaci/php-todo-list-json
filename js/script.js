const { createApp } = Vue;

createApp({
    data(){
        return{
            todoList: '',
            apiUrl: 'server.php',
            todoItem: ''
        }
    },
    mounted(){
        axios.get(this.apiUrl).then((response) => {
            this.todoList = response.data;
        });
    },
    methods:{
        list(){
            const data = {
                todoList: this.todoItem
            }

            axios.post(this.apiUrl, data, {

            }).then((respose) => {
                this.todoItem = '';
                this.todoList = respose.data
            });
        }
    },
}).mount('#app')