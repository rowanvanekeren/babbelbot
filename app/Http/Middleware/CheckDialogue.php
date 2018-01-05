<?php

namespace App\Http\Middleware;

use Closure;

class CheckDialogue
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
        if($request->session()->get('active_dialogue') === null){
            return redirect('./dashboard');
        }/*else if($request->session()->get('active_app') !== null)*/

        return $next($request);
    }
}
