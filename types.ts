
export enum TimeFeeling {
  MORE,
  LESS,
  RIGHT
}

export interface Activity {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  hours: number;
  feeling: TimeFeeling;
}
