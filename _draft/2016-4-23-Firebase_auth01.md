---
title: 投稿記事
layout: post
postTitle: Firebase　Authentigication
categories: post firebase
---

-----

Firebase に登録した jsonデータの読み込みを行いました。

データは<a href="https://www.firebase.com/docs/web/guide/structuring-data.html">Structuring Data</a>を参考に　flattened Data構造にしてみました。

読込に使用したデータとソースは下方に記載しました。

-----

<header class="navbar navbar-static-top navbar-inverse" id="top" role="banner">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse"> <span class="sr-only">Toggle navigation</span>
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
            </button> 
            <a href="#" class="navbar-brand">Firebase login</a>
        </div>
        <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li> <a href="#/">ログイン</a>
                </li>
                <li> <a href="#/logout">ログアウト</a>
                </li>
                <li> <a href="#/register">登録</a>
                </li>
                <li> <a href="#/profile">プロフィール</a>
                </li>
            </ul>
        </nav>
    </div>
</header>
<div id="container" class="container">
    <form id="frmLogin" role="form">
        <h2>ログイン</h2>
        <div class="form-group">
            <label for="txtEmail">Eメール アドレス</label>
            <input type="email" class="form-control" id="txtEmail" placeholder="Eメールを入力" name="email" />
        </div>
        <div class="form-group">
            <label for="txtPass">パスワード</label>
            <input type="password" class="form-control" id="txtPass" placeholder="パスワード" name="password" />
        </div>
        <button type="submit" class="btn btn-default btn-block">ログイン</button>
        <br />
        <br />
 <a href="#" class="btn btn-primary bt-social" data-provider="facebook">Facebook</a>
 <a href="#" class="btn btn-info bt-social" data-provider="twitter">Twitter</a>
        <!-- <a href="#" class="btn btn-danger bt-social" data-provider="google">Google+</a> --> <a href="#" class="btn btn-default bt-social" data-provider="github">GitHub</a>
 <a href="#" class="btn btn-warning" id="btAnon">Anon</a>
         <h4>でログイン</h4>
    </form>
    <form id="frmLogout" role="form">
         <h2>You are logged out!</h2>
    </form>
    <form id="frmRegister" role="form">
         <h2>登録</h2>
        <div class="form-group">
            <label for="txtRegEmail">Eメール　アドレス</label>
            <input type="email" class="form-control" id="txtEmail" placeholder="Eメールを入力" name="email" />
        </div>
        <div class="form-group">
            <label for="txtRegPass">パスワード</label>
            <input type="password" class="form-control" id="txtPass" placeholder="パスワード" name="password" />
        </div>
        <button type="submit" class="btn btn-default">登録</button>
    </form>
    <form id="frmProfile" role="form">
         <h2>プロフィール</h2>
        <br />
        <div class="form-group">
            <label for="txtName">名前</label>
            <input type="text" class="form-control" id="txtName" placeholder="名前" name="name" />
        </div>
        <div class="form-group">
            <label for="ddlMusic">好きな音楽</label>
            <select id="ddlMusic" name="favoriteMusic" class="form-control">
                <option>無し</option>
                <option>クラシック</option>
                <option>ポップス</option>
                <option>ジャズ</option>
                <option>ロック</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">更新</button>
    </form>
    <hr />
    <div id="alert" class="alert" role="alert">
         <h4 id="alert-title">ログインしていません</h4>
        <p id="alert-detail"></p>
    </div>
</div>

<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-serialize-object/2.0.0/jquery.serialize-object.compiled.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/path.js/0.8.4/path.min.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>

<script type="text/javascript">
 /*
  var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});

  $("#logo").lettering();
*/  
(function (jQuery, Firebase, Path) {
    "use strict";
   $('form').css({"display":"none"});

    // the main firebase reference
    var rootRef = new Firebase('"https://intense-inferno-9013.firebaseio.com/web/uauth');

    // pair our routes to our form elements and controller
    var routeMap = {
        '#/': {
            form: 'frmLogin',
            controller: 'login'
        },
            '#/logout': {
            form: 'frmLogout',
            controller: 'logout'
        },
            '#/register': {
            form: 'frmRegister',
            controller: 'register'
        },
            '#/profile': {
            form: 'frmProfile',
            controller: 'profile',
            authRequired: true // must be logged in to get here
        },
    };

    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;

    var alertBox = $('#alert');

    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    // Handle third party login providers
    // returns a promise
    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        rootRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    };

    // Handle Email/Password login
    // returns a promise
    function authWithPassword(userObj) {
        var deferred = $.Deferred();
        console.log(userObj);
        rootRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise();
    }

    // create a user but not login
    // returns a promsie
    function createUser(userObj) {
        var deferred = $.Deferred();
        rootRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // Create a user and then login in
    // returns a promise
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }

    // authenticate anonymously
    // returns a promise
    function authAnonymously() {
        var deferred = $.Deferred();
        rootRef.authAnonymously(function (err, authData) {

            if (authData) {
                deferred.resolve(authData);
            }

            if (err) {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {

            // route
            routeTo(route);

        }, function (err) {
            console.log(err);
            // pop up error
            showAlert({
                title: err.code,
                detail: err.message,
                className: 'alert-danger'
            });

        });
    }

    // options for showing the alert box
    function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

    /// Controllers
    ////////////////////////////////////////

    controllers.login = function (form) {

        // Form submission for logging in
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = authWithPassword(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'profile');

        });

        // Social buttons
        form.children('.bt-social').on('click', function (e) {

            var $currentButton = $(this);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
            e.preventDefault();

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        });

        form.children('#btAnon').on('click', function (e) {
            e.preventDefault();
            handleAuthResponse(authAnonymously(), 'profilex');
        });

    };

    // logout immediately when the controller is invoked
    controllers.logout = function (form) {
        rootRef.unauth();
    };

    controllers.register = function (form) {

        // Form submission for registering
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = createUserAndLogin(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'profile');

        });

    };

    controllers.profile = function (form) {
        // Check the current user
        var user = rootRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = rootRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            form.find('#txtName').val(user.name);
            form.find('#ddlMusic').val(user.favoriteMusic);
        });

        // Save user's info to Firebase
        form.on('submit', function (e) {
            e.preventDefault();
            var userInfo = $(this).serializeObject();

            userRef.set(userInfo, function onComplete() {

                // show the message if write is successful
                showAlert({
                    title: '保存されました！',
                    detail: 'ログインしています',
                    className: 'alert-success'
                });

            });
        });

    };

    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    function transitionRoute(path) {
        // grab the config object to get the form element and controller
        var formRoute = routeMap[path];
        var currentUser = rootRef.getAuth();

        // if authentication is required and there is no
        // current user then go to the register page and
        // stop executing
        if (formRoute.authRequired && !currentUser) {
            routeTo('register');
            return;
        }

        // wrap the upcoming form in jQuery
        var upcomingForm = $('#' + formRoute.form);

        // if there is no active form then make the current one active
        if (!activeForm) {
            activeForm = upcomingForm;
        }

        // hide old form and show new form
        activeForm.hide();
        upcomingForm.show().hide().fadeIn(750);

        // remove any listeners on the soon to be switched form
        activeForm.off();

        // set the new form as the active form
        activeForm = upcomingForm;

        // invoke the controller
        controllers[formRoute.controller](activeForm);
    }

    // Set up the transitioning of the route
    function prepRoute() {
        transitionRoute(this.path);
    }


    /// Routes
    ///  #/         - Login
    //   #/logout   - Logut
    //   #/register - Register
    //   #/profile  - Profile

    Path.map("#/").to(prepRoute);
    Path.map("#/logout").to(prepRoute);
    Path.map("#/register").to(prepRoute);
    Path.map("#/profile").to(prepRoute);

    Path.root("#/");

    /// Initialize
    ////////////////////////////////////////

    $(function () {

        // Start the router
        Path.listen();

        // whenever authentication happens send a popup
        rootRef.onAuth(function globalOnAuth(authData) {

            if (authData) {
                showAlert({
                    title: 'ログインしています!',
                    detail: 'Using ' + authData.provider,
                    className: 'alert-success'
                });
            } else {
                showAlert({
                    title: 'ログインしていません',
                    detail: '',
                    className: 'alert-info'
                });
            }

        });

    });

}(window.jQuery, window.Firebase, window.Path))

</script>