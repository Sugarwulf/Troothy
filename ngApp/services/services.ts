namespace troothy.Services {
  export class UserService {
        public LoginResource
        public SignUpResource

        public registerUser(userObj) {
          return this.SignUpResource.save(userObj).$promise;
        }

        public loginUser(userInfo) {
          return this.LoginResource.save(userInfo).$promise;
        }

        constructor(private $resource:ng.resource.IResourceService){
          this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
          this.SignUpResource = this.$resource('/userRoutes/api/Register');
        }

      }


      angular.module('troothy').service('userService', UserService);

      export class PoliticianService {
        // public id
        public PoliticianResource
        public DetailsResource

        public get(id) {
          console.log(id)
        return this.DetailsResource.query({id:id})
      }

        public savePolitician(politician) {
         return this.PoliticianResource.save(politician);
        }

        public getPoliticians(category) {
          return this.PoliticianResource.query({tag: category}).$promise;
        }

        public removePolitician(politicianId) {
          this.PoliticianResource.delete({tag:politicianId});
        }
        public constructor(
          public $resource
        ) {
        this.PoliticianResource = $resource('/api/politicians/:tag');
        this.DetailsResource = $resource('/api/politicians/details/:id');
        }

      }

      angular.module('troothy').service('politicianService', PoliticianService);
    }
