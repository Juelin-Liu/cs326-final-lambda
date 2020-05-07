// const readURL = "http://0.0.0.0:8080/read";
const readURL = "https://aqueous-dusk-44841.herokuapp.com/read"; 
const InfoURL = "https://aqueous-dusk-44841.herokuapp.com/get_user_info";
let page = 0

function generateHTML(author, title, content, time, id) {
    (async () => {
        let response = await fetch(InfoURL);
        let json = await response.json();
        let editButton = (json['username'] === author.toString) ? `<ul><li class="nav-item active"><a class="nav-link" onclick="editPost()"">Edit</a></li></ul`
                : "";
        let html = `<div class="media content-section">
                    <img src="/images/default.jpg" class="post-img rounded" alt="user-photo"></img>
                    <div class="media-body">
                    <h2 class="mt-0 post-title">${title.toString()}</h2>
                    <h5 class="mt-0">${author.toString()}</h5>
                    <small class="text-muted">${time}</small>
                    <small class="text-muted" id = "_id">${id.toString()}</small>
                    <p class="post-content">${content}</p>` + editButton + `
                    </div>
                </div>`
        return html;
       })();
}

function editPost() {
    (async () => {
        var form = document.createElement('form');
        document.body.appendChild(form);
        form.method = 'post';
        form.action = '"https://aqueous-dusk-44841.herokuapp.com/edit_post"';
        for (var name in data) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = data[name];
            form.appendChild(input);
        }
        form.submit();
    })();
}

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = readURL + "/" + page;
        const resp  = await fetch(newURL);
        const j = await resp.json();
        console.log("message received: ")
        console.dir(j)
        if (j['result'] != "failed"){
            let timestamp = parseInt(j['_id'])
            console.log(timestamp)
            let date = new Date(timestamp)
            let time = date.toLocaleDateString()
            let content = j['content']
            let formated_content = content.replace(/\n/g, '<br>')
            let username = j['username']
            let title = j['title']
            let html = generateHTML(username, title, formated_content, time, j['_id']);
            console.log(html);
            let postSection = document.getElementById("posts");
            postSection.innerHTML = postSection.innerHTML+html;
            console.log("Text changed");
            page = page + 1
        } else {
            let readMore = document.getElementById("readMore");
            readMore.innerHTML = "No more post to read!";
        }
    })()
};