9글9글9글 9조 구글링해봤어 team project

8/7 프로젝트 세팅

"dependencies": {
"@babel/cli": "^7.22.9",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"mysql2": "^3.5.2",
"node-cache": "^5.1.2",
"readline": "^1.3.0",
"sequelize": "^6.32.1"
},
"devDependencies": {
"@babel/core": "^7.22.9",
"@babel/node": "^7.22.6",
"@babel/preset-env": "^7.22.9",
"jest": "^29.6.2",
"nodemon": "^3.0.1",
"prettier": "^3.0.0",
"sequelize-cli": "^6.6.1",
"supertest": "^6.3.3"
}

```
9gle9gle9gle-9team-project
─ src
   ├─ app.js
   ├─ cache.js
   ├─ controllers
   │  ├─ boards.controller.js
   │  └─ columns.controller.js
   ├─ db
   │  ├─ index.js
   │  ├─ models
   │  │  ├─ access.js
   │  │  ├─ boards.js
   │  │  ├─ cards.js
   │  │  ├─ columns.js
   │  │  ├─ comments.js
   │  │  ├─ enum.js
   │  │  └─ users.js
   │  ├─ relations
   │  │  ├─ access.relation.js
   │  │  ├─ boards.relation.js
   │  │  ├─ cards.realtaion.js
   │  │  ├─ columns.relation.js
   │  │  ├─ comments.relation.js
   │  │  ├─ index.js
   │  │  └─ users.relation.js
   │  └─ sequelize.js
   ├─ env.js
   ├─ init.js
   ├─ repositories
   │  ├─ boards.repository.js
   │  └─ columns.repository.js
   ├─ routes
   │  ├─ boards.routes.js
   │  └─ columns.routes.js
   └─ services
      ├─ boards.service.js
      ├─ columns.service.js
      └─ message.js

```
