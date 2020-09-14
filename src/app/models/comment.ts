import { Author } from './article';

export class Comment {
    id: number = 0;
    createdAt: string = "";
    updatedAt: string = "";
    body: string = "";
    author: Author = new Author();
}