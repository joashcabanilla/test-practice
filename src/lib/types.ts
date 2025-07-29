export type Member = {
  name: string;
  verificationStatus: string;
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  dateTimeCreated: string;
  status: string;
  dateTimeLastActive: string;
  wallet: {
    __typename: string;
    balance: string | null;
  };
};

export type MemberEdges = {
  __typename: string;
  node: Member;
};

export type FilterState = {
  filterMemberList: Member[] | [];
  setfilterMemberList: (members: Member[]) => void;

  nameList: string[];
  setNameList: (nameList: string[]) => void;

  verificationStatusList: string;
  setVerificationStatusList: (verificationStatus: string) => void;

  emailList: string[];
  setEmailList: (emailList: string[]) => void;

  mobileNumberList: string[];
  setMobileNumberList: (mobileNumberList: string[]) => void;

  domainList: string[];
  setDomainList: (domainList: string[]) => void;

  dateRegistered: {
    from: string;
    to: string;
  };
  setDateRegistered: (value: { from: string; to: string }) => void;

  StatusList: string;
  setStatusList: (StatusList: string) => void;

  dateTimeLastActiveFrom: string;
  setDateTimeLastActiveFrom: (value: string) => void;

  dateTimeLastActiveTo: string;
  setDateTimeLastActiveTo: (value: string) => void;
};
