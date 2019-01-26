
var fetchit = document.getElementById('fetchit');
var data = document.getElementById('data');
fetchit.addEventListener('click', fetchfollowers);

function fetchfollowers(e) {
  e.preventDefault();
  var gituser = document.getElementById('gituser').value.trim();
  //alert(gituser);
  fetch('https://api.github.com/users/' + gituser + '/followers')
    .then((response) => {
      return response.json();
    })
    .then((followers) => {
      console.log(followers);
      followers.map(( user, index ) => {
        data.innerHTML +=
          `<img src="${user.avatar_url}" class="img-fluid" height="330" width="410" />
          <div id = "info">
            <p>LogIn : ${user.login}</p>
            <p>ID : ${user.id}</p>
            <p>URL : ${user.url}</p> `


      });
    });

}




