# Wildcard server

This mini Express app aims to serve as many static apps as you want.

Edit the `config.js` file to adjust:
* Your domain name, e.g. `example.com`
* The registered apps. The `apps` object's key-value pairs are as follows:

    * key: the subdomain, e.g. `mysuperapp` for `mysuperapp.example.com`
    * value: the app's repository

This is WIP yet already in production :sweat_smile:.
