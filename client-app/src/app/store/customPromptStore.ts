import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CustomPromptInput } from "../models/prompt";

export default class CustomPromptStore {
  customPrompts: CustomPromptInput[] = [];
  selectedCustomPrompt: CustomPromptInput | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomPrompts(customPrompt: CustomPromptInput[]) {
    this.customPrompts = customPrompt;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setSelectedCustomPrompt = (customPrompt: CustomPromptInput) => {
    this.selectedCustomPrompt = customPrompt;
  };

  clearCustomPrompts = () => {
    this.customPrompts = [];
  };

  clearCustomPrompt = () => {
    this.selectedCustomPrompt = null;
  };

  getCustomPrompts = async () => {
    this.setLoading(true);
    try {
      const prompts = await agent.CustomPrompt.list();

      this.setCustomPrompts(prompts);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  getCustomPrompt = async (id: string) => {
    this.setLoading(true);
    try {
      const prompt = await agent.CustomPrompt.details(id);
      this.setSelectedCustomPrompt(prompt);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  createCustomPrompt = async (prompt: CustomPromptInput) => {
    this.setLoading(true);
    try {
      await agent.CustomPrompt.create(prompt);
      this.getCustomPrompts();
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  updateCustomPrompt = async (val: {
    id: string;
    prompt: string;
    emoji: string;
  }) => {
    this.setLoading(true);
    try {
      await agent.CustomPrompt.update(val);
      runInAction(() => {
        this.customPrompts = this.customPrompts.map((c) =>
          c.id === val.id ? { ...c, prompt: val.prompt, emoji: val.emoji } : c
        );
        this.selectedCustomPrompt = { ...val };
      });

      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  deleteCustomPrompt = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.CustomPrompt.delete(id);
      runInAction(() => {
        this.customPrompts = this.customPrompts.filter((c) => c.id !== id);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };
}
