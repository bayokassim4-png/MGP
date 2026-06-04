export class CreatePpmDto {
  projectId: string;

  title: string;

  method:
    | 'AOI'
    | 'AON'
    | 'CONSULTANT'
    | 'GRE_A_GRE'
    | 'DEMANDE_COTATION';

  estimatedAmount: number;

  responsible?: string;
}