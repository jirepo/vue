import { ajax } from '@/api/common/http'
import { debug, error } from '@/api/environment'
import { info } from '../../../environment';

export default class LoginRepository {

  private readonly URL_LOGIN: string  = "/auth/login";
  private readonly URL_IS_SIGNED: string =  "/auth/is-signed";

  constructor() {
  }

  public async login(userVo: object): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/auth/login",
      method: "POST",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
      body: userVo
    };

    let response = await ajax(options);
    return response;
  }//:


  /**
   * 사용자가 로그인했는지 체크한다.
   * @returns 로그인 되었으면 true를 반환한다. 
   */
     public async getLoginUser(): Promise<any> {
      let options = {
        url: "http://localhost/auth/get-login-user",
        method: "GET",
        headers: {
          Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
          "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
        },
      };
      let response = await ajax(options);
      return response;
    }

    
  /**
   * 사용자가 로그인했는지 체크한다.
   * @returns 로그인 되었으면 true를 반환한다. 
   */
  public async isLogined(): Promise<any> {
    let options = {
      url: "http://localhost/auth/is-logined",
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    let response = await ajax(options);
    return response;
  }
}///~