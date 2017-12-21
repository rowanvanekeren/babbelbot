<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Babbelbot') }}</title>

    <link rel="icon" type="image/png" href="{{asset('public/img/favicon/favicon-babbelbot.png')}}"/>
    <!-- Styles -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/babbelbot.css') }}" rel="stylesheet">
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

        <div class="row">

{{--                <dump>
                    <div id="bb-chatbox-title">Test title</div>
                    <div id="bb-chatbox-inner">
                        <div id="bb-chatbox-conversation">
                            <div id="bb-chatbox-conversation-inner">
                                <div class="bb-chat-row">
                                    <div class="bb-chatbot-sender"><span>Babbelbot</span> 14.45</div>
                                    <div style="clear:both"></div>
                                    <div class="bb-chatbot">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="bb-chat-row">
                                    <div class="bb-user-sender"> 14.45 <span>Jij</span></div>
                                    <div style="clear:both"></div>
                                    <div class="bb-user">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="bb-chat-row">
                                    <div class="bb-chatbot-sender"><span>Babbelbot</span> 14.45</div>
                                    <div style="clear:both"></div>
                                    <div class="bb-chatbot">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="bb-chat-row">
                                    <div class="bb-chatbot-sender"><span>Babbelbot</span> 14.45</div>
                                    <div style="clear:both"></div>
                                    <div class="bb-chatbot">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="bb-chat-row">
                                    <div class="bb-user-sender"> 14.45 <span>Jij</span></div>
                                    <div style="clear:both"></div>
                                    <div class="bb-user">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="bb-chat-row">
                                    <div class="bb-chatbot-sender"><span>Babbelbot</span> 14.45</div>
                                    <div style="clear:both"></div>
                                    <div class="bb-chatbot">test bot</div>
                                    <div style="clear:both"></div>
                                </div>
                            </div>
                        </div>
                        <div id="bb-chatbox-input">
                            <textarea placeholder="Typ hier je bericht"> </textarea>
                        </div>
                    </div>
                </dump>--}}

        </div>
    </div>
</div>

<!-- Scripts -->
<script src="{{asset('public/js/jquery-3.2.1.min.js')}}"></script>
<script src="{{asset('public/js/addons/typed.min.js')}}"></script>
<script src="{{asset('public/js/addons/babbelbot.js')}}"></script>
<script src="{{asset('public/js/babbelbot-chatbot.js')}}"></script>
<script src="{{ asset('public/js/app.js') }}"></script>
</body>
</html>