# sample.net8ng17
A sample application of Dotnet8 and Angular 17 modeled using Microsoft Identity, Angular Material, standalone component architecture, showcasing examples of various angular functionalities and database compatibility. 

# Files you will need to replace:
appsettings.json
appsettings.Development.json

General structure is as follows:

```{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SERVER\\SQLEXPRESS;Database=sample_app;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "SENDGRID_API_KEY": "SG API Key goes here",
  "AllowedHosts": "*",
  "JwtTokens": {
    "SigningKey": "aReallylongandComplexSigningKey",
    "Issuer": "https://a-website.com",
    "Audience": "https://a-website.com",
    "RefreshIntervalMinutes": "1440"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:80"
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:443",
        "Certificate": {
          "Subject": "localhost",
          "Store": "My",
          "Location": "LocalMachine",
          "AllowInvalid": false
        }
      },
      "HttpsFromPem": {
        "Url": "https://*:443",
        "Certificate": {
          "Path": "fullchain.pem",
          "KeyPath": "privkey.pem"
        }
      }
    }
  }
}
```

privkey.pem
fullchain.pem

- In WSL instance to make Dev Certs
  ```
  openssl req -x509 -newkey rsa:4096 -keyout privkey.pem -out fullchain.pem -days 365 -nodes -subj "/CN=localhost"
  ```
