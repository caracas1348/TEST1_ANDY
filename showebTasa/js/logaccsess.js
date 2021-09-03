// the AAD application
var clientApplication;

(function () {

    // Enter Global Config Values & Instantiate MSAL Client application
    window.config = {
        clientID: '370d607d-5650-41fb-aa5f-644254136dab',
        directorioID: 'c1M7qP.s@]s-84BA5bgVG.W1:=h=QVsr',
        key: 'b7e26f48-2292-4a14-a355-1aeb8489ae3d',
    };

    function authCallback(errorDesc, token, error, tokenType) {
        //This function is called after loginRedirect and acquireTokenRedirect. Not called with loginPopup
        // msal object is bound to the window object after the constructor is called.
        if (token) {
        }
        else {
            log(error + ":" + errorDesc);
        }
    }

    if (!clientApplication)
    {
        clientApplication = new Msal.UserAgentApplication(window.config.clientID, null, authCallback);
    }

    // Get UI jQuery Objects
    
    var $signInButton = $(".app-login");
   
    onSignin(null);

 
    // Handle Navigation Directly to View
    window.onhashchange = function () {
        loadView(stripHash(window.location.hash));
    };
    window.onload = function () {
        $(window).trigger("hashchange");
    };



    $signInButton.click(function () {
        clientApplication.loginPopup().then(onSignin);
    });

    function onSignin(idToken)
    {
        console.log(idToken)
        // Check Login Status, Update UI
        var user = clientApplication.getUser();
        if (user) {

            $signInButton.hide();
        } else {
 
            $signInButton.show();
 
        }

    }

    // Route View Requests To Appropriate Controller
    function loadCtrl(view) {
        switch (view.toLowerCase()) {
            case 'home':
                return homeCtrl;
            case 'todolist':
                return todoListCtrl;
            case 'userdata':
                return userDataCtrl;
        }
    }

    // Show a View
    function loadView(view) {

       
        var ctrl = loadCtrl(view);

        if (!ctrl)
            return;

        // Check if View Requires Authentication

       
        if (ctrl.requireADLogin && !clientApplication.getUser()) {
            
            clientApplication.loginPopup().then(onSignin);
           
            return;
        }

        // Load View HTML
       console.log("go page")
    };

    function stripHash(view) {
        return view.substr(view.indexOf('#') + 1);
    }

}());

        


