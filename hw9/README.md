# Web Programming HW#9

### 全端服務的網址
https://wp1111-deploy-demo-production.up.railway.app/
### 服務功能
add scorecard & clear database
### Deployment 的步驟
1. 在 project root 底下的 package.json 加入以下 scripts

```javascript=
{
  ...
  "scripts": {
    ...
      "install:prod": "cd frontend && yarn install --freeze-lockfile && cd ../backend && yarn install --freeze-lockfile",
      "build": "cd frontend && yarn build",
      "deploy": "cd backend && yarn deploy"
},
  ...
```
2. 在backend/package.json加入以下scripts
```javascript=
"scripts": {
  ...
  "deploy": "NODE_ENV=production babel-node src/server.js"
}
```
3. 在 frontend/src/api.js 定義 API
```javascript=
import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";

export const api = axios.create({ baseURL: API_ROOT });

```
4. 在 backend/src/server.js 分別處理 production 與 development 的情況
```javascript=
import path from "path";

import express from "express";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log('development mode');
  app.use(cors());
}

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
```
5. 在 project root 新增 Dockerfile
```
FROM node:16-alpine

EXPOSE 4000

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

CMD ["yarn", "deploy"]
```
6. 在 railway.app 創一個帳號，新增一個 project ，選"Provision MongoDB"
7. 點開 mongo db，在 connection 欄位複製 Mongo Connection URL
\
![](https://i.imgur.com/fyTQjOO.png)

9. 跟著助教的 [tutorial](https://hackmd.io/@madmaxie/SJGCUr8Oo#setup-a-project-on-Railwayapp) deploy，但記得在你的 project 的 varaibles 欄位新增 MONGO_URL，並把 Mongo Connection URL 貼在 "VALU3"。
\
![](https://i.imgur.com/nMLrabq.png)

### 經驗分享
mac 裝 docker要打 brew install --cask docker 才會載到 docker 的 app

	
	
	
	
		
		
