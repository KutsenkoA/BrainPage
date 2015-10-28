/**
 * Created by andr on 21.10.15.
 */
(function(options) {
  var
    backend = options.backend || 'http://192.168.0.112:9876/json',
    pageSize = options.pageSize || 10,
    fishes = {},
    paginationPages = [],
    pages,
    filter,
    currentPage = 0,
    tableHeader = createHeader();

  function createHeader() {
    var
      header = createLine({
        name: '<span class="column-header text-primary" data-sort="name">Название</span>',
        maxWeight: '<span class="column-header text-primary" data-sort="maxWeight">Максимальный вес</span>',
        predator: '<span class="column-header text-primary" data-sort="predator">Хищник</span>',
        tags: '<span class="column-header text-primary" data-sort="tags">Тэги</span>'
      });

    var
      captions = header.getElementsByTagName('li');

    for (var i = 0; i < captions.length; i++) {
      captions[i].addEventListener('click', function(event) {
        var
          sort = event.target.dataset.sort,
          dir = event.target.dataset.dir ? event.target.dataset.dir : 'desc',
          sortAsc = function(fishA, fishB) {
            if (fishA[sort] < fishB[sort]) {
              return -1;
            } else {
              return 1;
            }
          },
          sortDsc = function(fishA, fishB) {
            if (fishA[sort] > fishB[sort]) {
              return -1;
            } else {
              return 1;
            }
          };

        event.target.dataset.dir = dir === 'desc' ? 'asc' : 'desc';

        if (sort) {
          fishes.sort(dir === 'desc' ? sortAsc : sortDsc);
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

    showFishes(0, pageSize, filterFishes());
  }

  function loadJson(url) {
    // load data from backend
    var
      xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        parseJson(xhr.responseText);
        createPagination();
        setupFilter();
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
      buttons,
      a,
      filtered = filterFishes();

    pages = Math.ceil(filtered.length / pageSize);


    if (filtered.length < pageSize) {
      pagHolder.style.display = 'none';
    } else {
      pagHolder.style.display = 'block';
      paginationList = document.getElementById('paginationList');
      buttons = paginationList.getElementsByTagName('LI');

      for (i = buttons.length - 1; i; i--) {
        if (buttons[i].id !== 'paginationFirst' && buttons[i].id !== 'paginationLast') {
          buttons[i].remove();
        }
      }

      for(i = 0; i < pages; i++) {
        button = document.createElement('li');
        a = document.createElement('a');

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

  function setupFilter() {
    var
      input = document.getElementById('fishFilter'),
      submit = document.getElementById('fishFilterSubmit'),
      clear = document.getElementById('fishFilterClear');

    submit.addEventListener('click', function() {
      filter = input.value;
      createPagination();
      pagination(currentPage);
    });

    clear.addEventListener('click', function() {
      filter = false;
      input.value = '';
      createPagination();
      pagination(currentPage);
    });
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

    showFishes(page * pageSize, page * pageSize + pageSize, filterFishes());

    if (page == 0) {
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

  function filterFishes() {
    return filter ? fishes.filter(function(fish) {
      return fish.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }) : fishes;
  }

  function showFishes(from, to, filtered) {
    var
      index = 0,
      noResults = document.getElementById('noResults'),
      table = document.getElementById('jsonTable');

    table.innerHTML = "";

    table.appendChild(tableHeader);

    noResults.style.display = filtered.length ? 'none' : 'block';

    filtered.forEach(function(fish) {
      if (index >= from && index < to) {
        table.appendChild(createLine(fish));
      }
      index++;
    });
  }


  loadJson(backend);

})({
  pageSize: 5,
  backend: '/json'
});


