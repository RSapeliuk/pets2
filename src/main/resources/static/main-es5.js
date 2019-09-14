(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Test routes</h1>\n<button mat-button routerLink=\"/login\">Login</button>\n<button mat-button *ngIf=\"isLogined\" routerLink=\"/user/:username/addPost\">Add Post</button>\n<hr>\n<hr>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/logination/logination.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/logination/logination.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"login()\">\n  <label>Name: </label> <br>\n  <input\n      #nameI=\"ngModel\"\n      type=\"text\"\n      name=\"name\"\n      placeholder=\"Enter your name\"\n      [(ngModel)]=\"user.username\"> <br>\n  <label>Password: </label> <br>\n  <input type=\"text\"\n         name=\"password\"\n         placeholder=\"Enter your password\"\n         [(ngModel)]=\"user.password\"> <br>\n  <button type=\"Submit\">Login</button>\n</form>\n\nIf you don't have an account <a routerLink=\"/register\">register</a>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/post/post.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/post/post.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"view\" (ngSubmit)=\"savePost()\">\n  <mat-form-field>\n    <input matInput placeholder=\"Title\"\n           [(ngModel)]=\"post.title\"\n           name=\"title\">\n  </mat-form-field>\n  <mat-form-field>\n    <textarea matInput placeholder=\"Additional info\"\n              [(ngModel)]=\"post.optionalField\"\n              name=\"optional_field\"></textarea>\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\"\n           [(ngModel)]=\"post.date\"\n           name=\"date\">\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput [matDatepicker]=\"exppicker\" placeholder=\"Choose expiration date\"\n           [(ngModel)]=\"post.expirationDate\"\n           name=\"expirationDate\">\n    <mat-datepicker-toggle matSuffix [for]=\"exppicker\"></mat-datepicker-toggle>\n    <mat-datepicker #exppicker></mat-datepicker>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-label>Kind of post</mat-label>\n    <mat-select>\n      <mat-option>\n        {{post.kind[0]}}\n      </mat-option>\n      <mat-option>\n        {{post.kind[1]}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n    <input type=\"file\">\n    <button mat-button type=\"submit\">Submit</button>\n</form>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/registration/registration.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/registration/registration.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form action=\"\"  (ngSubmit)=\"sendForm()\">\n  <label>Name: </label> <br>\n  <input\n    #nameI=\"ngModel\"\n    type=\"text\"\n         name=\"name\"\n         placeholder=\"Enter your name\"\n  [(ngModel)]=\"user.username\"> <br>\n  <label>Password: </label> <br>\n  <input type=\"text\"\n         name=\"password\"\n         placeholder=\"Enter your password\"\n         [(ngModel)]=\"user.password\"> <br>\n  <label>Email: </label> <br>\n  <input type=\"text\"\n         name=\"email\"\n         placeholder=\"Enter your email\"\n         [(ngModel)]=\"user.email\"> <br>\n  <button type=\"Submit\">Sign Up</button>\n</form>\n"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/registration/registration.component */ "./src/app/components/registration/registration.component.ts");
/* harmony import */ var _components_logination_logination_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/logination/logination.component */ "./src/app/components/logination/logination.component.ts");
/* harmony import */ var _components_post_post_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/post/post.component */ "./src/app/components/post/post.component.ts");






var routes = [
    { path: 'login', component: _components_logination_logination_component__WEBPACK_IMPORTED_MODULE_4__["LoginationComponent"] },
    { path: 'register', component: _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_3__["RegistrationComponent"] },
    { path: 'user/:username/addPost', component: _components_post_post_component__WEBPACK_IMPORTED_MODULE_5__["PostComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'client';
        this.isLogined = true;
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/registration/registration.component */ "./src/app/components/registration/registration.component.ts");
/* harmony import */ var _components_logination_logination_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/logination/logination.component */ "./src/app/components/logination/logination.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _components_post_post_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/post/post.component */ "./src/app/components/post/post.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_registration_registration_component__WEBPACK_IMPORTED_MODULE_5__["RegistrationComponent"],
                _components_logination_logination_component__WEBPACK_IMPORTED_MODULE_6__["LoginationComponent"],
                _components_post_post_component__WEBPACK_IMPORTED_MODULE_9__["PostComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatNativeDateModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSelectModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/logination/logination.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/logination/logination.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW5hdGlvbi9sb2dpbmF0aW9uLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/logination/logination.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/logination/logination.component.ts ***!
  \***************************************************************/
/*! exports provided: LoginationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginationComponent", function() { return LoginationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_login_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/login-user.service */ "./src/app/services/login-user.service.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/User */ "./src/app/models/User.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var LoginationComponent = /** @class */ (function () {
    function LoginationComponent(loginUserService, router) {
        this.loginUserService = loginUserService;
        this.router = router;
        this.user = new _models_User__WEBPACK_IMPORTED_MODULE_3__["User"]();
        this.isLogined = false;
    }
    LoginationComponent.prototype.ngOnInit = function () {
    };
    LoginationComponent.prototype.login = function () {
        var _this = this;
        this.loginUserService.loginUser(this.user).subscribe(function (response) {
            var token = response.headers.get('Authorization');
            console.log(token);
            localStorage.setItem('token', token);
            _this.router.navigateByUrl('/');
            if (token != null) {
                _this.isLogined = true;
            }
        });
    };
    LoginationComponent.ctorParameters = function () { return [
        { type: _services_login_user_service__WEBPACK_IMPORTED_MODULE_2__["LoginUserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
    ]; };
    LoginationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-logination',
            template: __webpack_require__(/*! raw-loader!./logination.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/logination/logination.component.html"),
            styles: [__webpack_require__(/*! ./logination.component.css */ "./src/app/components/logination/logination.component.css")]
        })
    ], LoginationComponent);
    return LoginationComponent;
}());



/***/ }),

/***/ "./src/app/components/post/post.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/post/post.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-card {\r\n  max-width: 400px;\r\n}\r\n\r\n.example-header-image {\r\n  background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');\r\n  background-size: cover;\r\n}\r\n\r\n.view{\r\n  display: -webkit-box;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: column;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wb3N0L3Bvc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1GQUFtRjtFQUNuRixzQkFBc0I7QUFDeEI7O0FBQ0E7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYiw0QkFBc0I7RUFBdEIsNkJBQXNCO1VBQXRCLHNCQUFzQjtBQUN4QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcG9zdC9wb3N0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1jYXJkIHtcclxuICBtYXgtd2lkdGg6IDQwMHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1oZWFkZXItaW1hZ2Uge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Fzc2V0cy9pbWcvZXhhbXBsZXMvc2hpYmExLmpwZycpO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuLnZpZXd7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/post/post.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/post/post.component.ts ***!
  \***************************************************/
/*! exports provided: PostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostComponent", function() { return PostComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_Post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/Post */ "./src/app/models/Post.ts");
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");





var PostComponent = /** @class */ (function () {
    function PostComponent(postService, authService) {
        this.postService = postService;
        this.authService = authService;
        this.post = new _models_Post__WEBPACK_IMPORTED_MODULE_2__["Post"]();
    }
    PostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.auth().subscribe(function (value) {
            _this.user = value;
            console.log(_this.user);
        });
    };
    PostComponent.prototype.savePost = function () {
        this.postService.savePost(this.post, this.user).subscribe(function (value) { return console.log(value); });
        console.log(this.user);
    };
    PostComponent.ctorParameters = function () { return [
        { type: _services_post_service__WEBPACK_IMPORTED_MODULE_3__["PostService"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
    ]; };
    PostComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-post',
            template: __webpack_require__(/*! raw-loader!./post.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/post/post.component.html"),
            styles: [__webpack_require__(/*! ./post.component.css */ "./src/app/components/post/post.component.css")]
        })
    ], PostComponent);
    return PostComponent;
}());



/***/ }),

/***/ "./src/app/components/registration/registration.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/registration/registration.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/registration/registration.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/registration/registration.component.ts ***!
  \*******************************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/User */ "./src/app/models/User.ts");
/* harmony import */ var _services_register_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/register-user.service */ "./src/app/services/register-user.service.ts");




var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(registerUserService) {
        this.registerUserService = registerUserService;
        this.user = new _models_User__WEBPACK_IMPORTED_MODULE_2__["User"]();
    }
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent.prototype.sendForm = function () {
        this.registerUserService.saveUser(this.user).subscribe(function (value) { return console.log(value); });
    };
    RegistrationComponent.ctorParameters = function () { return [
        { type: _services_register_user_service__WEBPACK_IMPORTED_MODULE_3__["RegisterUserService"] }
    ]; };
    RegistrationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! raw-loader!./registration.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/registration/registration.component.html"),
            styles: [__webpack_require__(/*! ./registration.component.css */ "./src/app/components/registration/registration.component.css")]
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./src/app/models/Post.ts":
/*!********************************!*\
  !*** ./src/app/models/Post.ts ***!
  \********************************/
/*! exports provided: Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return Post; });
var Post = /** @class */ (function () {
    function Post(title, kind, photo, date, expirationDate, optionalField) {
        this.title = title;
        this.kind = kind;
        this.photo = photo;
        this.date = date;
        this.expirationDate = expirationDate;
        this.optionalField = optionalField;
    }
    Post.ctorParameters = function () { return [
        { type: String },
        { type: undefined },
        null,
        { type: Date },
        { type: Date },
        { type: HTMLTextAreaElement }
    ]; };
    return Post;
}());



/***/ }),

/***/ "./src/app/models/User.ts":
/*!********************************!*\
  !*** ./src/app/models/User.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    User.ctorParameters = function () { return [
        { type: Number },
        { type: String },
        { type: String },
        { type: String }
    ]; };
    return User;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.url = '/authUser';
    }
    AuthService.prototype.auth = function () {
        return this.http.get(this.url, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Authorization': localStorage.getItem('token') }) });
    };
    AuthService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/login-user.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/login-user.service.ts ***!
  \************************************************/
/*! exports provided: LoginUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginUserService", function() { return LoginUserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var LoginUserService = /** @class */ (function () {
    function LoginUserService(http) {
        this.http = http;
        this.url = '/login';
    }
    LoginUserService.prototype.loginUser = function (loginUser) {
        return this.http.post(this.url, loginUser, { observe: 'response', responseType: 'text' });
    };
    LoginUserService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    LoginUserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], LoginUserService);
    return LoginUserService;
}());



/***/ }),

/***/ "./src/app/services/post.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/post.service.ts ***!
  \******************************************/
/*! exports provided: PostService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostService", function() { return PostService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.url = '/addPost/';
    }
    PostService.prototype.savePost = function (userPost, user) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers.append('Authorization', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + user.id, userPost, { headers: headers });
    };
    PostService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    PostService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], PostService);
    return PostService;
}());



/***/ }),

/***/ "./src/app/services/register-user.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/register-user.service.ts ***!
  \***************************************************/
/*! exports provided: RegisterUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterUserService", function() { return RegisterUserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var RegisterUserService = /** @class */ (function () {
    function RegisterUserService(http) {
        this.http = http;
        this.URL = '/signup';
    }
    RegisterUserService.prototype.saveUser = function (someUser) {
        return this.http.post(this.URL, someUser);
    };
    RegisterUserService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    RegisterUserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], RegisterUserService);
    return RegisterUserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\IdeaProjects\pets2\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map