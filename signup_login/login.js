      // const email = document.getElementById("email")
      const pass = document.getElementById("pass")
      const btnE1 =document.getElementById("btn")
      const forme1 = document.getElementById("form")
     
      form.addEventListener("submit", (event) => {
          event.preventDefault();
          log();
      });
     
      function log() {
          const userEmail = email.value
          const userPassword = pass.value; 
     
          if (userEmail === "" || userPassword === "") {
              alert("Email and Password Missing!!")
          }
          else {
              const userInfo = JSON.parse(localStorage.getItem("userData"));
     
              const findUser = userInfo.find((user)=>
              user.email === userEmail && user.pass === userPassword
              );
              if (findUser) {
                  alert("You are logged in.");
              }
              else {
                  alert("Invalid");
              }
          }
     }
     
     
     
     let btn =   document.querySelector('button');
      btn.addEventListener ('click', shoMsg);
     
      const fixUsername = 'Neha';
      const fixPassword = 'London7759'; 
      function shoMsg (){
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
     
      if(username === fixUsername && password === fixPassword) {
          alert("you are login to this...");
      }
      else{
          alert("Incorrect Username or Password")
      }
      }