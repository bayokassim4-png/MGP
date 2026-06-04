export class CreateRiskDto {
  projectId: string;

  title: string;
  description?: string;

  probability: number;
  impact: number;

  mitigationMeasure?: string;
  owner?: string;
} 