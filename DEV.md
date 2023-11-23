## Local Xampp Config
```xml
<VirtualHost *:80>
    ServerAdmin admin@eventhive.local
    ServerName www.eventhive.local
    ServerAlias eventhive.local
    DocumentRoot "D:/Github/PUSL2021-ComputingGroupProject/frontend/dist"
    <Directory "D:/Github/PUSL2021-ComputingGroupProject/frontend/dist">
     Allow from all
     Require all granted
    </Directory>
    ProxyRequests On
    <Proxy>
        Order deny,allow
        Allow from all
    </Proxy>
    ProxyPass /api/ http://127.0.0.1:8654/
</VirtualHost>

```

## Database Structure
*Create a database called **eventhive**; Use MariaDB or MySQL;*
```sql
use eventhive;
DROP TABLE IF EXISTS passwordresettoken;
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  isActive BOOLEAN NOT NULL
);
CREATE TABLE passwordresettoken (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  userId INT UNIQUE NOT NULL,
  createdAt INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

```

TODO:
- Able to lock/unlock user based on their session's username