var troothy;
(function (troothy) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
            }
            UserService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            UserService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('troothy').service('userService', UserService);
        var PoliticianService = (function () {
            function PoliticianService($resource) {
                this.$resource = $resource;
                this.PoliticianResource = $resource('/api/politicians/:tag');
                this.DetailsResource = $resource('/api/politicians/details/:id');
            }
            PoliticianService.prototype.get = function (id) {
                console.log(id);
                return this.DetailsResource.query({ id: id });
            };
            PoliticianService.prototype.savePolitician = function (politician) {
                return this.PoliticianResource.save(politician);
            };
            PoliticianService.prototype.getPoliticians = function (category) {
                return this.PoliticianResource.query({ tag: category }).$promise;
            };
            PoliticianService.prototype.removePolitician = function (politicianId) {
                this.PoliticianResource.delete({ tag: politicianId });
            };
            return PoliticianService;
        }());
        Services.PoliticianService = PoliticianService;
        angular.module('troothy').service('politicianService', PoliticianService);
    })(Services = troothy.Services || (troothy.Services = {}));
})(troothy || (troothy = {}));
