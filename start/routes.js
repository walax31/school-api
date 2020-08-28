'use strict'

const TeacherController = require('../app/Controllers/Http/TeacherController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=>{
  //api rount start here na ka
  Route.get('/teachers','TeacherController.index')
  Route.get('/teachers/:id','TeacherController.show')
  Route.post('/teachers','TeacherController.store')

}).prefix('api/v1')
