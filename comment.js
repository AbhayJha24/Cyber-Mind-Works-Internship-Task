function comment() {
    let commentArea = document.getElementById("comments");
    let commentText = document.getElementById("writeCommentBox");

    // Check lock

    const lock = document.cookie.split("; ").find((row) => row.startsWith("lock="))?.split("=")[1];

    if(lock === "true"){
        if(commentText.value === ""){
            alert("Please enter a comment and press button to edit !");
        }
        else{
            // Modify comment
            let e = document.getElementById("lockedComment");
            e.firstElementChild.getElementsByTagName("div")[0].getElementsByClassName("commentText")[0].innerText = commentText.value;
            e.id = "";
            e.style.opacity = "1";

            // Remove Lock

            document.cookie = `lock=false`;
            commentText.value = "";

        }
    }
    else{
        if(commentText.value === ""){
            alert("Please enter a comment !");
        }
        else{
            const rawComment = `<article class="comment">
            <div class="commentHolder" onclick="editComment(this.parentElement)">
                <img src="./person_dummy_image.png" alt="Current Person" / >
                <div class="commentDetails">
                    <p class="commentorName">Jane Smith</p>
                    <p class="commentText">${commentText.value}</p>
                </div>
            </div>
            <img class="trash" src="./trash-can.png" alt="Delete Comment" onclick="deleteComment(this.parentElement);" />
            </article>`;
    
            let parsed = new DOMParser().parseFromString(rawComment, "text/html");
            let comment = parsed.body.firstChild;
    
            commentArea.appendChild(comment);
            commentText.value = "";
        }
    }
}

function editComment(e){
    // Check lock

    const lock = document.cookie.split("; ").find((row) => row.startsWith("lock="))?.split("=")[1];

    if(lock === "true"){
        alert("Cannot Edit 2 Comments at a time !");
    }

    else{
        // Lock to avoid race conditions
        e.id = "lockedComment";
        document.cookie = "lock=true;";

        e.style.opacity = "0.5";
        let commentBox = document.getElementById("writeCommentBox");
        console.log(e.firstElementChild.getElementsByTagName("div")[0].getElementsByClassName("commentText")[0].innerText);
        commentBox.value = e.firstElementChild.getElementsByTagName("div")[0].getElementsByClassName("commentText")[0].innerText;
        alert("Comment Edit Mode ! Now you can change the comment by editing below and click the arrow button to confirm");
    }
}

function deleteComment(e) {
    let commentArea = document.getElementById("comments");
    commentArea.removeChild(e);
}

function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");

    if(dropdown.style.visibility === "hidden"){
        dropdown.style.visibility = "visible";
    }
    else{
        dropdown.style.visibility = "hidden";
    }
}

function changeCurrentPerson(e) {
    let dropdown = document.getElementById("dropdown");
    let changeButton = document.getElementById("personChangeButton");
    let currentlySelectedPerson = document.getElementById("currentlySelectedPerson");

    if(dropdown.style.visibility === "visible"){
        dropdown.style.visibility = "hidden";
    }

    let copy = e.cloneNode(true);

    copy.id = "currentlySelectedPerson";

    changeButton.removeChild(currentlySelectedPerson);
    changeButton.prepend(copy);
}

function setEvent() {

    let name = document.getElementsByClassName("title")[0].value;
    let datetime = document.getElementsByClassName("dateInput")[0].value;
    let person = document.getElementById("currentlySelectedPerson").getElementsByClassName("personName")[0].innerText;
    let note = document.getElementsByClassName("noteText")[0].value;

    let event = {
        "name": name,
        "datetime": datetime,
        "assignedto": person,
        "notes": note
    }

    document.cookie = `Event=${JSON.stringify(event)}`;
    alert(`Event Set Successfully ! Event Name -> ${event.name} Date/Time -> ${event.datetime} Assigned Person -> ${event.assignedto} Notes -> ${event.notes}`);
}