const { ipcRenderer } = require('electron');
document.body.classList.add("body");
document.getElementById('discord').removeChild(document.getElementById('logo'));
document.getElementById('discord').removeChild(document.getElementById('animeId'));
document.getElementById('discord').removeChild(document.getElementById('pre-anime'));
var main = document.getElementById('main');
var animeIdButton = document.getElementById('animeIdButton');
function shikiparser() {
console.log('Im here')
const request = require('request');

console.log(document.getElementById("ID").innerHTML)
var animeId = document.getElementById("ID").innerHTML
document.body.removeChild(document.getElementById('ID'));
var url = 'https://shikimori.org/api/animes/' + animeId;
request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, anime) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
      animeIdButton.onclick = function error404() {
      shikiparser();
    }
    } else {
      var studiosInfo = anime.studios[0];
        var animeIMG = document.createElement("IMG");
        animeIMG.setAttribute("src", "https://shikimori.org" + anime.image.original);
        animeIMG.classList.add('animePIC');
        main.appendChild(animeIMG);

        var animeName = document.createElement('h1');
        animeName.innerHTML = anime.name + '/' + anime.russian;
        animeName.classList.add('name');
        main.appendChild(animeName);

        var animeInfo = document.createElement('div');
        animeInfo.innerHTML = 'Информация:';
        animeInfo.classList.add('subheadline');
        main.appendChild(animeInfo);

        var animeKind = document.createElement('div');
        animeKind.innerHTML = '<div class="info"><div class="key">Тип: </div> ' + anime.kind + '</div>';
        main.appendChild(animeKind);

        var animeStatus = document.createElement('div');
        animeStatus.innerHTML = '<div class="info"><div class="key">Статус: </div>' + anime.status + '</div>';
        main.appendChild(animeStatus);

        var animeEpisodes = document.createElement('div');
        animeEpisodes.innerHTML = '<div class="info"><div class="key">Эпизоды: </div>' + anime.episodes + '</div>';
        main.appendChild(animeEpisodes);

        var animeReleased = document.createElement('div');
        animeReleased.innerHTML = '<div class="info"><div class="key">Дата релиза: </div>' + anime.released_on + '</div>';
        main.appendChild(animeReleased);

        var animeRating = document.createElement('div');
        animeRating.innerHTML = '<div class="info"><div class="key">Рейтинг: </div>' + anime.rating + '</div>';
        main.appendChild(animeRating);

        var animeScore = document.createElement('div');
        animeScore.innerHTML = '<div class="info"><div class="key">Оценка: </div>' + anime.score + '</div>';
        main.appendChild(animeScore);

        var animeStudio = document.createElement('div');
        animeStudio.innerHTML = '<div class="info"><div class="key">Студия: </div>' + studiosInfo.name + '</div>';
        main.appendChild(animeStudio);

        var animeInfoDescription = document.createElement('div');
        animeInfoDescription.innerHTML = 'Описание:';
        animeInfoDescription.classList.add('subheadline');
        main.appendChild(animeInfoDescription);

        var animeDescription = document.createElement('div');
        animeDescription.innerHTML = anime.description_html;
        animeDescription.classList.add('discriprion');
        main.appendChild(animeDescription);

        var play = document.createElement('button');
        play.innerHTML = 'Смотреть онлайн';
        play.classList.add('button');
        document.getElementById('discord').appendChild(play);
        play.onclick = function playFunction() {
          ipcRenderer.send('anime-message', anime)
          console.log("You got a message :)")
          ipcRenderer.send('redirect-message', anime.id);
        }

        animeIdButton.onclick = function animeIdButton() {
          if(res.statusCode == 404) {
            console.log(res.statusCode)
          } else {
        console.log(res.statusCode)
        main.removeChild(animeDescription);
        main.removeChild(animeInfoDescription);
        main.removeChild(animeStudio);
        main.removeChild(animeScore);
        main.removeChild(animeRating);
        main.removeChild(animeReleased);
        main.removeChild(animeEpisodes);
        main.removeChild(animeStatus);
        main.removeChild(animeKind);
        main.removeChild(animeInfo);
        main.removeChild(animeName);
        main.removeChild(animeIMG);
        document.getElementById('discord').removeChild(discord);
        console.log('there') }
        shikiparser();
}
    }
});
}
shikiparser();
