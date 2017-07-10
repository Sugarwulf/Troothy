namespace troothy.Controllers {

  angular.module('troothy', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider
  ) => {
      // Define routes
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

          .state('politician', {
              url: '/politician/:id',
              templateUrl: '/ngApp/views/politician.html',
              controller: troothy.Controllers.PoliticianController,
              controllerAs: 'vm'
          })
          .state('notFound', {
              url: '/notFound',
              templateUrl: '/ngApp/views/notFound.html'
          });

      // Handle request for non-existent route
      $urlRouterProvider.otherwise('/notFound');

      // Enable HTML5 navigation
      $locationProvider.html5Mode(true);
  });



}
