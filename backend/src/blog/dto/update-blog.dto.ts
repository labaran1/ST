import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto {
  readonly title: string;
  readonly body: string;
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
