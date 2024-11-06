<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure it includes your API routes

    'allowed_methods' => ['*'], // Or specify your allowed methods (GET, POST, etc.)

    'allowed_origins' => [
        'http://localhost:5173', // Replace with the frontend origin
    ],

    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,

    'supports_credentials' => true, // This allows credentials (cookies, etc.)
];
