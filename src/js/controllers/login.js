angular
    .module('app', ['toaster', 'ngAnimate'])
    .controller("LoginFormController", LoginFormController);

function LoginFormController($scope, $http, $location, authenticationService, toaster) {
    $scope.submitted = false;
    localStorage.clear();
    $scope.loginForm = {
        username: "",
        password: "",
        tahunAnggaran: "",
        captcha: null
    };
    $scope.captchaValue = "";

    $scope.randomCaptcha = function (length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        $scope.captchaValue = result;
        return result;
    };
    $scope.randomCaptcha(5);
    $scope.loginFunction = function (form) {
        document.getElementById('login-loader').style.display = 'inline';
        console.log(form.$valid);
        if (!form.$valid) {
            console.log('Form Not Valid');
            $scope.submitted = true;
            document.getElementById('login-loader').style.display = 'none';
            return;
        }
        $scope.submitted = false;
        console.log('Form Valid');
        console.log('Login Function');
        authenticationService.login($scope.loginForm.username, $scope.loginForm.password, function (result) {
            console.log('result login');
            console.log(result);
            if (result.status === 200) {
                console.log(result.data);
                // $localStorage.setItem('currentUser', result.data);
                // $localStorage.put('currentUser', result.data);
                // $localStorage.put('myKey', 'myValue');
                // $localStorage.setItem('currentUser', JSON.stringify(response.data));
                localStorage.setItem('currentUser', JSON.stringify(result.data));
                localStorage.setItem('tahunAnggaran', $scope.loginForm.tahunAnggaran);
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil Login',
                    body: 'Selamat Datang',
                    timeout: 3000
                });
                // $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
                $location.path('/kas-blud');
            } else if (result.status === 400) {
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal Login',
                    body: 'Periksa kembali User / Password',
                    timeout: 3000
                });
                document.getElementById('login-loader').style.display = 'none';
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Gagal Login',
                    body: 'Hubungi Admin',
                    timeout: 3000
                });
                document.getElementById('login-loader').style.display = 'none';
            }
        });
    };

    $scope.styleHeaderLogin = {
        'background-image': `url(../../img/login_bg.jpeg)`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'filter': 'blur(5px)',
        '-webkit-filter': 'blur(5px)',
        'height': '100%'
    };

    $scope.bgText = {
        'background-color': 'rgb(0,0,0)', /* Fallback color */
        'background-color': 'rgba(0,0,0, 0.4)', /* Black w/opacity/see-through */
        'color': 'white',
        'font-weight': 'bold',
        'border': '3px solid #f1f1f1',
        'top': '50%',
        'left': '50%',
        'position': 'absolute',
        'transform': 'translate(-50%, -50%)',
        'z-index': '2',
        'width': '80%',
        'padding': '20px',
        'text-align': 'center'
    };

    // Only Number
    $scope.onlyNumberKey = function (event) {
        if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
            toaster.pop({
                type: 'warning',
                title: 'Hanya Angka',
                body: 'Tidak Bisa Input Selain Angka',
                timeout: 5000
            });
            event.preventDefault();
        }
    };
}
