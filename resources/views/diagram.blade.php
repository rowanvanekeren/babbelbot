@extends('layouts.dashboard')



@section('content')
    <div class="flowchart-wrapper">
        <div id="flowchart-base" class="flowchart-base"></div>
        <div id="flowchart-popup" class="flowchart-popup hidden"></div>
        <div id="flowchart-menu" class="flowchart-menu">

            <div class="toggle-menu"><i class="fa fa-wrench" aria-hidden="true"></i></div>
            <div class="toggle-menu-collapse">
                <div class="toggle-content-wrapper">
                <div class="toggle-menu-close"><div><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>
                <div class="toggle-menu-content">
                <div class="draggable_operator ui-draggable ui-draggable-handle" data-nb-inputs="1" data-nb-outputs="1">1 input &amp; 1 output</div>
                </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom-scripts-before')
    <script src="{{asset('public/js/flowchart/jquery-1.10.2.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery-ui.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.panzoom.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.mousewheel.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.flowchart.js')}}"></script>
@endsection

@section('custom-scripts-after')

    <script src="{{asset('public/js/diagram.js')}}"></script>
@endsection

