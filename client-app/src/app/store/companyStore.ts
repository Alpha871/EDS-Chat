import { CompanyInput } from "../models/companyInput";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";

export default class CompanyStore {
  company: CompanyInput[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCompanies = (companies: CompanyInput[]) => {
    this.company = companies;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  clearCompanies = () => {
    this.company = [];
  };

  getCompanies = async () => {
    try {
      const companies = await agent.Company.list();
      this.setCompanies(companies);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  AddCompany = async (company: CompanyInput) => {
    this.setLoading(true);
    try {
      await agent.Company.create(company);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  updateCompany = async (val: {
    id: string;
    description: string;
    instructions: string;
  }) => {
    this.setLoading(true);
    try {
      await agent.Company.update(val);
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      console.log(error);
    }
  };
}
