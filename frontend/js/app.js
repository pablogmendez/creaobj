// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.tpl.html',
            controller: 'LoginControl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/dashboard.tpl.html'
        })
        .state('dashboard.creadorobjetos', {
            url: '/creadorobjetos',
            templateUrl: 'partials/creadorobjetos.tpl.html',
            controller: 'CreadorObjetosControl'
        })
        .state('dashboard.consolidarversion', {
            url: '/consolidarversion',
            templateUrl: 'partials/consolidarversion.tpl.html',
            controller: 'ConsolidarVersionControl'
        });

});