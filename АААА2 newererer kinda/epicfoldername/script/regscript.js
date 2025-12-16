function saveProfile() {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || []; // бета
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // не будет сделано
        let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
            id: 0,
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
        let regs = document.getElementsByClassName('reg');
        let IName = document.getElementById('username');
        let ILog = document.getElementById('login');
        let IPhone = document.getElementById('phone')
        let Password = document.getElementById('password');
        let Repassword = document.getElementById('repassword');
        let ICON = document.getElementById('icon');
        function register() {
            if(IName.value!=='' && ILog.value!=='' && Password.value!=='' && Repassword.value==Password.value) {
                const regex = new RegExp("\\b" + ILog.value + "\\b", "i");
                const isWordPresent = regex.test(message);
                if (!isWordPresent) {
                alert("Вы успешно зарегистрировались")
                userProfile.name = IName.value
                userProfile.email = ILog.value
                userProfile.phone = IPhone.value
                userProfile.password = Password.value
                userProfile.loginto = false // чтоб пришлось входить >:)

                    validateFileType()

                console.log(userProfile.loginto)
                saveProfile();
                test();
                }else{
                    alert("Под данным Email уже существует аккаунт???")
                }
            }
        }
let message = "Гость"
test()
        function test() {
        
        var arr = {...JSON.parse(localStorage.getItem('userProfile')).email}
        const keys = Object.keys(arr)
        message = keys.map(function(val, index) {
            
            if(val==arr[val]){
                kry = ""
            }else{
                kry = arr[index]
            }
            return kry+"";}).join('')
            console.log(message)
    }

function validateFileType() {
    const input = document.getElementById("icon");
    const file = input.files[0];

    if (!file) {
        return;
    }

    const fileName = file.name;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot).toLowerCase();

    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
        const reader = new FileReader();
        reader.onload = function(e) {
            userProfile.icon = e.target.result;
            saveProfile();
        };
        reader.readAsDataURL(file);
    } else {
        alert("Only jpg/jpeg and png files are allowed!");
        input.value = "";
    }
}