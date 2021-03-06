# Sample Project


Project allows chores to be scheduled amongst participants.

Built with Javascript, node (express), postgreSql

## Prerequisites
### Environment variables used:
```
    DB_USERNAME
    DB_PASSWORD
    DB_DATABASE
    DB_HOST
```
Before you begin, ensure you have met the following requirements:
<!--- These are just example requirements. Add, duplicate or remove as required --->
* You have installed the latest versions of
>* postgreSQL
Create a database and user and update your environment variables `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD` and `DB_DATABASE`

## Installing

To install project, follow these steps:

Linux and macOS:
```
npm install
```

## Using


To use, follow these steps:

Migrate the DB to the latest version
```
npm run migrate
```
### Running in Development

To run in a development environment
```
npm run start:dev
```

### Running in Production

*Coming Soon*

## Endpoints

### User Endpoints
`/api/v1/users` 

#### Create a new User

`POST /api/v1/users` 
Body

```javascript
{
    name: Required,
    email: Required
}
```

#### Get all Users
`GET /api/v1/users` 
 
### Chore Endpoints
`/api/v1/chores` 


#### Create a new Chore
`POST /api/v1/chores` 
Body
```javascript
{
    name: Required,
    description: Required
}
```

#### Get all Chore
`GET /api/v1/chores`

#### Get/Update/Delete Single Chore
`GET /api/v1/chores/:id` 
`id` is the Id of the chore

#### Schecdule a Chore

`POST /api/v1/chores/:id/schedule`
```javascript
{
    user: Required, //(The user id)
    type: Required, // (one of ['one-off', 'daily', 'weekly',  'monthly'])
    schedule_date: Optional // Defaults to today's date (only used with one-off)
}
```
### Schedule Endpoints
`/api/v1/schedules`

#### Schedule a Chore

`POST /api/v1/schedules`
```javascript
{
    chore: Required, // (the id of the chore)
    user: Required, //(The user id)
    type: Required, // (one of ['one-off', 'daily', 'weekly',  'monthly'])
    schedule_date: Optional // Defaults to today's date (only used with one-off)
}
```

#### List Upcoming Chores
`GET /api/v1/schedules/:userId`

`userId` is the id of the users whos chores are to be listed

## Contact

If you want to contact me you can reach me at <fidelis.ojeah@gmail.com>.
