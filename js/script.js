const { createApp } = Vue;

createApp({
    data(){
        return{
            todoList: [], // Inizializza come un array vuoto
            apiUrl: 'server.php',
            todoItem: {
                text: '',
                done: false
            }
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
                todoItem: {
                    text: this.todoItem.text, // Accedi al campo "text" dell'oggetto todoItem
                    done: false
                }   
            }

            axios.post(this.apiUrl, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                this.todoItem = '';
                this.todoList = response.data.map((item) => {
                    this.todoItem.text = '';
                    return item;
                });
            });
        },
        toggleTaskStatus(index){
            this.todoList[index].done = !this.todoList[index].done;
        },
        removeTask(index){
            const removedIndex = index;
            
            axios.post(this.apiUrl, { action: 'remove', index: removedIndex }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                this.todoList = response.data;
            });
        }
    },
}).mount('#app')