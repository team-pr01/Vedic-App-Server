export type TNewsTranslation = {
  title: string;
  content: string;
  tags: string[];
};

export type TNews = {
  title: string;
  imageUrl: string;
  category: string;
  content: string;
  tags: string[];
  translations: {
    [languageCode: string]: TNewsTranslation;
  };
};
