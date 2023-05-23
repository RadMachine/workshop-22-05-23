import { isAxiosError } from 'axios'
import { $api } from '../http'
import { ILoginData, ILoginResponse } from '../model/login'

export const AuthService = {
  async login(data: ILoginData) {
    try {
      const res = await $api.post<ILoginResponse>('/auth/login', data)
      return { data: res.data }
    } catch (error) {
      if (isAxiosError(error)) {
        return { error }
      }
      throw error
    }
  },
}
