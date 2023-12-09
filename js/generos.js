let botonBusqueda = document.querySelector('#submitDeBusqueda')

botonBusqueda.addEventListener('click', function(){
    let busqueda = document.querySelector('#textoBusqueda')
    sessionStorage.setItem('busquedaUsuario', busqueda.value)
})

let generosPeliculas = document.querySelector(".generosPeliculas")

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3c52a38246232970e5307a092f7321bc")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for(let i = 0; i<data.genres.length; i++){
            generosPeliculas.innerHTML +=`
                <a class="generoadetalle" href="./detalle-generos.html?id=${data.genres[i].id}"><div class="Genero">
                <h2 class="ElGenero">${data.genres[i].name}</h2>
                </div></a>
        `
        }

    })
    .catch(function(error){
        console.log("El error es: " + error)
    })

let generosSeries = document.querySelector(".generosSeries")
fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=3c52a38246232970e5307a092f7321bc")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for(let i = 0; i<data.genres.length; i++){
            generosSeries.innerHTML +=`
                <a class="generoadetalle" href="./detalle-generos.html?id=${data.genres[i].id}"><div class="Genero">
                <h2 class="ElGenero">${data.genres[i].name}</h2>
                </div></a>
        `
        }

    })
    .catch(function(error){
        console.log("El error es: " + error)
    })
