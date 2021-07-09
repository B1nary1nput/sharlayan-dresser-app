
import Axios from 'axios'
import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const shared = namespace('shared');
import VueRouter, { Route } from 'vue-router'

const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;



export interface userInfo {
  username: string;
  password: string;
  remember_me: boolean;
}
@Component
export default class userAuthMixin extends Vue {
  @shared.Getter
  public LOGIN_STATE!: boolean;

  @shared.Action
  public saveLoginState!: (newName: boolean) => void

  // Handle the login request, and set their login status. 
  // Mainly used for menu items and display of the logout button
  public async login(user: userInfo): Promise<void> {
    return await Axios.post(`${apiEndpoint}/login`, user, {
      withCredentials: true,
    }).then((result) => {
      console.log('result:wefwe ', result)
      this.saveLoginState(true) // save the state
      localStorage.setItem('loggedIn', "1")
      return result
    }).catch((error) => {
      localStorage.removeItem('loggedIn')
      this.saveLoginState(false)
      return error.response
    })

    // Axios.get(`${apiEndpoint}`).then((result) => {
    //   console.log('result: ', result);
    // }).catch((error) => {
    //   console.error('Error: ', error);
    // })
  }


  // Handle the signup request
  public async signup(user: userInfo): Promise<void> {
    Axios.post(`${apiEndpoint}/auth/signup`, user, {
      withCredentials: true,
    })
  }


  // If the user is not logged in, they shouldn't be able to see the encounters page
  // even if the page is going to be blank, because of a 'null' user
  public redirectIfNotLoggedIn(): void {
    if (localStorage.getItem('loggedIn') == "1") {
      this.saveLoginState(true);
      return;
    }

    if (!localStorage.getItem('loggedIn') || !this.LOGIN_STATE) {
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('user_id')
      this.saveLoginState(false)
      this.$router.push({ path: '/' }).catch((err) => { console.error("🤷‍♂️") })
    }
  }

  // When the user clicks the logout button, remove all traces of their logged in status
  public async logout(): Promise<void> {

    localStorage.removeItem('user_id')
    Axios.get(`${apiEndpoint}/auth/logout`, {
      withCredentials: true,
    }).then(() => {
      this.saveLoginState(false)
      localStorage.removeItem('loggedIn')
      this.$router.push({ path: '/' }) // redirect to login page
    })
  }
}
