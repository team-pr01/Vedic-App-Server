export type TNewsTranslation = {
  title: string;
  content: string;
  tags: string[];
  category: string;
};

export type TNews = {
  imageUrl: string;
  translations: {
    [languageCode: string]: TNewsTranslation;
  };
};
