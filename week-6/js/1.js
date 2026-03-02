//user interaction

//handling events
    //read elements
    let element=document.querySelector("h2")
    let btn=document.querySelector("button")
    let form=document.querySelector("form")
    let usernameInput=document.querySelector("input[type='text']")
    let passwordInput=document.querySelector("input[type='password']")
    let submitBtn=document.querySelector("button[type='submit']")


    //attach event listeners
    btn.addEventListener( 'click',()=>{
        element.textContent="hello world"
        element.style.color="blue"
    })

