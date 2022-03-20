export type CaseObj = {
  active?: number;
  caseId?: string;
  company?: string;
  created_at?: string;
  creditcard?: string;
  cvc?: string;
  id: number;
  month?: number;
  projectdesc?: string;
  projectname?: string;
  updated_at?: string;
  userId?: number;
  year?: number;
};

export type AddCaseResp = {
  Response: {
    Data: string;
    Token: string;
  };
};
