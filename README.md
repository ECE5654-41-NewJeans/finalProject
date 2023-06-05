# React gRPC Chat Application

## ECE5654 Term Project

### Team. <b><span style="color:skyblue">LEE CHANWOO, SUCK BOHYUN</span></b>
<hr><br>

## Things you need to run this application

1. Node.JS
2. Docker
3. protoc
4. yarn

## Project setup

```
docker compose up -d
yarn install
yarn proto:gen
yarn start
cd client && yarn install
yarn start
```

## Error solution
1. docker compose error
   ![docker error](/oldjeans/readmeImg/docker_error_sol.PNG)
   Expose daemon on tcp://localhost:2375 without TLS <b><span style="color:red">disable cheack</span></b>

### References
```
React gRPC tutorial: 
https://www.youtube.com/watch?v=NFZbTy_B4H0&t=924s
```