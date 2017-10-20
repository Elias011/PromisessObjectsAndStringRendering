// The goal is render a github informations on a page with:
// Promises, Map and Reduce.

function GitHubUser (username) {
    // Fill this
    this.username = username;
}

GitHubUser.prototype.getUserInformations = function () {
    // Fill this
    let url = "https://api.github.com/users/" + this.username;
	return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open("GET", url);
        request.onreadystatechange = () => {
            if ((request.readyState===4) && (request.status===200)) {
                resolve(request.response);
            }
        };
        request.send();
    });
};

GitHubUser.prototype.getRepos = function () {
    // Fill this
    let url = "https://api.github.com/users/" + this.username + "/repos";
	return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open("GET", url);
        request.onreadystatechange = () => {
            if ((request.readyState===4) && (request.status===200)) {
                resolve(request.response);
            }
        };
        request.send();
  });
}

GitHubUser.prototype.render = function () {
    // Here return a string, be fancy and use map && reduce
    let user = JSON.parse(this.user);
    //console.log(user);
	let display = "<h3>User</h3>";
	display += "<div id='user'><p>Name : " + user.name + "<br>Created at : " + user.created_at + "<br>Last Login :" + user.updated_at + "<br> <a target='_blank' href=" + user.html_url + ">Go to GitHub Page : </a><br><img id='image' src='" + user.avatar_url + "' /></p>  </div>";
	
	let repo = JSON.parse(this.repos);
    console.log(repo);
    let repoItems = repo.reduce((a, b) =>  a + '<li><a target="_blank" href=' + b.html_url + '>' + b.name + '</a></li>', '');
	display += "<h3>Repositories</h3>";
	display += '<ul id = "repoList">' + repoItems +	'</ul>';
	return display;
}

function Render($element, html){
    // Fill this
    document.querySelector($element).innerHTML = html;
}


// Expecting
let gitUser = new GitHubUser('mkruijt');

gitUser
    .getUserInformations()  
    .then(function(informations){
        gitUser.user = informations;
        return gitUser.getRepos();
    }) 
    .then(function(repos) {
        gitUser.repos = repos;
        Render('.githubView', gitUser.render());
    });
