var idToken = null;
var sites = null;
var isLoading = false;
var error = null;
var itemsPerPage = 4;
var currentPage = 0;
var BACKEND_URL = 'https://mint-flounder-crucial.ngrok-free.app';

document.getElementById('backend-iframe').src = BACKEND_URL + '/webflow_iframe';

function getSites() {
  document.getElementById('list-sites-btn').disabled = true;
  error = null;
  var request = new XMLHttpRequest();
  request.open('GET', BACKEND_URL + '/api/getSites', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('WF-Authorization', idToken);
  request.onload = function() {
    if (request.status !== 200) {
      error = 'Failed to load sites';
      console.error(error);
    } else {
      sites = JSON.parse(request.responseText).sites;
      populateSitesList();
    }
    document.getElementById('list-sites-btn').disabled = false;
  };
  request.onerror = function() {
    error = 'Failed to load sites';
    console.error(error);
    document.getElementById('list-sites-btn').disabled = false;
  };
  request.send();
  document.getElementById('loading-message').style.display = 'block';
}

function populateSitesList() {
  var list = document.getElementById('sites-list');
  list.innerHTML = '';
  if (Array.isArray(sites)) {
    for (var i = 0; i < itemsPerPage; i++) {
      var index = currentPage * itemsPerPage + i;
      if (index >= sites.length) {
        break;
      }
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(sites[index].displayName));
      list.appendChild(li);
    }
  }
  updateButtons();
  document.getElementById('loading-message').style.display = 'none';
}

function nextPage() {
  if ((currentPage + 1) * itemsPerPage < sites.length) {
    currentPage++;
    populateSitesList();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    populateSitesList();
  }
}

function updateButtons() {
  var nextBtn = document.getElementById('next-btn');
  var prevBtn = document.getElementById('prev-btn');

  if ((currentPage + 1) * itemsPerPage < sites.length) {
    nextBtn.style.display = 'inline-block';
    nextBtn.disabled = false;
  } else {
    nextBtn.style.display = 'none';
  }

  if (currentPage > 0) {
    prevBtn.style.display = 'inline-block';
    prevBtn.disabled = false;
  } else {
    prevBtn.style.display = 'none';
  }
}

window.addEventListener('message', function(event) {
  if (event.origin !== BACKEND_URL) {
    return;
  }
  try {
    var token = event.data.idToken;
    if (token) {
      idToken = token;
      document.getElementById('authenticated-content').style.display = 'block';
      document.getElementById('unauthenticated-content').style.display = 'none';
      window.removeEventListener('message', arguments.callee);
    }
  } catch (err) {
    console.error('Error handling message event:', err);
  }
});
