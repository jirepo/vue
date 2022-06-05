import { ajax } from '@/api/common/http'

export default class BlogRepository {

  constructor() {
  }

  /**
   * 블로그 포스트를 등록한다. 
   * @param contents 포스트 내용 
   * @returns 
   *   Promise 인스턴스 
   */
  public async insertPost(post: object): Promise<any> {

    // ajax test
    let options = {
      url: "http://localhost/blog/insert-post",
      method: "POST",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
      body: post
    };

    let response = await ajax(options);
    return response;
  }//:


    /**
   * 블로그 포스트를 수정한다. 
   * @param contents 포스트 내용 
   * @returns 
   *   Promise 인스턴스 
   */
     public async updatePost(post: object): Promise<any> {

      // ajax test
      let options = {
        url: "http://localhost/blog/update-post",
        method: "POST",
        headers: {
          Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
          "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
        },
        body: post
      };
  
      let response = await ajax(options);
      return response;
    }//:
    
  /**
   * 사용자의 포스트 목록을 요청한다. 
   * @returns Promise를 반환한다. 
   */
  public async selectBlogPosts(blogId:string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-blog-posts/" + blogId,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);
  }//:
  /**
   * 블로그 정보를 반환한다. 
   * @returns Promise를 반환한다. 
   */
   public async selectBlog(blogId:string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-blog/" + blogId,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);
  }//:

  /**
   * 
   * @param blogId 
   * @returns 
   */
  public async selectBlogTags(blogId:string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-blog-tags/" + blogId,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);
  }//:

  public async selectPost(postId: string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-post/" + postId,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);

  }//:

  
  public async selectPosts(direction:string ="next", dateStr: string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-posts/" + direction + "/" +  dateStr,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);

  }//:

  public async selectTagPosts(blogId: string, tagId: string): Promise<any> {
    // ajax test
    let options = {
      url: "http://localhost/blog/select-tag-posts/" + blogId + "/" + tagId,
      method: "GET",
      headers: {
        Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
        "Content-Type": "application/json", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
      },
    };
    return await ajax(options);
  }//:

}///~