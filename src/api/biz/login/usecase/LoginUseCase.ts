
import LoginRepository from '../repository/LoginRepository'

/**
 * 로그인 UseCase. 
 */
export default class LoginUseCase  {

  /** 로그인 Repository */
  protected loginRepository: LoginRepository;
  protected store: any; 

  /** 생성자 */
  constructor(store: any) {
    this.store = store; 
    // loginRepository 인스턴스 생성 
    this.loginRepository = new LoginRepository(); 
  }
  
  /**
   * 사용자 정보를 가져와서 localStorage에 저장하고 반환한다. 
   * @param userVo 로그인 사용자 정보 
   * @returns Promise 인스턴스 반환 
   */
  public async login(userVo:object): Promise<any> { 

    let message = { 
      statusCode: 200, 
      jwtToken: "", 
      payload: userVo 
    }

    let response = await this.loginRepository.login(message);
    //console.log(response)
    //localStorage.setItem('loginUser', JSON.stringify(response))
    return response
  }//:
  
  /** 로그인한 사용자인지 확인한다. */
  public isLoginedStore(): boolean {
    return (this.store.state.loginUser)? true: false; 
  }

  /**
   * 사용자가 로그인되었는지 확인한다. 
   * @deprecated 
   */
  public isLoginedServer(): Promise<any> {
    return this.loginRepository.isLogined();
  }//:

  public getLoginUser(): Promise<any> {
    return this.loginRepository.getLoginUser();
  }//:

}///~