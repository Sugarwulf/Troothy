var troothy;
(function (troothy) {
    var Controllers;
    (function (Controllers) {
        angular.module('troothy', ['ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('login', {
                url: '/',
                templateUrl: '/ngApp/views/login.html',
                controller: troothy.Controllers.LoginController,
                controllerAs: 'vm'
            })
                .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: troothy.Controllers.RegisterController,
                controllerAs: 'vm'
            })
                .state('home', {
                url: '/home',
                templateUrl: '/ngApp/views/home.html',
                controller: troothy.Controllers.HomeController,
                controllerAs: 'vm'
            })
                .state('add', {
                url: '/add',
                templateUrl: '/ngApp/views/addPolitician.html',
                controller: troothy.Controllers.AddPoliticianController,
                controllerAs: 'vm'
            })
                .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/editPolitician.html',
                controller: troothy.Controllers.EditPoliticianController,
                controllerAs: 'vm'
            })
                .state('addDetail', {
                url: '/addDetail/:id',
                templateUrl: '/ngApp/views/addDetail.html',
                controller: troothy.Controllers.AddDetailController,
                controllerAs: 'vm'
            })
                .state('editDetail', {
                url: '/editDetail/:id',
                templateUrl: '/ngApp/views/editDetail.html',
                controller: troothy.Controllers.EditDetailController,
                controllerAs: 'vm'
            })
                .state('politicianDetail', {
                url: '/politicianDetail/:id',
                templateUrl: '/ngApp/views/politicianDetail.html',
                controller: troothy.Controllers.PoliticianDetailController,
                controllerAs: 'vm'
            })
                .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });
            $urlRouterProvider.otherwise('/notFound');
            $locationProvider.html5Mode(true);
        });
    })(Controllers = troothy.Controllers || (troothy.Controllers = {}));
})(troothy || (troothy = {}));
