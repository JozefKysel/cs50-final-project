const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
}

exports.registerUser = (username, email, password) =>
  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  });

exports.loginUser = (username, password) =>
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify  ({
      username: username,
      password: password
    })
  });

exports.searchForBooks = name =>
  fetch('http://localhost:5000/search?q=' + name, {
    method: 'GET',
    headers: getHeaders()
  });

exports.saveBookToRead = book =>
  fetch('http://localhost:5000/booktoread', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(book)
  });

exports.fetchMyBooks = (completed) => {
  const url = completed ? 'http://localhost:5000/mybooks?q=' + completed : 'http://localhost:5000/mybooks';
  return fetch(url, {
    method: 'GET',
    headers: getHeaders()
  });
};

exports.markAsRead = book =>
  fetch('http://localhost:5000/markasread', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(book)
  })
