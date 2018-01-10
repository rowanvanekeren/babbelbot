<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Babbelbot') }} | Maak je eigen slimme chatbot in het nederlands</title>
    <meta name="description" content="Babbelbot is een slimme chatbot maker, gespecialiseerd in het Nederlands, met ons uniek conversatie systeem
    hebben wij het u makkelijker gemaakt om met minimale technische ervaring
    een eigen chatbot te maken">

    <meta name="robots" CONTENT="index, follow" />


    <meta property="og:title" content="Babbelbot, de slimme chatbot maker">
    <meta property="og:description" content="Maak je eigen slimme chatbot in het Nederlands!">
    <meta property="og:image" content="{{asset('public/img/logo/babbelbot-logo.png')}}">
    <meta property="og:url" content="https://babbelbot.be">
    <meta name="twitter:card" content="summary_large_image">

    <meta name="theme-color" content="#4ca78c">
    <link rel="icon" type="image/png" href="{{asset('public/img/favicon/favicon-babbelbot.png')}}" />
    <!-- Styles -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
</head>
<body>
<div class="home-bg" style="background-image: url('{{asset('public/img/background/home-background4.jpg')}}')">
    <div class="container home-header">
        <div class="row">

            @include('nav.main')
        </div>
        <div class="row">
            @yield('content')
        </div>
    </div>
</div>
<div class="content-2">
    <div class="container">
        <div class="row">
            @yield('content-2')
        </div>
    </div>
</div>

<div class="content-3">
    <div class="container">
        <div class="row">
            @yield('content-3')
        </div>
    </div>

</div>

<div class="content-4">
    <div class="container">
        <div class="row">
            @yield('content-4')
        </div>
    </div>

</div>


<div class="content-5">
    <div class="container">
        <div class="row">
            @yield('content-5')
        </div>
    </div>

</div>

<div class="content-footer">
    <div class="container">
        <div class="row">
            @yield('content-footer')
        </div>
    </div>

</div>
<!-- Scripts -->
<script src="{{asset('public/js/jquery-3.2.1.min.js')}}"></script>
<script src="{{asset('public/js/addons/typed.min.js')}}"></script>
<script src="{{ asset('public/js/app.js') }}"></script>


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