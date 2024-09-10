<template>
    <div class="vl-parent">
        <loading v-model:active="carregando"
                 :can-cancel="false"
                 :is-full-page="true"/>

    <nav class="py-8 px-10 text-white flex justify-between bg-green-500">
        <h1 class="text-white text-xl font-bold">Suas playlists ▶️</h1>
        <div>
            <span>{{ usuarioLogado.nome }}👤</span>
            <button class="ml-5" @click="logout">Sair</button>
        </div>
    </nav>

    <section class="playlists mt-10">
        <div class="text-white py-8 px-10 flex justify-evenly font-bold">
            <p class="w-40">Nome</p>
            <p class="w-40">Pública</p>
            <p class="w-40">Colaborativa</p>
            <p class="w-40">Criador</p>
        </div>
        <div class="text-white py-8 px-10 flex justify-evenly" v-for="item in playlists" :key="item.id"> 
            <p class="w-40">{{ item.name }}</p>
            <p class="w-40">{{ item.public ? "Sim" : "Nao" }}</p>
            <p class="w-40">{{ item.collaborative ? "Sim" : "Nao" }}</p>
            <p class="w-40">{{ item.owner.display_name}}</p>


        </div>
    </section>


   <footer class="py-7 px-10 text-white text-center mt-10 bg-zinc-900">
    <span>Aplicação desenvolvida durante o Vida de Programador. 🎵🎧👩‍💻💚</span>
   </footer>
</div>
</template>

<script>
import Spotifyapi from "./../api/SpotifyAPI";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default{
    components: {
        Loading
    },
    data : () =>{
        return{
            usuarioLogado: {},
            playlists : []
        }
    },
    methods: {
        logout(){
            this.$router.push("/")

        }
    },
    async mounted(){
        let params = new URLSearchParams(document.location.search)
        let code = params.get("code")

        //obtendo o access token
        await Spotifyapi.getToken(code);

        //obter o ID do user
       this.usuarioLogado = await Spotifyapi.getUsuario();

        //obter playlist do user
        this.playlists = await Spotifyapi.getPlaylists();

        this.carregando = false

    }
}
</script>