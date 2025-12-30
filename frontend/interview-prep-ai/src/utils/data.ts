export interface Feature {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export const APP_FEATURES: Feature[] = [
  {
    id: "01",
    titleKey: "features.noGenericQuestions.title",
    descriptionKey: "features.noGenericQuestions.description",
  },
  {
    id: "02",
    titleKey: "features.learnAtYourSpeed.title",
    descriptionKey: "features.learnAtYourSpeed.description",
  },
  {
    id: "03",
    titleKey: "features.neverLoseTrack.title",
    descriptionKey: "features.neverLoseTrack.description",
  },
  {
    id: "04",
    titleKey: "features.understandDontMemorize.title",
    descriptionKey: "features.understandDontMemorize.description",
  },
  {
    id: "05",
    titleKey: "features.allInOnePlace.title",
    descriptionKey: "features.allInOnePlace.description",
  },
];
