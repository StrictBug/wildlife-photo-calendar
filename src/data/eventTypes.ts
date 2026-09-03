import type { WildlifeEvent } from "@/lib/types";

export type WildlifeEventDraft = Omit<
  WildlifeEvent,
  "climates" | "kind" | "natureSubjects" | "subjectLabels"
> & {
  kind?: "wildlife";
  natureSubjects?: [];
  subjectLabels?: [];
};

export type NatureEventDraft = Omit<WildlifeEvent, "climates"> & {
  kind: "nature";
  animals: [];
  animalLabels: [];
};

export type EventDraft = WildlifeEventDraft | NatureEventDraft;
