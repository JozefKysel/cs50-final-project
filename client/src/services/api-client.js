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
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });

exports.saveBookToRead = book =>
  fetch('http://localhost:5000/booktoread', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: book
  });
