import { makeAutoObservable, runInAction } from 'mobx'
import { ISimpleState } from '../model/state'
import { ILoginData } from '../model/login'
import { AuthService } from '../services/auth'

export const AuthStore = makeAutoObservable({
  isAuth: !!localStorage.getItem('access_token'),
  state: 'unset' as ISimpleState,

  async login(data: ILoginData) {
    this.state = 'loading'
    const res = await AuthService.login(data)
    runInAction(() => {
      if (res.error) {
        this.isAuth = false
        this.state = 'error'
      } else {
        localStorage.setItem('access_token', res.data.accessToken)
        this.isAuth = true
        this.state = 'success'
      }
    })
    return res
  },

  logout() {
    localStorage.removeItem('access_token')
    this.isAuth = false
    this.state = 'success'
  },
})
