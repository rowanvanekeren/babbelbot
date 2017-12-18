@extends('layouts.home-auth')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default login-wrapper">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Adres</label>

                            <div class="col-md-12">
                                <div class="input-icon">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                <input id="email" type="email" class="form-control" class="default-input" name="email" value="{{ old('email') }}" required autofocus>
                                </div>
                                @if ($errors->has('email'))

                                    <div class="input-error">
                                        <div class="has-error" ng-repeat="error in dialogue.description.error"><i
                                                    class="fa fa-times " aria-hidden="true"></i> {{ $errors->first('email')  }}
                                        </div>

                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Wachtwoord</label>

                            <div class="col-md-12">
                                <div class="input-icon">
                                <i class="fa fa-key" aria-hidden="true"></i>
                                <input id="password" type="password" class="default-input" name="password" required>
                                </div>


                                @if ($errors->has('password'))

                                    <div class="input-error">
                                        <div class="has-error" ng-repeat="error in dialogue.description.error"><i
                                                    class="fa fa-times " aria-hidden="true"></i> {{ $errors->first('password')  }}
                                        </div>

                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <button type="submit" class="main-btn">
                                    Login
                                </button>


                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12 forget-pw">


                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Wachtwoord vergeten?
                                </a>
                            </div>
                            <div class="col-md-12  forget-pw">


                                <a class="btn btn-link" href="{{ url('/register') }}">
                                    Nog geen account? registreer hier!
                                </a>
                            </div>
                        </div>
                        <div class="form-group or-facebook">

                            <div class="col-md-12 ">
                                <hr>
                                <p style="">Of</p>

                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12 facebook-wrapper" >
                                <a href="{{url('/redirect')}}" class="fb-btn">Login met Facebook</a>

                            </div>
                        </div>

              {{--          <div class="form-group">
                            <div class="col-md-12">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>--}}


                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
