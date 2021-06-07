export interface DataPoint {
  name: string;
  y: number;
}

export const DataPointHelpers = {
  getTotal: (data: Array<DataPoint>) => {
    return data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.y,
      0
    );
  },
};
