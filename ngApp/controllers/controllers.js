var troothy;
(function (troothy) {
    var Controllers;
    (function (Controllers) {
        var LoginController = (function () {
            function LoginController(userService, $window, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
                this.contenders = [
                    { id: 1, name: "booker", image: 'http://www.followthegls.com/wp-content/uploads/2017/06/Booker_Credit-Kelly-Campbell.jpg' },
                    { id: 2, name: "trump", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Donald_Trump_Pentagon_2017.jpg/440px-Donald_Trump_Pentagon_2017.jpg' },
                    { id: 3, name: "kasich", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Governor_John_Kasich.jpg/440px-Governor_John_Kasich.jpg' }
                ];
            }
            LoginController.prototype.login = function () {
                if (this.isAdmin === true) {
                    this.userInfo.role = 'admin';
                    this.createSession();
                }
                else {
                    this.userInfo.role = 'guest';
                    this.createSession();
                }
            };
            LoginController.prototype.createSession = function () {
                var _this = this;
                this.userService.loginUser(this.userInfo).then(function (data) {
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    _this.$state.go('home');
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(userService) {
                this.userService = userService;
            }
            RegisterController.prototype.signup = function () {
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var HomeController = (function () {
            function HomeController(politicianService) {
                this.politicianService = politicianService;
                var token = window.localStorage['token'];
                if (token) {
                    this.payload = JSON.parse(window.atob(token.split('.')[1]));
                    console.log(this.payload);
                }
            }
            HomeController.prototype.getPoliticians = function () {
                var _this = this;
                this.politicianService.getPoliticians(this.category).then(function (result) {
                    _this.politicians = result;
                });
            };
            HomeController.prototype.deletePolitician = function (politicianId) {
                if (this.payload.role === 'admin') {
                    this.politicianService.removePolitician(politicianId);
                }
                else {
                    alert('Denied. Admins Only!');
                }
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var AddPoliticianController = (function () {
            function AddPoliticianController(politicianService) {
                this.politicianService = politicianService;
                var token = window.localStorage['token'];
                if (token) {
                    this.payload = JSON.parse(window.atob(token.split('.')[1]));
                    console.log(this.payload);
                }
            }
            AddPoliticianController.prototype.addPolitician = function () {
                if (this.payload.role === 'admin') {
                    this.politicianService.savePolitician(this.politician);
                }
                else {
                    alert('Denied. Admins Only!');
                }
            };
            return AddPoliticianController;
        }());
        Controllers.AddPoliticianController = AddPoliticianController;
        var EditPoliticianController = (function () {
            function EditPoliticianController($stateParams, politicianService) {
                this.$stateParams = $stateParams;
                this.politicianService = politicianService;
                this.id = $stateParams['id'];
                var token = window.localStorage['token'];
                if (token) {
                    this.payload = JSON.parse(window.atob(token.split('.')[1]));
                    console.log(this.payload);
                }
                this.politician = this.politicianService.get(this.id);
            }
            EditPoliticianController.prototype.editPolitician = function () {
                if (this.payload.role === 'admin') {
                    this.politician._id = this.id;
                    this.politicianService.savePolitician(this.politician);
                    console.log(this.politician);
                }
                else {
                    alert('Denied. Admins only!');
                }
            };
            return EditPoliticianController;
        }());
        Controllers.EditPoliticianController = EditPoliticianController;
        var PoliticianDetailController = (function () {
            function PoliticianDetailController($stateParams, politicianService, $state) {
                this.$stateParams = $stateParams;
                this.politicianService = politicianService;
                this.$state = $state;
                this.id = $stateParams['id'];
                this.details = this.politicianService.get(this.id);
            }
            PoliticianDetailController.prototype.addScores = function () {
            };
            PoliticianDetailController.prototype.addDetail = function () {
                this.politician = {};
                this.politician._id = this.id;
                this.$state.go('editDetail', { id: this.id });
            };
            return PoliticianDetailController;
        }());
        Controllers.PoliticianDetailController = PoliticianDetailController;
        var EditDetailController = (function () {
            function EditDetailController($stateParams, politicianService, $state) {
                this.$stateParams = $stateParams;
                this.politicianService = politicianService;
                this.$state = $state;
                this.politician = {};
                this.id = $stateParams['id'];
                this.details = this.politicianService.get(this.id);
            }
            EditDetailController.prototype.editDetails = function () {
                this.details._id = this.id;
                this.politicianService.saveDetails(this.details);
                console.log(this.details);
            };
            EditDetailController.prototype.viewUpdates = function () {
                this.politician._id = this.id;
                this.$state.go('politicianDetail', { id: this.id });
            };
            return EditDetailController;
        }());
        Controllers.EditDetailController = EditDetailController;
    })(Controllers = troothy.Controllers || (troothy.Controllers = {}));
})(troothy || (troothy = {}));
