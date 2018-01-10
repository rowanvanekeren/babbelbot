@extends('layouts.blank')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default login-wrapper">
                    <div class="panel-heading">Wachtwoord herstellen</div>

                    <div class="panel-body">
                        @if (session('status'))
                            <div class="col-md-12">
                            <div class="alert alert-success">
                                <i class="fa fa-check" aria-hidden="true"></i> {{ session('status') }}
                            </div>
                                </div>
                        @endif

                        <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
                            {{ csrf_field() }}

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-4 control-label">E-Mail Adres</label>

                                <div class="col-md-12">
                                    <div class="input-icon">
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i>

                                        <input id="email" type="email" class="form-control" name="email"
                                               value="{{ old('email') }}" required>
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

                            <div class="form-group">
                                <div class="col-md-12 ">
                                    <button type="submit" class="main-btn">
                                        Verzend link voor herstellen
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
