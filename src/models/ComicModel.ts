export class Comic {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly imageUrl: string,
  ) {}
}

export const parseComic = (json: any): Comic | undefined => {
  try {
    const comic = new Comic(json.num, json.title, json.alt, json.img);

    return comic;
  } catch (error) {
    console.error('Erorr parsing comic: ', error);
    return undefined;
  }
};
