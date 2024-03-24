### Apache VHost Config
```
<VirtualHost *:80>
    ServerAdmin admin@eventhive.local
    ServerName www.eventhive.local
    ServerAlias eventhive.local
    DocumentRoot "D:/Github/PUSL2021-ComputingGroupProject/frontend/dist"
    ProxyRequests On
    <Proxy>
        Order deny,allow
        Allow from all
    </Proxy>
    ProxyPass /api/ http://127.0.0.1:8654/
    ProxyPass / http://127.0.0.1:3000/
</VirtualHost>
```

### Nginx Config
```
server {
        listen 80;
        listen [::]:80;

        root /app/frontend;
        index index.html;

        server_name eventhive.local www.eventhive.local;

        location /api/ {
                proxy_pass http://127.0.0.1:8654/;
                include proxy_params;
        }

        location / {
                try_files $uri $uri/ =404;
        }
}
```

### /etc/hosts
```
  127.0.0.1      www.eventhive.local
  127.0.0.1      eventhive.local
```