export class Comic {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly imageUrl: string,
  ) {
    // We want to enforce that all stories have ID and title
    if (!id || !title) {
      throw new Error(
        'Error fetching story id: ' + id + ', or title: ' + title,
      );
    }
  }
}

export const parseComic = (json: any): Comic | undefined => {
  try {
    const story = new Comic(
      json.id,
      json.title,
      json.description,
      json.imageUrl,
    );

    return story;
  } catch (error) {
    return undefined;
  }
};
