namespace troothy.Controllers {

    export class LoginController {
      public userInfo
      public isAdmin
      public contenders


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
        public $state,

      ) {
        this.contenders = [
          {id:1, name:"booker", image:'http://www.followthegls.com/wp-content/uploads/2017/06/Booker_Credit-Kelly-Campbell.jpg'},
          {id:2, name:"trump", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Donald_Trump_Pentagon_2017.jpg/440px-Donald_Trump_Pentagon_2017.jpg'},
          {id:3, name:"kasich", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Governor_John_Kasich.jpg/440px-Governor_John_Kasich.jpg'},
          {id:4, name: "sanders", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bernie_Sanders.jpg/440px-Bernie_Sanders.jpg'},
          {id:5, name: "king", image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Angus_King%2C_official_portrait%2C_113th_Congress.jpg/440px-Angus_King%2C_official_portrait%2C_113th_Congress.jpg'}
        ]
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
        // this.politician = this.politicianService.get(this.id);
        this.politicianService.get(this.id).then((result) => {
          this.politician = result;
      })
    }
  }

    export class PoliticianDetailController {
      public politician
      public id
      public details
      public troothyScore

      addScores() {

      }

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
        // this.details = this.politicianService.get(this.id);
        this.politicianService.get(this.id).then((result) => {
          this.details = result;
          let total = 0;
          for(let props in result) {
            if(props === 'classMssg' || props === 'eduMssg' || props === 'envirMssg'||
          props === 'hcMssg' || props === 'immigMssg' || props === 'militMssg'|| props === 'envirMssg' ||
          props === 'scitechMssg' || props === 'socialMssg' || props === 'spendMssg' ||
          props === 'xFactorMssg') {
            total += parseFloat(result[props].Score);
            }
          }
          this.troothyScore = total;

        })
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
        this.politician = {}
        this.politician._id = this.id
        this.$state.go('politicianDetail', {id: this.id} );
         }

      constructor(
        public $stateParams,
        private politicianService,
        public $state
      ) {
        this.id = $stateParams['id'];
        // this.details = this.politicianService.get(this.id);
        this.politicianService.get(this.id).then((result) => {
          this.details = result;
      })
    }
  }
}
