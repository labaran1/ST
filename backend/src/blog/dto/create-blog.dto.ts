export class CreateBlogDto {
  readonly title: string;
  readonly body: string;
  readonly author: string;
  readonly date: string;
  readonly image!: string;
  readonly topics!: string[];
  readonly tags: string[];
  readonly comments!: string[];
  readonly reactions!: {
    readonly likes: string[];
    readonly dislikes: string[];
    readonly loves: string[];
  };
}
