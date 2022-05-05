
import Axios from 'axios'
import Vue from 'vue';
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'
const shared = namespace('shared');
import VueRouter, { Route } from 'vue-router'
import cookieMixin from './cookieMixin';

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
export default class userAuthMixin extends Mixins(cookieMixin) {
  // @shared.Getter
  // public LOGIN_STATE!: boolean;

  @shared.Getter
  public USER_INFO!: any;

  // @shared.Action
  // public saveLoginState!: (newName: boolean) => void;

  // @shared.Action
  // public saveUserId!: (userId: string) => void;

  @shared.Action
  public saveUserInfoState!: (userInfo: { userId: string, username: string }) => void;


  // Handle the login request, and set their login status. 
  // Mainly used for menu items and display of the logout button
  public login(user: loginUserInfo): Promise<void> {
    return Axios.post(`${apiEndpoint}/login`, user, {
      withCredentials: true,
    })
  }


  // When the user clicks the logout button, remove all traces of their logged in status
  public async logout(): Promise<void> {
    this.clearUserInfo();

    Axios.get(`${apiEndpoint}/logout`, {
      withCredentials: true,
    }).then(() => {
      this.$router.push({ path: '/' }) // redirect to login page
    })
  }


  // Handle the signup request
  public async signup(user: signupUserInfo): Promise<void> {
    return await Axios.post(`${apiEndpoint}/signup`, user).catch(error => {
      return error.response;
    })
  }


  public async confirmUser(tokenId: string): Promise<void> {
    return await Axios.post(`${apiEndpoint}/confirmation/${tokenId}`, {
      withCredentials: true,
    }).catch(error => {
      return error.response
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

    // if user and id cookies doesn't exist
    if (localUserId.length <= 0 && localUsername.length <= 0) {
      this.logout();


      this.$router.push({
        path: '/'
      }).catch((err) => {
        console.error('❌ ', err);
      })
    } else {
      // if the user turns out to be logged in, just store the info in the vuex store
      this.storeUserInfo(localUserId, localUsername);
    }
  }


  public redirectIfLoggedIn(): void {
    const localUserId: string = this.getCookie('user_id_app');
    const localUsername: string = this.getCookie('username_app');

    // if user and id cookies doesn't exist
    if (localUserId.length > 0 && localUsername.length > 0) {
      if (localStorage.getItem('loggedIn') == "1") {
        this.storeUserInfo(localUserId, localUsername);
      }

      this.$router.push({
        path: '/glams'
      }).catch((err) => {
        console.error('❌ ', err);
      })
    }
  }


  // generic method for saving userinfo in cookies and store
  public storeUserInfo(userId: string, username: string, rememberMe?: boolean): void {
    localStorage.setItem('loggedIn', '1');
    this.saveLoginState(true);
    this.saveUserId(userId);

    this.saveUserInfoState({
      userId: userId,
      username: username
    })

    this.setUserIdCookie('user_id_app', userId, rememberMe);
    this.setUserIdCookie('username_app', username, rememberMe);
  }


  // generic method for clearing userinfo in cookies and store
  public clearUserInfo(): void {
    // remove logininfo from localstorage and cookies
    localStorage.removeItem('loggedIn');
    this.deleteCookie('user_id_app');
    this.deleteCookie('username_app');
    this.saveLoginState(false);
    this.saveUserInfoState({
      userId: '',
      username: ''
    })
  }
}
