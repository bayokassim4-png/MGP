export class CreateLogframeDto {
  projectId: string;

  level:
    | 'OBJECTIF_GLOBAL'
    | 'OBJECTIF_SPECIFIQUE'
    | 'RESULTAT';

  title: string;

  indicator?: string;
  baseline?: string;
  target?: string;

  verificationSource?: string;

  assumptions?: string;
}