/**
 * Created by andr on 21.10.15.
 */
(function() {
  var
    backend = 'http://192.168.0.112:9876';

  function createLine(data) {
    var
      line = document.createElement('DIV'),
      ul = document.createElement('UL'),
      li = function(text) {
        var
          el = document.createElement('LI');

        el.innerText = text;

        return el;
      };

    ul.appendChild(li(data.name));
    ul.appendChild(li(data.maxWeight));
    ul.appendChild(li(data.predator));
    ul.appendChild(li(data.tags));

    line.appendChild((ul));

    return line;
  }

  // load data from backend
  var
    xhr = new XMLHttpRequest(),
    table = document.getElementById('jsonTable');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var
        json = {};

      try {
        json = JSON.parse(xhr.responseText);
      } catch (err) {
        console.log(err);
      }

      json.forEach(function(fish) {
        table.appendChild(createLine(fish));
      })
    }
  };

  xhr.open('GET', backend);
  xhr.send();

})();
