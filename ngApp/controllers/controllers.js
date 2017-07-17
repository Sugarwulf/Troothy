var troothy;
(function (troothy) {
    var Controllers;
    (function (Controllers) {
        var LoginController = (function () {
            function LoginController(userService, $window, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
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
                this.politicianService.removePolitician(politicianId);
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var AddPoliticianController = (function () {
            function AddPoliticianController(politicianService) {
                this.politicianService = politicianService;
            }
            AddPoliticianController.prototype.addPolitician = function () {
                this.politicianService.savePolitician(this.politician);
            };
            return AddPoliticianController;
        }());
        Controllers.AddPoliticianController = AddPoliticianController;
        var EditPoliticianController = (function () {
            function EditPoliticianController($stateParams, politicianService) {
                this.$stateParams = $stateParams;
                this.politicianService = politicianService;
                this.id = $stateParams['id'];
            }
            EditPoliticianController.prototype.editPolitician = function () {
                this.politician._id = this.id;
                this.politicianService.savePolitician(this.politician);
            };
            return EditPoliticianController;
        }());
        Controllers.EditPoliticianController = EditPoliticianController;
        var AddDetailController = (function () {
            function AddDetailController() {
            }
            return AddDetailController;
        }());
        Controllers.AddDetailController = AddDetailController;
        var PoliticianDetailController = (function () {
            function PoliticianDetailController($stateParams, politicianService) {
                this.$stateParams = $stateParams;
                this.politicianService = politicianService;
                this.id = $stateParams['id'];
            }
            PoliticianDetailController.prototype.addDetail = function (id) {
                this.politician._id = this.id;
                this.id = {};
                this.$state.go('addDetail', { id: this.id });
            };
            return PoliticianDetailController;
        }());
        Controllers.PoliticianDetailController = PoliticianDetailController;
    })(Controllers = troothy.Controllers || (troothy.Controllers = {}));
})(troothy || (troothy = {}));
