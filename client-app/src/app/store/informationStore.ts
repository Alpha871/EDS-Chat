import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { InformationInput } from "../models/information";

export default class InformationStore {
  informations: InformationInput[] = [];
  selectedInfnormation: InformationInput | null = null;
  gsInformation: string = "";
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setInformations = (informations: InformationInput[]) => {
    this.informations = informations;
  };

  setSelectedInformation = (information: InformationInput) => {
    this.selectedInfnormation = information;
  };
  setGsInformations = (informations: InformationInput[]) => {
    informations.map((info) => {
      this.gsInformation += info.information + "\n";
    });
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  clearInformations = () => {
    this.informations = [];
  };
  clearInformation = () => {
    this.selectedInfnormation = null;
  };

  getInformations = async () => {
    this.setLoading(true);
    try {
      const infos = await agent.Information.list();
      this.setInformations(infos);
      this.setGsInformations(infos);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  getInformation = async (id: string) => {
    this.setLoading(true);
    try {
      const info = await agent.Information.details(id);
      this.setSelectedInformation(info);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  addInformation = async (information: string) => {
    this.setLoading(true);
    try {
      await agent.Information.create(information);
      this.getInformations();
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  updateInformation = async (val: { id: string; information: string }) => {
    this.setLoading(true);
    try {
      await agent.Information.update(val);
      runInAction(() => {
        this.informations = this.informations.map((c) =>
          c.id === val.id ? { ...c, prompt: val.information } : c
        );
        this.selectedInfnormation = { ...val };
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  deleteInformation = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Information.delete(id);
      runInAction(() => {
        this.informations = this.informations.filter((i) => i.id !== id);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };
}
