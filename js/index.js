var candidatePlaceholder = "http://www.salesmarketingalliance.com/wp-content/uploads/2016/11/PersonPlaceHolder.png";
var homeButton = document.getElementsByClassName("home")[0];


(loadCandidates = () => {
    fetch("http://localhost:3333/api/candidates")
    .then(result => result.json())
    .then(result => {
        result.forEach((candidate, i) => { 
            var data =JSON.stringify(candidate);           
            var cardContainer = document.createElement("div");
            var avatar = document.createElement("img");
            var email = document.createElement("p");
            var name = document.createElement("h4");

            email.setAttribute("class", "redirect");
            email.setAttribute("data", data);
            email.textContent = candidate.email;

            cardContainer.setAttribute("id", candidate.id);
            cardContainer.setAttribute("data", data);
            cardContainer.setAttribute("class", "candidate-card col-sm-12 col-md-5 col-lg-5");

            name.setAttribute("data", data);
            name.setAttribute("class", "redirect candidate-name");
            name.textContent = candidate.name;

            avatar.setAttribute("data", data);
            avatar.setAttribute("class", "redirect");
            
                if (candidate.avatar.length > 1) {
                    avatar.setAttribute("src", candidate.avatar);
                }
                else {
                    avatar.setAttribute("src", candidatePlaceholder);
                    avatar.setAttribute("width", "128px");
                }
                
                var card = document.getElementsByClassName("candidate-container")[0];
                cardContainer.appendChild(avatar);
                cardContainer.appendChild(name);
                cardContainer.appendChild(email);
                card.appendChild(cardContainer);
            });
        });
        if(window.location.hash.indexOf("/index.html") == -1){
            homeButton.setAttribute("class", "selected home ");
        }
})();


searchHandler = () => {
    var input, filter, i, name;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    name = document.getElementsByClassName("redirect candidate-name");

    for (i = 0; i < name.length; i++) {
        if (name[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            name[i].style.display = "";
        } else {
            document.getElementsByClassName("candidate-card")[i].style.display = "none";
        }
        if (filter.length == 0) {
            document.getElementsByClassName("candidate-card")[i].style.display = "";
        }
    }

}

document.getElementById("search").addEventListener("keyup", searchHandler);

redirectCandidate = (event) => {
    if (event.target.className == "redirect" || event.target.className == "candidate-card col-sm-12 col-md-5 col-lg-5") {
        var datafinal = event.target.getAttribute("data");
        localStorage.setItem("candidateID", datafinal);
        location.assign("candidate.html"); 
    }
}

document.addEventListener("click", redirectCandidate);


homeButton.addEventListener("click", function() {
    location.assign("index.html");
});


