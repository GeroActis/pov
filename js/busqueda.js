let resultado = document.querySelector('.titulos')
let botonBusqueda = document.querySelector('#submitDeBusqueda')
let valorDeBusqueda = sessionStorage.getItem('busquedaUsuario')
let listaPeliculasBusqueda = document.querySelector(".listaPeliculasIndex")

function ingresarPeliculas(data, elementoAInyectar, type) {
    for (let i = 0; i < 18; i++) {
        elementoAInyectar.innerHTML += `
        <div class="peliculaIndex">
            <a class="detalles" href="./detalle.html?id=${data.results[i].id}&type=${type}">
            <img src=https://image.tmdb.org/t/p/w342/${data.results[i].poster_path} alt=${data.results[i].title} class="imagenPeliculaIndex">
            <h3>${data.results[i].title}</h3>
            </a>
            <p>Fecha de Estreno: ${data.results[i].release_date}</p>
        </div>
        `
    }
}

resultado.innerHTML = 'Resultados de búsqueda para: ' + valorDeBusqueda


window.addEventListener('load', function(){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3c52a38246232970e5307a092f7321bc&query=${valorDeBusqueda}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            ingresarPeliculas(data, listaPeliculasBusqueda, "movie")
        })
        .catch(function (error) {
            console.log("El error es: " + error)
        })
    })
    botonBusqueda.addEventListener('click', function(){
        let busqueda = document.querySelector('#textoBusqueda')
        sessionStorage.setItem('busquedaUsuario', busqueda.value)
    })