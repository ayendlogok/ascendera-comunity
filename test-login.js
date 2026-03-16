const fetch = require('node-fetch');

async function testLogin() {
  const providers = await fetch('http://localhost:3000/api/auth/providers').then(r => r.json());
  console.log('Providers:', providers);
  
  const csrf = await fetch('http://localhost:3000/api/auth/csrf').then(r => r.json());
  console.log('CSRF:', csrf);

  const res = await fetch('http://localhost:3000/api/auth/callback/admin-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      csrfToken: csrf.csrfToken,
      email: 'admin.ascendera@community.go.id',
      password: 'ascendera2026',
      json: 'true',
    })
  });
  
  const data = await res.json();
  console.log('Login Response:', data);
}

testLogin().catch(console.error);
