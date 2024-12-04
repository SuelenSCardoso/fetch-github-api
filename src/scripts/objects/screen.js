const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
         this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />                                        
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 🤷‍♀️'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 🤷‍♂️'}</p>
                                                <h4>👥 Followers:${user.followers}</h4>
                                                <h4>👥 Following:${user.following}</h4>
                                            </div>
                                        </div>`
        
        let repositoriesItens = ''  
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                        <div class="repos-data">
                                            <span>🍴 ${repo.forks}</span>
                                            <span>⭐ ${repo.stargazes_count}</span>
                                            <span>👀 ${repo.watchers}</span>
                                            <span>👨‍💻 ${repo.language ?? "-"}</span>
                                        </div>
        </a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`                                   
        }

        let eventList = ''  
        user.events.forEach(events => {
            if (events.type === 'PushEvent') {
                if (events.payload.commits && events.payload.commits.length > 0) {
                    eventList += `<li class="event"><span>${events.repo.name}</span> - ${events.payload.commits[0].message}</li> `
                } else {
                    eventList += `<li class="event"><span>${events.repo.name}</span> - Sem commits</li>`
                }
            } else if (events.type === 'CreateEvent'){
                eventList += `<li class="event"><span>${events.repo.name}</span> - Sem mensagem de commit</li>`
            }
        })  
        
        if (user.events.length > 0){
            this.userProfile.innerHTML += `<h2>Eventos</h2>`
        }
        
        this.userProfile.innerHTML += eventList 
        
    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado!</h3>"
    }
}

export { screen }