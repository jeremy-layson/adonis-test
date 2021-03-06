import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {
  public async login({auth, request, response, logger}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    
    try {
      const user = await User
      .query()
      .where('email', email)
      .firstOrFail()
      logger.info(await Hash.verify(user.password, password))
      
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials.')
      }

      const token = await auth.use('api').generate(user)

      return token
    } catch (e) {
      logger.error(e)
      return response.unauthorized('Invalid Credentials')
    }
  }
}
