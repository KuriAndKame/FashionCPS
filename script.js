console.log('Hello Alexander Sergeevich!')
let Registration = document.getElementById('Regestration') 
let menuBtn = document.querySelector('.class-1')
let menuList = document.querySelector('.menu-list')


menuBtn.onclick = function(){
    menuList.classList.toggle('show')
}

document.getElementById("registration").addEventListener('click', function(event){
    linkHandler(event, 'registration')
})

document.getElementById("buying").addEventListener('click', function(event){
    linkHandler(event, 'buying')
})

document.getElementById("looks").addEventListener('click', function(event){
    linkHandler(event, 'looks')
    document.querySelector('.services').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
})


function linkHandler(event, className){
    event.preventDefault()
}

const btnReg = document.getElementById('btn-reg')

btnReg.onclick = function(){
    const userReg = document.getElementById('userRegg')
    const eMail = userReg.eMail.value
    const password = userReg.password.value 
    const logIn = {
        eMail: eMail,
        password
    }
    const logInJSON = JSON.stringify(logIn)
    //console.log(logInJSON)
    fetch('http://localhost:3000').then(function(response){
        if (response.ok){
            return response.text()
        }
    }).then(function(text){
        console.log(text)
    })
    
}