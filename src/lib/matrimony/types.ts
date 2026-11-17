import type { Gender } from "./constants";

export type ProfileInput = {
  displayName: string;
  gender: Gender | "";
  age: number;
  city: string;
  state: string;
  caste: string;
  rashi: string;
  nakshatra: string;
  jataka: string;
  jatakaFileName: string;
  jatakaFileType: string;
  jatakaFileData: string;
  about: string;
  education: string;
  profession: string;
  photoKey: string;
  photoClose: string;
  photoFull: string;
};

export type PublicProfile = {
  id: string;
  displayName: string;
  gender: string;
  age: number;
  city: string;
  state: string;
  caste: string;
  rashi: string;
  nakshatra: string;
  jataka: string | null;
  jatakaFileName: string | null;
  jatakaFileType: string | null;
  jatakaFileData: string | null;
  about: string | null;
  education: string | null;
  profession: string | null;
  photoKey: string;
  photoClose: string | null;
  photoFull: string | null;
  sample: boolean;
  isSelf: boolean;
  revealed: boolean;
};

export type Viewer = {
  isSteward: boolean;
  hasProfile: boolean;
  circleRequested: boolean;
  photosOpen: boolean;
  displayName: string | null;
};

export type AccountOverview = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  hasProfile: boolean;
  circleRequested: boolean;
  photosOpen: boolean;
  isSteward: boolean;
};

export type Ledger = {
  accounts: AccountOverview[];
  profiles: PublicProfile[];
};

export const EMPTY_PROFILE: ProfileInput = {
  displayName: "",
  gender: "",
  age: 0,
  city: "",
  state: "",
  caste: "",
  rashi: "",
  nakshatra: "",
  jataka: "",
  jatakaFileName: "",
  jatakaFileType: "",
  jatakaFileData: "",
  about: "",
  education: "",
  profession: "",
  photoKey: "study-a",
  photoClose: "",
  photoFull: "",
};
