import { Dispatch, SetStateAction } from "react";

export interface Company {
  id?: number;
  companyName: string;
  cin: string;
  pin: string;
}

export interface CardElementType extends Company {
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export interface CompanyFormType extends CardElementType {
  setUpdateCard: Dispatch<SetStateAction<boolean>>;
}
