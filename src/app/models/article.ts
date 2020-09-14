export class Article {
    slug: string = "";
    title: string = "";
    description: string = "";
    body: string = "";
    tagList: string[] = [];
    createdAt: string = "";
    updatedAt: string = "";
    favorited: boolean = false;
    favoritesCount: number = 0;
    author: Author = new Author();
}

export class Author {

    username: string = "";
    bio: string = "";
    image: string = "";
    following: boolean = false;
}