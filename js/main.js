(loadCandidates = () => {
    fetch("http://localhost:3333/api/candidates")
        .then(result => result.json())
        .then(result => {
            result.forEach((candidate, i) => {
                var cardContainer = document.createElement("div");
                var avatar = document.createElement("img");
                var email = document.createElement("p");
                var name = document.createElement("h4");

                name.textContent = candidate.name;
                name.setAttribute("class", "candidate-name");
                email.textContent = candidate.email;
                if (candidate.avatar.length > 1) {
                    avatar.setAttribute("src", candidate.avatar);
                }
                else {
                    avatar.setAttribute("src", "http://via.placeholder.com/128x128");
                }
                cardContainer.setAttribute("class", "candidate-card col-sm-12 col-md-6 col-lg-4");

                var card = document.getElementsByClassName("candidate-container")[0];
                cardContainer.appendChild(avatar);
                cardContainer.appendChild(name);
                cardContainer.appendChild(email);
                card.appendChild(cardContainer);

            })
        })
})();


searchHandler =() =>{
    var input, filter, i , name;
    
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    name = document.getElementsByClassName("candidate-name");

    for (i = 0; i < name.length; i++) {
        
        if (name[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            name[i].style.display = "";
        } else {
            // name[i].style.display = "none";
            document.getElementsByClassName("candidate-card")[i].style.display = "none";
        }
        if(filter.length == 0){
            document.getElementsByClassName("candidate-card")[i].style.display = "";
        }
    }

}
document.getElementById("search").addEventListener("keyup", searchHandler);