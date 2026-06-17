const apiKey = "bf5479ac";

const searchMovie = async () => {

    const movie = document.getElementById("movie").value;
    const result = document.getElementById("movieResult");

    if(!movie){
        result.innerHTML = "<p>Please enter a movie name</p>";
        return;
    }

    try{

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
        );

        const data = await response.json();

        if(data.Response === "False"){
            throw new Error("Movie not found");
        }

        result.innerHTML = `
            <img src="${data.Poster}" alt="Poster">

            <h2>${data.Title}</h2>

            <p><strong>Year:</strong> ${data.Year}</p>

            <p><strong>Rating:</strong> ${data.imdbRating}</p>

            <p><strong>Released:</strong> ${data.Released}</p>
        `;

    }catch(error){

        result.innerHTML = `<p>${error.message}</p>`;

    }
};

document
.getElementById("searchBtn")
.addEventListener("click", searchMovie);

document
.getElementById("movie")
.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        searchMovie();
    }
});