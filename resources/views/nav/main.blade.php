<div class="background-gradient"></div>
<div class="navbar">

    <div class="navbar-inner">
        <a id="nav-logo" href="/"><img src="{{asset('public/img/logo/babbelbot-logo.png')}}" alt="babbelbot logo"></a>
        <a href="" class="burger-main"><i class="fa fa-bars burger" aria-hidden="true"></i></a>
        <ul class="nav">




            @if($user = Auth::user())
                <li class="logged-in-user">Welkom, {{$user->name}}</li>
                <li><a href="{{url('/dashboard')}}">Dashboard</a></li>
                <li class="logout-red"><a href="{{url('/logout')}}">Uitloggen</a></li>
            @else
                <li><a href="{{url('/login')}}">Login </a></li>
                <li><a href="{{url('/register')}}">Registreer</a></li>
            @endif
           {{-- <li class="burger-main"><i class="fa fa-bars burger" aria-hidden="true"></i></li>--}}
        </ul>
    </div>
</div>