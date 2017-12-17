<div class="main-navigation-wrapper" ng-controller="navController" ng-init="navInit()">
<div class="left-navigation">
<div class="top-info-bar">
    <a id="nav-logo" href="/"><img src="{{asset('public/img/logo/babbelbot-logo.png')}}" alt="babbelbot logo"></a>
    <a id="nav-bars" href="/"><i class="fa fa-bars" aria-hidden="true"></i></a>
</div>
<div class="location-navigation">

</div>
<div class="center-navigation"  active-app="changeActiveApp(data)">
    <ul>
        <li ng-cloak>
            <a href="{{ url('./dashboard') }}" class="apps-nav {{ Request::path() == 'dashboard' ? 'active' : '' }}"><i class="fa fa-list dash-icon" aria-hidden="true"></i> Apps</a>
            <ul class="center-sub-nav" >
                <li class="active-app-nav"><span>@{{activeApp ? activeApp : "Kies een app"}}<i class="fa fa-circle app-on-off "ng-class="(activeApp) ? 'active-app-color ' : 'inactive-app-color '" aria-hidden="true"></i></span></li>

                <li class="sub-menu-seperator " ng-show="activeApp"><hr></li>
                <li  ng-show="activeApp"><a class="{{ Request::path() == 'dashboard/dialogen' ? 'active' : '' }}" href="{{ url('./dashboard/dialogen') }}"><i class="fa fa-comments" aria-hidden="true"></i>Dialogen</a></li>
                <li  ng-show="activeApp"><a class="{{ Request::path() == 'dashboard/standaard-antwoorden' ? 'active' : '' }}" href="{{ url('./dashboard/standaard-antwoorden') }}"><i class="fa fa-comment" aria-hidden="true"></i>Standaard antwoorden</a></li>
                <li  ng-show="activeApp"><a class="{{ Request::path() == 'dashboard/entities' ? 'active' : '' }}" href="{{ url('./dashboard/entities') }}"><i class="fa fa-book" aria-hidden="true"></i> Entities</a></li>
            </ul>
        </li>
        <li>

            <a href=""><i class="fa fa-question dash-icon" aria-hidden="true"></i> Help</a>
        </li>
    </ul>
</div>
<div class="footer-navigation">

</div>
</div>

<div class="top-navigation" >
<ul class="top-breadcrumbs" ng-cloak>
    <li ng-repeat="crumb in breadCrumbs">
       <a href="@{{ crumb.href }}">@{{ crumb.text }} </a>
        <i class="fa fa-chevron-right" aria-hidden="true" ng-if="!$last"></i>
    </li>

</ul>
<ul class="top-user">
        <li class="top-user-li active-user">
            <a href="">Hallo, {{Auth::user()->name}} <i class="fa fa-chevron-down" aria-hidden="true"></i></a>
                <ul class="top-user-sub">
                 <li><a href="{{ url('logout') }}"><i class="fa fa-sign-out" aria-hidden="true"></i>  Uitloggen </a></li>
                </ul>
        </li>
        <li class="top-user-li">
           <a href=""> <i class="fa fa-cog" aria-hidden="true"></i></a>
        </li>
</ul>
</div>
</div>