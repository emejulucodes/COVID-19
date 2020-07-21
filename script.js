window.onload = function() {
  var d = new Date();
  var year = d.getFullYear();
  var detail = document.querySelectorAll('li');
  setInterval(function() {
    if (localStorage.getItem('query')) {
      localStorage.getItem('query');
      document.querySelector('#saved').textContent = "Your previous search was "+localStorage.getItem('query')+".";
    }
  },
    10000);
  document.querySelector('#mic').addEventListener('click',
    function() {
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
      recognition.onstart = function() {
        document.querySelector('input').value = null;
        document.querySelector('input').setAttribute('placeholder', 'Initializing...');
        setTimeout(function() {
          document.querySelector('input').setAttribute('placeholder', 'Listening...');
        }, 5000);
      };
      recognition.onspeechend = function() {
        API();
        recognition.stop();
      }
      recognition.onresult = function(voice) {
        var transcript = voice.results[0][0].transcript;
        input.value = transcript;
        input.classList.remove("hide");
      };
      recognition.start();
    });
  document.querySelector('#search').addEventListener('click',
    function() {
      document.querySelector('#load').style.color = "adadad";
      document.querySelector('#load').style.display = "block";
      document.querySelector('#load').textContent = "Please Wait...";
      var search = document.querySelector('input').value;
      localStorage.setItem('query', search);
      if (search !== '') {
        setTimeout(API, 3000);
      } else {
        location.reload();
        document.querySelector('#load').style.display = "none";
        document.querySelector('#load').textContent = "Please enter a country";
      }
    });
  function API() {
    var url = "https://coronavirus-19-api.herokuapp.com/countries/";
    var search = document.querySelector('input').value;
    var  data = url+search;
    fetch(data)
    .then(info=> info.json())
    .then(res=> {
      document.querySelector('#info').style.display = "block";
      detail[0].textContent = "Country : "+res.country+"";
      detail[1].textContent = "Cases : "+res.cases+"";
      detail[2].textContent = "Today Cases : "+res.todayCases+"";
      detail[3].textContent = "Recovered : "+res.recovered+"";
      detail[4].textContent = "Deaths : "+res.deaths+"";
      detail[5].textContent = "Today's Death : "+res.todayDeaths+"";
      detail[6].textContent = "Total Test : "+res.totalTests+"";
      document.querySelector('#load').style.display = "none";
      document.querySelector('input').value = null;
    }).catch(err=> {
      document.querySelector('#load').style.display = "block";
      document.querySelector('#load').style.color = "red";
      document.querySelector('#load').textContent = "Error while fetching data.";
    });
  }
  document.querySelector("span").addEventListener('click',
    function() {
      document.querySelector("#info").style.display = "none";
    });
  document.querySelector('footer').innerHTML = "&copy; "+year+" built by Emmanuel Emejulu, founder and CEO of JUEsoft.";
}
