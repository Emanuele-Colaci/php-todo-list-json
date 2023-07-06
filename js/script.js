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
            }).then((respose) => {
                this.todoItem.text = '';
                this.todoList = respose.data
            });
        },
        toggleTaskStatus(index){
            this.todoList[index].done = !this.todoList[index].done;
        },
        removeTask(index){
            const removedItem = this.todoList[index];
            this.todoList.splice(index, 1);
            // Invia una richiesta al server per aggiornare la lista sul lato server
            axios.post(this.apiUrl, removedItem, {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                this.todoList = response.data;
            });
        }
    },
}).mount('#app')