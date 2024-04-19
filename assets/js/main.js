const url = 'https://mmo-games.p.rapidapi.com/games';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '100341dce4mshdaa726b778c3895p19dfbejsn47647fd53bbe',
		'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
	}
};

async function fetchGames(){
    const response = await fetch(url, options);
    const data = response.json();
    return data;
}

const gameList = document.querySelector("#gameContainer")

async function getGameList(){
    try {
        fetchGames().then(jogos => {
            const container = document.querySelector("#gameContainer")
            jogos.map(jogo => {
                const card = document.createElement("button")
                card.classList.add("game-box")

                card.addEventListener("click", (event) => {
                    getGameByID(jogo.id);
                })

                onclick = (event) => {}

                const img = document.createElement("img")
                img.src = jogo.thumbnail;
                img.alt = jogo.title;
                img.classList.add("game-img")

                const titulo = document.createElement("h3")
                titulo.textContent = jogo.title;

                card.appendChild(img)
                card.appendChild(titulo)
                container.appendChild(card)
            }
            );

       
        })
    } catch (error) {
        console.error(error);
    }
}

async function clearGameList(){
    gameList.innerHTML = '';
}

async function getGameByID(id){
        const result = await fetch('https://mmo-games.p.rapidapi.com/game?id='+id, options);
        result.json().then(json => {
            const modalBackdrop = document.createElement('div');
            modalBackdrop.classList.add('modal-backdrop');
            modalBackdrop.addEventListener('click', function(event) {
                if (event.target === modalBackdrop) {
                    document.body.removeChild(modalBackdrop);
                }
            });

            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            const closeModalBtn = document.createElement('span');
            closeModalBtn.classList.add('close-modal-btn');
            closeModalBtn.innerHTML = '&times;';
            closeModalBtn.addEventListener('click', function() {
                document.body.removeChild(modalBackdrop);
            });

            const modalTitle = document.createElement('h2');
            modalTitle.textContent = json.title;

            const modalThumbnail = document.createElement('img');
            modalThumbnail.src = json.thumbnail;
            modalThumbnail.alt = json.title;

            const modalGenre = document.createElement('p');
            modalGenre.innerHTML = `<strong>Gênero:</strong> ${json.genre}`;

            const modalPublicationDate = document.createElement('p');
            modalPublicationDate.innerHTML = `<strong>Data de Publicação:</strong> ${json.release_date}`;

            const modalDeveloper = document.createElement('p');
            modalDeveloper.innerHTML = `<strong>Desenvolvedora:</strong> ${json.developer}`;

            const modalDistribution = document.createElement('p');
            modalDistribution.innerHTML = `<strong>Distribuição:</strong> ${json.publisher}`;

            const modalDescription = document.createElement('p');
            modalDescription.innerHTML = `<strong>Descrição:</strong> ${json.short_description}`;

            const moreInfoBtn = document.createElement('button');
            moreInfoBtn.textContent = 'Ver Mais';
            moreInfoBtn.addEventListener('click', function() {
                modalDescription.style.display = 'block';
                window.location.href = json.profile_url;
            });

          
            // Adicionando elementos à modal
            modalContent.appendChild(closeModalBtn);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalThumbnail);
            modalContent.appendChild(modalGenre);
            modalContent.appendChild(modalPublicationDate);
            modalContent.appendChild(modalDeveloper);
            modalContent.appendChild(modalDistribution);
            modalContent.appendChild(modalDescription);
            modalContent.appendChild(moreInfoBtn);

            modalContainer.appendChild(modalContent);
            modalBackdrop.appendChild(modalContainer);
            document.body.appendChild(modalBackdrop);

            // Fechar a modal quando clicar no botão de fechar
            closeModalBtn.addEventListener('click', function() {
                document.body.removeChild(modalBackdrop);
    });
        })
}


    /* - NAVBAR FUNCTION - */
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/* - SHADOW ON NAVBAR WHILE SCROLLING - */
window.onscroll = function(){
    headerShadow()
};

function headerShadow(){
    const navHeader = document.getElementById("header");

   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
    navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
   } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
   }
}

