window.onload = function() {
  var d = new Date();
  var year = d.getFullYear();
  var detail = document.querySelectorAll('li');
  if (localStorage.getItem('query')) {
    localStorage.getItem('query');
    document.querySelector('#saved').textContent = "Your previous search was "+localStorage.getItem('query')+"";
  }
  document.querySelector('button').addEventListener('click', function(e) {
    document.querySelector('#load').style.display = "block";
    var search = document.querySelector('input').value;
    localStorage.setItem('query', search);
    console.log(localStorage)
    if (search !== '') {
      setTimeout(function() {
        document.querySelector('input').value = null;
        console.log(search)
        var url = "https://coronavirus-19-api.herokuapp.com/countries/";
        var  data = url+search;
        console.log(data);
        fetch(data)
        .then(info=> info.json())
        .then(res=> {
          console.log(res);
          document.querySelector('#info').style.display = "block";
          detail[0].textContent = "Country : "+res.country+"";
          detail[1].textContent = "Cases : "+res.cases+"";
          detail[2].textContent = "Today Cases : "+res.todayCases+"";
          detail[3].textContent = "Recovered : "+res.recovered+"";
          detail[4].textContent = "Deaths : "+res.deaths+"";
          detail[5].textContent = "Today's Death : "+res.todayDeaths+"";
          detail[6].textContent = "Total Test : "+res.totalTests+"";
          document.querySelector('#load').style.display = "none";
        }).catch(err=> {
          document.querySelector('#load').style.display = "block";
          document.querySelector('#load').textContent = "Error while fetching data";
        });
      }, 3000);
    } else {
      location.reload();
      document.querySelector('#load').style.display = "none";
      document.querySelector('#load').textContent = "Please enter a country";
    }
  });
  document.querySelector("span").addEventListener('click',
    function() {
      document.querySelector("#info").style.display = "none";
    });
  document.querySelector('footer').innerHTML = "&copy; "+year+" built by Emmanuel Emejulu, founder and CEO of JUEsoft.";
}
