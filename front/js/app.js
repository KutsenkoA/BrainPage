/**
 * Created by andr on 21.10.15.
 */
(function() {
  var
    backend = 'http://192.168.0.112:9876',
    json = {};

  function createLine(data) {
    var
      line = document.createElement('DIV'),
      ul = document.createElement('UL'),
      li = function(inner) {
        var
          el = document.createElement('LI');

        if (typeof inner === 'object') {
          el.appendChild(inner);
        } else {
          el.innerHTML = inner;
        }

        el.className = 'table-cell';

        return el;
      },
      img = document.createElement('IMG');

    img.src = data.image;

    ul.appendChild(li(img));
    ul.appendChild(li(data.name));
    ul.appendChild(li(data.maxWeight));
    ul.appendChild(li(data.predator));
    ul.appendChild(li(data.tags.toString()));

    ul.className = 'table-row-content';

    line.appendChild((ul));

    line.className = 'table-row';

    return line;
  }

  // load data from backend
  var
    xhr = new XMLHttpRequest(),
    table = document.getElementById('jsonTable');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

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
