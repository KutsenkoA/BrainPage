/**
 * Created by andr on 21.10.15.
 */
(function(options) {
  var
    backend = options.backend || 'http://192.168.0.112:9876',
    pageSize = options.pageSize || 10,
    fishes = {},
    paginationPages = [],
    pages,
    currentPage = 0,
    tableHeader = createHeader();

  function createHeader() {
    var
      header = createLine({
        name: '<button type="button" class="btn btn-primary" data-sort="name">Название</button>',
        maxWeight: '<button type="button" class="btn btn-primary" data-sort="maxWeight">Максимальный вес</button>',
        predator: '<button type="button" class="btn btn-primary" href="#" data-sort="predator">Хищник</button>',
        tags: '<button type="button" class="btn btn-primary" href="#" data-sort="tags">Тэги</button>'
      });

    var
      captions = header.getElementsByTagName('LI');

    for (var i = 0; i < captions.length; i++) {
      captions[i].addEventListener('click', function(event) {
        var
          sort = event.target.dataset.sort;

        if (sort) {
          fishes.sort(function(fishA, fishB) {
            if (fishA[sort] < fishB[sort]) {
              return -1;
            } else {
              return 1;
            }
          });

          pagination(currentPage);
        }
      });
    }

    return header;
  }

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

        return el;
      },
      img = document.createElement('img'),
      predator;

    if (data.image) {
      img.src = data.image;
      img.alt = data.name;
    } else {
      img = 'Фото';
    }

    console.log('[app 74]', typeof data.predator);

    if (typeof data.predator == 'boolean' && !data.predator) {
      data.predator = 'Нет';
    } else if (typeof data.predator == 'boolean' && data.predator) {
      data.predator = 'Да';
    }

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

  function parseJson(data) {

    try {
      fishes = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }

    showFishes(0, pageSize);
  }

  function loadJson(url) {
    // load data from backend
    var
      xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        parseJson(xhr.responseText);
        createPagination();
      }
    };

    xhr.open('GET', url);
    xhr.send();
  }

  function createPagination() {
    var
      pagHolder = document.getElementById('paginationHolder'),
      pagLast = document.getElementById('paginationLast'),
      pagFirst = document.getElementById('paginationFirst'),
      paginationList,
      i,
      button,
      a;

    pages = Math.ceil(fishes.length / pageSize);

    if (fishes.length < pageSize) {
      pagHolder.remove();
    } else {
      paginationList = document.getElementById('paginationList');

      for(i = 0; i < pages; i++) {
        button = document.createElement('LI');
        a = document.createElement('A');

        a.className = 'pag_button';
        a.setAttribute('href', '#');
        a.dataset.page = i;
        a.innerText = i + 1;

        button.appendChild(a);
        button.addEventListener('click', pagination);

        if (!i) {
          button.className = 'active';
        }

        paginationPages.push(button);

        paginationList.insertBefore(button, pagLast);
      }

      pagFirst.addEventListener('click', function() {
        pagination(0);
      });
      pagLast.addEventListener('click', function() {
        pagination(pages - 1);
      });
    }

  }

  function pagination(param) {
    var
      page = typeof param === 'object' ? param.target.dataset.page : param,
      paginationFirst = document.getElementById('paginationFirst'),
      paginationLast = document.getElementById('paginationLast');

    if (typeof param === 'object' && param.className === 'disabled') {
      return;
    }

    currentPage = page;

    paginationPages.forEach(function(button) {
      button.className = '';
    });

    showFishes(page * pageSize, page * pageSize + pageSize);

    if (page == 0) {
      console.log(paginationFirst);
      paginationPages[0].className = 'active';
      paginationFirst.className = 'disabled';
      paginationLast.className = '';
    } else if (page === pages - 1) {
      paginationFirst.className = '';
      paginationLast.className = 'disabled';
      console.log(paginationLast.previousSibling);
      paginationLast.previousSibling.className = 'active';
    } else {
      paginationLast.className = '';
      paginationFirst.className = '';
      paginationPages[page].className = "active";
    }
  }

  function showFishes(from, to) {
    var
      index = 0,
      table = document.getElementById('jsonTable');

    table.innerHTML = "";

    table.appendChild(tableHeader);

    fishes.forEach(function(fish) {
      if (index >= from && index < to) {
        table.appendChild(createLine(fish));
      }
      index++;
    });
  }


  loadJson(backend);

})({
  pageSize: 5
});


