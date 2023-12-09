let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let id = queryStringObj.get("id")
let type = queryStringObj.get("type")

let botonBusqueda = document.querySelector('#submitDeBusqueda')

botonBusqueda.addEventListener('click', function(){
    let busqueda = document.querySelector('#textoBusqueda')
    sessionStorage.setItem('busquedaUsuario', busqueda.value)
})

function ponergeneros(objeto, objeto2) {
    let generos = ''
    if (objeto && objeto[objeto2] && Array.isArray(objeto[objeto2])){
        for (let i = 0; i < objeto[objeto2].length; i++) {
            if (typeof objeto[objeto2][i] === 'object' && objeto[objeto2][i].name) {
                generos += objeto[objeto2][i].name + ' ';
            }
        }
    }
    return generos
}


let infodetalle = document.querySelector(".infodetalle")
let varURL=""

let trailer = document.querySelector(".trailer")

let listaPeliculasIndex = document.querySelector(".listaPeliculasIndex")
let verRecomendaciones = document.querySelector(".verRecomendaciones")

if(type==="movie"){
    varURL = `https://api.themoviedb.org/3/movie/${id}?api_key=3c52a38246232970e5307a092f7321bc`
    fetch(varURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
            infodetalle.innerHTML = `
            <h1 class="titulosdetalle">${data.title}</h1>
            <h3 class="titulosdetalle">Calificación: ${data.vote_average}</h3>
            <h3 class="titulosdetalle">Fecha de Estreno: ${data.release_date}</h3>
            <h3 class="titulosdetalle">Duración:${data.runtime} minutos</h3>
            <a class="enlacecruzado" href="drama.html"><h3 class="titulosdetalle">Género: ${ponergeneros(data, "genres")}</h3></a>
            <p class="titulosdetalle"> ${data.overview}</p>
            `
            trailer.innerHTML = `
            <img class="video" src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}" alt="Imagen Pelicula"/>
            `
    })
    .catch(function(error){
        console.log("El error es: " + error)
    })

    verRecomendaciones.addEventListener("click", function(){

        verRecomendaciones.style.display = "none"
    
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3c52a38246232970e5307a092f7321bc`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            for(let i = 0; i < 5; i++){
                listaPeliculasIndex.innerHTML += `
                    <div class="peliculaIndex">
                        <a class="detalles" href="./detalle.html?id=${data.results[i].id}&type=${type}">
                        <img src=https://image.tmdb.org/t/p/w342/${data.results[i].poster_path} alt=${data.results[i].title} class="imagenPeliculaIndex">
                        <h3>${data.results[i].title}</h3>
                        </a>
                        <p>Fecha de Estreno: ${data.results[i].release_date}</p>
                    </div>            
                `
            }
        })
        .catch(function(error){
            console.log("Error: " + error);
        })
        
    })
}else if(type==="tv"){
    varURL = `https://api.themoviedb.org/3/tv/${id}?api_key=3c52a38246232970e5307a092f7321bc`
    fetch(varURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
            genero = data.genres
            infodetalle.innerHTML = `
            <h1 class="titulosdetalle">${data.name}</h1>
            <h3 class="titulosdetalle">Calificación: ${data.vote_average}</h3>
            <h3 class="titulosdetalle">Fecha de Estreno: ${data.first_air_date}</h3>
            <a class="enlacecruzado" href="drama.html"><h3 class="titulosdetalle">Género: ${ponergeneros(data, "genres")}</h3></a>
            <p class="titulosdetalle"> ${data.overview} </p>
            `
            trailer.innerHTML = `
            <img class="video" src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}" alt="Imagen Pelicula"/>
            `
    })
    .catch(function(error){
        console.log("El error es: " + error)
    })

    verRecomendaciones.addEventListener("click", function(){

        verRecomendaciones.style.display = "none"
    
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=3c52a38246232970e5307a092f7321bc`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            for(let i = 0; i < 5; i++){
                listaPeliculasIndex.innerHTML += `
                    <div class="peliculaIndex">
                        <a class="detalles" href="./detalle.html?id=${data.results[i].id}&type=${type}">
                        <img src=https://image.tmdb.org/t/p/w342/${data.results[i].poster_path} alt=${data.results[i].name} class="imagenPeliculaIndex">
                        <h3>${data.results[i].name}</h3>
                        </a>
                        <p>Fecha de Estreno: ${data.results[i].first_air_date}</p>
                    </div>            
                `
            }
        })
        .catch(function(error){
            console.log("Error: " + error);
        })
        
    })
    
}
