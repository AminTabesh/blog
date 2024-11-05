<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function store(Request $request){

        $user = new User();
        $user->name = $request['username'];
        $user->email = $request['email'];
        $user->password = bcrypt($request['password']);

        $user->save();


        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
        
    }

    public function login(Request $request)
{

    $user = User::where('name', $request['username'])->first();

    if ($user && Hash::check($request['password'], $user->password)) {
        return response()->json(['message' => 'Login successful', 'user' => $user], 200);
    } else {
        return response()->json(['message' => 'Invalid username or password'], 401);
    }
}

public function create(Request $request){

    $post = new Post();
    $post->title = $request['title'];
    $post->content = $request['content'];    

    $post->save();


    return response()->json([
        'message' => 'Post created successfully',
        'Post' => $post
    ], 201);
    
}

public function show()
{
    $posts = Post::all();

    return response()->json($posts);
}

}
