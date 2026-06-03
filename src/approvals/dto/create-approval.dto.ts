export class CreateApprovalDto {
  expenseId: string;
  approverId: string;
  level: 'CHEF_PROJET' | 'DAF' | 'DG';
  approved: boolean;
  comment?: string;
}