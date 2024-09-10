<template>
    <section class="w-full md:w-2/5 bg-green-500 absolute left-0 top-0 h-full p-10 md:p-20">
      <h2 class="text-white font-bold text-4xl md:text-7xl mt-20 md:mt-60">Entre e comece a curtir suas músicas favoritas.</h2>
    </section>
      <section class="w-full md:w-2/5 absolute left-0 md:left-1/4 mt-40 md:mt-0 p-5">
        <div class="flex justify-center md:justify-end">
          <img class="w-68 md:w-96" src="./../assets/spotify-logo-png.webp" alt="logo">
        </div>
        <div class="text-center md:text-right mt-5">
          <button @click="login" class="bg-green-500 text-white px-5 py-3 md:px-10 md:py-5 text-lg md:text-xl rounded-full hover:bg-violet-600 active:bg-violet-700">Entrar com Spotify</button>
        </div> 
      </section>
    </template>
    
    <script>
    export default {
      data: () =>{
        return{
          clientID: "aab3b43232e446eda7e56249d28da56d",
          scope: "playlist-read-collaborative playlist-modify-private playlist-read-private playlist-modify-public",
          redirectURI:"http://localhost:5173/playlists"
        }
      },
      methods: {
        login(){
          location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientID}&scope=${this.scope}&redirect_uri=${this.redirectURI}`
        }
      }
    }
    </script>