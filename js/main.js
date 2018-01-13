(loadCandidates = () => {
    fetch("http://localhost:3333/api/candidates")
        .then(result => result.json())
        .then(result => {
            result.forEach((candidate, i) => {
                let cardContainer = document.createElement("div");
                let avatar = document.createElement("img");
                let email = document.createElement("p");
                let name = document.createElement("h4");

                name.textContent = candidate.name;
                email.textContent = candidate.email;
                if (candidate.avatar.length > 1) {
                    avatar.setAttribute("src", candidate.avatar);
                }
                else {
                    avatar.setAttribute("src", "http://via.placeholder.com/128x128");
                }
                cardContainer.setAttribute("class", "candidate-card col-sm-12 col-md-6 col-lg-4");

                let card = document.getElementsByClassName("candidate-container")[0];
                cardContainer.appendChild(avatar);
                cardContainer.appendChild(name);
                cardContainer.appendChild(email);
                card.appendChild(cardContainer);

            })
        })
})();
