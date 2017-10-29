<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
</head>
<body>


            @include('nav.dashboard')

            <div class="main-dashboard-wrapper ">
                @yield('content')
            </div>
<!-- Scripts -->
<script src="{{asset('public/js/jquery-3.2.1.min.js')}}"></script>
<script src="{{ asset('public/js/dashboard.js') }}"></script>
</body>
</html>