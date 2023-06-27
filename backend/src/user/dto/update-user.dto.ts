export class UpdateUserDto {
  readonly username!: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly DOB!: string;
  readonly Bio!: string;
  readonly followers!: string[];
  readonly following!: string[];
  readonly blogs!: string[];
  readonly socials!: {
    readonly facebook: string;
    readonly twitter: string;
    readonly instagram: string;
    readonly linkedin: string;
    readonly github: string;
  };
  readonly savedBlogs!: string[];
}
