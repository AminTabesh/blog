<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'users'], // Add any routes you need to allow CORS for

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Allow credentials (cookies)
];

