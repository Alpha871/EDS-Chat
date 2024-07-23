import { InformationInput } from "./information";
import { CustomPromptInput } from "./prompt";

export interface ICompanyInput {
  id?: string;
  name: string;
  description: string;
  instructions: string;
  informations?: InformationInput[];
  customPrompts?: CustomPromptInput[];
}

export class CompanyInput implements ICompanyInput {
  id?: string;
  name: string;
  description: string;
  instructions: string;
  informations?: InformationInput[];
  customPrompts?: CustomPromptInput[];

  constructor(init: CompanyInputValues) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description;
    this.instructions = init.instructions;
    this.informations = init.informations;
    this.customPrompts = init.customPrompts;
  }
}

export class CompanyInputValues {
  id?: string | undefined;
  name: string = "";
  description: string = "";
  instructions: string = "";
  informations?: InformationInput[] = [];
  customPrompts?: CustomPromptInput[];
  constructor(company?: CompanyInputValues) {
    if (company) {
      this.id = company.id;
      this.name = company.name;
      this.description = company.description;
      this.instructions = company.instructions;
      this.informations = company.informations;
      this.customPrompts = company.customPrompts;
    }
  }
}
