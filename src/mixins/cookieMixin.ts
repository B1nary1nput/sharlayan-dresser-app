
import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'
const shared = namespace('shared');


@Component
export default class cookieMixin extends Vue {
  @shared.Getter
  public LOGIN_STATE!: boolean;

  @shared.Action
  public saveLoginState!: (newName: boolean) => void;

  @shared.Action
  public saveUserId!: (userId: string) => void;

  @shared.Action
  public saveUserInfo!: (userInfo: { userId: string, username: string }) => void;


  public setUserIdCookie(cookieName: string, value: any, rememberMe: any): void {
    if (rememberMe) {
      document.cookie = `${cookieName}=${value};max-age=345600;expires=${new Date(Date.now() + 345600)}` // max age and expire is 4 days
    } else {
      document.cookie = `${cookieName}=${value};max-age=86400;expires=${new Date(Date.now() + 86400)}` // max age and expire is 1 day
    }
  }


  public getCookie(cookieName: string): string {
    return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop() || ''
  }
}
