import { DemoMemberRepository } from '@/api/demo/dao/DemoMemberRepository'
import { DemoMember } from '@/api/demo/vo/DemoMember'
import { ajax } from '@/api/common/http' 

export class DemoMemberRepositoryImpl implements DemoMemberRepository {

  private baseUrl: string = "http://localhost";
  private testObj = {
    name: "kim",
    age: 10 
  };
  
  constructor() {
  }
  public async getMember(id: string) : Promise<DemoMember> {

    // for testing 
    let tmpObj = {
      name: "park",
      age: 20,
      addr: "Seoul"
    };

    let reqOptions = Object.assign(this.testObj, tmpObj);
    console.log("====> ReqOptions");
    console.log(reqOptions);


      // ajax test
    let options = {
        url: this.baseUrl + "/getDemoBean",
        method: "GET",
        headers: {
          Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
          "Content-Type": "text/xml", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
        }
    };
    let member = new DemoMember(); 
    let response =  await ajax(options);
    member.userId = response.userId; 
    member.userName = "" + response.age; 
    return member; 
  }
}