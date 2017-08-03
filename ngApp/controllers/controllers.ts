namespace troothy.Controllers {

    export class LoginController {
      public userInfo
      public isAdmin

      public login() {
        if(this.isAdmin === true) {
          this.userInfo.role = 'admin';
          this.createSession();
        } else {
          this.userInfo.role = 'guest';
          this.createSession();
        }
      }

      public createSession() {
        this.userService.loginUser(this.userInfo).then((data) => {
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
          this.$state.go('home');
        })
      }

      public constructor(
        private userService,
        public $window,
        public $state
      ) {

      }
    }

    export class RegisterController {
      public user

      public signup() {
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
        })
      }

      public constructor(
        private userService
      ) {

      }
    }

    export class HomeController {
      public payload

      public politicians
      public category

      public getPoliticians() {
        this.politicianService.getPoliticians(this.category).then((result) => {
          this.politicians = result;
        })
      }

      public deletePolitician(politicianId) {
        if(this.payload.role === 'admin') {
        this.politicianService.removePolitician(politicianId);
      } else {
        alert('Denied. Admins Only!')
      }
    }

      constructor(
        private politicianService
      ) {
        let token = window.localStorage['token'];

        if(token) {
          this.payload = JSON.parse(window.atob(token.split('.')[1]));
          console.log(this.payload);

        }
      }
    }

    export class AddPoliticianController {
      public politician
      public payload

      public addPolitician() {
        if (this.payload.role === 'admin') {
      this.politicianService.savePolitician(this.politician);
      } else {
      alert('Denied. Admins Only!')
        }
    }

      constructor(
        private politicianService
      ) {
        let token = window.localStorage['token'];

        if (token) {
          this.payload = JSON.parse(window.atob(token.split('.')[1]));
          console.log(this.payload);
        }
      }
    }

    export class EditPoliticianController {
      public payload
      public politician
      public id
      // public politicians

      public editPolitician() {
        if (this.payload.role === 'admin') {
      this.politician._id = this.id
      this.politicianService.savePolitician(this.politician)
      console.log(this.politician);
      } else {
      alert('Denied. Admins only!')
       }
    }

      constructor(
        public $stateParams,
        private politicianService
      ) {
        this.id = $stateParams['id'];

        let token = window.localStorage['token'];

        if (token) {
          this.payload = JSON.parse(window.atob(token.split('.')[1]));
          console.log(this.payload);
        }
      }
    }

    export class PoliticianDetailController {
      public politician
      public id
      public details

      public addDetail() {
      this.politician = {}
      this.politician._id = this.id
      this.$state.go('editDetail', {id: this.id} );
      }

      constructor(
        public $stateParams,
        private politicianService,
        public $state
      ) {
        this.id = $stateParams['id'];
        this.details = this.politicianService.get(this.id);

      }
    }

    export class EditDetailController {
      public politician
      public id
      public details


      public editDetails() {
      this.details._id = this.id
      this.politicianService.saveDetails(this.details)
      console.log(this.details)
      }

      public viewUpdates() {
        this.politician._id = this.id
        this.$state.go('politicianDetail', {id: this.id} );
         }

      constructor(
        public $stateParams,
        private politicianService,
        public $state
      ) {
        this.politician = {}
        this.id = $stateParams['id'];
        this.details = this.politicianService.get(this.id);
      }
    }
}
