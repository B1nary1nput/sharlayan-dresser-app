
import Axios from 'axios'
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'
const shared = namespace('shared');
import VueRouter, { Route } from 'vue-router'

const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;



export interface loginUserInfo {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface signupUserInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rememberMe: boolean;
}

export interface passwordInfo {
  newPassword: string;
  oldPassword: string;
}
@Component
export default class userAuthMixin extends Vue {
  @shared.Getter
  public LOGIN_STATE!: boolean;

  @shared.Action
  public saveLoginState!: (newName: boolean) => void;

  @shared.Action
  public saveUserId!: (userId: string) => void;

  @shared.Action
  public saveUserInfoState!: (userInfo: { userId: string, username: string }) => void;


  // Handle the login request, and set their login status. 
  // Mainly used for menu items and display of the logout button
  public login(user: loginUserInfo): Promise<void> {
    console.log('user: ', user);
    return Axios.post(`${apiEndpoint}/login`, user, {
      withCredentials: true,
    })
  }


  // Handle the signup request
  public async signup(user: signupUserInfo): Promise<void> {
    return await Axios.post(`${apiEndpoint}/signup`, user).catch(error => {
      return error.response;
    })
  }


  // Update password
  public async updatePassword(passwords: passwordInfo): Promise<void> {
    return await Axios.put(`${apiEndpoint}/update-password`, passwords, {
      withCredentials: true
    }).catch(err => {
      return err.response;
    })
  }


  // If the user is not logged in, they shouldn't be able to see the encounters page
  // even if the page is going to be blank, because of a 'null' user
  public redirectIfNotLoggedIn(): void {
    const localUserId: string = this.getCookie('user_id_app');
    const localUsername: string = this.getCookie('username_app');

    if (localStorage.getItem('loggedIn') == "1") {
      this.saveLoginState(true);
      this.saveUserId(localUserId);

      this.saveUserInfoState({
        userId: localUserId,
        username: localUsername
      })
      return;
    }


    if (!localStorage.getItem('loggedIn') || !this.LOGIN_STATE) {
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('user_id')
      this.saveLoginState(false)
      // this.$router.push({ path: '/' }).catch((err) => { console.error("🤷‍♂️") })
    }
  }

  // When the user clicks the logout button, remove all traces of their logged in status
  public async logout(): Promise<void> {
    localStorage.removeItem('user_id')
    Axios.get(`${apiEndpoint}/logout`, {
      withCredentials: true,
    }).then(() => {
      this.saveLoginState(false)
      localStorage.removeItem('loggedIn')
      this.$router.push({ path: '/' }) // redirect to login page
    })
  }


  public async confirmUser(tokenId: string): Promise<void> {
    return await Axios.post(`${apiEndpoint}/confirmation/${tokenId}`, {
      withCredentials: true,
    }).catch(error => {
      return error.response
    })
  }

  public getCookie(cookieName: string): string {
    return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop() || ''
  }
}
