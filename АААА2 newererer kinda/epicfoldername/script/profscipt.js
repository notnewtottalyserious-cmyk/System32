        let cart = JSON.parse(localStorage.getItem('cart')) || []; // бета
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // не будет сделано
        let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
            name: "Гость",
            email: "",
            phone: "",
            password: "",
            joinDate: new Date().toLocaleDateString('ru-RU'),
            ordersCount: 0,
            totalSpent: 0,
            loginto: false,
            icon: "../cats/user.png"
        };
        let ICON = document.getElementById("icon")
        let Nick = document.getElementById("name")
        let Login = document.getElementById("login")
        let Phone = document.getElementById("call") 
        let Pass = document.getElementById("idk")
var parts = userProfile.password.split('');
var len = parts.length;
var chiffred = parts.map(function(val, index) {
  if (0 === index || (len - 1) === index) {

  }
  else {
val = '*';
  }
  return val;
});
chiffred = chiffred.join('');
        function update() {
            if(userProfile.loginto==true){
            ICON.innerHTML = `<img src ="${userProfile.icon}" alt="../cats/user.png">`
            Nick.innerText = userProfile.name
            Login.innerText = userProfile.email
            Phone.innerText = userProfile.phone
            Pass.innerText = chiffred
            }else{
            Nick.innerText = "Нет аккаунта"
            Login.innerText = ""
            Phone.innerText = ""
            Pass.innerText = "" 
        }
        }
        function saveProfile() {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
        window.addEventListener('load', () => {
    update()
    saveProfile()
    console.log(userProfile.loginto)
        });