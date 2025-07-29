import { create } from "zustand";
import { FilterState } from "@/lib/types";

export const useFilterState = create<FilterState>((set) => ({
  filterMemberList: [],
  setfilterMemberList: (filterMemberList) => set({ filterMemberList }),

  nameList: [],
  setNameList: (nameList) => set({ nameList }),

  verificationStatusList: "",
  setVerificationStatusList: (verificationStatusList) => set({ verificationStatusList }),

  emailList: [],
  setEmailList: (emailList) => set({ emailList }),

  mobileNumberList: [],
  setMobileNumberList: (mobileNumberList) => set({ mobileNumberList }),

  domainList: [],
  setDomainList: (domainList) => set({ domainList }),

  dateRegistered: { from: "", to: "" },
  setDateRegistered: (dateRegistered) => set({ dateRegistered }),

  StatusList: "",
  setStatusList: (StatusList) => set({ StatusList }),

  dateTimeLastActiveFrom: "",
  setDateTimeLastActiveFrom: (dateTimeLastActiveFrom) => set({ dateTimeLastActiveFrom }),

  dateTimeLastActiveTo: "",
  setDateTimeLastActiveTo: (dateTimeLastActiveTo) => set({ dateTimeLastActiveTo })
}));
