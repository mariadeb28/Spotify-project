import axios from "axios"
const clientId = "aab3b43232e446eda7e56249d28da56d"
const clientSecret = "26472e0e86ff4f2b9e3b933696862833"

let accessToken 
let refreshToken
let expiresIn
let tokenExpirado = false

export default class Spotifyapi{
   static async getToken(code){
        const body = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:5173/playlists"
        }

        const resposta = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-type": "application/x-www-form-urlencoded"
            }


        })

        accessToken = resposta.data.access_token
        refreshToken = resposta.data.refresh_token
        expiresIn = resposta.data.expires_in
        tokenExpirado = false

        setTimeout(() =>{
          tokenExpirado = true
        }, expiresIn);
        
    }

    static async refreshToken(){
        const body = {
            grant_type: "refresh_token",
            refresh_token: refreshToken
            
        }

        const resposta = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-type": "application/x-www-form-urlencoded"
            }
    })

    accessToken = resposta.data.access_token
    expiresIn = resposta.data.expires_in
    tokenExpirado = false

    setTimeout(() =>{
        tokenExpirado = true
    }, expiresIn);


}

    static async getUsuario(){
        if(tokenExpirado) await Spotifyapi.refreshToken()
        const respostaUsuario = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const usuarioLogado = {
            nome: respostaUsuario.data.display_name,
            id: respostaUsuario.data.id
        }

        return usuarioLogado
    }

    static async getPlaylists(){
     const resposta = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/playlists",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return resposta.data.items
    }
}