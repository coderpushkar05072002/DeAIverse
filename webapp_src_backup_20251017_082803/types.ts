export type Task = {
  id: number;
  consumer: string;
  provider: string;
  price: string;      // wei string
  status: number;
  statusName?: string;
  datasetCID: string;
  resultCID: string;
  deadline: number;
};
