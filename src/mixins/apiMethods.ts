
import Axios from 'axios'
import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'
import { IGlam } from '@/interface/glam';

const shared = namespace('shared');

const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;


@Component
export default class userAuthMixin extends Vue {
  @shared.Getter
  public LOGIN_STATE!: boolean;

  @shared.Getter
  public USER_ID!: string;

  @shared.Action
  public saveLoginState!: (newName: boolean) => void;

  @shared.Action
  public saveUserId!: (userId: string) => void;


  // Handle the login request, and set their login status. 
  // Mainly used for menu items and display of the logout button
  public async createGlam(glam: IGlam): Promise<void> {
    return await Axios.post(`${apiEndpoint}/userGlamPost/${this.USER_ID}`, glam, {
      withCredentials: true,
    }).catch(err => {
      return err.response;
    })
  }


  // Handle the signup request
  public async deleteGlam(glam: IGlam): Promise<void> {
    return await Axios.delete(`${apiEndpoint}/userGlamDelete/${this.USER_ID}/${glam._id}`, {
      withCredentials: true
    }).catch(error => {
      return error.response;
    })
  }



  public async updateGlams(glams: IGlam[]): Promise<void> {
    return await Axios.post(`${apiEndpoint}/userGlamUpdate/${this.USER_ID}`, {
      withCredentials: true
    }).catch(error => {
      return error.response;
    })
  }

}
