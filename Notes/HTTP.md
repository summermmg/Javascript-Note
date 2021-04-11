# HTTP Review
## Table of contents
  - [Overview](#overview)
  - [HTTP method](#http-method)
  - [HTTP response status codes](#http-response-status-codes)
  - [HTTP headers](#http-headers)
  - [Other web term](#other-web-term)
  - [HTTPS](#https)
  - [Reference](#reference)



## Overview
>HTTP is a protocol which allows the fetching of resources, such as HTML documents.

The messages sent by the client, usually a Web browser, are called **requests** and the messages sent by the server as an answer are called **responses**.

request structure example:
```
//request method url version of the protocol
GET http://www.example.com/ HTTP/1.1
//Headers
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cache-Control: max-age=0
Host: www.example.com
If-Modified-Since: Thu, 17 Oct 2019 07:18:26 GMT
If-None-Match: "3147526947+gzip"
Proxy-Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 xxx

param1=1&param2=2  //body 
```
response structure example:
```
HTTP/1.1 200 OK
Age: 529651
Cache-Control: max-age=604800
Connection: keep-alive
Content-Encoding: gzip
Content-Length: 648
Content-Type: text/html; charset=UTF-8
Date: Mon, 02 Nov 2020 17:53:39 GMT
Etag: "3147526947+ident+gzip"
Expires: Mon, 09 Nov 2020 17:53:39 GMT
Keep-Alive: timeout=4
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Proxy-Connection: keep-alive
Server: ECS (sjc/16DF)
Vary: Accept-Encoding
X-Cache: HIT

<!doctype html>
<html>
<head>
    <title>Example Domain</title>
	// 省略... 
</body>
</html>
```
#### URL (Uniform Resource Locator)
![URL](/assets/images/urlanduri.jpg)

## HTTP method
#### GET
>Requests a representation of the specified resource.
#### HEAD
>Requests the headers.
#### POST
> sends data to the server. 

The type of the body of the request is indicated by the `Content-Type` header.
#### PUT
> Uploads a new resource.

 Not recommend because of the safety issue. (Everyone can uplaod resource)
#### PATCH
> Applies partial modifications to a resource.
#### DELETE
> Deletes the specified resource.
#### OPTIONS
> Requests permitted communication options for a given URL or server.
#### CONNECT
> Starts two-way communications with the requested resource. It can be used to open a tunnel.
#### TRACE 
> Performs a message loop-back test along the path to the target resource.

## HTTP response status codes
| status code | classification | meaning |
| ----------- | ----------- | ----------- |
| 1XX | Information | everything so far is OK |
| 2XX | Success | the request has succeeded |
| 3XX | Redirection | Additional operation needed |
| 4XX | Client Error | the server cannot process the request |
| 5XX | Server Error | the server encountered an unexpected condition that prevented it from fulfilling the request. |

#### 1XX
* `100 Continue`: everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
#### 2XX
* `200 OK`: the request has succeeded.
* `204 No Content`: a request has succeeded, but that the client doesn't need to navigate away from its current page.    
#### 3XX
* `301 Moved Permanently`: the resource requested has been definitively moved to the URL given by the Location headers.
* `304 Not Modified`: there is no need to retransmit the requested resources. 
#### 4XX
* `400 Bad Request`: the server cannot or will not process the request due to something that is perceived to be a client error.
* `401 Unauthorized`: the request has not been applied because it lacks valid authentication credentials for the target resource.
* `404 Not Found`: the server can't find the requested resource. 
#### 5XX
* `500 Internal Server Error`: the server encountered an unexpected condition that prevented it from fulfilling the request.

## HTTP headers
General header: 
* `Cache-Control`：holds directives (instructions) for caching in both requests and responses.
* `connection`: controls whether or not the network connection stays open after the current transaction finishes. 

Request header: 
* `Authorization`: contains the credentials to authenticate a user agent with a server.
    > Authorization: `<type> <credentials>` 

Request (with body) header: 
* `Content-Encoding`: is used to compress the media-type.
* `Content-Type	`: is used to indicate the media type of the resource.
  > Content-Type: text/html;
  > Content-Type: application/json;
  > Content-Type: multipart/form-data; 

## Other web term
### TCP
> **TCP (Transmission Control Protocol)** is an important network protocol that lets two hosts connect and exchange data streams.

TCP role is to ensure the packets are reliably delivered, error free.
TCP and IP are the basics rules defining the internet.

### WebSockets
> WebSocket is a protocol that allows for a persistent TCP connection between server and client so they can exchange data at any time.

### HTTP cookie & Web storage API
An HTTP cookie is a small piece of data stored on the user's computer by the web browser while browsing a website.

Better substitute: Web storage API
```
localStorage.setItem('myCat', 'Tom');
const cat = localStorage.getItem('myCat');
```

### HTTP caching (缓存)
> Caching is a technique that stores a copy of a given resource and serves it back when requested.

### CORS (Cross-Origin Resource Sharing)
> It allows you to make requests from one website to another website in the browser, which is normally prohibited by another browser policy called the Same-Origin Policy (SOP).

**CORS is used for protecting client side.**   

Example:
 *you might go to a banking website and provide some credentials to log into your account. Your username is stored in a secure browser cookie for a certain period of time so the bank can tell you are still logged in instead of having you login another time with each page you access.* 

 *Later on, you go to an innocent-seeming webpage listing some facts about bunnies. Unbeknownst to you, the webpage’s HTML also has a little Javascript script to make an AJAX request (see: XMLHttpRequest) to the previous banking website to make a wire transaction to another account. Because your session is still authenticated with the cookie that was stored earlier, the banking website thinks it’s just you clicking on a link on their site to submit a wire transaction. Oh no!*

 Solution: 
 *CORS allows servers to specify certain trusted ‘origins’ they are willing to permit requests from. Origins are defined as the combination of protocol (http or https), host (a domain like `www.example.com` or an IP address) and port. Browsers which implement the CORS policy will include a HTTP header called ‘Origin’ in requests made with AJAX, including above information the value.*

### SSL and TLS
* `SSL(Secure Sockets Layer)`: the old standard security technology for creating an encrypted network link between a server and client, ensuring all data passed is private and secure.   
* `TLS(Transport Layer Security)`: modern way of SSL

## HTTPS
> **HTTPS (HyperText Transfer Protocol Secure)** is an encrypted version of the HTTP protocol. 

It uses SSL or TLS to **encrypt** all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, such as when performing banking activities or online shopping.

Advantages:
* **Data Encryption**
(Even data is exposed to the hacker, they cannot do anything as data is already encrypted)
![httpsencryption](/assets/images/httpsencryption.png)
* **Server Authentication**
(If the certificate and the website policies mismatch, a user will get the notification as an unsecured connection and will ask your permission to proceed further.)
* **Data Protection**
  HTTPS does not save any kind of data (or very limited) on the client system. So HTTPS ensures data protection.

## Reference
* https://www.cyc2018.xyz/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/HTTP/HTTP.html#%E4%B8%80-%E3%80%81%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5
* https://www.pcskull.com/https-instead-of-http-to-secure-website/
* https://medium.com/@electra_chong/what-is-cors-what-is-it-used-for-308cafa4df1a
