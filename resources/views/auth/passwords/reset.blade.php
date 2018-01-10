@extends('layouts.blank')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default login-wrapper">
                <div class="panel-heading">Wachtwoord resetten</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('password.request') }}">
                        {{ csrf_field() }}

                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Adres</label>

                            <div class="col-md-12">
                                <div class="input-icon">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                <input id="email" type="email" class="form-control" name="email" value="{{ $email or old('email') }}" required autofocus>

                                </div>
                                @if ($errors->has('email'))

                                    <div class="input-error">

                                        <div class="has-error">
                                            <i class="fa fa-times " aria-hidden="true"></i> {{ $errors->first('email') }}
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
                                <input id="password" type="password" class="form-control" name="password" required>
                                </div>
                                @if ($errors->has('password'))

                                    <div class="input-error">

                                        <div class="has-error">
                                            <i class="fa fa-times " aria-hidden="true"></i> {{ $errors->first('password') }}
                                        </div>

                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <label for="password-confirm" class="col-md-4 control-label">Wachtwoord herhalen</label>
                            <div class="col-md-12">
                                <div class="input-icon">
                                    <i class="fa fa-key" aria-hidden="true"></i>
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                                </div>
                                @if ($errors->has('password_confirmation'))

                                    <div class="input-error">

                                        <div class="has-error">
                                            <i class="fa fa-times " aria-hidden="true"></i> {{ $errors->first('password_confirmation') }}
                                        </div>

                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12">
                                <button type="submit" class="main-btn">
                                    Wachtwoord resetten
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
