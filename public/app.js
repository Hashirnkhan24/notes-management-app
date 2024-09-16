$(document).ready(function() {
  showLoginForm(); 
});

function showLoginForm() {
  $('body').empty();
  $('body').append(`
      <div id="login-form">
        <h2>Login</h2>
        <input type="text" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <button id="login-btn">Login</button>
        <p>Don't have an account? <span id="register-link">Register</span></p>
      </div>
  `);

  $('#login-btn').click(function() {
      const email = $('#email').val();
      const password = $('#password').val();

      $.ajax({
        url: 'http://localhost:3000/api/auth/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        success: function(response) {
          localStorage.setItem('token', response.token);
          loadNotesPage(); 
        },
        error: function() {
          alert('Login failed');
        }
      });
  });

  $('#register-link').click(function() {
      showRegistrationForm(); 
  });
}

function showRegistrationForm() {
  $('body').empty();
  $('body').append(`
      <div id="registration-form">
        <h2>Register</h2>
        <input type="text" id="reg-email" placeholder="Email">
        <input type="password" id="reg-password" placeholder="Password">
        <button id="register-btn">Register</button>
        <p>Already have an account? <span id="login-link">Login</span></p>
      </div>
  `);

  $('#register-btn').click(function() {
      const email = $('#reg-email').val();
      const password = $('#reg-password').val();

      $.ajax({
        url: 'http://localhost:3000/api/auth/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        success: function() {
          alert('Registration successful! Please login.');
          showLoginForm(); 
        },
        error: function() {
          alert('Registration failed');
        }
      });
  });

  $('#login-link').click(function() {
      showLoginForm();  
  });
}

function loadNotesPage() {
  $('body').empty();
  $('body').append(`
    <div id="notes-page">
      <h2>Your Notes</h2>
      <ul id="notes-list"></ul>
      <textarea id="new-note-content" placeholder="New note"></textarea>
      <button id="add-note-btn">Add Note</button>
      <button id="logout-btn">Logout</button>
    </div>
  `);

  const token = `Bearer ${localStorage.getItem('token')}`;

  // Fetch Notes
  $.ajax({
      url: 'http://localhost:3000/api/notes',
      method: 'GET',
      headers: { 'Authorization': `${token}` },
      success: function(notes) {
          notes.forEach(note => {
              $('#notes-list').append(`<li>${note.content}</li>`);
          });
      },
      error: function() {
          alert('Failed to load notes');
      }
  });

  // Add Note
  $('#add-note-btn').click(function() {
      const content = $('#new-note-content').val();

      $.ajax({
          url: 'http://localhost:3000/api/notes',
          method: 'POST',
          contentType: 'application/json',
          headers: {
            'Authorization': `${token}`
          },
          data: JSON.stringify({ content }),
          success: function(note) {
              $('#notes-list').append(`<li>${note.content}</li>`);
              $('#new-note-content').val('');
          },
          error: function() {
              alert('Failed to add note');
          }
      });
  });

  // Logout
  $('#logout-btn').click(function() {
      localStorage.removeItem('token');  
      showLoginForm();  
  });
}
