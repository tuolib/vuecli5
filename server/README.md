# app 分支

## Project setup

```
npm install
```

### Run

development

```
yarn dev
```

or

```
npm run dev
```

### 接口定义

#### 请求参数说明

- 所有接口均在 headers 头添加 authtoken 字段（登录、注册接口除外），jwt 验证登录有效性

#### 返回参数说明

- 返回 json 数据结构示例如下：

```json
{
  "respCode": "10000", //为了简单，这个项目中此字段作用不大
  "respMsg": "operate success", //接口返回提示语句
  "success": 1, //成功为1，失败为0
  "content": {
    "name": "Bob",
    "isOnline": true,
    "age": 18
  }
}
```

#### 1 注册

- **接口地址：** /api/system/user/userSignUp
- **请求方法：** POST
- 请求参数：

| 参数名称        | 类型   | 是否必须 | 描述         |
| :-------------- | :----- | :------- | :----------- |
| username        | string | true     | 用户名       |
| password        | string | true     | 密码         |
| confirmPassword | string | true     | 确认密码     |
| firstName       | string | true     | 名字（必须） |
| lastName        | string | false    | 名字(可选)   |

- 返回结果：

| 参数名称   | 类型   | 是否必须 | 描述                                     |
| :--------- | :----- | :------- | :--------------------------------------- |
| token      | string | true     | 用户名                                   |
| userType   | int    | true     | 密码                                     |
| username   | string | true     | 确认密码                                 |
| firstName  | string | true     | 名字（必须）                             |
| lastName   | string | false    | 名字(可选)                               |
| userId     | int    | true     | 用户 id                                  |
| colorId    | int    | true     | 用户头像没有时显示颜色 id(0-17 随机生成) |
| avatar     | int    | false    | 用户头像 id, 没有头像返回 0              |
| avatarUrl  | string | false    | 用户头像地址, 没有头像返回空             |
| avatarName | string | false    | 用户头像名称, 没有头像返回空             |

```json
{
  "respCode": "10000",
  "respMsg": "operate success",
  "success": 1,
  "content": {
    "token": "token",
    "userType": "",
    "username": "",
    "firstName": "",
    "lastName": "",
    "userId": "",
    "colorId": "",
    "avatar": "头像id",
    "avatarUrl": "",
    "avatarName": ""
  }
}
```

#### 2 密码登录

- **接口地址：** /api/system/userLogin/login
- **请求方法：** POST
- 请求参数：

| 参数名称 | 类型   | 是否必须 | 描述   |
| :------- | :----- | :------- | :----- |
| username | string | true     | 用户名 |
| password | string | true     | 密码   |

- 返回结果：

| 参数名称   | 类型   | 是否必须 | 描述                                     |
| :--------- | :----- | :------- | :--------------------------------------- |
| token      | string | true     | 用户名                                   |
| userType   | int    | true     | 密码                                     |
| username   | string | true     | 确认密码                                 |
| firstName  | string | true     | 名字（必须）                             |
| lastName   | string | false    | 名字(可选)                               |
| userId     | int    | true     | 用户 id                                  |
| colorId    | int    | true     | 用户头像没有时显示颜色 id(0-17 随机生成) |
| avatar     | int    | false    | 用户头像 id, 没有头像返回 0              |
| avatarUrl  | string | false    | 用户头像地址, 没有头像返回空             |
| avatarName | string | false    | 用户头像名称, 没有头像返回空             |

```json
{
  "respCode": "10000",
  "respMsg": "operate success",
  "success": 1,
  "content": {
    "token": "token",
    "userType": "",
    "username": "",
    "firstName": "",
    "lastName": "",
    "userId": "",
    "colorId": "",
    "avatar": "头像id",
    "avatarUrl": "",
    "avatarName": ""
  }
}
```

#### 3 退出登录

- **接口地址：** /api/system/userLogin/logout
- **请求方法：** POST
- 请求参数：

| 参数名称 | 类型 | 是否必须 | 描述 |
| :------- | :--- | :------- | :--- |


#### 4 获取个人信息

- **接口地址：** /api/account/person/info
- **请求方法：** POST
- 请求参数：

| 参数名称 | 类型 | 是否必须 | 描述 |
| :------- | :--- | :------- | :--- |


- 返回结果：

| 参数名称   | 类型   | 是否必须 | 描述                                     |
| :--------- | :----- | :------- | :--------------------------------------- |
| token      | string | true     | 用户名                                   |
| userType   | int    | true     | 密码                                     |
| username   | string | true     | 确认密码                                 |
| firstName  | string | true     | 名字（必须）                             |
| lastName   | string | false    | 名字(可选)                               |
| userId     | int    | true     | 用户 id                                  |
| colorId    | int    | true     | 用户头像没有时显示颜色 id(0-17 随机生成) |
| avatar     | int    | false    | 用户头像 id, 没有头像返回 0              |
| avatarUrl  | string | false    | 用户头像地址, 没有头像返回空             |
| avatarName | string | false    | 用户头像名称, 没有头像返回空             |

```json
{
  "respCode": "10000",
  "respMsg": "operate success",
  "success": 1,
  "content": {
    "token": "token",
    "userType": 3,
    "username": "abcde",
    "firstName": "Bob",
    "lastName": "Job",
    "userId": 1111,
    "colorId": 1,
    "avatar": 12,
    "avatarUrl": "https://4ursafety.ml/xxxx",
    "avatarName": "abc.jpg"
  }
}
```
