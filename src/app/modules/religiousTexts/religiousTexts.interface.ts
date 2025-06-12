export type TReligiousText = {
  vedaName: string;
  originalText: string;
  devanagariText?: string;
  hindiTranslation?: string;
  englishTranslation?: string;
  tags?: string[];
  notes?: string;
  // Rigved
  mandala?: number | null;

  // Samved
  section?: "Purvarchika" | "Uttararchika" | "";
  chantNumber?: number | null;

  // Yajurved
  branch?: "Shukla" | "Krishna" | "";
  chapterNumber?: number | null;
  verseNumber?: number | null;

  // Atharvaved
  kandNumber?: number | null;
  suktaNumber?: number | null;
};
