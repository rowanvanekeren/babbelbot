<!DOCTYPE html>
<html ng-app="botApp" lang="nl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Babbelbot') }} | Dashboard | Slimme chatbots in het nederlands</title>
    <meta name="description" content="Babbelbot is een slimme chatbot maker, gespecialiseerd in het Nederlands, met ons uniek conversatie systeem
    hebben wij het u makkelijker gemaakt om met minimale technische ervaring
    een eigen chatbot te maken">


    <meta name="robots" content="index, nofollow">
    <link rel="icon" type="image/png" href="{{asset('public/img/favicon/favicon-babbelbot.png')}}" />
    <!-- Styles -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/jquery-ui.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/jquery.flowchart.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/addons/select2.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/addons/ng-tags-input.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/angular-tooltips.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/babbelbot.css') }}" rel="stylesheet">

</head>
<body>


            @include('nav.dashboard')

            <div  class="main-dashboard-wrapper"  scrolly="showMore()">
                @yield('content')
            </div>

            <div class="chatbox-placement" ng-controller="chatbotPreviewController" ng-init="initPreview()" active-app="activateChatbotPreview(data)">
                <div id="babbelbot-chatbot-preview" >

                </div>
            </div>
            <script>
                /* routes */
                var currentPath = '{{ Request::path() }}';
                var defaultURL = '{{url("/")}}';
                var ajaxAppSessionURL = '{{url("/check-app-session")}}';
            </script>
<!-- Scripts -->
    <script src="{{asset('public/js/jquery-3.2.1.min.js')}}"></script>
    @yield('custom-scripts-before')
    <script src="{{asset('public/js/addons/babbelbot.js')}}"></script>
    <script src="{{asset('public/js/angular/angular.min.js')}}"></script>
    <script src="{{asset('public/js/angular/angular-animate.min.js')}}"></script>
    <script src="{{asset('public/js/angular/angular-cookies.min.js')}}"></script>
    <script src="{{asset('public/js/angular/angular-tooltips.min.js')}}"></script>
    <script src="{{asset('public/js/addons/ng-tags-input.js')}}"></script>
    <script src="{{asset('public/js/main.js')}}"></script>
    <script src="{{asset('public/js/controllers.js')}}"></script>
   {{-- <script src="{{ asset('public/js/dashboard.js') }}"></script>--}}

    @yield('custom-scripts-after')



            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90408679-2"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-90408679-2');
            </script>
</body>
</html>