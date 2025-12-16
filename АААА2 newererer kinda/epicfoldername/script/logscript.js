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
        let ILog = document.getElementById('login');
        let Password = document.getElementById('password');
        function login() {
            if(ILog.value!=='' && Password.value!==''){
            if(ILog.value==userProfile.email && Password.value==userProfile.password) {
                const regex = new RegExp("\\b" + ILog.value + "\\b", "i");
                const isWordPresent = regex.test(message);
                if (isWordPresent) {
                alert("Вы успешно вошли.. хотя я и не знаю как это делать")
                userProfile.loginto = true
                console.log(userProfile.loginto);
                
                saveProfile();
                }else{
                    alert("????, как тут-то неправильно получится?")
                }
            }else{
                alert("Неправильный логин или пароль")
            }
        }else{
            alert("Введите значения")
        }
        }

        let message = "Гость"
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