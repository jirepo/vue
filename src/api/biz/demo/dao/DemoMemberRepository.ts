
import { DemoMember } from '@/api/demo/vo/DemoMember'

export interface DemoMemberRepository {
  getMember(userId: string): Promise<DemoMember>; 
}
