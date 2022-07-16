import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {
  public async index({request, response, logger}: HttpContextContract) {
    
    return User.all();
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);

    const user = await User.create(payload);

    return user;
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
