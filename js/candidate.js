var homeButton = document.getElementsByClassName("home")[0];
var data = JSON.parse(localStorage.getItem("candidateID"));
var reportsContainer = $(".reports")[0];
var infoContainer = $(".candidate-info")[0];
var table = $(".reports-table")[0];
var candidatePlaceholder = "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";
var modalIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4cOH2hjbNUv5gu7qoMOxW9lZBF-cXE28wGS6KqVkIdI-mEnD";


homeButton.addEventListener("click", function () {
    location.assign("index.html");
});

(loadInfo = () => {
    var imgDiv = $("<div>");
    var infoDiv1 = $("<div>");
    var infoDiv2 = $("<div>");
    var image = $("<img>");
    var nameData = $("<h4>");
    var emailData = $("<h4>");
    var dateOfBirthData = $("<h4>");
    var educationData = $("<h4>");
    var name = $("<p>");
    var email = $("<p>");
    var dateOfBirth = $("<p>");
    var education = $("<p>");

    if (data.avatar.length > 1) {
        $(image).attr({
            "src": data.avatar,
            "class": "candidate-image",
            "style": "width: 80%"
        });
    }
    else {
        $(image).attr({
            "src": candidatePlaceholder,
            "class": "candidate-image",
            "style": "width: 80%"
        });
    }

    $(imgDiv).attr({
        "class": "col-lg-4"
    });

    $(infoDiv1).attr({
        "class": "col-lg-4"
    });

    $(infoDiv2).attr({
        "class": "col-lg-4"
    });

    $(name).text("Name:");
    $(email).text("Email:");
    $(dateOfBirth).text("Date of birth: :");
    $(education).text("Education:");

    $(nameData).text(data.name);
    $(emailData).text(data.email);
    $(dateOfBirthData).text(data.birthday);
    $(educationData).text(data.education);

    $(infoDiv1).append($(name));
    $(infoDiv1).append($(nameData));
    $(infoDiv1).append($(email));
    $(infoDiv1).append($(emailData));

    $(infoDiv2).append($(dateOfBirth));
    $(infoDiv2).append($(dateOfBirthData));
    $(infoDiv2).append($(education));
    $(infoDiv2).append($(educationData));


    $(imgDiv).append(image[0]);
    $(infoContainer).append(imgDiv);
    $(infoContainer).append(infoDiv1);
    $(infoContainer).append(infoDiv2);
  
})();

let request = $.ajax({
    url: "http://localhost:3333/api/reports",
    method: "GET",
});


(loadReports = () => {
    request.done(result => {
        result.forEach((report, i) => {
            if (report.candidateId == data.id) {
                var tr = $("<tr>");
                var company = $("<td>");
                var interviewDate = $("<td>");
                var status = $("<td>");
                var icon = $("<img>");

                $(icon).attr({
                    "src": modalIcon,
                    "class": "modal-icon",
                    "style": "width: 10%",
                    "reportData": JSON.stringify(report),
                    "id": "myBtn"
                });

                $(company).text(report.companyName);
                $(interviewDate).text(new Date((report.interviewDate)).toDateString().slice(3));
                $(status).text(report.status);

                $(status).append($(icon));
                $(tr).append($(company));
                $(tr).append($(interviewDate));
                $(tr).append($(status));

                $(table).append(tr);
            }
        });
    })
    .catch((error)=>{
        alert(error);
    });
})();

createModal = (reportData) => {
    var modalInfo = `
        <div class="modal-container">
        <h5>Candidate Name</h5>
            <p>${reportData.candidateName}</p>
                <div>
                    <h5>Company</h5>
                    <p>${reportData.companyName}</p>
                    <h5>Interview Date</h5>
                    <p>${new Date(reportData.interviewDate).toDateString().slice(3)}</p>
                    <h5>Phase</h5>
                    <p>${reportData.phase}</p>
                    <h5>Status</h5>
                    <p>${reportData.status}</p>
                 </div>
                <div>
                    <h5>Notes</h5>
                    <p>${reportData.note}</p>
                </div>
        </div>
    `
    var cModal = new Modal({
        content: modalInfo
    });
    cModal.open()
}

openModal = (event) => {
    if (event.target.className == "modal-icon") {
        var reportData = JSON.parse(event.target.getAttribute("reportData"));
        createModal(reportData);
    }
}

document.addEventListener("click", openModal);