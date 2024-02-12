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

### /etc/hosts
```
  127.0.0.1      www.eventhive.local
  127.0.0.1      eventhive.local
```