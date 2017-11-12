<?php

namespace App\Http\Middleware;

use Closure;

class CheckApp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->session()->get('active_app') === null){
            return redirect('./dashboard');
        }/*else if($request->session()->get('active_app') !== null)*/

        return $next($request);
    }
}
