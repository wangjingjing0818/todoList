var vm=new  Vue({
    el:'#app',
    data:{
        todos:[
            {title:'每天都要学习',isChecked:false},
            {title:'明天要学习',isChecked:true},
            {title:'后天要学习',isChecked:true}
        ],
        c:'',
        state:'',
        currentTodo:''
    },
    directives:{//指令 可以用来操作dom
        autoFocus(ele,bindings){
            //ele代表的是input元素
            //bingdings.value 代表的是currentTodo==todo的结果
            if(bindings.value){
                ele.focus();
            }
        }
    },
    methods:{
        changeTitle(todo){
            this.currentTodo=todo;
        },
        addTodo(){
            this.todos.push({title:this.c,isChecked:false});
            this.c='';
        }
        ,
        reset(){
          this.currentTodo="";
        },
        remove(todo){
            this.todos= this.todos.filter(function(item){
                return item!=todo
            })
        }
    },
    computed:{
      sum(){//默认是get
          return this.todos.filter(function(item){
              return !item.isChecked;
          }).length;

      },
        cloneTodo(){
          if(this.state=='complete'){
              return this.todos;
          }
            if(this.state=="finish"){
                return this.todos.filter(function(item){
                    return item.isChecked
                })
            }
          if(this.state=="unfinish"){
              return this.todos.filter(function(item){
                  return !item.isChecked
              })
          }
        }
    },
    mounted(){//页面加载完成后会执行此函数
        //mounted 是vue提供的生命周期的方法，钩子函数，
        this.todos=JSON.parse(localStorage.getItem('todos'))||[];
    },
    watch:{
       todos:{
           handler(){
          localStorage.setItem('todos',JSON.stringify(this.todos))

           },
           deep:true  //深度监控
       },

    }
});
var listener=function(){
    vm.state=window.location.hash.slice(1);

};
listener()
window.addEventListener('hashchange',listener,false)