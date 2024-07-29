import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Route";

import { CompanyInput } from "../models/companyInput";
import { InformationInput } from "../models/information";
import { CustomPromptInput } from "../models/prompt";
import { User, UserFormValues } from "../models/user";
import { store } from "../store/store";

type ModalStateErrors = string[];

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// const sleep = (delay: number)c => {
//   return new Promise((resolve) => setTimeout(resolve, delay));
// };

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-found");
        }
        if (error.response) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat() as ModalStateErrors;
        } else {
          // toast.error(data);
        }

        break;
      case 401:
        if (
          status == 401 &&
          headers["www-authenticate"]?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          // store.userStore.logout();
          // toast.error("Session expired - please login again");
        } else {
          // toast.error("unauthorised");
        }

        break;
      case 403:
        //   toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        //   store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Information = {
  list: () => requests.get<InformationInput[]>("/information"),
  details: (id: string) => requests.get<InformationInput>(`/information/${id}`),
  create: (information: string) =>
    requests.post<void>("/information", { information }),
  update: (info: Partial<InformationInput>) =>
    requests.put<void>("/information", info),
  delete: (id: string) => requests.del<void>(`/information/${id}`),
};

const CustomPrompt = {
  list: () => requests.get<CustomPromptInput[]>("/customprompt"),
  details: (id: string) =>
    requests.get<CustomPromptInput>(`/customprompt/${id}`),
  create: (prompt: CustomPromptInput) =>
    requests.post<void>("/customprompt", prompt),
  update: (prompt: Partial<CustomPromptInput>) =>
    requests.put<void>("/customprompt", prompt),
  delete: (id: string) => requests.del<void>(`/customprompt/${id}`),
};

const Company = {
  list: () => requests.get<CompanyInput[]>("/company"),
  details: (id: string) => requests.get<CompanyInput>(`/company/${id}`),
  create: (company: CompanyInput) => requests.post<void>("/company", company),
  update: (company: Partial<CompanyInput>) =>
    requests.put<void>("/company", company),
  delete: (id: string) => requests.del<void>(`/company/${id}`),
};
const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  GLogin: (accessToken: string) =>
    requests.post<User>(`/account/GLogin?accessToken=${accessToken}`, {}),
  refreshToken: () => requests.post<User>("/account/refreshToken", {}),
  emailVerification: (email: string, code: string) =>
    requests.post<void>(
      `/account/ConfirmEmail?email=${email}&code=${code}`,
      {}
    ),
};

const agent = {
  Account,
  Information,
  CustomPrompt,
  Company,
};

export default agent;
