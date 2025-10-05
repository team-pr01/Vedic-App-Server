export type TBooks = {
    imageUrl?: string;
    name: string;
    type : "veda" | "purana" | "upanishad";
    structure : "Chapter-Verse" | "Mandala-Sukta-Rik" | "Kanda-Sarga-Shloka" | "Custom";
    // if structure is custom then
    level1Name? : string;
    level2Name? : string;
    level3Name?: string;
};
