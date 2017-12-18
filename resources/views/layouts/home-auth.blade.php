<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Babbelbot') }}</title>

    <link rel="icon" type="image/png" href="{{asset('public/img/favicon/favicon-babbelbot.png')}}" />
    <!-- Styles -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
</head>
<body>
<div class="home-bg-full" style="background-image: url('{{asset('public/img/background/home-background4.jpg')}}')">
    <div class="container">
        <div class="row home-auth-image">
            <div class="col-md-4 col-md-offset-4">
                <a href="{{url('/')}}"> <img src="{{asset('public/img/logo/babbelbot-logo.png')}}"></a>

            </div>
        </div>
        <div class="row">
            @yield('content')
        </div>
    </div>
 </div>

<!-- Scripts -->
<script src="{{asset('public/js/jquery-3.2.1.min.js')}}"></script>
<script src="{{asset('public/js/addons/typed.min.js')}}"></script>
<script src="{{ asset('public/js/app.js') }}"></script>
</body>
</html>