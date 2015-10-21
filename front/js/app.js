/**
 * Created by andr on 21.10.15.
 */
(function() {
  var
    backend = 'http://192.168.0.112:9876',
    json = {};

  function createLine(data) {
    var
      line = document.createElement('div'),
      ul = document.createElement('ul'),
      li = function(inner) {
        var
          el = document.createElement('li');

        if (typeof inner === 'object') {
          el.appendChild(inner);
        } else {
          el.innerHTML = inner;
        }

        //el.className = 'table-cell';

        return el;
      },
      img = document.createElement('img');

    img.src = data.image;
    img.alt = data.name;

    ul.appendChild(li(img)).className = 'table-cell photo';
    ul.appendChild(li(data.name)).className = 'table-cell name';
    ul.appendChild(li(data.maxWeight)).className = 'table-cell weight';
    ul.appendChild(li(data.predator)).className = 'table-cell predator';
    ul.appendChild(li(data.tags.toString())).className = 'table-cell tags';

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
