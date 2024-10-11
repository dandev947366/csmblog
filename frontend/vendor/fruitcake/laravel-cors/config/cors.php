<?php
return [

/*
 * You can enable CORS for 1 or multiple paths.
 * Example: ['api/*']
 */
'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure your API paths are included

/*
* Matches the request method. `['*']` allows all methods.
*/
'allowed_methods' => ['*'],

/*
 * Matches the request origin. Specify your frontend origin here, for example: ['http://localhost:3000']
 * If you're developing locally, use 'http://localhost:3000' or wherever your frontend is running.
 */
'allowed_origins' => ['http://localhost:3000'],

/*
 * Patterns that can be used with `preg_match` to match the origin.
 */
'allowed_origins_patterns' => [],

/*
 * Sets the Access-Control-Allow-Headers response header. `['*']` allows all headers.
 */
'allowed_headers' => ['*'],

/*
 * Sets the Access-Control-Expose-Headers response header with these headers.
 */
'exposed_headers' => [],

/*
 * Sets the Access-Control-Max-Age response header when > 0.
 */
'max_age' => 0,

/*
 * Sets the Access-Control-Allow-Credentials header.
 * Set this to true to allow cookies and authentication headers.
 */
'supports_credentials' => true, // This needs to be true for withCredentials in Axios
];
