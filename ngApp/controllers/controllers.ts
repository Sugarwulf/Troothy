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

      // public create() {
      //   if(this.payload.role === 'admin') {
      //     alert('Success!');
      //   } else {
      //     alert('Denied. admins only.')
      //   }
      // }

      // public read() {
      //   alert('Success!');
      // }

      public getPoliticians() {
        this.politicianService.getPoliticians(this.category).then((result) => {
          this.politicians = result;
        })
      }

      // public update() {
      //   if(this.payload.role === 'admin') {
      //     alert('Success!');
      //   } else {
      //     alert('Denied. admins only.')
      //   }
      // }

      public deletePolitician(politicianId) {
        this.politicianService.removePolitician(politicianId);
      }

      // public delete() {
      //   if(this.payload.role === 'admin') {
      //     alert('Success!');
      //   } else {
      //     alert('Denied. admins only.')
      //   }
      // }

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

      public addPolitician() {
      this.politicianService.savePolitician(this.politician);
      }

      constructor(
        private politicianService
      ) {

      }

    }

    export class EditPoliticianController {
      public politician
      public id
      public editPolitician() {
      this.politician._id = this.id
      this.politicianService.savePolitician(this.politician)
      }

      constructor(
        public $stateParams,
        private politicianService
      ) {
        this.id = $stateParams['id'];
      }

    }

    export class AddDetailController {

    }

    export class PoliticianDetailController {
      public politician
      public id
      public $state

      public addDetail(id) {
      this.politician._id = this.id
      this.id = {};
      this.$state.go('addDetail', {id: this.id} );
      }



      constructor(
        public $stateParams,
        private politicianService
      ) {
        this.id = $stateParams['id'];
      }
    }

}
