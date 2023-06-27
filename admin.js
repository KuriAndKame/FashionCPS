const root = document.getElementById('root')
const domain = 'http://localhost:3000'

const loginPage = /*html*/ `
<form class  = "loginForm" onsubmit = "LoginSubmit(event)">
<div class="form-group">
  <label for="login">LogIn</label>
  <input type="email" class="form-control" id="login" aria-describedby="login" placeholder="login" name = "login">
  <small id="loginHelp" class="form-text text-muted">We'll never share your login with anyone else.</small>
</div>
<div class="form-group">
  <label for="password">Password</label>
  <input type="password" class="form-control" id="password" placeholder="Password" name = "password">
</div>
<button type="submit" class="btn btn-outline-dark">LogIn</button>
</form>`


function LoginsPage (fashioncp = []){ /*html*/`
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">email</th>
      <th scope="col">Password</th>
    </tr>
  </thead>
  <tbody>
    ${fashioncp.map((fashioncp) =>{
        return /*html*/`
        <tr>
            <th scope ="row">${fashioncp.id}</th>
            <th>${fashioncp.id}</th>
            <td>${fashioncp.eMail}</td>
            <td>${fashioncp.password}</td>
        </tr>
        `
    })}
  </tbody>
</table>
`
}


root.innerHTML = loginPage

async function LoginSubmit(event) {
    event.preventDefault()
    const form = event.target
    const loginValue = form.login.value;
    const passwordValue = form.password.value;
    const response = await fetch(`${domain}/api/LogIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: loginValue,
            password: passwordValue
        })
    })
    if (response.ok) {
        const tokenInfo = await response.json()
        localStorage.setItem('Token', tokenInfo.token)
        //renderLogIns()
        const logIn =  await response.json()
        root.innerHTML = LoginsPage(logIn)
    }
}

/*
async function renderLogIns(){
    const token = localStorage.setItem('Token')
    if(token){
        const response = await fetch (`${domain}/api/fashionCP`, {
            headers: {
                'Authorization': token
            }
        })
        if (response.ok){
            const logIn =  await response.json()
            root.innerHTML = LoginsPage(logIn)
        } else {
            root.innerHTML = loginPage
        }
    } else {
        root.innerHTML = loginPage 
    }
}
*/