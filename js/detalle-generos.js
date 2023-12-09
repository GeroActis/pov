let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let id = queryStringObj.get("id")

let generoPelicula = document.querySelector(".generoPelicula")
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3c52a38246232970e5307a092f7321bc&with_genres=${id}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for(let i = 0; i < 5; i++){
            generoPelicula.innerHTML += `
            <div class="peliculaIndex">
                <a class="detalles" href="./detalle.html?id=${data.results[i].id}&type=movie">
                <img src=https://image.tmdb.org/t/p/w342/${data.results[i].poster_path} alt=${data.results[i].title} class="imagenPeliculaIndex">
                <h3>${data.results[i].title}</h3>
                </a>
                <p>Fecha de Estreno: ${data.results[i].release_date}</p>
            </div>
            `
    }
    })
    .catch(function(error){
        console.log("El error es: " + error)
    })

let generoSeries = document.querySelector(".generoSeries")
fetch(`https://api.themoviedb.org/3/discover/tv?api_key=3c52a38246232970e5307a092f7321bc&with_genres=${id}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for(let i = 0; i < 5; i++){
            generoSeries.innerHTML += `
            <div class="peliculaIndex">
                <a class="detalles" href="./detalle.html?id=${data.results[i].id}&type=tv">
                <img src=https://image.tmdb.org/t/p/w342/${data.results[i].poster_path} alt=${data.results[i].name} class="imagenPeliculaIndex">
                <h3>${data.results[i].name}</h3>
                </a>
                <p>Fecha de Estreno: ${data.results[i].first_air_date
                }</p>
            </div>
            `
    }
    })
    .catch(function(error){
        console.log("El error es: " + error)
    })
