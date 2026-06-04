export class CreatePtbaDto {
  projectId: string;
  componentId?: string;
  activityId?: string;

  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';

  responsible?: string;
  plannedBudget: number;
  description?: string;
}