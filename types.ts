export interface Course {
  code: string;
  title: string;
  type: string; // 'TH', 'ETH', 'ELA'
  slots: string[];
}
