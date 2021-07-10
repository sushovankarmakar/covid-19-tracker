import numeral from "numeral";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => b.cases - a.cases);
};

export const prettyPrintDailyStat = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};

export const prettyPrintTotalStat = (stat) => {
  return stat ? numeral(stat).format("0,0") : "0";
};
