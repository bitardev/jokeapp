const app = Vue.createApp({
    data(){
        return{
            joke: null,
            rankingList: [],
            rank: 1,
            selected: ''
        }
    },
    created(){
        if(window.localStorage.getItem('joke')){
            this.rankingList = JSON.parse(window.localStorage.getItem('joke'));
            console.log("window.localStorage.getItem('joke')")
            console.log(window.localStorage.getItem('joke'))
            console.log(this.rankingList)
        }
    },
    mounted(){
        this.getRandomJoke()
    },
    computed: {
        exclude(){
            return this.selected ? '&blacklistFlags='+this.selected.join(',') : ''
        }
    },
    methods: {
        async getRandomJoke() {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any?format=json&type=single'+this.exclude)
            const joke = await res.json()
            this.joke = joke.joke
            // console.log(joke)
        },
        submitRank(){
            this.rankingList.push({
                joke: this.joke,
                ranking: this.rank
            })
            this.rankingList.sort((a,b) => b.ranking - a.ranking)
            this.rank = 0
            this.getRandomJoke()
            window.localStorage.setItem('joke', JSON.stringify(this.rankingList));
        },
        filterJokes(){
            this.getRandomJoke()
        }
    }
});

app.mount('#app');