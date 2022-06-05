import { DemoMemberRepository } from "@/api/demo/dao/DemoMemberRepository";
import { DemoMember } from "@/api/demo/vo/DemoMember";


export class DemoMemberService {
  private memberRepository: DemoMemberRepository; 

  constructor(memberRespository: DemoMemberRepository)  {
    this.memberRepository = memberRespository;
  }

  public getDemoMember(userId: string): DemoMember { 
    return this.memberRepository.getMember(userId);
  }

}///~