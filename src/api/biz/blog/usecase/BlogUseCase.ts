
import BlogRepository from '../repository/BlogRepository'

export default class BlogUseCase  {
  protected blogRepository: BlogRepository; 
  protected store: any;
  constructor(store:any) {
    this.store = store; 
    this.blogRepository = new BlogRepository();
  }
  /**
   * 블로그 포스트를 등록한다. 
   * @param content 블로그 포스트 내용
   * @returns Promise 인스턴스 
   */
  public async insertPost(post:object): Promise<any> { 
    return await this.blogRepository.insertPost(post);
  }//:

   /**
   * 블로그 포스트를 수정한다. 
   * @param content 블로그 포스트 내용
   * @returns Promise 인스턴스 
   */
    public async updatePost(post:object): Promise<any> { 
      return await this.blogRepository.updatePost(post);
    }//:
  /**
   * 사용자 블로그의 포스트 목록을 가져온다. 
   * @returns  Promise
   */
  public async selectBlogPosts(blogId:string): Promise<any> {
    return await this.blogRepository.selectBlogPosts(blogId)
  }//:

  /** 블로그 태그 목록을 가져온다. */
  public async selectBlogTags(blogId:string): Promise<any> {
    return await this.blogRepository.selectBlogTags(blogId)
  }//:
  
  public async selectPost(postId:string): Promise<any> {
    return await this.blogRepository.selectPost(postId)
  }//:
  public async selectPosts(direction:string="next", dateStr:string): Promise<any> {
    return await this.blogRepository.selectPosts(direction, dateStr)
  }//:

  public async selectTagPosts(blogId: string, tagId:string): Promise<any> {
    return await this.blogRepository.selectTagPosts(blogId, tagId)
  }//:
  public async selectBlog(blogId: string): Promise<any> {
    return await this.blogRepository.selectBlog(blogId)
  }//:

  public getUserBlogs(): any {
    return this.store.state.blog.userBlogs;
  }

}///~